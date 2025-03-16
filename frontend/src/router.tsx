import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NewProfile from './pages/NewProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new-profile',
    element: <NewProfile />,
  },
]);

export default router;
