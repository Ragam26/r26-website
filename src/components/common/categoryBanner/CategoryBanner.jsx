import { liberationSerif } from "@/lib/fonts";

export default function CategoryBanner({
    title = "Category Name",
    image,
    align = "left", // "left" or "right"
    textColor = "#730000",
}) {
    const isRight = align === "right";

    return (
        <div className="relative w-full aspect-[1440/65] overflow-hidden">
            {/* Banner Background */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Title */}
            <div
                className={`
                    absolute inset-0 flex items-center
                    ${isRight ? "justify-end pr-15" : "justify-start pl-12"}    
                `}
            >
                <h2 
                    className={`
                        ${liberationSerif.className}
                        text-2xl md:text-4xl
                        tracking-[0.1em] 
                    `}
                    style={{ color: textColor }}
                >
                    {title}
                </h2>
            </div> 
        </div>
    );
}