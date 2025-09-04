import { useSearchParams } from "react-router-dom";

export default function SwitchUI({
  switches,
  StateValue,
  preservedState = [],
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const statVariable = searchParams.get(StateValue);

  return (
    <div className="flex gap-2 rounded-md bg-white p-1 shadow *:px-2 *:py-1">
      {Object.keys(switches).map((eachDisplayKey) => (
        <div
          key={switches[eachDisplayKey]}
          className={`cursor-pointer rounded-md text-slate-700 capitalize transition-all hover:bg-indigo-700 hover:text-white ${statVariable === switches[eachDisplayKey] && "bg-indigo-700 text-white"}`}
          onClick={() =>
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set([StateValue], switches[eachDisplayKey]);
              preservedState.forEach((eachPreserve) =>
                params.set(
                  eachPreserve.preserveKey,
                  eachPreserve.preserveValue,
                ),
              );
              return params;
            })
          }
        >
          {eachDisplayKey}
        </div>
      ))}
    </div>
  );
}
