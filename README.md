# NodeJs Micro Service

## Description

Standalone microservice, that interacts with:

- NFT Smart contract;
- Listen to blockchain events;
- Open sea rest apis;
- Messages on Discord and/or telegram chats;
- Exposing rest api for nft metadatas;

## Usage

`npm run build` and `npm start` to build and run.

`npm start:dev` to run and watch for changes.

## Env vars
- PORT: number;
- NODE_ENV: string;
- WEB3_RPC: string;
- CONTRACT_ADDRESS: string;
- IMG_BASE_URL: string;
- DISCORD_BOT_KEY: string;
- DISCORD_NEW_MINTED_CHAT_ID: string;
- OPEN_SEA_URL: string;
- OPEN_SEA_API: string;
- FE_URL: string;
- B2_APP_KEY_ID: string;
- B2_APP_KEY: string;
