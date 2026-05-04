import { prisma } from "@/lib/prisma";

export const MAX_FREE_BOARDS = 5;

export const hasAvailableCount = async (workspaceId: string) => {
  const count = await prisma.board.count({
    where: { workspaceId }
  });

  return count < MAX_FREE_BOARDS;
};

export const getAvailableCount = async (workspaceId: string) => {
  return await prisma.board.count({
    where: { workspaceId }
  });
};
