import { UserNav } from '@/components/user-nav';
import { Rocket, CreditCard, User, LayoutDashboard, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const navItems = [
        { name: 'My Startups', href: '/dashboard', icon: Rocket },
        { name: 'Sponsorships', href: '/dashboard/sponsorships', icon: CreditCard },
        { name: 'Maker Profile', href: '/dashboard/profile', icon: User },
    ];

    return (
        <div className="flex min-h-screen bg-[#F9F9F7] text-[#1A1A1A]">
            {/* Dashboard Sidebar */}
            <aside className="w-64 border-r border-zinc-200 bg-white hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 relative">
                            <Image src="/logo.png" alt="VibeMarket" fill className="object-contain" />
                        </div>
                        <span className="font-serif font-bold text-xl tracking-tight">VibeMarket</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 mb-4">
                        Creator Portal
                    </div>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors group"
                        >
                            <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-[#1F5E63]" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-100">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                    >
                        <Globe className="w-4 h-4" />
                        Back to Market
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="text-zinc-900 font-medium">My Startups</span>
                    </div>

                    <UserNav user={user} />
                </header>

                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
