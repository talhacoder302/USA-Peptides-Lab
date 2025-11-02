import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Information from "./components/Information";
import Shipping from "./components/Shipping";
import Billing from "./components/Billing";
import OrderSummary from "./components/OrderSummary";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [direction, setDirection] = useState(0);
  const location = useLocation();
  const checkoutData = location.state || {};
  const { cartItems, subtotal, total } = checkoutData;

  const handleDataUpdate = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const variants = {
    initial: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    }),
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <Information
            setStep={nextStep}
            cartItems={cartItems}
            subtotal={subtotal}
            total={total}
            updateData={handleDataUpdate}
            formData={formData}
          />
        );
      case 2:
        return (
          <Shipping
            setStep={setStep}
            prevStep={prevStep}
            cartItems={cartItems}
            subtotal={subtotal}
            total={total}
            updateData={handleDataUpdate}
            formData={formData}
          />
        );
      case 3:
        return (
          <Billing
            setStep={setStep}
            prevStep={prevStep}
            cartItems={cartItems}
            subtotal={subtotal}
            total={total}
            updateData={handleDataUpdate}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-10 px-6 overflow-hidden">
      <div className="flex  w-[40%] justify-between">
        <div className="text-3xl font-bold mb-6">Checkout</div>
        <div className="flex items-center mb-10">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-start">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    step === num
                      ? "bg-secondary border-secondary text-white"
                      : "border-secondary text-secondary"
                  }`}
                >
                  {num}
                </div>
                {(num === 1 || num === 2) && (
                  <div className="bg-secondary w-44 h-1"></div>
                )}
              </div>
              <p className="text-sm text-gray-700 mt-2">
                {num === 1 && "Information"}
                {num === 2 && "Shipping"}
                {num === 3 && "Payment"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Section */}
      <div className="relative w-full flex justify-center gap-10 max-w-6xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full lg:w-2/3"
          >
            {renderComponent()}
          </motion.div>
        </AnimatePresence>

        {/* ✅ Common Right Section */}
        <div className="hidden lg:block w-1/2">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            formData={formData}
            updateData={handleDataUpdate}
            step={step}
            setStep={setStep}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
