import { useState } from "react";

import "./CompanyCard.css";

import { Link } from "react-router-dom";
import { FaLocationDot, FaStar, FaStarHalfStroke } from "react-icons/fa6";

const formatDate = (value) => {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const CompanyCard = ({ company }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const averageRating =
    company.reviews?.length > 0
      ? (
          company.reviews.reduce((acc, item) => acc + item.rating, 0) /
          company.reviews.length
        ).toFixed(1)
      : "0.0";
  const reviewCount = company.reviews?.length || 0;
  const initials = company.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="company-card">
      <div className="company-card-left">
        {company.logo && !imageFailed ? (
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="company-logo-fallback">{initials}</div>
        )}

        <div className="company-details">
          <h2>{company.name}</h2>

          <p>
            <FaLocationDot />
            {company.address}
          </p>

          <div className="company-rating">
            <strong>{averageRating}</strong>

            <span className="stars" aria-label={`${averageRating} rating`}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfStroke />
            </span>

            <span>
              {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        </div>
      </div>

      <div className="company-card-right">
        <p>Founded On {formatDate(company.foundedOn)}</p>

        <Link to={`/company/${company.id}`}>
          <button>Detail Review</button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
