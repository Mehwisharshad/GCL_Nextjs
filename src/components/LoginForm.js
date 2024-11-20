"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await fetch("http://localhost/Test_Api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Server response:", data); // Debugging log
  
      // Check if the status is "success"
      if (response.ok && data.status === "success") {
        setSuccess(data.message || "Login successful.");
        setError(null);
  
        // Save the user ID or token if needed
        localStorage.setItem("userId", data.user_id); // Save the user ID to localStorage
  
        console.log("Redirecting to dashboard...");
        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        setError(data.message || "Invalid email or password.");
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
      setSuccess(null);
    }
  };
  

  return (
    <div
      className="flex items-center justify-center h-screen  "
      style={{
        backgroundImage: 'url("./120702.jpg")', // Replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-transparent bg-opacity-50 backdrop-blur-md p-6 rounded-[20px] shadow-lg  w-full max-w-md h-auto"
        style={{
          border: "2px solid rgba(255, 255, 255, 0.2)", // Custom border
        }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            {/* <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label> */}
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500 " style={{
                border: "2px solid rgba(255, 255, 255, .2)", // Custom border
              }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            {/* <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label> */}
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500" style={{
                border: "2px solid rgba(255, 255, 255, .2)", // Custom border
              }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-[40px] hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        {success && (
          <p className="text-green-500 mt-4 text-center">{success}</p>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
