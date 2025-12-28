'use client';

import { getCountryByCode } from '@/lib/countries';
import { cn } from '@/lib/utils';

interface CountryBadgeProps {
    code: string;
    showName?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function CountryBadge({
    code,
    showName = false,
    size = 'sm',
    className
}: CountryBadgeProps) {
    const country = getCountryByCode(code);

    if (!country) return null;

    const sizeClasses = {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-0.5',
        lg: 'text-sm px-2.5 py-1',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
                sizeClasses[size],
                className
            )}
            title={country.name}
        >
            <span className="font-medium">{country.code}</span>
            {showName && (
                <span className="text-muted-foreground">{country.name}</span>
            )}
        </span>
    );
}

interface CountryBadgesProps {
    codes: string[];
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function CountryBadges({
    codes,
    max = 3,
    size = 'sm',
    className
}: CountryBadgesProps) {
    const displayCodes = codes.slice(0, max);
    const remaining = codes.length - max;

    return (
        <span className={cn('inline-flex items-center gap-1', className)}>
            {displayCodes.map(code => (
                <CountryBadge key={code} code={code} size={size} />
            ))}
            {remaining > 0 && (
                <span className="text-xs text-muted-foreground">
                    +{remaining}
                </span>
            )}
        </span>
    );
}
