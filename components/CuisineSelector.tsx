
import React from 'react';
import { CUISINES } from '../constants';

interface CuisineSelectorProps {
    selectedCuisines: string[];
    onSelect: (cuisineName: string) => void;
}

const CuisineSelector: React.FC<CuisineSelectorProps> = ({ selectedCuisines, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {CUISINES.map(cuisine => {
                const isSelected = selectedCuisines.includes(cuisine.name);
                return (
                    <button
                        key={cuisine.name}
                        onClick={() => onSelect(cuisine.name)}
                        className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                            isSelected
                                ? 'bg-teal-500 text-gray-900 shadow-lg'
                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                    >
                        {cuisine.emoji} {cuisine.name}
                    </button>
                );
            })}
        </div>
    );
};

export default CuisineSelector;
