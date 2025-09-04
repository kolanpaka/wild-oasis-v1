import { useQuery } from "@tanstack/react-query";
import ReadCard from "../features/dashboard/ReadCard";
import Grid, { Col } from "../UI/Grid";
import { getSales } from "../services/dashboardAPI";
import { HiOutlineBriefcase } from "react-icons/hi";
import { GiCash } from "react-icons/gi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import Spinner from "../UI/Spinner";
import TodayDashboard from "../features/dashboard/TodayDashboard";
import DurationSummary from "../features/dashboard/DurationSummary";
import SalesChart from "../features/dashboard/SalesChart";
import { useSearchParams } from "react-router-dom";
import DashboardNav from "../features/dashboard/DashboardNav";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const duration = searchParams.get("duration");

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["dashboard", duration],
    queryFn: () => getSales(Number(duration)),
  });

  if (isError) {
    console.log(error);
  }

  if (isPending) {
    return <Spinner />;
  }

  const {
    checkInCount,
    occupancyRate,
    entries,
    totalBookingsCount,
    totalCheckInAmount,
    durationChart,
    salesChart,
    salesSubject,
  } = data;

  return (
    <div className="space-y-4">
      <DashboardNav />
      <Grid>
        <Col desktop={3}>
          <ReadCard
            LogoComponent={HiOutlineBriefcase}
            logobackground={"bg-orange-100"}
            logoColor={"text-orange-700"}
            infoKey="BOOKINGS"
            infoValue={totalBookingsCount}
          />
        </Col>
        <Col desktop={3}>
          <ReadCard
            LogoComponent={GiCash}
            logobackground={"bg-green-100"}
            logoColor={"text-green-700"}
            infoKey="Sales"
            infoValue={`$${totalCheckInAmount}.00`}
          />
        </Col>
        <Col desktop={3}>
          <ReadCard
            LogoComponent={HiOutlineCalendarDays}
            logobackground={"bg-slate-100"}
            logoColor={"text-indigo-700"}
            infoKey="Check ins"
            infoValue={checkInCount}
          />
        </Col>
        <Col desktop={3}>
          <ReadCard
            LogoComponent={HiOutlineChartBar}
            logobackground={"bg-amber-100"}
            logoColor={"text-amber-700"}
            infoKey="Occupancy rate"
            infoValue={`${occupancyRate}%`}
          />
        </Col>
      </Grid>

      <Grid className="mt-8">
        <Col desktop={6}>
          <TodayDashboard entries={entries} />
        </Col>
        <Col desktop={6}>
          <DurationSummary durationChart={durationChart} />
        </Col>
      </Grid>

      <div className="pb-12">
        <SalesChart salesChart={salesChart} salesSubject={salesSubject} />
      </div>
    </div>
  );
}
