import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeCompanyId(companyId) {
  const numericId = Number(companyId);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("Invalid company id");
  }

  return numericId;
}

export async function createReview(data, companyId) {
  return await prisma.review.create({
    data: {
      reviewer: data.reviewer.trim(),
      subject: data.subject.trim(),
      reviewText: data.reviewText.trim(),
      rating: data.rating,
      companyId: normalizeCompanyId(companyId),
    },
  });
}

export async function getCompanyReviews(companyId) {
  return await prisma.review.findMany({
    where: {
      companyId: normalizeCompanyId(companyId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
