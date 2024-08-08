import express from 'express'
import { deletejob, getAlljobs, getmyJobs, getSingleJob, postJob, updatejob } from '../controllers/jobController.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();
 
router.get('/getall',getAlljobs);
router.post('/post',isAuthorized,postJob);
router.get("/getmyjobs", isAuthorized, getmyJobs);
router.put("/updatejobs/:id", isAuthorized, updatejob);
router.delete("/deletejob/:id",isAuthorized,deletejob);
router.get("/getsinglejob/:id",isAuthorized,getSingleJob);
export default router;