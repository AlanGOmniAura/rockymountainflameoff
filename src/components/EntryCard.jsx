import React from 'react';
import { Trophy, Award, MapPin, Flame } from 'lucide-react';

export default function EntryCard({ entry, onSelect }) {
  const getBadge = () => {
    if (entry.placement === 'Winner') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black bg-amber-400 text-amber-950 rounded-md uppercase tracking-wider whitespace-nowrap">
          <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />
          Winner
        </span>
      );
    }
    if (entry.placement === 'Runner Up') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-black bg-zinc-200 text-zinc-900 rounded-md uppercase tracking-wider whitespace-nowrap">
          <Award className="w-3.5 h-3.5 stroke-[2.5]" />
          Runner Up
        </span>
      );
    }
    if (entry.placement) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-orange-950/60 text-orange-300 border border-orange-500/30 rounded-md uppercase tracking-wider whitespace-nowrap">
          {entry.placement}
        </span>
      );
    }
    return null;
  };

  const glassPhoto = entry.thumbPic || entry.glassPic1;

  return (
    <div
      onClick={() => onSelect(entry)}
      className="group bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-0.5"
    >
      {/* Small Pic of Glass (from Client Sketch 1) */}
      <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-black flex flex-col items-center justify-center">
        {glassPhoto ? (
          <img
            src={glassPhoto}
            alt={entry.title || entry.realName}
            className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-700 group-hover:text-orange-500/70 transition-colors">
            <Flame className="w-8 h-8 stroke-[1.5]" />
          </div>
        )}
      </div>

      {/* Artist & Entry Info (Exact fields from Client Sketch 1) */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          {getBadge()}
        </div>

        <h3 className="text-lg font-extrabold text-zinc-100 group-hover:text-orange-400 transition-colors truncate">
          {entry.realName}
        </h3>

        <p className="text-sm font-semibold text-zinc-300 truncate">
          {entry.glassName}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
          <MapPin className="w-3.5 h-3.5 text-orange-500/80 flex-shrink-0" />
          <span className="truncate">{entry.cityState}</span>
        </div>
      </div>
    </div>
  );
}
