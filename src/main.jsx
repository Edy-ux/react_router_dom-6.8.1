import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { router } from './routes/main.route';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);





