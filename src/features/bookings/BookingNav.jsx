import SwitchUI from "../../UI/SwitchUI";
import Selector from "../../UI/Selector";

export default function BookingNav() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="heading">All bookings</h1>
      <div className="flex gap-2">
        <SwitchUI
          switches={{
            all: "all",
            "checked out": "checked-out",
            "checked in": "checked-in",
            unconfirmed: "unconfirmed",
          }}
          StateValue="status"
          preservedState={[{ preserveKey: "page", preserveValue: 0 }]}
        />
        <Selector
          selectors={{
            "Sort by date (recent first)": "startDate-desc",
            "Sort by date (earlier first)": "startDate-asc",
            "Sort by amount (high first)": "totalPrice-desc",
            "Sort by amount (low first)": "totalPrice-asc",
          }}
          StateValue="sortBy"
        />
      </div>
    </div>
  );
}
