"use server"

import type { Account } from "@/types";

import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

const {
    RPC_URL = "",
} = process.env;

export const getAccountInfo = async (key: string): Promise<Account> => {
    const connection = new Connection(RPC_URL, "confirmed");

    const publicKey = new PublicKey(key);

    const accountInfo = await connection.getParsedAccountInfo(publicKey);

    return {
        address: key,
        balance: (accountInfo?.value?.lamports || 0) / LAMPORTS_PER_SOL,
    };
}