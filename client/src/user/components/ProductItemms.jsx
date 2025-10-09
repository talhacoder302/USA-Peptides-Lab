import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../service/service"; // Import your API service

const ProductItems = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("Sort by popularity");
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductList();
        const productsData = response.data.data || response.data;
        const sortedByAZ = [...productsData].sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        setProducts(sortedByAZ);
        setOriginalProducts(sortedByAZ);
        setSortOption("Sort by title: (A-Z)");
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProducts = [...originalProducts];

    switch (value) {
      case "Sort by price: low to high":
        sortedProducts.sort((a, b) => {
          const priceA =
            parseFloat(a.price?.toString().replace(/[^0-9.]/g, "")) || 0;
          const priceB =
            parseFloat(b.price?.toString().replace(/[^0-9.]/g, "")) || 0;
          return priceA - priceB;
        });
        break;
      case "Sort by price: high to low":
        sortedProducts.sort((a, b) => {
          const priceA =
            parseFloat(a.price?.toString().replace(/[^0-9.]/g, "")) || 0;
          const priceB =
            parseFloat(b.price?.toString().replace(/[^0-9.]/g, "")) || 0;
          return priceB - priceA;
        });
        break;
      case "Sort by title: (A-Z)":
        sortedProducts.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;
      case "Sort by title: (Z-A)":
        sortedProducts.sort((a, b) =>
          (b.name || "").localeCompare(a.name || "")
        );
        break;
      case "Sort by latest":
        sortedProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.dateAdded || 0);
          const dateB = new Date(b.createdAt || b.dateAdded || 0);
          return dateB - dateA;
        });
        break;
      default:
        sortedProducts = [...originalProducts];
    }

    setProducts(sortedProducts);
  };

  const handleProductClick = (product) => {
    const productName =
      product.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || "product";

    navigate(`/peptides/${productName}`, {
      state: { product },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center my-16">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center my-16">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center my-16">
      <div className="flex flex-col items-center w-[100%]">
        <div className="md:text-[26px] lg:text-[32px] xl:text-[32px] text-[26px] font-[700] leading-[32px] text-gray-800">
          Research Peptides For Sale
        </div>
        <div className="flex md:flex-row flex-col items-start justify-between gap-4 md:w-[80%] w-[90%] p-2 my-8">
          <p className="font-[600] text-[14px] leading-[26px]">
            Showing all {products.length} results
          </p>
          <select
            className="border border-black px-2 py-1 md:text-md text-sm rounded-sm font-[400]"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option>Sort by popularity</option>
            <option>Sort by latest</option>
            <option>Sort by price: low to high</option>
            <option>Sort by price: high to low</option>
            <option>Sort by title: (A-Z)</option>
            <option>Sort by title: (Z-A)</option>
          </select>
        </div>
        <div className="md:p-4 p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:w-[80%] w-[90%] md:gap-6 gap-3">
          {products.map((product) => (
            <div
              key={product.id || product._id}
              className="p-4 hover:shadow-lg transition relative cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {(product.stock === 0 || product.quantity === 0) && (
                <div className="absolute top-2 left-0 bg-primary text-white  px-4 py-2 rounded-md z-10">
                  Out of Stock
                </div>
              )}
              <div className="flex flex-col items-center">
                <div className="relative w-full">
                  <img
                    src={
                      product.productImage ||
                      product.imageUrl ||
                      "/placeholder-image.jpg"
                    }
                    alt={product.name || "Product"}
                    className="w-full md:h-62 object-contain mb-4"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                  {(product.stock === 0 || product.quantity === 0) && (
                    <div className="absolute inset-0 bg-gray-200 opacity-50 mb-4"></div>
                  )}
                </div>

                <h2 className="text-[15px] font-[600] leading-[20px] text-center mb-2">
                  {product.name || "Unnamed Product"}
                </h2>

                <p className="text-[#cc3882] font-[600] text-[16px] leading-[26px]">
                  ${product.price}.00
                </p>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItems;
