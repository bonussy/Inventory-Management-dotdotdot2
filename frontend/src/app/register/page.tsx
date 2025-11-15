"use client"
import React, { useState } from "react";
import userRegister from "@/libs/useRegister";

export default function RegisterPage() {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("staff");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name || !email || !password || !tel || !role) {
      setError("All fields are required.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await userRegister(name, email, tel, role, password);
      setSuccess(true);
      // Clear form
      setName("");
      setEmail("");
      setTel("");
      setRole("staff");
      setPassword("");
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Join our inventory management system
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in duration-300">
              <p className="text-green-800 font-semibold text-center text-sm sm:text-base">
                ✓ Registration successful!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input 
                id="name"
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john@example.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="tel" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input 
                id="tel"
                type="tel" 
                value={tel} 
                onChange={(e) => setTel(e.target.value)} 
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <select 
                id="role"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition cursor-pointer"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
                required
              />
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg animate-in shake duration-300">
                <p className="text-red-800 text-xs sm:text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:shadow-none text-sm sm:text-base"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}