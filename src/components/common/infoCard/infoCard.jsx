import { Bix } from "react-icons/bi";

export default function InfoCard({
    isOpen,
    onClose,
    title,
    description,
    image,
    pocList = [],
    brochure
})  {
    if (!isOpen) return null;

    return ( 
        <div className ="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            {/* Main Container */}
            <div className="relative w-[90%] max-w-5xl max-h-[85vh] overflow-hidden rounded-xl bg-white shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl text-gray-600 hover:text-black"
                >
                    <Bix />
                </button>

                {/* Title */}
                <h2 className="px-8 pt-6 text-2xl font-semibold">
                    {title}
                </h2>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 overflow-y-auto max-h-[70vh]">

                    {/* Left Side */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Description */}
                        <div className="text-gray-700 leading-relaxed">
                            {description}
                        </div>

                        {/* Image */}
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-full rounded-lg shadow-md"
                            />
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6 md:sticky md:top-4 h-fit">

                        {/* POC List */}
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3 font-semibold text-lg">
                                Contact Us
                            </h3>

                            <div className="space-y-3">
                                {pocList.map((poc, index) => (
                                    <div key={index} className="flex flex-col text-md">
                                        <span className="font-medium">
                                            {poc.name}
                                        </span>
                                        <span className="text-gray-600">
                                            {poc.phone}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Brochure */}
                        {brochure && (
                            <a href={brochure} download className="block text-center rounded-lg bg-black text-white py-3 font-medium hover:bg-gray-800 transition">
                                Download Brochure
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}