"use server";

const {
    RPC_URL = "",
    COLLECTION_MINT = ""
} = process.env;

import { Item } from "@/types";

import { config } from "@/config";

const isDefault = (attributes: {
    trait_type: string,
    value: string,
}[]) => {
    let matches = 0;

    for (const { value, trait_type } of attributes) {
        if (value === config.defaultAttributes[trait_type]) {
            matches++;
        }
    }

    return matches > 6;
}

export async function getRecentlyMinted(page = 1, id: number = 0) {
    const response = await fetch(RPC_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": id,
            "method": "searchAssets",
            "params": {
                grouping: ["collection", COLLECTION_MINT],
                page,
                "limit": 100,
                "compressed": true,
                "sortBy": {
                    "sortBy": "updated",
                    "sortDirection": "desc"
                },
            }
        })
    }).then((response) => response.json()).catch((error) => console.log(error)) || {};

    // @ts-ignore
    const formatted = response.result.items.map((item) => {
        const [
            image = {},
            secondaryImage = {},
        ] = item?.content?.files;

        return {
            image: image?.cdn_uri,
            secondaryImage: secondaryImage?.cdn_uri,
            name: item?.content?.metadata?.name,
            attributes: item?.content?.metadata?.attributes || [],
            description: item?.content?.metadata?.description,
            id: item?.id
        }
    }).filter((item: any) => !isDefault(item.attributes) && item.image && item.attributes?.length > 0);

    return formatted as Item[];
}