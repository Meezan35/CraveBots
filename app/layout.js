import { Manrope } from "next/font/google";
import "./globals.css";

const poppins = Manrope({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Crave Bot",
  description: "Best restaurant app with Next.js",
  icons: {
    icon: "/public/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
