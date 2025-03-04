import React from 'react';
import {Outlet} from 'react-router-dom';
import './cartoonLayout.scss';

const CartoonLayout = () => {
  return (
    <React.Fragment>
      <div className="cartoon-layout">
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default CartoonLayout;
