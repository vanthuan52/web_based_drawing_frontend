import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div className="" style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
