import { useNavigate } from "react-router-dom";
import BookingDetailsCard from "../features/bookings/BookingDetailsCard";
import Button from "../UI/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/settingsAPI.js";
import Spinner from "../UI/Spinner";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { checkInAPI } from "../services/bookingsAPI";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useBooking from "../features/bookings/useBooking";
import { useLocation } from "react-router-dom";

export default function Checkin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state: filters } = useLocation();
  const [isBreakFastNeeded, setIsBreakFastNeeded] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const { isPending, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { data: state, isPending: bookingPending } = useBooking();

  const mutation = useMutation({
    mutationFn: async function mutateBooking(bookingData) {
      await toast.promise(
        checkInAPI(bookingData),
        {
          loading: "Checking in the guest…",
          success: "Guest has been successfully checked in.",
          error: "Failed to check in the guest. Please try again.",
        },
        {
          loading: {
            duration: 1500,
          },
          success: {
            duration: 2000,
          },
        },
      );
      queryClient.invalidateQueries({ queryKey: ["booking", state.BookingId] });
      queryClient.invalidateQueries({
        queryKey: ["bookings", filters],
      });
    },
    onSuccess: function () {
      navigate(`/bookings/${booking.BookingId}`, {
        state: filters,
      });
    },
  });

  if (isPending || bookingPending) {
    return <Spinner />;
  }

  const { guest, ...booking } = state;
  const daysBooking = differenceInCalendarDays(
    new Date(booking.endDate),
    new Date(booking.startDate),
  );
  const breakFastPrice = data.breakfast_price * booking.noOfGuest * daysBooking;

  function handleCheckIn() {
    mutation.mutate({
      amount: booking.amount + (isBreakFastNeeded ? breakFastPrice : 0),
      BookingId: booking.BookingId,
      status: "checked in",
      paid: true,
      breakFast: isBreakFastNeeded,
    });
  }

  return (
    <div className="pb-8">
      <div className="space-y-4">
        <BookingDetailsCard state={state} filters={filters} />

        <div className="flex items-center gap-2 space-y-3 rounded-md bg-white p-7 shadow">
          <input
            type="checkbox"
            id="breakFastPrice"
            value={isBreakFastNeeded}
            className="m-0 h-[24px] w-[24px]"
            onChange={() =>
              setIsBreakFastNeeded((isBreakFastNeeded) => !isBreakFastNeeded)
            }
          />
          <label htmlFor="breakFastPrice" className="text-lg">
            Want to add breakfast for ${breakFastPrice}?
          </label>
        </div>
        <div className="flex items-center gap-2 space-y-3 rounded-md bg-white p-7 shadow">
          <input
            type="checkbox"
            className="m-0 h-[24px] w-[24px]"
            value={isPaid}
            id="confirmBox"
            onChange={() => setIsPaid((isPaid) => !isPaid)}
          />
          <label htmlFor="confirmBox" className="text-lg">
            I confirm that {guest.guestName} has paid the total amount of $
            {isBreakFastNeeded
              ? `${booking.amount + breakFastPrice}  ($${booking.amount}.00 + $${breakFastPrice}.00)`
              : booking.amount}
          </label>
        </div>

        <div className="mt-7 ml-auto flex justify-end gap-2">
          <Button
            className="bg-indigo-700 font-medium text-white hover:bg-indigo-800"
            disabled={!isPaid}
            onClick={handleCheckIn}
          >
            Check in booking
          </Button>
          <Button
            className="border-2 border-slate-100 bg-white font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
