"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { 
  Plus, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  Plane,
  MoreVertical,
  Clock,
  Navigation,
  Sparkles,
  Search,
  Bell,
  Settings,
  User
} from "lucide-react"
import Link from "next/link"
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const analyticsData = [
  { name: "Jan", spent: 400 },
  { name: "Feb", spent: 300 },
  { name: "Mar", spent: 600 },
  { name: "Apr", spent: 800 },
  { name: "May", spent: 500 },
  { name: "Jun", spent: 900 },
]

const upcomingTrips = [
  { 
    id: 1, 
    title: "Summer in Munnar", 
    date: "July 12 - 20, 2024", 
    budget: "₹24,000", 
    progress: 80, 
    image: "/images/kerala.png" 
  },
  { 
    id: 2, 
    title: "Leh Ladakh Expedition", 
    date: "Oct 5 - 15, 2024", 
    budget: "₹58,000", 
    progress: 35, 
    image: "/images/ladakh.png" 
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
        <div>
          <h1 className="text-4xl font-black font-heading text-primary tracking-tight">Traveler's Control Center</h1>
          <p className="text-sky/60 font-medium">Welcome back, Alex! Your next journey starts in 12 days.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky/40" />
            <input 
              type="text" 
              placeholder="Search your world..." 
              className="h-12 w-64 pl-12 pr-4 rounded-xl bg-white border-none shadow-sm text-sm font-medium focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white border-none shadow-sm relative">
            <Bell size={20} className="text-primary" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-white" />
          </Button>
          <Link href="/dashboard/trips/create">
            <Button className="h-12 px-6 rounded-xl bg-primary text-white shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2">
              <Plus size={18} />
              <span className="font-bold">New Adventure</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-auto lg:h-[700px]">
        
        {/* Next Big Trip - Hero (Double Width, Double Height) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 lg:row-span-2 relative rounded-[2.5rem] overflow-hidden shadow-2xl group"
        >
          <img src="/images/ladakh.png" alt="Featured Trip" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
          <div className="absolute top-8 left-8">
            <span className="px-4 py-1 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-[10px] font-black uppercase tracking-[0.2em]">Next Journey</span>
          </div>
          <div className="absolute bottom-10 left-10 right-10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-5xl font-black font-heading text-white tracking-tighter leading-none">Leh Ladakh Expedition</h2>
              <div className="flex items-center gap-6 text-white/80 font-bold text-sm">
                 <span className="flex items-center gap-2"><Calendar size={16} className="text-accent" /> Oct 5 - 15</span>
                 <span className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> Leh, Ladakh</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/trips/2">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 h-12 font-black text-sm transition-all hover:scale-105">
                  Resume Planning
                </Button>
              </Link>
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-sky/20 flex items-center justify-center overflow-hidden">
                      <User size={16} className="text-sky/60" />
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-primary bg-accent flex items-center justify-center text-primary font-black text-[10px]">
                    +2
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Column */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-[2rem] bg-white p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full -mr-12 -mt-12 blur-2xl" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                <Plane size={24} />
              </div>
              <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-1 rounded-full">+2 Trips</span>
            </div>
            <h3 className="text-3xl font-black text-primary mb-1">12</h3>
            <p className="text-xs font-bold text-sky/60 uppercase tracking-widest">Total Countries</p>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-white p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -mr-12 -mt-12 blur-2xl" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                <DollarSign size={24} />
              </div>
              <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-1 rounded-full">Save ₹12k</span>
            </div>
            <h3 className="text-3xl font-black text-primary mb-1">₹84.5k</h3>
            <p className="text-xs font-bold text-sky/60 uppercase tracking-widest">Total Spent</p>
          </Card>
        </div>

        {/* AI Insight Card */}
        <Card className="border-none shadow-sm rounded-[2rem] bg-primary text-white p-8 flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-110 transition-transform" />
           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-accent">
                 <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold font-heading">AI Smart Insight</h3>
              <p className="text-white/60 text-sm leading-relaxed">Flight prices to Tokyo are dropping! Consider booking your autumn trip now to save up to ₹15,000.</p>
           </div>
           <Link href="/dashboard/ai-planner">
             <Button variant="link" className="text-accent p-0 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                Explore Deals <ArrowUpRight size={16} />
             </Button>
           </Link>
        </Card>

        {/* Analytics Card (Full Width in row 2 of column 3&4) */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
           <div className="flex items-center justify-between mb-6">
              <div>
                 <h3 className="text-xl font-black text-primary">Financial Trends</h3>
                 <p className="text-[10px] font-bold text-sky/40 uppercase tracking-[0.2em]">Monthly Spending Insights</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical size={20} /></Button>
           </div>
           <div className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={analyticsData}>
                 <defs>
                   <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#17C7D1" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#17C7D1" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0, 0, 0.1)' }}
                 />
                 <Area type="monotone" dataKey="spent" stroke="#17C7D1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </Card>

      </div>

      {/* Bottom Section: Recent Notes & Archived Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-heading text-primary">Archived Explorations</h2>
              <Link href="/dashboard/trips">
                 <Button variant="ghost" className="text-accent font-bold text-sm">View History</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {upcomingTrips.slice(0, 2).map((trip) => (
                 <motion.div key={trip.id} whileHover={{ y: -5 }}>
                    <Card className="border-none shadow-sm overflow-hidden flex items-center gap-6 p-4 rounded-[1.5rem] bg-white group">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                          <img src={trip.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                       </div>
                       <div className="flex-1 space-y-1">
                          <h4 className="font-bold text-primary">{trip.title}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-sky/60 uppercase tracking-widest">
                             <span className="flex items-center gap-1"><MapPin size={10} className="text-accent" /> 2 Cities</span>
                             <span className="flex items-center gap-1"><Clock size={10} className="text-accent" /> 8 Days</span>
                          </div>
                       </div>
                       <Link href={`/dashboard/trips/${trip.id}`}>
                         <Button size="icon" variant="ghost" className="rounded-xl text-sky/20 group-hover:text-accent"><ArrowUpRight size={20} /></Button>
                       </Link>
                    </Card>
                 </motion.div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-heading text-primary">Travel Notes</h2>
              <Link href="/dashboard/notes">
                 <Button variant="ghost" className="text-accent font-bold text-sm">All Notes</Button>
              </Link>
            </div>
            <Card className="border-none shadow-sm rounded-[2rem] bg-white p-6 space-y-4">
               {[
                 { title: "Kyoto Hidden Temples", color: "bg-accent" },
                 { title: "Street Food in Bangkok", color: "bg-secondary" },
                 { title: "Iceland Roadtrip Gear", color: "bg-primary" },
               ].map((note) => (
                 <div key={note.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className={cn("w-2 h-2 rounded-full", note.color)} />
                    <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{note.title}</span>
                 </div>
               ))}
            </Card>
         </div>
      </div>
    </div>
  )
}
