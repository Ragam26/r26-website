"use client";
import React, { useState } from "react";
import { Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    story: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: add form submission logic
  };

  return (
    <main
      className="min-h-screen bg-black bg-top bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: "url('/images/contact/contactbg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "top center",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(
              circle at center,
              rgba(0,0,0,0) 25%,
              rgba(0,0,0,0.4) 70%,
              rgba(0,0,0,0.8) 100%
            )
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="pt-16 md:pt-24 pb-8 md:pb-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mt-8 sm:mt-10 md:mt-12 mb-4 md:mb-6 lg:mb-8 text-center">
            CONTACT
          </h1>
        </div>

        <div className="flex justify-center px-4 pb-16 md:pb-20">
          <div className="max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-yellow-500/40">
                <div className="mb-8">
                  <a
                    href="tel:8714815466"
                    className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-[#dcbe11] transition-all duration-300 group"
                  >
                    <Phone className="w-6 h-6 text-white" />
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-white text-sm font-light tracking-wider">
                        Sreehari - 8714815466
                      </p>
                    </div>
                  </a>
                </div>

                <div className="mb-8">
                  <a
                    href="tel:8714815466"
                    className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-[#dcbe11] transition-all duration-300 group"
                  >
                    <Phone className="w-6 h-6 text-white" />
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-white text-sm font-light tracking-wider">
                        Sreehari - 8714815466
                      </p>
                    </div>
                  </a>
                </div>

                {/* CHANGE THIS */}
                {/* <div className="mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/10">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Name
                      </p>
                      <p className="text-white text-sm font-light tracking-wider">
                        Sreehari
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="mb-12">
                  <a
                    href="mailto:ragam@nitc.ac.in"
                    className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-[#dcbe11] transition-all duration-300 group"
                  >
                    <Mail className="w-6 h-6 text-white" />
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-white text-sm font-light tracking-wider">
                        ragam@nitc.ac.in
                      </p>
                    </div>
                  </a>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
                    <p className="text-white text-sm uppercase tracking-wider px-4">
                      Social Media
                    </p>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
                  </div>

                  <div className="space-y-3">
                    <a
                      href="https://www.instagram.com/ragam_nitc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg group"
                    >
                      <Instagram className="w-6 h-6 text-white" />
                      <p className="text-white text-sm uppercase tracking-wider group-hover:text-[#dcbe11]">
                        ragam_nitc
                      </p>
                    </a>

                    <a
                      href="https://www.instagram.com/ragamlive/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg group"
                    >
                      <Instagram className="w-6 h-6 text-white" />
                      <p className="text-white text-sm uppercase tracking-wider group-hover:text-[#dcbe11]">
                        ragamlive
                      </p>
                    </a>

                    <a
                      href="https://www.facebook.com/Ragam.nitc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg group"
                    >
                      <Facebook className="w-6 h-6 text-white" />
                      <p className="text-white text-sm uppercase tracking-wider group-hover:text-[#dcbe11]">
                        Ragam.nitc
                      </p>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/ragam-national-institute-of-technology-calicut/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg group"
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                      <p className="text-white text-sm uppercase tracking-wider group-hover:text-[#dcbe11]">
                        Ragam
                      </p>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-yellow-500/40">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-3">
                      First Name
                      <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your First name"
                      className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-3">
                      Last Name
                      <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your Last name"
                      className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-3">
                      Email address
                      <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                      required
                    />
                  </div>

                  {/* Story Textarea */}
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-3">
                      Your Story
                      <span className="text-yellow-500">*</span>
                    </label>
                    <textarea
                      name="story"
                      value={formData.story}
                      onChange={handleChange}
                      placeholder="We'll get back to you as soon as possible!"
                      rows="6"
                      className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-yellow-500/60 hover:bg-yellow-500/40 border border-yellow-500/60 text-white uppercase tracking-wider font-light py-3 rounded-lg transition-all duration-300 hover:border-yellow-400"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
