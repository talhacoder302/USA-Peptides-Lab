import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { login, sendSignupLink } from "../../service/service";
import { successToast, errorToast } from "../../utils/AlertsConfig";

const MyAccount = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");

    if (savedEmail && savedPassword) {
      setLoginEmail(savedEmail);
      setLoginPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginEmail, loginPassword);

      successToast(res.data?.message || "Login successful!");

      if (rememberMe) {
        localStorage.setItem("rememberEmail", loginEmail);
        localStorage.setItem("rememberPassword", loginPassword);
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberPassword");
      }
      if (res.data.data.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      errorToast(err.response?.data?.message || "Login failed");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await sendSignupLink(registerEmail);

      successToast(res.data?.message || "Signup link sent!");
      setRegisterEmail("");
    } catch (err) {
            errorToast(err.response?.data?.message || "Registration failed");

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
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
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
                  href="/privacy-policy"
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
