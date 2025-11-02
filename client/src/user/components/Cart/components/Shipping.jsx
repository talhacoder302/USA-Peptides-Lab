import React, { useState } from "react";

const Shipping = ({ prevStep, formData, updateData, setStep }) => {
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [shippingForm, setShippingForm] = useState({
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
  });

  const [errors, setErrors] = useState({});

  // ✅ Handle checkbox toggle
  const handleCheckboxChange = (e) => {
    setShipToDifferent(e.target.checked);
    setErrors({}); // clear errors if unchecked
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Validate individual field
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
    for (const key of Object.keys(shippingForm)) {
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
        const msg = validateField(key, shippingForm[key]);
        if (msg) newErrors[key] = msg;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Continue button handler
  const handleContinue = () => {
    if (shipToDifferent) {
      const valid = validateForm();
      if (!valid) return; // Stop if invalid
    }

    // Save data
    updateData({
      shippingForm: shipToDifferent ? shippingForm : {},
    });
    updateData({ ...formData });
    setStep(3);

  };

  const getInputClass = (name) =>
    `input border-gray-300 rounded-xl w-full mt-1 ${
      errors[name] ? "border-red-500 focus:ring-red-500" : ""
    }`;

  return (
    <div className="w-full border-2 border-secondary rounded-3xl px-8 py-10 shadow-md">
      <h2 className="text-center font-semibold text-gray-700 mb-6">
        Shipping Details
      </h2>

      {/* Checkbox */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          className="accent-secondary w-5 h-5"
          checked={shipToDifferent}
          onChange={handleCheckboxChange}
        />
        <label className="font-semibold">Ship to a different address?</label>
      </div>

      {/* Conditional Form */}
      {shipToDifferent && (
        <div className="border border-gray-300 rounded-2xl p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Shipping Address
          </h3>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>First name *</label>
              <input
                name="firstName"
                value={shippingForm.firstName}
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
                value={shippingForm.lastName}
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
              value={shippingForm.company}
              onChange={handleChange}
              className="input border-gray-300 rounded-xl w-full mt-1"
              placeholder="Company name"
            />
          </div>

          {/* Address */}
          <div>
            <label>Street address *</label>
            <input
              name="address1"
              value={shippingForm.address1}
              onChange={handleChange}
              className={getInputClass("address1")}
              placeholder="House number and street name"
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
            )}
            <input
              name="address2"
              value={shippingForm.address2}
              onChange={handleChange}
              className="input border-gray-300 rounded-xl w-full mt-3"
              placeholder="Apartment, suite, unit (optional)"
            />
          </div>

          {/* City */}
          <div>
            <label>Town / City *</label>
            <input
              name="city"
              value={shippingForm.city}
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
              value={shippingForm.state}
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
              value={shippingForm.zip}
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
              value={shippingForm.phone}
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
              value={shippingForm.email}
              onChange={handleChange}
              className={getInputClass("email")}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      )}

      {/* Order Notes */}
      <div>
        <label>Order notes (optional)</label>
        <textarea
          name="orderNotes"
          
          className="w-full border border-gray-300 rounded-xl p-2 mt-1 h-36 resize-none"
          placeholder="Note about your order, e.g. special notes for delivery."
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10">
        <button
          className="bg-secondary text-white py-4 rounded-full font-semibold hover:bg-secondary/90 transition"
          onClick={handleContinue}
        >
          Continue to Payment
        </button>

        <button
          onClick={prevStep}
          className="bg-transparent text-secondary border-2 border-secondary py-3 rounded-full font-semibold transition"
        >
          Return to Billing Details
        </button>
      </div>
    </div>
  );
};

export default Shipping;
