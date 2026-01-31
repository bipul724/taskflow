import { z } from "zod";
import { List } from "@/lib/generated/prisma";

import { CreateListSchema } from "./schema";

export type InputType = z.infer<typeof CreateListSchema>;
export type ReturnType = {
    error?: string;
    data?: List;
};
