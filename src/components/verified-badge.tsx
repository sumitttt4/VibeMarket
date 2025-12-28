'use client';

import { Check, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerifiedBadgeProps {
    className?: string;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function VerifiedBadge({
    className,
    showLabel = true,
    size = 'sm'
}: VerifiedBadgeProps) {
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px] gap-1',
        md: 'px-2.5 py-1 text-xs gap-1.5',
        lg: 'px-3 py-1.5 text-sm gap-2',
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-full',
                'bg-gradient-to-r from-neo-mint-50 to-neo-mint-100',
                'text-deep-teal border border-neo-mint/60',
                'shadow-sm',
                sizeClasses[size],
                className
            )}
        >
            <Check className={iconSizes[size]} strokeWidth={3} />
            {showLabel && <span>Verified Fit</span>}
        </span>
    );
}

// Alternative style for inline usage
export function VerifiedIcon({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                'inline-flex items-center justify-center',
                'w-5 h-5 rounded-full',
                'bg-neo-mint text-deep-teal-700',
                className
            )}
            title="Verified Fit"
        >
            <Check className="w-3 h-3" strokeWidth={3} />
        </span>
    );
}
