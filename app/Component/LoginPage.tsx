"use client";

import { Magic } from "magic-sdk";
import { useState } from "react";

export const Login = () => {
  if (typeof window === "undefined") {
    return;
  }

  const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_CLIENT || "", {
    deferPreload: true,
  });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await magic.auth
        .loginWithEmailOTP({
          email: email,
        })
        .then((res) => {
          console.log("Login response:", res);
          fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: res }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("User data:", data?.user?.token);
              document.cookie = `token=${data?.user?.token}; path=/`;
              // Redirect to home page
              window.location.href = "/";
            });
        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6">Todo App</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 cursor-pointer"
        >
          {isLoading ? "Logging in..." : "Login to continue"}
        </button>
      </div>
    </div>
  );
};

export default Login;
