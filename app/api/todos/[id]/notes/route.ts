import { verifyAndDecodeToken } from "@/lib/verifyToken";
import Todo from "@/model/Todo";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB";

export async function POST(request: Request) {
  await connectDB();

  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).pathname.split("/");
  const id = params[params.length - 2];

  const body = await request.json();
  const { notes } = body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      notes,
    },
    { new: true }
  );
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json({ data: todo });
}
