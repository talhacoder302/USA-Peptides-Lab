import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { login, sendSignupLink } from "../../service/service";

const MyAccount = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  // Custom toast settings
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: "#fff",
      color: "#093161",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
      padding: "12px 16px",
    },
    progressStyle: {
      background: "#fff",
    },
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginEmail, loginPassword);

      toast.success(res.data?.message || "Login successful!", toastConfig);

      // Check the role and navigate
      if (res.data.data.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", toastConfig);
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await sendSignupLink(registerEmail);

      toast.success(res.data?.message || "Signup link sent!", toastConfig);
      setRegisterEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed",
        toastConfig
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Toastify container */}
      <ToastContainer />

      <div className="flex flex-col w-[80%] gap-4 my-14">
        <h1 className="text-gradient text-3xl font-bold">My account</h1>
        <div className="flex md:flex-row flex-col gap-10 mt-10">
          {/* LOGIN FORM */}
          <div className="md:w-1/2">
            <h1 className="text-[26px] font-[700]">Login</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-3 mt-4 p-5 border rounded-xl"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm">
                  Username or email address{" "}
                  <span className="text-[#CC3882]">*</span>
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email/Username"
                  required
                  className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm">
                  Password <span className="text-[#CC3882]">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-[45px] text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="flex sm:items-center items-start sm:flex-row flex-col lg:gap-10 gap-4">
                <button
                  type="submit"
                  className="hover:bg-[#CC3882] transition-all duration-500 ease-in-out hover:text-white text-[#CC3882] border-2 border-[#CC3882] font-semibold text-sm md:text-lg rounded-full md:px-4 px-3 md:py-2 py-1"
                >
                  LOG IN
                </button>
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <label className="text-xs">Remember me</label>
                </div>
              </div>
              <div>
                <a
                  href="/my-accounts/forget-password"
                  className="text-xs text-[#CC3882] font-medium"
                >
                  Lost your password?
                </a>
              </div>
            </form>
          </div>

          {/* REGISTER FORM */}
          <div className="md:w-1/2">
            <h1 className="text-[26px] font-[700]">Register</h1>
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-4 mt-4 p-6 border rounded-xl"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm">
                  Email address <span className="text-[#CC3882]">*</span>
                </label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
                />
              </div>
              <div className="text-[#666]">
                A link to set a new password will be sent to your email address.
              </div>
              <p className="text-[#666] text-sm">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a
                  href="/user/privacy-policy"
                  className="text-[#CC3882] font-medium"
                >
                  privacy policy
                </a>
                .
              </p>
              <div className="flex items-center gap-10">
                <button
                  type="submit"
                  className="hover:bg-[#CC3882] transition-all duration-500 ease-in-out hover:text-white text-[#CC3882] border-2 border-[#CC3882] font-semibold text-sm md:text-lg rounded-full md:px-4 px-3 md:py-2 py-1"
                >
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
