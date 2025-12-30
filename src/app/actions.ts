'use server';

import { createClient } from '@/lib/supabase/server';
import { Vibe, VibeInsert } from '@/lib/supabase/types';

/**
 * Server Action: Fetch all vibes from Supabase
 * Sorting Logic: Paid projects first, then newest.
 */
export async function getVibes(): Promise<Vibe[]> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('vibes')
            .select('*')
            .eq('status', 'approved') // Only show approved vibes
            .order('plan', { ascending: false }) // 'paid' > 'free'
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching vibes:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching vibes:', error);
        return [];
    }
}

/**
 * Server Action: Get featured VIP vibes (Paid only)
 */
export async function getFeaturedVibes(): Promise<Vibe[]> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('vibes')
            .select('*')
            .eq('plan', 'paid')
            .eq('status', 'approved')
            .limit(5);

        if (error) {
            console.error('Error fetching featured vibes:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching featured vibes:', error);
        return [];
    }
}

/**
 * Server Action: Submit a new vibe
 */
export async function submitVibe(vibe: VibeInsert): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = await createClient();

        // Get current user to link creator
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { success: false, error: 'You must be logged in to submit a vibe.' };
        }

        const { error } = await supabase
            .from('vibes')
            .insert({
                ...vibe,
                user_id: user.id, // Link to the user
                creator_name: user.email?.split('@')[0] || 'Anonymous', // Simple fallback
                status: 'pending' // Always pending first
            });

        if (error) {
            console.error('Error submitting vibe:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Unexpected error submitting vibe:', error);
        return { success: false, error: 'Unexpected error occurred.' };
    }
}

/**
 * Server Action: Get vibes for the current user (Dashboard)
 */
export async function getMyVibes(): Promise<Vibe[]> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return [];

        const { data, error } = await supabase
            .from('vibes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching my vibes:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching my vibes:', error);
        return [];
    }
}

/**
 * Server Action: Fetch filtered vibes
 * Maintained but updated with new sorting
 */
export async function getFilteredVibes(filters: {
    tool?: string | null;
    country?: string | null;
    tag?: string | null;
}): Promise<Vibe[]> {
    try {
        const supabase = await createClient();

        let query = supabase
            .from('vibes')
            .select('*')
            .eq('status', 'approved')
            .order('plan', { ascending: false })
            .order('created_at', { ascending: false });

        if (filters.tool) {
            query = query.eq('tool', filters.tool);
        }

        if (filters.country) {
            query = query.eq('country', filters.country);
        }

        if (filters.tag) {
            query = query.contains('tags', [filters.tag]);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching filtered vibes:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching filtered vibes:', error);
        return [];
    }
}

/**
 * Server Action: Get trending vibes (top 3)
 * Kept for specific trending widgets if needed, using votes
 */
export async function getTrendingVibes(): Promise<Vibe[]> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('vibes')
            .select('*')
            .eq('status', 'approved')
            .order('votes', { ascending: false })
            .limit(3);

        if (error) {
            console.error('Error fetching trending vibes:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Unexpected error fetching trending vibes:', error);
        return [];
    }
}

/**
 * Server Action: Increment vote count
 */
export async function incrementVote(vibeId: string): Promise<boolean> {
    try {
        const supabase = await createClient();

        const { error } = await supabase.rpc('increment_vote', {
            vibe_id: vibeId,
        });

        if (error) {
            console.error('Error incrementing vote:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Unexpected error incrementing vote:', error);
        return false;
    }
}
