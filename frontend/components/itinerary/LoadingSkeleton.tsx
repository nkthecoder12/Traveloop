"use client"

import React from "react"
import { motion } from "framer-motion"

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Hero Skeleton */}
      <div className="relative h-[400px] rounded-[3rem] bg-muted/30 animate-pulse overflow-hidden">
         <div className="absolute bottom-12 left-12 space-y-4 w-2/3">
            <div className="h-4 w-32 bg-muted/50 rounded-full" />
            <div className="h-16 w-full bg-muted/50 rounded-2xl" />
            <div className="flex gap-4">
               <div className="h-6 w-24 bg-muted/50 rounded-full" />
               <div className="h-6 w-24 bg-muted/50 rounded-full" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           {[1, 2, 3].map((i) => (
             <div key={i} className="h-32 rounded-[2.5rem] bg-muted/30 animate-pulse" />
           ))}
        </div>
        <div className="space-y-8">
           <div className="h-64 rounded-[2.5rem] bg-muted/30 animate-pulse" />
           <div className="h-96 rounded-[2.5rem] bg-muted/30 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export const GenerationLoading: React.FC = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-12">
      <div className="relative">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="w-40 h-40 rounded-full border-4 border-accent/10 border-t-accent"
         />
         <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-accent mb-2"
            >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V4M12 20V21M4 12H3M21 12H20M18.364 5.636L17.657 6.343M6.343 17.657L5.636 18.364M18.364 18.364L17.657 17.657M6.343 6.343L5.636 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
               </svg>
            </motion.div>
            <span className="text-accent font-black text-xs uppercase tracking-widest">AI Agent</span>
         </div>
      </div>
      <div className="space-y-4">
         <h2 className="text-3xl font-black font-heading text-primary tracking-tight">Generating Your AI Itinerary</h2>
         <p className="text-sky/60 font-medium max-w-sm mx-auto">
            Our neural engine is analyzing thousands of routes, local secrets, and weather patterns to craft your perfect escape.
         </p>
      </div>
    </div>
  )
}
