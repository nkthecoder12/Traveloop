"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"

interface RouteFlowProps {
  cities: string[]
}

export const RouteFlow: React.FC<RouteFlowProps> = ({ cities }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-border/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
         <h3 className="text-xl font-bold font-heading text-primary">Travel Route Flow</h3>
         <div className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            {cities.length} Stops Total
         </div>
      </div>

      <div className="mt-10 flex items-center gap-6 overflow-x-auto no-scrollbar pb-4 relative z-10">
         {cities.map((city, index) => (
           <React.Fragment key={`${city}-${index}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 shrink-0"
              >
                 <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center text-primary border-2 border-transparent hover:border-accent transition-all group cursor-default">
                    <MapPin size={24} className="group-hover:text-accent transition-colors" />
                 </div>
                 <span className="text-xs font-bold text-primary tracking-tight">{city}</span>
              </motion.div>
              
              {index < cities.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                  className="shrink-0 pt-3"
                >
                   <div className="flex flex-col items-center gap-1">
                      <div className="h-[2px] w-12 bg-gradient-to-r from-accent/40 to-accent/10 rounded-full" />
                      <ArrowRight size={14} className="text-accent/40" />
                   </div>
                </motion.div>
              )}
           </React.Fragment>
         ))}
      </div>
    </div>
  )
}
