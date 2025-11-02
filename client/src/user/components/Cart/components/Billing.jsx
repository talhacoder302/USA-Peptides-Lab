import React, { useState } from "react";

const Billing = ({ prevStep, formData, updateData }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleContinue = () => {
    if (!paymentMethod) {
      return;
    }

    // Save selected payment method
    updateData({ paymentMethod });
    alert("Proceeding to final confirmation or order placement...");
  };

  return (
    <div className="space-y-8">
        <div className="w-full border-2 border-secondary rounded-3xl px-8 py-10 shadow-md">
      <h2 className="text-center font-semibold text-gray-700 mb-6">
        Billing & Payment
      </h2>

      <div>Use your online banking to complete your transaction.</div>

      {/* Payment Method */}
      <div className="flex flex-col gap-4 mt-10">
        <button
          className="bg-secondary text-white py-3 rounded-full font-semibold hover:bg-secondary/90 transition"
          onClick={handleContinue}
        >
          Pay Now
        </button>
        <p className="text-red-500 text-sm text-center font-semibold">How it Works?</p>
      </div>


      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-10">
        
      </div>
    </div>
    <div className="space-y-3 font-semibold">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              className="accent-secondary"
            />
            <span>CREDIT Card</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "zelle"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              className="accent-secondary"
            />
            <span>Zelle - 5% OFF</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cashApp"
              checked={paymentMethod === "cashApp"}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
              className="accent-secondary"
            />
            <span>CashApp</span>
          </label>
        </div>
    </div>
  );
};

export default Billing;
