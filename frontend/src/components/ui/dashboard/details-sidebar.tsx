'use client'

import { X } from 'lucide-react'
import { Button } from '../button'
import { useDetails } from '@/context/details-context'
import Image from 'next/image'
import { assets } from '@/assets'

export const DetailsSidebar = () => {
  const { close } = useDetails()

  return (
    <aside className="flex  w-80 mr-3 ml-2 mb-4 shrink-0 flex-col rounded-3xl border border-border/20 bg-background">
      <div className="rounded-t-3xl overflow-hidden" />

      <header className="flex items-center justify-between px-4 py-3 border-b border-border/20">
        <h4 className="text-lg font-medium text-foreground">Details</h4>
        <Button variant="sheet" size="icon" onClick={close}>
          <X className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col items-center justify-center">
          <Image src={assets.viewDetail.src} alt="Placeholder-view-details" width={175} height={175} priority />
        <p className="text-sm text-muted-foreground text-center">
          Select an item to see the details
        </p>
      </div>
    </aside>
  )
}