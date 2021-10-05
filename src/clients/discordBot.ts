import logger from "@/logger";
import { Channel, Client, Message, MessageEmbed } from "discord.js";
import Envs from "@/env";
import Web3 from "web3";
import abi from "@/assets/Abi.json";
import env from "@/env";

const createDiscordBot = (): any => {
  const client = new Client();
  let newMintedChannel: Channel;
  client.login(Envs.DISCORD_BOT_KEY);
  const web3 = new Web3(Envs.WEB3_RPC);
  const contractInstance = new web3.eth.Contract(abi as []);
  contractInstance.options.address = env.CONTRACT_ADDRESS;
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    newMintedChannel = await client.channels.fetch(
      Envs.DISCORD_NEW_MINTED_CHAT_ID,
    );
    (newMintedChannel as any).send("Discord bot up") as any;
  });
  interface CommandResolverMap {
    [key: string]: (message: Message, args?: string | undefined) => void;
  }
  const commandResolverMap: CommandResolverMap = {
    token: async (message: Message, args: string | undefined) => {
      const token = await contractInstance.methods
        .functionFromContract(args)
        .call();

      message.reply(
        new MessageEmbed()
          .setTitle(`Token #${Number(args)}`)
          .setDescription(
            `${token.firstProperty} #${token.secondProperty.padStart(2, "0")}`,
          )
          .setColor("#000000")
          .setImage(token.image),
      );
    },
    // add more commands here
  };
  const COMMANDS_LIST = ["token"]; // add more commands here
  client.on("message", async (message) => {
    try {
      const prefix = "!";
      if (message.author.bot) {
        return;
      }
      if (!message.content.startsWith(prefix)) {
        return;
      }
      const fullCommand = message.content;
      const withoutExcl = message.content.split("!")[1];
      const command = COMMANDS_LIST.find((cmd) => {
        return withoutExcl.search(cmd) >= 0;
      });

      const args = fullCommand.split(`!${command}`)[1];
      await commandResolverMap[command as string](message, args);
    } catch (err) {
      logger.error("Command not configured skipping!");
    }
  });

  const sendNewMintedMessage = async (
    message: string,
    openSeaUrl: string,
    imageUrl: string,
  ) => {
    try {
      (newMintedChannel as any).send(
        new MessageEmbed()
          .setTitle("New token minted!")
          .setDescription(message)
          .setColor("#148837")
          .setURL(openSeaUrl)
          .setImage(imageUrl),
      );
    } catch (err) {
      logger.error("Error during sending message to discord", {
        data: { msg: err.message, stack: err.stack },
      });
      throw new Error(err);
    }
  };

  return {
    sendNewMintedMessage,
  };
};

export default createDiscordBot();
