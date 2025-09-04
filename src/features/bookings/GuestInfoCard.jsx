import { HiXMark } from "react-icons/hi2";
import { format, differenceInCalendarDays } from "date-fns";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { PiListHeartLight } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutAPI } from "../../services/bookingsAPI";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export default function CheckoutModal({ closeModal, bookingDetails, closeMenu, filters }) {
  // const navigate = useNavigate();

  const { guest, cabins, booking } = bookingDetails;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async function (mutateObj) {
      await toast.promise(checkOutAPI(mutateObj), {
        success: `Checked out booking ${booking.BookingId} for ${guest.guestName} successfully.`,
        loading: `Checkout in progress for booking ${booking.BookingId} of ${guest.guestName}…`,
        error: `Failed to check out booking ${booking.BookingId} for ${guest.guestName}. Please try again.`,
      });
      queryClient.invalidateQueries({
        queryKey: ["bookings", filters],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking", booking.BookingId],
      });
    },
    onSettled: () => {
      closeModal?.();
      closeMenu?.();
      // navigate(`/bookings?page=${page}`);
    },
  });

  return (
    <div className="relative w-[700px] space-y-3 rounded-xl bg-white p-8 shadow-xl">
      {/* Close button */}
      <div
        className="absolute top-3 right-4 cursor-pointer rounded-md border-2 border-white p-1 text-2xl font-bold text-slate-700 hover:bg-slate-100 active:border-indigo-700"
        onClick={closeModal}
      >
        <HiXMark className="stroke-1" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-700">Confirm Checkout</h3>

      {/* Guest Info */}
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <HiOutlineUser className="h-[24px] w-[24px]" />
          <h4>Guest Details</h4>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between px-3">
            <div>
              <small className="font-semibold">guestID</small>
              <p className="mt-1.5 text-sm text-gray-500">#{guest.guestId}</p>
            </div>
            <div className="text-right">
              <small className="font-semibold">Name</small>
              <p className="text-md mt-1.5 text-gray-500">{guest.guestName}</p>
            </div>
          </div>

          <div className="flex justify-between px-3">
            <div>
              <small className="font-semibold">Email</small>
              <p className="text-md mt-1.5 text-gray-500">{guest.guestEmail}</p>
            </div>
            <div className="text-right">
              <small className="font-semibold">Country</small>
              <p className="text-md mt-1.5 text-gray-500">
                {guest.country}({guest.countryCode})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <PiListHeartLight className="h-[24px] w-[24px]" />
          <h4>Booking Summary</h4>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between px-3">
            <div>
              <small className="font-semibold">BookingID</small>
              <p className="mt-1.5 text-sm text-gray-500">
                #{booking.BookingId}
              </p>
            </div>
            <div className="text-right">
              <small className="font-semibold">Cabin</small>
              <p className="text-md font-sono mt-1.5 text-gray-500">
                {cabins.cabin}
              </p>
            </div>
          </div>

          <div className="flex justify-between px-3">
            <div>
              <small className="font-semibold">Date</small>
              <p className="mt-1.5 text-sm text-gray-500">
                {`${format(new Date(booking.startDate), "MMM dd yyyy")} - ${format(new Date(booking.endDate), "MMM dd yyyy")}`}{" "}
                (
                {differenceInCalendarDays(
                  new Date(booking.endDate),
                  new Date(booking.startDate),
                )}{" "}
                Nights)
              </p>
            </div>
            <div className="text-right">
              <small className="font-semibold">No of guests</small>
              <p className="text-md font-sono mt-1.5 text-gray-500">
                {booking.noOfGuest}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className={`mt-8 rounded-md bg-green-100 p-6`}>
        <div className={`flex items-center gap-2 *:text-green-800`}>
          <HiOutlineCurrencyDollar className="h-[24px] w-[24px]" />
          <h3 className="font-medium">Total price</h3>
          <p>${3400}</p>
          <p className="ml-auto">Paid</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-slate-700 enabled:bg-slate-100"
          onClick={closeModal}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
        <button
          className="cursor-pointer rounded-lg bg-green-700 px-4 py-2 font-medium text-white enabled:hover:bg-green-800"
          disabled={mutation.isPending}
          onClick={() =>
            mutation.mutate({
              BookingId: booking.BookingId,
              updateValues: { status: "checked out" },
            })
          }
        >
          Confirm Checkout
        </button>
      </div>
    </div>
  );
}
