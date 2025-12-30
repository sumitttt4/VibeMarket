'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const ADMIN_EMAILS = ['sumitsharmaa.me@gmail.com', 'demo@vibemarket.tech']; // Replace with your actual email

async function checkAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
        throw new Error('Unauthorized');
    }
    return user;
}

export async function getPendingVibes() {
    try {
        await checkAdmin();
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('vibes')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching pending vibes:', error);
        return [];
    }
}

export async function approveVibe(id: string) {
    try {
        await checkAdmin();
        const supabase = await createClient();

        const { error } = await supabase
            .from('vibes')
            .update({ status: 'approved' })
            .eq('id', id);

        if (error) throw error;
        revalidatePath('/admin');
        revalidatePath('/'); // Refresh home feed
        return { success: true };
    } catch (error) {
        return { error: 'Failed to approve' };
    }
}

export async function rejectVibe(id: string) {
    try {
        await checkAdmin();
        const supabase = await createClient();

        const { error } = await supabase
            .from('vibes')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (error) throw error;
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to reject' };
    }
}
