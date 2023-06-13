import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (err) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <div className="mt-4 grow flex items-center justify-center">
        <div className="mb-64">
          <h1 className="text-3xl text-center mb-4">Register</h1>
          <form className="max-w-lg mx-auto" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button className="buttonRed">Submit</button>
            <div className="text-center py-2 text-gray-500">
              Alreadt a member? &nbsp;
              <Link className="underline text-black" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
