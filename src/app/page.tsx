"use client"

/* eslint-disable @next/next/no-img-element */
import { config } from "@/config";

import { CharacterDesignProvider, useCharacterDesign } from '@/hooks/use-character-design';

import { AttributeSelector } from '@/components/attributes-selector';
import { MediaPreview } from '@/components/media-preview';
import { ConfirmAvatarModal } from '@/components/modals/confirm-avatar';
import { Footer } from '@/components/footer';

function ConfirmButton() {
    const { setShowConfirmMint } = useCharacterDesign();

    return (
        <button className="btn w-full bg-primary bg-gray-900 border-0 font-space-mono" onClick={() => setShowConfirmMint(true)}>
            Confirm Avatar
        </button>
    );
}

function RandomButton() {
    const { randomize } = useCharacterDesign();

    return (
        <button className="btn bg-secondary w-full border border-0 font-space-mono" onClick={randomize}>Random</button>
    );
}

function OnlyPossibleOnSolana() {
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

export default function Home() {
  return (
        <div className="min-h-screen p-3 w-full bg-cover bg-center bg-[url('/mobile-bg.jpg')] md:bg-[url('/bg.jpg')] flex flex-col justify-between">
            <div className="max-w-3xl h-full mx-auto">
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
                            <ConfirmAvatarModal />
                        </div>
                    </div>
                </CharacterDesignProvider>
            </div>
            
            <Footer />
        </div>
    )
}
