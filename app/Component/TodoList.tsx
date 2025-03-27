import type React from "react";

import { useContext, useState } from "react";
import { Todo, todoContext } from "./HomePage";
import NoteIcon from "@mui/icons-material/Note";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoDetailsModal from "./TodoDetailsModal";
import axios from "axios";
import { DeleteModal } from "./DeleteModal";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [showDetails, setShowDetails] = useState(false);
  const { setIsEditing, getTodoList, setTitle, setDescription, setPriority } =
    useContext(todoContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCheckboxChange = async (todo: Todo) => {
    try {
      const updatedTodo = await axios.put(`/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });

      if (updatedTodo) {
        console.log("Todo updated successfully");
      }
    } catch (err) {
      console.error("Failed to update todo:", err);
    } finally {
      getTodoList();
    }
  };

  return (
    <>
      <div className="todo-item" onClick={() => setShowDetails(true)}>
        <div
          className="todo-checkbox"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            id={`todo-${todo._id}`}
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo)}
          />
          <label htmlFor={`todo-${todo._id}`}></label>
        </div>
        <div className="todo-content">
          <h3 className="todo-title">{todo.title}</h3>
          <div className="todo-meta">
            <span className={`todo-priority priority-${todo.priority}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            <div className="todo-tags">
              {todo.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="todo-users">
              {todo.assignedUsers.map((user, index) => (
                <span key={index} className="user-tag">
                  {user}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="todo-actions">
          <button
            className="todo-note-btn"
            title={`${todo.notes.length} note(s)`}
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
          >
            <NoteIcon />
          </button>
          <button
            className="todo-edit-btn"
            title="Edit todo"
            onClick={(e) => {
              e.stopPropagation();
              setTitle(todo.title);
              setDescription(todo.description);
              setPriority(todo.priority);
              setIsEditing(true);
              setShowDetails(true);
            }}
          >
            <EditNoteIcon />
          </button>
          <button
            className="todo-delete-btn"
            title="Delete todo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal(true);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {showDetails && (
        <TodoDetailsModal
          todo={todo}
          users={todo.assignedUsers}
          onClose={() => {
            setIsEditing(false);
            setShowDetails(false);
          }}
        />
      )}
      {openDeleteModal ? (
        <DeleteModal onClose={() => setOpenDeleteModal(false)} todo={todo} />
      ) : (
        <></>
      )}
    </>
  );
}
