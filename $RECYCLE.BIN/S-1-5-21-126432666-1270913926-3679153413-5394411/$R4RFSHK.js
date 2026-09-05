import express from "express";
import { getAllScheduledEmails } from "../controller/scheduledEmail.controllers.js";

const router = express.Router();

// Add this route
router.get("/scheduled-emails", getAllScheduledEmails);

export default router;