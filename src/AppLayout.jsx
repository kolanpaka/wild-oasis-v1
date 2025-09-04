import { Outlet } from "react-router-dom";
import SideBar from "./UI/SideBar";
import Nav from "./UI/Nav";
import { Authenticate } from "./context/Authenticate";

export default function AppLayout({ setSessionExpired }) {
  return (
    <Authenticate setSessionExpired={setSessionExpired}>
      <div className="flex-center grid h-screen grid-cols-[260px_1fr] grid-rows-[auto_1fr] items-start">
        <div className="row-span-3 self-stretch border-r-1 border-slate-100 py-8">
          <SideBar />
        </div>
        <div>
          <Nav setSessionExpired={setSessionExpired} />
        </div>
        <div className="row-span-2 self-stretch overflow-y-scroll bg-[#F9FAFB] py-[43px]">
          <div className="m-auto h-full max-w-[1145px]">
            <Outlet />
          </div>
        </div>
      </div>
    </Authenticate>
  );
}
