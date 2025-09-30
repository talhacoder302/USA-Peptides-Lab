import React, { useState } from "react";
import {
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const DashboardComponent = () => {
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 7000 },
    { month: "Jul", revenue: 5000 },
    { month: "Aug", revenue: 9000 },
    { month: "Sep", revenue: 8000 },
    { month: "Oct", revenue: 3000 },
    { month: "Nov", revenue: 6000 },
    { month: "Dec", revenue: 2000 },
  ];

  const salesData = [
    { name: "Product A", sales: 400 },
    { name: "Product B", sales: 300 },
    { name: "Product C", sales: 500 },
    { name: "Product D", sales: 200 },
    { name: "Product E", sales: 300 },
    { name: "Product F", sales: 700 },
    { name: "Product G", sales: 600 },
    { name: "Product H", sales: 100 },
    { name: "Product I", sales: 400 },
    { name: "Product J", sales: 300 },
  ];

  const recentOrders = [
    { id: 1, customer: "John Doe", product: "Product A", total: "$200" },
    { id: 2, customer: "Jane Smith", product: "Product B", total: "$150" },
    { id: 3, customer: "Michael Lee", product: "Product C", total: "$300" },
    { id: 4, customer: "Sarah Parker", product: "Product D", total: "$180" },
    { id: 5, customer: "David Kim", product: "Product E", total: "$220" },
    { id: 6, customer: "Chris Brown", product: "Product F", total: "$250" },
    { id: 7, customer: "Anna White", product: "Product G", total: "$210" },
  ];

  const bestSelling = [
    { name: "Product A", sold: 120, left: 70 },
    { name: "Product C", sold: 95, left: 39 },
    { name: "Product B", sold: 90, left: 53 },
    { name: "Product D", sold: 88, left: 27 },
    { name: "Product E", sold: 85, left: 78 },
    { name: "Product F", sold: 80, left: 12 },
    { name: "Product G", sold: 78, left: 40 },
  ];
  const [orderPage, setOrderPage] = useState(0);
  const [productPage, setProductPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const primaryColor = "var(--primary)";
  const secondaryColor = "var(--secondary)";
  const itemsPerPage = 5;

  const paginatedOrders = recentOrders.slice(
    orderPage * itemsPerPage,
    orderPage * itemsPerPage + itemsPerPage
  );

  const paginatedProducts = bestSelling.slice(
    productPage * itemsPerPage,
    productPage * itemsPerPage + itemsPerPage
  );
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow rounded text-sm">
          <p className="font-semibold">{label}</p>
          <p>Sales: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const totalOrderPages = Math.ceil(recentOrders.length / itemsPerPage);
  const totalProductPages = Math.ceil(bestSelling.length / itemsPerPage);
  return (
    <div className="p-5 text-gray-700">
      <h1 className="text-3xl font-bold  mb-5">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-5 mb-5">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold">$45,000</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">320</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-gray-500">New Customers</h2>
          <p className="text-2xl font-bold">85</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-gray-500">Support Tickets</h2>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-5 mb-5">
        {/* Revenue Chart */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--secondary)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Chart */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData} barCategoryGap="25%">
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="sales"
                radius={[8, 8, 0, 0]}
                fill="var(--secondary)"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {salesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? primaryColor : secondaryColor}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-5">
        {/* Recent Orders */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>
          <table className="w-full border transition-all duration-500">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2">{order.customer}</td>
                  <td className="p-2">{order.product}</td>
                  <td className="p-2">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setOrderPage((p) => Math.max(p - 1, 0))}
              disabled={orderPage === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              onClick={() =>
                setOrderPage((p) => Math.min(p + 1, totalOrderPages - 1))
              }
              disabled={orderPage >= totalOrderPages - 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Best Selling Products</h2>
          <table className="w-full border transition-all duration-500 ">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Left</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.sold}</td>
                  <td className="p-2">{item.left}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setProductPage((p) => Math.max(p - 1, 0))}
              disabled={productPage === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              onClick={() =>
                setProductPage((p) => Math.min(p + 1, totalProductPages - 1))
              }
              disabled={productPage >= totalProductPages - 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
