import type React from "react";

import { useContext, useState } from "react";
import { Todo, todoContext, User } from "./HomePage";
import axios from "axios";

interface TodoDetailsModalProps {
  todo: Todo;
  users: String[];
  onClose: () => void;
}

export default function TodoDetailsModal({
  todo,
  users,
  onClose,
}: TodoDetailsModalProps) {
  const [noteContent, setNoteContent] = useState("");
  const {
    isEditing,
    setIsEditing,
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    getTodoList,
  } = useContext(todoContext);

  const handleUdate = async (todo: Todo) => {
    try {
      const updatedTodo = await axios.put(`/api/todos/${todo._id}`, {
        title,
        description,
        priority,
      });

      if (updatedTodo) {
        console.log("Todo updated successfully");
      }
    } catch (err) {
      console.error("Failed to update todo:", err);
    } finally {
      onClose();
      getTodoList();
    }
  };

  const handleAddNote = async (todo: Todo) => {
    if (!noteContent.trim()) {
      alert("Note cannot be empty.");
      return;
    }

    try {
      const newNote = {
        content: noteContent,
        date: new Date().toISOString(),
      };

      const updatedNotes = [...(todo?.notes || []), newNote];

      const response = await axios.post(`/api/todos/${todo?._id}/notes`, {
        notes: updatedNotes,
      });
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note.");
    } finally {
      setNoteContent("");
      getTodoList();
      // onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-content"
      >
        <div className="modal-header">
          <h2>{isEditing ? "Edit Todo" : "Todo Details"}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="todo-details">
          {isEditing ? (
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  type="text"
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="edit-priority">Priority</label>
                <select
                  id="edit-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  required
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUdate(todo)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="todo-details-header">
                <div>
                  <h3 className="todo-details-title">{todo.title}</h3>
                  <p className="todo-details-description">{todo.description}</p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setTitle(todo.title);
                    setDescription(todo.description);
                    setPriority(todo.priority);
                    setIsEditing(true);
                  }}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
              </div>

              <div className="todo-details-meta">
                <div>
                  <strong>Priority:</strong>
                  <span
                    className={`todo-priority priority-${todo.priority} ml-2`}
                  >
                    {todo.priority.charAt(0).toUpperCase() +
                      todo.priority.slice(1)}
                  </span>
                </div>
                <div>
                  <strong>Status:</strong>
                  <span className="ml-2">
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <div>
                  <strong>Created:</strong>
                  <span className="ml-2">
                    {new Date(todo?.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="todo-details-section">
                <h3>Tags</h3>
                <div className="todo-tags">
                  {todo.tags.length > 0 ? (
                    todo.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No tags</p>
                  )}
                </div>
              </div>

              <div className="todo-details-section">
                <h3>Assigned Users</h3>
                <div className="todo-users">
                  {todo.assignedUsers.length > 0 ? (
                    todo.assignedUsers.map((user, index) => (
                      <span key={index} className="user-tag">
                        {user}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No assigned users</p>
                  )}
                </div>
              </div>

              <div className="todo-details-section">
                <h3>Notes</h3>
                <div className="notes-list">
                  {todo.notes.length > 0 ? (
                    todo.notes.map((note, index) => (
                      <div key={index} className="note-item">
                        <p className="note-content">{note.content}</p>
                        <p className="note-date">{note.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No notes yet</p>
                  )}
                </div>

                <form
                  className="add-note-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleAddNote(todo);
                  }}
                >
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Add a note..."
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="btn btn-primary  justify-center flex"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
