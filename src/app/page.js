import Image from "next/image";
import ProshowCard from "@/components/proshowCard";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10">
        Welcome to My Next.js App!
      </h1>
      <ProshowCard />
    </>
  );
}
