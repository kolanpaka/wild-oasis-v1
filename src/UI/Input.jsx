export default function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border-2 border-slate-200 px-2.5 py-2 font-medium text-slate-700 transition-colors outline-none focus:border-indigo-800 ${props.disabled ? "cursor-not-allowed bg-slate-200" : ""} ${props.className || ""}`}
    />
  );
}
