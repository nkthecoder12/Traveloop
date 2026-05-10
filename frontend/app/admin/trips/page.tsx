"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Map, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Flag, 
  Star, 
  Archive,
  Calendar,
  Navigation,
  Globe,
  TrendingUp
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const tripsData = [
  { id: "t1", title: "Summer in Munnar", creator: "Alex J.", destinations: 3, budget: "₹24k", status: "Public", date: "Jul 12", engagement: "High" },
  { id: "t2", title: "Leh Ladakh Expedition", creator: "Sarah W.", destinations: 5, budget: "₹58k", status: "Featured", date: "Oct 5", engagement: "Very High" },
  { id: "t3", title: "Goa Weekend Chill", creator: "Emma D.", destinations: 1, budget: "₹12k", status: "Private", date: "Sep 20", engagement: "Low" },
  { id: "t4", title: "Rajasthan Royal Tour", creator: "Priya S.", destinations: 6, budget: "₹85k", status: "Public", date: "Nov 15", engagement: "Medium" },
  { id: "t5", title: "Himalayan Trek", creator: "Mark R.", destinations: 4, budget: "₹15k", status: "Public", date: "Oct 12", engagement: "High" },
]

export default function AdminTripsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Trips Logic Center</h1>
            <p className="text-slate-400 font-medium text-sm">Monitoring 48,520 active itineraries and platform engagement.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <Archive size={14} className="mr-2" /> Archived Trips
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Global Content Audit
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Public Trips", value: "8,942", icon: Globe, color: "text-[#17C7D1]" },
           { label: "Private Drafts", value: "39,578", icon: LockIcon, color: "text-[#2C7C91]" },
           { label: "Featured Plans", value: "124", icon: Star, color: "text-amber-400" },
           { label: "Flagged Content", value: "12", icon: Flag, color: "text-red-400" },
         ].map((stat) => (
           <Card key={stat.label} className="border-none shadow-sm rounded-3xl bg-white p-6">
              <div className="flex items-center justify-between mb-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <stat.icon size={16} className={stat.color} />
              </div>
              <p className={cn("text-2xl font-black text-[#28545B]")}>{stat.value}</p>
           </Card>
         ))}
      </div>

      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 type="text" 
                 placeholder="Search itineraries by title or ID..." 
                 className="w-full h-12 pl-12 pr-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] focus:ring-2 focus:ring-[#17C7D1]/10 transition-all"
               />
            </div>
            <div className="flex items-center gap-3">
               <span className="text-xs font-bold text-slate-400">View:</span>
               <div className="flex bg-slate-50 p-1 rounded-xl">
                  {["All", "Public", "Featured"].map(t => (
                    <button key={t} className={cn(
                      "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                      t === "All" ? "bg-white text-[#28545B] shadow-sm" : "text-slate-400 hover:text-[#28545B]"
                    )}>{t}</button>
                  ))}
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Itinerary Details</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Creator</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Budget</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visibility</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Engagement</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operations</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {tripsData.map((trip) => (
                    <tr key={trip.id} className="group hover:bg-slate-50/30 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#2C7C91] shrink-0 border border-slate-200 group-hover:bg-[#17C7D1]/10 group-hover:border-[#17C7D1]/20 transition-all">
                                <Navigation size={20} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#28545B] group-hover:text-[#17C7D1] transition-colors">{trip.title}</p>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                   <span className="flex items-center gap-1"><Map size={10} /> {trip.destinations} Stops</span>
                                   <span className="flex items-center gap-1"><Calendar size={10} /> {trip.date}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm font-bold text-[#28545B]">{trip.creator}</td>
                       <td className="px-8 py-6 text-sm font-black text-[#28545B]">{trip.budget}</td>
                       <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            trip.status === "Featured" ? "bg-amber-50 border-amber-100 text-amber-600" :
                            trip.status === "Public" ? "bg-[#17C7D1]/10 border-[#17C7D1]/20 text-[#17C7D1]" :
                            "bg-slate-100 border-slate-200 text-slate-500"
                          )}>
                             {trip.status}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <TrendingUp size={14} className={cn(
                               trip.engagement.includes("High") ? "text-emerald-500" : "text-slate-300"
                             )} />
                             <span className="text-xs font-bold text-[#28545B]">{trip.engagement}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-[#28545B]"><Eye size={16} /></Button>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-amber-500"><Star size={16} /></Button>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-red-500"><Flag size={16} /></Button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  )
}

const LockIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
