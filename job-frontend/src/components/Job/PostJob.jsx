import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../index.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigate("/");
    }
  }, [isAuthorized, user, navigate]);

  const handleJobPost = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      country,
      category,
      city,
      location,
    };

    if (salaryType === "Fixed Salary") {
      jobData.fixedSalary = fixedSalary;
    } else if (salaryType === "Ranged Salary") {
      jobData.salaryFrom = salaryFrom;
      jobData.salaryTo = salaryTo;
    }

    try {
      const res = await axios.post(
        `https://job-backend-eta.vercel.app/job/post`,
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>Post New Job</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
            </div>
            <div className="input-group">
              <FaBriefcase className="icon" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN Stack Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN Stack Development
                </option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
          </div>
          <div className="wrapper">
            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
            </div>
            <div className="input-group">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
          </div>
          <div className="input-group">
            <FaMapMarkerAlt className="icon" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="salary_wrapper">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}>
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {salaryType === "default" ? (
                <p>Please Provide Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <div className="input-group">
                  <FaDollarSign className="icon" />
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                </div>
              ) : (
                <div className="ranged_salary">
                  <div className="input-group">
                    <FaRegMoneyBillAlt className="icon" />
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <FaRegMoneyBillAlt className="icon" />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="input-group">
            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description👉👉"
            />
          </div>
          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
