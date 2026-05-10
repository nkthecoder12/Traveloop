"use client"

import React from "react"
import { motion } from "framer-motion"
import { Clock, Plane, Utensils, Camera, MapPin, Navigation, Bed, HelpCircle } from "lucide-react"
import { Activity } from "@/types/itinerary"
import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  activity: Activity
}

const typeConfig = {
  transport: { icon: Plane, color: "bg-blue-500", text: "text-blue-500" },
  food: { icon: Utensils, color: "bg-orange-500", text: "text-orange-500" },
  activity: { icon: Camera, color: "bg-emerald-500", text: "text-emerald-500" },
  stay: { icon: Bed, color: "bg-indigo-500", text: "text-indigo-500" },
  other: { icon: HelpCircle, color: "bg-primary", text: "text-primary" }
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const config = typeConfig[activity.type] || typeConfig.other
  const Icon = config.icon

  return (
    <Card className="border-none shadow-sm rounded-[1.5rem] bg-white group hover:shadow-xl transition-all border border-transparent hover:border-accent/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md", config.color)}>
              <Icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-sky/40 flex items-center gap-1">
                   <Clock size={10} /> {activity.time}
                 </span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-sky/40 flex items-center gap-1">
                   <Navigation size={10} /> {activity.duration}
                 </span>
              </div>
              <h4 className="font-bold text-primary tracking-tight group-hover:text-accent transition-colors">{activity.name}</h4>
              {activity.location && (
                <p className="text-xs font-medium text-sky/60 flex items-center gap-1 mt-0.5">
                  <MapPin size={10} /> {activity.location}
                </p>
              )}
            </div>
          </div>

          <div className="text-right shrink-0">
             <p className="text-sm font-black text-primary">₹ {activity.cost.toLocaleString()}</p>
             <p className="text-[9px] font-bold text-sky/40 uppercase tracking-tighter">Est. Cost</p>
          </div>
        </div>

        {activity.notes && (
          <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/50">
             <p className="text-xs font-medium text-primary/70 leading-relaxed italic">
               "{activity.notes}"
             </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
