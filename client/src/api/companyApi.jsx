import axios from "./axios";

async function getCompanies() {
  const {
    data: { data },
  } = await axios({
    method: "get",
    url: "/api/company",
  });

  return data;
}

async function getCompany(id) {
  const {
    data: { data },
  } = await axios({
    method: "get",
    url: `/api/company/${id}`,
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