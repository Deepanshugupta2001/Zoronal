import { useState } from "react";

import "./Signup.css";

import useAuth from "../context/authContext";

import auth from "../lib/auth";

import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const { signup } =
    useAuth();

  const navigate =
    useNavigate();

  const formSubmitHandler =
    async (e) => {
      e.preventDefault();

      try {
        const { token, user } =
          await signup({
            name,
            email,
            password,
          });

        auth.token = token;
        auth.user = user;

        navigate("/dashboard");
      } catch (error) {
        console.log(error);

        alert(
          "Signup Failed"
        );
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Signup</h1>

        <form
          onSubmit={
            formSubmitHandler
          }
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

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
            Signup
          </button>
        </form>

        <p className="auth-link">
          Already a user?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
