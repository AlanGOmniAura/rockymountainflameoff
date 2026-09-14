import { getSiteConfig } from '@/data/settings';
import { updateSiteSettings } from '@/app/actions/settings';
import EditorShell from '@/components/admin/EditorShell';

export default async function BannerEditorPage() {
    const config = await getSiteConfig();
    const banner = config.banner || {};

    return (
        <form action={updateSiteSettings} id="main-editor-form">
            <input type="hidden" name="update_banner" value="true" />

            <EditorShell
                title="Banner Settings"
                description="Manage the high-visibility alert message at the top of every page."
                onSave="true"
            >
                <div className="mx-auto max-w-3xl space-y-8">
                    {/* VISIBILITY */}
                    <section className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <div>
                            <h2 className="mb-1 text-xl font-bold text-white">Live Visibility</h2>
                            <p className="text-sm text-zinc-400">
                                Turn the banner on or off globally across the entire site.
                            </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                name="enabled"
                                defaultChecked={banner.enabled}
                                className="peer sr-only"
                            />
                            <div className="peer h-8 w-16 rounded-full bg-zinc-800 after:absolute after:left-[4px] after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-zinc-400 after:transition-all after:content-[''] peer-checked:bg-orange-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none"></div>
                        </label>
                    </section>

                    {/* CONTENT */}
                    <section className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <h2 className="mb-6 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                            Message & Link
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Marquee Text
                                </label>
                                <input
                                    name="text"
                                    defaultValue={banner.text}
                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-lg text-white outline-none transition-all focus:border-primary"
                                    placeholder="e.g. 🔥 New Glassblowing Workshop this Saturday! 🔥"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Click Target (URL)
                                    </label>
                                    <input
                                        name="link"
                                        defaultValue={banner.link}
                                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white outline-none focus:border-primary"
                                        placeholder="/classes/experience"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Desktop Speed (Sec)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            name="speed"
                                            defaultValue={banner.speed || 30}
                                            max="120"
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white outline-none focus:border-primary"
                                        />
                                    </div>
                                    <p className="mt-2 text-[10px] italic text-zinc-400">
                                        Higher = Slower
                                    </p>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Mobile Speed (Sec)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            name="mobileSpeed"
                                            defaultValue={banner.mobileSpeed || 60}
                                            max="200"
                                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white outline-none focus:border-primary"
                                        />
                                    </div>
                                    <p className="mt-2 text-[10px] italic text-zinc-400">
                                        Requires higher number than desktop usually
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </EditorShell>
        </form>
    );
}
