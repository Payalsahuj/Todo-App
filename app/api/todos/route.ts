import { verifyAndDecodeToken } from "@/lib/verifyToken";
import Todo from "@/model/Todo";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = params.get("page");

  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const todos = await Todo.find(
    {},
    {},
    { limit: 10, skip: page ? parseInt(page) : 0 }
  );

  const totalPage = (await Todo.countDocuments()) / 10;

  return Response.json({ data: todos, totalPage });
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
