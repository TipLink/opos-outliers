"use client"

import type { AttributesMap, MediaResponse } from "@/types";

import { generateMedia } from "@/actions/generate";

import { useFetchable } from "./use-fetchable";

export function useGenerateMedia() {
    const [state, setState] = useFetchable<MediaResponse>();

    const tryGeneratePreview = async (payload: AttributesMap) => {
        // Always set loading true
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));

        try {
            // Try to character preview
            const {
                primary,
                pfp,
            } = await generateMedia(payload, { base64: true });

            if(!primary || !pfp) {
                throw new Error("Something went wrong generating the media");
            }

            setState((prev) => ({
                ...prev,
                data: {
                    primary: `data:image/png;base64,${primary}`,
                    pfp: `data:image/png;base64,${pfp}`,
                },
            }))
        } catch (error) {
            // Whoops
            setState((prev) => ({
                ...prev,
                error: String(error),
            }));
        } finally {
             // Always set loading false and fetched true
             setState((prev) => ({
                ...prev,
                isLoading: false,
                isFetched: true,
            }));
        }
    };

    return {
        mediaState: state,
        generatePreview : tryGeneratePreview,
    };
}