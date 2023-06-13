import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <Header />
      </header>
      <div className="min-h-screen">
        <main className="mx-auto min-h-screen bg-bgDark text-white z-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
