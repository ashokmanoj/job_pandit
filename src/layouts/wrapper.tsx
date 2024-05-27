"use client";
import React, { useEffect } from "react";
import { animationCreate } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import useFilterStore from "@/lib/store/filter";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const {resetFilter} = useFilterStore((state) => state);

  //  handle reset first time render this page
  const handleReset = () => {
    resetFilter();
  };
  useEffect(() => {
    animationCreate();
  }, []);
  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <>
      {children} 
      <ToastContainer />
    </>
  );
};

export default Wrapper;
