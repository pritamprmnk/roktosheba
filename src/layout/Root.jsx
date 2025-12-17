import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useNavigation } from "react-router-dom";

const Root = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen relative">

      {isLoading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
