import { HiXMark } from "react-icons/hi2";
import Button from "../../UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/bookingsAPI";
import { useNavigate } from "react-router-dom";

export default function DeleteBooking({
  closeModal,
  BookingId,
  closeMenu,
  filters,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings", filters]);
      toast.success("Booking has been removed permanently.");
      navigate(
        `/bookings?page=${filters.page}&status=${filters.bookingStatus}&sortBy=${filters.sortBy}`,
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      closeModal?.();
      closeMenu?.();
    },
  });

  return (
    <div className="relative w-[480px] space-y-3 rounded-md bg-white p-9 shadow">
      <div
        className="absolute top-3 right-4 w-fit cursor-pointer rounded-md border-2 border-white p-1 text-2xl font-bold text-slate-700 hover:bg-slate-100 active:border-indigo-700"
        onClick={closeModal}
      >
        <HiXMark className="stroke-1" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-700">Delete booking</h3>

      {/* Message */}
      <p>
        Are you sure you want to delete this booking permanently? This action
        cannot be undone.
      </p>

      {/* Action buttons */}
      <div className="mt-4 flex justify-end gap-4">
        <Button
          className="border-2 border-slate-200 text-slate-700"
          onClick={closeModal}
          disabled={mutation.isPending}
        >
          Cancel
        </Button>
        <Button
          className="bg-red-700 font-bold text-white enabled:hover:bg-red-800"
          onClick={() => mutation.mutate(BookingId)}
          disabled={mutation.isPending}
        >
          Delete booking
        </Button>
      </div>
    </div>
  );
}
