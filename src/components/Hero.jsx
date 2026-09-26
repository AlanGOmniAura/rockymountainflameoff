import React from 'react';
import { MapPin, Trophy, Sparkles, Flame, Play } from 'lucide-react';

export default function Hero() {
  const scrollToGallery = () => {
    const el = document.getElementById('competition-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Action Button: Quick Link to Winners */}
      <div className="w-full flex justify-center md:absolute md:top-6 md:right-6 md:w-auto md:justify-end z-50 shrink-0">
        <button
          onClick={scrollToGallery}
          type="button"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm py-2.5 px-5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black tracking-wider uppercase shadow-xl shadow-black/50 transition-colors cursor-pointer border border-amber-300/40 whitespace-nowrap"
        >
          <Trophy className="w-4 h-4 stroke-[2.5]" />
          View Competition Winners
        </button>
      </div>

      {/* Centered Floating Logo & Event Wrap-Up Header */}
      <div className="flex flex-col items-center w-full max-w-7xl shrink-0">
        <img
          src="/logo.png"
          alt="Rocky Mountain Flame Off"
          className="w-[90%] sm:w-[75%] lg:w-[60%] max-w-4xl max-h-[350px] object-contain animate-float"
        />

        {/* Concluded Event Header Banner */}
        <div className="text-center mt-6 mb-4 bg-zinc-950 py-6 sm:py-8 px-4 sm:px-8 rounded-3xl border border-zinc-800 shadow-xl max-w-3xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Official Competition Archive & Results
          </div>
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-snug text-amber-400 tracking-wide uppercase font-black text-balance">
            Colorado's Premier Glassblowing Competition
          </h2>

          <div className="mt-5 pt-4 border-t border-zinc-800 flex flex-col items-center gap-1">
            <p className="text-base sm:text-lg md:text-xl tracking-wider uppercase font-bold text-zinc-200">
              Glass Class Denver
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Glass+Class+Denver,+2830+S+Elati+St,+Englewood,+CO+80113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-zinc-400 hover:text-amber-400 font-medium text-xs sm:text-sm tracking-normal transition-colors group text-center flex-wrap"
              title="Open Venue Location in Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">2830 S Elati St</span>
              <span className="text-zinc-600 select-none hidden xs:inline">•</span>
              <span className="whitespace-nowrap">Englewood, CO 80113</span>
            </a>
          </div>
        </div>
      </div>

      {/* Official Wrap-Up & Winners Celebration Card */}
      <div className="w-full max-w-4xl text-left shrink-0">
        <div className="bg-zinc-950 p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white text-center text-balance">
            Competition Concluded{' '}
            <span className="inline-block text-orange-500 whitespace-nowrap">
              & Winners Crowned
            </span>
          </h2>
          <div className="space-y-4 text-zinc-200 text-base sm:text-lg md:text-xl leading-relaxed text-pretty">
            <p>
              The annual Rocky Mountain Flame Off has officially concluded at Glass Class Denver! Over 40 master artists competed across 8 official competition categories, with public voting crowning this year’s champions alongside live flameworking demonstrations by glass legends including Eusheen and Lewis Wilson.
            </p>
            <p className="text-center font-medium text-white italic pt-2 text-lg sm:text-xl text-balance">
              Thank you to all competitors, attendees, and sponsors for an incredible event. Browse the competition entries, winners, and event photos below.
            </p>
          </div>
        </div>
      </div>

      {/* Official Event Highlights Video */}
      <div className="w-full max-w-4xl shrink-0">
        <div className="w-full rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl bg-black aspect-video">
          <video
            src="https://storage.googleapis.com/rockymountainflameoff-media/video.mp4"
            className="w-full h-full object-cover"
            controls
            playsInline
            preload="none"
            poster="/thumbs/slideshow/IMG_8655.JPG"
          />
        </div>
      </div>
    </>
  );
}
