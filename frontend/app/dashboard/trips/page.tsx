"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  MoreVertical, 
  Filter,
  Plane,
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const trips = [
  {
    id: 1,
    title: "Summer in Munnar",
    location: "Kerala, India",
    date: "July 12 - 20, 2024",
    status: "Upcoming",
    progress: 80,
    image: "/images/santorini.png",
    budget: "₹24,000"
  },
  {
    id: 2,
    title: "Leh Ladakh Expedition",
    location: "Ladakh, India",
    date: "Oct 5 - 15, 2024",
    status: "Upcoming",
    progress: 35,
    image: "/images/tokyo.png",
    budget: "₹58,000"
  },
  {
    id: 3,
    title: "Royal Rajasthan",
    location: "Jaipur, India",
    date: "May 10 - 15, 2024",
    status: "Completed",
    progress: 100,
    image: "/images/paris.png",
    budget: "₹32,000"
  },
  {
    id: 4,
    title: "Goa Beach Escape",
    location: "Goa, India",
    date: "Aug 20 - 30, 2024",
    status: "Draft",
    progress: 15,
    image: "/images/hero.png",
    budget: "₹15,000"
  }
]

export default function TripsPage() {
  const [filter, setFilter] = useState("All")
  const tabs = ["All", "Upcoming", "Completed", "Draft"]

  const filteredTrips = filter === "All" 
    ? trips 
    : trips.filter(t => t.status === filter)

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary mb-2">My Trips</h1>
          <p className="text-sky/80">Manage your journeys and plan your next adventures.</p>
        </div>
        <Link href="/dashboard/trips/create">
          <Button className="h-12 px-6 rounded-xl shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Search & Filter Bar (Screen 6) */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-2">
          <Search className="w-5 h-5 text-sky/60" />
          <input 
            type="text" 
            placeholder="Search your trips..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
        </div>
      </div>

      {/* Categorized Sections (Screen 6) */}
      <div className="space-y-12">
        {["Ongoing", "Upcoming", "Completed"].map((status) => {
          const statusTrips = trips.filter(t => t.status === status || (status === "Upcoming" && t.status === "Draft"))
          if (statusTrips.length === 0) return null

          return (
            <div key={status} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold font-heading text-primary whitespace-nowrap">{status}</h2>
                <div className="h-[1px] w-full bg-border" />
              </div>

              <div className="space-y-6">
                {statusTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col md:flex-row gap-6 group hover:border-accent/50 transition-all cursor-pointer"
                  >
                    <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden shrink-0 relative">
                      <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">{trip.title}</h3>
                           <span className={cn(
                             "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                             status === "Ongoing" ? "bg-accent/10 text-primary border border-accent/20" :
                             status === "Upcoming" ? "bg-secondary/10 text-secondary border border-secondary/20" :
                             "bg-muted text-sky/60 border border-border"
                           )}>
                             {trip.status}
                           </span>
                        </div>
                        <p className="text-sky/60 text-sm font-medium flex items-center gap-2 mb-4">
                          <MapPin size={14} className="text-accent" /> {trip.location}
                        </p>
                        <p className="text-primary/70 text-sm line-clamp-2">
                          Experience the beauty of {trip.location.split(',')[0]} with our curated 5-day itinerary.
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-sky/60 uppercase tracking-widest">
                            <Calendar size={14} /> {trip.date}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-sky/60 uppercase tracking-widest">
                            <Plane size={14} /> {trip.budget}
                          </div>
                        </div>
                        <Link href={`/dashboard/trips/bali-2024/itinerary`}>
                          <Button size="sm" className="bg-muted text-primary hover:bg-accent hover:text-white border-none font-bold">
                            View Trip <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
