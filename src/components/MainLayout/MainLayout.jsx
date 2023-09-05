import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full max-h-[100px]">
        <Header />
      </header>
      <div className="min-h-screen">
        <main className="z-10 mx-auto min-h-screen w-full bg-bgDark pt-10 text-white">
          <Outlet />
        </main>
      </div>
    </>
  );
}
