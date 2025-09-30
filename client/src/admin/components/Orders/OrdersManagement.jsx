import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  User,
  Calendar,
  ChartSpline,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
const OrdersManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedAccordion, setExpandedAccordion] = useState("products");
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "Ali Khan",
      status: "Pending",
      total: "$120.00",
      date: "2025-08-25",
      products: [
        {
          id: 1,
          name: "Premium Headphones",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
          quantity: 1,
          price: "$100.00",
          totalPrice: "$100.00",
          stockLeft: 25,
        },
        {
          id: 2,
          name: "Phone Case",
          image:
            "https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop",
          quantity: 2,
          price: "$10.00",
          totalPrice: "$20.00",
          stockLeft: 150,
        },
      ],
      customerDetails: {
        name: "Ali Khan",
        email: "ali.khan@email.com",
        phone: "+92 300 1234567",
        address: "House 123, Street 5, F-8 Markaz, Islamabad, Pakistan",
      },
    },
    {
      id: "ORD-1002",
      customer: "Fatima Noor",
      status: "Shipped",
      total: "$250.00",
      date: "2025-08-26",
      products: [
        {
          id: 3,
          name: "Laptop Stand",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
          quantity: 1,
          price: "$250.00",
          totalPrice: "$250.00",
          stockLeft: 12,
        },
      ],
      customerDetails: {
        name: "Fatima Noor",
        email: "fatima.noor@email.com",
        phone: "+92 321 7654321",
        address: "Apartment 45, Block C, DHA Phase 2, Lahore, Pakistan",
      },
    },
    {
      id: "ORD-1003",
      customer: "Ahmed Raza",
      status: "Completed",
      total: "$99.00",
      date: "2025-08-27",
      products: [
        {
          id: 4,
          name: "Wireless Mouse",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
          quantity: 3,
          price: "$33.00",
          totalPrice: "$99.00",
          stockLeft: 8,
        },
      ],
      customerDetails: {
        name: "Ahmed Raza",
        email: "ahmed.raza@email.com",
        phone: "+92 333 9876543",
        address: "Shop 67, Commercial Market, Gulberg III, Lahore, Pakistan",
      },
    },
    {
      id: "ORD-1004",
      customer: "Sara Ali",
      status: "Cancelled",
      total: "$75.00",
      date: "2025-08-28",
      products: [
        {
          id: 5,
          name: "Bluetooth Speaker",
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
          quantity: 1,
          price: "$75.00",
          totalPrice: "$75.00",
          stockLeft: 30,
        },
      ],
      customerDetails: {
        name: "Sara Ali",
        email: "sara.ali@email.com",
        phone: "+92 345 1122334",
        address: "Villa 23, Phase 4, Bahria Town, Rawalpindi, Pakistan",
      },
    },
  ]);

  const tabs = ["all", "pending", "shipped", "completed", "cancelled"];

  // Filter orders based on active tab, search term, and filters
  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" || order.status.toLowerCase() === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateFilter = !dateFilter || order.date === dateFilter;
    const matchesStatusFilter =
      !statusFilter ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return (
      matchesTab && matchesSearch && matchesDateFilter && matchesStatusFilter
    );
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "shipped":
        return "text-blue-600 bg-blue-50";
      case "completed":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setExpandedAccordion("products");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setOrders(orders.filter((order) => order.id !== orderToDelete.id));
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  const toggleAccordion = (section) => {
    setExpandedAccordion(expandedAccordion === section ? "" : section);
  };

  const clearFilters = () => {
    setDateFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    revenue: orders.reduce(
      (sum, order) => sum + parseFloat(order.total.replace("$", "")),
      0
    ),
    pending: orders.filter((o) => o.status === "Pending").length,
    completed: orders.filter((o) => o.status === "Completed").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  return (
    <div className="p-3 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all your orders</p>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none text-sm text-gray-600 w-48"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 shadow transition-colors">
            <Filter className="w-4 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-5">
          {/* Tabs */}
          <div className="flex gap-3 border-b mb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "border-secondary text-secondary"
                    : "border-transparent text-gray-500 hover:text-secondary"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== "all" && (
                  <span className="ml-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {tab === "pending"
                      ? stats.pending
                      : tab === "shipped"
                      ? stats.shipped
                      : tab === "completed"
                      ? stats.completed
                      : tab === "cancelled"
                      ? stats.cancelled
                      : 0}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            {(searchTerm || dateFilter || statusFilter) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4 font-medium">Order ID</th>
                  <th className="py-3 px-4 font-medium">Customer</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Total</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No orders found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 text-[#666] transition"
                    >
                      <td className="py-3 px-4  ">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">
                        {order.total}
                      </td>
                      <td className="py-3 px-4 ">{order.date}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="View Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(order)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar (Stats) */}
        <div className="space-y-4">
          <div className="p-5 bg-blue-600 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="p-5 bg-green-600 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold mt-1">
              ${stats.revenue.toFixed(2)}
            </p>
          </div>
          <div className="p-5 bg-yellow-500 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-2xl font-bold mt-1">{stats.pending}</p>
          </div>
          <div className="p-5 bg-emerald-600 text-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-2xl font-bold mt-1">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-xl">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order Details
                </h2>
                <p className="text-gray-600 mt-1">{selectedOrder.id}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold">{selectedOrder.total}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="font-semibold">
                    {selectedOrder.products.length}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
                    <span
                      className={`w-6 h-6 rounded-full ${getStatusColor(
                        selectedOrder.status
                      )
                        .replace("text-", "bg-")
                        .replace("bg-", "bg-")
                        .replace("-50", "-600")}`}
                    >
                      <ChartSpline className="w-6 h-6 text-yellow-600" />
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="p-6 space-y-4">
              {/* Products Accordion */}
              <div className="border rounded-lg">
                <button
                  onClick={() => toggleAccordion("products")}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">
                      Product Details
                    </span>
                  </div>
                  {expandedAccordion === "products" ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedAccordion === "products" && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="space-y-4">
                      {selectedOrder.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-4 shadow-sm border"
                        >
                          <div className="flex gap-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">
                                {product.name}
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                                <div>
                                  <span className="text-gray-600">
                                    Quantity:
                                  </span>
                                  <span className="font-medium ml-1">
                                    {product.quantity}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Unit Price:
                                  </span>
                                  <span className="font-medium ml-1">
                                    {product.price}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Total:</span>
                                  <span className="font-medium ml-1">
                                    {product.totalPrice}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Stock Left:
                                  </span>
                                  <span
                                    className={`font-medium ml-1 ${
                                      product.stockLeft < 10
                                        ? "text-red-600"
                                        : "text-green-600"
                                    }`}
                                  >
                                    {product.stockLeft}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Accordion */}
              <div className="border rounded-lg">
                <button
                  onClick={() => toggleAccordion("customer")}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">
                      Customer Details
                    </span>
                  </div>
                  {expandedAccordion === "customer" ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedAccordion === "customer" && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-gray-600" />
                          <div>
                            <span className="text-gray-600 text-sm">Name:</span>
                            <span className="font-medium ml-2">
                              {selectedOrder.customerDetails.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <div>
                            <span className="text-gray-600 text-sm">
                              Email:
                            </span>
                            <span className="font-medium ml-2">
                              {selectedOrder.customerDetails.email}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <div>
                            <span className="text-gray-600 text-sm">
                              Phone:
                            </span>
                            <span className="font-medium ml-2">
                              {selectedOrder.customerDetails.phone}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                          <div>
                            <span className="text-gray-600 text-sm">
                              Address:
                            </span>
                            <p className="font-medium ml-2">
                              {selectedOrder.customerDetails.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center gap-3 p-6 border-b">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Delete Order
                </h2>
                <p className="text-gray-600 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete order{" "}
                <span className="font-semibold text-red-600">
                  {orderToDelete.id}
                </span>
                ?
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-600">Customer:</span>{" "}
                    <span className="font-medium">
                      {orderToDelete.customer}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-600">Total:</span>{" "}
                    <span className="font-medium">{orderToDelete.total}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Date:</span>{" "}
                    <span className="font-medium">{orderToDelete.date}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        orderToDelete.status
                      )}`}
                    >
                      {orderToDelete.status}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-red-600 font-medium">
                ⚠️ This will permanently remove the order from the system.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
