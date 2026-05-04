import { z } from "zod";

export const UpdateListOrderSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            order: z.number(),
            boardId: z.string(),
        })
    ),
    boardId: z.string(),
});
