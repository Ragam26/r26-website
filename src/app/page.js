import PolaroidPage from "../pageComponents/polaroid/page";
import LandingPage from "@/pageComponents/landing/LandingPage";
import Legacy from "@/pageComponents/legacy/Legacy";
import ProshowSection from "@/pageComponents/proshow/proshow";
import ProgramCarousel from "@/pageComponents/carousel/ProgramCarousel";
import EventCard from "@/components/common/Card/EventCardLong";

export default function Home() {
  return (
    <>
      {" "}
      <LandingPage />
      <PolaroidPage />
      <ProshowSection />
      <ProgramCarousel />
      <Legacy />
    </>
  );
}
