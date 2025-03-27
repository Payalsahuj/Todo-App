import { useContext } from "react";
import { Button } from "./Button";
import { Todo, todoContext } from "./HomePage";

import axios from "axios";

export const DeleteModal = ({
  onClose,
  todo,
}: {
  onClose: () => void;
  todo: Todo;
}) => {
  const { getTodoList } = useContext(todoContext);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/todos/${id}`);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error deleting todo:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.error ||
            "An error occurred while deleting the todo."
        );
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      getTodoList();
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
        <div className="todo-details">
          <div className="modal-form flex text-left">
            <span>
              {` Are you sure you want to delete this todo (${todo?.title})? This action cannot be
              undone.`}
            </span>
          </div>
        </div>
        <br />
        <Button
          label="Delete"
          varient="btn-danger"
          startIcon={false}
          onClick={() => {
            handleDelete(todo?._id || "");
          }}
        />
        <Button
          label="Cancel"
          varient="btn-secondary ml-2"
          startIcon={false}
          onClick={() => {
            onClose();
          }}
        />
      </div>
    </div>
  );
};
