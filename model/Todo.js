import mongoose from "mongoose";

const Todo = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    completed: { type: Boolean, default: false },
    tags: { type: [String], default: [] }, // Correct array syntax
    assignedUsers: { type: [String], default: [] }, // Correct array syntax
    notes: [
      {
        content: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Todo || mongoose.model("Todo", Todo);
