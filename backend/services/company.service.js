import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeCompanyId(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("Invalid company id");
  }

  return numericId;
}

export async function createCompany(data) {
  return await prisma.company.create({
    data: {
      name: data.name.trim(),
      city: data.city,
      address: data.address.trim(),
      description: data.description || null,
      foundedOn: new Date(data.foundedOn),
      logo: data.logo || null,
    },
    include: {
      reviews: true,
    },
  });
}

export async function geTcompanies() {
  return await prisma.company.findMany({
    include: {
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCompanyById(id) {
  return await prisma.company.findUnique({
    where: {
      id: normalizeCompanyId(id),
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
