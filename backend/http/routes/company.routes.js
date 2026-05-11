import { Router } from "express";

import {  getCompanies, getCompany, postCreateCompany} from "../controller/company.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.post("/", postCreateCompany);

router.get("/", getCompanies);

router.get("/:id", getCompany);

export default router;
