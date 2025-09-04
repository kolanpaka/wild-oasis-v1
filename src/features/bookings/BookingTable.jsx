import { useQuery } from "@tanstack/react-query";
import Table from "../../UI/Table";
import Spinner from "../../UI/Spinner";
import Booking from "./Booking";
import { getBookings } from "../../services/bookingsAPI";
import BookingFooter from "./BookingFooter";
import pagenation from "../../utils/pagenation";
import { useSearchParams } from "react-router-dom";

export default function BookingTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const page = Number(searchParams.get("page") || 0);
  const bookingStatus = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");

  const { data, status, error } = useQuery({
    queryKey: [
      "bookings",
      {
        page,
        bookingStatus,
        sortBy,
      },
    ],
    queryFn: () => getBookings(page, bookingStatus, sortBy),
  });

  if (status == "pending") {
    return <Spinner />;
  }

  const pages = pagenation(data?.totalBookings || 0, 10);

  // if ((page < 0 || page >= pages.length) && data.totalBookings > 0) {
  //   return <Navigate to="/bookings" />;
  // }

  function nextPage() {
    // navigate(`/bookings?page=${page + 1}`);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page + 1);
      return params;
    });
  }
  function prevPage() {
    // navigate(`/bookings?page=${page - 1}`);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page - 1);
      return params;
    });
  }

  console.log(sortBy, data);
  console.log("Hello....");

  return (
    <div className="space-y-4">
      <Table className="">
        <Table.Header>
          <Table.Head className="col-span-1">Cabin</Table.Head>
          <Table.Head className="col-span-3">Guest</Table.Head>
          <Table.Head className="col-span-3">Dates</Table.Head>
          <Table.Head className="col-span-2">Status</Table.Head>
          <Table.Head className="col-span-2">Amount</Table.Head>
          <Table.Head className="col-span-1"></Table.Head>
        </Table.Header>
        <Table.Body className="text-slate-700">
          {status === "error" ? (
            <div className="m-auto my-12 w-[50%] space-y-3">
              <p>Something went wrong while fetching the data from API 🙂</p>
              <p className="text-red-400">Reason : {error.message}</p>
            </div>
          ) : data.totalBookings == 0 ? (
            <div className="my-16 text-center text-lg text-slate-700">
              <p>
                No bookings found. Please wait for a guest <br /> to book the
                cabin.
              </p>
            </div>
          ) : (
            <>
              {data.bookings?.map((eachRow) => (
                <Booking
                  tableRow={eachRow}
                  key={eachRow.BookingId}
                  filters={{ page, bookingStatus, sortBy }}
                />
              ))}
              <BookingFooter
                nextPage={nextPage}
                start={pages[page][0]}
                end={pages[page][1]}
                prevPage={prevPage}
                totalBookings={data.totalBookings}
              />
            </>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
