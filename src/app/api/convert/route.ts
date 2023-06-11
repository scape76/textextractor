import { performOCR } from "@/lib/ocr";

export async function GET(req: Request) {
  return new Response("Successfully recognized", { status: 200 });
}
