// src/pages/SetUpPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { completeSignup } from "../../service/service";
import { successToast, errorToast } from "../../utils/AlertsConfig";

const SetUpPassword = () => {
  const { token, email } = useParams(); // Get token & email from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      errorToast("Passwords do not match!");
      return;
    }
    try {
      const res = completeSignup(email, token, password);
      successToast("Password set successfully!");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/my-accounts"); // Redirect to login page
      }, 1500);
    } catch (err) {
      errorToast("Failed to set password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className=" w-[80%] ">
        <h1 className="text-[30px] font-[700] leading-[36px] text-gradient  mb-6">
          My accounts
        </h1>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2  gap-4">
          <div className="relative">
            <label className="text-sm font-medium">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[38px] text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium">Re Enter New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full  p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
            <div
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-[38px] text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-fit hover:bg-[#CC3882] transition-all duration-500 ease-in-out hover:text-white text-[#CC3882] border-2 border-[#CC3882] font-semibold text-lg rounded-full px-6 py-2"
          >
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SetUpPassword;
