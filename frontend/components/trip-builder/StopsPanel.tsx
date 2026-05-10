"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, Plus, GripVertical, Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface StopsPanelProps {
  stops: any[]
}

export const StopsPanel: React.FC<StopsPanelProps> = ({ stops }) => {
  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
          <MapPin size={14} className="text-accent" /> Journey Stops
        </h3>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg bg-accent/10 text-accent hover:bg-accent/20">
          <Plus size={14} />
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {stops.map((stop, index) => (
          <motion.div 
            key={stop.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 border border-transparent hover:border-accent/20 hover:bg-white transition-all cursor-move"
          >
            <GripVertical size={14} className="text-sky/10 group-hover:text-accent transition-colors shrink-0" />
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-black text-primary truncate">{stop.city}</p>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sky/20 hover:text-red-500">
                    <Trash2 size={12} />
                  </button>
               </div>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={10} className="text-sky/20" />
                  <span className="text-[9px] font-bold text-sky/30 uppercase tracking-widest">{stop.duration}</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-border mt-auto">
        <Button className="w-full h-10 rounded-xl bg-muted text-sky/40 hover:text-primary hover:bg-accent/10 border-none font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
          <Plus size={14} /> Add Stop
        </Button>
      </div>
    </div>
  )
}
