import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import { submitContactForm } from "../../service/service";
import {
  errorToast,
  loadingToast,
  updateToast,
} from "../../utils/AlertsConfig";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [captcha, setCaptcha] = useState({
    targetIcon: "",
    selectedIcon: "",
    icons: ["house", "love", "key"],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate random captcha on component mount and form reset
  const generateCaptcha = () => {
    const icons = ["house", "love", "key"];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    setCaptcha({
      targetIcon: randomIcon,
      selectedIcon: "",
      icons: icons,
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle icon selection
  const handleIconSelect = (iconName) => {
    setCaptcha((prev) => ({
      ...prev,
      selectedIcon: iconName,
    }));
  };

  // Get icon component based on name
  const getIconComponent = (iconName, isSelected = false) => {
    const baseClass = `cursor-pointer text-2xl transition-colors ${
      isSelected ? "text-[#CC3882]" : "hover:text-[#CC3882]"
    }`;

    switch (iconName) {
      case "love":
        return (
          <FaHeart
            className={baseClass}
            onClick={() => handleIconSelect("love")}
          />
        );
      case "house":
        return (
          <FaHouseChimney
            className={baseClass}
            onClick={() => handleIconSelect("house")}
          />
        );
      case "key":
        return (
          <FaKey
            className={baseClass}
            onClick={() => handleIconSelect("key")}
          />
        );
      default:
        return null;
    }
  };

  // Get display name for icon
  const getIconDisplayName = (iconName) => {
    switch (iconName) {
      case "love":
        return "heart";
      case "house":
        return "house";
      case "key":
        return "key";
      default:
        return iconName;
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      errorToast("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      errorToast("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errorToast("Please enter a valid email address");
      return false;
    }
    if (!formData.subject.trim()) {
      errorToast("Please enter a subject");
      return false;
    }
    if (!formData.message.trim()) {
      errorToast("Please enter a message");
      return false;
    }
    if (captcha.selectedIcon !== captcha.targetIcon) {
      errorToast(
        `Please select the correct icon: ${getIconDisplayName(
          captcha.targetIcon
        )}`
      );
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const toastId = loadingToast("Sending message...");

    try {
      await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      updateToast(toastId, "success", "Message sent successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Generate new captcha
      generateCaptcha();
    } catch (error) {
      console.error("Contact form error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send message. Please try again.";
      updateToast(toastId, "error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col">
      <div className="lg:w-1/2 flex flex-col items-center justify-center bg-[#1E1E1E]">
        <div className="w-[80%] flex flex-col gap-4 my-14">
          <h1 className="text-gradient sm:text-[32px] text-[24px] font-semibold">
            Get in touch with us.
          </h1>
          <p className="text-white text-[15px]">
            You can email us directly at{" "}
            <span className="text-[#dd78ab]">support@usapeptideslab.com</span>{" "}
            or fill out the form below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 text-white">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="p-2 rounded-md border border-white bg-transparent focus:outline-none"
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="p-2 rounded-md border border-white bg-transparent focus:outline-none"
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="p-2 rounded-md border border-white bg-transparent focus:outline-none"
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message..."
                className="p-2 rounded-md border border-white bg-transparent h-32 focus:outline-none"
                disabled={isSubmitting}
              ></textarea>

              {/* Captcha Section */}
              <div className="border border-white flex flex-col items-center justify-center gap-4 p-4 rounded-md">
                <div className="text-[13px]">
                  Please prove you are human by selecting the{" "}
                  <span className="text-[#CC3882]">
                    {getIconDisplayName(captcha.targetIcon)}
                  </span>
                  .
                </div>
                <div className="flex gap-4">
                  {captcha.icons.map((iconName) => (
                    <div key={iconName}>
                      {getIconComponent(
                        iconName,
                        captcha.selectedIcon === iconName
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-transparent hover:bg-secondary text-white border border-secondary p-2 rounded-3xl text-[20px] transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "SENDING..." : "SUBMIT MESSAGE"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="lg:w-1/2 flex flex-col items-center justify-center bg-secondary text-white">
        <div className="w-[80%] flex flex-col gap-4 my-14">
          <h1 className="sm:text-[30px] text-[20px] font-semibold">
            Customer service is our priority!
          </h1>
          <div className="h-0.5 w-[30%] bg-white"></div>
          <p className="text-[15px]">
            At USA Peptides Lab, customer satisfaction is not taken lightly. We
            will do everything in our power to ensure that our customers are
            satisfied, even after products are delivered.
          </p>
          <div className="ml-8 mt-4 flex flex-col gap-2 text-[15px]">
            <div className="font-[600]">info@usapeptidelab.com</div>
            <div className="font-[600]">805-429-8132</div>
            <div className="font-[500]">
              5401 S Kirkman Rd suite 310, Orlando FL 32819
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
