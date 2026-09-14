import { getSiteConfig } from '@/data/settings';
import { updateSiteSettings } from '@/app/actions/settings';
import EditorShell from '@/components/admin/EditorShell';
import { MapPin, Phone, Mail, Instagram, Facebook, Images, Building2 } from 'lucide-react';

export default async function SettingsPage() {
    const config = await getSiteConfig();
    const contact = config.contact || {};

    return (
        <form action={updateSiteSettings} id="main-editor-form">
            <EditorShell
                title="Global Settings"
                description="Manage your business contact details and studio-wide configurations."
                onSave="true"
            >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* CONTACT INFORMATION */}
                    <section className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <input type="hidden" name="update_contact" value="true" />
                        <h2 className="mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                            <Building2 size={20} className="text-primary" /> Business Info
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <Phone size={12} /> Phone Number
                                </label>
                                <input
                                    name="phone"
                                    defaultValue={contact.phone}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <Mail size={12} /> Email Address
                                </label>
                                <input
                                    name="email"
                                    defaultValue={contact.email}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <MapPin size={12} /> Studio Address
                                </label>
                                <input
                                    name="address"
                                    defaultValue={contact.address}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white"
                                />
                            </div>
                        </div>

                        <h3 className="border-t border-zinc-900 pt-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                            Social Connections
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <Instagram size={12} /> Instagram
                                </label>
                                <input
                                    name="instagram"
                                    defaultValue={contact.instagram}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <Facebook size={12} /> Facebook
                                </label>
                                <input
                                    name="facebook"
                                    defaultValue={contact.facebook}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm text-white"
                                />
                            </div>
                        </div>
                    </section>

                    {/* STUDIO ASSETS */}
                    <section className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <input type="hidden" name="update_studio" value="true" />
                        <h2 className="mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4 text-xl font-bold text-white">
                            <Images size={20} className="text-secondary" /> Studio Assets
                        </h2>

                        <div>
                            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Studio Gallery Root (Folder ID)
                            </label>
                            <input
                                name="studioFolderId"
                                defaultValue={config.studio?.galleryFolderId}
                                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-white"
                            />
                            <p className="mt-4 text-[10px] leading-relaxed text-zinc-400">
                                This Google Drive Folder ID is the primary source for the Admin
                                Photo Gallery. Changing this will redirect the global explorer to a
                                new drive location.
                            </p>
                        </div>

                        <div className="mt-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-950 p-4">
                            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Project Integration
                            </div>
                            <div className="text-sm font-bold text-white">Supabase Managed</div>
                            <div className="mt-1 text-[10px] text-zinc-400">
                                All site settings are persisted in the `app_content` table.
                            </div>
                        </div>
                    </section>
                </div>
            </EditorShell>
        </form>
    );
}
