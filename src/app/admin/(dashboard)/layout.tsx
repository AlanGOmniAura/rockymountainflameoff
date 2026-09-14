import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Images,
    Settings,
    LogOut,
    Megaphone,
    Home,
    FileText,
    ChevronRight,
} from 'lucide-react';
import { signOut } from '@/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { label: 'Pages', icon: FileText, href: '/admin/content' },
        { label: 'Banner', icon: Megaphone, href: '/admin/banner' },
        { label: 'Gallery', icon: Images, href: '/admin/gallery' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-zinc-950 font-body text-white selection:bg-primary/30 selection:text-white">
            {/* Skip to Content Link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-6 focus:py-3 focus:font-bold focus:text-black focus:shadow-2xl"
            >
                Skip to Content
            </a>
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-zinc-900 bg-zinc-950">
                <div className="p-8">
                    <Link href="/admin" className="group flex items-center gap-3">
                        <div className="flex h-10 w-10 rotate-3 items-center justify-center rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform group-hover:rotate-0">
                            <span className="text-xl font-black text-black">G</span>
                        </div>
                        <div>
                            <span className="block font-outfit text-xl font-black leading-none tracking-tighter">
                                STUDIO
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-80">
                                Console
                            </span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 space-y-1 px-4">
                    <div className="mb-4 mt-2 px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Management
                    </div>
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="group flex items-center justify-between rounded-2xl border border-transparent p-4 text-zinc-400 transition-all hover:border-zinc-800/50 hover:bg-zinc-900 hover:text-white"
                        >
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <item.icon
                                    size={20}
                                    className="transition-colors group-hover:text-primary"
                                />
                                {item.label}
                            </div>
                            <ChevronRight
                                size={14}
                                className="-translate-x-2 text-zinc-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                            />
                        </Link>
                    ))}

                    <div className="mt-4 border-t border-zinc-900 px-4 pt-8">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 rounded-xl border border-transparent p-3 text-xs font-bold text-zinc-400 transition-all hover:border-zinc-800 hover:bg-zinc-900 hover:text-white"
                        >
                            <Home size={16} /> View Studio Site
                        </Link>
                    </div>
                </nav>

                <div className="border-t border-zinc-900 bg-zinc-950/50 p-6 backdrop-blur-md">
                    <div className="mb-6 flex items-center gap-3 px-2">
                        {session.user?.image ? (
                            <img
                                src={session.user.image}
                                alt="User"
                                className="h-10 w-10 rounded-xl border border-zinc-800 object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-400">
                                {session.user?.name?.charAt(0) || 'U'}
                            </div>
                        )}
                        <div className="flex-1 overflow-hidden text-sm">
                            <div className="truncate font-black uppercase tracking-tight text-white">
                                {session.user?.name}
                            </div>
                            <div className="truncate font-mono text-[10px] text-zinc-400">
                                {session.user?.email}
                            </div>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/admin/login' });
                        }}
                    >
                        <button className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-xs font-black uppercase tracking-widest text-red-400 transition-all hover:border-red-500/10 hover:bg-red-500/5 hover:text-red-300">
                            <LogOut size={16} /> Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main id="main-content" className="ml-72 min-h-screen flex-1 bg-zinc-950">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
