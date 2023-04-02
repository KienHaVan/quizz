import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { PlayPage } from '../pages/PlayPage';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PlayPage />,
      },
    ],
  },
]);

const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
