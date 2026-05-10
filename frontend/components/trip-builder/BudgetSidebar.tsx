import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Wallet, DollarSign, PieChart, Backpack, StickyNote, ChevronRight, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface BudgetSidebarProps {
  trip: any
}

export const BudgetSidebar: React.FC<BudgetSidebarProps> = ({ trip }) => {
  const categories = [
    { name: "Transport", amount: 8000, color: "bg-primary" },
    { name: "Stay", amount: 10000, color: "bg-secondary" },
    { name: "Food", amount: 4000, color: "bg-accent" },
    { name: "Activities", amount: 2000, color: "bg-orange-400" },
  ]

  const totalSpent = categories.reduce((acc, curr) => acc + curr.amount, 0)
  const remaining = trip.budget - totalSpent

  return (
    <div className="p-8 space-y-10">
      {/* Live Budget Tracker */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
          <Wallet size={16} className="text-accent" /> Live Budget
        </h3>
        
        <Card className="border-none shadow-sm rounded-3xl bg-primary text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-110 transition-transform" />
           <CardContent className="p-8 space-y-6 relative z-10">
              <div>
                 <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Spent</p>
                 <h4 className="text-3xl font-black font-heading">₹ {totalSpent.toLocaleString()}</h4>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-white/40">Progress</span>
                    <span className={remaining < 0 ? "text-red-400" : "text-accent"}>
                      {Math.round((totalSpent / trip.budget) * 100)}%
                    </span>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((totalSpent / trip.budget) * 100, 100)}%` }}
                      className={cn("h-full", remaining < 0 ? "bg-red-400" : "bg-accent")} 
                    />
                 </div>
                 <p className="text-[10px] font-bold text-white/30 text-right uppercase tracking-widest">Target: ₹ {trip.budget.toLocaleString()}</p>
              </div>
           </CardContent>
        </Card>

        <div className="space-y-4">
           {categories.map((cat) => (
             <div key={cat.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                   <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                   <span className="text-xs font-bold text-sky/60 group-hover:text-primary transition-colors">{cat.name}</span>
                </div>
                <span className="text-xs font-black text-primary">₹ {cat.amount.toLocaleString()}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Packing Checklist Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
             <Backpack size={16} className="text-accent" /> Packing List
           </h3>
           <span className="text-[10px] font-black text-sky/20">2 / 5 Items</span>
        </div>
        <div className="space-y-3">
           {trip.packingList.map((item: any) => (
             <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-transparent hover:border-accent/10 transition-all cursor-pointer group">
                <div className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                  item.checked ? "bg-accent border-accent text-primary" : "border-sky/20 group-hover:border-accent"
                )}>
                   {item.checked && <span className="text-[10px] font-black">✓</span>}
                </div>
                <span className={cn("text-xs font-bold transition-colors", item.checked ? "text-sky/20 line-through" : "text-primary")}>
                  {item.item}
                </span>
             </div>
           ))}
        </div>
      </div>

      {/* Trip Settings Quick Link */}
      <div className="pt-6 border-t border-border">
         <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-accent/10 transition-all group">
            <div className="flex items-center gap-3 text-sky/60 group-hover:text-primary">
               <Settings size={18} />
               <span className="text-sm font-bold">Trip Settings</span>
            </div>
            <ChevronRight size={16} className="text-sky/20 group-hover:translate-x-1 transition-all" />
         </button>
      </div>
    </div>
  )
}
