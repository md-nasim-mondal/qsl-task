export const metadata = { title: "My Schedule | QuickHire Admin" };

const SCHEDULE = [
  { id: "1", time: "09:00 AM", candidate: "Alice Rowe", role: "Frontend Engineer", type: "Phone Screen" },
  { id: "2", time: "11:30 AM", candidate: "Ben Okafor", role: "Product Designer", type: "Technical Round" },
  { id: "3", time: "02:00 PM", candidate: "Clara Singh", role: "Backend Developer", type: "Final Interview" },
];

export default function SchedulePage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">My Schedule</h1>
        <p className="text-text-body text-sm mt-1">{today}</p>
      </div>

      <div className="grid gap-4">
        {SCHEDULE.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col xs:flex-row items-center gap-4 xs:gap-5 text-center xs:text-left">
            <div className="w-20 shrink-0">
              <p className="text-sm font-bold text-primary">{item.time}</p>
            </div>
            <div className="hidden xs:block w-px h-10 bg-gray-100 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text-dark truncate">{item.candidate}</p>
              <p className="text-sm text-text-body truncate">{item.role}</p>
            </div>
            <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full shrink-0">
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
