import React from "react";
import Background from "../../assets/right-updated.png";

const ShippingRefund = () => {
  return (
    <div className="flex flex-col items-end gap-14 mb-20">
      <div
        className="flex items-center justify-center w-full min-h-[40vh] bg-cover bg-center "
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="md:mt-8 mt-4 w-[90%] text-gradient md:text-[60px] text-[32px] leading-tight font-[700]">
          <h1 className="md:ml-16 lg:w-[40%] w-[100%]">Shipping, Returns & Refunds</h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-[100%] text-[15px] leading-[26px] font-[500]">
        <div className="flex flex-col gap-6 items-start md:w-[80%] w-[90%] text-[#666]">
          <div className="flex flex-col gap-5 ">
            <h1 className="md:mt-12 md:text-[28px] text-[22px] font-[700] leading-[28px] text-[#333]">
              Shipping
            </h1>
            <p>
              We at USA Peptides Lab offer Free Priority USPS shipping on orders
              over $200 within the US.
            </p>
            <p>
              All our Free Shipping offers are for US addresses only, unless
              specified otherwise.
            </p>
            <p>
              We offer same (business) day shipping for orders placed before 1pm
              PST Monday-Friday. All orders received after 1pm PST, or on
              weekends or holidays, will ship on the next business day.
            </p>
            <p>
              We also offer Priority Express shipping (overnight USPS). We will
              soon be offering FedEx shipping as well. Stay tuned.
            </p>
            <p>
              When your order ships, our systems will automatically generate a
              “Package Shipped” email notification that will include a tracking
              number.
            </p>
            <p>
              Shipping rates and options, including free shipping, are subject
              to change at any time without notice.
            </p>
            <h1 className="md:text-[28px] text-[22px] font-[700] leading-[28px] text-[#333]">
              Returns and Refunds
            </h1>
            <p>
              If your order has not yet shipped, you may cancel your order by
              contacting us at{" "}
              <a href="/" className="text-[#cc3882] font-[600]">
                {" "}
                www.usapeptideslab.com
              </a>{" "}
              for a refund.
            </p>
            <p>
              Refunds may be requested up to 30 days after an order is placed.
            </p>
            <h1 className="md:text-[28px] text-[22px] font-[700] leading-[28px] text-[#333]">
              Refund Timeframe
            </h1>
            <p>
              Refunds should settle and post to your account in 2 to 3 business
              days.
            </p>
            <h1 className="md:text-[28px] text-[22px] font-[700] leading-[28px] text-[#333]">
              Bulk and Special Orders
            </h1>
            <p>
              <a href="/contact" className="text-[#cc3882] font-[600]">
                {" "}
                Contact us
              </a>{" "}
              for bulk or special orders. Our friendly customer service staff
              will work with you to satisfy any special requests.
            </p>
            <p className="font-bold border-t-2 border-b-2 border-[#666] py-4 ">
              ALL PRODUCTS sold on our site are for laboratory RESEARCH OR
              EDUCATIONAL PURPOSES ONLY. Personal use or human consumption of
              our products is expressly PROHIBITED. For details, please review
              and adhere to our{" "}
              <a href="/terms-condition" className="text-[#cc3882] font-[600]">
                {" "}
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingRefund;
