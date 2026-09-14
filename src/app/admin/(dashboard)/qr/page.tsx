'use client';

import { useState, useEffect } from 'react';
import EditorShell from '@/components/admin/EditorShell';
import { QrCode, Link as LinkIcon, BarChart3, Plus, Copy, Check, ExternalLink, Trash2, Tag } from 'lucide-react';

interface QRCodeEntry {
    id: string;
    target_url: string;
    click_count: number;
    style?: string;
    label?: string;
}

const QR_STYLES = [
    { id: 'classic', name: 'Classic Ink', color: 'bg-white' },
    { id: 'gold', name: 'Gold Leaf', color: 'bg-amber-400' },
    { id: 'glass', name: 'Neon Glass', color: 'bg-cyan-400' },
    { id: 'lava', name: 'Lava Rock', color: 'bg-red-400' },
];

export default function QRManagementPage() {
    const [qrCodes, setQrCodes] = useState<QRCodeEntry[]>([]);
    const [newUrl, setNewUrl] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState('classic');

    const fetchQRCodes = async () => {
        try {
            const res = await fetch('/api/qr');
            const data = await res.json();
            if (data.qrCodes) {
                setQrCodes(data.qrCodes);
            }
        } catch (error) {
            console.error('Failed to fetch QR codes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQRCodes();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUrl || !newLabel) return;

        setIsCreating(true);
        try {
            const res = await fetch('/api/qr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    targetUrl: newUrl, 
                    style: selectedStyle,
                    label: newLabel
                }),
            });
            if (res.ok) {
                setNewUrl('');
                setNewLabel('');
                fetchQRCodes();
            }
        } catch (error) {
            console.error('Failed to create QR code:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this QR code? This will permanently remove its tracking history and render any printed flyers/posters using this code inactive.')) return;
        
        // Optimistic UI update
        const previousQrCodes = [...qrCodes];
        setQrCodes(qrCodes.filter(qr => qr.id !== id));

        try {
            const res = await fetch(`/api/qr?id=${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                // Rollback on error
                setQrCodes(previousQrCodes);
                alert('Failed to delete QR code');
            }
        } catch (error) {
            console.error('Failed to delete QR code:', error);
            setQrCodes(previousQrCodes);
        }
    };

    const copyToClipboard = (id: string) => {
        // Copy the scan tracking/redirection URL which records hits when scanned!
        const url = `${window.location.origin}/qr/${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <EditorShell
            title="QR Code Manager"
            description="Generate trackable, styled QR codes for your studio marketing campaigns (flyers, posters, etc.) and track customer scan engagement independently."
        >
            <div className="space-y-8">
                {/* CREATE NEW SECTION */}
                <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                        <Plus size={20} className="text-primary" /> Create Labeled QR Code
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Label input */}
                            <div className="space-y-2">
                                <label htmlFor="qr-label" className="text-xs font-black uppercase tracking-widest text-zinc-400">
                                    QR Code Label
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <Tag size={18} className="text-zinc-400" />
                                    </div>
                                    <input
                                        id="qr-label"
                                        type="text"
                                        placeholder="e.g., Summer Flyer, Store Window Poster"
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* URL input */}
                            <div className="space-y-2">
                                <label htmlFor="qr-url" className="text-xs font-black uppercase tracking-widest text-zinc-400">
                                    Destination URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <LinkIcon size={18} className="text-zinc-400" />
                                    </div>
                                    <input
                                        id="qr-url"
                                        type="url"
                                        placeholder="e.g., https://glassclassdenver.com or buildapipe.com"
                                        value={newUrl}
                                        onChange={(e) => setNewUrl(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="flex-1">
                                <div className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">
                                    Select Artistic Flare
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {QR_STYLES.map((style) => (
                                        <button
                                            key={style.id}
                                            type="button"
                                            onClick={() => setSelectedStyle(style.id)}
                                            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                                                selectedStyle === style.id
                                                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                                    : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                                            }`}
                                        >
                                            <div className={`h-8 w-8 rounded-lg ${style.color} shadow-lg shadow-black/20`} />
                                            <span className="text-[10px] font-bold uppercase tracking-tight text-white">
                                                {style.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="rounded-xl bg-primary px-8 py-4 font-bold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shrink-0 h-[52px] lg:self-end"
                            >
                                {isCreating ? 'GENERATING...' : 'GENERATE QR'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* LIST SECTION */}
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                        <BarChart3 size={20} className="text-secondary" /> Active QR Codes
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : qrCodes.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">
                            <QrCode size={48} className="mx-auto mb-4 text-zinc-700" />
                            <p className="text-zinc-400">No QR codes generated yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {qrCodes.map((qr) => (
                                <div
                                    key={qr.id}
                                    className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-24 w-24 overflow-hidden rounded-xl bg-white p-2 shrink-0">
                                            <img
                                                src={`/api/qr?id=${qr.id}`}
                                                alt="QR Code"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col items-end justify-between h-24">
                                            <div className="text-right">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Clicks</div>
                                                <div className="text-3xl font-black text-white">{qr.click_count}</div>
                                            </div>
                                            
                                            <button
                                                onClick={() => handleDelete(qr.id)}
                                                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-red-400 transition-all"
                                                title="Delete QR Code"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Label</div>
                                            <div className="text-base font-extrabold text-white mb-2 truncate" title={qr.label || 'Unlabeled'}>
                                                {qr.label || 'Unlabeled'}
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Destination URL</div>
                                            <div className="flex items-center gap-2 text-sm text-zinc-300 truncate">
                                                <LinkIcon size={12} className="shrink-0 text-zinc-500" />
                                                <span className="truncate" title={qr.target_url}>{qr.target_url}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => copyToClipboard(qr.id)}
                                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 py-2 text-xs font-bold text-white transition-all hover:bg-zinc-800"
                                            >
                                                {copiedId === qr.id ? (
                                                    <>
                                                        <Check size={14} className="text-green-500" /> COPIED
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={14} /> COPY LINK
                                                    </>
                                                )}
                                            </button>
                                            <a
                                                href={`/api/qr?id=${qr.id}`}
                                                download={`qr-${qr.label || qr.id}.png`}
                                                className="flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-zinc-800"
                                            >
                                                DOWNLOAD
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </EditorShell>
    );
}
