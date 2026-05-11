import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeCompanyId(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("Invalid company id");
  }

  return numericId;
}

export async function createCompany(data, userId) {
  return await prisma.company.create({
    data: {
      name: data.name.trim(),
      city: data.city,
      address: data.address.trim(),
      description: data.description || null,
      foundedOn: new Date(data.foundedOn),
      logo: data.logo || null,
      userId,
    },
    include: {
      reviews: true,
    },
  });
}

export async function geTcompanies(userId) {
  return await prisma.company.findMany({
    where: {
      userId,
    },
    include: {
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCompanyById(id, userId) {
  return await prisma.company.findFirst({
    where: {
      id: normalizeCompanyId(id),
      userId,
    },
    include: {
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
