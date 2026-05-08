import { reviewSchema } from "../../schemas/review.schemas.js";
import { createReview, getCompanyReviews } from "../../services/review.service.js";

export async function postReview(req, res,next) {
  try {
    const result = reviewSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Please fill all review fields correctly.",
        error: result.error.issues,
      });
    }

    const data = await createReview(result.data, req.params.companyId);

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({
      message: "Error Creating Review",
      error: error.message,
    });
  }
}

export async function fetchReviews(req, res, next) {
  try {
    const data = await getCompanyReviews(req.params.companyId);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({
      message: "Error Fetching Reviews",
      error: error.message,
    });
  }
}
