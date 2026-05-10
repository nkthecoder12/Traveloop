"use client"

import React, { useState } from "react"
import { motion, Reorder, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  MapPin, 
  Calendar, 
  Plus, 
  Trash2, 
  GripVertical, 
  Image as ImageIcon,
  ArrowRight,
  Plane,
  Clock,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CityStop {
  id: string
  name: string
  duration: string
  activities: string[]
}

export default function CreateTripPage() {
  const [cities, setCities] = useState<CityStop[]>([
    { id: "1", name: "Paris, France", duration: "3 Days", activities: ["Visit Louvre", "Eiffel Tower"] },
  ])

  const addCity = () => {
    const newCity: CityStop = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      duration: "1 Day",
      activities: []
    }
    setCities([...cities, newCity])
  }

  const removeCity = (id: string) => {
    if (cities.length > 1) {
      setCities(cities.filter(c => c.id !== id))
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2">Design Your Journey</h1>
        <p className="text-sky/80 text-lg">Add stops, reorder cities, and let AI help you with the details.</p>
      </div>

      <div className="space-y-8">
        {/* Basic Trip Info Card */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="h-32 bg-primary relative">
             <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
             <div className="absolute inset-0 flex items-center px-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <ImageIcon className="text-white w-6 h-6" />
                </div>
                <div className="ml-6">
                  <input 
                    type="text" 
                    placeholder="Untilted Trip" 
                    className="bg-transparent border-none text-2xl font-bold text-white placeholder-white/40 focus:outline-none w-full"
                  />
                  <p className="text-white/60 text-sm font-medium">Click to set trip title and cover image</p>
                </div>
             </div>
          </div>
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-sky/60">Start Date</label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                  <Calendar className="w-4 h-4 text-accent" />
                  <input type="date" className="bg-transparent border-none focus:outline-none text-sm text-primary font-medium" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-sky/60">Travel Style</label>
                <select className="w-full h-[46px] px-3 rounded-xl bg-muted/50 border border-border text-sm text-primary font-medium focus:outline-none focus:border-accent">
                  <option>Luxury</option>
                  <option>Adventure</option>
                  <option>Budget</option>
                  <option>Family</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-sky/60">Total Budget</label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                  <span className="text-accent font-bold">$</span>
                  <input type="number" placeholder="0.00" className="bg-transparent border-none focus:outline-none text-sm text-primary font-medium w-full" />
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Multi-City Builder */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-primary">Route Planner</h2>
            <Button variant="outline" size="sm" onClick={addCity} className="rounded-lg border-accent text-accent hover:bg-accent hover:text-white">
              <Plus className="w-4 h-4 mr-1" /> Add Stop
            </Button>
          </div>

          <Reorder.Group axis="y" values={cities} onReorder={setCities} className="space-y-4">
            <AnimatePresence>
              {cities.map((city, index) => (
                <Reorder.Item
                  key={city.id}
                  value={city}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative"
                >
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-center gap-6">
                      <div className="cursor-grab active:cursor-grabbing text-sky/40 hover:text-primary transition-colors">
                        <GripVertical size={20} />
                      </div>
                      
                      <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold font-heading">
                        {index + 1}
                      </div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky/40" />
                          <input 
                            type="text" 
                            placeholder="Search City..." 
                            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-sm font-medium"
                            defaultValue={city.name}
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky/40" />
                          <input 
                            type="text" 
                            placeholder="Duration (e.g. 3 Days)" 
                            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-sm font-medium"
                            defaultValue={city.duration}
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => removeCity(city.id)}
                        className="p-2 text-sky/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </CardContent>
                  </Card>
                  
                  {index < cities.length - 1 && (
                    <div className="absolute left-[78px] -bottom-5 w-0.5 h-6 bg-border flex items-center justify-center">
                      <div className="p-1 bg-white border border-border rounded-full">
                        <Plane size={10} className="text-sky/40 rotate-180" />
                      </div>
                    </div>
                  )}
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>

        {/* AI Generator CTA */}
        <Card className="border-none bg-accent/5 border-2 border-dashed border-accent/30 p-8 text-center group cursor-pointer hover:bg-accent/10 transition-colors">
           <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="text-accent w-8 h-8" />
           </div>
           <h3 className="text-xl font-bold text-primary mb-2">Let AI Optimize Your Route</h3>
           <p className="text-sky/80 text-sm mb-6 max-w-sm mx-auto">
             Our AI will suggest the best sequence for your cities and find the most efficient transportation options.
           </p>
           <Button variant="secondary" className="bg-primary text-white border-none h-12 px-8">
              Generate AI Itinerary
           </Button>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
           <Button variant="ghost" className="text-sky/60 font-bold hover:text-primary">
              Save Draft
           </Button>
           <div className="flex gap-4">
              <Button variant="outline" className="border-border px-8">Cancel</Button>
              <Button className="px-10 shadow-xl">
                 Finish Trip Plan <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
