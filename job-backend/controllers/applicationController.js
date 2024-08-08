import { cathAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/error.js';
import { Application } from '../modals/applicationSchema.js';
import cloudinary from 'cloudinary';
import Job from '../modals/jobSchema.js'

export const employerGetAllapplications = cathAsyncError(async(req,res,next)=>{
     const { role } = req.user;
     if (role === "job Seeker") {
       return next(
         new ErrorHandler("🙅🙅Job seeker is not allowed to acess this resources", 400)
       );
     }
     const {_id} = req.user;
     console.log(_id.toString())
     const applications = await Application.find({"employerID.user":_id});
     console.log(applications)
     res.status(200).json({
        success:true,
        applications
     })
});

export const jobseekerGetAllapplications = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("🙅🙅Employer is not allowed to acces this resources!", 400) );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteapplications = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next( new ErrorHandler( "🙅🙅Employer is not allowed to acces this resources!",   400  )
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next( new ErrorHandler( "🙅🙅 Application Not found!",404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message:"Application Deleted Successfully!",
    });
  }
);

export const postapplication = cathAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next( new ErrorHandler("🙅🙅Employer is not allowed to acces this resources!", 400));
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("🙄🙄 Resume file Required!", 400));
    }
    const {resume} = req.files;
    console.log(resume);

    const allowedFormats = ["image/png","image/jpeg","image/webp"];
    
    if(!allowedFormats.includes(resume.mimetype))
    {
      return next(new ErrorHandler("🙄🙄 Invaid type of resume ,please upload your resume in png,jpg,webp format!.", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
     console.log(cloudinaryResponse);
    if(!cloudinaryResponse || cloudinaryResponse.error)
    {
      console.error("Cloudinary Error :" ,cloudinaryResponse.error || "Unknown cloudinary Error");
      return next(new ErrorHandler("Failed to upload resume", 500));
    }
    const {name, email,coverletter,phone,address,jobId} = req.body;
    // console.log(req.body)
    const applicantID = {
      user:req.user._id,
      role:"job Seeker",
    };
     if(!jobId)
    {
      return next(new ErrorHandler("🙄🙄 Job not found !.", 404));
    }
    const jobDetails = await Job.findById(jobId);
     if (!jobDetails) {
       return next(new ErrorHandler("🙄🙄 Job not found !.", 404));
     }
     const employerID = {
      user:jobDetails.postedBy,
      role:"Employer",
     }
     console.log(employerID);
     if (
       !name ||
       !email ||
       !coverletter ||
       !phone ||
       !address ||
       !applicantID ||
       !employerID ||
       !resume
     ) {
       return next(new ErrorHandler("🙏🙏 fill all field here!.", 400));
     }
     const application = await Application.create({
       name ,
       email ,
       coverletter ,
       phone ,
       address ,
       resume:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
      },
       applicantID ,
       employerID,
     })
     console.log(application);
       res.status(200).json({
         success: true,
         message: "Application Submited Successfully!",
         application, 
       });
  }
);
