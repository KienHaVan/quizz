import { useLayoutEffect, useState } from 'react';
import { LoadingPage } from '../pages/LoadingPage';
import { useAppDispatch, useAppSelector } from '../store';
import {
  initCredentials,
  selectCurrentToken,
  selectCurrentUser,
} from '../store/slices/authSlice';
import { decryptData } from '../utils/cryptData';
import AdminRoutes from './AdminRoutes';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';

const Router = () => {
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

  if (token && user?.roles.includes('admin')) {
    return <AdminRoutes />;
  }
  if (token) {
    return <UserRoutes />;
  }
  return <PublicRoutes />;
};

export default Router;
