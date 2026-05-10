"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  MapPin, 
  Search, 
  TrendingUp, 
  Compass, 
  Heart,
  Camera,
  Star,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const regions = [
  { name: "North India", count: "45 Destinations", color: "bg-blue-50 text-blue-600" },
  { name: "South India", count: "32 Destinations", color: "bg-emerald-50 text-emerald-600" },
  { name: "West India", count: "28 Destinations", color: "bg-orange-50 text-orange-600" },
  { name: "East India", count: "15 Destinations", color: "bg-purple-50 text-purple-600" },
]

const topDestinations = [
  {
    id: 1,
    name: "Agra",
    description: "Home of the Taj Mahal and rich Mughal history.",
    image: "/images/taj_mahal.png",
    rating: 4.9,
    category: "Heritage"
  },
  {
    id: 2,
    name: "Alleppey",
    description: "The Venice of the East, famous for its backwaters.",
    image: "/images/kerala.png",
    rating: 4.8,
    category: "Nature"
  },
  {
    id: 3,
    name: "Leh Ladakh",
    description: "Breathtaking landscapes and high-altitude adventures.",
    image: "/images/ladakh.png",
    rating: 5.0,
    category: "Adventure"
  },
  {
    id: 4,
    name: "Jaipur",
    description: "The Pink City, known for its royal palaces and forts.",
    image: "/images/jaipur.png",
    rating: 4.7,
    category: "Culture"
  }
]

export default function ExploreIndiaPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold font-heading text-primary mb-2">Explore Bharat</h1>
          <p className="text-sky/80 text-lg">Discover the hidden gems and iconic landmarks across the subcontinent.</p>
        </div>
        <div className="relative w-full md:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky/40 w-5 h-5" />
           <input 
             type="text" 
             placeholder="Search destinations, states, or cultures..." 
             className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border focus:outline-none focus:border-accent bg-white shadow-sm font-medium"
           />
        </div>
      </div>

      {/* Region Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {regions.map((region) => (
           <motion.div
             key={region.name}
             whileHover={{ y: -5 }}
             className={cn("p-6 rounded-[2rem] border border-transparent hover:border-accent/20 cursor-pointer transition-all shadow-sm", region.color)}
           >
              <h3 className="text-xl font-bold mb-1">{region.name}</h3>
              <p className="text-xs font-bold opacity-70 uppercase tracking-widest">{region.count}</p>
           </motion.div>
         ))}
      </div>

      {/* Featured Destination */}
      <div className="relative h-[450px] rounded-[3rem] overflow-hidden group shadow-2xl">
         <img src="/images/ladakh.png" alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
         <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
               <span className="bg-accent text-primary text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block shadow-lg">Adventure of the Month</span>
               <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading leading-tight">Mystical Landscapes of Ladakh</h2>
               <p className="text-white/80 text-lg leading-relaxed">Join us for a spiritual and adventurous journey through the high passes of the Himalayas. Experience the magic of Pangong Tso and ancient monasteries.</p>
            </div>
            <Button className="h-16 px-10 bg-white text-primary hover:bg-accent hover:text-white border-none font-bold rounded-2xl shadow-xl flex items-center gap-3 transition-all">
               Explore Itinerary <ArrowRight size={20} />
            </Button>
         </div>
      </div>

      {/* Trending Destinations Grid */}
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-3">
               <TrendingUp className="text-accent" /> Trending Destinations
            </h2>
            <Button variant="link" className="text-accent font-bold">View All Cities</Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                 <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-[2.5rem] bg-white h-full">
                    <div className="relative h-64 overflow-hidden">
                       <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-bold text-primary">{dest.rating}</span>
                       </div>
                       <div className="absolute bottom-4 left-4">
                          <span className="bg-primary/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
                             {dest.category}
                          </span>
                       </div>
                    </div>
                    <CardContent className="p-8">
                       <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{dest.name}</h3>
                       <p className="text-sky/60 text-sm leading-relaxed mb-6 line-clamp-2">{dest.description}</p>
                       <Button className="w-full h-12 bg-muted text-primary hover:bg-accent hover:text-white border-none font-bold rounded-xl transition-all">
                          Plan Visit
                       </Button>
                    </CardContent>
                 </Card>
              </motion.div>
            ))}
         </div>
      </div>

      {/* Cultural Experiences Section */}
      <div className="bg-primary rounded-[3rem] p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">Immerse Yourself in Indian Culture</h2>
               <p className="text-sky/20 text-lg leading-relaxed italic">"A nation's culture resides in the hearts and in the soul of its people."</p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <div className="text-accent text-3xl font-bold">500+</div>
                     <p className="text-xs font-bold uppercase tracking-widest opacity-60">Cultural Guides</p>
                  </div>
                  <div className="space-y-2">
                     <div className="text-accent text-3xl font-bold">100%</div>
                     <p className="text-xs font-bold uppercase tracking-widest opacity-60">Authentic Tours</p>
                  </div>
               </div>
               <Button className="h-14 px-10 bg-accent text-primary hover:bg-white border-none font-bold rounded-2xl shadow-xl transition-all">
                  Browse Experiences
               </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                  <div className="h-64 rounded-3xl overflow-hidden shadow-2xl">
                     <img src="/images/jaipur.png" alt="Culture 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-44 rounded-3xl overflow-hidden shadow-2xl">
                     <img src="/images/kerala.png" alt="Culture 2" className="w-full h-full object-cover" />
                  </div>
               </div>
               <div className="space-y-4 pt-12">
                  <div className="h-44 rounded-3xl overflow-hidden shadow-2xl">
                     <img src="/images/taj_mahal.png" alt="Culture 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-64 rounded-3xl overflow-hidden shadow-2xl">
                     <img src="/images/hero.png" alt="Culture 4" className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
