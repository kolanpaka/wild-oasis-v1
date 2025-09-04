import supabase from "./supabase";
import {
  subDays,
  format,
  differenceInCalendarDays,
  max,
  min,
  isBefore,
  startOfToday,
  startOfDay,
  addDays,
} from "date-fns";

const today = format(new Date(Date.now()), "yyyy/MM/dd");

async function getTotalBookings(days) {
  const daysBack = format(subDays(today, days), "yyyy/MM/dd");
  let { error, count } = await supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .gt("bookedAt", daysBack);

  if (error) {
    throw new Error(error.message);
  }

  return count;
}

async function getCabinsCount() {
  let { count: cabinCount, error } = await supabase
    .from("cabins")
    .select("*", { count: "exact" });
  if (error) {
    throw new Error(error.message);
  }

  return cabinCount;
}

async function getOccupancyRate(days) {
  const offSetDate = format(subDays(today, days), "yyyy-MM-dd");

  const [{ data, error }, cabinCount] = await Promise.all([
    supabase
      .from("bookings")
      .select("*")
      .gt("endDate", offSetDate)
      .lte("startDate", today)
      .eq("status", "checked in"),

    getCabinsCount(),
  ]);
  const capacityOfCabins = cabinCount * days;

  if (error) {
    throw new Error(error.message);
  }

  const overlapDays = (eachBooking) => {
    const offSetStartDate = format(
      max([new Date(eachBooking.startDate), new Date(offSetDate)]),
      "yyyy-MM-dd",
    );

    const offSetEndDate = format(
      min([new Date(today), new Date(eachBooking.endDate)]),
      "yyyy-MM-dd",
    );

    const diff = differenceInCalendarDays(offSetEndDate, offSetStartDate);

    return isBefore(startOfToday(), startOfDay(new Date(eachBooking.endDate)))
      ? diff + 1
      : diff;
  };

  const result = data.reduce((acc, eachBooking) => {
    return acc + overlapDays(eachBooking);
  }, 0);

  return Math.round((result / capacityOfCabins) * 100);
}

async function getTotalCheckIn(days) {
  const daysBack = format(subDays(today, days), "yyyy/MM/dd");
  const { data, error, count } = await supabase
    .from("bookings")
    .select(
      `
    *,
    cabins (
     price,
     Discount
    )
  `,
      { count: "exact" },
    )
    .gt("startDate", daysBack)
    .lte("startDate", today)
    .eq("status", "checked in");

  if (error) {
    throw new Error(error.message);
  }

  const totalCheckInAmount = data.reduce(
    (sum, booking) => sum + Number(booking.amount),
    0,
  );

  const getTotalSales = (date) => {
    const result = {
      totalSales: 0,
      extraSales: 0,
    };
    for (const eachBooking of data) {
      if (eachBooking.startDate === date) {
        result.totalSales = result.totalSales + eachBooking.amount;
        result.extraSales =
          result.extraSales + eachBooking.breakFast
            ? eachBooking.amount -
              (eachBooking.cabins.price - eachBooking.cabins.Discount) *
                differenceInCalendarDays(
                  eachBooking.endDate,
                  eachBooking.startDate,
                )
            : 0;
      }
    }
    return result;
  };

  const salesChart = Array.from({ length: days }, (_, index) => {
    const dateX = addDays(daysBack, index + 1);

    const { totalSales, extraSales } = getTotalSales(
      format(dateX, "yyyy-MM-dd"),
    );

    return {
      date: format(dateX, "MMM dd"),
      Totalsales: totalSales,
      extraSales: extraSales,
    };
  });

  return {
    checkInCount: count,
    totalCheckInAmount,
    salesChart,
    salesSubject: `Sales from ${format(addDays(daysBack, 1), "MMM dd yyyy")} — ${format(today, "MMM dd yyyy")}
`,
  };
}

async function todayEntries() {
  const { data, error } = await supabase
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
    .or(`startDate.eq.${today},endDate.eq.${today}`);

  if (error) {
    throw new Error(error.message);
  }
  const entries = data
    .filter((eachBooking) => {
      const isCheckIn =
        eachBooking.startDate === format(today, "yyyy-MM-dd") &&
        eachBooking.status === "unconfirmed";

      const isCheckOut =
        eachBooking.endDate === format(today, "yyyy-MM-dd") &&
        eachBooking.status === "checked in";

      return isCheckIn || isCheckOut;
    })
    .map((eachBooking) => {
      const { guest, cabins, ...booking } = eachBooking;

      const type =
        eachBooking.startDate === format(today, "yyyy-MM-dd") &&
        eachBooking.status === "unconfirmed"
          ? "checkin"
          : "checkout";

      return { type, guest, cabins, booking };
    });

  return entries;
}

async function getDurationSummary(days) {
  const offSetDate = format(subDays(today, days), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gt("endDate", offSetDate)
    .lte("startDate", today);

  if (error) {
    throw new Error(error.message);
  }

  const durationChart = [
    { name: "2 nights", value: 0 },
    { name: "3 nights", value: 0 },
    { name: "4-5 nights", value: 0 },
    { name: "8-14 nights", value: 0 },
  ];

  for (let eachBooking of data) {
    const duration = differenceInCalendarDays(
      eachBooking.endDate,
      eachBooking.startDate,
    );

    if (duration === 2) {
      durationChart[0].value++;
    } else if (duration === 3) {
      durationChart[1].value++;
    } else if (duration === 4 || duration === 5) {
      durationChart[2].value++;
    } else if (duration >= 8 && duration <= 14) {
      durationChart[3].value++;
    }
  }
  return durationChart;
}

export async function getSales(days) {
  // run all three in parallel

  const [
    totalBookingsCount,
    { checkInCount, totalCheckInAmount, salesChart, salesSubject },
    occupancyRate,
    entries,
    durationChart,
  ] = await Promise.all([
    getTotalBookings(days),
    getTotalCheckIn(days),
    getOccupancyRate(days),
    todayEntries(),
    getDurationSummary(days),
  ]);

  return {
    totalBookingsCount,
    checkInCount,
    totalCheckInAmount,
    entries,
    occupancyRate,
    durationChart,
    salesChart,
    salesSubject,
  };
}


// Pre-compute sales per date in one pass
// const salesByDate = data.reduce((acc, eachBooking) => {
//   const dateKey = eachBooking.startDate; // "yyyy-MM-dd"

//   if (!acc[dateKey]) {
//     acc[dateKey] = { totalSales: 0, extraSales: 0 };
//   }

//   acc[dateKey].totalSales += eachBooking.amount;

//   if (eachBooking.breakFast) {
//     const nights = differenceInCalendarDays(
//       new Date(eachBooking.endDate),
//       new Date(eachBooking.startDate)
//     );

//     const basePrice =
//       (eachBooking.cabins.price - eachBooking.cabins.Discount) * nights;

//     acc[dateKey].extraSales += eachBooking.amount - basePrice;
//   }

//   return acc;
// }, {});

// // Now build chart data in one pass
// const salesChart = Array.from({ length: days }, (_, index) => {
//   const dateX = addDays(daysBack, index + 1);
//   const dateKey = format(dateX, "yyyy-MM-dd");

//   const { totalSales = 0, extraSales = 0 } = salesByDate[dateKey] || {};

//   return {
//     date: format(dateX, "MMM dd"),
//     totalSales,
//     extraSales,
//   };
// });
