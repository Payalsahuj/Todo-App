"use client";
import { createContext, useEffect, useState } from "react";
import { Header } from "./Header";
import FilterSidebar from "./FilterSideBar";
import { Button } from "./Button";
import SearchBar from "./SearchBar";
import TodoItem from "./TodoList";
import { Pagination } from "./Pagination";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
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
  createdAt: string;
  updatedAt: string;
}

export const todoContext = createContext({
  userList: [] as User[],
  setUserList: (userList: User[]) => {},
  currentUser: null as User | null,
  setCurrentUser: (user: User) => {},
  todoList: [] as Todo[],
  currentPage: 1 as Number,
  setCurrentPage: ((e: Number) => {}) as any,
});

export default function Home({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const [userList, setUserList] = useState([] as User[]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [todoList, setTodoList] = useState([] as Todo[]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setUserList([
      {
        id: 1,
        username: "payal",
        email: "sahupayal220@gmail.com",
      },
    ]);
    setCurrentUser({
      id: 1,
      username: "payal",
      email: "sahupayal220@gmail.com",
    });

    setTodoList([
      {
        id: 1,
        title: "Complete the todo app",
        description: "Finish implementing all required features",
        priority: "high",
        completed: false,
        tags: ["work", "coding"],
        assignedUsers: ["@john", "@sarah"],
        notes: [
          {
            content: "Remember to add proper error handling",
            date: "2023-05-10",
          },
        ],
        createdAt: "2023-05-01T12:00:00Z",
        updatedAt: "2023-05-10T14:30:00Z",
      },
      {
        id: 1,
        title: "Complete the todo app",
        description: "Finish implementing all required features",
        priority: "high",
        completed: false,
        tags: ["work", "coding"],
        assignedUsers: ["@john", "@sarah"],
        notes: [
          {
            content: "Remember to add proper error handling",
            date: "2023-05-10",
          },
        ],
        createdAt: "2023-05-01T12:00:00Z",
        updatedAt: "2023-05-10T14:30:00Z",
      },
      {
        id: 1,
        title: "Complete the todo app",
        description: "Finish implementing all required features",
        priority: "high",
        completed: false,
        tags: ["work", "coding"],
        assignedUsers: ["@john", "@sarah"],
        notes: [
          {
            content: "Remember to add proper error handling",
            date: "2023-05-10",
          },
        ],
        createdAt: "2023-05-01T12:00:00Z",
        updatedAt: "2023-05-10T14:30:00Z",
      },
      {
        id: 1,
        title: "Complete the todo app",
        description: "Finish implementing all required features",
        priority: "high",
        completed: false,
        tags: ["work", "coding"],
        assignedUsers: ["@john", "@sarah"],
        notes: [
          {
            content: "Remember to add proper error handling",
            date: "2023-05-10",
          },
        ],
        createdAt: "2023-05-01T12:00:00Z",
        updatedAt: "2023-05-10T14:30:00Z",
      },
    ]);
  }, []);

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
      }}
    >
      <div className=" app-container ">
        <Header />
        <main className="app-main">
          <FilterSidebar />
          <section className="todo-content">
            <div className="w-full flex justify-between">
              <Button
                varient={"btn-primary"}
                label={"Add Todo"}
                startIcon={false}
                onClick={() => {}}
              />
              <SearchBar />
            </div>
            <div className="todo-list">
              {todoList.map((todo, index) => (
                <TodoItem key={index} todo={todo} />
              ))}
            </div>
            <Pagination />
          </section>
        </main>
      </div>
    </todoContext.Provider>
  );
}
