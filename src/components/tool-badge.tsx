'use client';

import { VIBE_TOOLS, VibeTool } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ToolBadgeProps {
    tool: VibeTool;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ToolBadge({ tool, size = 'sm', className }: ToolBadgeProps) {
    const toolInfo = VIBE_TOOLS[tool];

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center font-mono font-medium rounded-md',
                'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
                'border border-zinc-200 dark:border-zinc-700',
                sizeClasses[size],
                className
            )}
        >
            {toolInfo.name}
        </span>
    );
}
