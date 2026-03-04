export default function CategoryMenu({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className = "w-full flex justify-center py-6">
      <div className = "flex flex-wrap justify-center gap-3 px-4 py-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`
              rounded-full font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95
              px-4 py-2 text-sm
              sm:px-6 sm:py-3 sm:text-base
              md:px-8 md:py-4 md:text-lg
              ${activeCategory === category.name ? "bg-[#FFDEAC] text-[#730000]" : "bg-[#730000] text-[#FFDEAC] hover:bg-[#FFDEAC] hover:text-[#730000]"} 
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}