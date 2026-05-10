"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  Moon,
  ChevronRight,
  Camera,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsSections = [
  { id: "profile", label: "Profile Information", icon: User, desc: "Manage your personal details and travel bio." },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Control how we alert you about trip updates." },
  { id: "security", label: "Security & Privacy", icon: Shield, desc: "Update password and manage 2FA settings." },
  { id: "language", label: "Language & Region", icon: Globe, desc: "Set your preferred currency and language." },
  { id: "billing", label: "Billing & Plans", icon: CreditCard, desc: "Manage your Pro subscription and payments." },
]

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
         <h1 className="text-3xl font-bold font-heading text-primary mb-2">Account Settings</h1>
         <p className="text-sky/80">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
           {settingsSections.map((section) => (
             <button
               key={section.id}
               className={cn(
                 "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 text-left group",
                 section.id === "profile" 
                  ? "bg-white shadow-sm border border-border text-primary font-bold" 
                  : "text-sky/60 hover:bg-white/50 hover:text-primary"
               )}
             >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  section.id === "profile" ? "bg-accent text-primary" : "bg-muted group-hover:bg-white"
                )}>
                   <section.icon size={20} />
                </div>
                <div className="flex-1">
                   <p className="text-sm">{section.label}</p>
                </div>
                <ChevronRight size={16} className={cn(
                  "transition-transform",
                  section.id === "profile" ? "text-accent" : "text-sky/20 group-hover:translate-x-1"
                )} />
             </button>
           ))}
           <hr className="my-6 border-border" />
           <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors group">
              <div className="p-2 rounded-xl bg-red-100 group-hover:bg-red-200">
                 <LogOut size={20} />
              </div>
              <span className="text-sm font-bold">Log Out</span>
           </button>
        </div>

        {/* Content Area (Screen 7) */}
        <div className="md:col-span-2 space-y-12">
           {/* Profile Header (Screen 7) */}
           <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
              <CardContent className="p-10">
                 <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group shrink-0">
                       <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-muted shadow-2xl">
                          <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
                       </div>
                       <button className="absolute bottom-2 right-2 p-3 bg-accent text-primary rounded-2xl shadow-lg hover:scale-110 transition-transform">
                          <Camera size={20} />
                       </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <h3 className="text-3xl font-bold text-primary font-heading">Alex Johnson</h3>
                          <Button variant="outline" className="h-10 border-border rounded-xl font-bold">Edit Profile</Button>
                       </div>
                       <p className="text-sky/60 text-lg mb-6 leading-relaxed">
                          Avid traveler, mountain lover, and photography enthusiast. Always looking for the next hidden gem in India.
                       </p>
                       <div className="flex flex-wrap justify-center md:justify-start gap-4">
                          <div className="bg-muted px-4 py-2 rounded-xl text-xs font-bold text-sky/60 uppercase tracking-widest">12 Trips</div>
                          <div className="bg-muted px-4 py-2 rounded-xl text-xs font-bold text-sky/60 uppercase tracking-widest">24 Cities</div>
                          <div className="bg-muted px-4 py-2 rounded-xl text-xs font-bold text-sky/60 uppercase tracking-widest">Premium</div>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* Preplanned Trips (Screen 7) */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold font-heading text-primary whitespace-nowrap">Preplanned Trips</h2>
                <div className="h-[1px] w-full bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                   { name: "Kerala Escape", img: "/images/paris.png" },
                   { name: "Himachal Trek", img: "/images/tokyo.png" },
                   { name: "Goa Weekend", img: "/images/hero.png" },
                 ].map((trip) => (
                   <Card key={trip.name} className="border-none shadow-sm overflow-hidden group rounded-2xl">
                      <div className="aspect-[4/5] relative">
                         <img src={trip.img} alt={trip.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                         <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-bold text-sm mb-3">{trip.name}</p>
                            <Button size="sm" className="w-full h-8 bg-white text-primary hover:bg-accent hover:text-white border-none text-xs font-bold">View</Button>
                         </div>
                      </div>
                   </Card>
                 ))}
              </div>
           </div>

           {/* Previous Trips (Screen 7) */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold font-heading text-primary whitespace-nowrap">Previous Trips</h2>
                <div className="h-[1px] w-full bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                   { name: "Royal Rajasthan", img: "/images/tokyo.png" },
                   { name: "Munnar Bliss", img: "/images/santorini.png" },
                   { name: "Varanasi Walk", img: "/images/hero.png" },
                 ].map((trip) => (
                   <Card key={trip.name} className="border-none shadow-sm overflow-hidden group rounded-2xl">
                      <div className="aspect-[4/5] relative">
                         <img src={trip.img} alt={trip.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                         <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-bold text-sm mb-3">{trip.name}</p>
                            <Button size="sm" className="w-full h-8 bg-white text-primary hover:bg-accent hover:text-white border-none text-xs font-bold">View</Button>
                         </div>
                      </div>
                   </Card>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
