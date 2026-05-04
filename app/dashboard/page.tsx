import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { BoardsHeader } from '@/components/boards-header'
import { BoardsEmptyState } from '@/components/boards-empty-state'
import { BoardList } from "@/components/board-list";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAvailableCount } from "@/lib/org-limit";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Find user's workspace(s)
  const memberships = await prisma.orgMembership.findMany({
    where: { userId: session.user.id },
    select: { workspaceId: true }
  });

  const workspaceIds = memberships.map(m => m.workspaceId);
  
  // For simplicity, we'll use the first workspace for limit display
  const primaryWorkspaceId = workspaceIds[0];
  const boardCount = primaryWorkspaceId ? await getAvailableCount(primaryWorkspaceId) : 0;

  // Fetch boards for these workspaces
  const boards = await prisma.board.findMany({
    where: {
      workspaceId: { in: workspaceIds },
      title: {
        contains: query,
        mode: "insensitive"
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <BoardsHeader boardCount={boardCount} />
        <div className="flex-1 overflow-auto p-6">
          {boards.length > 0 ? (
            <BoardList boards={boards} />
          ) : (
            <BoardsEmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
