'use client'

import { DriveHero } from '@/components/dashboard/home/drive-hero'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScroll } from '@/context/scroll-context'

export default function HomePage() {
  const { isSearchHidden } = useScroll()

  return (
    <>
      <DriveHero />
      <div className="relative">
        <div
          className={`sticky top-[-28] z-20 flex items-center justify-between gap-4 py-4 bg-background ${
            isSearchHidden
              ? 'opacity-100 translate-y-0 transition-all duration-300 ease-in'
              : 'opacity-0 -translate-y-2 pointer-events-none transition-all duration-300 ease-out'
          }`}
        >
          <h2 className="text-2xl font-normal text-foreground">
            Welcome to Opndrive
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="View details"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>

        <h3 className="mb-4 text-base font-medium text-secondary-foreground">
          Suggested
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50 cursor-pointer"
            >
              <p className="text-muted-foreground">Item {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
