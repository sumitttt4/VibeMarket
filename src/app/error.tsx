'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#F9F9F7] text-[#1A1A1A]">
            <h2 className="font-serif text-2xl font-bold">Something went wrong!</h2>
            <p className="text-zinc-500">We couldn't load the vibes. Please try again.</p>
            <Button
                onClick={() => reset()}
                className="bg-[#1F5E63] text-white hover:bg-[#164e52]"
            >
                Try again
            </Button>
        </div>
    )
}
