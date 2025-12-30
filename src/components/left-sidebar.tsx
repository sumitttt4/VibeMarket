'use client';

import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { LogOut, User as UserIcon, Zap, Filter, Check, LayoutDashboard } from 'lucide-react';
import { SubmitModal } from '@/components/submit-modal';
import { signOut } from '@/app/auth/actions';

interface LeftSidebarProps {
    user: User | null;
}

export function LeftSidebar({ user }: LeftSidebarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentTool = searchParams.get('tool');

    return (
        <aside className="w-[260px] h-full flex flex-col border-r border-zinc-200 bg-[#F9F9F7] shrink-0">
            {/* Top: Logo + Fast Track Badge */}
            <div className="p-6 flex flex-col gap-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="VibeMarket Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                        priority
                    />
                    <span className="font-serif text-xl font-bold tracking-tight text-[#1A1A1A]">
                        VibeMarket
                    </span>
                </Link>

                {/* Compact "Skip the Queue" Badge */}
                <SubmitModal user={user}>
                    <div
                        className="bg-white border border-zinc-200 border-l-4 border-l-[#1F5E63] rounded-md p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#1F5E63] transition-colors">Get Fast Track</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-tight pl-6">
                            Skip the wait & go Featured.
                        </p>
                    </div>
                </SubmitModal>
            </div>

            {/* Middle: Navigation */}
            <div className="flex-1 px-4 py-2 space-y-1">
                {user && (
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-zinc-600 hover:bg-white hover:text-[#1F5E63] hover:shadow-sm transition-all group"
                    >
                        <LayoutDashboard className="w-4 h-4 text-zinc-400 group-hover:text-[#1F5E63]" />
                        Creator Dashboard
                    </Link>
                )}
            </div>

            {/* Bottom: User Profile */}
            <div className="p-4 border-t border-zinc-200 bg-white/50">
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
                            {user.user_metadata?.avatar_url ? (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="User"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-xs font-medium text-zinc-600">
                                    {user.email?.slice(0, 2).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-medium text-[#1A1A1A] truncate">
                                {user.user_metadata?.name || user.email?.split('@')[0]}
                            </span>
                            <span className="text-xs text-zinc-500 truncate">
                                {user.email}
                            </span>
                        </div>
                        <button
                            onClick={async () => await signOut()}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            title="Sign out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/signin"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-[#1A1A1A] text-sm font-medium rounded-lg transition-colors"
                    >
                        <UserIcon className="w-4 h-4" />
                        Sign In / Sign Up
                    </Link>
                )}
            </div>
        </aside>
    );
}
