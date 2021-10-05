import { Handler, Request } from "express";

export const getTokenMetaData: Handler = async (req: Request, res) => {
  try {
    const { tokenId } = req.params;
    const contractData: { fromContract: number; fromContractTwo: string } =
      await req.contract.contractSampleFunction(tokenId).call();

    return res.status(200).send({
      ...contractData,
    });
  } catch (err) {
    req.logger.error(`Error fetching tokenId`, {
      data: {
        message: err?.message,
        stack: err?.stack,
      },
    });
    return res.status(500).send({
      message: "Error during get token metadata",
    });
  }
};
