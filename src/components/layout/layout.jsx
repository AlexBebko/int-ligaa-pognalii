import Footer from "../footer";
import Header from "../header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
