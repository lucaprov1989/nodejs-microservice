import envalid, { num, str } from "envalid";

// Chose one way of exporting env values and discard the other
interface EnvInterface {
  PORT: number;
  NODE_ENV: string;
  WEB3_RPC: string;
  CONTRACT_ADDRESS: string;
  IMG_BASE_URL: string;
  DISCORD_BOT_KEY: string;
  DISCORD_NEW_MINTED_CHAT_ID: string;
  OPEN_SEA_URL: string;
  OPEN_SEA_API: string;
  FE_URL: string;
  B2_APP_KEY_ID: string;
  B2_APP_KEY: string;
}

// Exporting directly the output of the cleanEvn call
const env = envalid.cleanEnv(process.env, {
  B2_APP_KEY_ID: str(),
  B2_APP_KEY: str(),
  FE_URL: str(),
  OPEN_SEA_URL: str(),
  OPEN_SEA_API: str(),
  PORT: num({ default: 4000 }),
  DISCORD_NEW_MINTED_CHAT_ID: str(),
  NODE_ENV: str(),
  WEB3_RPC: str(),
  DISCORD_BOT_KEY: str(),
  CONTRACT_ADDRESS: str(),
  IMG_BASE_URL: str(),
}) as EnvInterface;

export default env;
