import { createContext, useContext, useState } from "react";
import { reviewApi } from "../api/reviewApi";

const context = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getReviews(companyId) {
    try {
      setLoading(true);

      const data = await reviewApi.getReviews(companyId);

      setReviews(data);

      return data;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createReview(companyId, reviewData) {
    try {
      setLoading(true);

      const data = await reviewApi.createReview(
        companyId,
        reviewData
      );

      setReviews((prev) => [...prev, data]);

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
        reviews,
        loading,
        getReviews,
        createReview,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default function useReview() {
  return useContext(context);
}
