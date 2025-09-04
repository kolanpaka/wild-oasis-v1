import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export default function SideBar() {
  return (
    <aside className="m-auto max-w-[211px] space-y-12">
      <div>
        <Logo className="m-auto w-[70%]" />
      </div>

      <div className="space-y-1.5 text-lg font-medium text-slate-700 transition-all duration-500 *:flex *:items-center *:gap-2 *:rounded-md *:p-3">
        <NavLink
          to="/dashboard?duration=7"
          className="hover:bg-indigo-50 hover:text-slate-700 hover:shadow hover:shadow-indigo-300"
        >
          <HiOutlineHome className="h-[26px] w-[26px]" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/bookings?status=all&page=0&sortBy=startDate-desc"
          className="hover:bg-indigo-50 hover:text-slate-700 hover:shadow hover:shadow-indigo-300"
        >
          <HiOutlineCalendarDays className="h-[26px] w-[26px]" />
          <span>Bookings</span>
        </NavLink>

        <NavLink
          to="/cabins?discount=all&sortBy=name-asc"
          className="hover:bg-indigo-50 hover:text-slate-700 hover:shadow hover:shadow-indigo-300"
        >
          <HiOutlineBuildingOffice2 className="h-[26px] w-[26px]" />
          <span>Cabins</span>
        </NavLink>

        <NavLink
          to="/users"
          className="hover:bg-indigo-50 hover:text-slate-700 hover:shadow hover:shadow-indigo-300"
        >
          <HiOutlineUsers className="h-[26px] w-[26px]" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="hover:bg-indigo-50 hover:text-slate-700 hover:shadow hover:shadow-indigo-300"
        >
          <HiOutlineCog6Tooth className="h-[26px] w-[26px]" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
