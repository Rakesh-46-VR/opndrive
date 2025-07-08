'use client'

import { FileType, Users, Calendar, MapPin, Info } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/dashboard/search-bar'
import { useScroll } from '@/context/scroll-context'
import { ViewDetails } from '@/components/ui/dashboard/view-details'

const FilterButton = ({
  icon,
  label
}: {
  icon: React.ReactNode
  label: string
}) => (
  <Button
    variant="ghost"
    className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-foreground shadow-sm hover:bg-accent transition-colors"
  >
    {icon}
    <span>{label}</span>
  </Button>
)

export const DriveHero = () => {
  const {
    isHeaderHidden,
    isSearchHidden,
    setHeaderHidden,
    setSearchHidden
  } = useScroll()

  const headerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = headerRef.current
    const s = searchRef.current
    if (!h || !s) return

    const headerObs = new IntersectionObserver(
      ([e]) => setHeaderHidden(!e.isIntersecting),
      { threshold: 0 }
    )
    const searchObs = new IntersectionObserver(
      ([e]) => setSearchHidden(!e.isIntersecting),
      { threshold: 0 }
    )

    headerObs.observe(h)
    searchObs.observe(s)

    return () => {
      headerObs.disconnect()
      searchObs.disconnect()
    }
  }, [setHeaderHidden, setSearchHidden])

  return (
    <div className="relative mb-8">
      <div
        className={`absolute right-0 top-0 z-10 transition-all duration-300 ease-out ${
          isSearchHidden
            ? 'opacity-0 pointer-events-none translate-x-2'
            : 'opacity-100 translate-x-0'
        }`}
      >
       <ViewDetails/>
      </div>

      <div
        ref={headerRef}
        className={`transition-all duration-300 ease-out ${
          isHeaderHidden
            ? 'opacity-0 -translate-y-4 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <h1 className="mb-6 text-center text-2xl font-normal text-foreground">
          Welcome to Opndrive
        </h1>
      </div>

      <div
        ref={searchRef}
        className={`transition-all duration-300 ease-out ${
          isSearchHidden
            ? 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="mx-auto mb-6 max-w-2xl">
          <SearchBar />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <FilterButton icon={<FileType size={16} />} label="Type" />
          <FilterButton icon={<Users size={16} />} label="People" />
          <FilterButton icon={<Calendar size={16} />} label="Modified" />
          <FilterButton icon={<MapPin size={16} />} label="Location" />
        </div>
      </div>
    </div>
  )
}
