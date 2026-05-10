"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Search, 
  ChevronDown, 
  MapPin, 
  Plane, 
  Hotel, 
  Utensils, 
  Camera,
  MoreVertical,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const days = [
  {
    day: "Day 1",
    activities: [
      { type: "Flight", title: "Flight to Kochi", details: "Indigo 6E-204, Term 1", expense: "₹8,500", icon: Plane },
      { type: "Hotel", title: "Grand Hyatt Kochi", details: "Check-in at 2 PM", expense: "₹12,000", icon: Hotel },
      { type: "Dining", title: "Malabar Cafe", details: "Authentic Kerala Thali", expense: "₹2,500", icon: Utensils },
    ]
  },
  {
    day: "Day 2",
    activities: [
      { type: "Tour", title: "Backwater Cruise", details: "Alleppey Day Tour", expense: "₹4,500", icon: Camera },
      { type: "Activity", title: "Kathakali Performance", details: "Cultural Center", expense: "₹1,200", icon: Camera },
      { type: "Dining", title: "Ginger House Museum", details: "Harbor side dining", expense: "₹3,000", icon: Utensils },
    ]
  }
]

export default function ItineraryViewPage() {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2">Itinerary for Kerala Trip</h1>
        <p className="text-sky/80">Your day-by-day master plan with expense tracking.</p>
      </div>

      {/* Header Search & Filter (Screen 9) */}
      <div className="space-y-8">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="w-5 h-5 text-sky/60" />
            <input 
              type="text" 
              placeholder="Search in itinerary..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
          </div>
        </div>

        {/* Labels (Screen 9) */}
        <div className="flex justify-between px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-sky/40">
           <div className="flex-1">Physical Activity</div>
           <div className="w-32 text-right">Expense</div>
        </div>

        {/* Timeline (Screen 9) */}
        <div className="space-y-12 relative before:absolute before:left-[1.6rem] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted/50">
           {days.map((day, dayIdx) => (
             <div key={day.day} className="space-y-6">
                <div className="relative z-10 flex items-center gap-6">
                   <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold shadow-lg border-4 border-white">
                      {dayIdx + 1}
                   </div>
                   <h2 className="text-xl font-bold text-primary font-heading">{day.day}</h2>
                </div>

                <div className="ml-6 space-y-4">
                   {day.activities.map((activity, actIdx) => (
                     <motion.div 
                       key={actIdx}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: actIdx * 0.1 }}
                       className="flex items-center gap-6 group"
                     >
                        <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-border group-hover:border-accent/50 transition-all flex items-center justify-between">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                                 <activity.icon size={20} />
                              </div>
                              <div>
                                 <h3 className="font-bold text-primary mb-1">{activity.title}</h3>
                                 <p className="text-sky/60 text-xs font-bold uppercase tracking-widest">{activity.details}</p>
                              </div>
                           </div>
                           <div className="text-lg font-bold text-primary w-32 text-right">
                              {activity.expense}
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
           ))}
        </div>

        <div className="flex justify-center pt-8">
           <Button className="h-14 px-12 bg-primary text-white border-none font-bold rounded-xl shadow-xl flex items-center gap-3">
              Add Activity to Itinerary <ArrowRight size={18} />
           </Button>
        </div>
      </div>
    </div>
  )
}
