import React from "react";
import ProductItemms from "../components/ProductItemms";
const herobg = require("../../assets/peptides-bg-2k.png");
const heropd = require("../../assets/heroBg.png");
const Peptides = () => {
  return (
    <div>
      <div
        className="w-full lg:h-[80vh] flex items-start justify-center py-10 bg-cover bg-center "
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="md:w-[80%] w-[90%] md:mt-10 flex gap-8 lg:flex-row flex-col">
          <div className="lg:w-1/2 flex flex-col items-start justify-center gap-10 ">
            <h1 className="text-gradient lg:text-[60px] sm:text-[35px] text-[32px] leading-tight lg:w-[90%] font-[700]">
              Research Peptides For Sale
            </h1>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center">
            <img src={heropd} alt="product" className="lg:mt-14"/>
          </div>
        </div>
      </div>
      <ProductItemms />
    </div>
  );
};

export default Peptides;
