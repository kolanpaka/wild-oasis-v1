// import { useQuery } from "@tanstack/react-query";
// import { getTotalBookings } from "../../services/dashboardAPI";
// import { HiOutlineBriefcase } from "react-icons/hi";

export default function ReadCard({
  // eslint-disable-next-line no-unused-vars
  LogoComponent,
  infoKey,
  infoValue,
  logobackground,
  logoColor,
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-md bg-white p-4 shadow">
      <div>
        <div
          className={`flex-center h-[64px] w-[64px] rounded-full text-4xl ${logobackground} ${logoColor}`}
        >
          <LogoComponent />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-600 uppercase">
          {infoKey}
        </h3>
        <p className="text-2xl font-bold text-slate-800">{infoValue}</p>
      </div>
    </div>
  );
}
