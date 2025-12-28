import { Country } from './types';

export const COUNTRIES: Country[] = [
    { code: 'IN', name: 'India', flag: 'IN' },
    { code: 'US', name: 'United States', flag: 'US' },
    { code: 'GB', name: 'United Kingdom', flag: 'GB' },
    { code: 'DE', name: 'Germany', flag: 'DE' },
    { code: 'FR', name: 'France', flag: 'FR' },
    { code: 'CA', name: 'Canada', flag: 'CA' },
    { code: 'AU', name: 'Australia', flag: 'AU' },
    { code: 'JP', name: 'Japan', flag: 'JP' },
    { code: 'SG', name: 'Singapore', flag: 'SG' },
    { code: 'AE', name: 'UAE', flag: 'AE' },
    { code: 'NL', name: 'Netherlands', flag: 'NL' },
    { code: 'SE', name: 'Sweden', flag: 'SE' },
    { code: 'BR', name: 'Brazil', flag: 'BR' },
    { code: 'MX', name: 'Mexico', flag: 'MX' },
    { code: 'KR', name: 'South Korea', flag: 'KR' },
    { code: 'ID', name: 'Indonesia', flag: 'ID' },
    { code: 'PH', name: 'Philippines', flag: 'PH' },
    { code: 'NG', name: 'Nigeria', flag: 'NG' },
    { code: 'ZA', name: 'South Africa', flag: 'ZA' },
    { code: 'GLOBAL', name: 'Global', flag: '' },
];

export const getCountryByCode = (code: string): Country | undefined => {
    return COUNTRIES.find(c => c.code === code);
};

export const getCountryFlag = (code: string): string => {
    return getCountryByCode(code)?.code || '';
};

export const getCountryName = (code: string): string => {
    return getCountryByCode(code)?.name || 'Global';
};
