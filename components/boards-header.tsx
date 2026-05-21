'use client'

import { Download, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormPopover } from '@/components/form/form-popover'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'

import { MAX_FREE_BOARDS } from '@/lib/org-limit'

export function BoardsHeader({ boardCount = 0 }: { boardCount?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-[#333333] gap-3 md:gap-0 pl-14 md:pl-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">Boards</h1>
          <span className="text-xs text-gray-500 font-medium">{boardCount} / {MAX_FREE_BOARDS} boards used</span>
        </div>
        <div className="relative max-w-sm w-full ml-4 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search boards..." 
            className="pl-10 bg-[#1a1a1a] border-[#333333] text-white focus:ring-0 focus:border-gray-500 h-9"
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="text-gray-300 border-gray-600 hover:bg-[#2a2a2a] gap-2 bg-transparent"
        >
          <Download size={18} />
          Import
        </Button>
        <FormPopover sideOffset={10} side="bottom">
          <Button className="bg-white text-black hover:bg-gray-100 gap-2">
            <Plus size={18} />
            New
          </Button>
        </FormPopover>
      </div>
    </div>
  )
}
