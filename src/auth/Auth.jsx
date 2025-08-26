import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = ({ children }) => {
  const location = useLocation();

  console.log("CURRENT PAGE", location);
  const { user } = useSelector((store) => store.userStore);

  return (
    <>
      {user && user?._id ? (
        children
      ) : (
        // navigate to login
        <Navigate to="/login" replace state={{ from: location }} />
      )}
    </>
  );
};

export default Auth;
