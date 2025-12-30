'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getPendingVibes, approveVibe, rejectVibe } from './actions';
import { Vibe } from '@/lib/supabase/types';
import { Loader2, Check, X, ShieldAlert, ExternalLink, Zap } from 'lucide-react';

export default function AdminPage() {
    const [vibes, setVibes] = useState<Vibe[]>([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUserEmail(user?.email || null);

        // Simple client-side check (real check is on server)
        const ADMIN_EMAILS = ['sumitsharmaa.me@gmail.com', 'demo@vibemarket.tech']; // Keep in sync with actions.ts
        if (user?.email && ADMIN_EMAILS.includes(user.email)) {
            setIsAuthorized(true);
            loadVibes();
        } else {
            setLoading(false);
        }
    }

    async function loadVibes() {
        setLoading(true);
        const data = await getPendingVibes();
        setVibes(data as Vibe[]); // Casting for simplicity
        setLoading(false);
    }

    async function handleApprove(id: string) {
        if (!confirm('Approve this vibe?')) return;
        setVibes(vibes.filter(v => v.id !== id)); // Optimistic update
        await approveVibe(id);
    }

    async function handleReject(id: string) {
        if (!confirm('Reject this vibe?')) return;
        setVibes(vibes.filter(v => v.id !== id)); // Optimistic update
        await rejectVibe(id);
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-zinc-400" /></div>;
    }

    if (!isAuthorized) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 p-4 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold">Unauthorized</h1>
                <p className="text-zinc-500 max-w-md">
                    You are signed in as <span className="font-mono bg-zinc-100 px-1 rounded">{userEmail}</span>.
                    <br />
                    This email is not on the admin list.
                </p>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <strong>Dev Note:</strong> Add your email to <code>src/app/admin/actions.ts</code> to gain access.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F9F7] p-8">
            <div className="max-w-5xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Admin Dashboard</h1>
                        <p className="text-zinc-500">Manage submissions and approvals</p>
                    </div>
                    <div className="px-3 py-1 bg-zinc-200 rounded-full text-xs font-medium text-zinc-600">
                        {userEmail}
                    </div>
                </header>

                <div className="grid gap-6">
                    {vibes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-zinc-300">
                            <p className="text-zinc-400">No pending vibes found. Time to market!</p>
                        </div>
                    ) : (
                        vibes.map((vibe) => (
                            <div key={vibe.id} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
                                {/* Preview */}
                                <div className="w-full md:w-64 aspect-video bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                                    <iframe
                                        src={vibe.live_url}
                                        className="w-full h-full pointer-events-none"
                                        tabIndex={-1}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="font-bold text-lg text-[#1A1A1A] truncate">{vibe.title}</h3>
                                        {vibe.plan === 'paid' && (
                                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wide">
                                                <Zap className="w-3 h-3 fill-yellow-700" />
                                                Paid
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{vibe.description}</p>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            <a href={vibe.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#1F5E63]">
                                                {vibe.live_url} <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                        <span>•</span>
                                        <span className="bg-zinc-100 px-2 py-0.5 rounded text-zinc-600 font-mono uppercase">
                                            {vibe.tool}
                                        </span>
                                        <span>•</span>
                                        <span>Submitted by {vibe.creator_name || 'Anonymous'}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex md:flex-col gap-2 shrink-0">
                                    <button
                                        onClick={() => handleApprove(vibe.id)}
                                        className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1F5E63] text-white rounded-lg hover:bg-[#164e52] transition-colors font-medium text-sm w-full md:w-32"
                                    >
                                        <Check className="w-4 h-4" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(vibe.id)}
                                        className="flex items-center justify-center gap-2 px-6 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg hover:bg-zinc-50 hover:text-red-600 hover:border-red-200 transition-colors font-medium text-sm w-full md:w-32"
                                    >
                                        <X className="w-4 h-4" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
