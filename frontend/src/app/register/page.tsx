"use client"
import React, { useState } from "react";
import userRegister from "@/libs/useRegister";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function RegisterPage() {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("staff");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !tel || !role) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await userRegister(name, email, tel, role, password);
      // notify success only (no redirect)
      alert("Registration successful");
      // optional: clear form
      setName("");
      setEmail("");
      setTel("");
      setRole("staff");
      setPassword("");
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-lg mx-auto my-8 px-5">
    <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
      <h1 className="text-2xl font-bold mb-6 text-center">Registeration</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Name
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="name"
            className="p-2 border rounded-md" 
          />
        </label>

        <label className="flex flex-col gap-1">
          Email
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="email@example.com"
            className="p-2 border rounded-md" 
          />
        </label>

        <label className="flex flex-col gap-1">
          Tel
          <input 
            value={tel} 
            onChange={(e) => setTel(e.target.value)} 
            placeholder="telephone number"
            className="p-2 border rounded-md" 
          />
        </label>

        <label className="flex flex-col gap-1">
          Role
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Password
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="p-2 border rounded-md" 
          />
        </label>

        {error && <div className="text-red-500">{error}</div>}

        <button 
          type="submit" 
          disabled={loading}
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:bg-gray-300"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      </Suspense>

      {/* <p className="mt-4 text-center">
        Already have an account? {" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </p> */}
    </main>
  );
}