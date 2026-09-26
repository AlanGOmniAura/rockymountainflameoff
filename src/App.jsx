import React, { useState, useMemo, useEffect } from 'react';
import Hero from './components/Hero';
import Slideshow from './components/Slideshow';
import Sponsors from './components/Sponsors';
import EntryCard from './components/EntryCard';
import ArtistModal from './components/ArtistModal';
import { ALL_ENTRIES, CATEGORIES } from './data/entries';
import { Filter, User, SearchX, Layers, Trophy, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedArtist, setSelectedArtist] = useState('ALL');
  const [activeModalEntry, setActiveModalEntry] = useState(null);

  // Check for deep-link entry parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entryId = params.get('entry');
    if (entryId) {
      const match = ALL_ENTRIES.find((e) => e.id === entryId);
      if (match) {
        setActiveModalEntry(match);
      }
    }
  }, []);

  const handleOpenModal = (entry) => {
    setActiveModalEntry(entry);
    const url = new URL(window.location);
    url.searchParams.set('entry', entry.id);
    window.history.replaceState({}, '', url);
  };

  const handleCloseModal = () => {
    setActiveModalEntry(null);
    const url = new URL(window.location);
    url.searchParams.delete('entry');
    window.history.replaceState({}, '', url);
  };

  // Unique competing artists across all entries
  const artists = useMemo(() => {
    return Array.from(new Set(ALL_ENTRIES.map((e) => e.realName))).sort();
  }, []);

  // Filtered entries based on Category & Artist dropdowns (Client Sketch 1)
  const filteredEntries = useMemo(() => {
    return ALL_ENTRIES.filter((entry) => {
      const matchCategory = selectedCategory === 'ALL' || entry.category === selectedCategory;
      const matchArtist = selectedArtist === 'ALL' || entry.realName === selectedArtist;
      return matchCategory && matchArtist;
    });
  }, [selectedCategory, selectedArtist]);

  // Group filtered entries by category
  const groupedCategories = useMemo(() => {
    const groups = {};
    filteredEntries.forEach((entry) => {
      if (!groups[entry.category]) {
        groups[entry.category] = [];
      }
      groups[entry.category].push(entry);
    });
    // Sort entries within each category by placementRank (Winner = 1, Runner Up = 2, etc.)
    Object.keys(groups).forEach((cat) => {
      groups[cat].sort((a, b) => (a.placementRank || 99) - (b.placementRank || 99));
    });
    return groups;
  }, [filteredEntries]);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start relative overflow-x-hidden bg-zinc-950 text-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Fixed Radial Gradient Background matching Live Website */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/80 to-zinc-950" />
      </div>

      {/* Main Content Section with Hero bg.png overlay */}
      <section className="relative w-full z-20 bg-zinc-950 overflow-hidden">
        {/* Background art scoped to the Hero viewport area with smooth dark fade */}
        <div className="absolute top-0 left-0 right-0 h-[1900px] opacity-80 bg-[url('/bg.png')] bg-cover bg-top bg-no-repeat pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1900px] bg-black/20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1900px] bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950 pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center justify-start pt-8 md:pt-14 pb-20 px-4 gap-10 sm:gap-14 lg:gap-18">
          
          {/* 1. Official Live Site Hero (Floating Logo, Venue, Wrap-Up Celebration, Highlights Video) */}
          <Hero />

          {/* 2. Fixed & Enhanced Live Atmosphere Action Reel Slideshow (151 Drive Photos) */}
          <Slideshow />

          {/* 3. Competition Gallery & Results (The Client Wireframe Feature) */}
          <div className="w-full max-w-6xl flex flex-col items-center gap-8 mt-4 shrink-0" id="competition-gallery">
            
            {/* Gallery Section Header matching Live Site aesthetics */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                Official Competition Entries & Winners
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white text-balance">
                Rocky Mountain <span className="text-orange-500 whitespace-nowrap">Flame Off Gallery</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium text-pretty">
                Browse all entered pieces, crowned category winners, and competing artists across all official competition categories.
              </p>
            </div>

            {/* Gallery Controls & Content Wrapper (Flattened layout hierarchy) */}
            <div className="w-full flex flex-col gap-8">
              
              {/* Filter Controls Row (From Client Sketch 1: Category Dropdown & Artist Dropdown) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
                
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>{filteredEntries.length} {filteredEntries.length === 1 ? 'Entry' : 'Entries'}</span>
                </div>

                {/* The Two Dropdowns from Client Sketch 1 */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  
                  {/* Dropdown 1: "Drop down of all 8 categories" */}
                  <div className="flex items-center justify-between sm:justify-start gap-2 bg-zinc-900/90 border border-zinc-700/60 rounded-xl px-3.5 py-2 text-xs w-full sm:w-auto">
                    <div className="flex items-center gap-2 shrink-0">
                      <Filter className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="text-zinc-400 font-bold uppercase whitespace-nowrap">Category:</span>
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent text-white font-bold focus:outline-none cursor-pointer max-w-[200px] truncate text-right sm:text-left"
                    >
                      <option value="ALL" className="bg-zinc-900 text-white">All Categories ({CATEGORIES.length})</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-zinc-900 text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 2: "Drop down of all competing artists" */}
                  <div className="flex items-center justify-between sm:justify-start gap-2 bg-zinc-900/90 border border-zinc-700/60 rounded-xl px-3.5 py-2 text-xs w-full sm:w-auto">
                    <div className="flex items-center gap-2 shrink-0">
                      <User className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="text-zinc-400 font-bold uppercase whitespace-nowrap">Artist:</span>
                    </div>
                    <select
                      value={selectedArtist}
                      onChange={(e) => setSelectedArtist(e.target.value)}
                      className="bg-transparent text-white font-bold focus:outline-none cursor-pointer max-w-[200px] truncate text-right sm:text-left"
                    >
                      <option value="ALL" className="bg-zinc-900 text-white">All Artists ({artists.length})</option>
                      {artists.map((artist) => (
                        <option key={artist} value={artist} className="bg-zinc-900 text-white">
                          {artist}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

              {/* Categorized Entries Display (Exact Grouping from Client Sketch 1) */}
              {Object.keys(groupedCategories).length === 0 ? (
                <div className="py-12 text-center space-y-4 max-w-md mx-auto">
                  <SearchX className="w-12 h-12 text-zinc-600 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-zinc-200">No Entries Found</h3>
                    <p className="text-xs text-zinc-400">
                      Try selecting another category or artist filter.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL');
                      setSelectedArtist('ALL');
                    }}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-10">
                  {Object.entries(groupedCategories).map(([categoryName, entries]) => (
                    <div key={categoryName} className="space-y-4" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
                      
                      {/* Category Heading (e.g. "Sculpture" as drawn in Sketch 1) */}
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/90">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase truncate">
                            {categoryName}
                          </h3>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xl whitespace-nowrap shrink-0 ml-2">
                          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                        </span>
                      </div>

                      {/* Entries Grid (Cards with Small Pic of Glass, Winner/Runner Up, Artist Name) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {entries.map((entry) => (
                          <EntryCard
                            key={entry.id}
                            entry={entry}
                            onSelect={handleOpenModal}
                          />
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

          {/* 4. Official Event Sponsors (Exact 3-Tier Grid from Live Site) */}
          <Sponsors />

        </div>
      </section>

      {/* Footer matching Live Site theme */}
      <footer className="w-full bg-black py-8 px-4 text-center text-sm text-zinc-400 space-y-2 border-t border-zinc-900">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.png" alt="Rocky Mountain Flame Off" className="h-6 w-auto opacity-70" />
          <span className="font-bold text-zinc-300 uppercase tracking-wider whitespace-nowrap">Rocky Mountain Flame Off</span>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-zinc-400 text-xs sm:text-sm">
          <span className="whitespace-nowrap">Hosted by Glass Class Denver</span>
          <span className="hidden sm:inline text-zinc-600 select-none">•</span>
          <span className="whitespace-nowrap">2830 S Elati St, Englewood, CO 80113</span>
        </p>
        <p className="text-xs text-zinc-400">© Rocky Mountain Flame Off. All rights reserved.</p>
      </footer>

      {/* Detail View Modal (Exact from Client Sketch 2) */}
      <ArtistModal
        entry={activeModalEntry}
        onClose={handleCloseModal}
      />
    </main>
  );
}
