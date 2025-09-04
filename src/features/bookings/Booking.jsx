import Table from "../../UI/Table";
import VerticalDots from "../cabins/VerticalDots";
import Menu from "../../UI/Menu";
import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
} from "date-fns";
import { HiArrowRight } from "react-icons/hi";
import BookingList from "./BookingList";
import StatusBadge from "../../UI/StatusBadge";

export default function Booking({
  filters,
  tableRow: { cabins, guest, ...booking },
}) {
  return (
    <Table.Row>
      <Table.Value className="font-sono text-[16px] font-medium text-slate-700">
        {String(cabins.cabin).padStart(3, "0")}
      </Table.Value>
      <Table.Value>
        <div>
          <p className="text-[14px] font-medium text-slate-700">
            {guest.guestName}
          </p>
          <p className="text-[12px] text-slate-500">{guest.guestEmail}</p>
        </div>
      </Table.Value>
      <Table.Value className="font-light tracking-wide">
        <div className="mb-1.5 flex items-center gap-2.5 text-[14px]">
          <p className="font-medium text-slate-700 capitalize">
            {formatDistanceToNow(new Date(booking.startDate), {
              addSuffix: true,
            })}
          </p>
          <HiArrowRight />
          <p className="font-medium text-slate-700">
            {differenceInCalendarDays(
              new Date(booking.endDate),
              new Date(booking.startDate),
            )}{" "}
            night stay
          </p>
        </div>
        <p className="text-[12px] text-slate-500">
          {`${format(new Date(booking.startDate), "MMM dd yyyy")} - ${format(new Date(booking.endDate), "MMM dd yyyy")}`}
        </p>
      </Table.Value>
      <Table.Value className="text-[12px]">
        <StatusBadge status={booking.status} />
      </Table.Value>
      <Table.Value className="font-sono text-[14px] font-medium text-slate-700">
        {`$${booking.amount}.00`}
      </Table.Value>
      <Table.Value>
        <Menu>
          <Menu.Item>
            <VerticalDots />
          </Menu.Item>
          <Menu.List>
            <BookingList
              status={booking.status}
              bookingId={booking.BookingId}
              filters={filters}
              bookingDetails={{ guest, cabins, booking }}
            />
          </Menu.List>
        </Menu>
      </Table.Value>
    </Table.Row>
  );
}
