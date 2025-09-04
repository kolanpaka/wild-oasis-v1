import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineMoon, HiOutlineUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useAuthenticatedUser } from "../context/Authenticate";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/authenticateAPI";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

export default function Nav({ setSessionExpired }) {
  const { adminname, profile } = useAuthenticatedUser();

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setSessionExpired("logout");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <nav className="flex items-center justify-end gap-3 border-b-2 border-slate-100 px-8 py-3.5">
      <NavLink
        to="/account"
        className={({ isActive }) =>
          isActive ? "rounded-full ring-[3px] ring-indigo-300" : ""
        }
      >
        <img
          src={profile}
          alt=""
          className="aspect-square h-[38px] w-[38px] rounded-full object-cover"
        />
      </NavLink>
      <span className="text-slate-700">{adminname}</span>
      <div className="rounded-2xl p-2 shadow shadow-slate-300 hover:bg-black hover:text-white hover:shadow-black">
        <HiOutlineMoon className="h-[26px] w-[26px] cursor-pointer text-inherit" />
      </div>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? `active rounded-2xl` : "rounded-2xl text-slate-700"
        }
      >
        <div
          className="rounded-2xl p-2 shadow shadow-slate-300"
          onClick={() => mutation.mutate()}
        >
          {mutation.isPending ? (
            <BiLoaderAlt className="animate-rotate m-auto h-[26px] w-[26px]" />
          ) : (
            <HiOutlineLogout className="h-[26px] w-[26px] cursor-pointer text-inherit" />
          )}
        </div>
      </NavLink>
    </nav>
  );
}
