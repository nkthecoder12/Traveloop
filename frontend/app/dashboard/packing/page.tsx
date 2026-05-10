"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Sparkles, 
  Backpack, 
  Shirt, 
  Laptop, 
  FileText,
  Trash2,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

const initialItems = [
  { id: 1, text: "Passport & Visas", category: "Documents", packed: true, icon: FileText },
  { id: 2, text: "Travel Insurance", category: "Documents", packed: false, icon: FileText },
  { id: 3, text: "Hiking Boots", category: "Clothes", packed: true, icon: Shirt },
  { id: 4, text: "Light Rain Jacket", category: "Clothes", packed: false, icon: Shirt },
  { id: 5, text: "Camera & Lenses", category: "Electronics", packed: false, icon: Laptop },
  { id: 6, text: "Power Bank", category: "Electronics", packed: true, icon: Laptop },
  { id: 7, text: "Sunscreen", category: "Essentials", packed: false, icon: Backpack },
  { id: 8, text: "First Aid Kit", category: "Essentials", packed: false, icon: Backpack },
]

export default function PackingListPage() {
  const [items, setItems] = useState(initialItems)
  const [activeTab, setActiveTab] = useState("All")

  const categories = ["All", "Documents", "Clothes", "Electronics", "Essentials"]
  
  const togglePacked = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  const packedCount = items.filter(i => i.packed).length
  const progress = Math.round((packedCount / items.length) * 100)

  const filteredItems = activeTab === "All" 
    ? items 
    : items.filter(i => i.category === activeTab)

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold font-heading text-primary mb-2">Packing Checklist</h1>
           <p className="text-sky/80">Don't forget the essentials. AI has suggested some items based on your trip.</p>
        </div>
        <Button className="shadow-lg">
           <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      {/* Progress Bar Card */}
      <Card className="border-none shadow-sm overflow-hidden bg-primary text-white relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
         <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold font-heading">Packing Progress</h3>
               <span className="text-3xl font-bold font-heading text-accent">{progress}%</span>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden mb-4">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 transition={{ duration: 1 }}
                 className="h-full bg-accent" 
               />
            </div>
            <p className="text-sky/60 text-sm font-medium">
              {packedCount} of {items.length} items packed. You're almost ready to go!
            </p>
         </CardContent>
      </Card>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 border",
              activeTab === cat 
                ? "bg-accent border-accent text-primary shadow-lg scale-105" 
                : "bg-white border-border text-sky/60 hover:border-accent/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card 
                className={cn(
                  "border-none shadow-sm transition-all duration-300 cursor-pointer group",
                  item.packed ? "bg-accent/5 opacity-80" : "bg-white hover:shadow-md"
                )}
                onClick={() => togglePacked(item.id)}
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center transition-colors border-2",
                    item.packed ? "bg-accent border-accent text-primary" : "border-border text-sky/20 group-hover:border-accent"
                  )}>
                    {item.packed && <CheckCircle2 size={16} />}
                  </div>
                  
                  <div className={cn(
                    "flex-1 transition-all duration-300",
                    item.packed ? "line-through text-sky/40" : "text-primary font-medium"
                  )}>
                    {item.text}
                    <div className="text-[10px] font-bold uppercase tracking-widest text-sky/60 mt-1 flex items-center gap-1">
                      <item.icon size={10} className="text-accent" /> {item.category}
                    </div>
                  </div>

                  <button className="opacity-0 group-hover:opacity-100 p-2 text-sky/20 hover:text-red-500 transition-all">
                    <Trash2 size={18} />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* AI Suggestion Section */}
      <Card className="border-none bg-secondary/5 border-2 border-dashed border-secondary/30 p-8">
         <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
               <Sparkles className="text-secondary w-8 h-8" />
            </div>
            <div className="flex-1">
               <h3 className="text-xl font-bold text-primary mb-2">Smart Packing Suggestions</h3>
               <p className="text-sky/80 text-sm">
                 Based on your trip to Bali in July, AI recommends: <strong>Rain Poncho, Mosquito Repellent, and Universal Power Adapter.</strong>
               </p>
            </div>
            <Button variant="secondary" className="bg-secondary text-white border-none shrink-0 h-12 px-8 font-bold">
               Add All Suggestions
            </Button>
         </div>
      </Card>
    </div>
  )
}
