import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import { AuthContext } from "../helpers/AuthContext";

const MainLayout = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="flex flex-col sm:flex-row h-screen overflow-hidden">
      {/* Sidebar with independent scroll */}
      {authState.logged && (
        <div className="sm:w-[200px] lg:w-[300px] sm:h-full overflow-y-auto bg-gray-200">
          <Menu />
        </div>
      )}

      {/* Main content scroll area */}
      <div className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
