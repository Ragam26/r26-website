import { forwardRef } from "react";
import Image from "next/image";

const AdjCard = forwardRef(({ id, frontAlt, backText }, ref) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-90 perspective-[1000px]"
      id={id}
      ref={ref}
    >
      <div className="adjcard-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full ">
        <div className="relative w-full h-full transform-3d flip-card-inner">
          <div className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden flip-card-front">
            <Image
              priority
              src="/images/debate/playingCardBack.png"
              width={500}
              height={500}
              alt={frontAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden p-[1em] bg-white transform-[rotateY(180deg)] flip-card-back">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-medium text-black">
              {backText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

AdjCard.displayName = "AdjCard";

export default AdjCard;
