import * as z from "zod";

export const extractionPostSchema = z.object({
  text: z.string(),
  imageId: z.string(),
});
