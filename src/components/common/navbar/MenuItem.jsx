"use client";

export default function MenuItem({ index, title }) {
  return (
    <div className="py-6 px-8 cursor-pointer select-none">
      <div className="flex items-center gap-6">

        {/* Number */}
        <span className="text-sm text-neutral-400 w-8">
          {String(index).padStart(2, "0")}
        </span>

        {/* Menu Text */}
        <h4
          data-text={title}
          className="
            hover: menu-sweep
            uppercase
            font-semibold
            tracking-wide
            text-lg md:text-xl
          "
        >
          {title}
        </h4>

      </div>
    </div>
  );
}
