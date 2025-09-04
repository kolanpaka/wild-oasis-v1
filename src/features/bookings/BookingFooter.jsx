import Table from "../../UI/Table";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function BookingFooter({
  totalBookings,
  nextPage,
  start,
  end,
  prevPage,
}) {
  return (
    <Table.Row>
      <Table.Value className="col-span-6">
        <p className="text-[14px]">
          Showing <span className="font-bold">{start}</span> to{" "}
          <span className="font-bold">{end}</span> of{" "}
          <span className="font-bold">{totalBookings}</span> results
        </p>
      </Table.Value>
      <Table.Value className="col-span-6 place-self-end">
        <div className="flex gap-3">
          <button
            className="flex items-center rounded-md px-1.5 py-1 text-[14px] text-slate-700 transition-all hover:bg-indigo-700 hover:text-white enabled:cursor-pointer disabled:cursor-not-allowed"
            onClick={prevPage}
            disabled={start === 1}
          >
            <HiChevronLeft className="h-[21px] w-[21px]" />
            <p>Previous</p>
          </button>

          <button
            className="flex items-center rounded-md px-1.5 py-1 text-[14px] text-slate-700 transition-all hover:bg-indigo-700 hover:text-white enabled:cursor-pointer disabled:cursor-not-allowed"
            onClick={nextPage}
            disabled={end === totalBookings}
          >
            <p>Next</p>
            <HiChevronRight className="h-[21px] w-[21px]" />
          </button>
        </div>
      </Table.Value>
    </Table.Row>
  );
}
