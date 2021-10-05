import { metaDataResolver } from "@/eventResolvers/metaDataResolver";
import Web3 from "web3";
import winston from "winston";
import Envs from "@/env";
import { TransferResolver } from "@/eventResolvers/transferResolver";

const web3 = new Web3(Envs.WEB3_RPC);
const eventResolverMapper: { [key: string]: (resultObject: any) => any } = {
  MetaData: metaDataResolver,
  Transfer: TransferResolver,
};

export const createContractListener = async (
  contractAddress: string,
  contractAbi: any[],
  event: string,
  logger: winston.Logger,
): Promise<void> => {
  try {
    logger.info(`Starting to listen on ${contractAddress} for event ${event}`);
    const contractInstance = new web3.eth.Contract(contractAbi as any);
    contractInstance.options.address = contractAddress;
    const resolver = eventResolverMapper[event];
    contractInstance.events[event](async (err: any, result: any) => {
      if (err) {
        logger.error(`Error from event ${event} on ${contractAddress}`);
        throw new Error(err);
      }
      logger.info("Found Event");

      await resolver(result.returnValues);
      logger.info("Fininshed Resolver");
    });
  } catch (err) {
    logger.error("Error during event");
  }
};
