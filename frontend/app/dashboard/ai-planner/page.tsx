"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAIItinerary } from "@/hooks/useAIItinerary"

// Import Components
import { TripHero } from "@/components/itinerary/TripHero"
import { AIInsights } from "@/components/itinerary/AIInsights"
import { RouteFlow } from "@/components/itinerary/RouteFlow"
import { DayTimelineCard } from "@/components/itinerary/DayTimelineCard"
import { BudgetBreakdown } from "@/components/itinerary/BudgetBreakdown"
import { PackingChecklist } from "@/components/itinerary/PackingChecklist"
import { ActionButtons } from "@/components/itinerary/ActionButtons"
import { LoadingSkeleton, GenerationLoading } from "@/components/itinerary/LoadingSkeleton"
import { ErrorState } from "@/components/itinerary/ErrorState"

// UI Imports
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Sparkles, MapPin, Wallet, Clock, ArrowRight, Compass, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AIPlannerPage() {
  const { itinerary, isLoading, error, generate, reset } = useAIItinerary()
  const [preferences, setPreferences] = useState({
    destination: "",
    budget: "",
    duration: "5 Days",
    style: "Luxury"
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get('destination');
    const budg = params.get('budget');
    const style = params.get('style');

    if (dest || budg || style) {
      setPreferences(prev => ({
        ...prev,
        destination: dest || prev.destination,
        budget: budg || prev.budget,
        style: style || prev.style
      }));
    }
  }, []);

  const handleStartGeneration = () => {
    generate({
      destination: preferences.destination || "Kyoto, Japan",
      budget: preferences.budget || "₹ 150,000",
      duration: preferences.duration,
      style: preferences.style
    })
  }

  return (
    <div className="max-w-6xl mx-auto pb-10 px-4">
      <AnimatePresence mode="wait">
        {/* Step 1: Input Preferences */}
        {!itinerary && !isLoading && !error && (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl mx-auto py-4 space-y-4"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent shadow-lg mb-2">
                <Sparkles size={20} className="animate-pulse" />
              </div>
              <h1 className="text-2xl font-black font-heading text-primary tracking-tight">AI Trip Architect</h1>
              <p className="text-sky/60 text-xs max-w-sm mx-auto font-medium">
                Unlock bespoke journeys designed by our advanced neural planning engine.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <Card className="border-none shadow-xl rounded-2xl bg-white p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                       <Navigation size={10} className="text-accent" /> Destination
                    </label>
                    <div className="relative">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                       <input 
                         type="text" 
                         placeholder="Where do you want to explore?"
                         value={preferences.destination}
                         onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
                         className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold text-primary"
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                         <Wallet size={10} className="text-accent" /> Budget
                      </label>
                      <input 
                        type="text" 
                        placeholder="₹ 50,000"
                        value={preferences.budget}
                        onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
                        className="w-full h-10 px-4 rounded-xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-[10px] font-bold text-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                         <Clock size={10} className="text-accent" /> Duration
                      </label>
                      <select 
                        value={preferences.duration}
                        onChange={(e) => setPreferences({...preferences, duration: e.target.value})}
                        className="w-full h-10 px-4 rounded-xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-[10px] font-bold text-primary appearance-none"
                      >
                         <option>3 Days</option>
                         <option>5 Days</option>
                         <option>7 Days</option>
                         <option>10+ Days</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                       <Compass size={10} className="text-accent" /> Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                       {["Luxury", "Budget", "Adventure", "Solo", "Family", "Couple"].map((style) => (
                         <div 
                           key={style}
                           onClick={() => setPreferences({...preferences, style})}
                           className={cn(
                             "h-9 rounded-lg flex items-center justify-center text-[8px] font-black uppercase tracking-widest cursor-pointer border-2 transition-all",
                             preferences.style === style 
                               ? "bg-primary text-white border-primary shadow-sm" 
                               : "bg-muted/30 text-primary/40 border-transparent hover:bg-muted/50"
                           )}
                         >
                           {style}
                         </div>
                       ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleStartGeneration}
                    className="w-full h-12 rounded-xl bg-accent text-primary font-black text-xs shadow-md hover:scale-[1.01] transition-all"
                  >
                     Design Journey <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </Card>

               <div className="space-y-4 flex flex-col justify-center">
                  <div className="bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full -mr-8 -mt-8 blur-[40px] group-hover:scale-110 transition-transform" />
                     <h3 className="text-lg font-bold font-heading mb-4 relative z-10">The Neural Edge</h3>
                     <ul className="space-y-4 relative z-10">
                        <li className="flex items-start gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent shrink-0 border border-white/10">
                              <Sparkles size={12} />
                           </div>
                           <div>
                              <p className="font-bold text-white text-xs">Global Intelligence</p>
                              <p className="text-[9px] text-white/50 leading-relaxed font-medium">10k+ sources for authentic experiences.</p>
                           </div>
                        </li>
                        <li className="flex items-start gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-accent shrink-0 border border-white/10">
                              <Compass size={12} />
                           </div>
                           <div>
                              <p className="font-bold text-white text-xs">Logistics Optimization</p>
                              <p className="text-[9px] text-white/50 leading-relaxed font-medium">Minimize transit and maximize memories.</p>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Generation Loading */}
        {isLoading && (
          <motion.div
            key="generation-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GenerationLoading />
          </motion.div>
        )}

        {/* Step 3: Error State */}
        {error && (
          <motion.div
            key="error-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ErrorState message={error} onRetry={handleStartGeneration} />
          </motion.div>
        )}

        {/* Step 4: Final Itinerary Dashboard */}
        {itinerary && !isLoading && (
          <motion.div
            key="itinerary-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 py-8"
          >
            <TripHero itinerary={itinerary} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main Timeline Column */}
               <div className="lg:col-span-2 space-y-8">
                  <RouteFlow cities={itinerary.days.map(d => d.city)} />
                  
                  <div className="space-y-8">
                    <div className="flex items-center justify-between px-4">
                       <h2 className="text-2xl font-black font-heading text-primary tracking-tight">Timeline Schedule</h2>
                       <div className="flex gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-sky/40 bg-muted px-3 py-1 rounded-full">30+ Activities</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-sky/40 bg-muted px-3 py-1 rounded-full">Optimized</span>
                       </div>
                    </div>
                    <div className="space-y-6">
                       {itinerary.days.map((day, idx) => (
                         <DayTimelineCard key={day.dayNumber} day={day} isInitiallyExpanded={idx === 0} />
                       ))}
                    </div>
                  </div>
               </div>

               {/* Sticky Insights Sidebar */}
               <div className="space-y-8">
                  <div className="sticky top-24 space-y-8">
                    <BudgetBreakdown budget={itinerary.budget} />
                    <AIInsights insights={itinerary.insights} />
                    <PackingChecklist items={itinerary.packingList} />
                  </div>
               </div>
            </div>

            <ActionButtons onSave={async () => {
              try {
                const { tripService } = await import("@/services/tripService");
                await tripService.createTrip(itinerary as any);
                alert("Trip saved successfully!");
                window.location.href = "/dashboard/trips";
              } catch (err: any) {
                alert("Failed to save trip: " + err.message);
              }
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
