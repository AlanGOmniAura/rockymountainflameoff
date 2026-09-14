import { auth } from '@/auth';
import { LayoutDashboard, FileText, Megaphone, Images, Settings, Eye, Globe, QrCode } from 'lucide-react';
import Link from 'next/link';
import { publishContent } from '@/app/actions/content';

export default async function AdminDashboard() {
    const session = await auth();

    const stats = [
        { label: 'Homepage', icon: FileText, href: '/admin/content', status: 'Dynamic' },
        { label: 'Banner', icon: Megaphone, href: '/admin/banner', status: 'Active' },
        { label: 'Gallery', icon: Images, href: '/admin/gallery', status: 'Connected' },
        { label: 'Settings', icon: Settings, href: '/admin/settings', status: 'Updated' },
        { label: 'QR Codes', icon: QrCode, href: '/admin/qr', status: 'Ready' },
    ];

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">
            <header className="mb-12 flex items-end justify-between">
                <div>
                    <h1 className="font-outfit text-4xl font-black uppercase tracking-tight text-white">
                        Studio Overview
                    </h1>
                    <p className="mt-2 text-lg text-zinc-400">
                        Welcome back,{' '}
                        <span className="font-bold text-white">
                            {session?.user?.name?.split(' ')[0]}
                        </span>
                        . Control your digital studio from here.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/"
                        target="_blank"
                        className="group flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 font-bold text-white transition-all hover:bg-zinc-800"
                    >
                        <Eye size={20} className="transition-colors group-hover:text-primary" />{' '}
                        Preview Site
                    </Link>
                    <form action={publishContent}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-orange-600 px-8 py-3 text-lg font-black text-white shadow-[0_10px_30px_rgba(234,88,12,0.3)] transition-all hover:scale-105 hover:bg-orange-500 active:scale-95"
                        >
                            <Globe size={24} /> GO LIVE
                        </button>
                    </form>
                </div>
            </header>

            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                    >
                        <div className="absolute right-0 top-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
                            <item.icon size={80} />
                        </div>
                        <div className="relative z-10">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 transition-colors group-hover:border-primary">
                                <item.icon
                                    size={24}
                                    className="transition-colors group-hover:text-primary"
                                />
                            </div>
                            <h3 className="mb-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                                {item.status}
                            </h3>
                            <div className="text-2xl font-bold text-white">{item.label}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <section className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-10 backdrop-blur-sm lg:col-span-2">
                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
                        <div className="h-8 w-2 rounded-full bg-primary" /> Quick Editor
                    </h2>
                    <p className="mb-8 italic leading-relaxed text-zinc-400">
                        "Your site content is currently synchronized with Supabase. Any changes made
                        in the editors below will wait in 'Draft' mode until you click the **GO
                        LIVE** button above."
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link
                            href="/admin/content"
                            className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                        >
                            <span className="font-bold">Home Page</span>
                            <FileText
                                size={18}
                                className="text-zinc-400 group-hover:text-primary"
                            />
                        </Link>
                        <Link
                            href="/admin/content?tab=about"
                            className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                        >
                            <span className="font-bold">About Page</span>
                            <FileText
                                size={18}
                                className="text-zinc-400 group-hover:text-primary"
                            />
                        </Link>
                        <Link
                            href="/admin/content?tab=classesPage"
                            className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                        >
                            <span className="font-bold">Classes Landing</span>
                            <FileText
                                size={18}
                                className="text-zinc-400 group-hover:text-primary"
                            />
                        </Link>
                        <Link
                            href="/admin/content?tab=classDetails"
                            className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                        >
                            <span className="font-bold">Class Details</span>
                            <FileText
                                size={18}
                                className="text-zinc-400 group-hover:text-primary"
                            />
                        </Link>
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center rounded-3xl border border-orange-600/20 bg-orange-600/5 p-10 text-center">
                    <Megaphone size={48} className="mb-6 text-orange-500" />
                    <h2 className="mb-2 text-xl font-bold text-white">Announcement Banner</h2>
                    <p className="mb-6 text-sm text-zinc-400">
                        Need to update the studio's top alert message?
                    </p>
                    <Link
                        href="/admin/banner"
                        className="rounded-full bg-white px-8 py-3 text-sm font-black text-black transition-all hover:scale-105"
                    >
                        EDIT BANNER
                    </Link>
                </section>
            </div>
        </div>
    );
}
