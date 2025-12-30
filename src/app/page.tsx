import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getFilteredVibes, getFeaturedVibes } from '@/app/actions';
import { VibeFeed } from '@/components/vibe-feed';
import { LeftSidebar } from '@/components/left-sidebar';
import { RightSidebar } from '@/components/right-sidebar';

export const dynamic = 'force-dynamic';

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Await searchParams as per Next.js 15
    const params = await searchParams;

    // Get Current User
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch Vibes (Filtered or All)
    const vibes = await getFilteredVibes({
        tool: (params.tool as string) || null,
        country: (params.country as string) || null,
        tag: (params.tag as string) || null,
    });

    // Fetch Featured Vibes for Sidebar
    const featuredVibes = await getFeaturedVibes();

    return (
        // The App Shell Wrapper
        <div className="h-screen w-full bg-[#F9F9F7] grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] overflow-hidden">

            {/* Left Sidebar (Static) */}
            <div className="hidden lg:block h-full overflow-hidden">
                <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <LeftSidebar user={user} />
                </Suspense>
            </div>

            {/* Center Feed (Scrollable) */}
            <main className="h-full overflow-y-auto w-full relative">
                <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-32">
                    {/* Mobile Header (Only visible on small screens) */}
                    <div className="lg:hidden flex items-center justify-between mb-6">
                        <div className="font-serif text-xl font-bold tracking-tight text-[#1A1A1A]">
                            VibeMarket
                        </div>
                    </div>

                    {/* Sticky Search Header */}
                    <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-[#F9F9F7]/80 backdrop-blur-md border-b border-zinc-200/50 mb-8 transition-all">
                        <div className="relative max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="Search vibes..."
                                className="w-full bg-white border border-zinc-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5E63]/20 shadow-sm"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>

                    <Suspense fallback={<div className="text-center py-20">Loading vibes...</div>}>
                        <VibeFeed vibes={vibes} />
                    </Suspense>

                    {/* Footer */}
                    <footer className="mt-20 pt-10 border-t border-zinc-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                            {/* Left: Branding */}
                            <div className="space-y-4">
                                <h4 className="font-serif text-lg font-bold">VibeMarket</h4>
                                <p className="text-sm text-zinc-500">
                                    Curated AI vibes for the next generation of builders.
                                </p>
                            </div>

                            {/* Middle: Portfolio (Requested) */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-sm uppercase tracking-wide">More by Sumit</h4>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li><a href="https://getlockedin.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#1F5E63] transition-colors">GetLockedIn</a></li>
                                    <li><a href="https://safeagree.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#1F5E63] transition-colors">SafeAgree</a></li>
                                    <li><a href="https://monoqr.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#1F5E63] transition-colors">MonoQR</a></li>
                                    <li><a href="https://linkease.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#1F5E63] transition-colors">Linkease</a></li>
                                    <li><a href="https://n8n-workflow.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#1F5E63] transition-colors">n8n Workflow</a></li>
                                </ul>
                            </div>

                            {/* Right: Resources */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-sm uppercase tracking-wide">Resources</h4>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li><a href="#" className="hover:text-[#1F5E63] transition-colors">Documentation</a></li>
                                    <li><a href="#" className="hover:text-[#1F5E63] transition-colors">Support</a></li>
                                    <li><a href="#" className="hover:text-[#1F5E63] transition-colors">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-zinc-200 gap-4">
                            <p className="text-xs text-zinc-400">© 2024 VibeMarket. All rights reserved.</p>
                            <div className="flex items-center gap-2 text-sm text-zinc-600">
                                <span>Built by</span>
                                <a href="https://sumitsharmaa.me" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1F5E63] hover:underline">Sumit</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

            {/* Right Sidebar (Static) */}
            <div className="hidden lg:block h-full overflow-hidden">
                <RightSidebar featuredVibes={featuredVibes} user={user} />
            </div>

            {/* Mobile Bottom Nav / or simple fallback? 
                The prompt focuses on the 3-column desktop layout. 
                For mobile, the sidebars hide (hidden lg:block). 
                The main content is visible. A mobile navigation implementation might be needed later.
            */}
        </div>
    );
}
