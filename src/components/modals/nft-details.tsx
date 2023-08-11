import type { Item } from "@/types";

import { Download, X } from 'lucide-react';

import { MediaPreview } from "@/components/media-preview";

export function NftDetailsModal(props: {
    show: boolean,
    close: () => void,
    item?: Item,
    children?: React.ReactNode
}) {
    return  props.show && props.item && (
        <>
            <div className="modal modal-open !bg-black !bg-opacity-80" onClick={props.close}>
                <div className="modal-box inset-0 w-full sm:w-2xl h-auto max-h-full overflow-hidden flex flex-col p-5 sm:p-5 relative glass" onClick={e => e.stopPropagation()}>
                    <button className="absolute top-0 right-0 z-20 text-white font-bold p-3 rounded" onClick={props.close}>
                        <X size={26} />
                    </button>

                    <div className="my-2"></div>
                    
                    <div className="w-full flex flex-col justify-center">
                        <div className="relative w-full p-2">
                            <MediaPreview
                                image={props.item.image}
                                secondaryImage={props.item.secondaryImage}
                            />
                            
                            <div className="absolute bottom-4 left-4 flex w-full">
                                <div>
                                    <a
                                        href={props.item.image}
                                        download
                                        className="text-base-200 flex items-center"
                                    >
                                        <button className="bg-black text-white rounded py-1 px-2 mr-2 text-xs">
                                            <Download className="inline-block w-4 h-4 mr-1 mb-1 align-middle" />
                                            Primary
                                        </button>
                                    </a>

                                </div>
                                <div>
                                    <a 
                                        href={props.item.secondaryImage}
                                        download
                                        className="text-base-200 flex items-center"
                                    >
                                        <button className="bg-black text-white rounded py-1 px-2 text-xs">
                                            <Download className="inline-block w-4 h-4 mr-1 align-middle mb-1" />PFP
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-1">
                        <h3 className="text-xl font-bold">{props.item.name.slice(0, -1) }</h3>
                        <p className="text-xs">{props.item.description}</p>
                    </div>
                    <div className="w-full flex flex-col pl-1">
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:gap-2 mt-2">
                            {props.item.attributes.map(({
                                trait_type,
                                value
                            }, key) => (
                                <div key={key} className="backdrop-filter backdrop-blur-lg bg-black bg-opacity-90 rounded font-semibold text-xs flex flex-col justify-start items-start py-[4px] sm:py-[8px] px-[6px] sm:px-[12px] gap-1">
                                    <h3 className="text-grey-400 text-[10px] uppercase opacity-60">{trait_type}</h3>
                                    <p className="text-grey-700">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className="modal-action mt-2 sm:mt-4 font-space-mono w-full">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}