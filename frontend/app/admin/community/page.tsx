"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  Search, 
  MoreVertical, 
  Eye, 
  ShieldAlert,
  ThumbsUp,
  Share2,
  Trash2,
  Filter
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const moderationItems = [
  { id: "m1", user: "John D.", content: "This secret temple in Munnar is incredible! Check out my path.", type: "Public Trip", reports: 0, status: "Pending" },
  { id: "m2", user: "Sarah K.", content: "Spam content detected by AI safety filter.", type: "Comment", reports: 1, status: "Flagged" },
  { id: "m3", user: "Mark R.", content: "Unsafe location marked in restricted zone.", type: "Public Trip", reports: 5, status: "Critical" },
  { id: "m4", user: "Emma W.", content: "Beautiful photography trip itinerary.", type: "Public Trip", reports: 0, status: "Approved" },
  { id: "m5", user: "Admin Bot", content: "Platform policy update notification.", type: "System", reports: 0, status: "System" },
]

export default function AdminCommunityPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Community Intelligence</h1>
            <p className="text-slate-400 font-medium text-sm">Managing user-generated content, safety flags, and platform engagement.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <ShieldAlert size={14} className="mr-2" /> Global Policy
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Clear Safe Queue
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "New Items", value: "124", color: "text-[#17C7D1]" },
           { label: "Reported", value: "8", color: "text-red-400" },
           { label: "Approved Today", value: "842", color: "text-emerald-500" },
           { label: "AI Auto-Blocked", value: "15", color: "text-[#28545B]" },
         ].map((stat) => (
           <Card key={stat.label} className="border-none shadow-sm rounded-3xl bg-white p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={cn("text-2xl font-black", stat.color)}>{stat.value}</p>
           </Card>
         ))}
      </div>

      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 type="text" 
                 placeholder="Filter content or user handles..." 
                 className="w-full h-12 pl-12 pr-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] focus:ring-2 focus:ring-[#17C7D1]/10 transition-all"
               />
            </div>
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" className="rounded-xl text-slate-300"><Filter size={20} /></Button>
               <div className="h-6 w-[1px] bg-slate-100 mx-2" />
               <Button variant="ghost" size="icon" className="rounded-xl text-slate-300"><MoreVertical size={20} /></Button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">User & Content</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reports</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Decision</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {moderationItems.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-start gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 mt-1">
                                <img src={`https://i.pravatar.cc/100?u=${item.id}`} alt={item.user} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#28545B]">{item.user}</p>
                                <p className="text-[11px] font-bold text-slate-400 max-w-sm line-clamp-2">{item.content}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                       </td>
                       <td className="px-8 py-6">
                          <div className={cn(
                            "flex items-center gap-1 text-xs font-black",
                            item.reports > 0 ? "text-red-500" : "text-slate-300"
                          )}>
                             <Flag size={14} /> {item.reports}
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            item.status === "Critical" ? "bg-red-50 border-red-100 text-red-600" :
                            item.status === "Flagged" ? "bg-amber-50 border-amber-100 text-amber-600" :
                            item.status === "Approved" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                            "bg-slate-100 border-slate-200 text-slate-500"
                          )}>
                             {item.status}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-emerald-500"><CheckCircle2 size={16} /></Button>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-red-500"><XCircle size={16} /></Button>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-[#28545B]"><MoreVertical size={16} /></Button>
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
