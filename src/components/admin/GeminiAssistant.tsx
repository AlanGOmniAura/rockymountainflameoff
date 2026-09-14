'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2, Undo2 } from 'lucide-react';
import { editContentWithGemini } from '@/app/actions/assistant';
import { useRouter } from 'next/navigation';

export default function GeminiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; isError?: boolean }>>([
        { 
            role: 'assistant', 
            text: "👋 Hi! I'm your AI website editor. Tell me what to change and I'll draft it instantly.\n\nTry: \"Update the homepage banner to say 'Summer Classes Now Open!'\" or \"Change the Youth class description.\"" 
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    async function handleSend(e: React.FormEvent) {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        const userMsg = prompt.trim();
        setPrompt('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const res = await editContentWithGemini(userMsg, messages);
            if (res.success) {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    text: `✅ ${res.reply || 'Draft updated successfully!'}\n\n💡 Your changes are saved as a draft. Review them in the editor, then hit Publish when ready.` 
                }]);
                router.refresh();
            } else if (res.error) {
                setMessages(prev => [...prev, { role: 'assistant', text: `⚠️ ${res.error}`, isError: true }]);
            }
        } catch (err: any) {
            setMessages(prev => [...prev, { role: 'assistant', text: `❌ ${err.message || 'Failed to update draft.'}`, isError: true }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Floating Glow Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-violet-500/50 hover:shadow-2xl"
                style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                title="AI Content Editor"
            >
                <Sparkles className="h-6 w-6" />
            </button>

            {/* Backdrop overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-over Drawer */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950/95 border-l border-zinc-800/80 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 p-1.5 text-white">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-white">Gemini Content Editor</h2>
                            <p className="text-[10px] text-zinc-400">Changes are saved to draft only — review before publishing</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Safety notice banner */}
                <div className="px-4 py-2 bg-violet-950/30 border-b border-violet-900/20">
                    <p className="text-[10px] text-violet-300/80 text-center">
                        🛡️ All edits are backed up automatically. Changes go to Draft only — nothing goes live until you Publish.
                    </p>
                </div>

                {/* Messages Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                                msg.role === 'user' 
                                    ? 'bg-violet-600 text-white rounded-br-none' 
                                    : msg.isError 
                                        ? 'bg-red-950/40 border border-red-900/40 text-red-200 rounded-bl-none' 
                                        : 'bg-zinc-900 text-zinc-200 rounded-bl-none border border-zinc-800/50'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-2.5 text-xs text-zinc-400 rounded-bl-none border border-zinc-800/50">
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-500" />
                                Analyzing request and drafting changes...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Form Input Footer */}
                <form onSubmit={handleSend} className="border-t border-zinc-800 p-4 bg-zinc-900/30">
                    <div className="flex gap-2">
                        <input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Tell Gemini what to change..."
                            disabled={loading}
                            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-violet-500 transition-colors disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={!prompt.trim() || loading}
                            className="flex items-center justify-center rounded-xl bg-violet-600 px-4 text-white hover:bg-violet-500 active:bg-violet-700 transition-colors disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
