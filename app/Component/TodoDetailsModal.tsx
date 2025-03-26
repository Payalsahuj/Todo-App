"use client";

import type React from "react";

import { useContext, useState } from "react";
import { Todo, User } from "../page";

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
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [noteContent, setNoteContent] = useState("");

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
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="edit-priority">Priority</label>
                <select
                  id="edit-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
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
                  onClick={() => {}}
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
                  onClick={() => setIsEditing(true)}
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
                    {new Date(todo.createdAt).toLocaleDateString()}
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

                <form className="add-note-form" onSubmit={() => {}}>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Add a note..."
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Note
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
