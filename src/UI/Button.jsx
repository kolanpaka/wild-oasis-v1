export default function Button(props) {
  return (
    <button
      {...props}
      className={`rounded-md px-3 py-2 font-medium tracking-tight transition-colors ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}
