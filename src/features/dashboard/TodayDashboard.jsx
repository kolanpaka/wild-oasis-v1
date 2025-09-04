import TodayEntry from "./TodayEntry";

export default function TodayDashboard({ entries }) {
  return (
    <div className="h-[372px] w-full items-center gap-2 overflow-auto rounded-md bg-white p-4 shadow">
      <h3 className="mb-5 text-xl font-semibold text-slate-700">Today</h3>
      <div className="space-y-3">
        {entries.map((eachEntry) => (
          <TodayEntry eachEntry={eachEntry} key={eachEntry.booking.BookingId} />
        ))}
      </div>
    </div>
  );
}
