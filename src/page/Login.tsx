/* eslint-disable @typescript-eslint/await-thenable */
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log("🚀 ~ file: login.tsx:27 ~ handleSubmit ~ userData:", userData)
    dispatch(login(userData) as any);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
