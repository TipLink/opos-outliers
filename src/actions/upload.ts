"use server"

import ShortUniqueId from "short-unique-id";

import { ShdwDrive, ShadowFile } from "@shadow-drive/sdk";

import { keypairFromEnvironment } from "@/util/keypair-from-envrironment";
import { Connection, PublicKey } from "@solana/web3.js";

import * as anchor from "@coral-xyz/anchor";

import { config } from "@/config";

const keypair = keypairFromEnvironment("PAYER_KEYPAIR");

const { 
    RPC_URL = "",
} = process.env;

export const uploadFile = async (file: Buffer, name: string) => {
    const uid = new ShortUniqueId({ length: 10 });

    const connection = new Connection(RPC_URL, "confirmed");

    if(!keypair) {
        throw new Error("PAYER_KEYPAIR not found in environment");
    }

    const wallet = new anchor.Wallet(keypair);

    const drive = await new ShdwDrive(connection, wallet).init();

    const account = new PublicKey(config.storage.shadowAccount);

    const fileToUpload = { name: uid() + " " + name, file } as ShadowFile;

    const uploadFile = await drive.uploadFile(account, fileToUpload);

    return uploadFile.finalized_locations[0];
}