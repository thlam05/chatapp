import { Outlet, useNavigation } from "react-router";
import Sidebar from "../components/bars/Sidebar";
import Topbar from "../components/bars/Topbar";

export default function MainLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="flex h-screen bg-[#f6f7fb]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}