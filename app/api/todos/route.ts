import { verifyAndDecodeToken } from "@/lib/verifyToken";
import Todo from "@/model/Todo";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB";

export async function GET(request: Request) {
  await connectDB();

  const params = new URL(request.url).searchParams;
  const page = Number(params.get("page") || 1) - 1;
  const search = params.get("search") || "";
  const filterTags = params.getAll("tags") || [];
  const priority = params.getAll("priority") || [];

  const limit = 4;
  const pageCookies = await cookies();
  const token = pageCookies.get("token")?.value;
  const user = await verifyAndDecodeToken(token);
  const assignedUser = params.getAll("assignedUser") || [];
  if (!user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // if tags are empty, return all todos
  let query = {
    title: { $regex: search, $options: "i" },
  } as any;

  if (filterTags?.length) {
    query.tags = { $all: filterTags };
  }

  if (priority?.length) {
    query.priority = { $in: priority };
  }

  if (assignedUser?.length) {
    query.assignedUsers = { $in: assignedUser };
  }
  // descending order of createdAt
  const todos = await Todo.find(
    query,
    {},
    { limit: limit, skip: page * limit, sort: { createdAt: -1 } }
  );

  const totalPage = (await Todo.countDocuments(query)) / limit;

  return Response.json({ data: todos, totalPage: Math.ceil(totalPage) });
}

export async function POST(request: Request) {
  await connectDB();

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
