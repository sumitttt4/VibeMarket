'use client';

import { X } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { COUNTRIES } from '@/lib/countries';
import { USE_CASES, VIBE_TOOLS, UseCase, VibeTool } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
    selectedCountry: string | null;
    selectedUseCase: UseCase | null;
    selectedTool: VibeTool | null;
    selectedCategory: string | null;
    categories: string[];
    onCountryChange: (country: string | null) => void;
    onUseCaseChange: (useCase: UseCase | null) => void;
    onToolChange: (tool: VibeTool | null) => void;
    onCategoryChange: (category: string | null) => void;
    className?: string;
}

export function FilterBar({
    selectedCountry,
    selectedUseCase,
    selectedTool,
    selectedCategory,
    categories,
    onCountryChange,
    onUseCaseChange,
    onToolChange,
    onCategoryChange,
    className,
}: FilterBarProps) {
    const hasActiveFilters = selectedCountry || selectedUseCase || selectedTool || selectedCategory;

    const clearAllFilters = () => {
        onCountryChange(null);
        onUseCaseChange(null);
        onToolChange(null);
        onCategoryChange(null);
    };

    return (
        <div className={cn('flex flex-wrap items-center gap-3', className)}>
            {/* Use Case - Primary: What are you looking for? */}
            <Select
                value={selectedUseCase || 'all'}
                onValueChange={(val) => onUseCaseChange(val === 'all' ? null : val as UseCase)}
            >
                <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Any purpose" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Any purpose</SelectItem>
                    {(Object.keys(USE_CASES) as UseCase[]).map(useCase => (
                        <SelectItem key={useCase} value={useCase}>
                            {USE_CASES[useCase].label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Country - Secondary: Where is it relevant? */}
            <Select
                value={selectedCountry || 'all'}
                onValueChange={(val) => onCountryChange(val === 'all' ? null : val)}
            >
                <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Any country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Any country</SelectItem>
                    {COUNTRIES.filter(c => c.code !== 'GLOBAL').map(country => (
                        <SelectItem key={country.code} value={country.code}>
                            {country.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Tool - Tertiary: How was it built? */}
            <Select
                value={selectedTool || 'all'}
                onValueChange={(val) => onToolChange(val === 'all' ? null : val as VibeTool)}
            >
                <SelectTrigger className="w-[120px] h-9">
                    <SelectValue placeholder="Any tool" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Any tool</SelectItem>
                    {(Object.keys(VIBE_TOOLS) as VibeTool[]).map(tool => (
                        <SelectItem key={tool} value={tool}>
                            {VIBE_TOOLS[tool].name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Category - Optional refinement */}
            {categories.length > 0 && (
                <Select
                    value={selectedCategory || 'all'}
                    onValueChange={(val) => onCategoryChange(val === 'all' ? null : val)}
                >
                    <SelectTrigger className="w-[130px] h-9">
                        <SelectValue placeholder="Any category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any category</SelectItem>
                        {categories.map(category => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {/* Clear All */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-9 text-xs text-muted-foreground hover:text-foreground"
                >
                    <X className="w-3 h-3 mr-1" />
                    Clear
                </Button>
            )}
        </div>
    );
}
