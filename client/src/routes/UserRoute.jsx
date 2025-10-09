// routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import AboutUs from "../user/pages/AboutUs";
import Contact from "../user/pages/Contact";
import Home from "../user/pages/Home";
import MyAccount from "../user/pages/MyAccount";
import Peptides from "../user/pages/Peptides";
import ForgetPass from "../user/components/ForgetPass";
import PrivacyPolicy from "../user/pages/PrivacyPolicy";
import TermsCondition from "../user/pages/TermsCondition";
import ShippingRefund from "../user/pages/ShippingRefund";
import SearchResult from "../user/components/SearchResult";
import SetUpPassword from "../user/components/SetUpPassword";
import ProductDetails from "../user/components/ProductDetails";
import UserDashboard from "../user/pages/UserDashboard";
import Dashboard from "../user/components/UserDashboardComp/Dashboard";
import AccountDetails from "../user/components/UserDashboardComp/AccountDetails";
import Address from "../user/components/UserDashboardComp/Address/Address";
import Billing from "../user/components/UserDashboardComp/Address/Billing";
import Shipping from "../user/components/UserDashboardComp/Address/Shipping";
import Download from "../user/components/UserDashboardComp/Download";
import Order from "../user/components/UserDashboardComp/Order";

const userRoutes = [
  <Route key="home" path="home" element={<Home />} />,
  <Route key="about-us" path="about-us" element={<AboutUs />} />,
  <Route key="contact" path="contact" element={<Contact />} />,
  // Define peptides routes separately
  <Route key="peptides-main" path="peptides" element={<Peptides />} />,
  <Route
    key="peptides-detail"
    path="peptides/:productName"
    element={<ProductDetails />}
  />,
  <Route key="my-accounts" path="my-accounts" element={<MyAccount />} />,
  <Route
    key="forget-password"
    path="my-accounts/forget-password"
    element={<ForgetPass />}
  />,
  <Route
    key="setup-password"
    path="my-accounts/setup-password"
    element={<SetUpPassword />}
  />,
  // <Route key="my-accounts/dashboard" path="my-accounts/dashboard" element={<UserDashboard />} />,
  <Route
    key="my-accounts/dashboard"
    path="my-accounts/dashboard"
    element={<UserDashboard />}
  >
    <Route index element={<Dashboard />} />
    {/* <Route path="store-credit" element={<Credit />} />*/}
    <Route path="orders" element={<Order />} /> 
    <Route path="downloads" element={<Download />} />
    <Route path="addresses" element={<Address />} />
<Route path="addresses/billing" element={<Billing />} />
<Route path="addresses/shipping" element={<Shipping />} />
    <Route path="account-details" element={<AccountDetails />} />
  </Route>,
  <Route key="privacy" path="privacy-policy" element={<PrivacyPolicy />} />,
  <Route key="terms" path="terms-condition" element={<TermsCondition />} />,
  <Route key="shipping" path="shipping" element={<ShippingRefund />} />,
  <Route key="result" path="result-search" element={<SearchResult />} />,
];

export default userRoutes;
