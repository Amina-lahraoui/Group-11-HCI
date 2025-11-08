import React, { useState, useMemo } from 'react';
import PageHeader from './PageHeader';
import type { Restaurant } from '../types';

const dietaryFilters = ['Vegetarian', 'Halal', 'Pescatarian', 'No pork', 'Vegan', 'Kosher', 'No alcohol'] as const;
type DietaryFilter = typeof dietaryFilters[number];

const mockRestaurants: Restaurant[] = [
  { id: 1, name: 'Plant Cafe', category: 'Vegan', rating: 4.8, tags: ['Vegan', 'Vegetarian'], address: '117 Bogwang-ro, Yongsan-gu, Seoul', imageUrl: 'https://picsum.photos/id/1060/400/300', description: 'A cozy and popular spot in Itaewon for delicious, creative vegan brunch, lunch, and dinner options.' },
  { id: 2, name: 'Makan Halal', category: 'Korean', rating: 4.5, tags: ['Halal', 'No alcohol'], address: '52 Usadan-ro 10-gil, Yongsan-gu, Seoul', imageUrl: 'https://picsum.photos/id/102/400/300', description: 'Authentic Halal Korean food near the Seoul Central Mosque, famous for its bulgogi and dakgalbi.' },
  { id: 3, name: 'Baewooja', category: 'Seafood', rating: 4.6, tags: ['Pescatarian'], address: '22-18, Toegye-ro 27-gil, Jung-gu, Seoul', imageUrl: 'https://picsum.photos/id/219/400/300', description: 'A fresh seafood restaurant in the heart of Myeongdong, offering a variety of grilled fish and stews.' },
  { id: 4, name: 'Osegye Hyang', category: 'Korean', rating: 4.4, tags: ['Vegetarian', 'Vegan'], address: '14-5 Insadong 12-gil, Jongno-gu, Seoul', imageUrl: 'https://picsum.photos/id/305/400/300', description: 'Located in Insadong, this restaurant serves traditional Korean temple food, all completely vegan.' },
  { id: 5, name: 'Marrakech Restaurant', category: 'Moroccan', rating: 4.7, tags: ['Halal', 'No alcohol', 'No pork'], address: '49, Itaewon-ro 20-gil, Yongsan-gu, Seoul', imageUrl: 'https://picsum.photos/id/488/400/300', description: 'Experience the flavors of Morocco with authentic tagines and couscous in a vibrant atmosphere.' },
  { id: 6, name: 'Gusto Taco', category: 'Mexican', rating: 4.5, tags: ['Vegetarian', 'No pork'], address: '41 Wausan-ro, Mapo-gu, Seoul', imageUrl: 'https://picsum.photos/id/180/400/300', description: 'Highly-rated taco spot near Hongik University, known for its hand-pressed tortillas and fresh ingredients.' },
];

const RestaurantCard: React.FC<{ restaurant: Restaurant; onClick: () => void; }> = ({ restaurant, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white dark:bg-seoul-blue-dark/50 rounded-lg shadow-md p-4 mb-3 cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl"
    >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-seoul-blue dark:text-white">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.category}</p>
            </div>
            <div className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
                <span>{restaurant.rating.toFixed(1)}</span>
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.tags.map(tag => (
                <span key={tag} className="bg-seoul-ruby/10 text-seoul-ruby dark:bg-seoul-ruby/20 dark:text-red-300 px-2 py-1 text-xs font-semibold rounded-full">{tag}</span>
            ))}
        </div>
    </div>
);

const RestaurantDetailModal: React.FC<{ restaurant: Restaurant; onClose: () => void; }> = ({ restaurant, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="restaurant-name"
        >
            <div 
                className="bg-white dark:bg-seoul-blue-dark rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} aria-label="Close dialog" className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors z-10 p-1 bg-white/50 dark:bg-black/50 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 id="restaurant-name" className="text-2xl font-bold font-poppins text-seoul-blue dark:text-white">{restaurant.name}</h2>
                            <p className="text-md text-gray-500 dark:text-gray-400">{restaurant.category}</p>
                        </div>
                         <div className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold flex-shrink-0 ml-2">
                            <span>{restaurant.rating.toFixed(1)}</span>
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                    </div>
                     <div className="mt-3 flex flex-wrap gap-2">
                        {restaurant.tags.map(tag => (
                            <span key={tag} className="bg-seoul-ruby/10 text-seoul-ruby dark:bg-seoul-ruby/20 dark:text-red-300 px-2 py-1 text-xs font-semibold rounded-full">{tag}</span>
                        ))}
                    </div>
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Address</h3>
                        <p className="text-gray-600 dark:text-gray-300">{restaurant.address}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">About</h3>
                        <p className="text-gray-600 dark:text-gray-300">{restaurant.description}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Naver Reviews (Mock)</h3>
                        <div className="mt-2 space-y-2 text-sm">
                            <p className="text-gray-600 dark:text-gray-300 p-2 bg-gray-100 dark:bg-seoul-blue-dark/50 rounded-md">"The best vegan burger I've ever had! ⭐️⭐️⭐️⭐️⭐️"</p>
                            <p className="text-gray-600 dark:text-gray-300 p-2 bg-gray-100 dark:bg-seoul-blue-dark/50 rounded-md">"A must-visit for anyone, not just vegans. The atmosphere is lovely."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Food: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Set<DietaryFilter>>(new Set());
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const toggleFilter = (filter: DietaryFilter) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const filteredRestaurants = useMemo(() => {
    if (activeFilters.size === 0) {
      return mockRestaurants;
    }
    return mockRestaurants.filter(r => 
      // FIX: Cast `filter` to `DietaryFilter` to fix type inference issue where it was being treated as `unknown`.
      // Also removed an unnecessary cast on `r.tags`.
      Array.from(activeFilters).every(filter => r.tags.includes(filter as DietaryFilter))
    );
  }, [activeFilters]);

  return (
    <div>
      <div className="p-4">
        <PageHeader title="Food Finder" subtitle="Discover restaurants that match your taste." />
      </div>
      
      <div className="p-4 bg-gray-100 dark:bg-seoul-blue-dark/30">
        <h3 className="font-semibold mb-3 text-lg text-gray-700 dark:text-gray-200">Dietary Filters</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryFilters.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                activeFilters.has(filter) 
                ? 'bg-seoul-ruby text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 bg-gray-300 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Naver Map Placeholder</p>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-xl mb-4 text-seoul-blue-dark dark:text-white">
          {filteredRestaurants.length} Restaurants Found
        </h3>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} onClick={() => setSelectedRestaurant(r)} />)
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No restaurants match your filters.</p>
        )}
      </div>

      {selectedRestaurant && <RestaurantDetailModal restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />}
    </div>
  );
};

export default Food;