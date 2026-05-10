"use client"

import React from "react"
import { Button } from "@/components/ui/Button"
import { Save, Share2, Download, ArrowLeft, MoreVertical } from "lucide-react"
import Link from "next/link"

interface BuilderToolbarProps {
  tripName: string
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({ tripName }) => {
  return (
    <div className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/trips/create">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-sky/60" />
          </Button>
        </Link>
        <div className="h-6 w-[1px] bg-border" />
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-black text-primary font-heading tracking-tight uppercase max-w-[150px] truncate">{tripName}</h2>
          <span className="text-[8px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Manual</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-bold flex items-center gap-2 text-sky/60 hover:text-primary transition-all">
            <Share2 size={14} /> Share
          </Button>
          <Button variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-bold flex items-center gap-2 text-sky/60 hover:text-primary transition-all">
            <Download size={14} /> PDF
          </Button>
        </div>
        <Button className="h-9 px-6 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-md hover:scale-105 transition-all flex items-center gap-2">
          <Save size={14} /> Save Trip
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl"><MoreVertical size={18} className="text-sky/30" /></Button>
      </div>
    </div>
  )
}
