import discord from "@/clients/discordBot";
import env from "@/env";
import { createContractClient } from "@/middleware";
export const TransferResolver = async (
  resultObject: Partial<{ tokenId: string; to: string; from: string }>,
): Promise<void> => {
  const contract = createContractClient().methods;
  const contractData = await contract
    .functionInContract(resultObject.tokenId)
    .call();

  // 1. if null address send message
  if (resultObject.from === "0x0000000000000000000000000000000000000000") {
    discord.sendNewMintedMessage(
      `Token #${resultObject.tokenId} minted.`,
      `${env.OPEN_SEA_URL}assets/${env.CONTRACT_ADDRESS}/${resultObject.tokenId}`,
      contractData,
    );
  } else {
    discord.sendNewMintedMessage(
      `Token n. ${resultObject.tokenId} changed owner from ${resultObject.from} to ${resultObject.to}!`,
      `${env.OPEN_SEA_URL}assets/${env.CONTRACT_ADDRESS}/${resultObject.tokenId}`,
      contractData,
    );
  }
};
