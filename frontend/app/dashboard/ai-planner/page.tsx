"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wallet, 
  Compass,
  Plus,
  MoreVertical,
  X,
  Trash2
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AIPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [step, setStep] = useState(1)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setStep(2)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
          <Sparkles className="text-accent" /> AI Trip Architect
        </h1>
        <p className="text-sky/80 text-lg">Our intelligent engine will craft a bespoke itinerary just for you.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
          >
            {/* Plan a new trip (Screen 4) */}
            <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-xl font-bold font-heading text-primary whitespace-nowrap">Plan a new trip</h2>
                  <div className="h-[1px] w-full bg-border" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-sky/60">Select a Place :</label>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter destination..." 
                      className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-sky/60">Budget :</label>
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g. ₹50,000" 
                      className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-sky/60">Start Date :</label>
                    </div>
                    <input 
                      type="date" 
                      className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-sky/60">End Date :</label>
                    </div>
                    <input 
                      type="date" 
                      className="w-full h-12 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-sm font-medium"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggestions (Screen 4) */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-xl font-bold font-heading text-primary whitespace-nowrap">Suggestion for Places to Visit/Activities to perform</h2>
                <div className="h-[1px] w-full bg-border" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Scuba Diving", img: "/images/hero.png" },
                  { name: "Local Market", img: "/images/paris.png" },
                  { name: "Beach Sunset", img: "/images/tokyo.png" },
                  { name: "Ancient Temple", img: "/images/santorini.png" },
                  { name: "Night Safari", img: "/images/hero.png" },
                  { name: "Street Food Tour", img: "/images/paris.png" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-[2rem] overflow-hidden relative shadow-sm group cursor-pointer"
                  >
                    <Image src={item.img} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                       <span className="text-white font-bold text-center drop-shadow-md">{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="h-16 px-16 text-lg shadow-xl relative overflow-hidden bg-primary hover:bg-primary/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Generate My Itinerary <Sparkles className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Build Itinerary Screen (Screen 5) */}
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold font-heading text-primary">Build Itinerary Screen</h2>
               <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="h-10 border-border">Back</Button>
                  <Button className="h-10 bg-accent text-primary hover:bg-accent/90 border-none font-bold">Save Trip</Button>
               </div>
            </div>

            <div className="space-y-6">
               {[1, 2, 3].map((num) => (
                 <Card key={num} className="border-none shadow-sm bg-white rounded-3xl group hover:border-accent/50 border border-transparent transition-all">
                    <CardContent className="p-8">
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <h3 className="text-xl font-bold text-primary mb-2">Section {num}:</h3>
                             <p className="text-sky/60 text-sm">All the necessary information about this section. This can be anything like travel section, hotel or any other activity.</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-sky/40 hover:text-red-500"><Trash2 size={20} /></Button>
                       </div>
                       
                       <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-sky/60 ml-1">Date Range:</label>
                             <div className="h-12 flex items-center px-4 rounded-xl bg-muted/50 border border-border text-sm font-medium text-primary">
                                xxx to yyy
                             </div>
                          </div>
                          <div className="flex-1 space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-sky/60 ml-1">Budget of this section:</label>
                             <div className="h-12 flex items-center px-4 rounded-xl bg-muted/50 border border-border text-sm font-medium text-primary">
                                ₹ 12,000
                             </div>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
               ))}
            </div>

            <div className="flex justify-center pt-8">
               <Button className="h-14 px-10 bg-white border-2 border-dashed border-border text-primary hover:border-accent hover:bg-accent/5 font-bold rounded-2xl flex items-center gap-3">
                  <Plus className="text-accent" /> Add another Section
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
