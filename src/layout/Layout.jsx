import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../style/layout.css";
const Layout = () => {
  return (
    <>
      <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
