
export default function SponsorCard({ logo }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl h-28 flex items-center justify-center p-4 transition-transform hover:scale-105 duration-300">
      <img 
        src={logo} 
        alt="Sponsor Logo" 
        className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
      />
    </div>
  );
}