/* eslint-disable @next/next/no-img-element */
import { CharacterDesign } from "@/components/character-design";

export default function Home() {
  return (
        <div className="min-h-screen p-3 w-full bg-cover bg-center bg-[url('/mobile-bg.jpg')] md:bg-[url('/bg.jpg')] flex flex-col justify-between">
            <div className="max-w-3xl h-full mx-auto">
                <CharacterDesign />
            </div>
            <footer className="flex justify-between flex-wrap">
                <img src="https://tiplink.io/_next/static/media/powered-tiplink.2b2adbb2.png" className="h-4" alt="tiplink" />

                <div className="flex py-5 md:py-0">
                    <a className="link flex items-center mr-5 text-xs" href="https://twitter.com/TipLinkOfficial" target="_blank">
                        <img src="x-logo.png" className="h-5" alt="x"/>
                        @TipLinkOfficial
                    </a>
                    <a className="link flex items-center text-xs" href="https://discord.gg/tVajHVnv" target="_blank">
                        <img src="discord.svg" className="h-5 mr-3" alt="twitter" />
                        TipLink Discord
                    </a>
                </div>
            </footer>
        </div>
    )
}
