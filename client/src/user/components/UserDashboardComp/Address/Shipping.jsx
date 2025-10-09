import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserAddress } from "../../../../service/service"; 
import { successToast, errorToast } from "../../../../utils/AlertsConfig";

const Billing = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const { type, address, user } = location.state || {};
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    zipCode: "",
    state: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
  });
        useEffect(() => {
    if (address || user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        companyName: address?.companyName || "",
        email: user?.email || "",
        phoneNumber: address?.phoneNumber || "",
        zipCode: address?.zipCode || "",
        state: address?.state || "",
        city: address?.city || "",
        addressLine1: address?.address1 || "",
        addressLine2: address?.address2 || "",
      });
    }
  }, [address, user]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

      const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        flag: type || "shipping", // shipping / billing flag from route
        companyName: formData.companyName,
        address1: formData.addressLine1,
        address2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      };

      const response = await updateUserAddress(payload);
navigate(-1); // Go back to the previous page
      successToast("Address updated successfully");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating address:", error);
      errorToast("Failed to update address");
    }
  };
  return (
    <div className="max-w-2xl">
      <h2 className="font-[700] text-[26px] text-[#333] leading-[26px] mb-8">
        Selling Addresses
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
          </div>
        </div>

        {/* Company name */}
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
            Company name( optional )
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
            Country / Region
          </label>
          <div className="text-[#666] text-[15px] font-[700]">
            United States (US)
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
            Street address
          </label>
          <input
            type="text"
            name="addressLine1"
            placeholder="House number and street name"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>

        <div>
          <input
            type="text"
            name="addressLine2"
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
            Town / City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
          >
            <option value="">Select an option</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-medium mb-1 text-[#231f20]">
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
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

export default Billing;
