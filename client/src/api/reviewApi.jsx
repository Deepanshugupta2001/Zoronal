import auth from "../lib/auth";
import axios from "./axios";

async function getReviews(companyId) {
  const {
    data: { data },
  } = await axios({
    method: "get",
    url: `/api/reviews/${companyId}`,
  });

  return data;
}

async function createReview(
  companyId,
  {
    reviewer,
    subject,
    reviewText,
    rating,
  }
) {
  const {
    data: { data },
  } = await axios({
    method: "post",
    url: `/api/reviews/${companyId}`,

    headers: {
      Authorization: `Bearer ${auth.token || ""}`,
    },

    data: {
      reviewer,
      subject,
      reviewText,
      rating,
    },
  });

  return data;
}

export const reviewApi = {
  getReviews,
  createReview,
};