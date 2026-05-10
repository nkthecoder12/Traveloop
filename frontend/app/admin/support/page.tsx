"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  Search, 
  User, 
  Mail,
  Filter,
  ChevronRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const tickets = [
  { id: "tk-8492", user: "John Doe", subject: "Unable to generate AI itinerary", priority: "High", status: "Open", time: "12m ago" },
  { id: "tk-8491", user: "Sarah Smith", subject: "Refund request for premium plan", priority: "Critical", status: "Pending", time: "45m ago" },
  { id: "tk-8490", user: "Mark Evans", subject: "Bug report: Mobile view timeline", priority: "Medium", status: "Resolved", time: "2h ago" },
  { id: "tk-8489", user: "Emma Watson", subject: "How to share public trips?", priority: "Low", status: "Resolved", time: "5h ago" },
  { id: "tk-8488", user: "Admin", subject: "Platform maintenance notification", priority: "Medium", status: "System", time: "1d ago" },
]

export default function AdminSupportPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Support Nexus</h1>
            <p className="text-slate-400 font-medium text-sm">Managing user assistance requests, bug reports, and premium support tickets.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <ShieldCheck size={14} className="mr-2" /> Support SLA
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Dispatch Response
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Active Tickets", value: "24", color: "text-[#17C7D1]" },
           { label: "Critical Priority", value: "3", color: "text-red-500" },
           { label: "Avg Response", value: "14m", color: "text-[#2C7C91]" },
           { label: "Resolved Today", value: "112", color: "text-emerald-500" },
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
                 placeholder="Search tickets, users, or keywords..." 
                 className="w-full h-12 pl-12 pr-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] focus:ring-2 focus:ring-[#17C7D1]/10 transition-all"
               />
            </div>
            <div className="flex items-center gap-3">
               <span className="text-xs font-bold text-slate-400">Filter Status:</span>
               <div className="flex bg-slate-50 p-1 rounded-xl">
                  {["Open", "Pending", "Closed"].map(t => (
                    <button key={t} className={cn(
                      "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                      t === "Open" ? "bg-white text-[#28545B] shadow-sm" : "text-slate-400 hover:text-[#28545B]"
                    )}>{t}</button>
                  ))}
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject & Ticket ID</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Requester</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Update</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="group hover:bg-slate-50/30 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-start gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#28545B] shrink-0 mt-1">
                                <MessageCircle size={20} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#28545B] group-hover:text-[#17C7D1] transition-colors">{ticket.subject}</p>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{ticket.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <User size={14} className="text-slate-300" />
                             <span className="text-xs font-bold text-[#28545B]">{ticket.user}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                            ticket.priority === "Critical" ? "bg-red-50 border-red-100 text-red-600" :
                            ticket.priority === "High" ? "bg-amber-50 border-amber-100 text-amber-600" :
                            "bg-slate-100 border-slate-200 text-slate-500"
                          )}>
                             {ticket.priority}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={cn(
                               "w-2 h-2 rounded-full",
                               ticket.status === "Open" ? "bg-red-500" :
                               ticket.status === "Pending" ? "bg-amber-500" : "bg-emerald-500"
                             )} />
                             <span className="text-xs font-bold text-[#28545B]">{ticket.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm font-bold text-slate-400 italic">
                          {ticket.time}
                       </td>
                       <td className="px-8 py-6">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white text-slate-300 hover:text-[#17C7D1] transition-all">
                             <ChevronRight size={20} />
                          </Button>
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
