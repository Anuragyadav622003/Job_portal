import express from "express";
import { isAuthorized } from "../middlewares/auth.js";
import { employerGetAllapplications, jobseekerDeleteapplications, jobseekerGetAllapplications, postapplication } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllapplications);
router.get("/employer/getall", isAuthorized, employerGetAllapplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteapplications);
router.post("/post",isAuthorized,postapplication);


export default router;
