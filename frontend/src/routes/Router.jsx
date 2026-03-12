import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import FriendPage from "../pages/FriendPage";
import SettingPage from "../pages/SettingPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/chat",
        element: <ChatPage />
      },
      {
        path: "/friends",
        element: <FriendPage />
      },
      {
        path: "/settings",
        element: <SettingPage />
      }
    ]
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/auth/register",
    element: <RegisterPage />
  }
]);

export default router;