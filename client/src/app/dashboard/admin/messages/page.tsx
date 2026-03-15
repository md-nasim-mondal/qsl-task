export const metadata = { title: "Messages | QuickHire Admin" };

const DEMO_MESSAGES = [
  {
    id: "1",
    from: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Question about the Senior Engineer role",
    preview: "Hello, I was wondering if the remote work policy applies to all locations...",
    time: "2h ago",
    unread: true,
  },
  {
    id: "2",
    from: "Michael Chen",
    email: "m.chen@example.com",
    subject: "Follow-up on my application",
    preview: "I submitted my application last week and wanted to check the status...",
    time: "5h ago",
    unread: false,
  },
  {
    id: "3",
    from: "Amara Osei",
    email: "amara@example.com",
    subject: "Availability for interview",
    preview: "Thank you for reaching out. I am available Tuesday and Thursday afternoon...",
    time: "1d ago",
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Messages</h1>
        <p className="text-text-body text-sm mt-1">
          {DEMO_MESSAGES.filter((m) => m.unread).length} unread message
          {DEMO_MESSAGES.filter((m) => m.unread).length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm divide-y divide-gray-50">
        {DEMO_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer ${
              msg.unread ? "bg-primary/5" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {msg.from.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <p className={`text-sm ${msg.unread ? "font-bold text-text-dark" : "font-medium text-text-dark"}`}>
                  {msg.from}
                </p>
                <span className="text-xs text-gray-400 shrink-0">{msg.time}</span>
              </div>
              <p className="text-sm font-medium text-text-body mt-0.5">{msg.subject}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.preview}</p>
            </div>
            {msg.unread && (
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
