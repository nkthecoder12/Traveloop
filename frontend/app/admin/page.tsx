"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Map, 
  Activity, 
  Wallet, 
  Share2, 
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
  Calendar,
  Globe,
  Monitor
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
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const userGrowthData = [
  { month: "Jan", users: 4000, active: 2400 },
  { month: "Feb", users: 5000, active: 3100 },
  { month: "Mar", users: 7500, active: 4800 },
  { month: "Apr", users: 9200, active: 6200 },
  { month: "May", users: 12000, active: 8500 },
  { month: "Jun", users: 15400, active: 11200 },
]

const destinationData = [
  { name: "Kerala", trips: 4500 },
  { name: "Ladakh", trips: 3200 },
  { name: "Jaipur", trips: 2800 },
  { name: "Munnar", trips: 2400 },
  { name: "Goa", trips: 2100 },
]

const budgetDistData = [
  { name: "Budget", value: 400, color: "#17C7D1" },
  { name: "Luxury", value: 300, color: "#28545B" },
  { name: "Family", value: 300, color: "#2C7C91" },
  { name: "Solo", value: 200, color: "#5FA9C1" },
]

const MetricCard = ({ title, value, growth, icon: Icon, color }: any) => (
  <Card className="border-none shadow-sm rounded-[2rem] bg-white p-6 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 blur-3xl opacity-10 ${color}`} />
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
         <ArrowUpRight size={10} /> {growth}%
      </div>
    </div>
    <div className="space-y-1">
       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
       <p className="text-3xl font-black text-[#28545B] tracking-tight">{value}</p>
    </div>
    <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
       <motion.div 
         initial={{ width: 0 }}
         animate={{ width: "70%" }}
         className={`h-full ${color.replace('bg-', 'bg-')}`} 
       />
    </div>
  </Card>
)

export default function AdminOverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter">System Overview</h1>
            <p className="text-slate-400 font-medium text-sm">Cluster Status: Healthy • Regional Node: South-East</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <Calendar size={14} className="mr-2" /> Global Timeline
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Export Global Report
            </Button>
         </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
         <MetricCard title="Total Users" value="154.2k" growth="+12.4" icon={Users} color="bg-[#17C7D1]" />
         <MetricCard title="Total Trips" value="48.5k" growth="+18.2" icon={Map} color="bg-[#2C7C91]" />
         <MetricCard title="Active Travelers" value="12.4k" growth="+5.7" icon={Activity} color="bg-[#5FA9C1]" />
         <MetricCard title="Revenue (EST)" value="₹2.4M" growth="+22.1" icon={Wallet} color="bg-[#28545B]" />
         <MetricCard title="Public Shares" value="8.9k" growth="+9.4" icon={Share2} color="bg-[#17C7D1]" />
         <MetricCard title="AI Generations" value="112.5k" growth="+34.2" icon={Sparkles} color="bg-[#2C7C91]" />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* User Growth Chart */}
         <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-[#28545B]">Growth Vectors</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Monthly Expansion Metrics</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#17C7D1]" />
                     <span className="text-[10px] font-bold text-slate-400">Total Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#28545B]" />
                     <span className="text-[10px] font-bold text-slate-400">Active Sessions</span>
                  </div>
               </div>
            </div>
            <div className="h-[350px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                     <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#17C7D1" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#17C7D1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#28545B" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#28545B" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: '800' }}
                     />
                     <Area type="monotone" dataKey="users" stroke="#17C7D1" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                     <Area type="monotone" dataKey="active" stroke="#28545B" strokeWidth={4} fillOpacity={1} fill="url(#colorActive)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Distribution & Heatmap Sidebar */}
         <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
               <h3 className="text-lg font-black text-[#28545B] mb-8">Budget Segments</h3>
               <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={budgetDistData}
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {budgetDistData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global</p>
                     <p className="text-2xl font-black text-[#28545B]">Mix</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 mt-6">
                  {budgetDistData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.name}</span>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#28545B] p-8 text-white">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black font-heading tracking-tight">AI Cluster Health</h3>
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#17C7D1]">
                     <Sparkles size={16} />
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                        <span>Generation Success</span>
                        <span className="text-[#17C7D1]">99.2%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[99%] bg-[#17C7D1]" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                        <span>Cluster Latency</span>
                        <span className="text-[#5FA9C1]">124ms</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[15%] bg-[#5FA9C1]" />
                     </div>
                  </div>
                  <Button className="w-full h-11 rounded-xl bg-white/10 text-[#17C7D1] font-black text-[10px] uppercase tracking-widest border border-white/5 hover:bg-white/20">
                     Diagnostic Console
                  </Button>
               </div>
            </Card>
         </div>
      </div>

      {/* Trending Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
         <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white p-8">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-[#28545B]">Global Trending Hubs</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Highest Growth Destinations</p>
               </div>
               <Button variant="ghost" className="rounded-xl"><MoreVertical size={20} className="text-slate-300" /></Button>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={destinationData} layout="vertical">
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#28545B' }} width={80} />
                     <Tooltip 
                        cursor={{ fill: '#F8FAFC' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                     />
                     <Bar dataKey="trips" fill="#17C7D1" radius={[0, 10, 10, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
            <h3 className="text-lg font-black text-[#28545B] mb-8">System Activity Log</h3>
            <div className="space-y-6">
               {[
                 { user: "Sarah K.", action: "Generated AI Itinerary", time: "2m ago", icon: Sparkles, color: "text-[#17C7D1]" },
                 { user: "System", action: "Node Expansion: US-East", time: "15m ago", icon: Globe, color: "text-[#2C7C91]" },
                 { user: "Mark R.", action: "Flagged Public Trip", time: "24m ago", icon: Activity, color: "text-red-400" },
                 { user: "Admin", action: "Config Updated: API-v4", time: "1h ago", icon: Monitor, color: "text-[#28545B]" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon size={18} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-[#28545B]">{item.user}</p>
                          <p className="text-[10px] font-bold text-slate-400">{item.action}</p>
                       </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{item.time}</span>
                 </div>
               ))}
            </div>
            <Button variant="link" className="w-full mt-8 text-[#17C7D1] font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform">
               View Full Kernel Logs <ArrowUpRight size={14} className="ml-1" />
            </Button>
         </Card>
      </div>
    </div>
  )
}
