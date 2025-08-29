import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../style/layout.css";
import ScrollToTop from "../components/ui/ScrollToTop";


const Layout = () => {
  return (
    <div className="layout-container" role="document">
      {/* a11y: Header will contain the banner role and navigation */}
      <Header />
      {/* a11y: Main content with role and ID for skip link target */}
       <ScrollToTop />
      <main id="main-content" role="main" className="main-content">
        <Outlet />
      </main>
      
      {/* a11y: Footer will contain contentinfo role */}
      <Footer />
    </div>
  );
};

export default Layout;
