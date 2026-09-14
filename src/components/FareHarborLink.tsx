'use client';

import { useEffect } from 'react';

// Declaration to satisfy TS
declare global {
    interface Window {
        FH?: {
            open: (options: any) => void;
        };
    }
}

interface FareHarborLinkProps {
    href: string; // Fallback URL
    className?: string; // For styling
    children: React.ReactNode;
    flow?: number; // Optional flow ID
    isBook?: boolean; // If true, opens main calendar
}

export default function FareHarborLink({ href, className, children, flow }: FareHarborLinkProps) {
    const handleClick = (e: React.MouseEvent) => {
        // Check if FH is available
        if (typeof window !== 'undefined' && window.FH) {
            e.preventDefault();

            const options: any = {
                shortname: 'glassclassdenver',
                fullItems: 'yes',
            };

            if (flow) {
                options.flow = flow;
            }

            window.FH.open(options);
        }
        // If FH not loaded, fall back to standard href navigation (new tab usually better than replacing current if leaving site)
    };

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    );
}
