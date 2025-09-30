// routes/AdminRoute.jsx
import React from "react";
import { Route } from "react-router-dom";
import Layout from "../admin/Layout";
import DashboardComponent from "../admin/components/Dashboard/DashboardComponent";
import AddProduct from "../admin/components/Product/AddProduct";
import ProductList from "../admin/components/Product/ProductList";
import UserList from "../admin/components/user-management/UserList";
import PriceStocks from "../admin/components/Product/PriceStocks";
import OrdersManagement from "../admin/components/Orders/OrdersManagement";
const adminRoutes = [
  <Route key="layout" element={<Layout />}>
    <Route path="dashboard" element={<DashboardComponent />} />
    <Route path="products/add" element={<AddProduct />} />
    <Route path="products-list" element={<ProductList />} />
    <Route path="/products/pricing" element={<PriceStocks />} />
    <Route path="userslist" element={<UserList />} />
    <Route path="orders" element={<OrdersManagement />} />
  </Route>,
];

export default adminRoutes;
