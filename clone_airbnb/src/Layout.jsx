import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="py-10 px-20 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
