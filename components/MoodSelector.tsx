
import React from 'react';
import type { Mood } from '../types';
import { MOODS } from '../constants';

interface MoodSelectorProps {
    selectedMood: Mood | null;
    onSelect: (mood: Mood | null) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MOODS.map(mood => {
                const isSelected = selectedMood?.name === mood.name;
                return (
                    <button
                        key={mood.name}
                        onClick={() => onSelect(isSelected ? null : mood)}
                        className={`p-4 rounded-lg text-center transition-all duration-200 transform hover:-translate-y-1 ${
                            isSelected
                                ? 'bg-purple-600 ring-2 ring-purple-300 shadow-lg'
                                : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                    >
                        <div className="text-3xl mb-2">{mood.emoji}</div>
                        <div className="font-semibold">{mood.name}</div>
                    </button>
                );
            })}
        </div>
    );
};

export default MoodSelector;
