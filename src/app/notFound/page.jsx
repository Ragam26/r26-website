import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      
      <h1 className="text-7xl font-bold mb-6">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Page Not Found
      </h2>

      <p className="text-white/70 max-w-md mb-8">
        The page you are looking for doesn’t exist or is still being prepared.
      </p>

      <Link
        href="/"
        className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
