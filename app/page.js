import Image from "next/image";
import RestaurantCard from "./components/RestaurentCard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filter from "./components/Filter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Navbar */}
      <Navbar />
      <div className="h-10"></div>
      {/* Main Content */}
      <Hero />

         <div className="w-[100%] h-auto bg-[#111827] flex justify-center text-white">
        <div className="w-[80%] flex justify-evenly mb-5">
          <div className="w-80 h-auto flex flex-col gap-3">
            <h1 className="mt-3 mb-4 font-bold">Crave bot</h1>
            <p className="text-amber-100">Al-powered restaurant menu search that understands your cravings and mood, not just keywords.</p>
          </div>
          <div className="w-80 h-auto flex flex-col gap-3 cursor-pointer">
            <h1 className="mt-3 mb-4 font-bold">Quick Links</h1>
            <h4>Home</h4>
            <h4>How It Works</h4>
            <h4>Partne Restaurants</h4>
            <h4>Contact Us</h4>
          </div>
          <div className="w-80 h-auto flex flex-col gap-3 cursor-pointer">
            <h1 className="mt-3 mb-4 font-bold">Contact Us</h1>
            <h5>Have question or feedback?</h5>
            <a>hello@cravebots.cpm</a>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
