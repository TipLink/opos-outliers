"use client"

import type { StageMintInput, StageMintResponse, MintResponse, MintInput } from "@/types";

import { mint } from "@/actions/mint";

import { generateAndUploadMedia, generateAndUploadMetadata } from "@/actions/generate";

import { useFetchable } from "@/hooks/use-fetchable";

export function useStageMint()  {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [stagedMint, setStagedMint] = useFetchable<StageMintResponse>();

    const tryStageMint = async ({ attributes }: StageMintInput) => {
        // Always set loading true
        setStagedMint((prev) => ({
            ...prev,
            isLoading: true,
        }));

        try {
            const {
                imageUrl,
                secondaryImageUrl
            } = await generateAndUploadMedia({ attributes });

            console.log("Generating and uploading media...");

            const {
                metadataUri
            } = await generateAndUploadMetadata({
                attributes,
                imageUrl,
                secondaryImageUrl,
            });

            console.log("Metadata uploaded!", metadataUri);

            setStagedMint((prev) => ({
                ...prev,
                data: {
                    metadataUri,
                },
            }));

            return metadataUri;
        } catch (error) {
            console.log('Failed to upload', error)
            // Whoops
            setStagedMint((prev) => ({
                ...prev,
                error: String(error),
            }));
        } finally {
            // Always set loading false and fetched true
            setStagedMint((prev) => ({
                ...prev,
                isLoading: false,
                isFetched: true,
            }));
        }
    };

    return {
        stagedMintState: stagedMint,
        stageMint : tryStageMint,
    };
}

export function useMintStaged() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mintState, setMintState] = useFetchable<MintResponse>();

    const tryCharacterMint = async (payload: MintInput) => {
        // Always set loading true
        setMintState((prev) => ({
            ...prev,
            isLoading: true,
        }));

        try {
            console.log("Minting NFT...");

            // Try to mint the character
            const result = await mint(payload);

            console.log("Minted!");

            setMintState((prev) => ({
                ...prev,
                data: result,
            }))

            return result;
        } catch (error) {
            console.log("Failed to mint", error);

            // Whoops
            setMintState((prev) => ({
                ...prev,
                error: String(error),
            }));
        } finally {
             // Always set loading false and fetched true
            setMintState((prev) => ({
                ...prev,
                isLoading: false,
                isFetched: true,
            }));
        }
    };

    return {
        mintState,
        mintStaged : tryCharacterMint,
    };
}