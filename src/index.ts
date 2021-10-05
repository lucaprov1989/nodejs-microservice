import express, { Application } from "express";
import Envs from "./env";
import logger from "./logger";
import ABI from "@/assets/abi.json";
import { createContractListener } from "./clients/contractListener";
import routes from "./routes";

const { PORT } = Envs;

export async function main(): Promise<Application> {
  const app = express();
  app.use(express.json());

  createContractListener(Envs.CONTRACT_ADDRESS, ABI, "Transfer", logger);
  app.use(express.json());
  // Health check route don't change
  // app.use("/health", getHealth);
  app.use(routes);
  app.listen(PORT, () =>
    logger.info(`Contract listener listening on port ${PORT}!`),
  );

  process.on("uncaughtException", (e: any) => {
    console.log(e);
    logger.error("uncaughtException in service", { data: e });
    logger.on("finish", () => process.exit(1));
    // LET WINSTON WRITE THE LOG
    setTimeout(() => {
      logger.end();
    }, 2000);
  });
  process.on("unhandledRejection", (e: any) => {
    console.log(e);
    logger.error("uncaughtException in service", { data: e });
    logger.on("finish", () => process.exit(1));
    // LET WINSTON WRITE THE LOG
    setTimeout(() => {
      logger.end();
    }, 2000);
  });

  return app;
}

main();
