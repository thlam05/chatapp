import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import FriendPage from "../pages/FriendPage";
import SettingPage from "../pages/SettingPage";
import RegisterPage from "../pages/RegisterPage";
import { path } from "framer-motion/client";
import ChatWindow from "../components/chat/ChatWindow";
import ChatGroupWindow from "../components/chat/ChatGroupWindow";

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
        element: <ChatPage />,
        children: [
          {
            index: true,
            element: <div className="flex-1 flex items-center justify-center">Chọn một cuộc trò chuyện</div>
          },
          {
            path: "group/:id",
            element: <ChatGroupWindow />
          },
          {
            path: ":id",
            element: <ChatWindow />
          }
        ]
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