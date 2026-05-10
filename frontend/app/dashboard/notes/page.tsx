"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Plus, 
  StickyNote, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Clock, 
  Tag, 
  Trash2,
  Edit2,
  Bookmark,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

const initialNotes = [
  {
    id: 1,
    title: "Best Sushi in Tokyo",
    content: "Must visit Sukiyabashi Jiro and Sushi Saito. Book at least 3 months in advance. Tsukiji outer market is great for street food.",
    date: "2 days ago",
    category: "Food",
    color: "bg-accent",
    trip: "Tokyo Tech Tour"
  },
  {
    id: 2,
    title: "Packing for Iceland",
    content: "Layering is key. Waterproof boots, thermal underwear, rain jacket. Don't forget the tripod for Northern Lights photography.",
    date: "5 days ago",
    category: "Packing",
    color: "bg-secondary",
    trip: "None"
  },
  {
    id: 3,
    title: "Santorini Sunset Spots",
    content: "Oia is crowded but beautiful. Imerovigli offers a similar view with half the crowd. Faros Lighthouse at the tip is amazing.",
    date: "1 week ago",
    category: "Tips",
    color: "bg-primary",
    trip: "Summer in Santorini"
  },
  {
    id: 4,
    title: "Visa Requirements - Bali",
    content: "E-VOA available now. $35 fee. valid for 30 days. Extendable once. Custom declaration form can be filled online.",
    date: "2 weeks ago",
    category: "Documents",
    color: "bg-accent",
    trip: "Bali Adventure"
  }
]

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes)
  const [activeTab, setActiveTab] = useState("All")
  const categories = ["All", "Food", "Packing", "Tips", "Documents"]

  const filteredNotes = activeTab === "All" 
    ? notes 
    : notes.filter(n => n.category === activeTab)

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
            <StickyNote className="text-accent" /> My Travel Notes
          </h1>
          <p className="text-sky/80">Keep track of your ideas, tips, and important information for your trips.</p>
        </div>
        <Button className="h-12 px-6 rounded-xl shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 border whitespace-nowrap",
                activeTab === cat 
                  ? "bg-accent border-accent text-primary shadow-lg scale-105" 
                  : "bg-white border-border text-sky/60 hover:border-accent/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-border w-full md:w-80">
          <Search className="w-4 h-4 text-sky/60" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full text-primary font-medium"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className={cn("h-2 w-full", note.color)} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <Tag size={12} className="text-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-sky/60">{note.category}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-sky/40 hover:text-primary"><Edit2 size={14} /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-sky/40 hover:text-red-500"><Trash2 size={14} /></Button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary mb-3">{note.title}</h3>
                    <p className="text-sky/80 text-sm leading-relaxed flex-1 line-clamp-4 mb-6">
                      {note.content}
                    </p>

                    <div className="pt-4 border-t border-border mt-auto">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sky/40">
                           <Clock size={12} />
                           {note.date}
                         </div>
                         {note.trip !== "None" && (
                           <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                             <Bookmark size={10} />
                             {note.trip}
                           </div>
                         )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Note Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: filteredNotes.length * 0.05 }}
        >
          <button className="w-full h-full min-h-[250px] rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 hover:border-accent hover:bg-accent/5 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Plus className="w-6 h-6 text-sky/40 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-sm font-bold text-primary">New Travel Note</p>
          </button>
        </motion.div>
      </div>

      {/* Quick Links Section */}
      <div className="pt-12">
        <h2 className="text-xl font-bold font-heading text-primary mb-6">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Packing Checklist AI", icon: Bookmark, link: "/dashboard/packing" },
            { title: "Budget Planner", icon: StickyNote, link: "/dashboard/budget" },
            { title: "Travel Insurance Guide", icon: ExternalLink, link: "#" },
            { title: "Visa Information", icon: ExternalLink, link: "#" },
          ].map((item) => (
            <button key={item.title} className="p-4 rounded-2xl bg-white border border-border flex items-center gap-3 hover:border-accent hover:shadow-sm transition-all text-left">
              <div className="p-2 rounded-xl bg-accent/10 text-accent">
                <item.icon size={18} />
              </div>
              <span className="text-sm font-bold text-primary">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
