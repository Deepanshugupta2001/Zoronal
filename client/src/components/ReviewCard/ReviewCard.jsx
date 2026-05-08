import { useState } from "react";

import "./ReviewCard.css";

import { FaRegThumbsUp, FaShareNodes, FaStar } from "react-icons/fa6";

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(value))
    : "";

const ReviewCard = ({ review }) => {
  const [likes, setLikes] = useState(review.likes || 0);

  const handleShare = async () => {
    const shareText = `${review.subject}: ${review.reviewText}`;

    if (navigator.share) {
      await navigator.share({
        title: review.subject,
        text: shareText,
        url: window.location.href,
      });
      return;
    }

    await navigator.clipboard?.writeText(`${shareText} ${window.location.href}`);
  };

  return (
    <div className="review-card">
      <div className="review-top">
        <div>
          <h3>{review.subject}</h3>
          <span>
            By {review.reviewer} {formatDate(review.createdAt) && `on ${formatDate(review.createdAt)}`}
          </span>
        </div>

        <strong>
          <FaStar />
          {review.rating}
        </strong>
      </div>

      <p>{review.reviewText}</p>

      <div className="review-actions">
        <button type="button" onClick={() => setLikes((count) => count + 1)}>
          <FaRegThumbsUp />
          {likes}
        </button>

        <button type="button" onClick={handleShare}>
          <FaShareNodes />
          Share
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
