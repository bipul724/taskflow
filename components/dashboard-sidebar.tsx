'use client'

import Link from 'next/link'
import { LayoutGrid, FileText, Users, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardSidebar() {
  return (
    <div className="w-64 bg-[#1a1a1a] border-r border-[#333333] flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-[#333333]">
        <h1 className="text-xl font-bold text-white">TaskFlow</h1>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-[#333333]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Johnson</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#2a2a2a] text-white hover:bg-[#333333] transition"
        >
          <LayoutGrid size={20} />
          <span className="text-sm font-medium">Boards</span>
        </Link>
        <Link
          href="/templates"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a] transition"
        >
          <FileText size={20} />
          <span className="text-sm font-medium">Templates</span>
        </Link>
        <Link
          href="/members"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a] transition"
        >
          <Users size={20} />
          <span className="text-sm font-medium">Members</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a] transition"
        >
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#333333] space-y-2">
        <p className="text-xs text-gray-500 truncate">user@example.com</p>
        <Button
          variant="outline"
          className="w-full justify-start text-gray-300 border-gray-600 hover:bg-[#2a2a2a] bg-transparent"
        >
          <LogOut size={16} className="mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
