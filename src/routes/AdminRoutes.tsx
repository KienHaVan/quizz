import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminPage } from '../pages/AdminPage';
import { ErrorPage } from '../pages/ErrorPage';
import { ManagementPage } from '../pages/ManagamentPage';
import { PlayPage } from '../pages/PlayPage';
import { ReviewPage } from '../pages/ReviewPage';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
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
    ],
  },
]);

const AdminRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AdminRoutes;
