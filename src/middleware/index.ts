import { Request, Response, NextFunction, Handler } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "@/logger";
import Web3 from "web3";
import Envs from "@/env";
import abi from "@/assets/Abi.json";

import discordBot from "@/clients/discordBot";

export const addReqId: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.id = uuidv4();
  req.logger = logger;
  next();
};
export const createContractClient = () => {
  const web3 = new Web3(Envs.WEB3_RPC);
  const contractInstance = new web3.eth.Contract(abi as []);
  contractInstance.options.address = Envs.CONTRACT_ADDRESS;
  return contractInstance;
};
export const addContractClient: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.contract = createContractClient().methods;
  next();
};

export const addDiscordBot: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.discordBot = discordBot;
  next();
};
