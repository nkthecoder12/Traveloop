"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Wallet,
  Calendar,
  Share2,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Search,
  Plus
} from "lucide-react"

const features = [
  {
    title: "AI Trip Planner",
    description: "Auto-generate smart itineraries based on your preferences and budget.",
    icon: Sparkles,
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Smart Budget Estimator",
    description: "Predict travel expenses in ₹ dynamically and track your spending in real-time.",
    icon: Wallet,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Drag & Drop Timeline",
    description: "Reorganize your plans visually with our intuitive timeline builder.",
    icon: Calendar,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Public Trip Sharing",
    description: "Share your amazing itineraries with friends or the Traveloop community.",
    icon: Share2,
    color: "bg-sky/10 text-sky",
  },
  {
    title: "Packing Checklist",
    description: "AI-powered suggestions to ensure you never forget your essentials.",
    icon: CheckCircle2,
    color: "bg-accent/10 text-accent",
  },
]

const destinations = [
  { name: "Leh Ladakh, India", image: "/images/ladakh.png", budget: "₹45,000+", rating: 4.9, season: "Summer" },
  { name: "Munnar, Kerala", image: "/images/kerala.png", budget: "₹25,000+", rating: 4.8, season: "Monsoon" },
  { name: "Jaipur, Rajasthan", image: "/images/jaipur.png", budget: "₹35,000+", rating: 5.0, season: "Winter" },
]

const testimonials = [
  {
    name: "Aravind Kumar",
    role: "Solo Traveler",
    content: "Traveloop transformed how I plan my trips. The AI suggestions were spot on for my Tokyo adventure!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    name: "Sarah Miller",
    role: "Digital Nomad",
    content: "The budget tracking is a lifesaver. I can finally see where my money goes while traveling the world.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ladakh.png"
              alt="Indian Landscape"
              fill
              className="object-cover brightness-75 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-white" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 drop-shadow-lg">
                Discover India.<br />Powered by AI.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
                Experience the future of travel planning with India's first AI-powered multi-city itinerary builder.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="h-14 px-10 text-lg bg-accent text-primary hover:bg-accent/90">
                    Start Planning
                  </Button>
                </Link>
                <Link href="/community">
                  <Button size="lg" variant="secondary" className="h-14 px-10 text-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 shadow-none text-white">
                    Explore Trips
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Wireframe Search Bar Section */}
          <div className="absolute bottom-10 left-0 right-0 z-30 px-6">
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <Search className="w-5 h-5 text-sky/60" />
                <input
                  type="text"
                  placeholder="Search destinations, culture, or experiences..."
                  className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
                <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
                <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Top Regional Selections (Screen 3) */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold font-heading text-primary whitespace-nowrap">Top Regional Selections</h2>
              <div className="h-[1px] w-full bg-border" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { name: "North India", img: "/images/ladakh.png" },
                { name: "South India", img: "/images/kerala.png" },
                { name: "West India", img: "/images/jaipur.png" },
                { name: "East India", img: "/images/santorini.png" },
                { name: "Central India", img: "/images/hero.png" },
              ].map((region, i) => (
                <motion.div
                  key={region.name}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square rounded-3xl overflow-hidden mb-3 shadow-md relative">
                    <Image src={region.img} alt={region.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-center px-4 drop-shadow-md">{region.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Trips (Screen 3) */}
        <section className="py-20 px-6 md:px-12 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-bold font-heading text-primary whitespace-nowrap">Previous Trips</h2>
              <div className="h-[1px] w-full bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-[3/4] relative">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{dest.season}</p>
                      <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dest.budget}</span>
                        <Button size="sm" variant="ghost" className="text-white hover:text-accent p-0 h-auto font-bold">View Trip</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-primary mb-4">
                What Our Travelers Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass p-8 md:p-12 rounded-3xl border-primary/5 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary">{t.name}</h4>
                      <p className="text-sky/70 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-primary/80 text-lg italic leading-relaxed">
                    "{t.content}"
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -ml-32 -mb-32" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold font-heading text-white mb-8">
                Ready to plan your<br />next escape?
              </h2>
              <p className="text-sky/80 text-xl mb-12 max-w-2xl mx-auto font-heading">
                Join thousands of travelers who use Traveloop to orchestrate their dream journeys.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link href="/auth/signup">
                  <Button size="lg" className="h-16 px-12 text-xl bg-accent hover:bg-accent/90">
                    Get Started Free
                  </Button>
                </Link>
                <p className="text-white/60 text-sm font-heading">No credit card required.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Plan a trip FAB (Screen 3) */}
      <Link href="/dashboard/ai-planner">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 group"
        >
          <div className="bg-accent text-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Plus size={20} />
          </div>
          <span className="font-bold text-sm tracking-wide pr-2">Plan a trip</span>
        </motion.button>
      </Link>
    </div>
  )
}
