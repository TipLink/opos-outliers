import { Keypair } from "@solana/web3.js";

export const keypairFromEnvironment = (key: string) => {
    const keypairString = process.env[key];

    const keypair = keypairString ? Keypair.fromSecretKey(new Uint8Array(JSON.parse(keypairString))) : undefined;

    return keypair;
}