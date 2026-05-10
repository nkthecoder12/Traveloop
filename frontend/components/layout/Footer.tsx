import React from "react"
import Link from "next/link"
import { Globe } from "lucide-react"
import { FaGithub, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6"

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white/10 p-1">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight">
              Traveloop
            </span>
          </Link>
          <p className="text-sky/80 text-sm leading-relaxed max-w-xs">
            The intelligent way to plan your next journey. Multi-city itineraries, budget tracking, and community-driven inspiration.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-accent transition-colors"><FaGithub size={20} /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><FaXTwitter size={20} /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><FaInstagram size={20} /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><FaLinkedin size={20} /></Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-6">Product</h4>
          <ul className="space-y-4 text-sky/70 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">AI Planner</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Budget Tools</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Timeline View</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Packing List</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-6">Community</h4>
          <ul className="space-y-4 text-sky/70 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Public Trips</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Top Planners</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Guidelines</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-lg mb-6">Newsletter</h4>
          <p className="text-sky/70 text-sm mb-4">Get travel tips and product updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent w-full"
            />
            <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sky/60 text-xs">
        <p>© {new Date().getFullYear()} Traveloop Inc. All rights reserved.</p>
        <p className="italic font-heading">“The world is a book and those who do not travel read only one page.”</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
