import { useEffect } from 'react';
import { useLocation } from 'react-router';
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    const auth = decryptData('auth');
    if (!auth) {
      return;
    }
    dispatch(initCredentials(auth));
  }, [dispatch]);

  if (token && user?.roles.includes('admin')) {
    return <AdminRoutes />;
  }
  if (token) {
    return <UserRoutes />;
  }
  return <PublicRoutes />;
};

export default Router;
