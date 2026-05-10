"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Search, 
  Download, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  Filter,
  ArrowUpDown,
  MoreVertical
} from "lucide-react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from "recharts"
import { cn } from "@/lib/utils"

const lineItems = [
  { id: 1, category: "hotel", description: "hotel booking paris", qty: "3 nights", unitCost: "3000", amount: "9000" },
  { id: 2, category: "travel", description: "flight bookings (DEL -> PAR)", qty: "1", unitCost: "12000", amount: "12000" },
  { id: 3, category: "food", description: "dinner at Le Meurice", qty: "2", unitCost: "1500", amount: "3000" },
  { id: 4, category: "activity", description: "Museum pass", qty: "4", unitCost: "800", amount: "3200" },
]

const pieData = [
  { name: "Spent", value: 22000 },
  { name: "Remaining", value: -2000 },
]
const COLORS = ["#17C7D1", "#FFC700"]

export default function InvoicePage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="text-sky/60 hover:text-primary p-0 h-auto font-bold flex items-center gap-2">
           <ArrowLeft size={16} /> back to My Trips
        </Button>
        <div className="bg-white p-1 rounded-xl border border-border flex items-center gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 border-r border-border">
              <Search size={14} className="text-sky/40" />
              <input type="text" placeholder="Search inv..." className="bg-transparent border-none focus:outline-none text-xs w-32 font-medium" />
           </div>
           <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-sky/60">Filter</Button>
           <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-sky/60">Sort <ArrowUpDown size={10} className="ml-1" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Invoice Card (Screen 14) */}
         <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
            <CardContent className="p-10 space-y-10">
               <div className="flex flex-col md:flex-row justify-between gap-10">
                  <div className="flex items-start gap-8">
                     <div className="w-32 h-32 rounded-3xl bg-muted border-2 border-border flex items-center justify-center relative overflow-hidden">
                        <img src="/images/paris.png" alt="Trip" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-primary mb-2">Trip to Europe Adventure</h2>
                        <p className="text-sky/60 text-xs font-bold uppercase tracking-widest mb-1">May 25 - Jun 05, 2025 • 4 cities</p>
                        <p className="text-sky/40 text-[10px] font-bold">Created by James</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                     <div>
                        <p className="text-sky/40 text-[10px] font-bold uppercase tracking-widest mb-1">Invoice Id</p>
                        <p className="text-sm font-bold text-primary">INV-xyz-30290</p>
                     </div>
                     <div>
                        <p className="text-sky/40 text-[10px] font-bold uppercase tracking-widest mb-1">Generated date</p>
                        <p className="text-sm font-bold text-primary">May 20, 2025</p>
                     </div>
                     <div>
                        <p className="text-sky/40 text-[10px] font-bold uppercase tracking-widest mb-1">Traveler Details</p>
                        <div className="text-sm font-bold text-primary leading-tight">
                           James<br/>Arjun<br/>Jerry<br/>Cristina
                        </div>
                     </div>
                     <div>
                        <p className="text-sky/40 text-[10px] font-bold uppercase tracking-widest mb-1">Payment status</p>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-yellow-500" />
                           <p className="text-sm font-bold text-primary">Pending</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Items Table (Screen 14) */}
               <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                     <thead>
                        <tr className="border-b border-border">
                           <th className="py-4 px-2 text-left text-[10px] font-bold uppercase tracking-widest text-sky/40">#</th>
                           <th className="py-4 px-2 text-left text-[10px] font-bold uppercase tracking-widest text-sky/40">Category</th>
                           <th className="py-4 px-2 text-left text-[10px] font-bold uppercase tracking-widest text-sky/40">Description</th>
                           <th className="py-4 px-2 text-left text-[10px] font-bold uppercase tracking-widest text-sky/40">Qty/details</th>
                           <th className="py-4 px-2 text-left text-[10px] font-bold uppercase tracking-widest text-sky/40">Unit Cost</th>
                           <th className="py-4 px-2 text-right text-[10px] font-bold uppercase tracking-widest text-sky/40">Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-muted/30">
                        {lineItems.map((item, i) => (
                           <tr key={item.id} className="group hover:bg-muted/10 transition-colors">
                              <td className="py-4 px-2 text-sm font-medium text-sky/60">{i + 1}</td>
                              <td className="py-4 px-2 text-sm font-bold text-primary capitalize">{item.category}</td>
                              <td className="py-4 px-2 text-sm font-medium text-primary/80">{item.description}</td>
                              <td className="py-4 px-2 text-sm font-medium text-sky/60">{item.qty}</td>
                              <td className="py-4 px-2 text-sm font-bold text-primary">{item.unitCost}</td>
                              <td className="py-4 px-2 text-sm font-bold text-primary text-right">₹{item.amount}</td>
                           </tr>
                        ))}
                     </tbody>
                     <tfoot>
                        <tr className="border-t-2 border-primary/10">
                           <td colSpan={4} className="py-8"></td>
                           <td className="py-8 px-2 text-right text-[10px] font-bold uppercase tracking-widest text-sky/40 space-y-4">
                              <div className="mb-2">Subtotal</div>
                              <div className="mb-2">Tax (5%)</div>
                              <div className="mb-2">Discount</div>
                           </td>
                           <td className="py-8 px-2 text-right text-sm font-bold text-primary space-y-4">
                              <div className="mb-2">₹27,200</div>
                              <div className="mb-2">₹1,360</div>
                              <div className="mb-2">-₹500</div>
                           </td>
                        </tr>
                        <tr className="bg-primary/5 rounded-2xl overflow-hidden">
                           <td colSpan={4} className="py-6 px-4 rounded-l-2xl"></td>
                           <td className="py-6 px-2 text-right text-lg font-bold text-primary">Grand Total</td>
                           <td className="py-6 px-2 text-right text-2xl font-bold text-accent rounded-r-2xl">₹28,060</td>
                        </tr>
                     </tfoot>
                  </table>
               </div>

               <div className="flex flex-wrap items-center justify-between gap-6 pt-10">
                  <div className="flex gap-4">
                     <Button variant="outline" className="h-12 px-8 border-border text-primary font-bold rounded-xl flex items-center gap-2">
                        <Download size={18} /> Download Invoice
                     </Button>
                     <Button variant="outline" className="h-12 px-8 border-border text-primary font-bold rounded-xl flex items-center gap-2">
                        <FileText size={18} /> Export as PDF
                     </Button>
                  </div>
                  <Button className="h-12 px-10 bg-primary text-white border-none font-bold rounded-xl shadow-lg flex items-center gap-2">
                     <CheckCircle2 size={18} /> Mark as paid
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Budget Insights Card (Screen 14) */}
         <div className="space-y-8">
            <Card className="border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
               <CardHeader className="bg-muted/10 border-b pb-6 p-8">
                  <CardTitle className="text-lg font-bold text-primary">Budget Insights</CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-8">
                  <div className="h-56 flex items-center justify-center relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                             data={pieData}
                             innerRadius={60}
                             outerRadius={80}
                             paddingAngle={5}
                             dataKey="value"
                           >
                             {pieData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                        </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-sky/40 uppercase tracking-widest">Total Spent</p>
                        <p className="text-2xl font-bold text-primary">₹22,000</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center px-2">
                        <span className="text-sm font-bold text-sky/60">Total Budget:</span>
                        <span className="text-sm font-bold text-primary">₹20,000</span>
                     </div>
                     <div className="flex justify-between items-center px-2">
                        <span className="text-sm font-bold text-sky/60">Total Spent:</span>
                        <span className="text-sm font-bold text-primary">₹22,000</span>
                     </div>
                     <div className="h-[1px] w-full bg-border" />
                     <div className="flex justify-between items-center px-2">
                        <span className="text-sm font-bold text-sky/60">Remaining:</span>
                        <span className="text-sm font-bold text-red-500">-₹2,000</span>
                     </div>
                  </div>

                  <Button className="w-full h-12 bg-muted text-primary hover:bg-accent hover:text-white border-none font-bold rounded-xl transition-all">
                     View Full Budget
                  </Button>
               </CardContent>
            </Card>

            {/* Note placeholder */}
            <Card className="border-none shadow-sm overflow-hidden bg-accent/5 rounded-[2rem] border-2 border-dashed border-accent/20">
               <CardContent className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto text-accent">
                     <FileText size={24} />
                  </div>
                  <h3 className="font-bold text-primary">Quick Notes</h3>
                  <p className="text-sky/60 text-xs leading-relaxed italic">
                     "This invoice includes the split payments for the group bookings. James owes Arjun ₹4,500 for the extra hotel nights."
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  )
}
