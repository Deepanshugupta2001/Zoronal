import { Router } from "express";

import {
  postReview,
  fetchReviews,
} from "../controller/review.controller.js";

const router = Router();

router.post("/:companyId", postReview);

router.get("/:companyId", fetchReviews);

export default router;
