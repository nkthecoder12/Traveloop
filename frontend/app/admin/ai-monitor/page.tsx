"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Cpu, 
  Sparkles, 
  Activity, 
  Zap, 
  Database, 
  Terminal, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  RefreshCw,
  Search
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
  ResponsiveContainer 
} from "recharts"

const latencyData = [
  { time: "10:00", p99: 124, p95: 98, p50: 45 },
  { time: "10:05", p99: 145, p95: 110, p50: 52 },
  { time: "10:10", p99: 132, p95: 102, p50: 48 },
  { time: "10:15", p99: 168, p95: 125, p50: 60 },
  { time: "10:20", p99: 115, p95: 90, p50: 42 },
  { time: "10:25", p99: 120, p95: 95, p50: 44 },
]

export default function AIMonitorPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#28545B] flex items-center justify-center text-[#17C7D1] shadow-xl shadow-[#28545B]/10">
               <Cpu size={32} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">AI Core Analytics</h1>
               <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17C7D1] animate-pulse" /> Cluster: TRAVELOOP-BRAIN-V4 • Status: Operational
               </p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <RefreshCw size={14} className="mr-2" /> Sync Nodes
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               System Reboot
            </Button>
         </div>
      </div>

      {/* Real-time Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Requests/sec", value: "842", icon: Zap, status: "Normal" },
           { label: "Success Rate", value: "99.98%", icon: CheckCircle2, status: "Optimal" },
           { label: "Avg Latency", value: "112ms", icon: Activity, status: "Low" },
           { label: "Cache Hit", value: "76.4%", icon: Database, status: "High" },
         ].map((item) => (
           <Card key={item.label} className="border-none shadow-sm rounded-3xl bg-white p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-2 rounded-xl bg-slate-50 text-[#17C7D1]">
                    <item.icon size={20} />
                 </div>
                 <span className="text-[9px] font-black text-[#2C7C91] bg-[#2C7C91]/10 px-2 py-1 rounded-full uppercase tracking-widest">{item.status}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-3xl font-black text-[#28545B] tracking-tight">{item.value}</p>
           </Card>
         ))}
      </div>

      {/* Latency Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-[#28545B]">Response Latency (P99)</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Real-time system response benchmarks</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#17C7D1]" />
                     <span className="text-[10px] font-bold text-slate-400">P99</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#2C7C91]" />
                     <span className="text-[10px] font-bold text-slate-400">P50</span>
                  </div>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={latencyData}>
                     <defs>
                        <linearGradient id="colorP99" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#17C7D1" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#17C7D1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                     />
                     <Area type="monotone" dataKey="p99" stroke="#17C7D1" strokeWidth={3} fillOpacity={1} fill="url(#colorP99)" />
                     <Area type="monotone" dataKey="p50" stroke="#2C7C91" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* AI Health Cluster */}
         <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#28545B] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Cpu size={120} />
            </div>
            <h3 className="text-xl font-black font-heading tracking-tight mb-8 relative z-10">Neural Hub Health</h3>
            <div className="space-y-8 relative z-10">
               {[
                 { label: "Token Processing", val: 94, color: "bg-[#17C7D1]" },
                 { label: "Inference Stability", val: 98, color: "bg-[#5FA9C1]" },
                 { label: "Context Window Efficiency", val: 82, color: "bg-[#2C7C91]" },
                 { label: "Response Filtering", val: 100, color: "bg-emerald-400" },
               ].map((m) => (
                 <div key={m.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                       <span>{m.label}</span>
                       <span className="text-white">{m.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.val}%` }}
                        className={cn("h-full", m.color)} 
                       />
                    </div>
                 </div>
               ))}
               <Button className="w-full h-12 rounded-xl bg-white/10 text-white font-black text-[10px] uppercase tracking-widest border border-white/5 hover:bg-white/20">
                  Full System Audit
               </Button>
            </div>
         </Card>
      </div>

      {/* Terminal Feed */}
      <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 overflow-hidden">
         <div className="p-6 bg-slate-800/50 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-3">
               <Terminal size={18} className="text-[#17C7D1]" />
               <h3 className="text-xs font-black text-white uppercase tracking-widest">Global AI Activity Log</h3>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Feed</span>
            </div>
         </div>
         <div className="p-8 space-y-4 h-[300px] overflow-y-auto font-mono text-[11px] custom-scrollbar">
            {[
              { t: "10:42:01", msg: "CLUSTER_EXPANSION: US-WEST-2 node active", type: "success" },
              { t: "10:41:55", msg: "GENERATE_REQUEST: User_8492 [Style: Luxury] [Dest: Kyoto]", type: "info" },
              { t: "10:41:42", msg: "LATENCY_SPIKE: Detect in Region ASIA-SOUTH [450ms]", type: "warning" },
              { t: "10:41:30", msg: "OPTIMIZER: Cache invalidation complete [34ms]", type: "info" },
              { t: "10:41:15", msg: "GENERATE_SUCCESS: Itinerary_ID_48202 generated in 1.4s", type: "success" },
              { t: "10:40:55", msg: "AI_BRAIN_V4: Context window optimized for current batch", type: "info" },
              { t: "10:40:42", msg: "SECURITY_SCAN: 0 vulnerabilities detected in prompt batch", type: "success" },
            ].map((log, i) => (
              <div key={i} className="flex gap-4">
                 <span className="text-slate-500 shrink-0">[{log.t}]</span>
                 <span className={cn(
                   log.type === "success" ? "text-emerald-400" :
                   log.type === "warning" ? "text-amber-400" :
                   "text-[#17C7D1]"
                 )}>{log.msg}</span>
              </div>
            ))}
            <div className="flex gap-4 animate-pulse">
               <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
               <span className="text-white">WAITING_FOR_SEQUENCE...</span>
            </div>
         </div>
      </Card>
    </div>
  )
}
