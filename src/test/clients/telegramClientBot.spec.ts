import bot from "@/clients/telegramClientBot";

describe("TelegramBot -", () => {
  const testResult = bot;
  it(`createTelegrambot - should return ["sendMessageOnTelegram","start"]`, async (done) => {
    expect(Object.keys(testResult)).toMatchObject([
      "sendMessageOnTelegram",
      "start",
    ]);
    done();
  });
});
