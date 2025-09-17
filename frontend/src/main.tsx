import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

function Root() {
  return (
    <div>
      <h1>Hello world</h1>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: 'flags',
    element: <h1>flags</h1>,
  },
]);

const root = document.getElementById('root');

createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
