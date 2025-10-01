import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const { productName } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      console.log("No product data found, productName from URL:", productName);
    }
  }, [location.state, productName]);

  const handleBackToProducts = () => {
    navigate("/user/peptides");
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && window.addToCart) {
      // Create a product object compatible with the cart
      const cartProduct = {
        id: product.id || product._id || Date.now(), // Ensure there's an ID
        name: product.name,
        price: product.price,
        productImage: product.productImage || product.imageUrl,
        imageUrl: product.imageUrl || product.productImage,
      };

      // Call the global addToCart function from Header
      window.addToCart(cartProduct, quantity);

      console.log(`Added ${quantity} of ${product.name} to cart`);

      // Reset quantity after adding to cart
      setQuantity(1);
    } else {
      console.log("Product data or addToCart function not available");
    }
  };

  const isOutOfStock = product && product.stock === 0;

  const tabs = [
    { id: "description", label: "Description" },
    product?.tabs?.certificate?.[0]?.url && {
      id: "certificate",
      label: "Certificate of Analysis",
    },
    product?.tabs?.hplc?.[0]?.url && { id: "hplc", label: "HPLC" },
    product?.tabs?.mass?.[0]?.url && { id: "mass", label: "Mass Spectrometry" },
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center my-16 text-[#666]">
      <div className="md:w-[80%] w-[90%]">
        {!product ? (
          <p className="text-center ">Loading product...</p>
        ) : (
          <>
            <button
              onClick={handleBackToProducts}
              className="text-sm hover:underline flex gap-1 items-center"
            >
              Home / <span>{product.name}</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
              {/* Product Image */}
              <div className="relative">
                {isOutOfStock && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-md z-10">
                    Out of Stock
                  </div>
                )}
                <img
                  src={
                    product.productImage ||
                    product.imageUrl ||
                    "/placeholder-image.jpg"
                  }
                  alt={product.name || "Product"}
                  className="w-full h-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                  {product.name || "Unnamed Product"}
                </h1>

                <div className="text-3xl font-bold text-[#cc3882]">
                  ${product.price}.00
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span>Size:</span>
                    <span className="px-2 py-1 rounded text-sm">
                      {product.size}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Contents:</span>
                    <span className="px-2 py-1 rounded text-sm">
                      {product.contents}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Form:</span>
                    <span className="px-2 py-1 rounded text-sm">
                      {product.form}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Purity:</span>
                    <span className="px-2 py-1 rounded text-sm">
                      {product.purity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>SKU:</span>
                    <span className="px-2 py-1 rounded text-sm">
                      {product.sku}
                    </span>
                  </div>
                </div>

                <div className="font-semibold">
                  FREE Shipping on ${product.freeShippingOn}+ orders
                </div>

                <div className="border border-black overflow-hidden">
                  <div className="divide-y divide-black">
                    {/* Table Header */}
                    <div className="grid grid-cols-3 gap-4 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50">
                      <span>Quantity</span>
                      <span>Discount</span>
                      <span>Price</span>
                    </div>

                    {/* Dynamic Rows */}
                    {product?.discounts && product.discounts.length > 0 ? (
                      product.discounts.map((discount) => (
                        <div
                          key={discount._id}
                          className="grid grid-cols-3 gap-4 px-4 py-2 text-sm"
                        >
                          <span>
                            {discount.minQuantity}
                            {discount.maxQuantity
                              ? ` - ${discount.maxQuantity}`
                              : "+"}
                          </span>
                          <span>{discount.discountPercent}%</span>
                          <span>
                            $
                            {(
                              product.price *
                              (1 - discount.discountPercent / 100)
                            ).toFixed(2)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No discounts available
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity and Add to Cart Section */}
                <div className="space-y-3">
                  {isOutOfStock ? (
                    <div className="w-full py-3 px-6 bg-gray-400 text-gray-600 rounded font-semibold text-center">
                      Out of Stock
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 text-primary">
                      <div className="flex items-center border-2 border-primary rounded-full">
                        <button
                          onClick={() => handleQuantityChange("decrease")}
                          disabled={quantity <= 1}
                          className="md:p-2 p-1  disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="md:px-4 px-2 md:py-2 py-1 min-w-[60px] text-center border-x-2 border-primary">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange("increase")}
                          className="md:p-2 p-1 "
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={handleAddToCart}
                        className=" py-2 md:px-6 px-3 hover:bg-[#cc3882] text-[#cc3882] border-2 border-[#cc3882] hover:text-white md:text-lg text-sm rounded-full font-semibold bg-transparent transition"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex md:flex-row flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 font-medium text-sm transition-colors border border-secondary rounded ${
                      activeTab === tab.id
                        ? "text-white bg-secondary  "
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="py-6 px-6 border border-gray-300">
                {activeTab === "description" && (
                  <div
                    className="prose prose-sm max-w-full overflow-hidden break-words [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-gray-800 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:text-gray-700 [&_p]:mb-4 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:ml-6 [&_li]:mb-2 [&_li]:text-gray-600 [&_ol]:mb-4 [&_ol]:ml-6 [&_a]:text-blue-600 [&_a]:underline [&_strong]:font-bold [&_em]:italic"
                    dangerouslySetInnerHTML={{
                      __html: product.tabs.description[0].text,
                    }}
                  />
                )}

                {activeTab === "certificate" && (
                  <img
                    src={product.tabs.certificate[0].url}
                    alt="Certificate of Analysis"
                  />
                )}

                {activeTab === "hplc" && (
                  <img src={product.tabs.hplc[0].url} alt="HPLC Analysis" />
                )}

                {activeTab === "mass" && (
                  <img src={product.tabs.mass[0].url} alt="Mass Spectrometry" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
