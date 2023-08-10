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
                        Twitter
                    </a>
                    <a className="link flex items-center text-xs mr-5" href="https://discord.gg/tVajHVnv" target="_blank">
                        Discord
                    </a>
                    <a className="link flex items-center text-xs" href="https://github.com/TipLink/opos-outliers" target="_blank">
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    )
}
