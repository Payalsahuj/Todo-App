import { useContext } from "react";
import { Dropdown } from "./Dropdown";

import { todoContext } from "./HomePage";

import { Button } from "./Button";
import Image from "next/image";
import axios from "axios";

export const Header = ({ username }: { username: string }) => {
  const { todoList, currentUser } = useContext(todoContext);

  return (
    <header className="app-header">
      <h1>Todo List</h1>
      <div className="user-controls">
        <Button
          varient={"btn-secondary"}
          label={"Export"}
          startIcon={true}
          onClick={() => {
            axios.get("/api/todos/export").then((response) => {
              const element = document.createElement("a");
              const file = new Blob([JSON.stringify(response?.data?.data)], {
                type: "application/json",
              });
              element.href = URL.createObjectURL(file);
              element.download = "todos.json";
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
            });
          }}
        />

        <Dropdown />

        <div className="user-profile">
          <span className="username">{username}</span>
          <Image
            src={`https://api.dicebear.com/9.x/bottts/svg?seed=${currentUser.username}&r=50&size=34`}
            alt="User avatar"
            width={36}
            height={36}
            objectFit="contain"
            className="avatar"
            unoptimized
          />
        </div>
      </div>
    </header>
  );
};
