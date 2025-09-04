import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function DurationSummary({ durationChart }) {
  const COLORS = ["#f97316", "#eab308", "#84cc16", "#14b8a6"]; // orange, yellow, green, teal

  return (
    <div className="h-full w-full rounded-md bg-white p-4 shadow">
      <h2 className="mb-3 text-xl font-semibold text-slate-700">
        Stay duration summary
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip />
          <Pie
            data={durationChart}
            dataKey="value"
            nameKey="name"
            cx="45%"
            cy="45%"
            innerRadius={76}
            outerRadius={110}
            paddingAngle={2}
          >
            {durationChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
