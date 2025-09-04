import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
} from "date-fns";
import { Navigate, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import StatusBadge from "../../UI/StatusBadge";

export default function BookingDetailsCard({ children, state, filters }) {
  const { cabins, guest, ...booking } = state;
  const navigate = useNavigate();

  if (state === null) {
    return <Navigate to="/bookings" />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 p-2">
        <h1 className="shrink-0 text-3xl font-semibold text-slate-700">
          Booking
        </h1>
        <small className="font-sono rounded-full bg-red-100 p-2 text-sm font-medium text-red-700 shadow shadow-red-300">
          #{booking.BookingId}
        </small>
        <StatusBadge status={booking.status} className="w-fit text-sm" />
        <div
          className="ml-auto flex cursor-pointer items-center gap-1 text-indigo-700"
          onClick={() =>
            navigate(
              `/bookings?page=${filters.page}&status=${filters.bookingStatus}&sortBy=${filters.sortBy}`,
            )
          }
        >
          <HiArrowNarrowLeft />
          <span>Back</span>
        </div>
      </div>
      <div className="rounded-t-md rounded-b-md shadow">
        <div className="flex justify-between rounded-t-md bg-indigo-600 p-6 *:text-lg *:font-semibold *:text-slate-200">
          <div className="flex items-center gap-3">
            <HiOutlineBuildingOffice2 className="h-[26px] w-[26px]" />
            <p>
              <span>
                {" "}
                {differenceInCalendarDays(
                  new Date(booking.endDate),
                  new Date(booking.startDate),
                )}{" "}
              </span>
              nights in Cabin{" "}
              <span className="font-sono text-xl">{cabins.cabin}</span>
            </p>
          </div>
          <p>
            {" "}
            {`${format(new Date(booking.startDate), "E, MMM dd yyyy")} (${formatDistanceToNow(
              new Date(booking.startDate),
              {
                addSuffix: true,
              },
            )}) - ${format(new Date(booking.endDate), "E, MMM dd yyyy")}`}
          </p>
        </div>
        <div className="space-y-3 rounded-b-md bg-white p-8">
          <div className="flex items-center gap-2">
            <img
              src={`https://flagsapi.com/${guest.countryCode}/flat/24.png`}
            />
            <h3 className="font-medium text-slate-800">
              {guest.guestName}{" "}
              {Number(booking.noOfGuest) > 2
                ? `+ ${booking.noOfGuest - 1} guests`
                : ""}{" "}
            </h3>
            <p className="text-slate-500">• {guest.guestEmail}</p>
            <p className="text-slate-500">• National ID {guest.country}</p>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineChatBubbleBottomCenterText className="h-[24px] w-[24px] text-indigo-700" />
            <h3 className="font-medium text-slate-800">Observations</h3>
            <p className="text-slate-500">{booking.observation}</p>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineCheckCircle className="h-[24px] w-[24px] text-indigo-700" />
            <h3 className="font-medium text-slate-800">Breakfast included? </h3>
            <p className="text-slate-500">{booking.breakFast ? "Yes" : "No"}</p>
          </div>

          <div
            className={`mt-8 rounded-md ${booking.paid ? "bg-green-100" : "bg-yellow-100"} p-6`}
          >
            <div
              className={`flex items-center gap-2 ${booking.paid ? "*:text-green-800" : "*:text-yellow-800"}`}
            >
              <HiOutlineCurrencyDollar className="h-[24px] w-[24px]" />
              <h3 className="font-medium">Total price</h3>
              <p>${booking.amount}</p>
              <p className="ml-auto">
                {booking.paid ? "Paid" : "Will pay at property"}
              </p>
            </div>
          </div>
          <p className="mt-5 text-right text-sm text-slate-500">
            Booked{" "}
            {format(new Date(booking.bookedAt), "E, MMM dd yyyy, hh:mm a")}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
