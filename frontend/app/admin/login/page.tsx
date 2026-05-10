"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Shield, Mail, Lock, ArrowRight, CheckCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push("/admin")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side: Visualization */}
      <div className="hidden lg:flex w-1/2 bg-[#28545B] relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#17C7D1] blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#2C7C91] blur-[100px]" />
        </div>
        
        <div className="relative z-10 space-y-12">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center gap-4 text-[#17C7D1]"
           >
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                 <Shield size={32} />
              </div>
              <span className="text-2xl font-black font-heading tracking-tighter text-white">Traveloop Admin</span>
           </motion.div>

           <div className="space-y-6">
              <h1 className="text-6xl font-black text-white leading-none tracking-tighter">
                Platform <br /> <span className="text-[#17C7D1]">Intelligence</span> Center.
              </h1>
              <p className="text-[#5FA9C1] text-xl font-medium max-w-lg leading-relaxed">
                Secure enterprise access to global travel analytics, user management, and AI system monitoring.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-8 pt-10">
              <div className="space-y-2">
                 <p className="text-3xl font-black text-white tracking-tight">124k+</p>
                 <p className="text-xs font-bold text-[#5FA9C1] uppercase tracking-widest">Active Nodes</p>
              </div>
              <div className="space-y-2">
                 <p className="text-3xl font-black text-white tracking-tight">99.9%</p>
                 <p className="text-xs font-bold text-[#5FA9C1] uppercase tracking-widest">System Uptime</p>
              </div>
           </div>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 lg:px-32 py-20 bg-white">
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="max-w-md w-full mx-auto space-y-10"
         >
            <div className="space-y-2">
               <h2 className="text-3xl font-black text-[#28545B] tracking-tight">System Authentication</h2>
               <p className="text-slate-400 font-medium">Enter your credentials to access the command center.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-4">
                  <div className="group space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Admin Email</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#17C7D1] transition-colors" />
                        <input 
                          type="email" 
                          placeholder="admin@traveloop.com"
                          className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#17C7D1] focus:bg-white transition-all text-sm font-bold text-[#28545B] outline-none"
                          required
                        />
                     </div>
                  </div>

                  <div className="group space-y-2">
                     <div className="flex items-center justify-between ml-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Key</label>
                        <button type="button" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#17C7D1] hover:underline">Recovery</button>
                     </div>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#17C7D1] transition-colors" />
                        <input 
                          type="password" 
                          placeholder="••••••••••••"
                          className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#17C7D1] focus:bg-white transition-all text-sm font-bold text-[#28545B] outline-none"
                          required
                        />
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-3 py-2">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-[#17C7D1] focus:ring-[#17C7D1]" />
                  <span className="text-xs font-bold text-slate-500">Enable Session Persistence</span>
               </div>

               <Button 
                 type="submit" 
                 disabled={loading}
                 className="w-full h-16 rounded-[2rem] bg-[#28545B] text-white font-black text-lg shadow-xl hover:bg-[#17C7D1] hover:shadow-[#17C7D1]/20 transition-all flex items-center justify-center gap-3 overflow-hidden group"
               >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Establish Secure Session
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </Button>
            </form>

            <div className="pt-10 flex items-center gap-6 border-t border-slate-100">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <CheckCircle size={14} className="text-[#17C7D1]" /> Encrypted Connection
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Globe size={14} className="text-[#2C7C91]" /> Global Node: Asia-South
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  )
}
