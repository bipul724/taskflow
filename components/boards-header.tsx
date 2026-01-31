'use client'

import { Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormPopover } from '@/components/form/form-popover'

export function BoardsHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-[#333333]">
      <h1 className="text-3xl font-bold text-white">Boards</h1>
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
