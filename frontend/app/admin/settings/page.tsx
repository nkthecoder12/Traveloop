"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Globe, 
  Bell, 
  Database, 
  Terminal, 
  Zap,
  Lock,
  Eye,
  Key,
  Layers,
  Save,
  RotateCcw
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Kernel Configuration</h1>
            <p className="text-slate-400 font-medium text-sm">System-wide parameters, API keys, and administrative access controls.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <RotateCcw size={14} className="mr-2" /> Factory Reset
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               <Save size={14} className="mr-2" /> Commit Changes
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 space-y-10">
               {/* Platform Branding */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <Layers className="text-[#17C7D1]" size={20} />
                     <h3 className="text-sm font-black text-[#28545B] uppercase tracking-[0.2em]">Platform Core</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Platform Name</label>
                        <input type="text" defaultValue="Traveloop" className="w-full h-12 px-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B]" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Instance Region</label>
                        <select className="w-full h-12 px-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] appearance-none">
                           <option>Asia-South-1 (Mumbai)</option>
                           <option>US-East-1 (N. Virginia)</option>
                           <option>EU-Central-1 (Frankfurt)</option>
                        </select>
                     </div>
                  </div>
               </div>

               {/* AI Model Settings */}
               <div className="space-y-6 pt-10 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                     <Cpu className="text-[#2C7C91]" size={20} />
                     <h3 className="text-sm font-black text-[#28545B] uppercase tracking-[0.2em]">AI Intelligence Engine</h3>
                  </div>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50">
                        <div>
                           <p className="text-sm font-black text-[#28545B]">Itinerary Model Version</p>
                           <p className="text-xs font-medium text-slate-400">Current stable: v4.2.1-itinerary-pro</p>
                        </div>
                        <Button className="h-9 px-4 rounded-xl bg-[#28545B] text-white font-black text-[9px] uppercase tracking-widest">Update</Button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: "Temp", val: "0.7" },
                          { label: "Top-P", val: "0.9" },
                          { label: "Tokens", val: "2048" },
                        ].map(s => (
                          <div key={s.label} className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{s.label}</label>
                             <input type="text" defaultValue={s.val} className="w-full h-12 px-6 rounded-xl bg-slate-50 border-none text-sm font-bold text-[#28545B] text-center" />
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Security Config */}
               <div className="space-y-6 pt-10 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="text-[#28545B]" size={20} />
                     <h3 className="text-sm font-black text-[#28545B] uppercase tracking-[0.2em]">Security & Privacy</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                       { label: "Force MFA for Admins", active: true },
                       { label: "Session Rotation (24h)", active: true },
                       { label: "API Rate Limiting", active: false },
                     ].map(s => (
                       <div key={s.label} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                          <span className="text-sm font-bold text-[#28545B]">{s.label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                             <input type="checkbox" defaultChecked={s.active} className="sr-only peer" />
                             <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#17C7D1]"></div>
                          </label>
                       </div>
                     ))}
                  </div>
               </div>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#28545B] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
               <div className="flex items-center gap-3 mb-8">
                  <Key className="text-[#17C7D1]" size={20} />
                  <h3 className="text-lg font-black font-heading tracking-tight">API Infrastructure</h3>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Public Key</label>
                     <div className="relative group">
                        <input type="password" value="tr_pk_84920492840294" readOnly className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/10 border-none text-[11px] font-mono text-[#17C7D1] focus:ring-0" />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"><Eye size={14} /></button>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Secret Hash</label>
                     <div className="relative group">
                        <input type="password" value="tr_sk_secret_sequence_8492" readOnly className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/10 border-none text-[11px] font-mono text-[#17C7D1] focus:ring-0" />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"><Eye size={14} /></button>
                     </div>
                  </div>
                  <Button className="w-full h-12 rounded-xl bg-[#17C7D1] text-[#28545B] font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#17C7D1]/20">
                     Rotate All Credentials
                  </Button>
               </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8">
               <div className="flex items-center gap-3 mb-6 text-red-500">
                  <Zap size={20} />
                  <h3 className="text-lg font-black font-heading tracking-tight">Danger Zone</h3>
               </div>
               <p className="text-xs font-bold text-slate-400 mb-6 leading-relaxed">Destructive actions cannot be reversed. Proceed with extreme caution.</p>
               <div className="space-y-3">
                  <Button variant="outline" className="w-full h-11 rounded-xl border-red-100 text-red-500 hover:bg-red-50 font-black text-[9px] uppercase tracking-widest">
                     Clear Global Cache
                  </Button>
                  <Button variant="outline" className="w-full h-11 rounded-xl border-red-100 text-red-500 hover:bg-red-50 font-black text-[9px] uppercase tracking-widest">
                     Purge Suspended Users
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
