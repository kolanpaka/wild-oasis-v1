export default function StatusBadge({ status,className }) {
  return (
    <p
      className={`w-[84%] rounded-full bg-amber-100 px-4 py-2 text-center font-semibold tracking-wide uppercase shadow ${status === "checked in" && "bg-green-100 text-green-700 shadow-green-300"} ${status === "unconfirmed" && "bg-blue-100 text-blue-700 shadow-indigo-300"} ${status === "checked out" && "bg-slate-100 text-slate-700 shadow-slate-300"} ${className}`}
    >
      {status}
    </p>
  );
}
