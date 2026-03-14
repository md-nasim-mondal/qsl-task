const PostJobs = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-indigo-600 overflow-hidden flex flex-col md:flex-row items-center">
          {/* Left Text */}
          <div className="flex-1 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug mb-3">
              Start posting <br /> jobs today
            </h2>
            <p className="text-indigo-200 text-sm md:text-base mb-8 max-w-xs leading-relaxed">
              Find the right candidates faster. Post your first job in minutes and reach thousands of qualified applicants.
            </p>
            <button className="bg-white text-indigo-600 font-semibold text-sm px-7 py-3 rounded-lg hover:bg-indigo-50 transition-colors shadow-lg">
              Apply for free
            </button>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 relative flex items-end justify-center overflow-hidden min-h-48 md:min-h-64">
            {/* Dashboard mockup */}
            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-8">
              <div className="w-full max-w-xs bg-white rounded-xl shadow-2xl p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-2.5 w-24 bg-gray-200 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                </div>
                {/* Bar chart mock */}
                <div className="flex items-end gap-2 h-20 mb-3">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 5 ? "#4f46e5" : i % 2 === 0 ? "#e0e7ff" : "#c7d2fe",
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-gray-100 rounded-full w-full" />
                  <div className="h-2 bg-gray-100 rounded-full w-4/5" />
                </div>
                {/* Floating stat badge */}
                <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                  57 Applications
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostJobs;
