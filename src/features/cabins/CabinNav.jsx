import Selector from "../../UI/Selector";
import SwitchUI from "../../UI/SwitchUI";

export default function CabinNav() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="heading">All cabins</h1>
      <div className="flex gap-2">
        <SwitchUI
          switches={{
            All: "all",
            "No discount": "no-discount",
            "With discount": "with-discount",
          }}
          StateValue="discount"
        />
        <Selector
          selectors={{
            "Sort by name (A–Z)": "name-asc",
            "Sort by name (Z–A)": "name-desc",
            "Sort by price (low first)": "regularPrice-asc",
            "Sort by price (high first)": "regularPrice-desc",
            "Sort by capacity (low first)": "maxCapacity-asc",
            "Sort by capacity (high first)": "maxCapacity-desc",
          }}
          StateValue="sortBy"
        />
      </div>
    </div>
  );
}
// ["all", "no-discount", "with-discount"]
