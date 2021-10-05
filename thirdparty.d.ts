import { Client } from "discord.js";

import "express";

declare module "express" {
  export interface Request {
    clientIp: string;
    id: string;
    logger: Logger;
    contract: Contract;
    discordBot: Client;
  }
}
