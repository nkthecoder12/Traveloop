"use client"

import React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Tag, 
  Gift, 
  CreditCard, 
  Plane, 
  Hotel, 
  Clock,
  Sparkles,
  ChevronRight,
  Percent
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "All Offers", icon: Tag },
  { id: "flights", name: "Flights", icon: Plane },
  { id: "hotels", name: "Staycations", icon: Hotel },
  { id: "cards", name: "Bank Offers", icon: CreditCard },
]

const offers = [
  {
    id: 1,
    title: "Flat ₹5,000 Off on Bali Packages",
    description: "Book any Bali group tour and get instant discount. Valid for first 50 bookings.",
    code: "BALI5000",
    expiry: "Valid till 30 May",
    type: "Staycations",
    color: "bg-blue-600",
    icon: Sparkles
  },
  {
    id: 2,
    title: "15% Off with HDFC Credit Cards",
    description: "Get up to ₹2,500 instant discount on flight bookings above ₹15,000.",
    code: "HDFCFLY",
    expiry: "Valid till 15 June",
    type: "Bank Offers",
    color: "bg-indigo-700",
    icon: CreditCard
  },
  {
    id: 3,
    title: "Complimentary Breakfast + Spa",
    description: "Book luxury villas in Goa or Kerala and get premium add-ons for free.",
    code: "LUXEBHARAT",
    expiry: "Limited Time",
    type: "Staycations",
    color: "bg-emerald-600",
    icon: Gift
  },
  {
    id: 4,
    title: "Domestic Flights: No Convenience Fee",
    description: "Enjoy zero convenience fee on all domestic flight bookings this weekend.",
    code: "FREEBIE",
    expiry: "Ends in 2 days",
    type: "Flights",
    color: "bg-orange-600",
    icon: Plane
  }
]

export default function OffersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold font-heading text-primary mb-2">Exclusive Deals</h1>
            <p className="text-sky/80 text-lg">Handpicked offers and discounts to make your journey more rewarding.</p>
          </div>
          <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-white hover:shadow-sm text-sky/60 hover:text-primary"
               >
                  <cat.icon size={16} />
                  {cat.name}
               </button>
             ))}
          </div>
        </div>

        {/* Referral Banner */}
        <div className="bg-gradient-to-r from-accent to-accent/80 rounded-[3rem] p-10 text-primary relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                 <div className="flex items-center gap-3">
                    <div className="bg-white/30 p-2 rounded-xl">
                       <Gift className="text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Referral Program</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold font-heading">Earn ₹1,000 for every friend</h2>
                 <p className="text-primary/70 text-lg leading-relaxed font-medium">Invite your fellow travelers to Traveloop. When they book their first trip, you both get ₹1,000 Traveloop Credits.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                 <div className="bg-white/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 shadow-inner">
                    <span className="text-2xl font-bold font-heading">MYCODE2024</span>
                 </div>
                 <Button className="h-14 px-10 bg-primary text-white hover:bg-primary/90 border-none font-bold rounded-xl shadow-lg transition-all w-full">
                    Share Referral Link
                 </Button>
              </div>
           </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {offers.map((offer) => (
             <motion.div
               key={offer.id}
               whileHover={{ y: -8 }}
             >
                <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group rounded-[2.5rem] bg-white h-full flex flex-col">
                   <div className={cn("h-3 font-bold", offer.color)} />
                   <CardContent className="p-10 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                         <div className={cn("p-4 rounded-2xl text-white shadow-lg", offer.color)}>
                            <offer.icon size={28} />
                         </div>
                         <div className="bg-muted px-4 py-2 rounded-xl flex items-center gap-2">
                            <Clock size={14} className="text-sky/60" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-sky/60">{offer.expiry}</span>
                         </div>
                      </div>
                      
                      <div className="mb-8">
                         <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2 block">{offer.type}</span>
                         <h3 className="text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">{offer.title}</h3>
                         <p className="text-sky/60 text-lg leading-relaxed">{offer.description}</p>
                    </div>

                    <div className="mt-auto pt-8 border-t border-dashed border-border flex items-center justify-between gap-6">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-sky/40">Coupon Code</p>
                          <p className="text-xl font-bold font-heading text-primary">{offer.code}</p>
                       </div>
                       <Button className="h-14 px-8 bg-muted text-primary hover:bg-primary hover:text-white border-none font-bold rounded-xl transition-all flex items-center gap-2">
                          Copy & Use <ChevronRight size={18} />
                       </Button>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
         ))}
      </div>

      {/* Rewards Tiers Section */}
      <div className="bg-muted/30 rounded-[3rem] p-12 text-center space-y-8 border border-border/50">
         <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold font-heading text-primary">Traveloop Rewards Program</h2>
            <p className="text-sky/60 leading-relaxed">Join our loyalty program to unlock even deeper discounts and premium concierge services as you travel more.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { level: "Silver", trips: "3 Trips", color: "text-slate-400" },
              { level: "Gold", trips: "7 Trips", color: "text-yellow-600" },
              { level: "Platinum", trips: "15+ Trips", color: "text-sky-600" },
            ].map((tier) => (
              <div key={tier.level} className="p-8 rounded-[2rem] bg-white shadow-sm border border-border/20">
                 <Percent className={cn("mx-auto mb-4 w-8 h-8", tier.color)} />
                 <h4 className="text-2xl font-bold text-primary mb-1">{tier.level}</h4>
                 <p className="text-xs font-bold text-sky/40 uppercase tracking-widest">{tier.trips} completed</p>
              </div>
            ))}
         </div>
      </div>
    </main>

    <Footer />
  </div>
  )
}
