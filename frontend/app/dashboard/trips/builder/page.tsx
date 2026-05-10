"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Settings, 
  Save, 
  Share2, 
  Download, 
  MoreVertical,
  ChevronRight,
  ArrowLeft,
  Navigation
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

// Import Builder Components
import { TripHeader } from "@/components/trip-builder/TripHeader"
import { StopsPanel } from "@/components/trip-builder/StopsPanel"
import { TimelineBoard } from "@/components/trip-builder/TimelineBoard"
import { BudgetSidebar } from "@/components/trip-builder/BudgetSidebar"
import { BuilderToolbar } from "@/components/trip-builder/BuilderToolbar"

export default function ManualTripBuilderPage() {
  // Initial Mock State
  const [trip, setTrip] = useState({
    name: "South India Explorer",
    style: "Adventure",
    budget: 20000,
    startDate: "2024-07-12",
    endDate: "2024-07-17",
    stops: [
      { id: "s1", city: "Coimbatore", duration: "1 Day" },
      { id: "s2", city: "Munnar", duration: "3 Days" },
      { id: "s3", city: "Kochi", duration: "1 Day" },
    ],
    days: [
      { 
        id: "d1", 
        dayNumber: 1, 
        city: "Coimbatore",
        activities: [
          { id: "a1", time: "08:00 AM", name: "Hotel Check-in", cost: 0, category: "Stay" },
          { id: "a2", time: "09:30 AM", name: "Breakfast", cost: 500, category: "Food" },
          { id: "a3", time: "01:00 PM", name: "Visit Isha Yoga Center", cost: 200, category: "Culture" },
        ]
      },
      { 
        id: "d2", 
        dayNumber: 2, 
        city: "Munnar",
        activities: [
          { id: "a4", time: "10:00 AM", name: "Tea Museum", cost: 300, category: "Culture" },
        ]
      }
    ],
    packingList: [
      { id: "p1", item: "Raincoat", essential: true, checked: false },
      { id: "p2", item: "Camera", essential: true, checked: true },
    ],
    notes: ""
  })

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
      {/* Builder Top Toolbar */}
      <BuilderToolbar tripName={trip.name} />

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Stops Management */}
        <aside className="w-72 bg-white border-r border-border shrink-0 hidden lg:block h-full">
           <StopsPanel stops={trip.stops} />
        </aside>

        {/* Central Builder: Timeline */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] custom-scrollbar">
           <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
              <TripHeader trip={trip} />
              <TimelineBoard days={trip.days} />
           </div>
        </main>

        {/* Right Sidebar: Budget & Settings */}
        <aside className="w-80 bg-white border-l border-border shrink-0 hidden xl:block h-full overflow-y-auto custom-scrollbar">
           <BudgetSidebar trip={trip} />
        </aside>

      </div>

      {/* Mobile Sticky Footer Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex gap-3 z-50 shadow-2xl">
         <Button className="flex-1 h-12 rounded-xl bg-primary font-black text-xs uppercase tracking-widest text-white">Save Trip</Button>
         <Button variant="outline" className="h-12 w-12 rounded-xl border-border"><Share2 size={20} className="text-primary" /></Button>
      </div>
    </div>
  )
}
