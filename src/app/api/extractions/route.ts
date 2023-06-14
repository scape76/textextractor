import supabase from "@/lib/supabase-server";
import { extractionPostSchema } from "@/lib/validations/extraction";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Not authorized", { status: 404 });
    }

    const json = await req.json();
    const body = extractionPostSchema.parse(json);

    console.log("---------------------querying--------------------------");

    const { error } = await supabase
      .from("extractions")
      .insert({ userId: user.id, text: body.text, imageId: body.imageId });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 522 });
    }

    return new Response(JSON.stringify({ success: 0 }), { status: 500 });
  }
}
