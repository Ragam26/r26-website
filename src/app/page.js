import PolaroidPage from "./schedule/polaroid/page";
import LandingPage from "@/pageComponents/landing/LandingPage";
import Legacy from "@/pageComponents/legacy/Legacy";
import ProshowSection from "@/pageComponents/proshow/proshow";
import ProgramCarousel from "@/pageComponents/ProgramCarousel";

export default function Home() {
  return (
    <>
      {" "}
      {/* <LandingPage />
      <PolaroidPage />
      <Legacy />

      <ProshowSection /> */}
      <ProgramCarousel />
    </>
  );
}
