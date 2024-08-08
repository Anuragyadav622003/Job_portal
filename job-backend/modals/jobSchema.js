import mongoose from 'mongoose'

// Define the Job schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "🙏🙏Please Provide Job Title"],
    minLength: [3, "job title must contain at least 3 character!"],
    maxLength: [100, "job title excedded 50 character"],
  },
  description: {
    type: String,
    required: [true, "🙏🙏Please Provide Job Description"],
  },
  category: {
    type: String,
    required: [true, "job category required!"],
  },
  country: {
    type: String,
    required: [true, "job country is required!"],
  },
  city: {
    type: String,
    required: [true, "job city is required!"],
  },
  location: {
    type: String,
    required: [true, "🙏🙏please provide exact location!"],
  },
  fixedSalary: {
    type: Number,
    maxLength: [9, "fixed salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    maxLength: [9, "salaryFrom cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    maxLength: [9, "salaryTo cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  JobPosted: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

export default Job;
