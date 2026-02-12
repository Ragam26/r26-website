import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata = {
  title: "Ragam 2026",
  description:
    "Official website of Ragam 2026, South India's biggest cultural fest!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {" "}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
