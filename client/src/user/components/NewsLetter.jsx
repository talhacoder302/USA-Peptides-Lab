import { useState } from "react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const catbg = require("../../assets/blend&peptidebg.png");

const NewsLetter = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="relative w-full">
      <img
        src={catbg}
        alt="Newsletter Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-[130vh] text-white md:px-4 px-2">
        <div className="w-[90%] md:w-[50%] bg-black bg-opacity-80 py-12 md:px-10 sm:px-6 px-4 flex flex-col gap-6 items-center justify-center rounded-lg">
          <div className="text-center space-y-2">
            <h2 className="xl:text-[26px] lg:text-[26px] md:text-[26px] text-[22px] font-[600]">
              SUBSCRIBE TO OUR NEWSLETTER
            </h2>
            <p className="font-medium text-primary">
              ENJOY PROMOTIONS AND DISCOUNTS
            </p>
          </div>
          <form className="w-full flex flex-col md:gap-3 sm:gap-1 gap-0 space-y-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:px-4 px-3 py-4 rounded-full font-semibold bg-transparent border-2 border-primary text-primary placeholder-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-4 rounded-full bg-transparent font-semibold border-2 border-primary placeholder-primary text-primary focus:outline-none"
            />
            <div className="flex items-center w-full px-2 py-4 rounded-full font-semibold border-2 border-primary bg-transparent text-primary focus-within:ring-2 focus:outline-none">
              <PhoneInput
                placeholder="Enter phone number"
                international
                defaultCountry="US"
                countryCallingCodeEditable={false}
                value={phone}
                onChange={setPhone}
                className="ml-3 flex-1 [&>input]:bg-transparent [&>input]:text-primary [&>input]:placeholder:text-primary [&>input]:outline-none [&>input]:ring-0 focus:[&>input]:outline-none focus:[&>input]:ring-0"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-transparent hover:text-primary border border-primary text-white py-4 rounded-full font-semibold transition-all duration-500 ease-in-out"
            >
              SUBSCRIBE
            </button>
            <label className="flex items-center font-semibold text-[16px] gap-2 text-primary">
              <input type="checkbox" className="w-3 h-3 accent-blue-400" />
                Text me with offers and updates
            </label>
            <div className="text-primary font-semibold flex items-center justify-between gap-2">
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
