import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { PlayPage } from '../pages/PlayPage';
import { ReviewPage } from '../pages/ReviewPage';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PlayPage />,
      },
      {
        path: '/review',
        element: <ReviewPage />,
      },
    ],
  },
]);

const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
