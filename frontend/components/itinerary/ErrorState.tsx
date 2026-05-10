"use client"

import React from "react"
import { AlertCircle, RefreshCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-3xl font-black font-heading text-primary tracking-tight mb-4">Architectural Glitch</h2>
      <p className="text-sky/60 font-medium max-w-md mx-auto mb-10 leading-relaxed">
        {message || "Our AI engine encountered an unexpected error while designing your journey. This usually happens due to connection issues."}
      </p>
      <div className="flex gap-4">
        {onRetry && (
          <Button onClick={onRetry} className="h-14 px-8 rounded-2xl bg-primary text-white font-bold flex items-center gap-2">
            <RefreshCcw size={18} /> Retry Generation
          </Button>
        )}
        <Link href="/dashboard">
          <Button variant="outline" className="h-14 px-8 rounded-2xl border-border font-bold flex items-center gap-2">
            <Home size={18} /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
