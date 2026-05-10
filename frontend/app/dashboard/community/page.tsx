"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Share2, 
  Copy,
  ArrowUpRight,
  Heart,
  MessageCircle,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

const publicTrips = [
  {
    id: 1,
    user: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    title: "Spiritual Varanasi: 3 Day Guide",
    location: "Uttar Pradesh, India",
    rating: 4.9,
    views: "1.2k",
    likes: 420,
    image: "/images/paris.png",
    tags: ["Culture", "Spirituality", "Photography"]
  },
  {
    id: 2,
    user: "Arjun Mehta",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    title: "The Ultimate Goa Beach Guide",
    location: "Goa, India",
    rating: 4.8,
    views: "3.5k",
    likes: 850,
    image: "/images/tokyo.png",
    tags: ["Beach", "Parties", "Food"]
  },
  {
    id: 3,
    user: "Ananya Iyer",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    title: "Kerala Backwaters & Tea Gardens",
    location: "Kerala, India",
    rating: 5.0,
    views: "2.1k",
    likes: 630,
    image: "/images/santorini.png",
    tags: ["Nature", "Relaxation", "Greenery"]
  },
  {
    id: 4,
    user: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    title: "Royal Jaipur: Forts & Palaces",
    location: "Rajasthan, India",
    rating: 4.7,
    views: "1.8k",
    likes: 310,
    image: "/images/hero.png",
    tags: ["History", "Architecture", "Royal"]
  }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("Trending")
  const tabs = ["Trending", "Newest", "Featured", "My Shared"]

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
            <Users className="text-accent" /> Traveloop Community
          </h1>
          <p className="text-sky/80">Discover and fork amazing itineraries shared by fellow travelers.</p>
        </div>
        <Button variant="outline" className="h-12 px-6 rounded-xl border-border">
          <Share2 className="w-4 h-4 mr-2" />
          Share My Trip
        </Button>
      </div>

      {/* Featured Banner */}
      <div className="relative h-[300px] rounded-[2rem] overflow-hidden group shadow-xl">
        <img 
          src="/images/hero.png" 
          alt="Featured Trip" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="bg-accent text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Featured Itinerary</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-heading">The Great Himalayan Road Trip</h2>
            <p className="text-white/80 text-sm line-clamp-2">Experience the majesty of the Manali-Leh highway, the high passes, and the Pangong Tso in this meticulously planned 14-day journey.</p>
          </div>
          <Button className="h-12 px-8 bg-white text-primary hover:bg-accent hover:text-white border-none font-bold shrink-0">
            Fork Itinerary <Copy className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Screen 10 Search Bar Layout */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-2">
          <Search className="w-5 h-5 text-sky/60" />
          <input 
            type="text" 
            placeholder="Search bar ...." 
            className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
          <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
        </div>
      </div>

      <div className="text-center py-6">
         <h2 className="text-2xl font-bold font-heading text-primary">Community tab</h2>
      </div>

      {/* Community Feed List (Screen 10 Style) */}
      <div className="grid grid-cols-1 gap-8">
        {publicTrips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group h-full flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-[2rem]">
               <div className="w-24 h-24 rounded-full border-4 border-muted overflow-hidden shrink-0 shadow-lg">
                  <img src={trip.avatar} alt={trip.user} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">
                          {trip.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sky/60 text-[10px] font-bold uppercase tracking-widest">
                          <MapPin size={12} className="text-accent" /> {trip.location}
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-xs font-bold text-sky/40">
                        <div className="flex items-center gap-1"><Eye size={14} /> {trip.views}</div>
                        <div className="flex items-center gap-1 text-red-400"><Heart size={14} className="fill-red-400" /> {trip.likes}</div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-muted/30">
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-accent">
                           <Star size={14} className="fill-accent" />
                           <span className="text-xs font-bold">{trip.rating}</span>
                        </div>
                        <div className="text-xs font-bold text-primary">{trip.user}</div>
                     </div>
                     <Button className="h-10 px-6 rounded-xl font-bold bg-muted text-primary hover:bg-accent hover:text-white border-none transition-all">View Full Post</Button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" className="border-border px-12 h-12 text-sky/60 hover:text-primary">
          Load More Itineraries
        </Button>
      </div>
    </div>
  )
}
