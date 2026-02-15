/* eslint-disable react-hooks/refs */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { slideData, slideTitles } from "./slideData";
import { kiwi } from "@/lib/fonts";
gsap.registerPlugin(CustomEase);

const ProgramCarousel = () => {
  const totalSlides = 8;
  const [currentSlide, setCurrentSlide] = useState(1);
  const isAnimating = useRef(false);

  const createSlide = (slideNumber, direction) => {
    const slide = document.createElement("div");
    slide.className = "absolute top-0 left-0 w-full h-full slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "absolute top-0 left-0 w-full h-full";
    slideBgImg.style.willChange = "clip-path";

    const img = document.createElement("img");
    img.src = `/images/programCarousel/bg${slideNumber}.png`;
    img.alt = "";
    img.className = "w-full h-full object-cover";
    img.style.willChange = "transform";

    const overlay = document.createElement("div");
    overlay.className = "absolute top-0 left-0 w-full h-full bg-black/[0.125]";

    slideBgImg.appendChild(img);
    slideBgImg.appendChild(overlay);
    slide.appendChild(slideBgImg);

    if (direction === "right") {
      slideBgImg.style.clipPath =
        "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    } else {
      slideBgImg.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
    }

    return slide;
  };

  const createMainImageWrapper = (slideNumber, direction) => {
    const wrapper = document.createElement("div");
    wrapper.className =
      "absolute top-0 left-0 w-full h-full slide-main-img-wrapper";
    wrapper.style.willChange = "clip-path";

    const img = document.createElement("img");
    img.src = `/images/programCarousel/img${slideNumber}.png`;
    img.alt = "";
    img.className = "w-full h-full object-cover";
    img.style.willChange = "transform";

    wrapper.appendChild(img);

    if (direction === "right") {
      wrapper.style.clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
    } else {
      wrapper.style.clipPath =
        "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    }

    return wrapper;
  };

  const createTextElements = (slideNumber, direction) => {
    const data = slideData[slideNumber - 1];

    const newTitle = document.createElement("h1");
    newTitle.textContent = data.title;
    newTitle.className = `absolute text-white uppercase leading-none ${data.titleFont} ${data.titleSize} ${data.titleWeight}`;
    newTitle.style.willChange = "transform";
    gsap.set(newTitle, { y: "100%" });

    const newDescription = document.createElement("p");
    newDescription.textContent = data.desc;
    newDescription.className = `absolute text-white leading-none ${data.descFont} ${data.descSize} ${data.descWeight}`;
    newDescription.style.willChange = "transform";
    gsap.set(newDescription, { y: "100%" });

    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber;
    newCounter.className = "absolute text-base leading-none opacity-100";
    newCounter.style.willChange = "transform";
    gsap.set(newCounter, { y: "100%" });

    return { newTitle, newDescription, newCounter };
  };

  const animateSlide = (direction, targetSlide = null) => {
    if (isAnimating.current) return;

    if (targetSlide !== null && targetSlide === currentSlide) return;

    isAnimating.current = true;

    const slider = document.querySelector(".slider");
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    const nextImageContainer = document.querySelector(".slide-next-img");
    const nextNextImageContainer = document.querySelector(
      ".slide-next-next-img",
    );
    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper",
    );
    const currentNextWrapper = nextImageContainer?.querySelector(
      ".slide-main-img-wrapper",
    );
    const currentNextNextWrapper = nextNextImageContainer?.querySelector(
      ".slide-main-img-wrapper",
    );

    const titleContainer = document.querySelector(".slide-title");
    const descriptionContainer = document.querySelector(".slide-description");
    const counterContainer = document.querySelector(".count");

    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");
    const currentCounter = counterContainer.querySelector("p");

    let nextSlide;
    if (targetSlide !== null) {
      nextSlide = targetSlide;
    } else {
      if (direction === "right") {
        nextSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
      } else {
        nextSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
      }
    }

    const newSlide = createSlide(nextSlide, direction);
    const newMainWrapper = createMainImageWrapper(nextSlide, direction);
    const newNextWrapper = createMainImageWrapper(
      (nextSlide % totalSlides) + 1,
      direction,
    );
    const newNextNextWrapper = createMainImageWrapper(
      ((nextSlide + 1) % totalSlides) + 1,
      direction,
    );
    const { newTitle, newDescription, newCounter } = createTextElements(
      nextSlide,
      direction,
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    if (nextImageContainer) nextImageContainer.appendChild(newNextWrapper);
    if (nextNextImageContainer)
      nextNextImageContainer.appendChild(newNextNextWrapper);

    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);
    counterContainer.appendChild(newCounter);

    [newMainWrapper, newNextWrapper, newNextNextWrapper].forEach((wrapper) => {
      gsap.set(wrapper.querySelector("img"), {
        x: direction === "right" ? "-50%" : "50%",
      });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentNextWrapper,
          currentNextNextWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach((el) => el?.remove());

        setCurrentSlide(nextSlide);
        isAnimating.current = false;
      },
    });

    [newMainWrapper, newNextWrapper, newNextNextWrapper].forEach(
      (wrapper, index) => {
        // Animate the ClipPath
        tl.to(
          wrapper,
          {
            clipPath:
              direction === "right"
                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                : "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            duration: 0.8,
            ease: CustomEase.create("", ".87,0,.13,1"),
          },
          0,
        );

        // Animate the Image sliding inside
        tl.to(
          wrapper.querySelector("img"),
          {
            x: "0%",
            duration: 0.8,
            ease: CustomEase.create("", ".87,0,.13,1"),
          },
          0,
        );
      },
    );

    [currentMainWrapper, currentNextWrapper, currentNextNextWrapper].forEach(
      (wrapper) => {
        if (!wrapper) return;
        tl.to(
          wrapper.querySelector("img"),
          {
            x: direction === "right" ? "50%" : "-50%",
            duration: 0.8,
            ease: CustomEase.create("", ".87,0,.13,1"),
          },
          0,
        );
      },
    );

    tl.to(
      newSlide.querySelector("div"),
      {
        clipPath:
          direction === "right"
            ? "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0,
    )
      .to(
        currentSlideElement.querySelector("img"),
        {
          scale: 1.5,
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === "right"
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentMainWrapper.querySelector("img"),
        {
          x: direction === "right" ? "50%" : "-50%",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          x: "0%",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentTitle,
        {
          y: "-100%", // Slide up and out
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newTitle,
        {
          y: "0%", // Slide up into view
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentDescription,
        {
          y: "-100%",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newDescription,
        {
          y: "0%",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentCounter,
        {
          y: "-100%",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newCounter,
        {
          y: "0%",
          duration: 0.8,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      );
  };

  const handlePrevious = () => animateSlide("left");
  const handleNext = () => animateSlide("right");

  const goToSlide = (index) => {
    const direction = index > currentSlide ? "right" : "left";
    animateSlide(direction, index);
  };

  const clickToSlide = (targetIndex) => {
    if (isAnimating.current || targetIndex === currentSlide) return;
    const direction = targetIndex > currentSlide ? "right" : "left";
    animateSlide(direction, targetIndex);
  };

  return (
    <div className="w-full h-full font-sans">
      <footer className="fixed bottom-0 left-0 w-full p-12 flex justify-between items-center z-2">
        <div className="flex text-white text-[15px] font-light">
          <div className="count relative h-4.5 w-6 flex justify-center overflow-hidden">
            <p
              className="absolute translate-x-0 text-base leading-none opacity-100"
              style={{ willChange: "transform" }}
            >
              {currentSlide}
            </p>
          </div>
          <p className="w-6 flex justify-center opacity-35">/</p>
          <p className="opacity-35">7</p>
        </div>
      </footer>

      {/* Stretched Oval with extra Top/Bottom feathering */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: `
      radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.84) 100%),
      linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 65%, rgba(0,0,0,0.75) 100%)
    `,
          mixBlendMode: "multiply",
        }}
      />

      {/* Slider */}
      <div className="slider relative w-screen h-screen overflow-hidden">
        <div className="slide absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              willChange: "clip-path",
            }}
          >
            <img
              src="/images/programCarousel/bg1.png"
              alt=""
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/12.5" />
          </div>
        </div>

        {/* Container positioned to the center, containing all three cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[23%] -translate-y-28 flex items-end gap-8 z-10 w-max ">
          {/* 1. MAIN CENTRE CARD (Your exact size) */}
          <div className="slide-main-img relative w-70 h-105 rounded-2xl border-3 border-[#DFB385] overflow-hidden shadow-2xl cursor-pointer transition-transform duration-300 hover:-translate-y-3">
            <div className="slide-main-img-wrapper h-full w-full">
              <img
                src={`/images/programCarousel/img${currentSlide}.png`}
                alt=""
                className="w-full h-full object-cover object-center"
                style={{ willChange: "transform" }}
              />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] z-10" />
            </div>
          </div>

          {/* 2. SECOND CARD (+1) */}
          <div
            onClick={() => clickToSlide((currentSlide % totalSlides) + 1)}
            className="slide-next-img relative w-[220px] h-[330px] rounded-2xl border-2 border-[#DFB385] overflow-hidden hidden md:block pointer-events-auto cursor-pointer transition-transform duration-300 hover:-translate-y-3"
          >
            <img
              src={`/images/programCarousel/img${(currentSlide % totalSlides) + 1}.png`}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] z-10" />
          </div>

          {/* 3. THIRD CARD (+2) */}
          <div
            onClick={() => clickToSlide(((currentSlide + 1) % totalSlides) + 1)}
            className="slide-next-next-img relative w-[220px] h-[330px] rounded-2xl border-2 border-[#DFB385] overflow-hidden hidden lg:block pointer-events-auto cursor-pointer transition-transform duration-300 hover:-translate-y-3"
          >
            <img
              src={`/images/programCarousel/img${((currentSlide + 1) % totalSlides) + 1}.png`}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] z-10" />
          </div>
        </div>
        <div className="slide-copy absolute top-[28%] left-[4.5%] text-white z-100 ">
          <div className="slide-title relative w-125 h-20 mb-2 overflow-hidden">
            <h1
              className={`absolute text-white leading-none translate-x-0 uppercase ${slideData[currentSlide - 1].titleFont} ${slideData[currentSlide - 1].titleSize} ${slideData[currentSlide - 1].titleWeight}`}
              style={{ willChange: "transform" }}
            >
              {slideData[currentSlide - 1].title}
            </h1>
          </div>
          <div className="slide-description relative w-125 h-6 mb-3 overflow-hidden">
            <p
              className={`absolute text-white leading-none translate-x-0 ${slideData[currentSlide - 1].descFont} ${slideData[currentSlide - 1].descSize} ${slideData[currentSlide - 1].descWeight}`}
              style={{ willChange: "transform" }}
            >
              {slideData[currentSlide - 1].desc}
            </p>
          </div>

          <div className="flex gap-14 items-center">
            <button
              onClick={handlePrevious}
              disabled={isAnimating.current}
              className="group transition-transform active:scale-95 disabled:opacity-50"
            >
              <img
                src="/images/programCarousel/leftButton.svg"
                alt="Previous"
                className="w-9 h-9 transition-opacity group-hover:opacity-80"
              />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating.current}
              className="group transition-transform active:scale-95 disabled:opacity-50"
            >
              <img
                src="/images/programCarousel/leftButton.svg"
                alt="Next"
                className="w-9 h-9 transition-opacity group-hover:opacity-80 scale-x-[-1]"
              />
            </button>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-2 left-0 w-full px-12 z-20">
        <div className="flex justify-center items-center">
          <div className="flex gap-10">
            {slideTitles.map((title, index) => {
              const slideNumber = index + 1;
              const isActive = currentSlide === slideNumber;

              return (
                <button
                  key={index}
                  onClick={() => goToSlide(slideNumber)}
                  className={`
              text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:text-white
              ${isActive ? "text-[#DFB385] scale-105" : "text-white/80"}
              ${kiwi.className} 
            `}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProgramCarousel;
