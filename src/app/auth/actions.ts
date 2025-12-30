'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Sign in with Magic Link
 */
export async function signInWithMagicLink(email: string) {
    const supabase = await createClient();

    // Use current origin for redirect
    // In production, this should be set in Supabase definition, 
    // but we'll try to use a relative path that Supabase resolves to site URL.
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: redirectTo,
            shouldCreateUser: true, // This allows both sign up and sign in
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

/**
 * Sign out the current user
 */
export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

/**
 * Get the current user session
 */
export async function getUser() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    return user;
}
