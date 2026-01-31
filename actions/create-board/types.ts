import { z } from "zod";
import { Board } from "@/lib/generated/prisma";

import { CreateBoardSchema } from "./schema";

export type InputType = z.infer<typeof CreateBoardSchema>;
export type ReturnType = {
    error?: string;
    data?: Board;
};
