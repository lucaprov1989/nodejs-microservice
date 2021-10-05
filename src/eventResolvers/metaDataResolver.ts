import logger from "@/logger";

export const metaDataResolver = async (resultObject: {
  someData: number;
  someOtherData: string;
}): Promise<void> => {
  const { someData, someOtherData } = resultObject;

  logger.info(
    `Doing something with ${JSON.stringify(someData)} and ${JSON.stringify(
      someOtherData,
    )}`,
  );
};
