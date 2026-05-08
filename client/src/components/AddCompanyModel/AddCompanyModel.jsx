import { useState } from "react";

import "./AddCompanyModel.css";

import useCompany from "../../context/companyContext";

const AddCompanyModel = ({
  closeModal,
}) => {
  const { createCompany } =
    useCompany();

  const [formData, setFormData] =
    useState({
      name: "",
      city: "",
      address: "",
      description: "",
      foundedOn: "",
      logo: "",
    });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const data = await createCompany({
      ...formData,
      name: formData.name.trim(),
      city: formData.city.trim(),
      address: formData.address.trim(),
      description: formData.description.trim(),
      logo: formData.logo.trim(),
    });

    if (!data) {
      setError("Company could not be added. Check all fields and try again.");
      return;
    }

    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Company</h2>

        <form
          onSubmit={handleSubmit}
        >
          {error && <p className="modal-error">{error}</p>}

          <input
            type="text"
            placeholder="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Description"
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
          />

          <input
            type="date"
            name="foundedOn"
            value={
              formData.foundedOn
            }
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Logo URL"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">
              Add Company
            </button>

            <button
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModel;
