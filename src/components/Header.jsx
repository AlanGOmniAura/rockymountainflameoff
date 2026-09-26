import React from 'react';
import { YEARS, EVENT_DETAILS } from '../data/entries';
import { Calendar, MapPin, Ticket, UserCheck, Flame } from 'lucide-react';

export default function Header({
  selectedYear,
  setSelectedYear,
  selectedCategory,
  setSelectedCategory,
  selectedArtist,
  setSelectedArtist,
  artists
}) {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs font-semibold py-2 border-b border-zinc-800/50 text-zinc-400 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex rounded-full h-2 w-2 bg-orange-500 shrink-0"></span>
            <span className="text-orange-400 font-bold whitespace-nowrap">2026 Event Dates:</span>
            <span className="whitespace-nowrap">September 4th–6th</span>
            <span className="hidden xs:inline">•</span>
            <span className="whitespace-nowrap">Glass Class Denver</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://rockymountainflameoff.com/artist-registration" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-amber-400 transition flex items-center gap-1 whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Artist Registration</span>
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Glass+Class+Denver,+2830+S+Elati+St,+Englewood,+CO+80113" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-amber-400 transition flex items-center gap-1 hidden sm:flex whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Directions</span>
            </a>
          </div>
        </div>

        {/* Main Nav Header */}
        <div className="py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Official Logo & Branding */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Rocky Mountain Flame Off" 
                className="h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition duration-300"
                onError={(e) => { e.target.style.display='none'; }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                    Rocky Mountain <span className="text-orange-500">Flame Off</span>
                  </h1>
                  <span className="px-2.5 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded-md text-xs font-extrabold tracking-wider">
                    {selectedYear}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-medium">
                  Colorado's Premier Live Glassblowing Competition
                </p>
              </div>
            </a>
          </div>

          {/* Controls: Year Selector & Quick Navigation */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Year Selector */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 shadow-inner">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-zinc-400 uppercase">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-amber-400 font-bold text-sm focus:outline-none cursor-pointer"
              >
                {YEARS.map((yr) => (
                  <option key={yr} value={yr} className="bg-zinc-900 text-zinc-100">
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Action Button */}
            <a
              href="https://rockymountainflameoff.com/artist-registration"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl uppercase tracking-wider transition shadow-lg shadow-black/40 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Ticket className="w-4 h-4 stroke-[2.5]" />
              Competitor Registration
            </a>

          </div>

        </div>

      </div>
    </header>
  );
}
