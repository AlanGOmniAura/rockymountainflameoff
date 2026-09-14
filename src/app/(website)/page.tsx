'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hotel, MapPin } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';

import SponsorsSection from '@/components/SponsorsSection';

export default function Home() {
    const POSTER_FILE_ID = '1WQ8uligQSKFwUBAMiwcoPBHMOcz-lTx_';
    const VIDEO_FILE_ID = '1x62_avX9KkPdBtOVXE_6_FAnR1kj9fAc';

    const COMPETITOR_REGISTRATION_URL =
        'https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=1425173';
    const VIP_TICKETS_URL =
        'https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=1678453';
    const HOTEL_GROUP_RATE_URL =
        'https://www.ihg.com/candlewood/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=dengd&qCiD=04&qCiMy=082026&qCoD=08&qCoMy=082026&qGrpCd=rmf&qAAR=6CBARC&qRtP=6CBARC&setPMCookies=true&qSHBrC=CW&qDest=9231%20E%20Arapahoe%20Road,%20Greenwood%20Village,%20CO,%20US&showApp=true&adjustMonth=false&srb_u=1&qRmFltr=';
    
    const VENUE_MAPS_URL =
        'https://www.google.com/maps/search/?api=1&query=Glass+Class+Denver,+2830+S+Elati+St,+Englewood,+CO+80113';
    const HOTEL_MAPS_URL =
        'https://www.google.com/maps/search/?api=1&query=Candlewood+Suites,+9231+E+Arapahoe+Road,+Greenwood+Village,+CO';

    type ModalType = 'video' | 'competitor' | 'vip' | null;
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    return (
        <main 
            className="min-h-screen flex flex-col items-center justify-start relative overflow-x-hidden bg-zinc-950"
            style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
        >
            {/* ── Subtle Texture Background ── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/80 to-zinc-950" />
            </div>

            {/* ── Live Poster Section ── */}
            <section className="relative w-full z-20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-b border-zinc-900/50 bg-black overflow-hidden">
                
                {/* Background Layer */}
                <div 
                    className="absolute inset-0 w-full h-full opacity-80 bg-[url('/bg.png')] bg-cover bg-top bg-no-repeat"
                />
                
                {/* Subtle overlays */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950 pointer-events-none" />

                {/* Foreground Content Layer */}
                <div className="relative z-10 w-full flex flex-col items-center justify-start pt-[4vh] md:pt-[6vh] pb-[10vh] px-4 gap-[4vh] md:gap-[6vh] lg:gap-[8vh]">
                    
                    {/* Navigation Button */}
                    <div className="w-full flex justify-center md:absolute md:top-6 md:right-6 md:w-auto md:justify-end z-50 shrink-0">
                        <Link href="/artist-registration">
                            <Button 
                                size="lg"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold tracking-wider uppercase border-none shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] transition-all hover:scale-105"
                            >
                                Competitor Registration
                            </Button>
                        </Link>
                    </div>

                    {/* 1. Header (Logo & Dates & Venue) */}
                    <div className="flex flex-col items-center w-full max-w-7xl shrink-0">
                        {/* Logo */}
                        <img 
                            src="/logo.png" 
                            alt="Rocky Mountain Flame Off" 
                            className="w-[90%] sm:w-[75%] lg:w-[60%] max-w-4xl max-h-[35vh] object-contain animate-float drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)]"
                        />
                            
                        {/* Event Info Box */}
                        <div className="text-center mt-[4vh] mb-[2vh] bg-black/40 backdrop-blur-sm p-[3vh] rounded-3xl border border-zinc-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                            <h2 className="font-russell text-[2vh] md:text-[3vh] lg:text-[3.5vh] leading-[1.6] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-500 tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,1)] uppercase">
                                September 6th - Free All Ages Party<br/>
                                September 4th and 5th - VIP Entry
                            </h2>
                            
                            <div className="mt-[3vh] pt-[2vh] border-t border-zinc-800/60 flex flex-col items-center">
                                <p className="font-russell text-zinc-200 text-[1.8vh] md:text-[2.2vh] tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,1)] uppercase">
                                    Glass Class Denver
                                </p>
                                <a 
                                    href={VENUE_MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 font-sans text-zinc-400 hover:text-amber-400 font-medium text-[1.4vh] md:text-[1.6vh] tracking-widest mt-[0.5vh] drop-shadow-[0_2px_2px_rgba(0,0,0,1)] uppercase transition-colors group"
                                    title="Open Venue Location in Google Maps"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400 shrink-0" />
                                    <span>2830 S Elati St<br/>Englewood, CO 80113</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 2. All Ages Party Details */}
                    <div className="w-full max-w-4xl text-left shrink-0">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                            All Ages Party and Public Voting <span className="text-primary font-bold">(FREE)</span> <span className="text-zinc-300 font-normal block sm:inline mt-2 sm:mt-0">— September 6th</span>
                        </h2>
                        
                        <div className="space-y-6 text-zinc-200 text-lg sm:text-xl leading-relaxed bg-black/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-zinc-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <p>
                                Glass Class Denver is excited to once again host Colorado's largest glassblowing competition, The Rocky Mountain Flame Off! Join us on September 6th and cast your vote to help us crown the winners in 8 separate categories. YOUR vote is the key to it all as you stroll the gallery and select your favorite pieces from over 40 different artists.
                            </p>
                            <p>
                                The party starts at noon and will be going until roughly 10pm with live glassblowing, music, an art market, a silent auction benefiting Art from Ashes, as well as a few surprises and special guests along the way. The evening will culminate with an awards ceremony announcing the winners around 8 PM and then a party with your favorite artists until 10PM.
                            </p>
                            <p>
                                There will be live glassblowing throughout the day with amazing demonstrations by world renowned glass artists such as Eusheen, Lewis Wilson, as well as many others. There will also be opportunities to buy glass from the competing artists in our expanded art market.
                            </p>
                            <p className="text-center font-medium text-white italic pt-4 text-xl sm:text-2xl drop-shadow-md">
                                We look forward to meeting you and showing you the passion we have for blowing glass.
                            </p>
                        </div>
                    </div>

                    {/* 3. VIP & Video Action Bar */}
                    <div className="w-full max-w-6xl flex flex-col md:flex-row items-stretch justify-center gap-[4vh] shrink-0">
                        
                        {/* VIP Box */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center bg-black/60 backdrop-blur-md p-[4vh] rounded-3xl border border-orange-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[25vh]">
                            <h1 className="text-[3vh] xl:text-[3.5vh] font-bold tracking-tight text-white mb-[2vh] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-tight">
                                VIP Entry ($40) <span className="text-zinc-300 font-normal block mt-[1vh] text-[2.2vh]">— Sep 4th and 5th</span>
                            </h1>
                            <p className="text-zinc-200 text-[1.8vh] xl:text-[2vh] leading-relaxed mb-[3vh] max-w-md">
                                Entry into the arena on the 4th and 5th. Experience the highs and lows as artists work against the clock. Includes entry to win door prizes.
                            </p>
                            <Button 
                                size="lg"
                                onClick={() => setActiveModal('vip')}
                                className="w-full sm:w-auto min-w-[250px] h-[8vh] text-[2.2vh] font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_rgba(191,54,12,0.8)] transition-all hover:scale-105 border border-orange-500/50 shrink-0"
                            >
                                Get VIP Tickets
                            </Button>
                        </div>

                        {/* Embedded Recap Video */}
                        <div className="flex-1 w-full rounded-3xl overflow-hidden border-4 border-zinc-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.9)] bg-black min-h-[25vh]">
                            <video
                                src="https://storage.googleapis.com/rockymountainflameoff-media/video.mp4"
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                                preload="metadata"
                            />
                        </div>
                    </div>

                    {/* 4. Host Hotel Section (Right above Sponsors) */}
                    <div className="w-full max-w-6xl flex flex-col items-center gap-4 shrink-0">
                        <div className="w-full bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-5 text-left text-center sm:text-left">
                                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 hidden sm:flex">
                                    <Hotel className="w-7 h-7" />
                                </div>
                                <div>
                                    <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Official Host Hotel</span>
                                    <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">Candlewood Suites</h3>
                                    <a 
                                        href={HOTEL_MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 text-sm font-medium mt-1 transition-colors group"
                                        title="Open Hotel Location in Google Maps"
                                    >
                                        <MapPin className="w-4 h-4 text-amber-400/80 group-hover:text-amber-400 shrink-0" />
                                        <span>9231 E Arapahoe Road, Greenwood Village, CO</span>
                                    </a>
                                </div>
                            </div>
                            
                            <a 
                                href={HOTEL_GROUP_RATE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] transition-all hover:scale-105 shrink-0"
                            >
                                Group Rate Available
                            </a>
                        </div>
                    </div>

                    {/* 5. Sponsors Section */}
                    <SponsorsSection />

                </div>
            </section>

            {/* ── Modal System ── */}
            <Dialog open={!!activeModal} onOpenChange={(open) => !open && setActiveModal(null)}>
                <DialogContent className="p-0 border-none bg-black overflow-hidden max-w-5xl h-[85vh]">
                    <DialogTitle className="sr-only">Checkout</DialogTitle>
                    {activeModal === 'competitor' && (
                        <iframe
                            src={COMPETITOR_REGISTRATION_URL}
                            className="w-full h-full bg-white"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    )}
                    {activeModal === 'vip' && (
                        <iframe
                            src={VIP_TICKETS_URL}
                            className="w-full h-full bg-white"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    )}
                </DialogContent>
            </Dialog>
        </main>
    );
}
