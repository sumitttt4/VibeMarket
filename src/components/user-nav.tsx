'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { signOut } from '@/app/auth/actions';
import { LogOut, User as UserIcon } from 'lucide-react';

interface UserNavProps {
    user: User | null;
}

export function UserNav({ user }: UserNavProps) {
    if (!user) {
        return (
            <a
                href="/signin"
                className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4"
            >
                Sign In
            </a>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800">
                <UserIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                </span>
            </div>
            <button
                type="button"
                onClick={async () => await signOut()}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-3"
                title="Sign out"
            >
                <LogOut className="w-4 h-4" />
                <span className="sr-only">Sign out</span>
            </button>
        </div>
    );
}
