import { useEffect, useMemo, useState } from "react";

import "./CompanyDetails.css";

import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import useCompany from "../context/companyContext";
import useReview from "../context/reviewContext";
import { FaArrowLeft, FaLocationDot, FaStar } from "react-icons/fa6";

const CompanyDetails = () => {
  const { id } = useParams();
  const { getCompany } = useCompany();
  const { createReview } = useReview();

  const [company, setCompany] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [formData, setFormData] = useState({
    reviewer: "",
    subject: "",
    reviewText: "",
    rating: 5,
  });

  useEffect(() => {
    loadCompany();
  }, [id]);

  async function loadCompany() {
    setError("");

    const data = await getCompany(id);

    if (!data) {
      setCompany(null);
      setError("Company details could not be loaded.");
      return;
    }

    setImageFailed(false);
    setCompany(data);
  }

  const reviews = useMemo(() => {
    const reviewList = [...(company?.reviews || [])];

    return reviewList.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "relevance") {
        return (b.reviewText || "").length - (a.reviewText || "").length;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [company, sortBy]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "0.0";

    return (
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    ).toFixed(1);
  }, [reviews]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");

    const data = await createReview(id, {
      ...formData,
      rating: Number(formData.rating),
    });

    if (!data) {
      setReviewError("Review could not be submitted. Fill all fields and try again.");
      return;
    }

    await loadCompany();

    setFormData({
      reviewer: "",
      subject: "",
      reviewText: "",
      rating: 5,
    });
  };

  if (!company) {
    return (
      <div className="company-details-page">
        <Navbar />
        <div className="company-details-container">
          <div className="loading-state">
            {error || "Loading company..."}
            {error && (
              <Link className="back-link centered-link" to="/dashboard">
                <FaArrowLeft />
                Back to companies
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-details-page">
      <Navbar />

      <div className="company-details-container">
        <Link className="back-link" to="/dashboard">
          <FaArrowLeft />
          Back to companies
        </Link>

        <div className="company-header">
          {company.logo && !imageFailed ? (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="details-logo-fallback">
              {company.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="company-header-content">
            <h1>{company.name}</h1>

            <p>
              <FaLocationDot />
              {company.address}
            </p>

            {company.description && <p>{company.description}</p>}

            <div className="average-rating">
              <strong>{averageRating}</strong>
              <span>
                <FaStar />
                Average rating from {reviews.length} review
                {reviews.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>

        <div className="review-panel">
          <div className="review-form">
            <h2>Add Review</h2>

            <form onSubmit={handleSubmit}>
              {reviewError && <p className="form-error">{reviewError}</p>}

              <input
                type="text"
                placeholder="Full Name"
                name="reviewer"
                value={formData.reviewer}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                placeholder="Write Review"
                name="reviewText"
                value={formData.reviewText}
                onChange={handleChange}
                required
              />

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>

              <button type="submit">Submit Review</button>
            </form>
          </div>

          <div className="reviews-section">
            <div className="reviews-heading">
              <div>
                <span>Reviews</span>
                <h2>{reviews.length} total</h2>
              </div>

              <label>
                Sort:
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="date">Date</option>
                  <option value="rating">Rating</option>
                  <option value="relevance">Relevance</option>
                </select>
              </label>
            </div>

            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {!reviews.length && (
              <div className="empty-state">No reviews yet. Add the first one.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
