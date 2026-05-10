"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, MapPin, Clock, Wallet, Plane, Bed } from "lucide-react"
import { DayPlan } from "@/types/itinerary"
import { ActivityCard } from "./ActivityCard"
import { cn } from "@/lib/utils"

interface DayTimelineCardProps {
  day: DayPlan
  isInitiallyExpanded?: boolean
}

export const DayTimelineCard: React.FC<DayTimelineCardProps> = ({ day, isInitiallyExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded)

  return (
    <div className="relative">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "bg-white rounded-[2.5rem] shadow-xl p-8 cursor-pointer transition-all border-2 border-transparent relative z-10",
          isExpanded ? "border-accent/20 ring-4 ring-accent/5" : "hover:shadow-2xl"
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex flex-col items-center justify-center shrink-0 shadow-lg">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none">Day</span>
              <span className="text-2xl font-black font-heading leading-none mt-1">{day.dayNumber}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                <MapPin size={12} /> {day.city} • {day.theme}
              </div>
              <h3 className="text-2xl font-bold text-primary tracking-tight">{day.date}</h3>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky/40 mb-1">Estimated Cost</p>
              <p className="text-xl font-bold text-primary">₹ {day.estimatedCost.toLocaleString()}</p>
            </div>
            <div className={cn("p-3 rounded-2xl bg-muted/50 transition-transform duration-300", isExpanded && "rotate-180")}>
              <ChevronDown size={20} className="text-sky/60" />
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        {!isExpanded && (
           <div className="mt-6 pt-6 border-t border-border/50 flex gap-6 overflow-x-auto no-scrollbar">
              {day.morning[0] && (
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                   <span className="text-xs font-bold text-sky/60">{day.morning[0].name}</span>
                </div>
              )}
              {day.afternoon[0] && (
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span className="text-xs font-bold text-sky/60">{day.afternoon[0].name}</span>
                </div>
              )}
           </div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden space-y-8 px-4"
          >
            {/* Morning Section */}
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 flex items-center gap-2 ml-4">
                  <Clock size={12} /> Morning
               </h4>
               <div className="space-y-4">
                  {day.morning.map(activity => <ActivityCard key={activity.id} activity={activity} />)}
               </div>
            </div>

            {/* Afternoon Section */}
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 flex items-center gap-2 ml-4">
                  <Clock size={12} /> Afternoon
               </h4>
               <div className="space-y-4">
                  {day.afternoon.map(activity => <ActivityCard key={activity.id} activity={activity} />)}
               </div>
            </div>

            {/* Evening Section */}
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 flex items-center gap-2 ml-4">
                  <Clock size={12} /> Evening
               </h4>
               <div className="space-y-4">
                  {day.evening.map(activity => <ActivityCard key={activity.id} activity={activity} />)}
               </div>
            </div>

            {/* Stay & Transport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-8">
               {day.stayInfo && (
                 <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                       <Bed size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500/60 mb-0.5">Overnight Stay</p>
                       <p className="font-bold text-primary text-sm">{day.stayInfo.name}</p>
                    </div>
                 </div>
               )}
               {day.transportInfo && (
                 <div className="p-6 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shrink-0">
                       <Plane size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500/60 mb-0.5">Daily Transport</p>
                       <p className="font-bold text-primary text-sm">{day.transportInfo.type}</p>
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
