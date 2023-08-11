"use server";

import { ConcurrentMerkleTreeAccount } from "@solana/spl-account-compression";
import { PublicKey, Connection } from "@solana/web3.js";

import type { MerkleTree } from "@/types";

const {
    RPC_URL = "",
} = process.env;

export const getMerkleTree = async (publicKey: string): Promise<MerkleTree> => {
    const connection = new Connection(RPC_URL, "confirmed");

    const pubkey = new PublicKey(publicKey);

    const cmt = await ConcurrentMerkleTreeAccount.fromAccountAddress(
        connection,
        pubkey
    );

    return {
        authority: cmt.getAuthority().toBase58(),
        canopyDepth: cmt.getCanopyDepth(),
        creationSlot: cmt.getCurrentSeq().toString(),
        maxBufferSize: cmt.getMaxBufferSize(),
        rightMostIndex: cmt.tree.rightMostPath.index,
        root: cmt.getCurrentRoot.toString(),
        seq: cmt.getCurrentSeq().toString(),
        treeHeight: cmt.getMaxDepth(),
    };
}