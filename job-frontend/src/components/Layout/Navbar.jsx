import React, { useState, useContext } from "react";
import { Context } from "../../index.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { FaPersonRays } from "react-icons/fa6";
import { MdOutlineCompost } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { BsFillPostcardHeartFill } from "react-icons/bs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthorized, setAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `https://job-backend-eta.vercel.app/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setAuthorized(true);
    }
  };

  return (
    <>
      <header className="flex items-center shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <a className="w-16 h-full" href="/">
            <img
              src="https://freepngimg.com/thumb/jobs/8-2-jobs-png-picture-thumb.png"
              alt="logo"
              className="h-full w-full"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex  space-x-5">
            <Link
              to="/"
              class="text-gray-500 font-bold hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
              <IoHome className="text-gray-500 mr-1" />
              <span className="text-gray-500 font-bold">Home</span>
            </Link>

            <Link
              to="/job/getall"
              class="text-gray-500 font-bold hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
              <FaUserGraduate className="text-gray-500 mr-1" />
              <span className="text-gray-500 font-bold">All jobs</span>
            </Link>

            <Link
              to="/application/my"
              className="hover:text-[#007bff] text-gray-500 font-semibold text-[15px]">
              {user && user.role === "Employer" ? (
                <>
                  <Link
                    to="/application/my"
                    onClick={() => setIsMenuOpen(false)}
                    class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                    <FaPersonRays className="text-gray-500 mr-1" />
                    <span className="text-gray-500 font-bold">
                      Applicant's Applications
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/application/my"
                    onClick={() => setIsMenuOpen(false)}
                    class="text-gray-500 hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                    <FaUserCheck className="text-gray-500 mr-1" />
                    <span className="text-gray-500 font-bold">
                      My Applications
                    </span>
                  </Link>
                </>
              )}
            </Link>
            {user && user.role === "Employer" ? (
              <>
                <Link
                  to="/job/post"
                  onClick={() => setIsMenuOpen(false)}
                  class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  <MdOutlineCompost className="text-gray-500 mr-1" />
                  <span className="text-gray-500 font-bold">Post New Job</span>
                </Link>
                <Link
                  to="/job/my"
                  onClick={() => setIsMenuOpen(false)}
                  class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  <BsFillPostcardHeartFill className="text-gray-500 mr-1" />
                  <span>My Posted Jobs</span>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <div class="flex max-lg:ml-auto space-x-3">
            <button
              id="toggleOpen"
              className="lg:hidden ml-4"
              onClick={handleToggleMenu}>
              <GiHamburgerMenu className="w-7 h-7" />
            </button>
            {!isAuthorized ? (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  class="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sidebar menu */}
        <div
          id="collapseMenu"
          className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-md transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}>
          {/* Close button for the sidebar */}
          <button
            id="toggleClose"
            className="absolute top-2 right-2 p-2"
            onClick={handleToggleMenu}>
            <IoClose className="text-gray-500 mr-2" fontSize={25} />
          </button>
          <ul className="space-y-3 p-3 mt-1">
            <a href="/">
              <img
                src="https://freepngimg.com/thumb/jobs/8-2-jobs-png-picture-thumb.png"
                alt="logo"
                className="h-24"
              />
            </a>
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                <IoHome className="text-gray-500 mr-2" fontSize={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/job/getall"
                onClick={() => setIsMenuOpen(false)}
                class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                <CgProfile className="text-gray-500 mr-2" fontSize={20} />
                <span>All jobs</span>
              </Link>
            </li>
            <div class="mt-6">
              <h6 class="text-blue-600 text-sm font-bold px-4">
                {user && user.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}{" "}
                ({user.role})
              </h6>
              {user && user.role === "Employer" ? (
                <>
                  <ul class="mt-3">
                    <li>
                      <Link
                        to="/job/post"
                        onClick={() => setIsMenuOpen(false)}
                        class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                        <MdOutlineCompost
                          className="text-gray-500 mr-2"
                          fontSize={20}
                        />
                        <span>Post New Job</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/job/my"
                        onClick={() => setIsMenuOpen(false)}
                        class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                        <BsFillPostcardHeartFill
                          className="text-gray-500 mr-2"
                          fontSize={20}
                        />
                        <span>My Posted Jobs</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/application/udate"
                        onClick={() => setIsMenuOpen(false)}
                        class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                        <MdBrowserUpdated
                          className="text-gray-500 mr-2"
                          fontSize={20}
                        />
                        <span>Update Posted Job</span>
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <ul class="mt-3">
                    <li>
                      <Link
                        to="/user/my"
                        onClick={() => setIsMenuOpen(false)}
                        class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                        <FaUserCheck
                          className="text-gray-500 mr-2"
                          fontSize={20}
                        />
                        <span>My Application Jobs</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/job/my"
                        onClick={() => setIsMenuOpen(false)}
                        class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                        <MdBrowserUpdated
                          className="text-gray-500 mr-2"
                          fontSize={20}
                        />
                        <span>Update My Application</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/application/udate"
                        onClick={() => setIsMenuOpen(false)}
                        class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                        <MdDelete
                          className="text-gray-500 mr-2"
                          fontSize={20}
                        />
                        <span>Delete My Application</span>
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div class="mt-6">
              <h6 class="text-blue-600 text-sm font-bold px-4">Actions</h6>
              <ul class="mt-3">
                <li>
                  <a
                    href="/"
                    class="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                    <ImProfile className="text-gray-500 mr-2" fontSize={20} />
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    class="text-red-900 hover:text-blue-600 text-md flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                    <IoMdLogOut className="text-red-900 mr-2 " fontSize={25} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
