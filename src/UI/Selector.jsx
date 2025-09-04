import { useSearchParams } from "react-router-dom";

export default function Selector({ selectors, StateValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const statVariable = searchParams.get(StateValue);

  return (
    <select
      name=""
      id=""
      className="rounded-md bg-white p-1 shadow focus:outline-2 focus:outline-indigo-800"
      value={statVariable}
      onChange={(e) =>
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev);
          params.set([StateValue], e.target.value);

          return params;
        })
      }
    >
      {Object.keys(selectors).map((eachOpt) => (
        <option value={selectors[eachOpt]} key={selectors[eachOpt]}>
          {eachOpt}
        </option>
      ))}
    </select>
  );
}
