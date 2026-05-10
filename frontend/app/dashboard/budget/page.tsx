"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  DollarSign, 
  TrendingUp, 
  PieChart as PieIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Filter,
  Download,
  CheckCircle2
} from "lucide-react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts"
import { cn } from "@/lib/utils"

const categoryData = [
  { name: "Accommodation", value: 1200, color: "#28545B" },
  { name: "Transport", value: 800, color: "#17C7D1" },
  { name: "Food", value: 600, color: "#2C7C91" },
  { name: "Activities", value: 450, color: "#5FA9C1" },
]

const dailySpending = [
  { day: "Day 1", actual: 240, budget: 200 },
  { day: "Day 2", actual: 180, budget: 200 },
  { day: "Day 3", actual: 310, budget: 200 },
  { day: "Day 4", actual: 150, budget: 200 },
  { day: "Day 5", actual: 220, budget: 200 },
  { day: "Day 6", actual: 190, budget: 200 },
  { day: "Day 7", actual: 260, budget: 200 },
]

export default function BudgetAnalyticsPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold font-heading text-primary mb-2">Budget Analytics</h1>
           <p className="text-sky/80">Monitor your spending and stay on track with your travel goals.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="border-border">
              <Download className="w-4 h-4 mr-2" /> Export Report
           </Button>
           <Button className="shadow-lg">
              <Plus className="w-4 h-4 mr-2" /> Add Expense
           </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-primary text-white">
           <CardContent className="p-8">
              <div className="flex justify-between items-start mb-4">
                 <div className="bg-white/10 p-2 rounded-xl">
                    <DollarSign size={20} className="text-accent" />
                 </div>
                 <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    <TrendingUp size={12} /> On Track
                 </div>
              </div>
              <h3 className="text-3xl font-bold font-heading mb-1">₹3,05,000</h3>
              <p className="text-sky/60 text-sm">Total Spent (of ₹4,50,000 budget)</p>
              <div className="mt-6 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-accent w-[68%]" />
              </div>
           </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
           <CardContent className="p-8">
              <div className="flex justify-between items-start mb-4">
                 <div className="bg-secondary/10 p-2 rounded-xl text-secondary">
                    <ArrowDownRight size={20} />
                 </div>
              </div>
              <h3 className="text-3xl font-bold font-heading text-primary mb-1">₹12,450</h3>
              <p className="text-sky/60 text-sm">Average Daily Spend</p>
              <p className="mt-4 text-xs font-bold text-red-500 uppercase tracking-widest">+12% vs last trip</p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
           <CardContent className="p-8">
              <div className="flex justify-between items-start mb-4">
                 <div className="bg-accent/10 p-2 rounded-xl text-accent">
                    <PieIcon size={20} />
                 </div>
              </div>
              <h3 className="text-3xl font-bold font-heading text-primary mb-1">Accommodation</h3>
              <p className="text-sky/60 text-sm">Highest spending category</p>
              <p className="mt-4 text-xs font-bold text-secondary uppercase tracking-widest">39% of total budget</p>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <Card className="border-none shadow-sm">
           <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Category Breakdown</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sky/60"><Filter size={18} /></Button>
           </CardHeader>
           <CardContent className="h-[350px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
              </ResponsiveContainer>
           </CardContent>
        </Card>

        {/* Daily Spending Bar Chart */}
        <Card className="border-none shadow-sm">
           <CardHeader>
              <CardTitle className="text-lg">Daily vs Budgeted</CardTitle>
           </CardHeader>
           <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={dailySpending}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="actual" fill="#17C7D1" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="budget" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={20} />
                 </BarChart>
              </ResponsiveContainer>
           </CardContent>
        </Card>
      </div>

      {/* Budget Health Indicator */}
      <Card className="border-none shadow-sm overflow-hidden">
         <div className="flex flex-col md:flex-row">
            <div className="bg-emerald-500 w-full md:w-4 p-4 md:p-0" />
            <div className="flex-1 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                     Budget Health: Safe <CheckCircle2 className="text-emerald-500" />
                  </h3>
                  <p className="text-sky/80 text-sm">You are currently 12% under your planned budget. Great job!</p>
               </div>
               <Button className="bg-emerald-500 hover:bg-emerald-600 border-none px-8 font-bold">
                  Review Savings
               </Button>
            </div>
         </div>
      </Card>
    </div>
  )
}
