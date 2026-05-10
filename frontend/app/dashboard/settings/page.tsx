"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  ChevronRight,
  Camera,
  LogOut,
  Mail,
  Smartphone,
  Lock,
  Key,
  Eye,
  Languages,
  Banknote,
  MapPin
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const settingsSections = [
  { id: "profile", label: "Profile Information", icon: User, desc: "Manage your personal details and travel bio." },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Control how we alert you about trip updates." },
  { id: "security", label: "Security & Privacy", icon: Shield, desc: "Update password and manage 2FA settings." },
  { id: "language", label: "Language & Region", icon: Globe, desc: "Set your preferred currency and language." },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, clear session/cookies here
    router.push("/auth/login")
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div>
         <h1 className="text-3xl font-black font-heading text-primary mb-2">Account Settings</h1>
         <p className="text-sky/60 font-medium">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
           {settingsSections.map((section) => (
             <button
               key={section.id}
               onClick={() => setActiveTab(section.id)}
               className={cn(
                 "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 text-left group",
                 activeTab === section.id 
                  ? "bg-white shadow-sm border border-border text-primary font-bold" 
                  : "text-sky/60 hover:bg-white/50 hover:text-primary"
               )}
             >
                <div className={cn(
                   "p-2 rounded-xl transition-colors",
                   activeTab === section.id ? "bg-accent text-primary" : "bg-muted group-hover:bg-white"
                )}>
                   <section.icon size={20} />
                </div>
                <div className="flex-1">
                   <p className="text-sm">{section.label}</p>
                </div>
                <ChevronRight size={16} className={cn(
                   "transition-transform",
                   activeTab === section.id ? "text-accent translate-x-1" : "text-sky/20 group-hover:translate-x-1"
                )} />
             </button>
           ))}
           <hr className="my-6 border-border" />
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors group"
           >
              <div className="p-2 rounded-xl bg-red-100 group-hover:bg-red-200">
                 <LogOut size={20} />
              </div>
              <span className="text-sm font-bold">Log Out</span>
           </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 min-h-[600px]">
           {activeTab === "profile" && (
             <div className="space-y-8">
               <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
                  <CardContent className="p-10">
                     <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group shrink-0">
                           <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-muted shadow-2xl">
                              <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" className="w-full h-full object-cover" />
                           </div>
                           <button className="absolute bottom-1 right-1 p-2 bg-accent text-primary rounded-xl shadow-lg hover:scale-110 transition-transform">
                              <Camera size={16} />
                           </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <h3 className="text-3xl font-bold text-primary font-heading">Alex Johnson</h3>
                              <Button className="h-10 bg-primary text-white rounded-xl font-bold px-6">Save Changes</Button>
                           </div>
                           <p className="text-sky/60 font-medium mb-6 leading-relaxed">
                              Avid traveler, mountain lover, and photography enthusiast. Always looking for the next hidden gem in India.
                           </p>
                           <div className="flex flex-wrap justify-center md:justify-start gap-3">
                              <div className="bg-muted px-4 py-2 rounded-xl text-[10px] font-black text-sky/60 uppercase tracking-widest">12 Trips</div>
                              <div className="bg-muted px-4 py-2 rounded-xl text-[10px] font-black text-sky/60 uppercase tracking-widest">24 Cities</div>
                              <div className="bg-muted px-4 py-2 rounded-xl text-[10px] font-black text-sky/60 uppercase tracking-widest">Premium Member</div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-primary/30 ml-1">First Name</label>
                     <input type="text" defaultValue="Alex" className="w-full h-12 px-6 rounded-xl bg-white border border-border text-sm font-bold text-primary" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-primary/30 ml-1">Last Name</label>
                     <input type="text" defaultValue="Johnson" className="w-full h-12 px-6 rounded-xl bg-white border border-border text-sm font-bold text-primary" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                     <label className="text-xs font-black uppercase tracking-widest text-primary/30 ml-1">Email Address</label>
                     <input type="email" defaultValue="alex.j@traveloop.com" className="w-full h-12 px-6 rounded-xl bg-white border border-border text-sm font-bold text-primary" />
                  </div>
               </div>
             </div>
           )}

           {activeTab === "notifications" && (
             <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8">
               <h3 className="text-xl font-black font-heading text-primary mb-8 flex items-center gap-3">
                 <Bell className="text-accent" /> Notification Preferences
               </h3>
               <div className="space-y-8">
                 {[
                   { id: "email", icon: Mail, label: "Email Notifications", desc: "Receive trip updates and flight alerts via email." },
                   { id: "push", icon: Smartphone, label: "Push Notifications", desc: "Get real-time alerts on your mobile device." },
                   { id: "marketing", icon: Sparkles, label: "Marketing & Deals", desc: "Periodic updates on new destinations and offers." },
                 ].map((item) => (
                   <div key={item.id} className="flex items-center justify-between gap-6">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
                           <item.icon size={18} />
                        </div>
                        <div>
                           <p className="font-bold text-primary text-sm">{item.label}</p>
                           <p className="text-[11px] text-sky/60 font-medium">{item.desc}</p>
                        </div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                     </label>
                   </div>
                 ))}
               </div>
               <div className="mt-12 pt-8 border-t border-border">
                 <Button className="w-full h-12 bg-primary text-white rounded-xl font-bold">Update Preferences</Button>
               </div>
             </Card>
           )}

           {activeTab === "security" && (
             <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8 space-y-10">
               <div>
                 <h3 className="text-xl font-black font-heading text-primary mb-8 flex items-center gap-3">
                   <Shield className="text-accent" /> Password & Authentication
                 </h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-primary/30 ml-1">Current Password</label>
                       <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky/40" />
                          <input type="password" placeholder="••••••••" className="w-full h-12 pl-12 pr-6 rounded-xl bg-muted/30 border-none text-sm font-bold text-primary" />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-primary/30 ml-1">New Password</label>
                          <input type="password" placeholder="Min. 8 characters" className="w-full h-12 px-6 rounded-xl bg-muted/30 border-none text-sm font-bold text-primary" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-primary/30 ml-1">Confirm New Password</label>
                          <input type="password" placeholder="Repeat new password" className="w-full h-12 px-6 rounded-xl bg-muted/30 border-none text-sm font-bold text-primary" />
                       </div>
                    </div>
                    <Button className="h-12 bg-primary text-white rounded-xl font-bold px-8">Update Password</Button>
                 </div>
               </div>

               <div className="pt-10 border-t border-border">
                 <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-3">
                   <Key className="text-secondary" /> Two-Factor Authentication
                 </h3>
                 <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/30">
                    <div className="flex items-start gap-4">
                       <Smartphone className="text-primary shrink-0" size={24} />
                       <div>
                          <p className="font-bold text-primary text-sm">Authenticator App</p>
                          <p className="text-[11px] text-sky/60 font-medium">Protect your account with codes from Google Authenticator or Authy.</p>
                       </div>
                    </div>
                    <Button variant="outline" className="h-10 border-border rounded-xl font-bold px-6 text-xs">Setup</Button>
                 </div>
               </div>
             </Card>
           )}

           {activeTab === "language" && (
             <Card className="border-none shadow-sm rounded-[2rem] bg-white p-8">
               <h3 className="text-xl font-black font-heading text-primary mb-8 flex items-center gap-3">
                 <Globe className="text-accent" /> Regional Settings
               </h3>
               <div className="space-y-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/30 flex items-center gap-2">
                          <Languages size={14} /> Preferred Language
                       </label>
                       <select className="w-full h-14 px-6 rounded-2xl bg-muted/30 border-none text-sm font-bold text-primary appearance-none">
                          <option>English (US)</option>
                          <option>English (UK)</option>
                          <option>Hindi (हिन्दी)</option>
                          <option>Spanish (Español)</option>
                          <option>French (Français)</option>
                       </select>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/30 flex items-center gap-2">
                          <Banknote size={14} /> Default Currency
                       </label>
                       <select className="w-full h-14 px-6 rounded-2xl bg-muted/30 border-none text-sm font-bold text-primary appearance-none">
                          <option>INR (₹) - Indian Rupee</option>
                          <option>USD ($) - US Dollar</option>
                          <option>EUR (€) - Euro</option>
                          <option>GBP (£) - British Pound</option>
                       </select>
                    </div>
                    <div className="space-y-4 sm:col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/30 flex items-center gap-2">
                          <MapPin size={14} /> Timezone
                       </label>
                       <select className="w-full h-14 px-6 rounded-2xl bg-muted/30 border-none text-sm font-bold text-primary appearance-none">
                          <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                          <option>(GMT+00:00) London, Lisbon, Casablanca</option>
                          <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                          <option>(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                       </select>
                    </div>
                 </div>
               </div>
               <div className="mt-12 pt-8 border-t border-border">
                 <Button className="w-full h-14 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg">Save Regional Preferences</Button>
               </div>
             </Card>
           )}
        </div>
      </div>
    </div>
  )
}
