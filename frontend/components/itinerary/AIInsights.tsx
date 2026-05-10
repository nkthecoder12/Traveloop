"use client"

import React from "react"
import { motion } from "framer-motion"
import { Info, AlertTriangle, Lightbulb, CloudSun } from "lucide-react"
import { AIInsight } from "@/types/itinerary"
import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

interface AIInsightsProps {
  insights: AIInsight[]
}

const iconMap = {
  tip: Lightbulb,
  warning: AlertTriangle,
  highlight: Info,
  weather: CloudSun
}

const colorMap = {
  tip: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  highlight: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  weather: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
        <Lightbulb className="text-accent" /> AI Insights & Tips
      </h3>
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type]
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn("border border-transparent transition-all hover:shadow-md", colorMap[insight.type])}>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/50 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs font-medium opacity-80 leading-relaxed">
                      {insight.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
