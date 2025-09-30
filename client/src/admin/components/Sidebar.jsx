import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaBoxOpen,
  FaUsers,
  FaTags,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Sidebar = ({ collapsed }) => {
  const [openMenus, setOpenMenus] = useState({
    product: false,
    order: false,
    user: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const linkClasses =
    "block px-4 py-2 rounded transition-colors duration-200 hover:bg-secondary hover:text-white";

  const menuItem = (icon, label) => (
    <div
      className={`flex items-center ${collapsed ? "justify-center" : "gap-2"}`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </div>
  );

  return (
    <div className="flex flex-col gap-3 min-h-screen pb-4 text-[15px] text-gray-700">
      <div className="border-b flex justify-center py-1">
        <NavLink to="/admin/dashboard">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              collapsed ? "w-14" : "w-24"
            }`}
          />
        </NavLink>
      </div>

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
        }
      >
        {menuItem(<FaTachometerAlt />, "Dashboard")}
      </NavLink>

      <div>
        <button
          onClick={() => toggleMenu("product")}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } px-4 py-2 hover:bg-secondary hover:text-white rounded transition-colors`}
        >
          {menuItem(<FaBoxOpen />, "Product Management")}
          {!collapsed &&
            (openMenus.product ? <FaChevronUp /> : <FaChevronDown />)}
        </button>
        <div
          className={`ml-6  overflow-hidden transition-all duration-300 ease-in-out ${
            openMenus.product && !collapsed
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <NavLink
            to="/admin/products/add"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            Add Product
          </NavLink>
          <NavLink
            to="/admin/products-list"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            Product List
          </NavLink>
          <NavLink
            to="/admin/products/pricing"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            Pricing & Stock
          </NavLink>
        </div>
      </div>

      {/* Order Management */}
      <div>
        <button
          onClick={() => toggleMenu("order")}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } px-4 py-2 hover:bg-secondary hover:text-white rounded transition-colors`}
        >
          {menuItem(<FaTags />, "Order Management")}
          {!collapsed &&
            (openMenus.order ? <FaChevronUp /> : <FaChevronDown />)}
        </button>
        <div
          className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out ${
            openMenus.order && !collapsed
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            View Orders
          </NavLink>
          {/* <NavLink
            to="/admin/users/orders"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            Order History
          </NavLink> */}
          {/* <NavLink
            to="/admin/orders/reports"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            Reports
          </NavLink> */}
        </div>
      </div>

      {/* User Management */}
      <div>
        <button
          onClick={() => toggleMenu("user")}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } px-4 py-2 hover:bg-secondary hover:text-white rounded transition-colors`}
        >
          {menuItem(<FaUsers />, "User Management")}
          {!collapsed && (openMenus.user ? <FaChevronUp /> : <FaChevronDown />)}
        </button>
        <div
          className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out ${
            openMenus.user && !collapsed
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <NavLink
            to="/admin/userslist"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
            }
          >
            View Users
          </NavLink>
        </div>
      </div>

      {/* Category & Tag Management */}
      {/* <NavLink
        to="/admin/categories"
        className={({ isActive }) =>
          `${linkClasses} ${isActive ? "bg-secondary text-white" : ""}`
        }
      >
        {menuItem(<FaTags />, "Category & Tag Management")}
      </NavLink> */}
    </div>
  );
};

export default Sidebar;
