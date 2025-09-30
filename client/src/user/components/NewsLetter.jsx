import { useState } from "react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const NewsLetterBg = require("../../assets/news-letter.png");

const NewsLetter = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="relative w-full">
      <img
        src={NewsLetterBg}
        alt="Newsletter Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-[130vh] text-white md:px-4 px-2">
        <div className="w-[90%] md:w-[50%] bg-black bg-opacity-80 py-12 md:px-10 sm:px-6 px-4  flex flex-col gap-6 items-center justify-center rounded-lg">
          <div className="text-center space-y-2">
            <h2 className="md:text-[26px] text-[16px] font-[600]">
              SUBSCRIBE TO OUR NEWSLETTER
            </h2>
            <p className="font-medium text-secondary">
              ENJOY PROMOTIONS AND DISCOUNTS
            </p>
          </div>
          <form className="w-full flex flex-col md:gap-3 sm:gap-1 gap-0 space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:px-4 px-3 py-4 rounded-full  bg-transparent border border-secondary text-secondary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-4 rounded-full bg-transparent border border-secondary text-secondary focus:outline-none"
            />
            <div className="flex items-center w-full px-2 py-4 rounded-full border border-secondary  bg-transparent text-secondary focus-within:ring-2 focus:outline-none">
              <PhoneInput
                placeholder="Enter phone number"
                international
                defaultCountry="US"
                value={phone}
                onChange={setPhone}
                className="flex-1 [&>input]:bg-transparent [&>input]:text-secondary [&>input]:placeholder:text-secondary [&>input]:outline-none [&>input]:ring-0 focus:[&>input]:outline-none focus:[&>input]:ring-0"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-transparent hover:text-secondary border border-secondary text-white py-4 rounded-full font-semibold transition-all duration-500 ease-in-out"
            >
              SUBSCRIBE
            </button>
            <label className="flex items-center font-[700] text-[16px] gap-2">
              <input type="checkbox" className="accent-blue-400" />
              Text me with offers and updates
            </label>
            <div className=" text-secondary flex items-center justify-between gap-2">
              <p className="text-xs">
                We promise not to spam you. Read our privacy policy for more
                information.
              </p>
              <a href="/privacy-policy">
                <HiArrowTopRightOnSquare size={25} />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
