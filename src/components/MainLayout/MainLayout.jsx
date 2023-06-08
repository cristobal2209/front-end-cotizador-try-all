import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="bg-bgDark mx-auto min-h-screen text-white px-10">
        <Outlet />
      </main>
    </>
  );
}

//bg-slate-700 font-mono flex items-center justify-center min-h-screen text-slate-50 p-5
