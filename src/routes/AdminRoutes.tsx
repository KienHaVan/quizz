import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AdminPage } from '../pages/AdminPage';
import { ErrorPage } from '../pages/ErrorPage';
import { ManagementPage } from '../pages/ManagamentPage';
import { PlayPage } from '../pages/PlayPage';
import { ReviewPage } from '../pages/ReviewPage';
import { ProfilePage } from '../pages/ProfilePage';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/admin" />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/play',
        element: <PlayPage />,
      },
      {
        path: '/review',
        element: <ReviewPage />,
      },
      {
        path: '/management',
        element: <ManagementPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

const AdminRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AdminRoutes;
