import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../style/layout.css";
import ScrollToTop from "../components/ui/ScrollToTop";

const Layout = () => {
  return (
    <div className="layout-container" role="document">
      <Header />
      <ScrollToTop />
      <main id="main-content" role="main" className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
