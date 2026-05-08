import { Router } from "express";

import {  getCompanies, getCompany, postCreateCompany} from "../controller/company.controller.js";

const router = Router();

router.post("/", postCreateCompany);

router.get("/", getCompanies);

router.get("/:id", getCompany);

export default router;