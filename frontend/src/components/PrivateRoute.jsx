import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
const customId = "custom-id-yes";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  const notify = (msg) => {
    toast(msg, {
      toastId: customId,
    });
  };
  if (checkingStatus) {
    return <Spinner />;
  }

  if (loggedIn) {
    return <Outlet />;
  } else {
    notify("please login before create ticket");
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
