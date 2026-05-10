"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Calendar, Sparkles, Navigation } from "lucide-react"
import { ItineraryResponse } from "@/types/itinerary"

interface TripHeroProps {
  itinerary: ItineraryResponse
}

export const TripHero: React.FC<TripHeroProps> = ({ itinerary }) => {
  return (
    <section className="relative h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
      {itinerary.coverPhoto && (
        <Image 
          src={itinerary.coverPhoto} 
          alt={itinerary.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-accent text-primary text-[9px] font-black uppercase tracking-widest shadow-lg">
              {itinerary.style}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tighter leading-none drop-shadow-2xl">
            {itinerary.name}
          </h1>
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{itinerary.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{itinerary.startDate} - {itinerary.endDate}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
