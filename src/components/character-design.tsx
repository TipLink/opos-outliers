/* eslint-disable @next/next/no-img-element */
"use client";

import { Download, X } from 'lucide-react';
import { CharacterDesignProvider, useCharacterDesign } from '@/hooks/use-character-design';
import { useEffect, useState } from 'react';
import classNames from "classnames";
import { config } from "@/config";


type SelectorProps = {
    options: string[];
    label?: string;
    selectedIndex?: number;
    onChange: (idx: number) => void;
};


function RandomButton() {
    const { randomize } = useCharacterDesign();

    return (
        <button className="btn bg-secondary w-full border border-0 font-space-mono" onClick={randomize}>Random</button>
    );
}

function ConfirmButton() {
    const { setShowConfirmMint } = useCharacterDesign();

    return (
        <button className="btn w-full bg-primary bg-gray-900 border-0 font-space-mono" onClick={() => setShowConfirmMint(true)}>
            Confirm Avatar
        </button>
    );
}

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

function ArrowSelector({
    options,
    label,
    selectedIndex = 0,
    onChange,
}: SelectorProps) {
    const [idx, setIdx] = useState<number>(0);

    const prev = () => {
        setIdx(idx < 1 ? options.length - 1 : idx - 1);
    };

    const next = () => {
        setIdx(idx > options.length - 2 ? 0 : idx + 1);
    };

    useEffect(() => onChange(idx), [idx]);

    return (
        <div className="flex w-full items-center my-3" key={idx}>
            <button className="btn bg-secondary border-0" onClick={prev}>
                <img src="/leftA.png" alt="My Custom Button" style={{ width: '30px', height: '30px' }} />
            </button>
            <div className="flex-1 bg-magenta-200 text-center overflow-hidden">
                <p className="text-xs whitespace-nowrap overflow-ellipsis text-white md:text-gray-200">{label}</p>
                <p className="whitespace-nowrap overflow-ellipsis text-white font-bold">{options[selectedIndex || idx]}</p>
            </div>
            <button className="btn bg-secondary border-0" onClick={next}>
                <img src="/right.png" alt="My Custom Button" style={{ width: '30px', height: '30px' }} />
            </button>
        </div>
    );
}

function MediaPreview() {
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

const AttributesArrowSelector = ({ attributeName } : { attributeName : string }) => {
    const { setAttributeValue, attributeValuesMap } = useCharacterDesign();

    const options = Object.keys(config.attributes[attributeName]);
    const selectedIndex = options.indexOf(attributeValuesMap[attributeName]);

    return (
        <div className="font-space-mono flex" key={attributeName}>
            <ArrowSelector
                options={options}
                label={attributeName}
                selectedIndex={selectedIndex}
                onChange={(newAttributeValueIndex) => {
                    setAttributeValue(attributeName, options[newAttributeValueIndex]);
                }}
            />
        </div>
    );
}

export function AttributeSelector({}) {
    return (
        <div className="w-full">
            <div className="flex flex-col">
                <AttributesArrowSelector attributeName="Background" />
                <AttributesArrowSelector attributeName="Skin Color" />
                <AttributesArrowSelector attributeName="Head" />
                <AttributesArrowSelector attributeName="Face" />
                <AttributesArrowSelector attributeName="Torso" />
                <AttributesArrowSelector attributeName="Logo" />
                <AttributesArrowSelector attributeName="Legs" />
                <AttributesArrowSelector attributeName="Feet" />
            </div>
        </div>
    );
}

function MyModal() {
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

export function OnlyPossibleOnSolana() {

    return (
        <div className="glass p-4 rounded-xl">
            <h3 className="font-bold text-xl text-gray-900">Only Possible on Solana</h3>
            <p className="text-gray-800 text-xs mb-2">This project was built for the Only Possible on Solana hackathon to showcase the power of compressed NFTs and TipLink.</p>
            
            <i className="text-xs text-white md:text-gray-200">Special Thanks</i>

            <div className="flex flex-row items-center flex-wrap mt-1">
                <img src="https://solana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogotype.e4df684f.svg&w=256&q=75" alt="" className="h-3 mr-4 mb-4" />
                <img src="https://tiplink.io/logo.svg" className="h-5 mb-4 mr-4" alt="" />
                <img src="https://assets-global.website-files.com/641a8c4cac3aee8bd266fd58/642b60b1a5d4305757babb46_Helius_mark_orange_copy_23-removebg-preview-p-500.png" alt="" className="h-5 mr-4 mb-4" />
                <img src="https://assets.website-files.com/6331fecb532d6d3b1207028c/633b1acaef05130b4457fbd5_shadow-logo.svg" alt="" className="h-5 mr-4 mb-4" />
                <img src="https://assets.website-files.com/62eab5597fa44882d84a8037/62eab5597fa44876504a8096_Metaplex%20Logo_White.svg" alt="" className="h-2 mr-4 mb-4" />
            </div>
        </div>
    )
}

export function CharacterDesign() {
    return (
        <CharacterDesignProvider config={config}>
            <div className="">
                <div className="my-10">
                <h2 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white text-center font-space-mono tracking-tighter font-bold'>OPOS Outliers </h2>
                    <h3 className='text-xl my-2 text-white sm:text-lg md:block text-center font-space-mono tracking-tighter font-bold'>Create your free OPOS Outlier compressed NFT and claim via TipLink!</h3>
                    <div className='text-center mt-1'>
                        <div className="badge badge-primary mr-2 mb-2 text-white font-space-mono">Unlimited Supply</div>
                        <div className="badge badge-primary mr-2 mb-2 text-white font-space-mono">No Wallet Required</div>
                        <div className="badge badge-primary text-white font-space-mono">Completely Free</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-4">
                    <div className="order-1 md:order-0">
                        <div className="w-full glass p-4 rounded-xl">
                            <AttributeSelector />

                            <div className="hidden md:block">
                                <RandomButton />
                            </div>
                        </div>

                        <div className="md:hidden mt-8">
                            <OnlyPossibleOnSolana />
                        </div>
                    </div>

                    <div className="w-full md:order-1">
                        <div className="w-full glass p-4 rounded-xl shadow-xl mb-4">
                            <MediaPreview />

                            <div className="md:hidden my-3">
                                <RandomButton />
                            </div>

                            <div className="mt-3">
                                <ConfirmButton />
                            </div>
                        </div>

                        <div className="hidden md:block mt-3">
                            <OnlyPossibleOnSolana />
                        </div>
                    </div>
                </div>

                <div className="mt-6 md:col-span-3">
                    <MyModal />
                </div>
            </div>
        </CharacterDesignProvider>
    );
}
