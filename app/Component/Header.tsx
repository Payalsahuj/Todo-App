import { useContext } from "react";
import { Dropdown } from "./Dropdown";

import { todoContext } from "./HomePage";
import Image from "next/image";
import { Button } from "./Button";

export const Header = () => {
  const { currentUser } = useContext(todoContext);
  return (
    <header className="app-header">
      <h1>Todo List</h1>
      <div className="user-controls">
        <Button
          varient={"btn-secondary"}
          label={"Export"}
          startIcon={true}
          onClick={() => {}}
        />

        <Dropdown />

        <div className="user-profile">
          <span className="username">{currentUser?.username}</span>
          {/* <Image
            src={""}
            alt="User avatar"
            width={36}
            height={36}
            className="avatar"
          /> */}
        </div>
      </div>
    </header>
  );
};
