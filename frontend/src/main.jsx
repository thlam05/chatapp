import { createRoot } from 'react-dom/client';
import './index.css';

import router from './routes/Router';
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <NotificationProvider>
      <RouterProvider router={router} />,
    </NotificationProvider>
  </AuthProvider>
);
