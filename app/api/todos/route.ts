import { verifyAndDecodeToken } from "@/lib/verifyToken";
import Todo from "@/model/Todo";
import { cookies } from "next/headers";

export async function GET() {
  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const todos = await Todo.find();

  return Response.json({ data: todos });
}
