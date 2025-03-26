"use client";
import { createContext, useEffect, useState } from "react";
import { Header } from "./Component/Header";
import FilterSidebar from "./Component/FilterSideBar";
import { Button } from "./Component/Button";
import SearchBar from "./Component/SearchBar";

export interface User {
  id: number;
  username: string;
  email: string;
}

export const todoContext = createContext({
  userList: [] as User[],
  setUserList: (userList: User[]) => {},
  currentUser: null as User | null,
  setCurrentUser: (user: User) => {},
});

export default function Home() {
  const [userList, setUserList] = useState([] as User[]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
  }, []);
  return (
    <todoContext.Provider
      value={{ userList, setUserList, currentUser, setCurrentUser }}
    >
      <div className=" app-container ">
        <Header />
        <main className="app-main">
          <FilterSidebar />
          <section className="todo-content">
            <div className="todo-actions">
              <Button
                varient={"btn-primary"}
                label={"Add Todo"}
                startIcon={false}
                onClick={() => {}}
              />
              <SearchBar />
            </div>

            {/* List*/}
          </section>
        </main>
      </div>
    </todoContext.Provider>
  );
}
