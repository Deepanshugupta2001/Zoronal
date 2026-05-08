import { createContext, useContext, useState } from "react";
import { companyApi } from "../api/companyApi";

const context = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [singleCompany, setSingleCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCompanies() {
    try {
      setLoading(true);

      const data = await companyApi.getCompanies();

      setCompanies(data);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function getCompany(id) {
    try {
      setLoading(true);

      const data = await companyApi.getCompany(id);

      setSingleCompany(data);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createCompany(companyData) {
    try {
      setLoading(true);

      const data = await companyApi.createCompany(companyData);

      setCompanies((prev) => [...prev, data]);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <context.Provider
      value={{
        companies,
        singleCompany,
        loading,
        getCompanies,
        getCompany,
        createCompany,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default function useCompany() {
  return useContext(context);
}
