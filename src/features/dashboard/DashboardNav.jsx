import SwitchUI from "../../UI/SwitchUI";
export default function DashboardNav() {
  return (
    <div className="flex items-start justify-between">
      <p className="heading mb-8">Dashboard</p>
      <SwitchUI
        switches={{
          "Last 7 days": "7",
          "Last 30 days": "30",
          "Last 90 days": "90",
        }}
        StateValue="duration"
      />
    </div>
  );
}
