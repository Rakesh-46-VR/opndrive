import React from "react"
import { LayoutDashboard, Users, UserPlus, BarChart, Settings, UserCircle, FileText } from "lucide-react"

export interface NavItem {
  title: string
  href: string 
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const adminNavItems: NavItem[] = [
  {
    title: "Overview",
    href: "/", 
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/user", 
    icon: Users,
    children: [
      {
        title: "Add User",
        href: "/user/add",
        icon: UserPlus,
      },
  
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

const sevadarNavItems: NavItem[] = [
  {
    title: "My Dashboard",
    href: "/", 
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function getNavItems(role: string): NavItem[] {
  if (role === "admin") {
    return adminNavItems
  }
  if (role === "sevadar") {
    return sevadarNavItems
  }
  return [] 
}
