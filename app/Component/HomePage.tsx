"use client";
import { createContext, useEffect, useState } from "react";
import { Header } from "./Header";
import FilterSidebar from "./FilterSideBar";
import { Button } from "./Button";
import SearchBar from "./SearchBar";
import TodoItem from "./TodoList";
import { Pagination } from "./Pagination";
import axios from "axios";
import AddTodoModal from "./Addtodo";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Todo {
  _id?: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  tags: string[];
  assignedUsers: string[];
  notes: {
    content: string;
    date: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export const todoContext = createContext({
  userList: [] as User[],
  setUserList: (userList: User[]) => {},
  currentUser: null as User | null,
  setCurrentUser: (user: User) => {},
  todoList: [] as Todo[],
  currentPage: 1 as number,
  setCurrentPage: ((e: number) => {}) as any,
  addTodo: ((newTodo: Todo) => {}) as any,
  filterPriority: [] as string[],
  setFilterPriority: ((e: string[]) => {}) as any,
  filterTags: [] as string[],
  setFilterTags: ((e: string[]) => {}) as any,
  totalPages: 1 as number,
  setTotalPages: ((e: number) => {}) as any,
  setTodoList: ((e: Todo[]) => {}) as any,
  isEditing: false as boolean,
  setIsEditing: ((e: boolean) => {}) as any,
  getTodoList: ((e: number) => {}) as any,
  title: "" as string,
  setTitle: ((e: string) => {}) as any,
  description: "" as string,
  setDescription: ((e: string) => {}) as any,
  priority: "" as string,
  setPriority: ((e: string) => {}) as any,
});

export default function Home({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const [userList, setUserList] = useState([] as User[]);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "All Todos",
    email: "",
  } as User);
  const [todoList, setTodoList] = useState([] as Todo[]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addTodoModal, setAddTodoModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
   const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getTodoList(currentPage);
  }, [currentUser, filterTags, filterPriority, currentPage]);

  function getTodoList(page = 1) {
    const params = new URLSearchParams();

    if (filterPriority.length) {
      filterPriority.forEach((priority) => params.append("priority", priority));
    }

    if (filterTags.length) {
      filterTags.forEach((tag) => params.append("tags", tag));
    }

    if (currentUser?._id) {
      params.append("assignedUser", "@" + currentUser.username);
    }

    params.append("page", page.toString());
    setLoading(true);

    axios
      .get(`/api/todos?${params.toString()}`)
      .then((res) => {
        if (currentUser.username === "All Todos") {
          setTodoList(res.data.data);
        } else {
          setTodoList(res?.data?.data || []);
        }
        setTotalPages(res.data.totalPage); // Ensure total pages are updated
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function addTodo(newTodo: Todo) {
    try {
      const response = await axios.post("/api/todos", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Todo added successfully:", response.data.data);
        return response.data.data; // Return the new todo for further use
      } else {
        console.error("Failed to add todo:", response.data.error);
      }
    } catch (error) {
      console.error("Error while adding todo");
    } finally {
      setFilterPriority([]);
      setFilterTags([]);
      setCurrentPage(1);
      setTimeout(() => {
        getTodoList();
      });
    }
  }

  return (
    <todoContext.Provider
      value={{
        userList,
        setUserList,
        currentUser,
        setCurrentUser,
        todoList,
        currentPage,
        setCurrentPage,
        addTodo,
        filterPriority,
        setFilterPriority,
        filterTags,
        setFilterTags,
        totalPages,
        setTotalPages,
        setTodoList,
        isEditing,
        setIsEditing,
        getTodoList,
        title, setTitle,description, setDescription,priority, setPriority
      }}
    >
      <div className=" app-container ">
        <Header username={username} />
        <main className="app-main">
          <FilterSidebar />
          <section className="todo-content justify-between">
            <>
              <div className="w-full flex justify-between">
                <Button
                  varient={"btn-primary"}
                  label={"Add Todo"}
                  startIcon={false}
                  onClick={() => setAddTodoModal(!addTodoModal)}
                />
                <SearchBar />
              </div>
              <div className=" h-full w-full overflow-scroll">
                {todoList.length ? (
                  <div className="todo-list">
                    {todoList.map((todo) => (
                      <TodoItem key={todo._id} todo={todo} />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full p-[20px]">
                    {loading ? "Loading todos . . . " : "  No Todo found . . ."}
                  </div>
                )}
              </div>
            </>

            <Pagination />
          </section>
        </main>
        {addTodoModal ? (
          <AddTodoModal
            users={userList}
            onClose={() => setAddTodoModal(false)}
          />
        ) : (
          <></>
        )}
      </div>
    </todoContext.Provider>
  );
}
