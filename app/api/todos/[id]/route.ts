import { verifyAndDecodeToken } from "@/lib/verifyToken";
import Todo from "@/model/Todo";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB";

export async function GET(request: Request) {
  await connectDB();

  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).pathname.split("/");
  const id = params[params.length - 1];

  const todo = await Todo.findById(id);
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json({ data: todo });
}

export async function DELETE(request: Request) {
  await connectDB();

  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).pathname.split("/");
  const id = params[params.length - 1];

  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json({ data: todo });
}

export async function PUT(request: Request) {
  await connectDB();

  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).pathname.split("/");
  const id = params[params.length - 1];

  const body = await request.json();
  const { title, description, priority, tags, assignedUsers, completed } = body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      title,
      description,
      priority,
      tags,
      assignedUsers,
      completed,
    },
    { new: true }
  );
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json({ data: todo });
}
