'use client';

import { Star, Clock, Flame, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

// Define the props interface for the FoodCard component
export interface FoodCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  restaurant: string;
  rating: number;
  prepTime: string;
  spiceLevel?: string;
  dietary?: string[];
  isPopular?: boolean;
}

export default function FoodCard({ 
  id,
  name,
  price,
  description,
  image,
  restaurant,
  rating,
  prepTime,
  spiceLevel,
  dietary,
  isPopular
}: FoodCardProps) {
  return (
    <div 
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
    >
      <div className="h-52 overflow-hidden relative">
      <Image 
  src={image}
  alt={name}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-500"
/>
        {isPopular && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
            Popular
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-16"></div>
        <p className="absolute bottom-3 left-3 text-white font-medium">{restaurant}</p>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors">{name}</h3>
          <span className="font-semibold text-rose-500">${price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="ml-1 text-sm">{prepTime}</span>
          </div>
          {spiceLevel && (
            <div className="flex items-center">
              <Flame className={`h-4 w-4 ${
                spiceLevel === 'Hot' ? 'text-red-500 fill-red-500' : 
                spiceLevel === 'Medium' ? 'text-orange-400 fill-orange-400' : 'text-gray-400'
              }`} />
              <span className="ml-1 text-sm">{spiceLevel}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {dietary && dietary.map((tag: string) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
          <ShoppingBag className="h-4 w-4" />
          <span>Add to Order</span>
        </button>
      </div>
    </div>
  );
}