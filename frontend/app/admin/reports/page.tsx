"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Download, 
  Clock, 
  BarChart, 
  PieChart, 
  Table, 
  Search, 
  MoreVertical,
  Calendar,
  Filter,
  CheckCircle2,
  FileDown
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const reportTypes = [
  { id: "r1", title: "Monthly Growth Summary", desc: "Detailed analysis of user and trip growth vectors.", format: "PDF", size: "2.4 MB" },
  { id: "r2", title: "Global Revenue Ledger", desc: "Fiscal records, subscription counts, and gateway logs.", format: "CSV", size: "1.2 MB" },
  { id: "r3", title: "AI Generation Audit", desc: "System performance, latency logs, and success rates.", format: "PDF", size: "4.8 MB" },
  { id: "r4", title: "User Retention Matrix", desc: "Weekly cohorts and engagement drop-off points.", format: "XLSX", size: "850 KB" },
  { id: "r5", title: "Safety & Moderation Log", desc: "Flagged content, suspension history, and block logs.", format: "PDF", size: "1.5 MB" },
]

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-black text-[#28545B] tracking-tighter uppercase">Data Intelligence Exports</h1>
            <p className="text-slate-400 font-medium text-sm">Generate and download platform-wide analytics reports and fiscal summaries.</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest text-[#28545B] hover:bg-slate-50">
               <Calendar size={14} className="mr-2" /> Schedule Report
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all">
               Generate Custom Extract
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black text-[#28545B] uppercase tracking-[0.2em] ml-1">Available System Reports</h2>
            <div className="grid grid-cols-1 gap-4">
               {reportTypes.map((report, i) => (
                 <motion.div 
                   key={report.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                 >
                    <Card className="border-none shadow-sm rounded-[1.5rem] bg-white p-6 hover:shadow-md hover:scale-[1.01] transition-all group cursor-pointer">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#2C7C91] group-hover:bg-[#17C7D1]/10 group-hover:text-[#17C7D1] transition-colors">
                                <FileText size={24} />
                             </div>
                             <div>
                                <h3 className="text-base font-black text-[#28545B] mb-1">{report.title}</h3>
                                <p className="text-xs font-medium text-slate-400">{report.desc}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="text-right">
                                <span className="text-[9px] font-black uppercase text-[#17C7D1] bg-[#17C7D1]/10 px-2 py-0.5 rounded-full">{report.format}</span>
                                <p className="text-[10px] font-bold text-slate-300 mt-1">{report.size}</p>
                             </div>
                             <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:text-[#17C7D1]"><Download size={20} /></Button>
                          </div>
                       </div>
                    </Card>
                 </motion.div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <h2 className="text-sm font-black text-[#28545B] uppercase tracking-[0.2em] ml-1">Export Config</h2>
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-8 space-y-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time range</label>
                  <select className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none text-xs font-bold text-[#28545B] appearance-none">
                     <option>Last 30 Days</option>
                     <option>Current Quarter</option>
                     <option>Fiscal Year 2024</option>
                     <option>All Time</option>
                  </select>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Granularity</label>
                  <div className="grid grid-cols-2 gap-3">
                     {["Standard", "Raw Log", "Summary", "Filtered"].map(t => (
                       <button key={t} className="h-10 rounded-xl bg-slate-50 text-[10px] font-black uppercase text-slate-400 hover:bg-[#17C7D1]/10 hover:text-[#17C7D1] transition-all border border-transparent hover:border-[#17C7D1]/20">
                          {t}
                       </button>
                     ))}
                  </div>
               </div>
               <div className="pt-6 border-t border-slate-50">
                  <Button className="w-full h-14 rounded-2xl bg-[#28545B] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#28545B]/10 hover:bg-[#17C7D1] transition-all flex items-center justify-center gap-3">
                     <FileDown size={18} /> Batch Process Export
                  </Button>
               </div>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#17C7D1] p-8 text-[#28545B]">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                     <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-lg font-black font-heading tracking-tight">System Backup</h3>
               </div>
               <p className="text-sm font-bold opacity-80 leading-relaxed mb-6">Last global system snapshot was successfully archived to S3 Region: Asia-South.</p>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">2h 14m ago</span>
                  <Button variant="ghost" className="h-8 px-4 rounded-lg bg-white/20 text-[#28545B] text-[9px] font-black uppercase tracking-widest">Details</Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
