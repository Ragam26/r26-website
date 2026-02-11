import { FaInstagram, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 pt-5 pb-5">
        
        {/* Huge RAGAM Text */}
        <div className="w-full text-center mb-20">
          <h1 className="text-[18vw] font-bold tracking-wide leading-none group">
            <span className="transition-colors duration-300 hover:text-[#EC8047]">
                R
            </span>
            <span className="transition-colors duration-300 hover:text-[#FAE4B2]">
                A
            </span>
            <span className="transition-colors duration-300 hover:text-[#850419]">
                G
            </span>
            <span className="transition-colors duration-300 hover:text-[#F7BD73]">
                A
            </span>
            <span className="transition-colors duration-300 hover:text-[#768367]">
                M
            </span>
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          
          {/* Left Section */}
          <div className="flex flex-col gap-6">
            
            {/* Logo */}
            <div className="font-bold">
              <Image
                src="/images/footer/ragam-logo.svg"
                alt="Ragam Logo"
                width={100}
                height={100}
                className="w-24 h-24"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-6">
                <a href="#" className="hover:text-gray-400 transition">
                    <FaInstagram size={24} />
                </a>
                <a href="#" className="hover:text-gray-400 transition">
                    <FaFacebook size={24} />
                </a>
                <a href="#" className="hover:text-gray-400 transition">
                    <FaLinkedinIn size={24} />
                </a>
            </div>

          </div>

          {/* Right Section - Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-15 text-sm">
            
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-gray-400 transition">Home</a>
              <a href="#" className="hover:text-gray-400 transition">Team</a>
              <a href="#" className="hover:text-gray-400 transition">Sponsors</a>
              <a href="#" className="hover:text-gray-400 transition">Contact Us</a>
            </div>

            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-gray-400 transition">Ragnarok</a>
              <a href="#" className="hover:text-gray-400 transition">Proshow</a>
              <a href="#" className="hover:text-gray-400 transition">Prodezza</a>
            </div>

            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-gray-400 transition">Certificates</a>
              <a href="#" className="hover:text-gray-400 transition">Events</a>
              <a href="#" className="hover:text-gray-400 transition">Workshops</a>
              <a href="#" className="hover:text-gray-400 transition">Sports</a>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © 2026 - Ragam NITC
        </div>

      </div>
    </footer>
  );
}
