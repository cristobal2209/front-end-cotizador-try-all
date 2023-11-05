import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 h-[80px] z-50 w-full">
        <Header />
      </header>
      <div className="min-h-screen">
        <main className="z-10 mx-auto min-h-screen w-full bg-three pt-10 text-light">
          <Outlet />
        </main>
      </div>
    </>
  );
}
