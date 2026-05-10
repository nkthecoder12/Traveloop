"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Globe, Check, Camera } from "lucide-react"
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { cn } from "@/lib/utils"

const preferences = [
  { id: "adventure", label: "Adventure", icon: "🧗" },
  { id: "luxury", label: "Luxury", icon: "✨" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "solo", label: "Solo", icon: "🧘" },
  { id: "couple", label: "Couple", icon: "👩‍❤️‍👨" },
  { id: "family", label: "Family", icon: "👨‍👩-👧‍👦" },
]

export default function SignupPage() {
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([])

  const togglePreference = (id: string) => {
    setSelectedPrefs(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-2 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/taj_mahal.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full py-4 px-6 bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-4">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-xl shadow-md">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold font-heading text-primary tracking-tight">Traveloop</span>
          </Link>
          <h2 className="text-xl font-bold font-heading text-primary">Create Your Account</h2>
          <p className="text-sky/60 text-[10px]">Start your journey with Traveloop today.</p>
        </div>

        <form className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">City</label>
              <input
                type="text"
                placeholder="City"
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Country</label>
              <input
                type="text"
                placeholder="Country"
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Additional Information</label>
            <input
              type="text"
              placeholder="e.g. Travel preferences, diet..."
              className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
            />
          </div>

          <Button className="w-full h-10 text-xs shadow-md bg-primary hover:bg-primary/90 font-bold rounded-lg mt-2">
            Register Users
          </Button>
        </form>

        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[9px] uppercase">
            <span className="bg-white px-2 text-sky/40">Or sign up with</span>
          </div>
        </div>

        <div className="mt-3">
          <Button variant="outline" className="w-full border-border hover:bg-muted/50 h-9 text-[10px] rounded-lg">
            <FaGoogle className="w-3.5 h-3.5 mr-2" />
            Continue with Google
          </Button>
        </div>

        <p className="mt-4 text-center text-[10px] text-sky/80">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
