export default function SponsorCard({ logo }) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl 
                    h-60 w-full flex items-center justify-center 
                    p-6 shadow-md hover:shadow-xl 
                    transition-all duration-300 hover:scale-105">
      
      {/* White plate */}
      <div className="bg-white rounded-lg w-full h-full flex items-center justify-center p-4">
        <img 
          src={logo} 
          alt="Sponsor Logo" 
          className="max-h-full max-w-full object-contain"
        />
      </div>

    </div>
  );
}