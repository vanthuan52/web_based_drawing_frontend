import React, {useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import {router} from '@/router';
import {useAppDispatch} from '@/redux/store';
import {getToken} from '@/utils/tokenHelper';
import {authActions} from '@/redux/slice/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(authActions.loginSuccess());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </React.Fragment>
  );
}

export default App;
