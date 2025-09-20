
import React from 'react';
import type { Budget } from '../types';
import { BUDGET_OPTIONS } from '../constants';

interface BudgetSelectorProps {
    selectedBudget: Budget;
    onSelect: (budget: Budget) => void;
}

const BudgetSelector: React.FC<BudgetSelectorProps> = ({ selectedBudget, onSelect }) => {
    return (
        <div className="flex justify-center gap-3">
            {BUDGET_OPTIONS.map(budget => {
                const isSelected = selectedBudget === budget;
                return (
                    <button
                        key={budget}
                        onClick={() => onSelect(budget)}
                        className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                            isSelected
                                ? 'bg-yellow-500 text-gray-900'
                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                    >
                        {budget}
                    </button>
                );
            })}
        </div>
    );
};

export default BudgetSelector;
