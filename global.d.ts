import winston from "winston";

declare global {
  type BlockchainClient = any;
  type Contract = any; // needs type here
  type LogLevel = "info" | "warn" | "error" | undefined;
  type Logger = winston.Logger;
}
