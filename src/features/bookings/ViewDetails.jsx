import Button from "../../UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import BookingDetailsCard from "./BookingDetailsCard";
import Spinner from "../../UI/Spinner";
import useBooking from "./useBooking";
import Modal from "../../UI/Modal";
import DeleteBooking from "./DeleteBooking";
import CheckoutModal from "./GuestInfoCard";

export default function ViewDetails() {
  const navigate = useNavigate();
  const { state: filters } = useLocation();
  const { isPending, data } = useBooking();

  if (isPending) {
    return (
      <div className="flex-center h-full">
        <Spinner />
      </div>
    );
  }

  const { guest, cabins, ...booking } = data;

  return (
    <BookingDetailsCard state={data} filters={filters}>
      <div className="mt-7 ml-auto flex justify-end gap-2">
        {data.status !== "checked out" && (
          <>
            {data.status === "unconfirmed" && (
              <Button
                className="bg-indigo-700 font-medium text-white hover:bg-indigo-800"
                onClick={() =>
                  navigate(`/checkin/${data.BookingId}`, {
                    state: filters,
                  })
                }
              >
                Check in
              </Button>
            )}
            {data.status === "checked in" && (
              <Modal>
                <Modal.Button>
                  <Button className="bg-indigo-700 font-medium text-white hover:bg-indigo-800">
                    Check Out
                  </Button>
                </Modal.Button>
                <Modal.Window>
                  <CheckoutModal
                    bookingDetails={{ guest, cabins, booking }}
                    filters={filters}
                  />
                </Modal.Window>
              </Modal>
            )}
          </>
        )}

        <Modal>
          <Modal.Button>
            <div className="flex items-center gap-3">
              <Button className="bg-red-700 font-medium text-white hover:bg-red-800">
                Delete Booking
              </Button>
            </div>
          </Modal.Button>
          <Modal.Window>
            <DeleteBooking BookingId={data.BookingId} filters={filters} />
          </Modal.Window>
        </Modal>

        <Button
          className="border-2 border-slate-100 bg-white font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => {
            if (filters.page === -1) {
              navigate("/dashboard");
            } else {
              navigate(
                `/bookings?page=${filters.page}&status=${filters.bookingStatus}&sortBy=${filters.sortBy}`,
              );
            }
          }}
        >
          Back
        </Button>
      </div>
    </BookingDetailsCard>
  );
}
