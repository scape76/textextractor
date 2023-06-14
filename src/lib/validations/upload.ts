import * as z from "zod";

export const uploadImageSchema = z.object({
  name: z.string(),
});
