import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Gavel, Timer, Flame, Store, Info, ArrowRight, Hotel, MapPin } from 'lucide-react';

export default function ArtistRegistrationPage() {
    const HOTEL_GROUP_RATE_URL =
        'https://www.ihg.com/candlewood/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=dengd&qCiD=04&qCiMy=082026&qCoD=08&qCoMy=082026&qGrpCd=rmf&qAAR=6CBARC&qRtP=6CBARC&setPMCookies=true&qSHBrC=CW&qDest=9231%20E%20Arapahoe%20Road,%20Greenwood%20Village,%20CO,%20US&showApp=true&adjustMonth=false&srb_u=1&qRmFltr=';
    const HOTEL_MAPS_URL =
        'https://www.google.com/maps/search/?api=1&query=Candlewood+Suites,+9231+E+Arapahoe+Road,+Greenwood+Village,+CO';

    return (
        <div className="min-h-screen bg-black text-zinc-300 pt-32 pb-24 px-4 sm:px-8 relative overflow-hidden selection:bg-rose-500/30">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-yellow-400 tracking-tight">
                        Artist Registration
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Join Colorado's largest glassblowing competition. Review the rules, select your category, and prepare to bring the heat.
                    </p>
                    
                    <div className="pt-4">
                        <Link 
                            href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=1425173"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.5)]"
                        >
                            Register to Compete <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-8">

                    {/* Section 1: Silent Auction & Entry */}
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md shadow-2xl hover:border-rose-500/30 transition-colors group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                                <Gavel className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Entry & The Silent Auction</h2>
                        </div>
                        <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
                            <p>
                                Your entry into this year's competition will be covered by submitting a non-functional glass piece to our silent auction. <strong className="text-white">All the proceeds of this silent auction will be donated to Art From Ashes</strong>, a local charity that empowers struggling youth by providing creative programs that facilitate health and hope through expression, connection, and transformation.
                            </p>
                            <div className="p-4 rounded-xl bg-zinc-950/50 border border-rose-500/20 text-rose-200 flex items-start gap-3">
                                <Info className="w-6 h-6 shrink-0 mt-0.5" />
                                <p>To confirm your commitment to the silent auction, use code <strong className="font-mono text-rose-400 text-xl tracking-wider mx-2 bg-rose-500/10 px-2 py-1 rounded">ARTFROMASHES</strong> as you register for your category and timeslot.</p>
                            </div>
                            <p className="text-zinc-400 text-base">
                                * If you do not wish to participate in the silent auction, registration will cost $40, which will also be donated to Art From Ashes.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Categories & Timeslots */}
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md shadow-2xl hover:border-orange-500/30 transition-colors group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                                <Timer className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Categories & Timeslots</h2>
                        </div>
                        <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
                            <p>
                                During the initial signup, each artist will be able to enter <strong className="text-white">one category</strong> of their choice. After this initial signup period, we will open up any remaining timeslots in other categories for your second entries. 
                            </p>
                            <p className="text-orange-200">
                                Please pick your preferred category first to ensure your timeslot.
                            </p>
                            <p>
                                We are strict on our time limits for each category. Your time will start after your torch is set up and will be monitored via stopwatch. You will also be presented with the rule set and will sign off that you understand the rules for your specific category.
                            </p>
                            <p className="font-semibold text-white">
                                Please arrive 15 minutes before your starting time so that you can check in and we can keep on schedule throughout the competition.
                            </p>
                        </div>
                    </div>

                    {/* Section 3: Host Hotel & Accommodations */}
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-amber-500/30 backdrop-blur-md shadow-2xl hover:border-amber-400/50 transition-colors group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                                <Hotel className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Official Host Hotel & Lodging</h2>
                        </div>
                        <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
                            <p>
                                Traveling in for the Rocky Mountain Flame Off? We have partnered with <strong className="text-white">Candlewood Suites</strong> to offer an exclusive group rate for artists and attendees.
                            </p>
                            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-amber-300 uppercase tracking-wide">Candlewood Suites</h3>
                                    <a 
                                        href={HOTEL_MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 text-base mt-1 transition-colors group"
                                        title="Open Hotel Location in Google Maps"
                                    >
                                        <MapPin className="w-4 h-4 text-amber-400/80 group-hover:text-amber-400 shrink-0" />
                                        <span>9231 E Arapahoe Road, Greenwood Village, CO</span>
                                    </a>
                                </div>
                                <a 
                                    href={HOTEL_GROUP_RATE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] transition-all hover:scale-105 shrink-0"
                                >
                                    Group Rate Available <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Art Market & Booths */}
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md shadow-2xl hover:border-yellow-500/30 transition-colors group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                                <Store className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">The Art Market</h2>
                        </div>
                        <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
                            <p>
                                We will also be hosting an art market on <strong className="text-white">Sunday the 6th</strong>, where you will have the opportunity to set up a 6' folding table with your art. This year we have lots of media exposure and are running a full page ad so we expect tons of foot traffic and votes.
                            </p>
                            <p>
                                Due to this being an all-ages event with mainstream media coverage, the main art market will be <strong className="text-white">non-functionals only</strong>. 
                            </p>
                            <p>
                                However, you will also have space for a few functional pieces in the functional gallery inside the smoking section which is being run by Puffco and LaserCat. All pieces for the functional market must be labeled with a price and your name.
                            </p>
                        </div>
                    </div>

                    {/* Section 5: Equipment */}
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md shadow-2xl hover:border-blue-500/30 transition-colors group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                                <Flame className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Equipment & Setup</h2>
                        </div>
                        <ul className="space-y-4 text-zinc-300 leading-relaxed text-lg list-none">
                            <li className="flex gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                <p>We have <strong className="text-white">Bethlehem Bravos</strong> on site for you to use if you do not wish to bring your torch.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                <p>We have western quick-connects at each bench for you to hook up to if you prefer your own torch.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                <p>We will also have a bench and kiln set up for <strong className="text-white">soft glass</strong> if that is your preferred medium. Soft glass entries will be allowed in the pendant/bead, sculpture, and goblet category.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Section 6: Judging */}
                    <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md shadow-2xl hover:border-purple-500/30 transition-colors group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Judging & Integrity</h2>
                        </div>
                        <div className="space-y-4 text-zinc-300 leading-relaxed text-lg">
                            <p>
                                All entries will be reviewed by a judges committee prior to voting. <strong className="text-rose-400">Any infractions will result in your piece being disqualified from the voting.</strong>
                            </p>
                            <p className="text-orange-300/90 font-medium">
                                All contestants must win or lose with grace and sportsmanship. Any abuse or harassment will result in a permanent ban from our competition.
                            </p>
                            <p className="text-xl font-medium text-white italic pt-4 text-center">
                                "We are excited to see all the entries this year and see everyone! Let's do it big!!"
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <Link 
                        href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=1425173"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:shadow-[0_0_60px_rgba(244,63,94,0.5)]"
                    >
                        Ready? Register Now <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
