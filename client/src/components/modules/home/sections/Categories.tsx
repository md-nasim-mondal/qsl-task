const categories = [
  {
    icon: "✏️",
    title: "Design",
    count: "235 jobs available",
    highlighted: false,
  },
  {
    icon: "📊",
    title: "Sales",
    count: "756 jobs available",
    highlighted: false,
  },
  {
    icon: "💼",
    title: "Marketing",
    count: "140 jobs available",
    highlighted: true,
  },
  {
    icon: "💰",
    title: "Finance",
    count: "325 jobs available",
    highlighted: false,
  },
  {
    icon: "💻",
    title: "Technology",
    count: "436 jobs available",
    highlighted: false,
  },
  {
    icon: "⚙️",
    title: "Engineering",
    count: "542 jobs available",
    highlighted: false,
  },
  {
    icon: "🗂️",
    title: "Business",
    count: "211 jobs available",
    highlighted: false,
  },
  {
    icon: "👥",
    title: "Human Resource",
    count: "345 jobs available",
    highlighted: false,
  },
];

const Categories = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore by{" "}
            <span className="text-indigo-500">category</span>
          </h2>
          <a
            href="#"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition-colors"
          >
            Show all jobs <span>→</span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`group rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 border hover:shadow-md
                ${
                  cat.highlighted
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white border-gray-100 hover:border-indigo-200"
                }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h3
                  className={`font-semibold text-sm md:text-base ${
                    cat.highlighted ? "text-white" : "text-gray-800"
                  }`}
                >
                  {cat.title}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    cat.highlighted ? "text-indigo-200" : "text-gray-400"
                  }`}
                >
                  {cat.count}
                </p>
              </div>
              <span
                className={`text-xs font-medium flex items-center gap-1 ${
                  cat.highlighted
                    ? "text-indigo-100"
                    : "text-indigo-500 group-hover:text-indigo-700"
                }`}
              >
                Browse jobs →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
