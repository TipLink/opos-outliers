/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";

import { useCharacterDesign } from "@/hooks/use-character-design";

export function MediaPreview() {
    const { mediaState } = useCharacterDesign();

    return (
        <div className={
            classNames({
                "aspect-square w-full relative rounded-xl": true,
            })
        }>  

            {
                mediaState.isLoading && (
                    <span className="loading loading-spinner loading-md absolute right-3 top-3"></span>
                )
            }
            <img alt="" className="aspect-ratio w-full rounded-xl" src={mediaState?.data?.primary} />
            <img alt="" className="aspect-ratio w-[35%] absolute right-1 bottom-1 rounded-full shadow-2xl" src={mediaState?.data?.pfp} />
        </div>
    );
}