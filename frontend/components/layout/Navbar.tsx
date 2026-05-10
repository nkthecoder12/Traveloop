"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Menu, X, Globe } from "lucide-react"

import Image from "next/image"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore India", href: "/explore" },
  { name: "Plan Trip", href: "/dashboard/ai-planner" },
  { name: "Community", href: "/dashboard/community" },
  { name: "Offers", href: "/offers" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12",
        isScrolled 
          ? "bg-primary text-white shadow-xl py-3" 
          : "bg-white text-primary shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl">
            <Image 
              src="/logo.png" 
              alt="Traveloop Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <span className={cn(
            "text-2xl font-bold font-heading tracking-tight",
            isScrolled ? "text-white" : "text-primary"
          )}>
            Traveloop
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold uppercase tracking-wider transition-colors duration-200",
                isScrolled ? "text-white/80 hover:text-accent" : "text-primary/70 hover:text-accent"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <Button 
              variant="ghost" 
              className={cn(
                "font-bold",
                isScrolled ? "text-white hover:text-accent" : "text-primary hover:text-accent"
              )}
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className={cn(
              "shadow-lg font-bold",
              isScrolled ? "bg-accent text-primary hover:bg-accent/90" : "bg-primary text-white hover:bg-primary/90"
            )}>
              Join Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden transition-colors",
            isScrolled ? "text-white" : "text-primary"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-primary hover:text-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr />
              <div className="flex flex-col gap-3">
                <Link href="/auth/login" className="w-full">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
