"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { 
  Plus, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  Plane,
  MoreVertical
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

const analyticsData = [
  { name: "Jan", spent: 400 },
  { name: "Feb", spent: 300 },
  { name: "Mar", spent: 600 },
  { name: "Apr", spent: 800 },
  { name: "May", spent: 500 },
  { name: "Jun", spent: 900 },
]

const upcomingTrips = [
  { 
    id: 1, 
    title: "Summer in Munnar", 
    date: "July 12 - 20, 2024", 
    budget: "₹24,000", 
    progress: 80, 
    image: "/images/santorini.png" 
  },
  { 
    id: 2, 
    title: "Leh Ladakh Expedition", 
    date: "Oct 5 - 15, 2024", 
    budget: "₹58,000", 
    progress: 35, 
    image: "/images/tokyo.png" 
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary">Good Morning, Alex!</h1>
          <p className="text-sky/80">You have 2 trips upcoming and 1 unplanned city on your list.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-border">
            View Archive
          </Button>
          <Button className="h-12 px-6 rounded-xl shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Trip
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Trips", value: "12", icon: Plane, trend: "+2 this year", color: "text-accent bg-accent/10" },
          { label: "Travel Budget", value: "₹84,500", icon: DollarSign, trend: "₹12k saved", color: "text-secondary bg-secondary/10" },
          { label: "Cities Visited", value: "24", icon: MapPin, trend: "4 new states", color: "text-primary bg-primary/10" },
          { label: "Loyalty Points", value: "12.5k", icon: TrendingUp, trend: "Gold Member", color: "text-accent bg-accent/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-lg", stat.color)}>
                    <stat.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky/60">{stat.trend}</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm text-sky/80 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Spending Analytics</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={18} /></Button>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#17C7D1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#17C7D1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ stroke: '#17C7D1', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="spent" stroke="#17C7D1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm bg-primary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl" />
            <CardHeader>
              <CardTitle className="text-lg">AI Trip Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sky/60 text-sm mb-6 leading-relaxed">Based on your love for Adventure, how about a 5-day trek in Spiti Valley?</p>
              <Button className="w-full bg-accent text-primary hover:bg-accent/90 border-none font-bold">
                Generate Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Best Sushi in Tokyo", date: "2 days ago", color: "bg-accent" },
                { title: "Packing for Iceland", date: "5 days ago", color: "bg-secondary" },
              ].map((note) => (
                <div key={note.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className={cn("w-1 h-8 rounded-full", note.color)} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{note.title}</p>
                    <p className="text-[10px] text-sky/60 font-bold uppercase tracking-widest">{note.date}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sky/40 group-hover:text-accent transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Trips Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading text-primary">Upcoming Trips</h2>
          <Button variant="link" className="text-accent font-bold">View All Trips</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingTrips.map((trip) => (
            <motion.div
              key={trip.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-sm overflow-hidden flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-48 relative min-h-[160px]">
                  <img src={trip.image} alt={trip.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-primary">{trip.title}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1"><MoreVertical size={16} /></Button>
                  </div>
                  <div className="flex items-center gap-2 text-sky/60 text-xs font-bold uppercase tracking-widest mb-6">
                    <Calendar size={14} className="text-accent" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-sky/60 uppercase tracking-widest">Planning Progress</span>
                      <span className="text-primary">{trip.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${trip.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-accent" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
