"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  CreditCard, 
  Target, 
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Zap
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
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

const revenueData = [
  { month: "Jan", revenue: 145000 },
  { month: "Feb", revenue: 182000 },
  { month: "Mar", revenue: 210000 },
  { month: "Apr", revenue: 284000 },
  { month: "May", revenue: 312000 },
  { month: "Jun", revenue: 395000 },
]

export default function AdminRevenuePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Financial Ledger</h1>
            <p className="text-slate-400 font-medium text-sm">Revenue streams, subscription health, and fiscal projections.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <Download size={14} className="mr-2" /> Fiscal Report
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Manage Gateways
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Total Revenue", value: "₹2.4M", growth: "+18%", icon: DollarSign, color: "text-[#17C7D1]" },
           { label: "Active Subs", value: "1,482", growth: "+12%", icon: Zap, color: "text-[#2C7C91]" },
           { label: "Avg Transaction", value: "₹450", growth: "+5%", icon: CreditCard, color: "text-[#5FA9C1]" },
           { label: "MRR Growth", value: "₹185k", growth: "+24%", icon: TrendingUp, color: "text-[#28545B]" },
         ].map((item) => (
           <Card key={item.label} className="border-none shadow-sm rounded-3xl bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
                    <item.icon size={20} />
                 </div>
                 <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={10} /> {item.growth}
                 </span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-2xl font-black text-[#28545B]">{item.value}</p>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-[#28545B]">Revenue Trajectory</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Platform growth over last 6 months</p>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-[10px] font-black text-[#28545B] uppercase tracking-widest border border-slate-100">
                  <Calendar size={14} className="text-slate-400" /> Jan 2024 - Jun 2024
               </div>
            </div>
            <div className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#17C7D1" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#17C7D1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} tickFormatter={(val) => `₹${val/1000}k`} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#17C7D1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#28545B] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#17C7D1]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
               <h3 className="text-lg font-black font-heading tracking-tight mb-8 relative z-10">Target Milestone</h3>
               <div className="space-y-10 relative z-10">
                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Fiscal Year Goal</p>
                           <p className="text-3xl font-black text-[#17C7D1]">₹5.0M</p>
                        </div>
                        <p className="text-xs font-bold text-white/60">48% Reached</p>
                     </div>
                     <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "48%" }} className="h-full bg-[#17C7D1]" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1">Q2 Direct</p>
                        <p className="text-lg font-black">₹1.2M</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1">Retention</p>
                        <p className="text-lg font-black text-[#17C7D1]">92%</p>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
               <h3 className="text-lg font-black text-[#28545B] mb-8">Revenue Mix</h3>
               <div className="space-y-6">
                  {[
                    { label: "Premium Subs", val: "₹1.8M", perc: 75, color: "bg-[#17C7D1]" },
                    { label: "Partnerships", val: "₹450k", perc: 18, color: "bg-[#2C7C91]" },
                    { label: "Data API", val: "₹150k", perc: 7, color: "bg-[#28545B]" },
                  ].map(item => (
                    <div key={item.label} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-[#28545B]">{item.val}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${item.perc}%` }} className={cn("h-full", item.color)} />
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
