"use client"

import React, { useState } from "react"
import { Backpack, CheckCircle2, Circle, Sparkles } from "lucide-react"
import { PackingItem } from "@/types/itinerary"
import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

interface PackingChecklistProps {
  items: PackingItem[]
}

export const PackingChecklist: React.FC<PackingChecklistProps> = ({ items }) => {
  const [list, setList] = useState(items)

  const toggleItem = (id: string) => {
    setList(list.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const categories = Array.from(new Set(list.map(i => i.category)))

  return (
    <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
          <Backpack className="text-accent" /> Essential Packing
        </h3>
        <div className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
           {list.filter(i => i.checked).length} / {list.length} Packed
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">{category}</h4>
            <div className="space-y-2">
              {list.filter(i => i.category === category).map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border",
                    item.checked 
                      ? "bg-emerald-500/5 border-emerald-500/20" 
                      : "bg-muted/30 border-transparent hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                     {item.checked ? (
                       <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                     ) : (
                       <Circle size={18} className="text-sky/20 shrink-0" />
                     )}
                     <span className={cn(
                       "text-sm font-bold transition-all",
                       item.checked ? "text-emerald-500/60 line-through" : "text-primary"
                     )}>
                       {item.item}
                     </span>
                  </div>
                  {item.essential && !item.checked && (
                    <Sparkles size={12} className="text-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
