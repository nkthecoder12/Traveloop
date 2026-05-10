"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Search, 
  Users, 
  Map as MapIcon, 
  Activity, 
  BarChart3,
  TrendingUp,
  ShieldCheck
} from "lucide-react"
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
  Cell,
  LineChart,
  Line
} from "recharts"
import { cn } from "@/lib/utils"

const barData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 600 },
  { name: "Thu", value: 800 },
  { name: "Fri", value: 500 },
]

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
]

const lineData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 250 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 320 },
  { name: "May", value: 290 },
]

const COLORS = ["#17C7D1", "#28545B", "#FFC700", "#FF8A00"]

export default function AdminPanelPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
             <ShieldCheck className="text-accent" /> Admin Panel
          </h1>
          <p className="text-sky/80">Manage the ecosystem and monitor platform analytics.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="border-border rounded-xl">Generate Report</Button>
           <Button className="shadow-lg rounded-xl">Refresh Data</Button>
        </div>
      </div>

      {/* Search Bar (Screen 12) */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-2">
          <Search className="w-5 h-5 text-sky/60" />
          <input 
            type="text" 
            placeholder="Search users, cities, activities..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
        </div>
      </div>

      {/* Tabs (Screen 12) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {[
           { label: "Manage Users", icon: Users },
           { label: "Popular Cities", icon: MapIcon },
           { label: "Popular Activities", icon: Activity }
         ].map((tab) => (
           <Button key={tab.label} variant="outline" className="h-14 bg-white border-border hover:border-accent hover:text-accent rounded-2xl font-bold flex items-center gap-3 shadow-sm transition-all">
              <tab.icon size={20} /> {tab.label}
           </Button>
         ))}
      </div>

      {/* Dashboard Analytics (Screen 12) */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-border">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
               {/* Summary Bars */}
               <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-center px-1">
                          <span className="w-1/2 h-4 bg-muted rounded-full overflow-hidden relative">
                             <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} className="h-full bg-sky/20" />
                          </span>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-4 h-4 rounded-full bg-sky/20" />
                          <div className="w-4 h-4 rounded-full bg-sky/20" />
                       </div>
                    </div>
                  ))}
               </div>

               {/* Line Chart */}
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                        <YAxis hide />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                        <Line type="monotone" dataKey="value" stroke="#FFC700" strokeWidth={4} dot={{fill: '#FFC700', strokeWidth: 2, r: 6}} activeDot={{r: 8}} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="space-y-12">
               {/* Pie Chart */}
               <div className="h-64 flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>

               {/* Bar Chart */}
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={barData}>
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                           {barData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#FF8A00" : "#FFC700"} />
                           ))}
                        </Bar>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
         
         <div className="mt-12 pt-12 border-t border-border flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-sm">
               <div className="h-4 bg-muted w-full rounded-full" />
               <div className="h-4 bg-muted w-5/6 rounded-full" />
               <div className="h-4 bg-muted w-4/6 rounded-full" />
            </div>
            <div className="flex items-end">
               <Button className="h-12 px-10 bg-primary text-white border-none font-bold rounded-xl shadow-xl">
                  Analyze Data
               </Button>
            </div>
         </div>
      </div>
    </div>
  )
}
