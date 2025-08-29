"use client";
import Filter from "./Filter";
import Resdata from "../Data";
import RestaurantCard from "./RestaurentCard";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-[#F9FAFB] p-8 rounded-md shadow-lg text-black">
      <h1 className="text-4xl text-black font-bold text-center">
        Find Your Best <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent font-semibold">Dishes</span>
      </h1>
      <p className="text-center mt-2">
        Describe exactly what you're craving and our Al will find the perfect
        dishes for you
      </p>

      <div
        tabIndex="0"
        className=" flex items-center h-13 gap-2 mx-auto mb-6 mt-10 bg- rounded-xl focus-within:ring-2 focus-within:ring-[#FF9800] border-1 shadow-sm"
      >
        <input
          type="text"
          placeholder="Describe your craving"
          className="w-full px-4 py-2  rounded-xl focus:outline-none"
        />
        <button className="bg-[#FF9800] text-white px-5 py-2 rounded-xl mr-4 cursor-pointer hover:text-black">
          Search
        </button>
      </div>

      {/*Filter*/}
      <Filter />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {Resdata.map((res) => (
          <RestaurantCard key={res.id} resData={res} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
