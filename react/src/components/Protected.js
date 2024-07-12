import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function Protected() {
  let cookies = Cookies.get("user");
  console.log(cookies);

  const isCookieAvailable = cookies;

  return isCookieAvailable ? <Outlet /> : <Navigate to="/login" />;
}
