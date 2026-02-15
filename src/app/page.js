import PolaroidPage from "./schedule/polaroid/page";
import LandingPage from "@/pages/landing/LandingPage";
import Legacy from "@/pages/legacy/Legacy";
import ProshowSection from "@/pages/proshow/proshow";

export default function Home() {
  return (
    <>
      {" "}
      <LandingPage />
      <PolaroidPage />
      <Legacy />
      <ProshowSection />
    </>
  );
}
