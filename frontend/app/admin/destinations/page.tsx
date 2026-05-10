"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Globe, 
  TrendingUp, 
  Search, 
  MapPin, 
  ArrowUpRight, 
  Users, 
  BarChart3,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const trendingCities = [
  { name: "Munnar", growth: "+145%", trips: 1240 },
  { name: "Kyoto", growth: "+112%", trips: 980 },
  { name: "Reykjavik", growth: "+89%", trips: 850 },
  { name: "Bali", growth: "+76%", trips: 1100 },
  { name: "Santorini", growth: "+64%", trips: 720 },
]

const seasonalData = [
  { month: "Jan", searches: 4000 },
  { month: "Feb", searches: 3000 },
  { month: "Mar", searches: 6000 },
  { month: "Apr", searches: 8000 },
  { month: "May", searches: 5000 },
  { month: "Jun", searches: 9000 },
]

export default function AdminDestinationsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Global Hub Analytics</h1>
            <p className="text-slate-400 font-medium text-sm">Real-time destination demand, search trends, and seasonal activity.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <Layers size={14} className="mr-2" /> Territory Heatmap
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Update AI Weights
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Trending Cities Table */}
         <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-lg font-black text-[#28545B]">Growth Leaders</h3>
               <div className="relative w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="text" placeholder="Quick search hub..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border-none text-xs font-bold text-[#28545B]" />
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-slate-50/50">
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Destination Hub</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Search Growth</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Total Trips</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {trendingCities.map((city, i) => (
                       <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#2C7C91]">
                                   <MapPin size={18} />
                                </div>
                                <span className="text-sm font-black text-[#28545B]">{city.name}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{city.growth}</span>
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-[#28545B]">{city.trips.toLocaleString()}</td>
                          <td className="px-8 py-5 text-right">
                             <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 hover:text-[#17C7D1]"><ArrowUpRight size={16} /></Button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* Seasonal Chart */}
         <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
               <h3 className="text-lg font-black text-[#28545B] mb-8">Search Velocity</h3>
               <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={seasonalData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: '#94A3B8' }} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                        <Bar dataKey="searches" fill="#2C7C91" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-6 p-4 rounded-2xl bg-[#28545B] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <TrendingUp className="text-[#17C7D1]" size={20} />
                     <div>
                        <p className="text-[10px] font-black uppercase text-white/40">Peak Trend</p>
                        <p className="text-sm font-bold">June Monsoon</p>
                     </div>
                  </div>
                  <Sparkles size={20} className="text-[#17C7D1]/50" />
               </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
               <h3 className="text-lg font-black text-[#28545B] mb-6">User Intent Mix</h3>
               <div className="space-y-4">
                  {[
                    { label: "Adventure", val: 45, color: "bg-[#17C7D1]" },
                    { label: "Relaxation", val: 30, color: "bg-[#2C7C91]" },
                    { label: "Culture", val: 15, color: "bg-[#28545B]" },
                    { label: "Luxury", val: 10, color: "bg-[#5FA9C1]" },
                  ].map(m => (
                    <div key={m.label} className="space-y-1.5">
                       <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                          <span>{m.label}</span>
                          <span className="text-[#28545B]">{m.val}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${m.val}%` }} className={cn("h-full", m.color)} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
