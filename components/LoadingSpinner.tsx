
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-400"></div>
            <p className="mt-4 text-xl font-semibold text-teal-300">AI 大廚正在為您選菜...</p>
            <p className="text-gray-400">請稍候片刻</p>
        </div>
    );
};

export default LoadingSpinner;
