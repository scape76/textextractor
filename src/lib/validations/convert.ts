import * as z from "zod";

export const convertPostSchema = z.object({
  file: z.any(),
});
