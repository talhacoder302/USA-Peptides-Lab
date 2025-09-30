import React from "react";

const PeptidesHome = () => {
  return (
    <div className="flex items-center justify-center  sm:h-[100vh]  my-10 lg-peptides-bg">
      <div className="w-[90%] flex items-center lg:flex-row flex-col lg:gap-0 gap-10">
        <div className="lg:w-2/3 md:w-[90%] w-[100%]  flex flex-col lg:justify-center justify-start lg:gap-72 md:gap-8 gap-4 lg:h-[90vh] ">
          {/* <div className="relative bg-white py-6">
            <div className="h-10 w-[480px] bg-red-200 absolute  left-14 md:bottom-3 z-0"></div>
            <div className="lg:text-[50px] text-[35px] font-bold text-center text-[#333333] leading-tight xl:w-[80%] w-[100%] relative z-10">
              Highest Quality Peptides For Sale
            </div>
          </div> */}
          <div className="relative bg-white py-6 flex justify-center ">
            <div className="relative xl:w-[80%] w-[100%]  ">
              <div className="absolute bottom-0 md:left-14 md:!flex hidden  lg:w-[80%] md:w-[85%] w-full md:h-9 h-7 bg-red-200 z-0"></div>
              <div className="lg:text-[50px] sm:text-[35px] text-[32px] lg:mb-2 mb-4 md:font-bold font-semibold text-center text-[#333333] leading-tight relative z-10">
                Highest Quality Peptides For Sale
              </div>
            </div>
          </div>

          <p className="text-lg leading-7 mt-10 text-[#666]  bg-white">
            Welcome to USA Peptides Lab. We are proud to carry the highest
            quality peptides and peptide blends in the research industry. All of
            our peptides have gone through rigorous quality control procedures
            to ensure our clients are receiving the best quality peptides
            available. We offer custom peptides for sale online.
          </p>
        </div>
        <div className="md:w-1/2   p-4 flex flex-col justify-end items-center">
          <a
            href="/user/peptides"
            className="lg:text-2xl sm:text-[25px] text-[20px] font-medium bg-gradient lg:py-5 py-3 lg:px-10 sm:px-8 px-6  lg:mt-60 rounded-full btn-gradient "
          >
            SHOP NOW
          </a>
        </div>
      </div>
    </div>
  );
};

export default PeptidesHome;
