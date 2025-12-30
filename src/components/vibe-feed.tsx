'use client';

import { Vibe } from '@/lib/supabase/types';
import { VibesGrid } from '@/components/vibe-card';

interface VibeFeedProps {
    vibes: Vibe[];
}

export function VibeFeed({ vibes }: VibeFeedProps) {
    return (
        <div className="space-y-4">
            {/* Feed Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-serif font-normal text-foreground">
                        Discover Vibes
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {vibes.length} {vibes.length === 1 ? 'vibe' : 'vibes'} found
                    </p>
                </div>
            </div>

            {/* Vibes Grid with Empty State */}
            <VibesGrid vibes={vibes} />
        </div>
    );
}
