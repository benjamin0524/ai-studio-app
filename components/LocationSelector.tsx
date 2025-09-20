import React from 'react';
import { LOCATION_OPTIONS } from '../constants';

interface LocationSelectorProps {
    selectedLocation: string | null;
    onSelect: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center">
            <button
                onClick={() => onSelect('current')}
                className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
                    selectedLocation === 'current'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
            >
                📍 使用目前位置
            </button>
            {LOCATION_OPTIONS.map(location => {
                const isSelected = selectedLocation === location;
                return (
                    <button
                        key={location}
                        onClick={() => onSelect(location)}
                        className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                            isSelected
                                ? 'bg-teal-500 text-gray-900 shadow-lg'
                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                    >
                        {location}
                    </button>
                );
            })}
        </div>
    );
};

export default LocationSelector;
