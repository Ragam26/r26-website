"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const ProgramCarousel = () => {
  const totalSlides = 7;
  const [currentSlide, setCurrentSlide] = useState(1);
  const isAnimating = useRef(false);

  const slideTitles = [
    "Field Unit",
    "Astral Convergence",
    "Eclipse Core",
    "Luminous",
    "Serenity",
    "Nebula Point",
    "Horizon",
  ];

  const slideDescriptions = [
    "Concept Art",
    "Soundscape",
    "Experimental Film",
    "Editorial",
    "Music Video",
    "VFX",
    "Set Design",
  ];

  const createSlide = (slideNumber, direction) => {
    const slide = document.createElement("div");
    slide.className = "absolute top-0 left-0 w-full h-full slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "absolute top-0 left-0 w-full h-full";
    slideBgImg.style.willChange = "clip-path";

    const img = document.createElement("img");
    img.src = `./assets/img${slideNumber}.jpeg`;
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
    img.src = `./assets/img${slideNumber}.jpeg`;
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
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    newTitle.className =
      "absolute text-white text-5xl font-normal leading-none uppercase";
    newTitle.style.willChange = "transform";
    // Start 100% down (hidden by overflow-hidden)
    gsap.set(newTitle, { y: "100%" });

    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[slideNumber - 1];
    newDescription.className =
      "absolute text-white text-lg font-light leading-none";
    newDescription.style.willChange = "transform";
    // Start 100% down
    gsap.set(newDescription, { y: "100%" });

    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber;
    newCounter.className = "absolute text-base leading-none opacity-100";
    newCounter.style.willChange = "transform";
    gsap.set(newCounter, { y: "100%" });

    return { newTitle, newDescription, newCounter };
  };

  const animateSlide = (direction) => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    const slider = document.querySelector(".slider");
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper",
    );

    const titleContainer = document.querySelector(".slide-title");
    const descriptionContainer = document.querySelector(".slide-description");
    const counterContainer = document.querySelector(".count");

    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");
    const currentCounter = counterContainer.querySelector("p");

    let nextSlide;
    if (direction === "right") {
      nextSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      nextSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    const newSlide = createSlide(nextSlide, direction);
    const newMainWrapper = createMainImageWrapper(nextSlide, direction);
    const { newTitle, newDescription, newCounter } = createTextElements(
      nextSlide,
      direction,
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);
    counterContainer.appendChild(newCounter);

    gsap.set(newMainWrapper.querySelector("img"), {
      x: direction === "right" ? "-50%" : "50%",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach((el) => el?.remove());

        setCurrentSlide(nextSlide);
        isAnimating.current = false;
      },
    });

    tl.to(
      newSlide.querySelector("div"),
      {
        clipPath:
          direction === "right"
            ? "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0,
    )
      .to(
        currentSlideElement.querySelector("img"),
        {
          scale: 1.5,
          duration: 1.25,
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
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentMainWrapper.querySelector("img"),
        {
          x: direction === "right" ? "50%" : "-50%",
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newMainWrapper.querySelector("img"),
        {
          x: "0%",
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentTitle,
        {
          y: "-100%", // Slide up and out
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newTitle,
        {
          y: "0%", // Slide up into view
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentDescription,
        {
          y: "-100%",
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newDescription,
        {
          y: "0%",
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        currentCounter,
        {
          y: "-100%",
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      )
      .to(
        newCounter,
        {
          y: "0%",
          duration: 1.25,
          ease: CustomEase.create("", ".87,0,.13,1"),
        },
        0,
      );
  };

  const handlePrevious = () => {
    animateSlide("left");
  };

  const handleNext = () => {
    animateSlide("right");
  };

  return (
    <div className="w-full h-full font-sans">
      {/* Footer with counter */}
      <footer className="fixed bottom-0 left-0 w-full p-12 flex justify-between items-center z-[2]">
        <div className="flex text-white text-[15px] font-light">
          <div className="count relative h-[18px] w-6 flex justify-center overflow-hidden">
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

      {/* Navigation Buttons */}
      <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 flex justify-between items-center px-12 z-[3] pointer-events-none">
        <button
          onClick={handlePrevious}
          disabled={isAnimating.current}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating.current}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

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
              src="./assets/img1.jpeg"
              alt=""
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/[0.125]" />
          </div>
        </div>

        <div className="slide-main-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-1/2 z-[2] max-[900px]:w-[75%]">
          <div
            className="slide-main-img-wrapper absolute top-0 left-0 w-full h-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              willChange: "clip-path",
            }}
          >
            <img
              src="./assets/img1.jpeg"
              alt=""
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>

        <div className="slide-copy absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 text-white z-[2] max-[900px]:top-[60%] max-[900px]:left-[60%]">
          <div className="slide-title relative w-[500px] h-[50px] mb-3 overflow-hidden">
            <h1
              className="absolute text-white text-5xl font-normal leading-none translate-x-0"
              style={{ willChange: "transform" }}
            >
              Field Unit
            </h1>
          </div>
          <div className="slide-description relative w-[500px] h-5 overflow-hidden">
            <p
              className="absolute text-white text-lg font-light leading-none translate-x-0"
              style={{ willChange: "transform" }}
            >
              Concept Art
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCarousel;
