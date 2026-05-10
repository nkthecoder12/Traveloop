"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  StickyNote,
  Calendar,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

const initialNotes = [
  {
    id: 1,
    title: "Hotel check-in details - Rome stop",
    content: "check in after 2pm, room 302, breakfast included (7-10am)",
    date: "June 14 2025",
    day: "Day 3"
  },
  {
    id: 2,
    title: "Museum Tickets info",
    content: "Louvre tickets are on the phone, entry at 10:30am via the pyramid entrance.",
    date: "June 15 2025",
    day: "Day 4"
  },
  {
    id: 3,
    title: "Restaurant Recommendation",
    content: "Le Meurice is booked for 8pm. Dress code: Formal.",
    date: "June 16 2025",
    day: "Day 5"
  }
]

export default function TripNotesPage() {
  const [notes, setNotes] = useState(initialNotes)
  const [filter, setFilter] = useState("All")

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
          <StickyNote className="text-accent" /> Trip Notes
        </h1>
        <p className="text-sky/80">Keep all your important thoughts and details in one place.</p>
      </div>

      {/* Search & Filter (Screen 13) */}
      <div className="space-y-8">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-border flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="w-5 h-5 text-sky/60" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Group by</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Filter</Button>
            <Button variant="ghost" className="h-10 text-xs font-bold uppercase tracking-widest text-sky/60 hover:text-primary">Sort by...</Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="w-full md:w-80">
              <div className="relative">
                 <button className="w-full h-12 px-4 rounded-xl bg-white border border-border text-sm font-bold text-primary flex items-center justify-between shadow-sm">
                    Trip: Paris & Rome Adventure <ChevronDown size={18} className="text-sky/40" />
                 </button>
              </div>
           </div>
           <Button className="h-12 px-8 bg-primary text-white border-none font-bold rounded-xl flex items-center gap-2 shadow-lg">
              <Plus size={18} /> Add Note
           </Button>
        </div>

        {/* View Options (Screen 13) */}
        <div className="flex gap-3">
           {["All", "by Day", "by stop"].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={cn(
                 "px-6 py-2 rounded-xl text-sm font-bold border transition-all",
                 filter === f 
                   ? "bg-primary border-primary text-white shadow-md" 
                   : "bg-white border-border text-sky/60 hover:border-accent/50"
               )}
             >
                {f}
             </button>
           ))}
        </div>

        {/* Notes List (Screen 13) */}
        <div className="grid grid-cols-1 gap-6">
           {notes.map((note) => (
             <motion.div
               key={note.id}
               whileHover={{ scale: 1.01 }}
               className="bg-white rounded-3xl p-6 shadow-sm border border-border group hover:border-accent/50 transition-all"
             >
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">{note.title}</h3>
                   <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-sky/40 hover:text-primary border border-border">
                         <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-sky/40 hover:text-red-500 border border-border">
                         <Trash2 size={14} />
                      </Button>
                   </div>
                </div>
                <p className="text-sky/80 text-sm mb-6 leading-relaxed">
                   {note.content}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-sky/40">
                   <div className="flex items-center gap-1">
                      <Calendar size={12} /> {note.date}
                   </div>
                   <div className="h-3 w-[1px] bg-border" />
                   <div className="text-accent">{note.day}</div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  )
}
