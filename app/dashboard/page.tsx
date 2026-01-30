import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { BoardsHeader } from '@/components/boards-header'
import { BoardsEmptyState } from '@/components/boards-empty-state'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <BoardsHeader />
        <div className="flex-1 overflow-auto">
          <BoardsEmptyState />
        </div>
      </div>
    </div>
  )
}
