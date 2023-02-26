import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import './index.css';
import { router } from './routes/main.route';

/* 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: editloader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Ops! Houve um erro. Volte e tente novamente</div>,
      },
      {
        path: "contacts/:contactId/favorite",
        action: favoriiteAction,
      }
    ],
  },

]);
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
