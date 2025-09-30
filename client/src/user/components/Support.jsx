import React from "react";
const plane = require("../../assets/plane.png");
const support = require("../../assets/support.png");
const badge = require("../../assets/badge.png");

const Support = () => {
  return (
    <div className="bg-[#1E1E1E] py-24 flex items-center justify-center">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 md:w-[80%] w-[90%] text-white">
        <div className="flex gap-4 items-start">
          <img src={plane} alt="plane" />
          <div className="flex flex-col gap-3">
            <h1 className="text-[23px] font-[700] leading-[23px] text-gradient">
              FREE DELIVERY
            </h1>
            <p className="text-[15px] font-[500] leading-[26px]">
              Any purchase of $200 or more qualifies for free delivery within
              the USA.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <img src={badge} alt="badge" />
          <div className="flex flex-col gap-3">
            <h1 className="text-[23px] font-[700] leading-[23px] text-gradient">
              HIGHEST QUALITY PEPTIDES
            </h1>
            <p className="text-[15px] font-[500] leading-[26px]">
              Our products are scientifically-formulated and produced in cGMP
              facilities.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <img src={support} alt="support" />
          <div className="flex flex-col gap-3">
            <h1 className="text-[23px] font-[700] leading-[23px] text-gradient">
              ONLINE SUPPORT
            </h1>
            <p className="text-[15px] font-[500] leading-[26px]">
              Have questions? We can help. Email us or connect with us via our{" "}
              <a
                href="/contact"
                className="font-[600] leading-[26px] hover:text-[#cc3882] text-[#DD78AB]"
              >
                Contact
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
