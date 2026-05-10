"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Globe, Check, Camera, Loader2 } from "lucide-react"
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"

const preferences = [
  { id: "adventure", label: "Adventure", icon: "🧗" },
  { id: "luxury", label: "Luxury", icon: "✨" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "solo", label: "Solo", icon: "🧘" },
  { id: "couple", label: "Couple", icon: "👩‍❤️‍👨" },
  { id: "family", label: "Family", icon: "👨‍👩-👧‍👦" },
]

export default function SignupPage() {
  const router = useRouter()
  const { register, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    addInfo: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      // This will be handled by the auth context
      return
    }

    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: 'CUSTOMER'
      })
      router.push("/dashboard")
    } catch (err: any) {
      // Error is handled by the auth context
      console.error("Registration error:", err)
    }
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

        <form className="space-y-3" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">New Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-widest text-sky/60 ml-1">Additional Info</label>
            <input
              type="text"
              name="addInfo"
              placeholder="Travel preferences..."
              value={formData.addInfo}
              onChange={handleChange}
              className="w-full h-9 px-3 rounded-lg border border-border focus:outline-none focus:border-accent bg-muted/20 text-xs font-medium"
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full h-10 text-xs shadow-md bg-primary hover:bg-primary/90 font-bold rounded-lg mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
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
