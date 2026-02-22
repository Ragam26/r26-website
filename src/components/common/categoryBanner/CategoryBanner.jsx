import { liberationSerif } from "@/lib/fonts";

export default function CategoryBanner({
  title = "Category Name",
  image,
  align = "left",
  variant = "light",
}) {
  const isRight = align === "right";

  const variantStyles = {
    light: `
      [color:#FFDEAC]
      [-webkit-text-stroke:1px_#730000]
      md:[color:#730000]
      md:[-webkit-text-stroke:0px]
    `,
    dark: `
      [color:#730000]
      [-webkit-text-stroke:2px_#FFDEAC]
      md:[color:#FFDEAC]
      md:[-webkit-text-stroke:0px]
    `,
  };

  return (
    <div className="relative w-full flex-shrink-0 aspect-[1500/150] sm:aspect-[484/65] md:aspect-[1440/65] overflow-hidden">
      {/* Banner Background */}
      <img
        src={image}
        alt={title}
        className={`
          absolute inset-0 w-full h-full object-cover transform-gpu transition-transform duration-300
          ${isRight
            ? "object-right md:object-center"
            : "object-left md:object-center"}
        `}
      />

      {/* Title */}
      <div
        className={`
          absolute inset-0 flex items-center
          ${
            isRight
              ? "justify-end pr-2 md:pr-5"
              : "justify-start pl-2 md:pl-2"
          }
        `}
      >
        <h2
          className={`
            font-['Arial_Black'] md:${liberationSerif.className}
            text-base text-[clamp(16px,5vw,40px)]
            tracking-none md:tracking-[0.02em]
            leading-none 
            whitespace-normal md:whitespace-nowrap
            max-w-[60%] md:max-w-none          
            ${variantStyles[variant]}
          `}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}