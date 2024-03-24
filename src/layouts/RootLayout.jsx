import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet></Outlet>
        </Suspense>
      </main>
    </>
  );
}
