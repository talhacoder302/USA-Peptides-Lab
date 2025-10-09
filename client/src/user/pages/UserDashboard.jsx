import React, {useState, useEffect} from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMe, logout } from "../../service/service";
import { successToast, errorToast } from "../../utils/AlertsConfig"; // adjust path if needed


const UserDashboard = () => {
  const location = useLocation();
    const navigate = useNavigate();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.data); // make sure your API response has { user: { username, email, ... } }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);
    const handleLogout = async () => {
    try {
      await logout();
      successToast("Logged out successfully ✅");
      navigate("/my-accounts"); // redirect after logout
    } catch (err) {
      errorToast("Logout failed ❌");
      console.error("Logout error:", err);
    }
  };
  const menuItems = [
    { name: "Dashboard", path: "/my-accounts/dashboard" },
    { name: "Orders", path: "/my-accounts/dashboard/orders" },
    { name: "Store Credits", path: "/my-accounts/dashboard/store-credits" },
    { name: "Downloads", path: "/my-accounts/dashboard/downloads" },
    { name: "Addresses", path: "/my-accounts/dashboard/addresses" },
    { name: "Account Details", path: "/my-accounts/dashboard/account-details" },
    { name: "Logout", path: "/my-accounts", action: handleLogout },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-[80%] gap-4 my-14">
        <h1 className="text-gradient text-3xl font-bold">My account</h1>

        <div className="flex md:flex-row flex-col gap-10 mt-10">
          {/* Sidebar */}
          <div className="w-full md:w-1/4  p-5">
            <ul className="flex md:flex-col flex-row  overflow-x-auto md:overflow-visible">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  {item.action ? (
                    // 🔹 Button for Logout
                    <button
                      onClick={item.action}
                      className="block w-full text-left cursor-pointer font-medium border-b border-gray-200 transition p-4 text-[#CC3882] hover:bg-[#CC3882] hover:text-white"
                    >
                      {item.name}
                    </button>
                  ) : (
                  <Link
                    to={item.path}
                    className={`block cursor-pointer font-medium border-b border-gray-200  transition p-4 ${
                      location.pathname === item.path
                        ? "text-white bg-[#CC3882] font-bold"
                        : "text-[#CC3882] "
                    }`}
                  >
                    {item.name}
                  </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Content area */}
          <div className="w-full md:w-3/4 bg-white p-5 ">
            <Outlet context={{ user }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
