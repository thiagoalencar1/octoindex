import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NewProfile from './pages/NewProfile';
import Profile from './pages/Profile';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new-profile',
    element: <NewProfile />,
  },
  {
    path: '/profile/:username',
    element: <Profile />,
  },
]);

export default router;
