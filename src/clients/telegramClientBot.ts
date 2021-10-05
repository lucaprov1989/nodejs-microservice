import Telegraf from "telegraf";
import logger from "@/logger";
import { TelegrafContext } from "telegraf/typings/context";
import { ExtraEditMessage } from "telegraf/typings/telegram-types";
export interface TelegramBot {
  sendMessageOnTelegram: (
    chatId: number | string,
    message: string,
    options?: ExtraEditMessage,
  ) => Promise<void>;
  start: () => Promise<void>;
}
const createTelegramBot = (): TelegramBot => {
  const bot = new Telegraf("test" as string);
  const botName = "test";
  bot.start((ctx) => ctx.reply("Bot Started"));
  bot.command(`${botName}_alive`, (ctx) =>
    ctx.reply("I'm alive dont worry... "),
  );
  bot.command(`${botName}_chat_id`, (ctx) =>
    ctx.reply(`ChatId needed to configure your bot: ${ctx.chat?.id}`),
  );
  bot.catch((err: Error, ctx: TelegrafContext) => {
    logger.error("Telegram Bot error check it", {
      data: { msg: err.message, stack: err.stack },
    });
  });

  const start = async () => {
    try {
      await bot.launch();
      logger.info("Bot started successfully");
    } catch (err) {
      logger.error("Error during starting", {
        data: { msg: err.message, stack: err.stack },
      });
      throw new Error("error");
    }
  };

  const sendMessage = async (
    chatId: number | string,
    message: string,
    options?: ExtraEditMessage,
  ) => {
    try {
      await bot.telegram.sendMessage(chatId, message, options);
    } catch (err) {
      logger.error("Error during sending message to telegram", {
        data: { msg: err.message, stack: err.stack },
      });
      throw new Error("error");
    }
  };

  return {
    sendMessageOnTelegram: sendMessage,
    start,
  };
};

export default createTelegramBot();
