import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Header from "./user/components/Header";
import Footer from "./user/components/Footer";
import UserRoutes from "./routes/UserRoute";
import AdminRoutes from "./routes/AdminRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function LayoutWrapper({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
function App() {
  return (
    <Router>
      <ScrollToTop />
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/" replace />} />
          <Route path="/*" element={<UserWrapper />} />
          <Route path="/admin/*" element={<AdminWrapper />} />
        </Routes>
      </LayoutWrapper>
      <ToastContainer />
    </Router>
  );
}

function UserWrapper() {
  return <Routes>{UserRoutes}</Routes>;
}

function AdminWrapper() {
  return <Routes>{AdminRoutes}</Routes>;
}

export default App;
