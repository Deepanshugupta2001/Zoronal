import { useEffect, useMemo, useState } from "react";

import "./Dashboard.css";

import Navbar from "../components/Navbar/Navbar";

import CompanyCard from "../components/CompanyCard/CompanyCard";

import AddCompanyModel from "../components/AddCompanyModel/AddCompanyModel";

import useCompany from "../context/companyContext";

const Dashboard = () => {
  const {
    companies,
    getCompanies,
  } = useCompany();

  const [openModal, setOpenModal] =
    useState(false);
  const [city, setCity] = useState(
    "Indore, Madhya Pradesh, India"
  );
  const [query, setQuery] = useState("");
  const [appliedCity, setAppliedCity] = useState(
    "Indore, Madhya Pradesh, India"
  );
  const [appliedQuery, setAppliedQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    getCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase();
    const normalizedCity = appliedCity.trim().toLowerCase();

    return [...companies]
      .filter((company) => {
        const searchable = [
          company.name,
          company.address,
          company.city,
          company.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesQuery =
          !normalizedQuery || searchable.includes(normalizedQuery);
        const matchesCity =
          !normalizedCity ||
          searchable.includes(normalizedCity.split(",")[0]);

        return matchesQuery && matchesCity;
      })
      .sort((a, b) => {
        const average = (company) =>
          company.reviews?.length
            ? company.reviews.reduce(
                (total, review) => total + review.rating,
                0
              ) / company.reviews.length
            : 0;

        if (sortBy === "rating") {
          return average(b) - average(a);
        }

        if (sortBy === "date") {
          return (
            new Date(b.createdAt || b.foundedOn) -
            new Date(a.createdAt || a.foundedOn)
          );
        }

        return a.name.localeCompare(b.name);
      });
  }, [appliedCity, appliedQuery, companies, sortBy]);

  const handleFindCompany = () => {
    setAppliedCity(city);
    setAppliedQuery(query);
  };

  return (
    <div className="dashboard">
      <Navbar searchValue={query} onSearchChange={setQuery} />

      <div className="dashboard-container">
        <div className="dashboard-top">
          <div className="dashboard-city">
            <label>
              Select City
            </label>

            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Indore, Madhya Pradesh, India"
            />
          </div>

          <button className="find-btn" onClick={handleFindCompany}>
            Find Company
          </button>

          <button
            className="add-btn"
            onClick={() =>
              setOpenModal(true)
            }
          >
            + Add Company
          </button>

          <div className="sort-box">
            <label>Sort:</label>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="name">
                Name
              </option>

              <option value="rating">
                Rating
              </option>

              <option value="date">
                Date
              </option>
            </select>
          </div>
        </div>

        <div className="company-list">
          <p className="result-text">
            Result Found :{" "}
            {filteredCompanies.length}
            {(appliedQuery || appliedCity) && (
              <span>
                {" "}
                for {[appliedQuery, appliedCity].filter(Boolean).join(" in ")}
              </span>
            )}
          </p>

          {filteredCompanies.map(
            (company) => (
              <CompanyCard
                key={company.id}
                company={company}
              />
            )
          )}

          {!filteredCompanies.length && (
            <div className="empty-state">
              No companies found for this search.
            </div>
          )}
        </div>
      </div>

      {openModal && (
        <AddCompanyModel
          closeModal={() =>
            setOpenModal(false)
          }
        />
      )}
    </div>
  );
};

export default Dashboard;
