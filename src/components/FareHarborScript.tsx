'use client';

import Script from 'next/script';

export default function FareHarborScript() {
    return (
        <Script
            src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"
            strategy="lazyOnload"
            onLoad={() => {
                console.log('FareHarbor Script Loaded');
            }}
        />
    );
}
