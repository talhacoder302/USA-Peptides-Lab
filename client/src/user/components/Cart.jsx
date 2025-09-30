import React, { useEffect, useRef } from "react";

const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const cartRef = useRef(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when cart is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTax = () => {
    // Assuming 0% tax as shown in design
    return "0.00";
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    return (subtotal + tax).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[40]" />

      {/* Cart Drawer */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-0.5/3 bg-white text-black shadow-lg z-[999999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="text-2xl cursor-pointer hover:text-gray-600 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-400 text-sm">
                  Add some products to get started
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="h-[37%] overflow-scroll  p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-black pb-4 mb-4 last:border-b-0"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-md bg-gray-100"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-base">{item.name}</h3>
                          <p className="font-semibold text-base">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-full bg-gray-100">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  onRemoveItem(item.id);
                                } else {
                                  onUpdateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors rounded-l-full"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 min-w-[40px] text-center bg-white border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors rounded-r-full"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="flex gap-4 items-center px-4 py-3 mt-3">
                <p className="text-sm font-medium ">Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className=" px-2 py-1 rounded-full bg-gray-200 text-sm placeholder-gray-600"
                  />
                  <button className="px-4 py-1 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="shadow-slate-400 shadow-lg  border m-4 rounded-3xl p-4">
                <div className="">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium">Subtotal</span>
                      <span className="text-base text-primary font-semibold">
                        ${calculateSubtotal()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t pt-2 border-gray-300">
                      <span className="text-base font-medium">Shipping</span>
                      <span className="text-base font-semibold text-green-600">
                        Free!
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium">Tax</span>
                      <span className="text-base text-primary font-semibold">
                        ${calculateTax()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ${calculateTotal()} USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 flex flex-col items-center justify-center space-y-3 bg-white">
                  <button className="w-[90%] bg-secondary text-white hover:text-secondary border-2 border-secondary py-3 rounded-full font-semibold text-base hover:bg-transparent transition-colors">
                    CHECKOUT
                  </button>
                  <button
                    onClick={onClose}
                    className="w-[90%] bg-black text-white hover:text-black border-2 border-black py-3 rounded-full font-semibold text-base hover:bg-transparent transition-colors"
                  >
                    RETURN TO STORE
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
