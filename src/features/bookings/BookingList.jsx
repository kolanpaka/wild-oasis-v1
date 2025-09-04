import {
  HiArrowUpOnSquare,
  HiMiniEye,
  HiArrowDownOnSquare,
} from "react-icons/hi2";
import Modal from "../../UI/Modal";
import DeleteBooking from "./DeleteBooking";
import CheckoutModal from "./GuestInfoCard";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function BookingList({
  status,
  bookingId,
  bookingDetails,
  closeMenu,
  filters,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-[185px] rounded-md border-2 border-slate-50 bg-white p-0.5 shadow shadow-slate-200 *:cursor-pointer *:rounded-md *:px-4 *:py-1.5">
      <div
        className="flex items-center gap-3 hover:bg-[#F9FAFB]"
        onClick={() => navigate(bookingId, { state: filters })}
      >
        <HiMiniEye className="text-lg text-slate-500" />
        <p className="text-sm"> View Details</p>
      </div>

      {status !== "checked out" && (
        <div className="hover:bg-[#F9FAFB]">
          {status === "unconfirmed" && (
            <div
              className="flex items-center gap-3"
              onClick={() =>
                navigate(`/checkin/${bookingId}`, {
                  state: filters,
                })
              }
            >
              <HiArrowDownOnSquare className="text-lg text-slate-500" />
              <p className="text-sm">Check in</p>
            </div>
          )}

          {status === "checked in" && (
            <Modal>
              <Modal.Button>
                <div className="flex items-center gap-3">
                  <HiArrowUpOnSquare className="text-lg text-slate-500" />
                  <p className="text-sm">Check out</p>
                </div>
              </Modal.Button>
              <Modal.Window>
                <CheckoutModal
                  bookingDetails={bookingDetails}
                  closeMenu={closeMenu}
                  filters={filters}
                />
              </Modal.Window>
            </Modal>
          )}
        </div>
      )}

      <div className="hover:bg-[#F9FAFB]">
        <Modal>
          <Modal.Button>
            <div className="flex items-center gap-3">
              <HiTrash className="text-lg text-slate-500" />
              <p className="text-sm">Delete booking</p>
            </div>
          </Modal.Button>
          <Modal.Window>
            <DeleteBooking
              BookingId={bookingId}
              closeMenu={closeMenu}
              filters={filters}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
