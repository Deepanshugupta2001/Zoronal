import { Router } from "express";
import { getMe, postLogin, postSignup } from "../controller/auth.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/me', requireAuth, getMe);

export default router