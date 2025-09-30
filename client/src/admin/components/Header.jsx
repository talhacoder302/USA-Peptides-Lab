import React, { useState, useRef, useEffect } from "react";
import { FiSidebar } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoVerified } from "react-icons/go";
import Profile from "../../assets/profile.png";
import { LiaCreditCardSolid } from "react-icons/lia";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logout } from "../../service/service";
const Header = ({ collapsed, setCollapsed }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
      navigate("/user/accountinfo");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex border-b p-2 justify-between items-center text-gray-700">
      <div
        className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FiSidebar size={20} />
      </div>
      <div className="flex items-center gap-3 ml-auto relative">
        <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
          <IoMdNotificationsOutline size={24} />
        </div>
        <div className="border-l-2 border-gray-200 h-8"></div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="cursor-pointer  p-2"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img className="w-10" src={Profile} alt="profile" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 text-sm w-56 bg-white shadow-lg rounded-lg z-10">
              <ul className="text-gray-700">
                <li className="flex gap-2 px-4 py-2 border-b hover:bg-gray-100 cursor-pointer">
                  <img src={Profile} alt="profile" className="w-10" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold">
                      Toby Belhome
                    </span>
                    <span className="text-[10px] font-medium">
                      hello@tobybelhome.com
                    </span>
                  </div>
                </li>
                <li className="px-4 py-2 flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
                  <GoVerified />
                  Account
                </li>
                <li className="px-4 py-2 flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
                  <LiaCreditCardSolid />
                  Billing
                </li>
                <li
                  className="px-4 py-2 flex gap-2 items-center hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  <MdLogout />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
