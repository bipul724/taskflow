'use client'

import Link from 'next/link'
import { LayoutGrid, FileText, Users, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Boards', href: '/dashboard', icon: LayoutGrid },
    { name: 'Templates', href: '/templates', icon: FileText },
    { name: 'Members', href: '/members', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

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
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-gray-400 hover:bg-[#2a2a2a]'
                }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
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
