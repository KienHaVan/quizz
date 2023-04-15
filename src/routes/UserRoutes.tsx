import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { PlayPage } from '../pages/PlayPage';
import { ReviewPage } from '../pages/ReviewPage';
import { ProfilePage } from '../pages/ProfilePage';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/play" />,
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
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
