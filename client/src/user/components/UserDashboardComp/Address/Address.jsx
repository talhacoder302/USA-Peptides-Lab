import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const Address = () => {
  // ✅ Get user data from parent (UserDashboard)
  const { user } = useOutletContext();

  // Safely extract addresses
  const billingAddress = user?.addresses?.billing || null;
  const shippingAddress = user?.addresses?.shipping || null;

  return (
    <div>
      <p className="mt-4 text-[#666] text-[15px] font-[500]">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="flex gap-10 mt-6">
        {/* Billing Address */}
        <div className="w-1/2 flex flex-col">
          <h2 className="text-[26px] font-[700] text-[#333] leading-[26px]">
            Billing address
          </h2>
          <Link
            to="billing"
              state={{ type: "billing", address: billingAddress, user }}
            className="mt-4 text-[15px] text-end w-full font-[600] text-[#cc3882]"
          >
            {billingAddress ? "Edit Billing address" : "Add Billing address"}
          </Link>

          {billingAddress ? (
            <div className="mt-4 text-[#666] text-[15px] font-[500]">
              <p>
                {user.firstName} {user.lastName}
              </p>
              {billingAddress.companyName && <p>{billingAddress.companyName}</p>}
              <p>{billingAddress.address1}</p>
              {billingAddress.address2 && <p>{billingAddress.address2}</p>}
              <p>
                {billingAddress.city}, {billingAddress.state}{" "}
                {billingAddress.zipCode}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-[#666] text-[15px] font-[500] italic">
              You have not set up this type of address yet.
            </p>
          )}
        </div>

        {/* Shipping Address */}
        <div className="w-1/2 flex flex-col">
          <h2 className="text-[26px] font-[700] text-[#333] leading-[26px]">
            Shipping address
          </h2>
          <Link
            to="shipping"
              state={{ type: "shipping", address: shippingAddress, user }}

            className="mt-4 text-[15px] text-end w-full font-[600] text-[#cc3882]"
          >
            {shippingAddress ? "Edit Shipping address" : "Add Shipping address"}
          </Link>

          {shippingAddress ? (
            <div className="mt-4 text-[#666] text-[15px] font-[500]">
              <p>
                {user.firstName} {user.lastName}
              </p>
              {shippingAddress.companyName && <p>{shippingAddress.companyName}</p>}
              <p>{shippingAddress.address1}</p>
              {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
              <p>
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.zipCode}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-[#666] text-[15px] font-[500] italic">
              You have not set up this type of address yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
