import React, { useState, useEffect } from "react";

const Information = ({
  setStep,
  updateData,
  formData: parentFormData = {},
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    ...parentFormData, // Prefill if data already exists
  });

  const [errors, setErrors] = useState({});

  // ✅ Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Validate single field
  const validateField = (name, value) => {
    let message = "";

    if (
      [
        "firstName",
        "lastName",
        "address1",
        "city",
        "state",
        "zip",
        "phone",
        "email",
      ].includes(name) &&
      !value.trim()
    ) {
      message = "This field is required";
    } else if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      message = "Invalid email format";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return message;
  };

  // ✅ Validate entire form
  const validateForm = () => {
    const newErrors = {};
    for (const key of Object.keys(formData)) {
      if (
        [
          "firstName",
          "lastName",
          "address1",
          "city",
          "state",
          "zip",
          "phone",
          "email",
        ].includes(key)
      ) {
        const message = validateField(key, formData[key]);
        if (message) newErrors[key] = message;
      }
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Handler
  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) return; // stop if validation fails

    // Save data to parent
    updateData({ ...formData });
    setStep(2); // Move to next step
  };

  // Helper class for inputs
  const getInputClass = (name) =>
    `input ${errors[name] ? "border-red-500 focus:ring-red-500" : ""}`;



  return (
    <div className="">
      {/* Billing Form */}
      <div className="col-span-2 border-2 border-secondary rounded-3xl shadow-md px-8 py-10 space-y-5">
        <h2 className="text-center font-semibold text-gray-700 mb-4">
          Billing details
        </h2>

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={getInputClass("firstName")}
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label>Last name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={getInputClass("lastName")}
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Company */}
        <div>
          <label>Company name (optional)</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input"
            placeholder="Company name"
          />
        </div>

        {/* Address */}
        <div>
          <label>Street address *</label>
          <input
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className={getInputClass("address1")}
            placeholder="House number and street name"
          />
          {errors.address1 && (
            <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
          )}
          <input
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="input mt-3"
            placeholder="Apartment, suite, unit (optional)"
          />
        </div>

        {/* City */}
        <div>
          <label>Town / City *</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={getInputClass("city")}
            placeholder="City"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label>State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={getInputClass("state")}
          >
            <option value="">Select an option...</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        {/* ZIP */}
        <div>
          <label>ZIP Code *</label>
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className={getInputClass("zip")}
            placeholder="ZIP Code"
          />
          {errors.zip && (
            <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label>Phone *</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={getInputClass("phone")}
            placeholder="Phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>Email address *</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClass("email")}
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          className="w-full bg-secondary text-white py-3 rounded-full font-semibold hover:bg-secondary/90 transition"
          onClick={handleSubmit}
        >
          Continue to Shipping
        </button>
      </div>


    </div>
  );
};

export default Information;
