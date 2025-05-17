'use client';

import { useState, useEffect } from 'react';
import SearchInput from '@/components/SearchInput';
import FoodCard from '@/components/FoodCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import menuDatabase from "../data/restauantData.json"



export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Available filters based on our data
  const filters = [
    { id: 'spicy', label: 'Spicy' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'popular', label: 'Popular Items' }
  ];

  // Initialize with all food items on first load
  useEffect(() => {
    setSearchResults(menuDatabase);
  }, []);

  const handleSearch = async (query: string) => {
    // Set loading state
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For this example, we'll simulate a search on our mock database
      
      // Convert query to lowercase for easier matching
      const searchTerms = query.toLowerCase().split(' ');
      const queryLower = query.toLowerCase();
      
      // Extract flavor profiles and characteristics from query
      const hasSweetFlavor = queryLower.includes('sweet');
      const hasSpicyFlavor = queryLower.includes('spicy') || queryLower.includes('hot');
      const hasMildFlavor = queryLower.includes('mild');
      const hasCreamyTexture = queryLower.includes('creamy');
      const hasRedColor = queryLower.includes('red');
      const hasOrangeColor = queryLower.includes('orange');
      
      // Check for key food type searches
      const isChickenSearch = queryLower.includes('chicken');
      const isDessertSearch = queryLower.includes('dessert') || queryLower.includes('sweet');
      const isVegetarianSearch = queryLower.includes('vegetarian') || queryLower.includes('veg ');
      const isVeganSearch = queryLower.includes('vegan');
      
      // Simple search algorithm with improved edge case handling
      const results = menuDatabase.filter(item => {
        // STEP 1: Check item type matching (chicken, vegetarian, vegan, dessert)
        
        // Check for chicken dishes
        if (isChickenSearch) {
          const hasChickenTag = item.tags.includes('chicken');
          const hasChickenInName = item.name.toLowerCase().includes('chicken');
          const hasChickenInDesc = item.description.toLowerCase().includes('chicken');
          
          if (!(hasChickenTag || hasChickenInName || hasChickenInDesc)) {
            return false; // Not a chicken dish, so skip
          }
        }
        
        // Check for vegetarian dishes
        if (isVegetarianSearch && 
            !item.dietary?.includes('vegetarian') && 
            !item.tags?.includes('vegetarian')) {
          return false; // Not vegetarian, so skip
        }
        
        // Check for vegan dishes
        if (isVeganSearch && 
            !item.dietary?.includes('vegan') && 
            !item.tags?.includes('vegan')) {
          return false; // Not vegan, so skip
        }
        
        // Check for desserts/sweet dishes
        if (isDessertSearch) {
          const isDessert = item.tags?.includes('dessert') || 
                           item.tags?.includes('sweet') || 
                           item.description.toLowerCase().includes('sweet') ||
                           item.name.toLowerCase().includes('sweet') ||
                           (item.id === 7); // Chocolate Lava Cake
          
          // If explicitly looking for dessert/sweet items but this isn't one
          if (!isDessert) {
            return false;
          }
        }
        
        // STEP 2: Check for specific flavor profiles and characteristics
        
        // Sweet flavor check - exclude non-sweet if sweet was mentioned
        if (hasSweetFlavor) {
          const hasSweet = item.tags?.includes('sweet') || 
                          item.description.toLowerCase().includes('sweet') ||
                          item.name.toLowerCase().includes('sweet') ||
                          (item.id === 7); // Chocolate Lava Cake
          
          if (!hasSweet) {
            return false; // Not sweet, so skip
          }
        }
        
        // Spicy flavor check
        if (hasSpicyFlavor && 
            item.spiceLevel !== 'Hot' && 
            item.spiceLevel !== 'Medium' && 
            !item.tags?.includes('spicy')) {
          return false; // Not spicy enough, so skip
        }
        
        // Mild flavor check
        if (hasMildFlavor && 
            item.spiceLevel !== 'Mild' && 
            item.spiceLevel !== 'None') {
          return false; // Not mild, so skip
        }
        
        // Creamy texture check
        if (hasCreamyTexture && !item.tags?.includes('creamy')) {
          return false; // Not creamy, so skip
        }
        
        // Color checks
        if (hasRedColor && !item.tags?.includes('red sauce')) {
          return false; // Not red, so skip
        }
        
        if (hasOrangeColor && !item.tags?.includes('orange sauce')) {
          return false; // Not orange, so skip
        }
        
        // Check if this is a red chicken gravy query (special case)
        if (isChickenSearch && queryLower.includes('gravy') && hasRedColor) {
          return item.tags.includes('chicken') && 
                 item.tags.includes('red sauce');
        }
        
        // STEP 3: If we've passed all the specific filters above, check the general terms
        
        // If the search is very specific (has food type AND characteristics), 
        // we've already handled all needed filtering above
        if ((isChickenSearch || isVegetarianSearch || isVeganSearch || isDessertSearch) && 
            (hasSweetFlavor || hasSpicyFlavor || hasMildFlavor || hasCreamyTexture || 
             hasRedColor || hasOrangeColor)) {
          return true;
        }
        
        // General search term matching for less specific queries
        const nameMatch = searchTerms.some(term => 
          item.name.toLowerCase().includes(term)
        );
        
        const descMatch = searchTerms.some(term => 
          item.description.toLowerCase().includes(term)
        );
        
        const tagMatch = item.tags.some(tag => 
          searchTerms.some(term => tag.includes(term))
        );
        
        return nameMatch || descMatch || tagMatch;
      });
      
      // Apply any active filters
      const filteredResults = results.filter(item => {
        if (activeFilters.length === 0) return true;
        
        return activeFilters.every(filter => {
          switch(filter) {
            case 'spicy':
              return item.spiceLevel === 'Hot' || item.spiceLevel === 'Medium' || item.tags?.includes('spicy');
            case 'vegetarian':
              return item.dietary?.includes('vegetarian') || item.tags?.includes('vegetarian');
            case 'vegan':
              return item.dietary?.includes('vegan') || item.tags?.includes('vegan');
            case 'gluten-free':
              return item.dietary?.includes('gluten-free');
            case 'popular':
              return item.isPopular === true;
            default:
              return true;
          }
        });
      });
      
      // Simulate network delay
      setTimeout(() => {
        setSearchResults(filteredResults);
        setIsSearching(false);
      }, 800);
      
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
    }
  };

  const toggleFilter = (filterId: string) => {
    // Update active filters
    setActiveFilters(prev => {
      const newFilters = prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId];
      
      // Reapply filters to current results
      const searchInputElement = document.querySelector('input[type="search"]') as HTMLInputElement;
      const searchQuery = searchInputElement ? searchInputElement.value : '';
      
      if (hasSearched && searchQuery) {
        // Re-run search with current query and new filters
        setTimeout(() => handleSearch(searchQuery), 0);
      } else {
        // Apply filters to all items if no search has been performed
        const filteredResults = menuDatabase.filter(item => {
          if (newFilters.length === 0) return true;
          
          return newFilters.every(filter => {
            switch(filter) {
              case 'spicy':
                return item.spiceLevel === 'Hot' || item.spiceLevel === 'Medium' || item.tags?.includes('spicy');
              case 'vegetarian':
                return item.dietary?.includes('vegetarian') || item.tags?.includes('vegetarian');
              case 'vegan':
                return item.dietary?.includes('vegan') || item.tags?.includes('vegan');
              case 'gluten-free':
                return item.dietary?.includes('gluten-free');
              case 'popular':
                return item.isPopular === true;
              default:
                return true;
            }
          });
        });
        
        setSearchResults(filteredResults);
      }
      
      return newFilters;
    });
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-[#FFF5F1] to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-800">Find Your Perfect </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-indigo-500">Dish</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe exactly what you're craving and our AI will find the perfect dishes for you
          </p>
        </div>
        
        {/* Search Input Component */}
        <div className="mb-8">
          <SearchInput 
            onSearch={handleSearch} 
            examples={[
              "I want to eat chicken gravy which is red in color",
              "Vegetarian dishes with creamy sauce",
              "Spicy food that's ready in under 20 minutes"
            ]} 
          />
        </div>
        
        {/* Filters */}
        <div className="mb-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-gray-700 font-medium mb-3 hover:text-indigo-600 transition-colors"
          >
            Filters {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilters.includes(filter.id)
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Results Area */}
        <div>
          {isSearching ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-rose-500 animate-spin"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-6">
              <p className="font-medium text-gray-700 text-lg">
                {searchResults.length} {hasSearched ? 'results found' : 'dishes available'}
              </p>
              
              {/* Results Cards - Now using our FoodCard component */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((item) => (
                  <FoodCard 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                    restaurant={item.restaurant}
                    rating={item.rating}
                    prepTime={item.prepTime}
                    spiceLevel={item.spiceLevel}
                    dietary={item.dietary}
                    isPopular={item.isPopular}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-medium text-gray-700 mb-2">No results found</p>
              <p className="text-gray-500">Try a different search query or adjust your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}