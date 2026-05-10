"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Budget } from "@/types/itinerary"
import { Card, CardContent } from "@/components/ui/Card"
import { Wallet } from "lucide-react"

interface BudgetBreakdownProps {
  budget: Budget
}

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ budget }) => {
  const data = [
    { name: "Transport", value: budget.transport, color: "#3B82F6" },
    { name: "Stay", value: budget.stay, color: "#8B5CF6" },
    { name: "Food", value: budget.food, color: "#F59E0B" },
    { name: "Activities", value: budget.activities, color: "#10B981" },
  ]

  return (
    <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8">
      <h3 className="text-xl font-bold font-heading text-primary mb-8 flex items-center gap-2">
        <Wallet className="text-accent" /> Budget Analytics
      </h3>
      
      <div className="h-[250px] w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.name} className="p-4 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <p className="text-[10px] font-black uppercase tracking-widest text-sky/60">{item.name}</p>
            </div>
            <p className="text-lg font-bold text-primary">₹ {item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-border/50 flex justify-between items-center">
        <p className="text-sm font-bold text-sky/60 uppercase tracking-widest">Total Estimated</p>
        <p className="text-3xl font-black text-primary tracking-tighter">₹ {budget.total.toLocaleString()}</p>
      </div>
    </Card>
  )
}
