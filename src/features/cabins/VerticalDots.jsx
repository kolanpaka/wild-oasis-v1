import { HiOutlineDotsVertical } from "react-icons/hi";

export default function VerticalDots({ onClick, isOpen }) {
  return (
    <div
      className={`w-fit cursor-pointer rounded-md border-2 p-1.5 transition-all duration-200 hover:bg-slate-100 ${isOpen ? "border-indigo-700" : "border-white"} `}
      onClick={onClick}
    >
      <HiOutlineDotsVertical className="text-2xl" />
    </div>
  );
}
