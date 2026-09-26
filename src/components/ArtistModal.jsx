import React, { useState, useEffect } from 'react';
import { X, MapPin, Flame, User, Share2, Check, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ArtistModal({ entry, onClose }) {
  const [activeAngle, setActiveAngle] = useState(1);
  const [copied, setCopied] = useState(false);

  // Reset to angle 1 whenever entry changes
  useEffect(() => {
    setActiveAngle(1);
    setCopied(false);
  }, [entry?.id]);

  if (!entry) return null;

  const currentGlassPic = activeAngle === 2 && entry.glassPic2 ? entry.glassPic2 : entry.glassPic1;
  const hasValidIg = entry.ig && entry.ig !== 'N/A' && entry.ig.trim().length > 1;

  const handleShare = async () => {
    const shareUrl = window.location.origin + window.location.pathname + `?entry=${entry.id}`;
    const shareData = {
      title: `${entry.glassName} (${entry.realName}) - Rocky Mountain Flame Off`,
      text: `Check out ${entry.glassName}'s official competition entry at the Rocky Mountain Flame Off!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if share was dismissed or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900/95 border border-zinc-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative [scrollbar-width:thin] [scrollbar-color:#3f3f46_transparent]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 rounded-full transition z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8 space-y-6">
          
          {/* Top Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b border-zinc-800/80 pb-6 pr-0 md:pr-10">
            
            {/* Left: Avatar + Identity */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
              {/* Square Artist Profile Photo */}
              <div className="relative flex-shrink-0">
                {entry.artistPic ? (
                  <img
                    src={entry.artistPic}
                    alt={entry.realName}
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-orange-500 shadow-xl shadow-black/60 bg-black"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 shadow-lg">
                    <User className="w-8 h-8 text-orange-500/60" />
                  </div>
                )}
                {entry.placement && (
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] font-black bg-orange-500 text-orange-950 rounded shadow-sm uppercase tracking-wide whitespace-nowrap">
                    {entry.placement}
                  </span>
                )}
              </div>

                {/* Artist Metadata */}
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="inline-block text-[11px] font-bold text-orange-500 uppercase tracking-widest whitespace-nowrap">
                    {entry.category}
                  </span>
                  <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug break-words">
                    {entry.glassName}
                  </h2>
                  <div className="text-sm sm:text-base font-semibold text-zinc-300 break-words">
                    {entry.realName}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                    <span className="truncate">{entry.cityState}</span>
                  </div>
                </div>
              </div>

              {/* Right: Dedicated Social Media & Share Hub */}
              <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 w-full md:w-auto flex-shrink-0 pt-2 md:pt-0">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5 self-start md:self-end whitespace-nowrap">
                  <Flame className="w-3 h-3 text-orange-500 shrink-0" />
                  <span>Artist Socials</span>
                </div>

                {hasValidIg ? (
                  <a
                    href={`https://instagram.com/${entry.ig.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-rose-950/40 hover:via-purple-950/40 hover:to-amber-950/40 border border-zinc-700/80 hover:border-pink-500/60 shadow-lg hover:shadow-black/60 transition-all duration-200 cursor-pointer"
                    title={`Open ${entry.ig} on Instagram`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
                        <InstagramIcon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 group-hover:text-pink-400 tracking-wider">
                          Instagram
                        </div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors truncate max-w-[140px] sm:max-w-[180px]">
                          {entry.ig}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors ml-1" />
                  </a>
                ) : (
                  <div className="text-xs text-zinc-500 italic px-3 py-1 bg-zinc-950/60 rounded-lg border border-zinc-800">
                    Instagram: Not Listed
                  </div>
                )}

                {/* Share Entry Button */}
                <button
                  onClick={handleShare}
                  className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                      : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white border-zinc-700/50 hover:border-zinc-600'
                  }`}
                  title="Share this competitor entry or copy direct link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>Share Artist Profile</span>
                    </>
                  )}
              </button>
            </div>

          </div>

          {/* Exhibition Glass Artwork Display */}
          <div>
            {entry.glassPic1 ? (
              <div className="space-y-3">
                {/* Minimal Multi-Angle Switcher (Only shown if entry has 2 angles) */}
                {entry.glassPic2 && (
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Exhibition Views
                    </span>
                    <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-800 rounded-xl p-1">
                      <button
                        onClick={() => setActiveAngle(1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeAngle === 1
                            ? 'bg-orange-500 text-orange-950 font-black shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Angle 1
                      </button>
                      <button
                        onClick={() => setActiveAngle(2)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeAngle === 2
                            ? 'bg-orange-500 text-orange-950 font-black shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Angle 2
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Glass Display Frame */}
                <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-black/90 shadow-2xl flex items-center justify-center p-2 min-h-[320px] max-h-[560px]">
                  <img
                    src={currentGlassPic}
                    alt={`${entry.glassName} - ${entry.category}`}
                    className="w-full h-full object-contain max-h-[520px] rounded-xl transition-all duration-300"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/60 p-10 text-center space-y-2">
                <Flame className="w-8 h-8 text-orange-500/50 mx-auto" />
                <div className="text-sm font-bold text-zinc-300">
                  Competition Photo Pending Archive
                </div>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Official exhibition photo for this entry is being prepared.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
