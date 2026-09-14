import React from 'react';
import { Eye } from 'lucide-react';
import { SaveChangesButton, PublishLiveButton } from './SubmitButtons';

interface EditorShellProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    onSave?: string; // Action URL or function
    previewUrl?: string;
    publishAction?: () => Promise<void>;
    tabs?: { id: string; label: string }[];
    activeTab?: string;
    onTabChange?: (id: string) => void;
    formId?: string;
}

/**
 * A standard wrapper for all Admin Page Editors.
 * Provides a sticky header with consistent actions and optional internal tabs.
 */
export default function EditorShell({
    title,
    description,
    children,
    onSave,
    previewUrl,
    publishAction,
    tabs,
    activeTab,
    onTabChange,
    formId = 'main-editor-form',
}: EditorShellProps) {
    return (
        <div className="mx-auto max-w-6xl px-6 pb-24">
            {/* Sticky Header */}
            <header className="sticky top-0 z-40 -mx-6 mb-8 flex items-center justify-between border-b border-zinc-900 bg-zinc-950/80 px-6 py-6 backdrop-blur-md">
                <div>
                    <h1 className="font-outfit text-2xl font-bold text-white">{title}</h1>
                    {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
                </div>

                <div className="flex items-center gap-3">
                    {previewUrl && (
                        <a
                            href={previewUrl}
                            target="_blank"
                            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-700"
                        >
                            <Eye size={16} /> Preview
                        </a>
                    )}

                    {publishAction && (
                        <form action={publishAction}>
                            <PublishLiveButton />
                        </form>
                    )}
                </div>
            </header>

            {/* Sub-Tabs */}
            {tabs && tabs.length > 0 && (
                <div className="mb-8 flex inline-flex gap-1 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange?.(tab.id)}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Content Area */}
            <div className="space-y-12">{children}</div>

            {/* Global Floating Save Button (Optional if page has multiple forms) */}
            {onSave && (
                <div className="fixed bottom-8 right-8 z-50">
                    <SaveChangesButton formId={formId} />
                </div>
            )}
        </div>
    );
}
