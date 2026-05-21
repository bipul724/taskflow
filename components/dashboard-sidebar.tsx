'use client'

import Link from 'next/link'
import { LayoutGrid, FileText, Users, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from '@/lib/auth-client'
import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login")
        },
      },
    })
  }

  const navItems = [
    { name: 'Boards', href: '/dashboard', icon: LayoutGrid },
    { name: 'Templates', href: '/templates', icon: FileText },
    { name: 'Members', href: '/members', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className={`md:hidden fixed top-3 left-3 z-[60] p-2 rounded-lg bg-[#1a1a1a] border border-[#333333] text-white hover:bg-[#2a2a2a] transition ${isOpen ? 'hidden' : ''}`}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-[45] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 z-[50] h-screen
        w-64 bg-[#1a1a1a] border-r border-[#333333] flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:shrink-0
      `}>
        {/* Logo + Close button */}
        <div className="p-6 border-b border-[#333333] flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold text-white hover:text-gray-300 transition cursor-pointer">TaskFlow</h1>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-[#333333]">
          {isPending ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-[#2a2a2a]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-32 bg-[#2a2a2a] rounded" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold overflow-hidden shrink-0">
                {session?.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                ) : (
                  session?.user.name?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{session?.user.name || "User"}</p>
              </div>
            </div>
          )}
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
          <p className="text-xs text-gray-500 truncate">{session?.user.email}</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-300 border-gray-600 hover:bg-[#2a2a2a] bg-transparent"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#1a1a1a] border-[#333333] text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  You will need to sign in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-gray-600 text-white hover:bg-[#2a2a2a] hover:text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white border-0">Sign out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}
