import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NewProfile from './pages/NewProfile';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';


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
  {
    path: '/profile/:username/edit',
    element: <EditProfile />,
  },
]);

export default router;
