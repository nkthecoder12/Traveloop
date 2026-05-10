"use client"

import React from "react"
import { motion } from "framer-motion"
import { Plus, Clock, DollarSign, GripVertical, MoreHorizontal, MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  activity: any
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all cursor-move relative">
      <GripVertical size={14} className="text-sky/10 group-hover:text-accent transition-colors shrink-0" />
      
      <div className="flex-1 min-w-0">
         <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-black text-primary truncate group-hover:text-accent transition-colors">{activity.name}</h4>
            <span className="text-[9px] font-black text-sky/30 uppercase tracking-widest">{activity.time}</span>
         </div>
         <div className="flex items-center gap-3 mt-1">
            <span className={cn(
              "text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
              activity.category === "Stay" ? "bg-secondary/5 border-secondary/20 text-secondary" :
              activity.category === "Food" ? "bg-orange-500/5 border-orange-500/20 text-orange-500" :
              "bg-accent/5 border-accent/20 text-accent"
            )}>
              {activity.category}
            </span>
            {activity.cost > 0 && (
               <div className="flex items-center gap-1 text-[9px] font-bold text-sky/30">
                  <DollarSign size={8} />
                  <span>{activity.cost}</span>
               </div>
            )}
         </div>
      </div>
    </div>
  )
}

interface TimelineBoardProps {
  days: any[]
}

export const TimelineBoard: React.FC<TimelineBoardProps> = ({ days }) => {
  return (
    <div className="space-y-10">
      {days.map((day, idx) => (
        <motion.div 
          key={day.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex flex-col items-center justify-center shrink-0 shadow-lg shadow-primary/10">
                   <span className="text-[8px] font-black uppercase leading-none opacity-60">Day</span>
                   <span className="text-lg font-black leading-none">{day.dayNumber}</span>
                </div>
                <div>
                   <h3 className="text-base font-black text-primary font-heading tracking-tight flex items-center gap-2">
                     {day.city}
                   </h3>
                   <p className="text-[9px] font-bold text-sky/40 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={10} /> {day.activities.length} Activities
                   </p>
                </div>
             </div>
             <Button variant="ghost" className="h-8 px-3 rounded-lg text-accent font-black text-[9px] uppercase tracking-widest hover:bg-accent/10">
                <Plus size={12} className="mr-1" /> Add
             </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 pl-12 border-l-2 border-dashed border-border ml-5 py-2">
             {day.activities.map((activity: any) => (
               <ActivityCard key={activity.id} activity={activity} />
             ))}
             <button className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-border text-sky/20 hover:border-accent/40 hover:text-accent transition-all group">
                <Plus size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Activity</span>
             </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
