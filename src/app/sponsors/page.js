import Sponsors from "@/components/common/sponsors/Sponsors";

export default function SponsorsPage() {
  return (
    <div className="pt-20 md:pt-32 pb-6 md:pb-16 flex flex-col items-center justify-center px-4 gap-6">
      <div className="w-full max-w-5xl">
        <Sponsors />
      </div>
    </div>
  );
}