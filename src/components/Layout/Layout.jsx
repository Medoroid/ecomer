import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
  let [varble, setVarble] = useState(0);

  useEffect(() => {
    // Code here
    return () => {
      // Cleanup code here
    };
  }, []);

  return <>
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  
}
