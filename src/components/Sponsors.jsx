import React from 'react';

const TIER_1 = [
  { name: "Bethlehem Apparatus", src: "/sponsors/1-bethlehem-apparatus.webp", dark: false },
  { name: "D&L Art Glass Supply", src: "/sponsors/1-dl-art-glass.png", dark: false },
  { name: "Glass Class Denver", src: "/sponsors/1-glass-class-denver.png", dark: false },
  { name: "GTT (Glass Torch Tech)", src: "/sponsors/1-gtt-logo.png", dark: true },
];

const TIER_2 = [
  { name: "ABR Imagery", src: "/sponsors/2-abr-imagery.jpg", dark: false },
  { name: "CaberLight", src: "/sponsors/2-caberlight.png", dark: false },
  { name: "Colorado Color Co.", src: "/sponsors/2-colorado-color-company.png", dark: false },
  { name: "Northstar Glass", src: "/sponsors/2-northstar-glass.jpg", dark: false },
];

const TIER_3 = [
  { name: "Bandhu", src: "/sponsors/3-bandhu.jpg", dark: false },
  { name: "Buckeye Welding", src: "/sponsors/3-buckeye-welding.png", dark: true },
  { name: "CR3 Tools", src: "/sponsors/3-cr3-tools.jpeg", dark: false },
  { name: "Dopals", src: "/sponsors/3-dopals.jpg", dark: false },
  { name: "Englewood Propane", src: "/sponsors/3-englewood-propane.png", dark: false },
  { name: "Firebug Tools", src: "/sponsors/3-firebug.jpg", dark: false },
  { name: "Hand of Man", src: "/sponsors/3-hand-of-man.png", dark: true },
  { name: "LazerCat", src: "/sponsors/3-lazercat.png", dark: true },
  { name: "Mazet Glass", src: "/sponsors/3-mazet-glass.jpg", dark: true },
  { name: "MIBCON", src: "/sponsors/3-mibcon.png", dark: false },
  { name: "Mike Close (Marble On Molds)", src: "/sponsors/3-mike-close.png", dark: false },
  { name: "Puffco", src: "/sponsors/3-puffco.png", dark: false },
];

export default function Sponsors() {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-10 mt-8 shrink-0" id="official-sponsors">
      
      {/* Title Header matching live site */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white text-balance">
          Official Event <span className="text-orange-500 whitespace-nowrap">Sponsors</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-pretty">
          Proudly supported by leading innovators, craft toolmakers, and community leaders in the glass arts industry.
        </p>
      </div>

      {/* Sponsors Section Grid Wrapper (Flattened to eliminate nested-cards) */}
      <div className="w-full flex flex-col gap-8">
        
        {/* Tier 1 Sponsors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TIER_1.map((s, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-between p-3 sm:p-4 min-h-[175px] bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-xl shadow-black/40 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`w-full flex-1 rounded-xl p-3 flex items-center justify-center transition-colors duration-300 ${s.dark ? 'bg-zinc-950' : 'bg-white/95 group-hover:bg-white'}`}>
                <img
                  src={s.src}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[85px] max-w-full object-contain filter"
                />
              </div>
              <span className="min-h-[2.5rem] flex items-center justify-center text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 text-center line-clamp-2 leading-snug mt-2.5 group-hover:text-amber-300 transition-colors">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Tier 2 Sponsors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {TIER_2.map((s, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-between p-3 min-h-[145px] bg-zinc-900/90 rounded-xl border border-zinc-800 hover:border-orange-500/50 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
            >
              <div className={`w-full flex-1 rounded-lg p-2.5 flex items-center justify-center transition-colors duration-300 ${s.dark ? 'bg-zinc-950' : 'bg-white/95 group-hover:bg-white'}`}>
                <img
                  src={s.src}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[65px] max-w-full object-contain"
                />
              </div>
              <span className="min-h-[2.25rem] flex items-center justify-center text-xs font-bold uppercase tracking-wide text-zinc-200 text-center line-clamp-2 leading-tight mt-2 group-hover:text-orange-300 transition-colors">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Tier 3 Sponsors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {TIER_3.map((s, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-between p-2.5 min-h-[128px] bg-zinc-900/80 rounded-lg border border-zinc-800/80 hover:border-zinc-500 shadow-md shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
            >
              <div className={`w-full flex-1 rounded-md p-2 flex items-center justify-center transition-colors duration-300 ${s.dark ? 'bg-zinc-950' : 'bg-white/95 group-hover:bg-white'}`}>
                <img
                  src={s.src}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[50px] max-w-full object-contain"
                />
              </div>
              <span className="min-h-[2.25rem] flex items-center justify-center text-xs font-semibold text-zinc-300 text-center line-clamp-2 leading-tight mt-1.5 group-hover:text-white transition-colors">
                {s.name}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
