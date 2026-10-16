import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Snackbar from "../ui/Snackbar";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Snackbar />
    </>
  );
};

export default Layout;
