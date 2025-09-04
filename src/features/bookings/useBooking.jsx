import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/bookingsAPI";

export default function useBooking() {
  const { bookingId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const data = await getBooking(bookingId);
      return data;
    },
  });

  return { data, isPending };
}
