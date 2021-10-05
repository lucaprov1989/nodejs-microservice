import * as winston from "winston";

const logger = winston.createLogger();

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp(),
      winston.format.printf((info) => {
        const { timestamp, level, message, ...args } = info;
        return `${level} - ${timestamp} - ${message} ${
          Object.keys(args).length ? JSON.stringify(args) : ""
        }`;
      }),
    ),
  }),
);

export default logger;
