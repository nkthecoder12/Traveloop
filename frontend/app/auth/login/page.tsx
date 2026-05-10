"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Globe } from "lucide-react"
import { FaGithub, FaGoogle } from "react-icons/fa6"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kerala.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full py-6 px-8 bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10 overflow-hidden rounded-2xl shadow-lg">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold font-heading text-primary tracking-tight">Traveloop</span>
          </Link>
          <h2 className="text-2xl font-bold font-heading text-primary mb-1">Welcome Back</h2>
          <p className="text-sky/60 text-sm text-center">Log in to start planning your next escape.</p>
        </div>

        {/* Compact Photo Placeholder */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-muted border-2 border-white shadow-lg flex items-center justify-center mb-2 relative group overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-sky/40">Photo</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-sky/60 ml-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full h-10 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-xs font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-sky/60 ml-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-xs font-medium"
            />
          </div>

          <Button className="w-full h-12 text-sm shadow-lg bg-primary hover:bg-primary/90 font-bold rounded-xl">
            Login Button
          </Button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-4 text-sky/60">Or continue with</span>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline" className="w-full border-border hover:bg-muted/50 h-10 text-xs rounded-xl">
            <FaGoogle className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-sky/80">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-accent font-bold hover:underline">
            Start Planning Free
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
