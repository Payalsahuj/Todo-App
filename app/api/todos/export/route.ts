import { verifyAndDecodeToken } from "@/lib/verifyToken";
import { cookies } from "next/headers";
import Todo from "@/model/Todo";
import connectDB from "@/lib/connectDB";

export async function GET(request: Request) {
  await connectDB();

  const params = new URL(request.url).searchParams;
  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const todos = await Todo.find({});
  return Response.json({ data: todos });
}
