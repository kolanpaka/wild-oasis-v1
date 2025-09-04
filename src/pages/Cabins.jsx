// import { useEffect, useState } from "react";
// import getCabins from "../services/cabinAPI";
import CabinDataTable from "../features/cabins/CabinDataTable";
import CabinNav from "../features/cabins/CabinNav";

export default function Cabins() {
  return (
    <div className="space-y-8">
      <CabinNav />
      <div className="pb-12">
        <CabinDataTable />
      </div>
    </div>
  );
}
