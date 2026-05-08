import { useState } from "react";

import "./Login.css";

import useAuth from "../context/authContext";

import auth from "../lib/auth";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const formSubmitHandler =
    async (e) => {
      e.preventDefault();

      try {
        const { user, token } =
          await login({
            email,
            password,
          });

        auth.token = token;
        auth.user = user;

        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        alert("Login Failed");
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>

        <form
          onSubmit={
            formSubmitHandler
          }
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          Not a user?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
