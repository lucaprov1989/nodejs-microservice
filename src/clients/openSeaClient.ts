import env from "@/env";
import logger from "@/logger";
import axios from "axios";
export const createOpenSeaClient = (): any => {
  const openSeaUrl = env.OPEN_SEA_API;
  return {
    getOpenSales: async () => {
      try {
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const requester = axios.create(axiosConfig) as any;
        const openSalesUrl = `${openSeaUrl}/api/v1/events?asset_contract_address=${env.CONTRACT_ADDRESS}&event_type=created`;
        const { data } = await requester.get(openSalesUrl);
        return data;
      } catch (err) {
        console.log(err);
        logger.error("Error fetching openSales on openSea");
      }
    },
    getClosedSales: async () => {
      try {
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const requester = axios.create(axiosConfig) as any;
        const openSalesUrl = `${openSeaUrl}/api/v1/events?asset_contract_address=${env.CONTRACT_ADDRESS}&event_type=successful`;
        const { data } = await requester.get(openSalesUrl);
        return data;
      } catch (err) {
        console.log(err);
        logger.error("Error fetching closedSales on openSea");
      }
    },
  };
};
