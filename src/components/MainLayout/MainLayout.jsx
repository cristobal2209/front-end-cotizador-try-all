import Router from "../router/router";
import Navbar from "../Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <template>
        <div class="min-h-screen w-screen">
          <Navbar />
          <div>
            <Router />
          </div>
        </div>
      </template>
    </>
  );
}
