"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Plus, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Tag, 
  Briefcase,
  Plane
} from "lucide-react"
import { cn } from "@/lib/utils"

const travelStyles = ["Adventure", "Luxury", "Budget", "Family", "Solo", "Nature"]
const interestOptions = ["Food", "Photography", "Trekking", "Shopping", "Culture"]

export default function CreateTripPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    destinations: [] as string[],
    startDate: "",
    endDate: "",
    budget: "",
    style: "Adventure",
    interests: [] as string[]
  })
  const [destInput, setDestInput] = useState("")

  const addDestination = () => {
    if (destInput.trim() && !formData.destinations.includes(destInput.trim())) {
      setFormData({ ...formData, destinations: [...formData.destinations, destInput.trim()] })
      setDestInput("")
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd save this to a store or DB
    // For now, we'll pass it via state or just redirect to the builder
    router.push("/dashboard/trips/builder")
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent shadow-lg mb-6">
          <Plane size={32} />
        </div>
        <h1 className="text-4xl font-black font-heading text-primary tracking-tighter">Start Your Next Chapter</h1>
        <p className="text-sky/60 text-lg max-w-xl mx-auto font-medium">
          Fill in the basics and we'll unlock your interactive trip builder.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-10 space-y-10">
          {/* Trip Name */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
               <Tag size={14} className="text-accent" /> Trip Name
            </label>
            <input 
              type="text" 
              placeholder="e.g. South India Explorer"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full h-16 px-8 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-lg font-bold text-primary"
              required
            />
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
               <MapPin size={14} className="text-accent" /> Destinations
            </label>
            <div className="flex gap-4">
               <div className="relative flex-1">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-sky/40" />
                  <input 
                    type="text" 
                    placeholder="Search cities..."
                    value={destInput}
                    onChange={(e) => setDestInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDestination())}
                    className="w-full h-16 pl-14 pr-8 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold text-primary"
                  />
               </div>
               <Button 
                type="button" 
                onClick={addDestination}
                className="h-16 px-8 rounded-2xl bg-primary text-white font-bold"
               >
                 Add
               </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <AnimatePresence>
                {formData.destinations.map((dest) => (
                  <motion.span
                    key={dest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-bold flex items-center gap-2"
                  >
                    {dest}
                    <button onClick={() => setFormData({...formData, destinations: formData.destinations.filter(d => d !== dest)})} className="hover:text-primary">×</button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Dates & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                 <Calendar size={14} className="text-accent" /> Start Date
              </label>
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full h-16 px-6 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold text-primary appearance-none"
                required
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                 <Calendar size={14} className="text-accent" /> End Date
              </label>
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full h-16 px-6 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold text-primary appearance-none"
                required
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                 <DollarSign size={14} className="text-accent" /> Budget
              </label>
              <input 
                type="text" 
                placeholder="₹ 20,000"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full h-16 px-6 rounded-2xl bg-muted/30 border-2 border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold text-primary"
                required
              />
            </div>
          </div>

          {/* Style */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
               <Compass size={14} className="text-accent" /> Travel Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
               {travelStyles.map((style) => (
                 <div 
                   key={style}
                   onClick={() => setFormData({...formData, style})}
                   className={cn(
                     "h-14 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest cursor-pointer border-2 transition-all",
                     formData.style === style 
                       ? "bg-primary text-white border-primary shadow-lg scale-105" 
                       : "bg-muted/30 text-primary/40 border-transparent hover:bg-muted/50"
                   )}
                 >
                   {style}
                 </div>
               ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
               <Sparkles size={14} className="text-accent" /> Interests
            </label>
            <div className="flex flex-wrap gap-3">
               {interestOptions.map((interest) => (
                 <button
                   key={interest}
                   type="button"
                   onClick={() => toggleInterest(interest)}
                   className={cn(
                     "px-6 py-3 rounded-xl text-xs font-bold transition-all border-2",
                     formData.interests.includes(interest)
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-muted/30 border-transparent text-primary/40 hover:bg-muted/50"
                   )}
                 >
                   {interest}
                 </button>
               ))}
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full h-20 rounded-[2rem] bg-accent text-primary font-black text-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
             Continue to Trip Builder <ArrowRight className="ml-3 w-8 h-8" />
          </Button>
        </Card>
      </form>
    </div>
  )
}
