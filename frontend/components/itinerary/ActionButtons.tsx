"use client"

import React from "react"
import { Share2, Download, Heart, Save } from "lucide-react"
import { Button } from "@/components/ui/Button"

export const ActionButtons: React.FC = () => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-border/50 p-3 rounded-[2rem] shadow-2xl flex items-center gap-4">
      <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2">
        <Save size={18} /> Save to My Trips
      </Button>
      <div className="h-10 w-[1px] bg-border/50 mx-1" />
      <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl text-sky/60 hover:text-accent hover:bg-accent/10">
        <Share2 size={20} />
      </Button>
      <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl text-sky/60 hover:text-emerald-500 hover:bg-emerald-500/10">
        <Download size={20} />
      </Button>
      <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl text-sky/60 hover:text-pink-500 hover:bg-pink-500/10">
        <Heart size={20} />
      </Button>
    </div>
  )
}
