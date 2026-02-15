import PolaroidPage from "./schedule/polaroid/page";
import LandingPage from "@/pageComponents/landing/LandingPage";
import Legacy from "@/pageComponents/legacy/Legacy";
import ProshowSection from "@/pageComponents/proshow/proshow";

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
