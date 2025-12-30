'use client';

import Link from 'next/link';
import { Vibe } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';
import { Crown, ArrowUpRight, Zap } from 'lucide-react';
import { SubmitModal } from '@/components/submit-modal';
import { User } from '@supabase/supabase-js';

interface RightSidebarProps {
    featuredVibes: Vibe[];
    user: User | null;
}

export function RightSidebar({ featuredVibes, user }: RightSidebarProps) {
    return (
        <aside className="w-[300px] h-full flex flex-col gap-6 p-6 border-l border-zinc-200 bg-[#F9F9F7] shrink-0">
            {/* Top: Featured VIPs */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-wider">
                    <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Featured VIPs
                </div>

                <div className="space-y-3">
                    {featuredVibes.length > 0 ? (
                        featuredVibes.map((vibe) => (
                            <a
                                key={vibe.id}
                                href={vibe.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block p-3 rounded-lg bg-white border border-zinc-200 hover:border-[#1F5E63] transition-all hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#1F5E63] truncate">
                                        {vibe.title}
                                    </h4>
                                    {vibe.plan === 'paid' && (
                                        <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />
                                    )}
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2">
                                    {vibe.description}
                                </p>
                            </a>
                        ))
                    ) : (
                        <div className="text-xs text-zinc-400 italic text-center py-4 border border-dashed border-zinc-300 rounded-lg">
                            No VIPs yet. Be the first!
                        </div>
                    )}
                </div>
            </div>

            {/* Middle: Submit Button */}
            <div className="mt-auto pt-6 border-t border-zinc-200">
                <SubmitModal user={user}>
                    <button className="w-full py-4 bg-[#1F5E63] hover:bg-[#164e52] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                        <span className="font-bold text-lg">Submit Project</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </SubmitModal>
                <p className="text-center text-xs text-zinc-400 mt-3">
                    Join 2,000+ creators launching today.
                </p>
            </div>

            {/* Bottom: Sponsorship */}
            <div className="text-center pb-2">
                <a
                    href="mailto:sponsor@vibemarket.tech"
                    className="text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                    Interested in Sponsorship?
                </a>
            </div>
        </aside>
    );
}
