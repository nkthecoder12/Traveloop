"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Search as SearchIcon, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Compass,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const results = [
  {
    id: 1,
    title: "Paragliding in Bir Billing",
    location: "Himachal Pradesh",
    price: "₹3,500",
    rating: 4.9,
    duration: "45 mins",
    image: "/images/hero.png"
  },
  {
    id: 2,
    title: "Scuba Diving in Havelock",
    location: "Andaman & Nicobar",
    price: "₹4,200",
    rating: 4.8,
    duration: "2 hours",
    image: "/images/paris.png"
  },
  {
    id: 3,
    title: "Sunset Camel Safari",
    location: "Jaisalmer, Rajasthan",
    price: "₹1,200",
    rating: 4.7,
    duration: "3 hours",
    image: "/images/tokyo.png"
  },
  {
    id: 4,
    title: "White Water Rafting",
    location: "Rishikesh, Uttarakhand",
    price: "₹1,500",
    rating: 5.0,
    duration: "1.5 hours",
    image: "/images/santorini.png"
  },
  {
    id: 5,
    title: "Trekking to Triund",
    location: "Mcleodganj, HP",
    price: "₹800",
    rating: 4.6,
    duration: "6 hours",
    image: "/images/hero.png"
  }
]

export default function ActivitySearchPage() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
           <Compass className="text-accent" /> Activity Search
        </h1>
        <p className="text-sky/80">Discover the best things to do in your chosen destination.</p>
      </div>

      {/* Search Header (Screen 8) */}
      <div className="space-y-8">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <SearchIcon className="w-5 h-5 text-sky/60" />
            <input 
              type="text" 
              placeholder="Search for paragliding, surfing, museums..." 
              defaultValue="Paragliding"
              className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold font-heading text-primary">Results</h2>
             <span className="text-sm text-sky/60 font-medium">{results.length} activities found</span>
          </div>

          {/* Activity List (Screen 8) */}
          <div className="grid grid-cols-1 gap-6">
             {results.map((item, index) => (
               <motion.div
                 key={item.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 whileHover={{ x: 10 }}
                 className="bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col md:flex-row gap-8 group hover:border-accent/50 transition-all cursor-pointer"
               >
                  <div className="w-full md:w-64 h-44 rounded-2xl overflow-hidden shrink-0 relative">
                     <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-bold text-primary">{item.rating}</span>
                     </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                     <div>
                        <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-2">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sky/60 mb-4">
                           <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                              <MapPin size={14} className="text-accent" /> {item.location}
                           </div>
                           <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                              <Clock size={14} className="text-accent" /> {item.duration}
                           </div>
                        </div>
                        <p className="text-primary/70 text-sm line-clamp-2 leading-relaxed">
                           Enjoy an exhilarating {item.title.toLowerCase()} experience in the heart of {item.location}. Perfect for thrill-seekers and nature lovers alike.
                        </p>
                     </div>

                     <div className="flex items-center justify-between mt-6">
                        <div className="text-2xl font-bold text-primary">
                           {item.price} <span className="text-xs text-sky/40 font-bold uppercase tracking-widest ml-1">per person</span>
                        </div>
                        <Button className="h-11 px-8 bg-muted text-primary hover:bg-accent hover:text-white border-none font-bold rounded-xl flex items-center gap-2">
                           Book Now <ArrowRight size={16} />
                        </Button>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
