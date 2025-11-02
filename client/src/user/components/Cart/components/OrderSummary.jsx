import { IoIosArrowBack } from "react-icons/io";

const OrderSummary = ({
  cartItems = [],
  subtotal = 0,
  formData = {},
  updateData,
  step,
  setStep,
}) => {
  const subtotalNum = Number(subtotal) || 0;
  const shippingRates = { usps: 9.25, ups: 49.0 };
  const shippingMethod = formData.shippingMethod || "";
  const useDebitCard = formData.useDebitCard || false;

  const shippingCost = shippingRates[shippingMethod] || 0;
  const preDiscountTotal = subtotalNum + shippingCost;
  const discount = useDebitCard ? preDiscountTotal * 0.05 : 0;
  const total = (preDiscountTotal - discount).toFixed(2);

  const handleShippingChange = (e) => {
    updateData({ shippingMethod: e.target.value });
  };

  const handleDebitToggle = () => {
    updateData({ useDebitCard: !useDebitCard });
  };
  const handleReturnToShipping = () => {
    setStep(2);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="border-2 border-secondary rounded-3xl px-6 py-6 shadow-md">
        <h3 className="font-semibold text-gray-700 mb-4">Order Summary</h3>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center">
              <div className="bg-secondary text-white py-1 px-3 rounded-md">
                {item.quantity}
              </div>
              <img
                src={item.image}
                className="w-20 h-20 bg-gray-200 rounded object-cover mx-3"
                alt="cart-item"
              />
              <p className="text-sm">{item.name}</p>
            </div>
            <p className="text-sm font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="text-sm space-y-1">
          <div className="flex justify-between py-4 border-b border-[#666]">
            <span>Subtotal</span>
            <span>${subtotalNum.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div>
            <span className="font-semibold text-lg">Shipping</span>

            <div className="flex justify-between items-center py-4 border-b border-[#666] font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="usps"
                  checked={shippingMethod === "usps"}
                  onChange={handleShippingChange}
                  className="accent-secondary w-4 h-4 cursor-pointer"
                />
                <span>USPS Priority:</span>
              </label>
              <span>$9.25</span>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-[#666] font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="ups"
                  checked={shippingMethod === "ups"}
                  onChange={handleShippingChange}
                  className="accent-secondary w-4 h-4 cursor-pointer"
                />
                <span>UPS Overnight:</span>
              </label>
              <span>$49.00</span>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-between py-4 border-[#666] mt-4">
            <span>Total Shipping</span> <span>${shippingCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-4 border-b border-[#666] items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useDebitCard}
                onChange={handleDebitToggle}
                className="accent-secondary w-4 h-4 cursor-pointer"
              />
              <span>Discount for DEBIT Card Only – 5% OFF</span>
            </label>
            <span>{useDebitCard ? `-$${discount.toFixed(2)}` : "-$0.00"}</span>
          </div>

          <div className="flex justify-between font-semibold text-secondary mt-2 text-lg">
            <span>Total</span> <span>${total} USD</span>
          </div>
        </div>
      </div>
      {step === 3 && (
      <div className="space-y-6">
        <div>
          <input type="radio" className="accent-secondary" />
          <span className="ml-3">
            {" "}
            I agree to the Core Peptides{" "}
            <a href="terms-condition" className="text-[#cc3882] font-[600]">
              Terms and Conditions
            </a>
            . I am at least 21 years of age and understand that purchases are
            limited to licensed researchers and/or qualified professionals. I
            understand that the products listed on the site are not for human or
            veterinary use. *
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <button className="w-full bg-secondary text-white py-4 rounded-full font-semibold hover:bg-secondary/90 transition">
            Place your order
          </button>
          <button onClick={handleReturnToShipping} className="flex items-center gap-1 justify-center bg-transparent text-secondary py-4 rounded-full font-semibold border-2 border-secondary transition">
            <IoIosArrowBack />
            Return to Shipping
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default OrderSummary;
