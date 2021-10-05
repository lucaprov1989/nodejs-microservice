import { Router } from "express";
import { getTokenMetaData } from "@/handlers/getTokenMetaData";
import { addContractClient } from "@/middleware";

const router = Router();
router.get("/token-metadata/:tokenId", addContractClient, getTokenMetaData);
router.get("/health-check", (req, res, next) => {
  return res.send(200).json({ status: "ok" });
});

export default router;
