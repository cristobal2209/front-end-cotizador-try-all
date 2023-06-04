import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </main>
  );
}
