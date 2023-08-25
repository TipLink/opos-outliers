import type { MintConfig } from "@/types";

const {
    COLLECTION_MINT = "",
    COLLECTION_METADATA_ACCOUNT = "",
    COLLECTION_MASTER_EDITION_ACCOUNT = "",
    SHADOW_ACCOUNT = "",
    MERKLE_TREE = "",
} = process.env;

export const config: MintConfig  = {
    metadata: {
        name: "OPOS Outliers",
        description: "Unlimited compressed NFT characters. Only possible on Solana, powered by TipLink.",
        symbol: "OPOSOUT",
        external_url: "https://opos.quest",
        properties: {
            files: [],
            category: "image",
        },  
    },

    // Hardcoded values that represent the production environment
    productionEnvironment: {
        payer: "p7X5mwA9CKX6uZz4xwwD9Jqg3hUE9PWfgV3QBQsYfoh",
        activeTree: "tJTjTKqDdin8Xsjfb4Kx2vGcg1F7m19C53AUHnDcnCT",
        trees: [
            "tL2TAswGPHjtCvxN9ez5y8TDrAU1Pxh8PEVmHC8tiyy",
            "tJTjTKqDdin8Xsjfb4Kx2vGcg1F7m19C53AUHnDcnCT",
        ],
    },
    
    // Based on local environment
    tree: {
        publicKey: MERKLE_TREE,
        maxBufferSize: 64,
        maxDepth: 17,
        canopy: 8,
    },

    collection: {
        "collectionMint": COLLECTION_MINT,
        "collectionMetadataAccount": COLLECTION_METADATA_ACCOUNT,
        "collectionMasterEditionAccount": COLLECTION_MASTER_EDITION_ACCOUNT,
        "collectionMetadataUri": "https://shdw-drive.genesysgo.net/7J165fhor8ysTfu46LiKG76gsLzG33coqZQLqhvJYESy/1691558993463.json"
    },

    storage: {
        shadowAccount: SHADOW_ACCOUNT,
    },

    defaultAttributes: {
        Background: "Abstract",
        "Skin Color": "Human 1",
        Face: "Smile",
        Head: "TipLink Helmet",  
        Torso: "TipLink Shirt",  
        Logo: "TipLink",       
        Legs: "TipLink Pants",
        Feet: "TipLink Shoes",
    },

    newAttributes: {
        Head: [
            "Dark Tippy",
            "DAA",
            "Samo",
            "Bonk",
            "Pony Tail 1",
            "Pony Tail 2",
            "Pony Tail 3",
            "DAA",
        ],
        Logo: [
            "Helium",
            "Metaplex",
            "Solana",
            "Solarplex",
            "Logo",
        ]
    },

    attributes: {
        "Background": {
            "Abstract": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Abstract.png",
            "TipLink": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/TipLink.png?2",
            "DAA": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/DAA.png?1",
            "Blue": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Blue.png",
            "Green": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Green.png",
            "Grey": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Grey.png",
            "Pink": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Pink.png",
            "Purple": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Purple.png",
            "Red": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Red.png",
            "Solana": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Solana.png",
            "White": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/White.png",
            "Yellow": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Backgrounds/Yellow.png",
        },
        "Skin Color": {
            "Human 1": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Skin1.png",
            "Human 2": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Skin2.png",
            "Human 3": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Skin3.png",
            "Human 4": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Skin4.png",
            "Human 5": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Skin5.png",
            "Alien": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Alien.png",
            "Zombie": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Color/Zombie.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
        "Face": {
            "Smile": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/BasicSmile.png",
            "Cursed": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/Cursed.png",
            "Duck": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/Duck.png",
            "Red Laser Eyes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/LaserEyesRed.png",
            "Scarecrow": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/Scarecrow.png",
            "Vampire": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/Vampire.png",
            "Visor": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/Visor.png",
            "Solana Viper": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/SolanaViper.png",
            "TipLink Viper": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Faces/TipLinkViper.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
        "Head": {
            "Tippy": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Special/TippyHead.png",
            "Dark Tippy": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Special/TippyHeadDark.png",
            "DAA": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/DAA.png",
            "Samo": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Samo.png",
            "SMB": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/SMB.png",
            "Bonk": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Bonk.png",
            "Pony Tail 1": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Pony Tail1.png",
            "Pony Tail 2": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Pony Tail2.png",
            "Pony Tail 3": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Pony Tail3.png",
            "Baby": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Baby.png",
            "Black Beanie": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/BeanieBlack.png",
            "Orange Beanie": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/BeanieOrange.png",
            "Solana Beanie": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/BeanieSolana.png",
            "Daisy": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Daisy.png",
            "Horns": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/DevilHorns.png",
            "Halo": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Halo.png",
            "Black Hat": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Hat.png",
            "Headband": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Headband.png",
            "Mohawk": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Heads/Hair/Hair:Hat/Mohawk.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
        "Torso": {
            "TipLink Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/White.png",
            "Black Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/Black.png",
            "Blue Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/Blue.png",
            "Gold Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/Gold.png",
            "Green Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/Green.png",
            "Grey Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/Grey.png",
            "Red Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/Red.png",
            "Solana Blue Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/SolBlue.png",
            "Solana Green Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/SolGreen.png",
            "Solana Purple Shirt": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Shirt/SolPurple.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
        "Logo": {
            "TipLink": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/TipLink.png",
            "Helius": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/Helius.png?1",
            "Helium": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/Helium.png",
            "Metaplex": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/Metaplex.png",
            "Solana": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/Solana.png",
            "Solarplex": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/Solarplex.png",
            "Drift": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Torso/Logos/Drift.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
        "Legs": {
            "TipLink Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Blue.png",
            "Brown Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Brown.png",
            "Dark Grey Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/DarkGrey.png",
            "Light Grey Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/LightGrey.png",
            "Gold Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Gold.png",
            "Green Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Green.png",
            "Khaki Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Khaki.png",
            "Magenta Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Magenta.png",
            "Red Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Red.png",
            "Solana Pants": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Legs/Pants/Solana.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
        "Feet": {
            "TipLink Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/Grey.png",
            "Black Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/Black.png",
            "White Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/White.png",
            "Blue Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/Blue.png",
            "Gold Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/Gold.png",
            "Green Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/Green.png",
            "Red Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/Red.png",
            "Solana Blue Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/SolBlue.png",
            "Solana Green Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/SolGreen.png",
            "Solana Purple Shoes": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/Feet/Shoes/SolPurple.png",
            "None": "https://opos-outliers-git-vercel-staging-tiplink.vercel.app/attributes/None.png",
        },
    },
}