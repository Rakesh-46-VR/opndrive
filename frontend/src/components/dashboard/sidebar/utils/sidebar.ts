import { NavItem, SidebarSection } from "../types/sidebar"

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const calculateUsagePercentage = (used: number, total: number): number => {
  return Math.round((used / total) * 100)
}

export const groupNavItems = (navItems: NavItem[]): SidebarSection[] => {
  const primaryItems = navItems.filter(item => 
    ['Home', 'Dashboard', 'My Drive', 'Computers'].includes(item.title)
  )
  
  const sharedItems = navItems.filter(item => 
    ['Shared with me', 'Recent', 'Starred'].includes(item.title)
  )
  
  const otherItems = navItems.filter(item => 
    !primaryItems.includes(item) && !sharedItems.includes(item)
  )

  const sections: SidebarSection[] = []

  if (primaryItems.length > 0) {
    sections.push({
      items: primaryItems,
      showSeparator: false
    })
  }

  if (sharedItems.length > 0) {
    sections.push({
      items: sharedItems,
      showSeparator: true
    })
  }

  if (otherItems.length > 0) {
    sections.push({
      items: otherItems,
      showSeparator: true
    })
  }

  return sections
}

export const getStorageKeyForRole = (role: string): string => {
  return `sidebarOpenSections_${role}`
}