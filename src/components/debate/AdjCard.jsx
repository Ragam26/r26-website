import { forwardRef, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const AdjCard = forwardRef(({ id, frontAlt, adjData, onOpenModal }, ref) => {
  const backRef = useRef(null);

  const handleClick = useCallback(() => {
    if (!backRef.current || !onOpenModal) return;
    // Back face starts at rotateY=180 (hidden) and animates to 0 (showing).
    // If the current value is < 90 the back is facing the user → card is flipped.
    const rotY = gsap.getProperty(backRef.current, "rotateY");
    if (Math.abs(rotY) < 90) {
      onOpenModal(adjData);
    }
  }, [adjData, onOpenModal]);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-90 perspective-[1000px] pointer-events-auto"
      id={id}
      ref={ref}
      onClick={handleClick}
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
          <div
            ref={backRef}
            className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden transform-[rotateY(180deg)] flip-card-back cursor-pointer"
          >
            <Image
              src={adjData?.image ?? "/images/debate/caTemp.png"}
              alt={adjData?.name ?? "Adjudicator"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

AdjCard.displayName = "AdjCard";

export default AdjCard;
