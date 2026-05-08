import auth from "../lib/auth";
import axios from "./axios";

async function signup({ name, email, password }) {
  const {
    data: { data },
  } = await axios({
    method: "post",
    url: "/api/auth/signup",
    data: {
      name,
      email,
      password,
    },
  });
  return data;
}

async function login({ email, password }) {
  const {
    data: { data },
  } = await axios({
    method: "post",
    url: "/api/auth/login",
    data: {
      email,
      password,
    },
  });
  return data;
}

async function me() {
  const {
    data: { data },
  } = await axios({
    method: "post",
    url: "/api/auth/me",
    headers: {
      Authorization: `Bearer ${auth.token || ""}`,
    },
  });
  return data;
}

export const authApi = {
  signup,
  login,
  me,
};
