"use server"

import type { AssetMetadata, AttributesMap, GenerateMediaResponse } from '@/types';

import sharp from "sharp";

import { config } from '@/config';

import { uploadFile } from "@/actions/upload";

import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

export const generateMetadata = async ({
    attributes,
    imageUrl,
    secondaryImageUrl,
} : {
    attributes: AttributesMap,
    imageUrl: string,
    secondaryImageUrl?: string,
}) => {
    const formattedAttributes = Object.entries(attributes).map(([trait_type, value ]) => ({
        trait_type,
        value
    }));

    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: ' ',
        length: 3,
    }).split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    const metadata: AssetMetadata = {
        name: `${config.metadata.name}: ${randomName}`,
        symbol: config.metadata.symbol,
        description: config.metadata.description,
        external_url: config.metadata.external_url,
        image: imageUrl,
        attributes: formattedAttributes,
        properties: {
            ...config.metadata.properties,
            files: [
                {
                    uri: imageUrl,
                    type: "image/png",
                },
            ],
        }
    };

    // Add pfp if we have it
    if (secondaryImageUrl) {
        metadata.properties.files.push({
            uri: secondaryImageUrl,
            type: "image/png",
        });
    }

    console.log("Metadata generated!", metadata);

    return metadata;
};

export const generateMedia = async (attributes: AttributesMap, { base64 } = { base64: false }) : Promise<GenerateMediaResponse> => {
    const attributesToFiles = Object.entries(attributes).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: config.attributes[key][value],
    }), {});

    try {
        const urls = Object.values(attributesToFiles) as string[];

        const downloadImage = async (url:string) => {   
            const response = await fetch(url);
            const buffer = Buffer.from(await response.arrayBuffer());
            return buffer;
        }

        const [
            background,
            ...layers
        ] = await Promise.all(urls.map(downloadImage));

        // Composite primary media
        const mainBuffer = await sharp(background)
            .composite(
                layers.map((layer) => ({
                    input: layer,
                })
            )).toBuffer();
        
        // Extract primary media
        const primary = await sharp(mainBuffer).extract({
            left: 110,
            top: 75,
            width: 420,
            height: 420,
        }).toBuffer();
        
        // Extract pfp media
        const pfp = await sharp(mainBuffer)
            .extract({
                left: 195,
                top: 75,
                width: 250,
                height: 250,
            }).toBuffer();

        if (base64) {
            return {
                primary: primary.toString("base64"),
                pfp: pfp.toString("base64"),
            };   
        }
        
        return {
            primary,
            pfp,
        };
    } catch (error) {
        console.error("ERROR", error);

        return {
            primary: null,
            pfp: null,
        }
    }
}

export const generateAndUploadMedia = async ({ attributes } : { attributes : AttributesMap }) => {
    const media = await generateMedia(attributes);
    
    console.log("Generating and uploading media...");
    
    if(!media?.primary || !media?.pfp) {
        throw new Error("Something went wrong generating the media");
    }
    
    const [
        imageUrl,
        secondaryImageUrl,
    ] = await Promise.all([
        uploadFile(media.primary as Buffer, "image.png"),
        uploadFile(media.pfp as Buffer, "pfp.png"),
    ]);

    return {
        imageUrl,
        secondaryImageUrl,
    }
}

export const generateAndUploadMetadata = async ({
    attributes,
    imageUrl,
    secondaryImageUrl
} : {
    attributes : AttributesMap,
    imageUrl: string,
    secondaryImageUrl?: string
}) => {
    console.log("Generating and uploading media...");

    const metadata = await generateMetadata({
        attributes,
        imageUrl,
        secondaryImageUrl,
    });

    const metadataBuffer = Buffer.from((JSON.stringify(metadata)), "utf-8");

    const uri = await uploadFile(metadataBuffer, "metadata.json");

    console.log("Metadata uploaded!", uri);

    return {
        metadataUri: uri,
    };
}