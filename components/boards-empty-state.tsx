'use client'

import { Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormPopover } from '@/components/form/form-popover'

export function BoardsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      <Briefcase size={56} className="text-gray-600 mb-6" />
      <h2 className="text-2xl font-semibold text-white mb-2">No boards</h2>
      <p className="text-gray-400 mb-8">Get started by creating a new board</p>
      <FormPopover sideOffset={10}>
        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-100 cursor-pointer"
        >
          Create new board
        </Button>
      </FormPopover>
    </div>
  )
}
