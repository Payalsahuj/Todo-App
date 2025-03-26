import { useContext } from "react";
import { Dropdown } from "./Dropdown";
import { ExportButton } from "./ExportButton";
import { todoContext } from "../page";
import Image from "next/image";

export const Header = () => {
  const { currentUser } = useContext(todoContext);
  return (
    <header className="app-header">
      <h1>Todo List</h1>
      <div className="user-controls">
        <ExportButton />

        <Dropdown />

        <div className="user-profile">
          <span className="username">{currentUser?.username}</span>
          <Image
            src={""}
            alt="User avatar"
            width={36}
            height={36}
            className="avatar"
          />
        </div>
      </div>
    </header>
  );
};
