'use client'

import { FileType, Users, Calendar, MapPin } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/dashboard/search-bar/search-bar'
import { useScroll } from '@/context/scroll-context'
import { ViewDetails } from '@/components/ui/dashboard/view-details'

const FilterButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <Button variant="ghost" className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-foreground shadow-sm hover:bg-accent transition-colors">
    {icon}
    <span>{label}</span>
  </Button>
)

export const DriveHero = () => {
  const {
    isSearchHidden,
    isFiltersHidden,
    setSearchHidden,
    setFiltersHidden
  } = useScroll()

  const searchRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const s = searchRef.current
    const f = filtersRef.current
    if (!s || !f) return

    const searchObs = new IntersectionObserver(
      ([e]) => setSearchHidden(!e.isIntersecting),
      { threshold: 0 }
    )
    const filtersObs = new IntersectionObserver(
      ([e]) => setFiltersHidden(!e.isIntersecting),
      { threshold: 0 }
    )

    searchObs.observe(s)
    filtersObs.observe(f)

    return () => {
      searchObs.disconnect()
      filtersObs.disconnect()
    }
  }, [setSearchHidden, setFiltersHidden])

  return (
    <div className="relative mb-8">

      <div className="absolute right-0 top-0 z-10">
        <ViewDetails />
      </div>

      <h1 className={`mb-6 text-center text-2xl font-normal text-foreground transition-all duration-300 ${isFiltersHidden ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        Welcome to Opndrive
      </h1>

      <div ref={searchRef} className={`mx-auto mb-6 max-w-2xl transition-all duration-300 ${isSearchHidden ? 'opacity-0 -translate-y-8 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'}`}>
        <SearchBar />
      </div>

      <div ref={filtersRef} className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-300 ${isFiltersHidden ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <FilterButton icon={<FileType size={16} />} label="Type" />
        <FilterButton icon={<Users size={16} />} label="People" />
        <FilterButton icon={<Calendar size={16} />} label="Modified" />
        <FilterButton icon={<MapPin size={16} />} label="Location" />
      </div>
    </div>
  )
}
