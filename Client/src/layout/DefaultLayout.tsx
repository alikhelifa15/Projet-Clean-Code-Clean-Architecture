import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      {/* <!-- ===== Header Start ===== --> */}

      <Header/>

      {/* <!-- ===== Header End ===== --> */}

      <main className="mt-20">{children}</main>

      {/* <!-- ===== Footer Start ===== --> */}

      <Footer />

      {/* <!-- ===== Footer End ===== --> */}
    </div>
  );
};
export default DefaultLayout;
