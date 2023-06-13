import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 w-full">
        <Header />
      </header>
      <div className="h-screen">
        <main className="mx-auto h-full bg-bgDark p-5 pt-20 text-white">
          <Outlet />
        </main>
      </div>
    </>
  );
}
