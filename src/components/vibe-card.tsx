'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowBigUp } from 'lucide-react';
import { Vibe } from '@/lib/supabase/types';
import { cn } from '@/lib/utils';

interface VibeCardProps {
    vibe: Vibe;
    className?: string;
}

export function VibeCard({ vibe, className }: VibeCardProps) {
    return (
        <motion.article
            className={cn(
                'group relative flex flex-col',
                'bg-white dark:bg-zinc-900',
                'border border-zinc-200 dark:border-zinc-800',
                'rounded-xl overflow-hidden',
                'transition-all duration-200',
                'hover:border-zinc-300 dark:hover:border-zinc-700',
                'hover:shadow-md',
                className
            )}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
        >
            {/* Live Preview Iframe (Fixed 16:9) */}
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden group">
                {/* Clickable overlay to open project (since iframe is scaled pointer-events-none) */}
                <a href={vibe.live_url} target="_blank" rel="noreferrer" className="absolute inset-0 z-20" />

                <iframe
                    src={vibe.live_url}
                    className="w-[1440px] h-[900px] transform scale-[0.25] origin-top-left pointer-events-none absolute top-0 left-0 border-none opacity-90 transition-opacity group-hover:opacity-100"
                    title={vibe.title}
                    tabIndex={-1}
                    loading="lazy"
                />

                {/* Product Logo Overlay */}
                {vibe.logo_url && (
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-white p-1 border border-zinc-200 shadow-sm z-30 overflow-hidden">
                        <img
                            src={vibe.logo_url}
                            alt={vibe.title}
                            className="w-full h-full object-contain rounded-[4px]"
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                {/* Title & External Link */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-normal text-foreground group-hover:text-deep-teal transition-colors leading-tight flex-1">
                        {vibe.title}
                    </h3>
                    <a
                        href={vibe.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                    {vibe.description}
                </p>

                {/* Tags */}
                {vibe.tags && vibe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {vibe.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                            >
                                {tag}
                            </span>
                        ))}
                        {vibe.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs text-muted-foreground">
                                +{vibe.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Footer: Tool & Votes */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    {/* Tool */}
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                        {vibe.tool}
                    </span>

                    {/* Votes - Static display */}
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-deep-teal">
                        <ArrowBigUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">{vibe.votes}</span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

// Grid container for vibe cards
interface VibesGridProps {
    vibes: Vibe[];
    className?: string;
}

export function VibesGrid({ vibes, className }: VibesGridProps) {
    if (vibes.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="mb-4">
                    <p className="text-xl font-serif text-foreground mb-2">No Vibes Found</p>
                    <p className="text-sm text-muted-foreground">
                        Be the first to submit a vibe and get the feed started!
                    </p>
                </div>
                <button
                    onClick={() => document.getElementById('submit-trigger')?.click()}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                >
                    Submit First Vibe
                </button>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'grid gap-4',
                'grid-cols-1 md:grid-cols-2',
                className
            )}
        >
            {vibes.map((vibe, index) => (
                <motion.div
                    key={vibe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <VibeCard vibe={vibe} />
                </motion.div>
            ))}
        </div>
    );
}
