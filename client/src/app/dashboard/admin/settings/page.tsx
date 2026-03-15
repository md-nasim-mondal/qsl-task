export const metadata = { title: "Settings | QuickHire Admin" };

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Settings</h1>
        <p className="text-text-body text-sm mt-1">Manage your account preferences and notifications.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-text-dark border-b border-gray-100 pb-3">Notifications</h2>

        {[
          { label: "Email me when someone applies to my job", defaultChecked: true },
          { label: "Email me when a message is received", defaultChecked: true },
          { label: "Weekly summary report", defaultChecked: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-text-body">{item.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-text-dark border-b border-gray-100 pb-3">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-dark">Delete Account</p>
            <p className="text-xs text-text-body mt-0.5">Permanently remove your account and all data.</p>
          </div>
          <button className="text-sm font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
