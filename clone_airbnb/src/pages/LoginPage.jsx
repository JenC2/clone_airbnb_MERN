import Header from "../components/Header";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  // add states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios.post("/login", { email, password });
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <div className="mt-4 grow flex items-center justify-center">
        <div className="mb-64">
          <h1 className="text-3xl text-center mb-4">Login</h1>
          <form className="max-w-lg mx-auto" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="buttonRed">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet? &nbsp;
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
