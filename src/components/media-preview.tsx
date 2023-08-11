/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";

export function MediaPreview(props: {
    image: string | undefined,
    secondaryImage: string | undefined,
    loading?: boolean
}) {
    return (
        <div className={
            classNames({
                "aspect-square w-full relative rounded-xl": true,
            })
        }>  

            {
                props.loading && (
                    <span className="loading loading-spinner loading-md absolute right-3 top-3"></span>
                )
            }
            {props.image && (
                <img alt="" className="aspect-ratio w-full rounded-xl" src={props.image || ""} />
            )}

            {props.secondaryImage && (
                <img alt="" className="aspect-ratio w-[35%] absolute right-1 bottom-1 rounded-full shadow-xl border" src={props.secondaryImage || ""} />
            )}
        </div>
    );
}