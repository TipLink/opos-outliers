/* eslint-disable @next/next/no-img-element */
export function Footer() {
    return (
        <footer className="flex justify-between items-center flex-wrap">
            <img src="https://tiplink.io/_next/static/media/powered-tiplink.2b2adbb2.png" className="h-4" alt="tiplink" />

            <div className="flex text-xs">
                <p className="mr-1">Art by</p>
                <a className="link flex items-center mr-5" href="https://twitter.com/HeartyHomies" target="_blank">Hearty ♥</a>
            </div>

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
    )
}