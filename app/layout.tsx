import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "CraveBots",
  description: "AI-powered restaurant menu search",
  
};

import { ReactNode } from "react";



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
       <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        </head>
        <body className="flex flex-col min-h-screen">
        <Header />

        <main className="max-w-6xl mx-auto p-4 flex-grow">{children}

        </main>
        <Footer />
        </body>
    </html>
  );
}
