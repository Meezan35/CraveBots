"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import FoodCard from "@/components/FoodCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import menuDatabase from "../data/restauantData.json";

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: "spicy", label: "Spicy" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "popular", label: "Popular Items" },
  ];

  useEffect(() => {
    setSearchResults(menuDatabase);
  }, []);

  const handleSearch = async (query: string, filtersOverride?: string[]) => {
    setIsSearching(true);
    setHasSearched(true);

    const filtersToApply = filtersOverride || activeFilters;

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("API request failed");

      const searchParams = await response.json();
      const queryLower = query.toLowerCase().trim();

      const exactNameMatches = menuDatabase.filter(
        (item) =>
          item.name.toLowerCase() === queryLower ||
          item.name.toLowerCase().includes(queryLower)
      );

      if (exactNameMatches.length > 0) {
        setSearchResults(exactNameMatches);
        return;
      }

      let filteredByDietaryType = menuDatabase;

      if (searchParams.dietaryType) {
        filteredByDietaryType = menuDatabase.filter((item) => {
          if (searchParams.dietaryType === "non-vegetarian") {
            return item.dietaryType === "non-vegetarian";
          } else if (searchParams.dietaryType === "vegetarian") {
            return (
              item.dietaryType === "vegetarian" ||
              item.dietaryType === "vegan"
            );
          } else if (searchParams.dietaryType === "vegan") {
            return item.dietaryType === "vegan";
          }
          return true;
        });
      }

      if (
        searchParams.mainIngredients &&
        searchParams.mainIngredients.length > 0
      ) {
        filteredByDietaryType = filteredByDietaryType.filter((item) =>
          searchParams.mainIngredients.some((ingredient: string) =>
            item.mainIngredients?.some((i) =>
              i.toLowerCase().includes(ingredient.toLowerCase())
            ) ||
            item.tags?.some((tag: string) =>
              tag.toLowerCase().includes(ingredient.toLowerCase())
            )
          )
        );
      }

      let filteredResults = filteredByDietaryType;

      if (searchParams.tags && searchParams.tags.length > 0) {
        filteredResults = filteredByDietaryType.filter((item) =>
          searchParams.tags.some((tag: string) =>
            item.tags?.some(
              (itemTag: string) =>
                itemTag.toLowerCase().includes(tag.toLowerCase()) ||
                tag.toLowerCase().includes(itemTag.toLowerCase())
            )
          )
        );
      }

      if (searchParams.dietary && searchParams.dietary.length > 0) {
        filteredResults = filteredResults.filter((item) =>
          searchParams.dietary.some((d: string) =>
            item.dietary?.includes(d)
          )
        );
      }

      if (searchParams.spiceLevel) {
        filteredResults = filteredResults.filter(
          (item) =>
            item.spiceLevel &&
            item.spiceLevel.toLowerCase() ===
              searchParams.spiceLevel.toLowerCase()
        );
      }

      if (
        searchParams.excludeCategories &&
        searchParams.excludeCategories.length > 0
      ) {
        filteredResults = filteredResults.filter(
          (item) =>
            !searchParams.excludeCategories.some((category: string) =>
              item.tags.includes(category.toLowerCase())
            )
        );
      }

      if (filteredResults.length === 0 && searchParams.dietaryType) {
        filteredResults = filteredByDietaryType;
      }

      const sortedResults = filteredResults.sort((a, b) => {
        const aTagMatches =
          searchParams.tags?.filter((tag: string) =>
            a.tags?.some(
              (itemTag: string) =>
                itemTag.toLowerCase().includes(tag.toLowerCase()) ||
                tag.toLowerCase().includes(itemTag.toLowerCase())
            )
          ).length || 0;

        const bTagMatches =
          searchParams.tags?.filter((tag: string) =>
            b.tags?.some(
              (itemTag: string) =>
                itemTag.toLowerCase().includes(tag.toLowerCase()) ||
                tag.toLowerCase().includes(itemTag.toLowerCase())
            )
          ).length || 0;

        if (aTagMatches !== bTagMatches) {
          return bTagMatches - aTagMatches;
        }

        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });

      // ✅ FINAL FILTERS FROM UI
      let finalResults = sortedResults;

      if (filtersToApply.length > 0) {
        finalResults = sortedResults.filter((item) =>
          filtersToApply.every((filter) => {
            switch (filter) {
              case "spicy":
                return (
                  item.spiceLevel?.toLowerCase() === "hot" ||
                  item.spiceLevel?.toLowerCase() === "medium" ||
                  item.tags?.includes("spicy")
                );
              case "vegetarian":
                return (
                  item.dietary?.includes("vegetarian") ||
                  item.tags?.includes("vegetarian")
                );
              case "vegan":
                return (
                  item.dietary?.includes("vegan") ||
                  item.tags?.includes("vegan")
                );
              case "gluten-free":
                return item.dietary?.includes("gluten-free");
              case "popular":
                return item.isPopular === true;
              default:
                return true;
            }
          })
        );
      }

      setSearchResults(finalResults);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => {
      const newFilters = prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId];

      const searchInputElement = document.querySelector(
        'input[type="search"]'
      ) as HTMLInputElement;
      const searchQuery = searchInputElement?.value || "";

      if (searchQuery.trim()) {
        handleSearch(searchQuery, newFilters);
      } else {
        let filteredResults = menuDatabase;

        if (newFilters.length > 0) {
          filteredResults = menuDatabase.filter((item) =>
            newFilters.every((filter) => {
              switch (filter) {
                case "spicy":
                  return (
                    item.spiceLevel?.toLowerCase() === "hot" ||
                    item.spiceLevel?.toLowerCase() === "medium" ||
                    item.tags?.includes("spicy")
                  );
                case "vegetarian":
                  return (
                    item.dietary?.includes("vegetarian") ||
                    item.tags?.includes("vegetarian")
                  );
                case "vegan":
                  return (
                    item.dietary?.includes("vegan") ||
                    item.tags?.includes("vegan")
                  );
                case "gluten-free":
                  return item.dietary?.includes("gluten-free");
                case "popular":
                  return item.isPopular === true;
                default:
                  return true;
              }
            })
          );
        }

        setSearchResults(filteredResults);
      }

      return newFilters;
    });
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-[#FFF5F1] to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-800">Find Your Perfect </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-indigo-500">
              Dish
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe exactly what you're craving and our AI will find the
            perfect dishes for you
          </p>
        </div>

        <div className="mb-8">
          <SearchInput
            onSearch={(q) => handleSearch(q)}
            examples={[
              "I want to eat chicken gravy which is red in color",
              "Vegetarian dishes with creamy sauce",
              "I want to eat something sweet",
            ]}
          />
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-gray-700 font-medium mb-3 hover:text-indigo-600 transition-colors"
          >
            Filters{" "}
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilters.includes(filter.id)
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {isSearching ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-rose-500 animate-spin"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-6">
              <p className="font-medium text-gray-700 text-lg">
                {searchResults.length}{" "}
                {hasSearched ? "results found" : "dishes available"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((item) => (
                  <FoodCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-medium text-gray-700 mb-2">
                No results found
              </p>
              <p className="text-gray-500">
                Try a different search query or adjust your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
