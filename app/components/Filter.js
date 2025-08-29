"use client"; // sabse upar likhna zaroori hai

import { useState } from "react";

const Filter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Filter Button */}
      <button
        className="cursor-pointer font-bold bg-[#4CAF50] text-white px-3 py-1 rounded-3xl"
        onClick={() => setOpen(!open)}
      >
        Filter
      </button>

      {/* Agar open = true hai to options dikhaye */}
      {open && (
        <div className="flex flex-wrap gap-2 w-[50%] mt-2">
          <span className="bg-[#393E46] text-white px-2 py-1 rounded-2xl cursor-pointer">
            Spicy
          </span>
          <span className="bg-[#393E46] text-white px-2 py-1 rounded-2xl cursor-pointer">
            Vegetarian
          </span>
          <span className="bg-[#393E46] text-white px-2 py-1 rounded-2xl cursor-pointer">
            Vegan
          </span>
          <span className="bg-[#393E46] text-white px-2 py-1 rounded-2xl cursor-pointer">
            Gluten-Free
          </span>
          <span className="bg-[#393E46] text-white px-2 py-1 rounded-2xl cursor-pointer">
            Popular Items
          </span>
        </div>
      )}
    </div>
  );
};

export default Filter;
