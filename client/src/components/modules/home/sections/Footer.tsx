const footerLinks = {
  About: ["Our Story", "Find a Job", "Pricing", "Blog", "Privacy Policy"],
  Resources: ["Podcasts", "Events", "Blog", "Updates", "Contact us"],
};

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-white font-bold text-lg">QuickHire</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Great platform for job seekers searching for their dream job and for companies looking to hire talent.
            </p>
            <div className="flex gap-3 mt-6">
              {["f", "tw", "in", "yt"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-gray-400 hover:text-white uppercase">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get Job Notifications</h4>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Stay updated with the latest jobs sent to your inbox weekly.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} QuickHire. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-600 hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="text-xs text-gray-600 hover:text-indigo-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
