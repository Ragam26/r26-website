"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import BlurText from "../../components/TextAnimations/BlurText";
import DecryptedText from "../../components/TextAnimations/DecryptedText";
import FaqAccordion from "../../components/Faq/FaqAccordion";

export default function BackgroundPage() {
  const { scrollY } = useScroll();
  const diyaY = useTransform(scrollY, [0, 1000], ["-50%", "-150%"]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ragam Logo */}
      <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-10 w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36">
        <Image
          src="/icons/ragam_logo.png"
          alt="Ragam Logo"
          width={150}
          height={150}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Mandala 1*/}
      <div className="absolute top-0 left-0 z-0 opacity-90 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-lg lg:h-128">
        <Image
          src="/images/mandala.png"
          alt="Mandala"
          width={520}
          height={520}
          className="object-contain animate-spin block w-full h-full"
          style={{ animationDuration: "12s" }}
        />
      </div>

      {/* Mandala 2 */}
      <div className="absolute bottom-0 right-0 z-0 opacity-90 pointer-events-none translate-x-1/2 translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-lg lg:h-128">
        <Image
          src="/images/mandala.png"
          alt="Mandala"
          width={520}
          height={520}
          className="object-contain animate-spin block w-full h-full"
          style={{ animationDuration: "12s" }}
        />
      </div>

      {/* Hero */}
      <div className="h-[60vh] lg:h-screen relative flex items-center justify-center px-4">
          <BlurText
            text="FAQ"
            delay={250}
            animateBy="chars"
            direction="top"
            className="text-white text-8xl md:text-10xl lg:text-[14rem] font-bold leading-none"
          />

        {/* Diya */}
        <motion.div 
          style={{ y: diyaY }}
          className="hidden lg:flex absolute right-4 top-1/2 z-10 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-md lg:h-112 items-center justify-center"
        >
          <Image
            src="/images/diya.png"
            alt="Diya"
            width={420}
            height={420}
            className="object-contain w-full h-full"
          />
        </motion.div>
      </div>

      <section className="bg-black pt-0 pb-12 lg:py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 order-2 lg:order-1">
            <FaqAccordion 
              question="What is Ragam?"
              answer="Ragam is a celebration of art, culture, and community with events for everyone."
            />
            
            <FaqAccordion 
              question="How do I register for events?"
              answer="Visit the registration page, choose your events, and complete the form."
            />
            
            <FaqAccordion 
              question="Where can I find the schedule?"
              answer="The full schedule is available on the website and will be updated regularly."
            />
          </div>

          <div className="flex items-center justify-center lg:justify-end pr-8 order-1 lg:order-2">
            <DecryptedText
              text="Any Questions? We got you"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              speed={30}
              maxIterations={12}
              parentClassName="text-white font-extrabold text-2xl md:text-4xl lg:text-6xl text-center lg:text-right max-w-lg"
              className="text-white"
              encryptedClassName="text-white/30"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
