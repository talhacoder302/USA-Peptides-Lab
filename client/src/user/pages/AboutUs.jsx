import React from "react";
import Background from "../../assets/updated-left.png";
const AboutUs = () => {
  return (
    <div className="flex flex-col items-end gap-14 mb-20">
      <div
        className="flex items-center justify-center w-full min-h-[35vh] bg-cover bg-center "
        style={{ backgroundImage: `url(${Background})` }}
      >
        <h1 className=" md:mt-12 mt-24 sm:w-[80%] w-[90%] text-gradient md:text-[60px] text-[32px] font-[700]  md:leading-[70px]">
          ABOUT USA <br className="md:!flex hidden" /> PEPTIDES LAB
        </h1>
      </div>
      <div className="flex items-center w-[90%]">
        <p className="w-[95%] text-[15px] font-[400] text-[#666]">
          We are a leading provider of high-quality peptides for laboratories,
          researchers, and academic institutions across the globe. All our
          products are synthesized and lyophilized in the United States, with
          purity levels exceeding 99%+. We have a wide offering of standard
          peptides as well as topical peptides, peptide blends, customizable
          orders, and an expert team ready to assist you.
        </p>
      </div>
      <div className="w-[90%] text-[26px] text-[#333] font-[700]">
        <h1>Why Choose Us?</h1>
      </div>
      <div className="w-[90%] flex flex-col gap-6 text-[#666] ">
        <div className=" w-[90%] font-[500] text-[15px]  leading-[26px]">
          <span className=" font-[700]">Top Quality:</span> Our peptides are
          manufactured locally against the highest standards for synthesis,
          undergoing rigorous quality control measures to ensure their purity,
          stability, and consistency.
        </div>
        <div className=" w-[90%] font-[500] text-[15px] leading-[26px] ">
          <span className=" font-[700]">Range of Products:</span> We offer a
          comprehensive and industry-leading peptide catalog. Whether you
          require standard peptides, blends, topical peptides, or customized
          orders, our experienced team is ready to assist you.
        </div>
        <div className=" w-[90%] font-[500] text-[15px] leading-[26px] ">
          <span className=" font-[700]">Expert Customer Service: </span>
          We believe in building long-lasting relationships with our customers.
          Our dedicated customer support team is here to support you. We will do
          everything in our power to ensure that our customers are satisfied,
          even after products are delivered.
        </div>
        <div className=" w-[90%] font-[500] text-[15px] leading-[26px] ">
          <span className=" font-[700]">Fast and Free Delivery: </span>
          We strive to provide fast and reliable delivery, no matter where you
          are. For orders over $200, the shipping is on us.
        </div>
        <div className="font-[500] text-[15px] w-[90%]">
          For customized peptide inquiries or to place an order, please reach
          out to our customer support team by visiting our
          <a
            href="/contact"
            className="font-[600] leading-[26px] text-[#cc3882]"
          >
            Contact page
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
