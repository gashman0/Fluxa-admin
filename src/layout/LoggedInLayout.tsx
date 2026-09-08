import React from "react";
import { Outlet } from "react-router-dom";
import { useMe } from "../network/me/queries";
import { Navigate } from "react-router-dom";
import Preloader from "../components/ui/Preloader";

const LoggedInLayout = () => {
  const { data: admin, isPending } = useMe();

  if (isPending) {
    return <Preloader />;
  }

  if (!admin) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <p>Header</p>
      <main>
        <Outlet />
      </main>
      <p>Footer</p>
    </div>
  );
};

export default LoggedInLayout;
