// src/pages/SetUpPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { completeSignup } from "../../service/service";

const SetUpPassword = () => {
  const { token, email } = useParams(); // Get token & email from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    style: {
      backgroundColor: "#fff",
      color: "#093161",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
      padding: "12px 16px",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastConfig);
      return;
    }

    try {
      const res = completeSignup(email, token, password);

      toast.success(
        res.data?.message || "Password set successfully!",
        toastConfig
      );
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/user/my-accounts"); // Redirect to login page
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong",
        toastConfig
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Set Up Your Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium">Password</label>
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
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
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
            className="mt-4 hover:bg-[#CC3882] transition-all duration-500 ease-in-out hover:text-white text-[#CC3882] border-2 border-[#CC3882] font-semibold text-lg rounded-full px-6 py-2"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUpPassword;
