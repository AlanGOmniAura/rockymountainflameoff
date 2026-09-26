import React, { useState, useEffect, useRef } from 'react';
import { EVENT_SLIDESHOW_PHOTOS, EVENT_SLIDESHOW_THUMBS } from '../data/entries';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Maximize2, X } from 'lucide-react';

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const total = EVENT_SLIDESHOW_PHOTOS.length;
  const thumbnailContainerRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    if (!isPlaying || total === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, total]);

  // Preload adjacent images for instantaneous transition
  useEffect(() => {
    if (total === 0) return;
    const nextIdx = (currentIndex + 1) % total;
    const prevIdx = (currentIndex - 1 + total) % total;
    const imgNext = new Image();
    imgNext.src = EVENT_SLIDESHOW_PHOTOS[nextIdx];
    const imgPrev = new Image();
    imgPrev.src = EVENT_SLIDESHOW_PHOTOS[prevIdx];
  }, [currentIndex, total]);

  // Keep thumbnail strip scrolled into view smoothly
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeThumb = container.children[currentIndex];
      if (activeThumb) {
        const targetScroll = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2);
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % total);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total, isFullscreen]);

  if (total === 0) return null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-6 mt-4 shrink-0">
      
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Atmosphere & Arena Photos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white text-balance">
          Live Event <span className="text-orange-500 whitespace-nowrap">Action Reel</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto text-pretty">
          Over 150 action shots from the torches, the gallery floor, the live demos, and the competition floor.
        </p>
      </div>

      {/* Main Slideshow Stage */}
      <div className="relative w-full bg-zinc-950 rounded-3xl border border-zinc-800/90 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Main Viewing Stage (Adaptive Height with Dynamic Ambient Glow) */}
        <div className="relative w-full h-[440px] sm:h-[540px] md:h-[620px] lg:h-[680px] bg-zinc-950 flex items-center justify-center overflow-hidden">
          
          {/* Dynamic Ambient Background Aura: Matches image flame & color tones, eliminating black voids */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <img
              key={`bg-${currentIndex}`}
              src={EVENT_SLIDESHOW_PHOTOS[currentIndex]}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover scale-125 blur-3xl opacity-35 brightness-75 saturate-150 transition-all duration-700 animate-fadeIn"
            />
            {/* Subtle Vignette & Grid Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
          </div>

          {/* Centered Image Card with Gallery Framing */}
          <div 
            className="relative z-10 max-h-[90%] max-w-[92%] flex items-center justify-center cursor-pointer group"
            onClick={() => setIsFullscreen(true)}
            title="Click to view full-screen"
          >
            <img
              key={currentIndex}
              src={EVENT_SLIDESHOW_PHOTOS[currentIndex]}
              alt={`Flame Off Event Atmosphere photo ${currentIndex + 1}`}
              decoding="async"
              className="max-h-[380px] sm:max-h-[480px] md:max-h-[550px] lg:max-h-[610px] w-auto max-w-full object-contain rounded-2xl border border-white/10 group-hover:border-orange-500/40 shadow-2xl select-none transition-colors duration-300 animate-fadeIn"
            />
            
            {/* Hover Expand Hint */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg whitespace-nowrap">
              <Maximize2 className="w-3 h-3 text-orange-400 shrink-0" />
              <span>Full View</span>
            </div>
          </div>

          {/* Frosted Glass Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-orange-500 text-white transition-all duration-200 border border-white/10 hover:border-orange-400/80 backdrop-blur-md opacity-85 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer z-20 group"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Frosted Glass Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-orange-500 text-white transition-all duration-200 border border-white/10 hover:border-orange-400/80 backdrop-blur-md opacity-85 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer z-20 group"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Top-Right Frosted Control Bar */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 backdrop-blur-md flex items-center gap-2 text-xs font-semibold transition cursor-pointer shadow-lg whitespace-nowrap"
              title={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <Pause className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <Play className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            {/* Counter Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/70 border border-white/10 backdrop-blur-md text-zinc-300 text-xs font-mono shadow-lg flex items-center gap-1 whitespace-nowrap shrink-0">
              <span className="text-orange-400 font-bold">{currentIndex + 1}</span>
              <span className="text-zinc-600">/</span>
              <span>{total}</span>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 backdrop-blur-md text-xs font-semibold transition cursor-pointer shadow-lg flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Expand fullscreen view"
              aria-label="Expand fullscreen view"
            >
              <Maximize2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="hidden md:inline">Expand</span>
            </button>
          </div>

        </div>

        {/* Premium Thumbnail Filmstrip with Gradient Fade Edges */}
        <div className="relative w-full min-w-0 max-w-full overflow-hidden bg-zinc-950/95 border-t border-zinc-800/80">
          
          {/* Left Gradient Edge Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />

          {/* Right Gradient Edge Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10" />

          {/* Filmstrip Scroller */}
          <div
            ref={thumbnailContainerRef}
            className="w-full min-w-0 max-w-full px-8 py-3.5 flex items-center gap-2.5 overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {EVENT_SLIDESHOW_THUMBS.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                  currentIndex === idx
                    ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-950 scale-105 shadow-lg shadow-black/60 opacity-100'
                    : 'border border-zinc-800 opacity-45 hover:opacity-90 hover:border-zinc-600 hover:scale-102'
                }`}
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <img
                  src={thumb}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-orange-400">Rocky Mountain Flame Off</span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400">Photo {currentIndex + 1} of {total}</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 transition cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fullscreen Centered Image */}
          <div
            className="relative flex-1 w-full max-w-7xl flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={EVENT_SLIDESHOW_PHOTOS[currentIndex]}
              alt={`Flame Off Event Atmosphere photo ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-fadeIn"
            />

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-zinc-900/70 hover:bg-orange-500 text-white transition border border-white/10 hover:border-orange-400 shadow-xl cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-zinc-900/70 hover:bg-orange-500 text-white transition border border-white/10 hover:border-orange-400 shadow-xl cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Caption / Hint */}
          <div className="text-xs text-zinc-400 text-center">
            Use arrow keys or click arrows to navigate • Press Esc to close
          </div>
        </div>
      )}

    </div>
  );
}
