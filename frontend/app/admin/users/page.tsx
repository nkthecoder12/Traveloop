"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  UserCheck
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const usersData = [
  { id: "u1", name: "Alex Johnson", email: "alex.j@gmail.com", trips: 12, status: "Active", lastLogin: "2m ago", plan: "Premium" },
  { id: "u2", name: "Sarah Williams", email: "sarah.w@outlook.com", trips: 5, status: "Active", lastLogin: "1h ago", plan: "Free" },
  { id: "u3", name: "Michael Chen", email: "m.chen@tech.io", trips: 28, status: "Suspended", lastLogin: "2d ago", plan: "Premium" },
  { id: "u4", name: "Emma Davis", email: "emma.d@travel.com", trips: 3, status: "Active", lastLogin: "15m ago", plan: "Free" },
  { id: "u5", name: "James Wilson", email: "j.wilson@me.com", trips: 15, status: "Active", lastLogin: "4h ago", plan: "Premium" },
  { id: "u6", name: "Priya Sharma", email: "priya.s@india.in", trips: 42, status: "Active", lastLogin: "5m ago", plan: "Premium" },
  { id: "u7", name: "Robert Brown", email: "rob.b@web.com", trips: 1, status: "Inactive", lastLogin: "1mo ago", plan: "Free" },
]

export default function UserManagementPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter">User Directory</h1>
            <p className="text-slate-400 font-medium text-sm">Managing 154,230 active traveler profiles across 12 regions.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <Filter size={14} className="mr-2" /> Advanced Filter
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Provision New User
            </Button>
         </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Growth Rate", value: "+2.4%", color: "text-[#17C7D1]" },
           { label: "Active Now", value: "1,245", color: "text-[#2C7C91]" },
           { label: "Retention", value: "84.2%", color: "text-[#5FA9C1]" },
           { label: "Premium Mix", value: "12.8%", color: "text-[#28545B]" },
         ].map((stat) => (
           <Card key={stat.label} className="border-none shadow-sm rounded-3xl bg-white p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={cn("text-2xl font-black", stat.color)}>{stat.value}</p>
           </Card>
         ))}
      </div>

      {/* User Table Card */}
      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
               <input 
                 type="text" 
                 placeholder="Filter by name, email, or system ID..." 
                 className="w-full h-12 pl-12 pr-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] placeholder:text-slate-300 focus:ring-2 focus:ring-[#17C7D1]/10 transition-all"
               />
            </div>
            <div className="flex items-center gap-4">
               <span className="text-xs font-bold text-slate-400">Sort by: <span className="text-[#28545B] font-black">Last Activity</span></span>
               <div className="h-6 w-[1px] bg-slate-100 mx-2" />
               <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical size={20} className="text-slate-300" /></Button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Traveler</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trips</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tier</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Activity</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {usersData.map((user) => (
                    <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                <img src={`https://i.pravatar.cc/100?u=${user.id}`} alt={user.name} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#28545B] group-hover:text-[#17C7D1] transition-colors">{user.name}</p>
                                <p className="text-[11px] font-bold text-slate-400">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <MapPin size={14} className="text-slate-300" />
                             <span className="text-sm font-black text-[#28545B]">{user.trips}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            user.plan === "Premium" 
                              ? "bg-amber-50 border-amber-100 text-amber-600" 
                              : "bg-slate-100 border-slate-200 text-slate-500"
                          )}>
                             {user.plan}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={cn(
                               "w-2 h-2 rounded-full",
                               user.status === "Active" ? "bg-emerald-500" : 
                               user.status === "Suspended" ? "bg-red-500" : "bg-slate-300"
                             )} />
                             <span className="text-xs font-bold text-[#28545B]">{user.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm font-bold text-slate-400">
                          {user.lastLogin}
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm text-slate-300 hover:text-[#17C7D1]">
                                <Mail size={16} />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm text-slate-300 hover:text-red-500">
                                <ShieldAlert size={16} />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm text-slate-300 hover:text-[#28545B]">
                                <ArrowUpRight size={16} />
                             </Button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="p-8 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
            <p className="text-xs font-bold text-slate-400">Showing <span className="text-[#28545B]">1-7</span> of 154,230 travelers</p>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 text-slate-400" disabled>
                  <ChevronLeft size={18} />
               </Button>
               {[1, 2, 3, "...", 124].map((p, i) => (
                 <Button 
                   key={i} 
                   variant={p === 1 ? "default" : "ghost"}
                   className={cn(
                     "h-10 w-10 rounded-xl text-xs font-black",
                     p === 1 ? "bg-[#28545B] text-white" : "text-slate-400"
                   )}
                 >
                    {p}
                 </Button>
               ))}
               <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 text-slate-400">
                  <ChevronRight size={18} />
               </Button>
            </div>
         </div>
      </Card>
    </div>
  )
}
