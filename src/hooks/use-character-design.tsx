"use client";

import { ReactNode, useEffect } from "react";

import React, {
  createContext,
  useContext,
  useState,
} from "react";

import type { AttributesMap, MintConfig, CharacterDesignContext as CharacterDesign } from "@/types";

import { useStageMint, useMintStaged } from "@/hooks/use-mint";

import { useGenerateMedia } from "@/hooks/use-generate";

export const CharacterDesignContext = createContext<CharacterDesign>(undefined!);

export const useCharacterDesign = () => useContext(CharacterDesignContext);

const randomItem = (arr: any[]) => {
    let item = arr[Math.floor(Math.random() * arr.length)];

    while(item === "None" && item !== "Background") {
        item = arr[Math.floor(Math.random() * arr.length)];
    }

    return item;
};

const randomKey = (obj: Record<string, any>) => randomItem(Object.keys(obj));

export function CharacterDesignProvider({ children, config }: { children: ReactNode, config: MintConfig }) {
    const [attributeValuesMap, setAttributeValuesMap] = useState<AttributesMap>({
        Background: randomKey(config.attributes.Background),
        "Skin Color": randomKey(config.attributes["Skin Color"]),
        Face: randomKey(config.attributes.Face),
        Head: randomKey(config.attributes.Head),  
        Torso: randomKey(config.attributes.Torso),  
        Logo: randomKey(config.attributes.Logo),       
        Legs: randomKey(config.attributes.Legs),
        Feet: randomKey(config.attributes.Feet),
    });
    
    const [showConfirmMint, setShowConfirmMint] = useState(false);

    const { stagedMintState, stageMint } = useStageMint();

    const { mintState, mintStaged } = useMintStaged();

    const { mediaState, generatePreview } = useGenerateMedia();

    const [ isMinting, setIsMinting ] = useState(false);

    const generateRandomMap = () => {
        setAttributeValuesMap({
            Background: randomKey(config.attributes.Background),
            "Skin Color": randomKey(config.attributes["Skin Color"]),
            Face: randomKey(config.attributes.Face),
            Head: randomKey(config.attributes.Head),  
            Torso: randomKey(config.attributes.Torso),  
            Logo: randomKey(config.attributes.Logo),       
            Legs: randomKey(config.attributes.Legs),
            Feet: randomKey(config.attributes.Feet),
        });
    }

    const setAttributeValue = (attributeName: string, newValue: string) => {
        attributeValuesMap[attributeName] = newValue;

        setAttributeValuesMap({ ...attributeValuesMap });
    };

    const mint = async () => {
        if(isMinting) {
            return;
        }

        setIsMinting(true);

        try {
            const uri = await stageMint({
                attributes: { ...attributeValuesMap },
            });
            
            if(!uri) {
                throw new Error("Something went wrong staging the mint");
            }
    
            const result = await mintStaged({
                attributes: { ...attributeValuesMap },
                metadataUri: uri,
            });
    
            // Update the tab URL once minting completes
            if (result?.tiplinkUrl) {

                const url = new URL(window.location.href);

                const customRedirect = url.searchParams.get("redirect") || "";

                if(customRedirect) {
                    const urlString = encodeURIComponent(customRedirect);

                    const [_, hash] = result.tiplinkUrl.split("#");

                    return window.location.href = "https://" + urlString + "/i#" + hash;
                }

                return window.location.href = result.tiplinkUrl;
            }
        } catch (error) {
            console.log(error)
        } finally {

            setTimeout(() => {
                setIsMinting(false);
            }, 2000)
        }
    };

    const generate = () => generatePreview(attributeValuesMap);

    const randomize = () => generateRandomMap();

    // Generate preview on attribute change
    useEffect(() => {
        generate(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeValuesMap]);

    const value ={
        config,

        // State
        mintState,
        stagedMintState,
        attributeValuesMap,
        mediaState,
        showConfirmMint, 
        isMinting,

        // Actions
        setAttributeValue,
        generatePreview: generate,
        randomize,
        setShowConfirmMint,

        // Perform character mint
        mint,
    }

    return (
        <CharacterDesignContext.Provider
            value={value}
        >
            {children}
        </CharacterDesignContext.Provider>
    );
}
