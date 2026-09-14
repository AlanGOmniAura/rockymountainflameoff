import type { Metadata } from 'next';
import { Outfit, Inter, Geist } from 'next/font/google';
import './globals.scss';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    display: 'swap', // Always show text, swap to custom font when ready (prevents FOIT)
    preload: true,
});

const inter = Inter({
    variable: '--font-body',
    subsets: ['latin'],
    weight: ['300', '400', '600'],
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    metadataBase: new URL('https://rockymountainflameoff.com'),
    title: 'Rocky Mountain Flame Off | Live Glassblowing Competition',
    description:
        "Join the annual Rocky Mountain Flame Off in Denver, CO. Live glassblowing competition, food trucks, music, and voter-crowned winners. Hosted by Glass Class Denver.",
};

import FareHarborScript from '@/components/FareHarborScript';
import AxeCore from '@/components/AxeCore';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("font-sans", geist.variable)}>
            <head>
                {/* Preconnect to external services to reduce DNS latency */}
                <link rel="preconnect" href="https://maps.googleapis.com" />
                <link rel="dns-prefetch" href="https://fareharbor.com" />
                <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
            </head>
            <body
                className={`${outfit.variable} ${inter.variable} ${inter.className} antialiased`}
                suppressHydrationWarning
            >
                {/* Skip navigation — appears on first Tab keypress for keyboard users */}
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                <AxeCore />
                {children}
            </body>
        </html>
    );
}

