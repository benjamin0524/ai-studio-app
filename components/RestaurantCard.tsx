import React from 'react';
import type { Restaurant } from '../types';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="text-yellow-400">★</span>)}
            {halfStar && <span className="text-yellow-400">☆</span>}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-gray-600">★</span>)}
            <span className="ml-2 text-sm text-yellow-300 font-bold">{rating.toFixed(1)}</span>
        </div>
    );
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    const priceSymbols = {
        '便宜': '$',
        '中等': '$$',
        '高級': '$$$',
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-teal-300 pr-2">{restaurant.name}</h3>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${restaurant.isOpenNow ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {restaurant.isOpenNow ? '營業中' : '休息中'}
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4 text-gray-400 text-sm">
                    <span>{restaurant.cuisine}</span>
                    <div className="flex items-center gap-4">
                        <StarRating rating={restaurant.rating} />
                        <span className="text-white font-semibold">{priceSymbols[restaurant.priceRange]}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-gray-300">{restaurant.address}</p>
                    {restaurant.specialty && <p className="text-sm text-gray-400 mt-1">招牌：{restaurant.specialty}</p>}
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-sm text-blue-400 hover:text-blue-300 hover:underline"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        在 Google Maps 上查看
                    </a>
                </div>
            </div>
            <div className="bg-gray-900/50 p-4 mt-auto">
                <p className="text-sm text-purple-200 font-semibold italic">AI 推薦理由：</p>
                <p className="text-gray-300 text-sm">{restaurant.aiReason}</p>
            </div>
        </div>
    );
};

export default RestaurantCard;