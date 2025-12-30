import { getMyVibes } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, MessageSquare, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SubmitModal } from '@/components/submit-modal';
import { createClient } from '@/lib/supabase/server';
import { Vibe } from '@/lib/supabase/types';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <AlertCircle className="w-12 h-12 text-zinc-300 mb-4" />
                <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
                <p className="text-zinc-500 mb-6 max-w-sm">Please sign in to access your creator dashboard.</p>
                <Link href="/signin?next=/dashboard">
                    <Button className="bg-[#1A1A1A]">Sign In</Button>
                </Link>
            </div>
        );
    }

    const vibes: Vibe[] = await getMyVibes();

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-end justify-between">
                <div className="space-y-1">
                    <h1 className="text-4xl font-serif font-bold tracking-tight">My Startups</h1>
                    <p className="text-zinc-500">Manage and track your vibe-coded creations.</p>
                </div>

                <SubmitModal user={user}>
                    <Button className="bg-[#1F5E63] hover:bg-[#164e52] text-white flex items-center gap-2 px-6 h-12 font-bold shadow-lg transition-transform active:scale-95">
                        <Plus className="w-5 h-5" />
                        Submit New Project
                    </Button>
                </SubmitModal>
            </div>

            {vibes && vibes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {vibes.map((vibe) => (
                        <div key={vibe.id} className="bg-white border border-zinc-200 rounded-2xl p-6 flex items-center gap-6 hover:shadow-md transition-all group">
                            {/* Logo/Icon */}
                            <div className="w-16 h-16 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center overflow-hidden shrink-0">
                                {vibe.logo_url ? (
                                    <Image src={vibe.logo_url} alt={vibe.title} width={64} height={64} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-2xl font-serif text-zinc-300">{vibe.title[0]}</div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-zinc-900">{vibe.title}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${vibe.status === 'approved' ? 'bg-green-50 text-green-600' :
                                        vibe.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                            'bg-amber-50 text-amber-600'
                                        }`}>
                                        {vibe.status}
                                    </span>
                                </div>
                                <p className="text-zinc-500 text-sm line-clamp-1">{vibe.description}</p>
                            </div>

                            {/* Stats (Placeholders) */}
                            <div className="flex items-center gap-8 px-8 border-x border-zinc-100 hidden lg:flex">
                                <div className="text-center">
                                    <div className="flex items-center gap-1.5 text-zinc-400 mb-1 justify-center">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        <span className="text-[10px] uppercase font-bold tracking-tighter">Votes</span>
                                    </div>
                                    <div className="font-serif font-bold text-xl">{vibe.votes || 0}</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center gap-1.5 text-zinc-400 mb-1 justify-center">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-[10px] uppercase font-bold tracking-tighter">Created</span>
                                    </div>
                                    <div className="font-serif font-bold text-lg">
                                        {new Date(vibe.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <Link href={vibe.live_url} target="_blank" className="p-2.5 rounded-xl hover:bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </Link>
                                <Button variant="outline" className="h-10 px-4 rounded-xl border-zinc-200 font-bold hidden sm:flex">
                                    Edit Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border-2 border-dashed border-zinc-200 rounded-3xl p-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto">
                        <Rocket className="w-10 h-10 text-zinc-200" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-serif font-bold">No vibe-checks yet?</h2>
                        <p className="text-zinc-500 max-w-sm mx-auto">
                            Submit your first project to start tracking its performance and grow your audience.
                        </p>
                    </div>
                    <SubmitModal user={user}>
                        <Button className="bg-[#1A1A1A] hover:bg-black text-white px-8 h-12 font-bold shadow-lg">
                            Push Your First Vibe
                        </Button>
                    </SubmitModal>
                </div>
            )}
        </div>
    );
}

function Rocket(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.71-2.5.71-2.5" />
            <path d="M15 10c-2.23 0-4.42 2.68-6 4.5l3.5 3.5c1.82-1.58 4.5-3.77 4.5-6.5a2.5 2.5 0 0 0-5 0Z" />
            <path d="m15 10 3-3" />
            <path d="M14.5 2c.51 0 1.1 0 1.5.5s.5 1 .5 1.5v.5s4.42 1.58 6 4.5L19 12.5c-1.58-1.82-4.5-4.5-4.5-6.5a2.5 2.5 0 0 1 0-4Z" />
            <path d="m11.5 11.5 1.5 1.5" />
            <path d="M9 15c-2.23 0-4.42-2.68-6-4.5l3.5-3.5c1.82 1.58 4.5 3.77 4.5 6.5a2.5 2.5 0 0 1-5 0Z" />
            <path d="M15 9l-3-3" />
        </svg>
    )
}
