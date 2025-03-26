import { verifyAndDecodeToken } from "@/lib/verifyToken";
import Todo from "@/model/Todo";
import { cookies } from "next/headers";

export async function GET(request: Request) {
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

export async function POST(request: Request) {
  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, description, priority, tags, assignedUsers, notes } = body;

  //   TOdo: Add validation to check if assignedUsers are valid users

  const todo = new Todo({
    title,
    description,
    priority,
    tags,
    assignedUsers,
    notes,
  });
  await todo.save();
  return Response.json({ data: todo });
}

export async function DELETE(request: Request) {
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
  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).pathname.split("/");
  const id = params[params.length - 1];

  const body = await request.json();
  const { title, description, priority, tags, assignedUsers } = body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      title,
      description,
      priority,
      tags,
      assignedUsers,
    },
    { new: true }
  );
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json({ data: todo });
}
