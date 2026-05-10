"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"

// Import Components
import { TripHero } from "@/components/itinerary/TripHero"
import { AIInsights } from "@/components/itinerary/AIInsights"
import { RouteFlow } from "@/components/itinerary/RouteFlow"
import { DayTimelineCard } from "@/components/itinerary/DayTimelineCard"
import { BudgetBreakdown } from "@/components/itinerary/BudgetBreakdown"
import { PackingChecklist } from "@/components/itinerary/PackingChecklist"
import { LoadingSkeleton } from "@/components/itinerary/LoadingSkeleton"
import { ErrorState } from "@/components/itinerary/ErrorState"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Share2, Download, MoreVertical } from "lucide-react"

// Mock Data Fetcher (In production, this would call your API)
const fetchTripById = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock data based on ID
  const mockTrips: Record<string, any> = {
    "1": {
      id: "1",
      name: "Summer in Munnar",
      destination: "Munnar, Kerala",
      startDate: "July 12, 2024",
      endDate: "July 20, 2024",
      style: "Relaxation",
      coverPhoto: "/images/kerala.png",
      budget: {
        total: 24000,
        transport: 8000,
        stay: 10000,
        food: 4000,
        activities: 2000,
        currency: "INR"
      },
      days: [
        {
          dayNumber: 1,
          date: "July 12",
          city: "Munnar",
          theme: "Arrival & Tea Gardens",
          morning: [
            { id: "1", time: "10:00 AM", name: "Check-in at Resort", type: "stay", cost: 0, duration: "1h" }
          ],
          afternoon: [
            { id: "2", time: "02:00 PM", name: "Tata Tea Museum", type: "activity", cost: 500, duration: "2h" }
          ],
          evening: [
            { id: "3", time: "06:00 PM", name: "Local Market Walk", type: "activity", cost: 0, duration: "2h" }
          ]
        }
      ],
      insights: [
        { id: "i1", type: "tip", title: "Weather Alert", content: "Expect light showers. Carry an umbrella." }
      ],
      packingList: [
        { id: "p1", item: "Raincoat", category: "Clothing", essential: true, checked: true },
        { id: "p2", item: "Camera", category: "Electronics", essential: false, checked: false }
      ]
    },
    "2": {
      id: "2",
      name: "Leh Ladakh Expedition",
      destination: "Leh, Ladakh",
      startDate: "Oct 5, 2024",
      endDate: "Oct 15, 2024",
      style: "Adventure",
      coverPhoto: "/images/ladakh.png",
      budget: {
        total: 58000,
        transport: 20000,
        stay: 25000,
        food: 8000,
        activities: 5000,
        currency: "INR"
      },
      days: [
        {
          dayNumber: 1,
          date: "Oct 5",
          city: "Leh",
          theme: "Acclimatization Day",
          morning: [
            { id: "1", time: "09:00 AM", name: "Arrive at Leh Airport", type: "transport", cost: 0, duration: "1h" }
          ],
          afternoon: [
            { id: "2", time: "01:00 PM", name: "Rest & Hydrate", type: "stay", cost: 0, duration: "4h" }
          ],
          evening: [
            { id: "3", time: "05:00 PM", name: "Shanti Stupa Visit", type: "activity", cost: 0, duration: "2h" }
          ]
        }
      ],
      insights: [
        { id: "i1", type: "warning", title: "Altitude", content: "Take it easy on Day 1 to avoid AMS." }
      ],
      packingList: [
        { id: "p1", item: "Warm Jacket", category: "Clothing", essential: true, checked: false },
        { id: "p2", item: "Sunscreen", category: "Personal", essential: true, checked: true }
      ]
    }
  };

  return mockTrips[id] || null;
};

export default function TripDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchTripById(id as string)
        .then(data => {
          if (data) setTrip(data)
          else setError("Trip not found")
        })
        .catch(() => setError("Failed to load trip"))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) return <div className="max-w-6xl mx-auto p-8"><LoadingSkeleton /></div>
  if (error || !trip) return <ErrorState message={error || "Something went wrong"} onRetry={() => window.location.reload()} />

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between py-4">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="text-sky/60 hover:text-primary transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-border flex items-center gap-2">
            <Share2 size={16} /> Share
          </Button>
          <Button variant="outline" className="rounded-xl border-border flex items-center gap-2">
            <Download size={16} /> Export
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <TripHero itinerary={trip} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <RouteFlow cities={trip.days.map((d: any) => d.city)} />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                   <h2 className="text-2xl font-black font-heading text-primary">Trip Timeline</h2>
                </div>
                <div className="space-y-6">
                   {trip.days.map((day: any, idx: number) => (
                     <DayTimelineCard key={day.dayNumber} day={day} isInitiallyExpanded={idx === 0} />
                   ))}
                </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="sticky top-24 space-y-8">
                <BudgetBreakdown budget={trip.budget} />
                <AIInsights insights={trip.insights} />
                <PackingChecklist items={trip.packingList} />
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
