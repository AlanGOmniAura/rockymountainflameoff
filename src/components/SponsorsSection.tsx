'use client';

import React from 'react';

export interface Sponsor {
    name: string;
    logo: string;
    tier: 1 | 2 | 3;
    darkBg?: boolean;
}

export const SPONSORS: Sponsor[] = [
    // Group 1: Featured Sponsors
    { name: 'Bethlehem Apparatus', logo: '/sponsors/1-bethlehem-apparatus.webp', tier: 1 },
    { name: 'D&L Art Glass Supply', logo: '/sponsors/1-dl-art-glass.png', tier: 1 },
    { name: 'Glass Class Denver', logo: '/sponsors/1-glass-class-denver.png', tier: 1 },
    { name: 'GTT (Glass Torch Tech)', logo: '/sponsors/1-gtt-logo.png', tier: 1, darkBg: true },

    // Group 2: Key Sponsors
    { name: 'ABR Imagery', logo: '/sponsors/2-abr-imagery.jpg', tier: 2 },
    { name: 'CaberLight', logo: '/sponsors/2-caberlight.png', tier: 2 },
    { name: 'Colorado Color Co.', logo: '/sponsors/2-colorado-color-company.png', tier: 2 },
    { name: 'Northstar Glass', logo: '/sponsors/2-northstar-glass.jpg', tier: 2 },

    // Group 3: Event Sponsors
    { name: 'Bandhu', logo: '/sponsors/3-bandhu.jpg', tier: 3 },
    { name: 'Buckeye Welding', logo: '/sponsors/3-buckeye-welding.png', tier: 3, darkBg: true },
    { name: 'CR3 Tools', logo: '/sponsors/3-cr3-tools.jpeg', tier: 3 },
    { name: 'Dopals', logo: '/sponsors/3-dopals.jpg', tier: 3 },
    { name: 'Englewood Propane', logo: '/sponsors/3-englewood-propane.png', tier: 3 },
    { name: 'Firebug Tools', logo: '/sponsors/3-firebug.jpg', tier: 3 },
    { name: 'Hand of Man', logo: '/sponsors/3-hand-of-man.png', tier: 3, darkBg: true },
    { name: 'LazerCat', logo: '/sponsors/3-lazercat.png', tier: 3, darkBg: true },
    { name: 'Mazet Glass', logo: '/sponsors/3-mazet-glass.jpg', tier: 3, darkBg: true },
    { name: 'MIBCON', logo: '/sponsors/3-mibcon.png', tier: 3 },
    { name: 'Mike Close (Marble On Molds)', logo: '/sponsors/3-mike-close.png', tier: 3 },
    { name: 'Puffco', logo: '/sponsors/3-puffco.png', tier: 3 },
];

export default function SponsorsSection() {
    const group1 = SPONSORS.filter(s => s.tier === 1);
    const group2 = SPONSORS.filter(s => s.tier === 2);
    const group3 = SPONSORS.filter(s => s.tier === 3);

    return (
        <div className="w-full max-w-6xl flex flex-col items-center gap-10 mt-8 shrink-0">
            {/* Section Header */}
            <div className="text-center space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    Official Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500">Sponsors</span>
                </h2>
                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                    Proudly supported by leading innovators, craft toolmakers, and community leaders in the glass arts industry.
                </p>
            </div>

            {/* Main Section Container */}
            <div className="w-full bg-black/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-8">
                
                {/* Group 1 Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {group1.map((sponsor, idx) => (
                        <div 
                            key={idx}
                            className="group flex flex-col items-center justify-between p-3 sm:p-4 min-h-[170px] bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className={`w-full flex-1 rounded-xl p-3 flex items-center justify-center transition-all duration-300 ${sponsor.darkBg ? 'bg-zinc-950 border border-zinc-800' : 'bg-white/95 group-hover:bg-white'}`}>
                                <img 
                                    src={sponsor.logo} 
                                    alt={sponsor.name} 
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-[85px] max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 text-center line-clamp-1 mt-2.5 group-hover:text-amber-300 transition-colors">
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Group 2 Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {group2.map((sponsor, idx) => (
                        <div 
                            key={idx}
                            className="group flex flex-col items-center justify-between p-3 min-h-[140px] bg-zinc-900/90 rounded-xl border border-zinc-800 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                        >
                            <div className={`w-full flex-1 rounded-lg p-2.5 flex items-center justify-center transition-all duration-300 ${sponsor.darkBg ? 'bg-zinc-950 border border-zinc-800' : 'bg-white/95 group-hover:bg-white'}`}>
                                <img 
                                    src={sponsor.logo} 
                                    alt={sponsor.name} 
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-[65px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-zinc-200 text-center line-clamp-1 mt-2 group-hover:text-orange-300 transition-colors">
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Group 3 Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {group3.map((sponsor, idx) => (
                        <div 
                            key={idx}
                            className="group flex flex-col items-center justify-between p-2.5 min-h-[120px] bg-zinc-900/80 rounded-lg border border-zinc-800/80 hover:border-zinc-500 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                        >
                            <div className={`w-full flex-1 rounded-md p-2 flex items-center justify-center transition-all duration-300 ${sponsor.darkBg ? 'bg-zinc-950 border border-zinc-800' : 'bg-white/95 group-hover:bg-white'}`}>
                                <img 
                                    src={sponsor.logo} 
                                    alt={sponsor.name} 
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-[50px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-300 text-center line-clamp-1 mt-1.5 group-hover:text-white transition-colors">
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
