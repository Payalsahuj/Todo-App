import Todo from "@/model/Todo";

export async function GET(request: Request) {
  const params = new URL(request.url).pathname.split("/");
  const id = params[params.length - 1];

  const todo = await Todo.findById(id);
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json({ data: todo });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, priority, tags, assignedUsers, notes } = body;

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
