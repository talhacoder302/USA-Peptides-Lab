import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { updateUserProfile } from "../../../service/service";
import { successToast, errorToast, loadingToast, updateToast } from "../../../utils/AlertsConfig"; // adjust path if needed

const AccountDetails = () => {
  const { user } = useOutletContext(); // get user from parent
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        displayName: user.displayName || user.username || "",
        email: user.email || "",
        password: user.password || "",
      }));
    }
  }, [user]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        const toastId = loadingToast("Updating profile...");
try {
      const { currentPassword, newPassword, confirmPassword, ...updateData } = formData;

      // Only send password fields if provided
      if (newPassword && confirmPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
        updateData.confirmPassword = confirmPassword;
      }

      const response = await updateUserProfile(updateData);

      updateToast(toastId, "success", response.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      updateToast(
        toastId,
        "error",
        err.response?.data?.message || "Failed to update profile"
      );
    }
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-1 text-[#231f20]">First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1 text-[#231f20]">Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
          </div>
        </div>

        {/* Display name */}
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">Display name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
          <p className="text-xs text-gray-500 mt-1 italic">
            This will be how your name will be displayed in the account section and in reviews.
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>

        <hr className="my-6" />

        <h3 className="text-lg font-semibold">Password Change</h3>

        {/* Current Password */}
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">Current password (leave blank to leave unchanged)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">New password (leave blank to leave unchanged)
</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">Confirm new password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="bg-transparent hover:bg-[#CC3882] text-[#CC3882] hover:text-white px-6 py-2 rounded-full  font-medium border-2 border-[#CC3882] transition"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
