import { useContext, useState } from "react";
import { todoContext, User } from "./HomePage";

export const Dropdown = () => {
  const { currentUser, setCurrentUser, userList } = useContext(todoContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleUserSwitch = (user: User) => {
    setCurrentUser(user);
    setIsOpen(false);
  };

  return (
    <div className="user-switcher relative">
      <button
        className="user-switcher-btn flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="current-username">{currentUser?.username}</span>
        <i className="fas fa-chevron-down"></i>
      </button>

      {isOpen ? (
        <div className="user-dropdown absolute top-full left-0 w-[200px] bg-white border border-gray-200 rounded shadow-md mt-2 z-50">
          {userList.map((user) => (
            <div
              key={user.id}
              className="user-dropdown-item flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleUserSwitch(user)}
            >
              <span className="text-sm">{user.username}</span>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
