import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import FriendPage from "../pages/FriendPage";
import SettingPage from "../pages/SettingPage";

const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/auth/login",
        element: <LoginPage />
      },
      {
        path: "/chat",
        element: <ChatPage />
      },
      {
        path: "/friend",
        element: <FriendPage />
      },
      {
        path: "/setting",
        element: <SettingPage />
      }
    ]
  },
]);

export default router;