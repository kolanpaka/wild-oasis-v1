import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ salesChart, salesSubject }) {
  // May 25 2023
  return (
    <div className="h-full w-full rounded-md bg-white p-5 shadow">
      <h2 className="mb-6 text-lg font-semibold">{salesSubject}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={salesChart}
          margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `${value}$`} />
          <Tooltip
            formatter={(value) => `${value}$`}
            wrapperClassName="w-[180px]"
          />
          <Area
            type="monotone"
            dataKey="Totalsales"
            stroke="#4F46E5"
            strokeWidth="2"
            fill="#3b82f6"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="extraSales"
            stroke="#16A34A"
            strokeWidth="2"
            fill="#22c55e"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
