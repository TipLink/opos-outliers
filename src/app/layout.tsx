import "../styles/main.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OPOS Outliers',
  description: 'Unlimited compressed NFT characters. Collect them all!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>OPOS Outliers</title>

                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                
                <meta
                    name="robots"
                    content="noindex"
                />
                <meta
                    property="og:title"
                    content="Unlimited NFT avatars! Collect them all!"
                />
                <meta
                    property="og:url"
                    content="https://www.opos.quest/"
                />
                <meta
                    property="og:image"
                    content="https://shdw-drive.genesysgo.net/ADWuF2B47kMkwSMmmPfN5uiUBd4muqZ4HJuVRZQy2Z9X/Frame%209296%20(1).png"
                />
                <meta
                    property="og:image:width"
                    content="400"
                />
                <meta
                    property="og:image:type"
                    content="image/png"
                />
                <meta name="twitter:card" content="summary_large_image"/>
                <meta property="twitter:domain" content="opos.quest"/>
                <meta name="twitter:site" content="@TipLinkOfficial"/>
                <meta property="twitter:url" content="https://www.opos.quest/"/>
                <meta name="twitter:title" content="Create your avatar!"/>
                <meta name="twitter:description" content="Unlimited compressed NFT characters. Collect them all!"/>
                <meta name="twitter:image" content="https://www.opos.quest/OPOSCard.png"/>
            </head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );    
}
