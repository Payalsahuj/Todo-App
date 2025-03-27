"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { todoContext, User } from "./HomePage";

interface AddTodoModalProps {
  users: User[];
  onClose: () => void;
}

export default function AddTodoModal({ users, onClose }: AddTodoModalProps) {
  const { addTodo } = useContext(todoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const userInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo({
      title,
      description,
      priority,
      completed: false,
      tags,
      assignedUsers: mentionedUsers,
      notes: [],
    });

    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUserMention = (username: string) => {
    const mentionTag = `@${username}`;
    if (!mentionedUsers.includes(mentionTag)) {
      setMentionedUsers([...mentionedUsers, mentionTag]);
    }
    setUserSearchTerm("");
    setShowUserDropdown(false);
  };

  const handleRemoveUser = (userToRemove: string) => {
    setMentionedUsers(mentionedUsers.filter((user) => user !== userToRemove));
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Todo</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter todo description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input-container">
              {tags.map((tag, index) => (
                <div key={index} className="tag-item">
                  {tag}
                  <span
                    className="tag-remove"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </span>
                </div>
              ))}
              <input
                type="text"
                className="tag-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                onBlur={handleAddTag}
                placeholder="Add tags (press Enter or comma)"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mention Users</label>
            <div className="user-mention-container">
              <div className="tag-input-container">
                {mentionedUsers.map((user, index) => (
                  <div key={index} className="tag-item">
                    {user}
                    <span
                      className="tag-remove"
                      onClick={() => handleRemoveUser(user)}
                    >
                      ×
                    </span>
                  </div>
                ))}
                <input
                  ref={userInputRef}
                  type="text"
                  className="tag-input"
                  value={userSearchTerm}
                  onChange={(e) => {
                    setUserSearchTerm(e.target.value);
                    setShowUserDropdown(true);
                  }}
                  onFocus={() => setShowUserDropdown(true)}
                  onBlur={() => {
                    setTimeout(() => setShowUserDropdown(false), 200);
                  }}
                  placeholder="@username"
                />
              </div>

              {showUserDropdown && (
                <div className="user-mention-dropdown">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        className="user-mention-item "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserMention(user.username);
                        }}
                      >
                        <span>
                          {user.username} (@{user.username})
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-gray-500">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
