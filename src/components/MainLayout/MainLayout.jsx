import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <Header />
      </header>
      <div className="min-h-screen">
        <main className="z-10 mx-auto min-h-screen bg-bgDark pt-20 text-white w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}
