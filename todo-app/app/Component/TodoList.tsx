"use client";

import type React from "react";

import { useState } from "react";
import { Todo } from "../page";
import NoteIcon from "@mui/icons-material/Note";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoDetailsModal from "./TodoDetailsModal";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="todo-item" onClick={() => setShowDetails(true)}>
        <div className="todo-checkbox" onClick={() => {}}>
          <input
            type="checkbox"
            id={`todo-${todo.id}`}
            checked={todo.completed}
            readOnly
          />
          <label htmlFor={`todo-${todo.id}`}></label>
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
              setShowDetails(true);
            }}
          >
            <EditNoteIcon />
          </button>
          <button
            className="todo-delete-btn"
            title="Delete todo"
            // onClick={() => {})
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {showDetails && (
        <TodoDetailsModal
          todo={todo}
          users={todo.assignedUsers}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
