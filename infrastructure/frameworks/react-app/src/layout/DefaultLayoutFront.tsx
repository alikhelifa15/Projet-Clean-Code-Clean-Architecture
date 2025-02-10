import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';


const DefaultLayoutFront: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      {/* <!-- ===== Header Start ===== --> */}

      <Header/>

      {/* <!-- ===== Header End ===== --> */}
      <ToastContainer />

      <main className="mt-20">{children}</main>

      {/* <!-- ===== Footer Start ===== --> */}

      <Footer />

      {/* <!-- ===== Footer End ===== --> */}
    </div>
  );
};
export default DefaultLayoutFront;
