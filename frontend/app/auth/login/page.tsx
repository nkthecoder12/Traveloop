"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Globe, Loader2, User } from "lucide-react"
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login({ email, password })
      router.push("/dashboard")
    } catch (err: any) {
      // Error is handled by the auth context
      console.error("Login error:", err)
    }
  }

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

        {/* User Icon Placeholder */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-muted border-2 border-white shadow-lg flex items-center justify-center mb-2 relative group overflow-hidden">
            <User className="w-10 h-10 text-sky/40" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-sky/40">Traveloop User</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-sky/60 ml-1">Email</label>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-xs font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-sky/60 ml-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-4 rounded-xl border border-border focus:outline-none focus:border-accent bg-muted/30 text-xs font-medium"
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-sm shadow-lg bg-primary hover:bg-primary/90 font-bold rounded-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
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
