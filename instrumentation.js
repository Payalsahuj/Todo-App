import connectDB from "@/lib/connectDB";

// Ensures MongoDB connection before handling requests
export async function register() {
  await connectDB();
}
