import React, { useState, useContext } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = {
      username: username,
      password: password,
    };
    try {
      axios.post("http://localhost:3001/auth/login", data).then((res) => {
        if (res.data.success) {
          localStorage.setItem("accessToken", res.data.data.token);
          setAuthState({
            id: res.data.data.id,
            username: username,
            logged: true,
          });
          toast.success("Logged in successfully");
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="border rounded p-6 w-2/3">
        <div>
          <div className="flex flex-col gap-4">
            <label htmlFor="username">Username:</label>
            <input
              autoComplete="off"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="border p-2"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="new-password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border p-2"
            />
            <button
              onClick={login}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Login
            </button>
            <div className="flex gap-2">
              <p>Dont't have an account?</p>
              <Link
                className="text-gray-700 hover:text-gray-500 underline"
                to={"/account/register"}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
