import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                <FileQuestion className="w-8 h-8 text-zinc-400" />
            </div>
            <div>
                <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Page Not Found</h2>
                <p className="text-zinc-500 mt-2">The page you are looking for doesn't exist or has been moved.</p>
            </div>
            <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1F5E63] text-white font-medium rounded-lg hover:bg-[#164e52] transition-all hover:shadow-md"
            >
                Return Home
            </Link>
        </div>
    )
}
