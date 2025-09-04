import { differenceInCalendarDays } from "date-fns";
import Grid, { Col } from "../../UI/Grid";
import { useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";
import CheckoutModal from "../bookings/GuestInfoCard";

export default function TodayEntry({ eachEntry }) {
  const navigate = useNavigate();
  return (
    <Grid className="flex items-center justify-between gap-1.5">
      <Col
        desktop={3}
        className={`rounded-full px-1 py-1.5 text-center text-sm font-bold uppercase ${
          eachEntry.type === "checkout"
            ? "bg-sky-200 text-sky-800"
            : "bg-green-200 text-green-800"
        }`}
      >
        {eachEntry.type === "checkout" ? "Departing" : "Arriving"}
      </Col>
      <Col className="flex items-center gap-1.5" desktop={4}>
        <img
          src={`https://flagsapi.com/${eachEntry.guest.countryCode}/flat/24.png`}
        />
        <p className="text-sm text-slate-800">{eachEntry.guest.guestName}</p>
      </Col>
      <Col desktop={2} className="text-sm text-slate-800">
        {differenceInCalendarDays(
          eachEntry.booking.endDate,
          eachEntry.booking.startDate,
        )}{" "}
        nights
      </Col>
      <Col desktop={3}>
        {eachEntry.type === "checkout" ? (
          <Modal>
            <Modal.Button>
              <button className="w-full cursor-pointer rounded-md bg-indigo-700 px-2.5 py-1 text-sm font-medium text-white uppercase enabled:hover:bg-indigo-800">
                check out
              </button>
            </Modal.Button>
            <Modal.Window>
              <CheckoutModal bookingDetails={eachEntry} page={0} />
            </Modal.Window>
          </Modal>
        ) : (
          <button
            className="w-full cursor-pointer rounded-md bg-indigo-700 px-2.5 py-1 text-sm font-medium text-white uppercase enabled:hover:bg-indigo-800"
            onClick={() => {
              if (eachEntry.type === "checkin") {
                navigate(`/checkin/${eachEntry.booking.BookingId}`, {
                  state: { page: -1 },
                });
              }
            }}
          >
            check in
          </button>
        )}
      </Col>
    </Grid>
  );
}
