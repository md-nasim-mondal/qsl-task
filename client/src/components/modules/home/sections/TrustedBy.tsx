const brands = ["Vodafone", "Intel", "TESLA", "AMD", "Talkit"];

const TrustedBy = () => {
  return (
    <section className="w-full py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-6 font-medium">
          Trusted by leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-gray-400 font-bold text-lg md:text-xl tracking-wide uppercase hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
