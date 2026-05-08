import { z } from 'zod'

export const reviewSchema = z.object({
  reviewer: z.string().trim().min(1, "Reviewer name is required"),

  subject: z.string().trim().min(1, "Subject is required"),

  reviewText: z.string().trim().min(1, "Review text is required"),

  rating: z.number().min(1).max(5)
})
