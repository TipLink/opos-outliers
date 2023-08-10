import { useCharacterDesign } from "@/hooks/use-character-design";

import { Download, X } from 'lucide-react';

import classNames from "classnames";

function MintButton() {
    const {
        mint,
        mediaState,
        isMinting,
    } = useCharacterDesign();

    return (
        <>  
            <div className="w-full">
                {isMinting && (
                    <div>
                        <p>
                            Minting...
                        </p>

                        <progress className="progress w-full"></progress>
                    </div>
                )}

                <button
                    onClick={mint}
                    className={classNames({
                        "btn btn-success flex-grow w-full": true,
                        "opacity-50 pointer-none": isMinting,
                        "btn-success": mediaState.data,
                    })}
                >
                    Free!
                </button>
            </div>
        </>
    );
}

export function ConfirmAvatarModal() {
    const { showConfirmMint, setShowConfirmMint, mediaState, attributeValuesMap } = useCharacterDesign();

    return (
        <>
            {/* First Modal */}
            <div className={`backdrop ${showConfirmMint ? 'backdrop-open' : ''}`}></div>
            <div className={`modal ${showConfirmMint ? 'modal-open' : ''}`} onClick={() => setShowConfirmMint(false)}>
                <div className="modal-box inset-0 w-full sm:w-2xl h-auto max-h-full overflow-hidden flex flex-col p-5 sm:p-5 relative" onClick={e => e.stopPropagation()}>
                    <button className="absolute -top-1 -right-1 z-20 text-white font-bold p-3 rounded" onClick={() => setShowConfirmMint(false)}>
                        <X size={26} />
                    </button>
                    <div className="w-full flex flex-col justify-center">
                        <div className="relative w-full p-2">
                            <img className="aspect-ratio w-full h-full rounded-xl" src={mediaState?.data?.primary} alt="" />
                            <img className="aspect-ratio w-[30%] absolute right-2 bottom-2 rounded-full shadow-2xl" src={mediaState?.data?.pfp} alt="" />
                            <div className="absolute bottom-4 left-4 flex-row space-y-1">
                                <a href={mediaState?.data?.primary} download className="text-base-200">
                                    <button className="bg-black text-white rounded py-1 px-2 mr-2 text-xs">
                                        <Download className="inline-block w-4 h-4 mr-1 align-middle" />Primary
                                    </button>
                                </a>
                                <a href={mediaState?.data?.pfp} download className="text-base-200">
                                    <button className="bg-black text-white rounded py-1 px-2 text-xs">
                                        <Download className="inline-block w-4 h-4 mr-1 align-middle" />PFP
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col pl-1">
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:gap-2 mt-2">
                            {Object.entries(attributeValuesMap).map(([key, value]) => (
                                <div key={key} className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-20 rounded font-semibold text-xs flex flex-col justify-start items-start py-[4px] sm:py-[8px] px-[6px] sm:px-[12px] gap-1">
                                    <h3 className="text-grey-400 text-[10px]">{key}</h3>
                                    <p className="text-grey-700 capitalize">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className="modal-action mt-2 sm:mt-4 font-space-mono w-full">
                            < MintButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );    
}