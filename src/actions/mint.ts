"use server"

import type { MintInput, MintResponse } from '@/types';

import {
    SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
    SPL_NOOP_PROGRAM_ID,
} from "@solana/spl-account-compression";

import {
    Connection,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import {
    createMintToCollectionV1Instruction,
    PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
    TokenProgramVersion,
} from "@metaplex-foundation/mpl-bubblegum";

import {
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

import { TipLink } from "@tiplink/api";

import { keypairFromEnvironment } from '@/util/keypair-from-envrironment';

import { config } from "@/assets/config";

const payerKeypair = keypairFromEnvironment("PAYER_KEYPAIR");

const merkleTree = new PublicKey(config.tree.publicKey);

const deriveAccounts = () => {

    const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
        [merkleTree.toBuffer()],
        BUBBLEGUM_PROGRAM_ID
    );

    const [bgumSigner, __] = PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        BUBBLEGUM_PROGRAM_ID
    );

    return {
        treeAuthority,
        bgumSigner,
    }
}

const generateTipLink = async () => {
    const {
        url,
        keypair,
    } = await TipLink.create();

    return {
        url: url.toString(),
        keypair,
    }
}

const createMintInstruction = (
    destination: PublicKey,
    uri: string,
) => {
    if(!merkleTree) {
        throw new Error("TREE_KEYPAIR not found");
    } else if (!payerKeypair) {
        throw new Error("PAYER_KEYPAIR not found in environment");
    }
    
    const {
        treeAuthority,
        bgumSigner,
    } = deriveAccounts();

    return createMintToCollectionV1Instruction(
        {
            merkleTree,
            treeAuthority,
            treeDelegate: payerKeypair.publicKey,
            payer: payerKeypair.publicKey,
            leafDelegate: payerKeypair.publicKey,
            leafOwner: destination,
            compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            logWrapper: SPL_NOOP_PROGRAM_ID,
            collectionAuthority: payerKeypair.publicKey,
            collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
            collectionMint: new PublicKey(config.collection.collectionMint),
            collectionMetadata: new PublicKey(config.collection.collectionMetadataAccount),
            editionAccount: new PublicKey(config.collection.collectionMasterEditionAccount),
            bubblegumSigner: bgumSigner,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        },
        {
            metadataArgs: {
                creators: [],
                editionNonce: 0,
                tokenProgramVersion: TokenProgramVersion.Original,
                tokenStandard: null,
                uses: null,
                primarySaleHappened: false,
                sellerFeeBasisPoints: 0,
                isMutable: false,
                collection: {
                    key: new PublicKey(config.collection.collectionMint),
                    verified: false
                },
                uri,
                symbol: config.metadata.symbol,
                name: config.metadata.name,
            }
        }
    );
}

export const mint = async ({
    attributes,
    metadataUri
} : MintInput): Promise<MintResponse> => {
    try {
        console.log("Minting...");

        if(!merkleTree) {
            throw new Error("merkleTree not found in environment");
        } else if (!payerKeypair) {
            throw new Error("PAYER_KEYPAIR not found in environment");
        }
    
        const { RPC_URL = "" } = process.env;
    
        const connection = new Connection(RPC_URL, "confirmed");
    
        const {
            url: tipLinkUrl,
            keypair: tipLinkKeypair,
        } = await generateTipLink();
    
        const mintInstruction = createMintInstruction(tipLinkKeypair.publicKey, metadataUri);
            
        const tx = new Transaction().add(mintInstruction);
    
        tx.feePayer = payerKeypair.publicKey;
    
        const sig = await sendAndConfirmTransaction(
            connection,
            tx,
            [
                payerKeypair,
            ],
            {
              commitment: "confirmed",
              skipPreflight: true,
            }
        );

        console.log("Minted!", sig, tipLinkUrl);
    
        return {
            tiplinkUrl: tipLinkUrl,
            transaction: sig,
            attributes,
            metadataUri,
        };
    } catch (error) {
        console.error("Failed to mint", error);

        return {
            tiplinkUrl: "",
            transaction: "",
            attributes: {},
            metadataUri: "",
            error: String(error),
        };
    }
}