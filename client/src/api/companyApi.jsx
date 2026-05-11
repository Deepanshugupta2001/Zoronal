import axios from "./axios";
import auth from "../lib/auth";

const authHeaders = () => ({
  Authorization: `Bearer ${auth.token || ""}`,
});

async function getCompanies() {
  const {
    data: { data },
  } = await axios({
    method: "get",
    url: "/api/company",
    headers: authHeaders(),
  });

  return data;
}

async function getCompany(id) {
  const {
    data: { data },
  } = await axios({
    method: "get",
    url: `/api/company/${id}`,
    headers: authHeaders(),
  });

  return data;
}

async function createCompany({
  name,
  city,
  address,
  description,
  foundedOn,
  logo,
}) {
  const {
    data: { data },
  } = await axios({
    method: "post",
    url: "/api/company",
    headers: authHeaders(),
    data: {
      name,
      city,
      address,
      description,
      foundedOn,
      logo,
    },
  });

  return data;
}

export const companyApi = {
  getCompanies,
  getCompany,
  createCompany,
};
