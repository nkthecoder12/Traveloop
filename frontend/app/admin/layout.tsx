"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  Globe, 
  Wallet, 
  MessageSquare, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Activity,
  Terminal
} from "lucide-react"
import { cn } from "@/lib/utils"

const adminLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "User Analytics", href: "/admin/users", icon: Users },
  { name: "Trips Logic", href: "/admin/trips", icon: Map },
  { name: "Destination AI", href: "/admin/destinations", icon: Globe },
  { name: "Financials", href: "/admin/revenue", icon: Wallet },
  { name: "Community Ops", href: "/admin/community", icon: MessageSquare },
  { name: "AI Core Monitoring", href: "/admin/ai-monitor", icon: Cpu },
  { name: "System Reports", href: "/admin/reports", icon: FileText },
  { name: "Support Queue", href: "/admin/support", icon: ShieldCheck },
  { name: "Kernel Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Don't show layout on login page
  if (pathname === "/admin/login") return <>{children}</>

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Enterprise Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="bg-[#28545B] text-white flex flex-col relative z-30 shadow-2xl"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-[#17C7D1]">
               <Terminal size={24} />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-black font-heading tracking-tighter whitespace-nowrap"
              >
                TRAVELOOP <span className="text-[#17C7D1]">X</span>
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-[#17C7D1] text-[#28545B] font-black shadow-[0_8px_16px_rgba(23,199,209,0.2)]" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-[#28545B]" : "group-hover:text-[#17C7D1]")} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold uppercase tracking-widest"
                  >
                    {link.name}
                  </motion.span>
                )}
                {isActive && !isCollapsed && (
                   <motion.div 
                    layoutId="admin-pill"
                    className="absolute left-[-16px] w-1.5 h-6 bg-white rounded-r-full" 
                   />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
           {!isCollapsed && (
             <div className="bg-black/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Instance Health</p>
                   <span className="w-2 h-2 rounded-full bg-[#17C7D1] animate-pulse" />
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full w-[88%] bg-[#17C7D1]" />
                </div>
             </div>
           )}
           <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 transition-colors group">
              <LogOut size={20} className="shrink-0" />
              {!isCollapsed && <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>}
           </button>
        </div>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-12 bg-[#28545B] border border-white/10 rounded-r-lg flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Operational Nav */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-20 sticky top-0">
          <div className="flex items-center gap-6 flex-1">
             <div className="relative max-w-md w-full group hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#17C7D1] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query global data models..." 
                  className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] placeholder:text-slate-300 focus:ring-2 focus:ring-[#17C7D1]/10 transition-all"
                />
             </div>
             <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                   <Activity size={10} /> Live Data Feed
                </span>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-[#28545B] transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-100 mx-2" />
            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#28545B]">Commander Root</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level 10 Admin</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#28545B] border-4 border-slate-50 overflow-hidden shadow-lg shadow-[#28545B]/10">
                <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] custom-scrollbar p-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
                {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
