import { cathAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Job from "../modals/jobSchema.js";

export const getAlljobs = cathAsyncError(async(req,res,next)=>{
    const jobs = await Job.find({expired:false});
    res.status(200).json({
        success:true,
        jobs,
    })
})

export const postJob = cathAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "job Seeker")
    {
        return next(new ErrorHandler("🙅🙅Job seeker is not allowed to create job",400))
    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;
    console.log(req.body);
    if(!title || !description || !category || !country || !city || !location)
    {
        return next(new ErrorHandler("🙏🙏please provide all job details",400));
    }

    if((!salaryFrom || !salaryTo)&&(!fixedSalary))
    {
        return next(new ErrorHandler("🙏🙏please provide fixed salary or ranged salary", 400));
    }

    if(salaryFrom && salaryTo && fixedSalary)
    {
       return next(new ErrorHandler("🙅🙅cannot enter both fixed salary and ranged salary", 400));
    }
    
    const postedBy = req.user._id;
    console.log(postedBy)
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });
    res.status(200).json({
        success:true,
        message:"job posted successfully",
        job
    })
});

export const getmyJobs = cathAsyncError(async(req,res,next)=>{
    const {role} = req.user; 
    if (role === "job Seeker") {
        return next( new ErrorHandler("🙅🙅Job seeker is not allowed to access this resources", 400));
      }
      const myjobs = await Job.find({postedBy:req.user._id});
      res.status(200).json({
        success:true,
        myjobs,
      })
})
export const  updatejob = cathAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === 'job Seeker')
    {
        return next(new ErrorHandler("🙅🙅Job seeker is not allowed to update job", 404));
    }

    const { id } = req.params;
     console.log(req.params);
    let job = await Job.findById(id);
    console.log(job);
      if (!job) {
        return next(new ErrorHandler("🙅🙅 You do not post any job", 404));
      }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
      success: true,
      message: "job updated successfully",
      job,
    });
})
export const deletejob = cathAsyncError(async(req,res,next)=>{
    const {role} = req.body;
    if(role === "job Seeker")
    {
        return next(new ErrorHandler("🙅🙅Job seeker is not allowed to update job", 404));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job)
    {
        return next(new ErrorHandler("🙅🙅 You do not post any job", 404));
    }
       await job.deleteOne();
       res.status(200).json({
        success:true,
        message:"Job deleted Successfully"
       })
})
export const getSingleJob = cathAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    try{
        const job = await Job.findById(id);
        if(!job)
        {
            return next(new ErrorHandler("🙅🙅 Job not found ", 404));
        }
        res.status(200).json({
            success:true,
            job
        })
    }catch (error){
        return next(new ErrorHandler("🙅🙅 Invalid id or cost error", 404));
    }
})