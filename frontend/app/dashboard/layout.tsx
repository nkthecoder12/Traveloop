"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  User, 
  Sparkles,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Map,
  Wallet,
  Backpack,
  Users,
  StickyNote,
  Settings
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Trips", href: "/dashboard/trips", icon: Map },
  { name: "AI Planner", href: "/dashboard/ai-planner", icon: Sparkles },
  { name: "Budgets", href: "/dashboard/budget", icon: Wallet },
  { name: "Packing List", href: "/dashboard/packing", icon: Backpack },
  { name: "Shared Trips", href: "/dashboard/community", icon: Users },
  { name: "Notes", href: "/dashboard/notes", icon: StickyNote },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="bg-primary text-white flex flex-col relative z-20"
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-xl">
              <img 
                src="/logo.png" 
                alt="Traveloop Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold font-heading tracking-tight whitespace-nowrap"
              >
                Traveloop
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-accent text-primary font-bold shadow-[0_4px_12px_rgba(23,199,209,0.3)]" 
                    : "text-sky/60 hover:bg-white/50 hover:text-white"
                )}
              >
                <link.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "group-hover:text-accent")} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium"
                  >
                    {link.name}
                  </motion.span>
                )}
                {isActive && (
                   <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full" 
                   />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Sidebar Footer or Spacer */}
        <div className="mt-auto" />
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-muted/50 px-4 py-2 rounded-xl border border-border w-96">
            <Search className="w-4 h-4 text-sky/60" />
            <input 
              type="text" 
              placeholder="Search your trips, places, notes..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-primary"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-sky/60 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-[10px] text-sky/60 font-bold uppercase tracking-wider">
                  {user?.role || "Traveler"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                <img 
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=17C7D1&color=fff`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
