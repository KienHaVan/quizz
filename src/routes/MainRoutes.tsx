import { useLayoutEffect, useState } from 'react';
import { LoadingPage } from '../pages/LoadingPage';
import { useAppDispatch, useAppSelector } from '../store';
import {
  initCredentials,
  selectCurrentToken,
  selectCurrentUser,
} from '../store/slices/authSlice';
import { decryptData } from '../utils/cryptData';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { PlayPage } from '../pages/PlayPage';
import { ReviewPage } from '../pages/ReviewPage';

const MainRoutes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  useLayoutEffect(() => {
    const auth = decryptData('auth');
    if (!auth) {
      setIsLoading(true);
      return;
    }
    setIsLoading(true);
    dispatch(initCredentials(auth));
  }, [dispatch]);

  if (!isLoading) {
    return <LoadingPage />;
  }

  // let InitRoute = ;

  const router = createBrowserRouter([
    {
      path: '/',
      element: !token ? <Navigate to="/login" /> : <Navigate to="/user/play" />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'regiter', element: <RegisterPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
      ],
    },
    {
      path: '/user',
      element: token ? <Navigate to="/user/play" /> : <Navigate to="/login" />,
      children: [
        // { path: '/', element: <Navigate to="/user/play" /> },
        { path: '/play', element: <PlayPage /> },
        { path: '/review', element: <ReviewPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
