import BookingNav from "../features/bookings/BookingNav";
import BookingTable from "../features/bookings/BookingTable";

export default function Cabins() {
  return (
    <div className="space-y-8">
      <BookingNav />
      <div className="pb-12">
        <BookingTable />
      </div>
    </div>
  );
}
