import { createBrowserRouter } from 'react-router';
import App from './App';
import Clicker from './components/games/clicker/Clicker';
import Flags from './components/games/flags/Flags';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'games',
        children: [
          {
            path: 'clicker',
            Component: Clicker,
          },
          {
            path: 'flags',
            Component: Flags,
          },
        ],
      },
    ],
  },
]);

export default router;
