import { PrismaClient } from "@prisma/client";
import { createCompany, geTcompanies, getCompanyById } from "../../services/company.service.js";
import { companySchema } from "../../schemas/company.schemas.js";

const prisma = new PrismaClient();

export async function postCreateCompany(req,res,next) {
  try {
    const result = await companySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Please fill all required company details correctly.",
        error: result.error.issues,
      });
    }

    const data = await createCompany(result.data, req.user.id);

    return res.status(201).json({
        data
    })
  } catch (error) {
        return res.status(500).json({
            message : "Error while Creating Company",
            error: error.message
        })
  }
}

export async function getCompany(req,res,next) {
  try {
    const data = await getCompanyById(req.params.id, req.user.id);

    if (!data) {
      return res.status(404).json({
        message: "Company not found",
        data: null,
      });
    }

    return res.status(200).json({
        data
    })
  } catch (error) {
    return res.status(500).json({
        message : "Cannot get this particular Company",
        error: error.message
    })
  }
}

export async function getCompanies(req,res,next) {
    try{
        const data = await geTcompanies(req.user.id);

        res.status(200).json({
            data
        })
    }
    catch(error){
        res.status(500).json({
            message: "Cannot get all Companies",
            error
        })
    }
}
