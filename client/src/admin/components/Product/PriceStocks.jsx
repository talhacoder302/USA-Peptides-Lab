import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ChevronDown,
  ChevronUp,
  Edit3,
  Check,
  X,
  Package,
  Tag,
} from "lucide-react";
import {
  getProductSummary,
  updatePriceAndStock,
} from "../../../service/service";
import { loadingToast, updateToast } from "../../../utils/AlertsConfig";

const ProductPricingStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [editingCell, setEditingCell] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProductSummary();
        console.log("API Response:", response.data);

        let productData = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            productData = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            productData = response.data.data;
          }
        }

        setProducts(productData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        let matchesStock = true;
        if (stockFilter !== "all") {
          const stock = product.stock;
          if (stockFilter === "out-of-stock") {
            matchesStock = stock === 0;
          } else if (stockFilter === "low-stock") {
            matchesStock = stock > 0 && stock < 10;
          } else if (stockFilter === "in-stock") {
            matchesStock = stock >= 10;
          }
        }

        return matchesSearch && matchesStock;
      })
    : [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique sizes for filter
  const sizes = [
    ...new Set(products.map((product) => product.size).filter(Boolean)),
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleRowExpansion = (productId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(productId)) {
      newExpandedRows.delete(productId);
    } else {
      newExpandedRows.add(productId);
    }
    setExpandedRows(newExpandedRows);
  };

  const startEditing = (productId, field, currentValue) => {
    setEditingCell(`${productId}-${field}`);
    setEditValues({ ...editValues, [`${productId}-${field}`]: currentValue });
  };

  const cancelEditing = (productId, field) => {
    setEditingCell(null);
    const newEditValues = { ...editValues };
    delete newEditValues[`${productId}-${field}`];
    setEditValues(newEditValues);
  };

  const saveEdit = async (productId, field) => {
    const value = editValues[`${productId}-${field}`];
    const toastId = loadingToast("Updating product...");

    try {
      const updateData = { [field]: parseFloat(value) };
      const response = await updatePriceAndStock(productId, updateData);

      if (response.data.success) {
        // Update local state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, [field]: parseFloat(value) }
              : product
          )
        );

        updateToast(toastId, "success", "Product updated successfully!");
        setEditingCell(null);
        const newEditValues = { ...editValues };
        delete newEditValues[`${productId}-${field}`];
        setEditValues(newEditValues);
      } else {
        updateToast(
          toastId,
          "error",
          response.data.message || "Failed to update product"
        );
      }
    } catch (error) {
      updateToast(toastId, "error", "Failed to update product");
      console.error("Update error:", error);
    }
  };

  const handleInputChange = (productId, field, value) => {
    setEditValues({ ...editValues, [`${productId}-${field}`]: value });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStockStatus = (stock) => {
    if (stock === 0)
      return { text: "Out of Stock", class: "bg-red-100 text-red-800" };
    if (stock < 10)
      return { text: "Low Stock", class: "bg-yellow-100 text-yellow-800" };
    return { text: "In Stock", class: "bg-green-100 text-green-800" };
  };

  // Function to calculate price range based on discount and quantity range
  const calculatePriceRange = (
    basePrice,
    discount,
    minQuantity,
    maxQuantity
  ) => {
    const discountedUnitPrice =
      basePrice * (1 - discount.discountPercent / 100);

    const minTotalPrice = discountedUnitPrice * minQuantity;
    const maxTotalPrice = discountedUnitPrice * maxQuantity;

    return {
      minPrice: minTotalPrice,
      maxPrice: maxTotalPrice,
      unitPrice: discountedUnitPrice,
    };
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, stockFilter]);

  if (loading) {
    return (
      <div className="mx-auto p-6 text-gray-700">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-6 text-gray-700">
        <div className="text-center py-12">
          <div className="text-red-500 mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 text-gray-700">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Product Pricing & Stock</h1>
        <p className="text-gray-600">
          Total: {Array.isArray(products) ? products.length : 0} products
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stock Status Filter */}
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="all">All Stock Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <React.Fragment key={product._id}>
                {/* Main Product Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-secondary text-white rounded-lg flex items-center justify-center text-sm font-medium">
                        {product.name?.charAt(0).toUpperCase() || "P"}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name || "No Name"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.size || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCell === `${product._id}-price` ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={editValues[`${product._id}-price`] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              product._id,
                              "price",
                              e.target.value
                            )
                          }
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(product._id, "price")}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => cancelEditing(product._id, "price")}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </span>
                        <button
                          onClick={() =>
                            startEditing(product._id, "price", product.price)
                          }
                          className="p-1 text-gray-400 hover:text-secondary hover:bg-blue-50 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCell === `${product._id}-stock` ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editValues[`${product._id}-stock`] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              product._id,
                              "stock",
                              e.target.value
                            )
                          }
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(product._id, "stock")}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => cancelEditing(product._id, "stock")}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {product.stock}
                        </span>
                        <button
                          onClick={() =>
                            startEditing(product._id, "stock", product.stock)
                          }
                          className="p-1 text-gray-400 hover:text-secondary hover:bg-blue-50 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        getStockStatus(product.stock).class
                      }`}
                    >
                      {getStockStatus(product.stock).text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => toggleRowExpansion(product._id)}
                      className="flex items-center gap-1 px-3 py-1 text-secondary hover:bg-blue-50 rounded-md"
                    >
                      {expandedRows.has(product._id) ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Discounts
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Discounts
                        </>
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expandable Discount Row */}
                {expandedRows.has(product._id) && (
                  <tr className="">
                    <td colSpan="6" className="px-6 py-4 bg-gray-50">
                      <div className="max-w-4xl">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Available Discounts
                        </h4>
                        {product.discounts && product.discounts.length > 0 ? (
                          <div className="bg-white rounded-lg border">
                            <table className="w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                    Quantity Range
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                    Discount %
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                    Unit Price After Discount
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                    Total Price Range
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {product.discounts.map((discount, index) => {
                                  const priceRange = calculatePriceRange(
                                    product.price,
                                    discount,
                                    discount.minQuantity,
                                    discount.maxQuantity
                                  );

                                  return (
                                    <tr
                                      key={index}
                                      className="hover:bg-gray-50"
                                    >
                                      <td className="px-4 py-3 text-sm">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                          {discount.minQuantity} -{" "}
                                          {discount.maxQuantity} units
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 text-sm">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium">
                                          {discount.discountPercent}% OFF
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 text-sm font-medium text-blue-600">
                                        {formatCurrency(priceRange.unitPrice)}
                                        <div className="text-xs text-gray-500">
                                          (was {formatCurrency(product.price)})
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-sm font-medium text-green-600">
                                        <div className="flex flex-col">
                                          <span className="font-semibold">
                                            {formatCurrency(
                                              priceRange.minPrice
                                            )}{" "}
                                            -{" "}
                                            {formatCurrency(
                                              priceRange.maxPrice
                                            )}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            Total for {discount.minQuantity}-
                                            {discount.maxQuantity} units
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-white rounded-lg border">
                            <Tag className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              No discounts available for this product
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {paginatedProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} results
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm border rounded-md ${
                  currentPage === page
                    ? "bg-secondary text-white border-secondary"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPricingStock;
