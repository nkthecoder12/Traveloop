"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Search, 
  RotateCcw, 
  Share2,
  Backpack,
  ClipboardList
} from "lucide-react"
import { cn } from "@/lib/utils"

const initialChecklist = [
  {
    category: "Documents",
    items: [
      { id: 1, text: "Passport", packed: true },
      { id: 2, text: "Flight Tickets (printed)", packed: true },
      { id: 3, text: "Travel Insurance", packed: true },
      { id: 4, text: "Hotel booking confirmation", packed: false },
    ]
  },
  {
    category: "Clothing",
    items: [
      { id: 5, text: "Casual Shirts", packed: true },
      { id: 6, text: "Trousers / Jeans", packed: false },
      { id: 7, text: "Comfortable walking shoes", packed: false },
      { id: 8, text: "Light jacket / windbreaker", packed: false },
    ]
  },
  {
    category: "Electronics",
    items: [
      { id: 9, text: "Phone charger", packed: true },
      { id: 10, text: "Universal power adapter", packed: false },
      { id: 11, text: "Earphone / headphones", packed: false },
    ]
  }
]

export default function PackingChecklistPage() {
  const [checklist, setChecklist] = useState(initialChecklist)

  const toggleItem = (catIndex: number, itemId: number) => {
    const newChecklist = [...checklist]
    const item = newChecklist[catIndex].items.find(i => i.id === itemId)
    if (item) item.packed = !item.packed
    setChecklist(newChecklist)
  }

  const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0)
  const packedItems = checklist.reduce((acc, cat) => acc + cat.items.filter(i => i.packed).length, 0)
  const progress = Math.round((packedItems / totalItems) * 100)

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
          <Backpack className="text-accent" /> Packing Checklist
        </h1>
        <p className="text-sky/80">Stay organized and never forget a travel essential.</p>
      </div>

      {/* Search & Stats (Screen 11) */}
      <div className="space-y-8">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="w-5 h-5 text-sky/60" />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
          </div>
        </div>

        <Card className="border-none shadow-sm bg-primary text-white overflow-hidden rounded-[2rem]">
           <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="text-xl font-bold mb-1">Trip: Kerala Adventure</h3>
                    <p className="text-sky/60 text-sm italic">Progress: {packedItems}/{totalItems} items packed</p>
                 </div>
                 <div className="text-3xl font-bold font-heading text-accent">{progress}%</div>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   className="h-full bg-accent"
                 />
              </div>
           </CardContent>
        </Card>

        {/* Checklist Categories (Screen 11) */}
        <div className="space-y-8">
          {checklist.map((category, catIndex) => (
            <div key={category.category} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                   <ClipboardList size={18} className="text-accent" /> {category.category}
                </h3>
                <span className="text-xs font-bold text-sky/60 uppercase tracking-widest">
                   {category.items.filter(i => i.packed).length}/{category.items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {category.items.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => toggleItem(catIndex, item.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                      item.packed 
                        ? "bg-accent/5 border-accent/20 text-primary/60" 
                        : "bg-white border-border text-primary hover:border-accent/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {item.packed ? (
                        <CheckSquare className="text-accent w-5 h-5" />
                      ) : (
                        <Square className="text-sky/20 w-5 h-5" />
                      )}
                      <span className={cn("text-sm font-medium", item.packed && "line-through")}>
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
           <Button className="h-12 px-8 bg-primary text-white border-none font-bold rounded-xl flex items-center gap-2">
              <Plus size={18} /> Add item to checklist
           </Button>
           <Button variant="outline" className="h-12 px-8 border-border text-primary font-bold rounded-xl flex items-center gap-2">
              <RotateCcw size={18} /> Reset all
           </Button>
           <Button className="h-12 px-8 bg-accent text-primary hover:bg-accent/90 border-none font-bold rounded-xl flex items-center gap-2">
              <Share2 size={18} /> Share Checklist
           </Button>
        </div>
      </div>
    </div>
  )
}
