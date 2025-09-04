import supabase from "./supabase";

export async function getBookings(page, bookingStatus, sortBy) {
  const pageSize = 10;
  let query = supabase
    .from("bookings")
    .select(
      `
    *,
    cabins (
      id,
      cabin
    ),
    guest (
      guestId,
      guestName,
      guestEmail,
      country,
      countryCode
    )
  `,
      { count: "exact" },
    )

    .range(page * pageSize, (page + 1) * pageSize - 1);

  const statusMap = {
    "checked-out": "checked out",
    "checked-in": "checked in",
    unconfirmed: "unconfirmed",
  };

  if (statusMap[bookingStatus]) {
    query = query.eq("status", statusMap[bookingStatus]);
  }

  const sortOptions = {
    "Sort by date (recent first)": "startDate-desc",
    "Sort by date (earlier first)": "startDate-asc",
    "Sort by amount (high first)": "totalPrice-desc",
    "Sort by amount (low first)": "totalPrice-asc",
  };

  if (sortBy && Object.values(sortOptions).includes(sortBy)) {
    if (sortBy === "startDate-desc") {
      query = query
        .order("startDate", { ascending: false })
        .order("BookingId", { ascending: false });
    } else if (sortBy === "startDate-asc") {
      query = query
        .order("startDate", { ascending: true })
        .order("BookingId", { ascending: false });
    } else if (sortBy === "totalPrice-desc") {
      query = query
        .order("amount", { ascending: false })
        .order("BookingId", { ascending: false });
    } else if (sortBy === "totalPrice-asc") {
      query = query
        .order("amount", { ascending: true })
        .order("BookingId", { ascending: false });
    }
  }

  
  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { totalBookings: count, bookings: data };
}

export async function checkInAPI({ BookingId, ...updateValues }) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updateValues)
    .eq("BookingId", BookingId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function checkOutAPI({ BookingId, updateValues }) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updateValues)
    .eq("BookingId", BookingId)
    .select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBooking(bookingId) {
  let { data, error } = await supabase
    .from("bookings")
    .select(
      `
    *,
    cabins ( id, cabin ),
    guest (guestId, guestName,guestEmail,country,countryCode )
  `,
    )
    .eq("BookingId", bookingId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBooking(BookingId) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("BookingId", BookingId);

  if (error) {
    throw new Error(error.message);
  }
}
