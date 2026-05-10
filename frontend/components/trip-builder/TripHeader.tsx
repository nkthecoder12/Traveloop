"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Compass, DollarSign, Navigation, ChevronRight } from "lucide-react"

interface TripHeaderProps {
  trip: any
}

export const TripHeader: React.FC<TripHeaderProps> = ({ trip }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-border overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-110 transition-transform" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
             <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest border border-accent/20">
               {trip.style}
             </span>
             <span className="px-2.5 py-0.5 rounded-full bg-muted text-sky/40 text-[8px] font-black uppercase tracking-widest">
               Manual Build
             </span>
          </div>
          <h1 className="text-3xl font-black font-heading text-primary tracking-tight">
            {trip.name}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
             {trip.stops.map((stop: any, idx: number) => (
                <React.Fragment key={stop.id}>
                   <span className="text-xs font-bold text-sky/60">{stop.city}</span>
                   {idx < trip.stops.length - 1 && <ChevronRight size={12} className="text-sky/20" />}
                </React.Fragment>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-8">
           <div className="flex items-center gap-3">
              <Calendar size={16} className="text-accent" />
              <div>
                 <p className="text-[9px] font-black text-sky/30 uppercase tracking-widest">Date Range</p>
                 <p className="text-xs font-bold text-primary">5 Days</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <DollarSign size={16} className="text-accent" />
              <div>
                 <p className="text-[9px] font-black text-sky/30 uppercase tracking-widest">Budget</p>
                 <p className="text-xs font-bold text-primary">₹ {trip.budget.toLocaleString()}</p>
              </div>
           </div>
        </div>
      </div>
    </motion.section>
  )
}
