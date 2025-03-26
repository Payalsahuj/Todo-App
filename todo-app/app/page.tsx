"use client";
import { createContext, useEffect, useState } from "react";
import { Header } from "./Component/Header";
import FilterSidebar from "./Component/FilterSideBar";
import { Button } from "./Component/Button";
import SearchBar from "./Component/SearchBar";
import { todo } from "node:test";
import TodoItem from "./Component/TodoList";

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
});

export default function Home() {
  const [userList, setUserList] = useState([] as User[]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [todoList, setTodoList] = useState([] as Todo[]);

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
    ]);
  }, []);
  return (
    <todoContext.Provider
      value={{ userList, setUserList, currentUser, setCurrentUser, todoList }}
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
          </section>
        </main>
      </div>
    </todoContext.Provider>
  );
}
