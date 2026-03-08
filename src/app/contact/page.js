"use client";
import React, { useState } from "react";
import { Phone, Mail, Instagram, Facebook, Linkedin, Loader2 } from "lucide-react";
import { sendEmail } from "./actions";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    story: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus({ type: "success", message: "Message sent successfully! We'll get back to you as soon as possible." });
        setFormData({ name: "", email: "", story: "" });
      } else {
        setStatus({ type: "error", message: result.error || "Failed to send message." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
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
                        Athul - 8089158295
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
                  {/* Name */}
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-3">
                      Name
                      <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
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
                      Your Message
                      <span className="text-yellow-500">*</span>
                    </label>
                    <textarea
                      name="story"
                      value={formData.story}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      rows="6"
                      className="w-full bg-black/40 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-yellow-500/60 hover:bg-yellow-500/40 border border-yellow-500/60 text-white uppercase tracking-wider font-light py-3 rounded-lg transition-all duration-300 hover:border-yellow-400 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    {status.message && (
                      <p className={`text-center text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {status.message}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
