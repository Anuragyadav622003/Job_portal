import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverletter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null); // Change to null initially

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || user.role === "Employer") {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverletter", coverletter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `https://job-backend-eta.vercel.app/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setResume(null);
      setCoverLetter("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
          <form onSubmit={handleApplication}>
            <div className="form-group">
              <label>Name</label>
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="input-group">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <div className="input-group">
                <FaPhone className="icon" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <div className="input-group">
                <FaMapMarkerAlt className="icon" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Cover Letter</label>
              <div className="input-group">
                <FaFileAlt className="icon" />
                <textarea
                  value={coverletter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Cover letter"
                  required></textarea>
              </div>
            </div>
            <div className="form-group">
              <label>Resume</label>
              <input
                type="file"
                accept=".jpg, .png, .webp"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Application;
