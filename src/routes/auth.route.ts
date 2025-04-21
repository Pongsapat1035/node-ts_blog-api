import express from "express";
import { registerHandler, loginHandler, checkToken } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/check-token", checkToken)
export default router;
