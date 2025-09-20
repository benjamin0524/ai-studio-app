import React, { useState, useCallback, useMemo } from 'react';
import type { AppState, Restaurant, Mood, Budget } from './types';
import { CUISINES, MOODS, BUDGET_OPTIONS } from './constants';
import { getRestaurantRecommendations } from './services/geminiService';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import CuisineSelector from './components/CuisineSelector';
import MoodSelector from './components/MoodSelector';
import BudgetSelector from './components/BudgetSelector';
import RestaurantCard from './components/RestaurantCard';
import LoadingSpinner from './components/LoadingSpinner';
import Wheel from './components/Wheel';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('start');
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [selectedBudget, setSelectedBudget] = useState<Budget>('不限');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'rating' | 'priceRange'>('rating');

    const handleCuisineSelect = (cuisineName: string) => {
        setSelectedCuisines(prev =>
            prev.includes(cuisineName)
                ? prev.filter(c => c !== cuisineName)
                : [...prev, cuisineName]
        );
    };

    const findRestaurants = useCallback(async (cuisines: string[], location: string | null) => {
        if (!location) {
            setError('請選擇一個用餐地區！');
            return;
        }
        if (cuisines.length === 0) {
            setError('請至少選擇一種料理！');
            return;
        }
        setError(null);
        setAppState('loading');
        try {
            const results = await getRestaurantRecommendations(
                cuisines,
                selectedMood,
                selectedBudget,
                location
            );
            setRestaurants(results);
            setAppState('results');
        } catch (err) {
            console.error(err);
            setError('無法取得建議，請稍後再試。');
            setAppState('solo');
        }
    }, [selectedMood, selectedBudget]);

    const handleWheelFinish = (cuisineName: string) => {
        setTimeout(() => {
            // Random mode should use current location
             findRestaurants([cuisineName], 'current');
        }, 1000);
    };

    const reset = () => {
        setAppState('start');
        setSelectedCuisines([]);
        setSelectedMood(null);
        setSelectedBudget('不限');
        setSelectedLocation(null);
        setRestaurants([]);
        setError(null);
    };

    const sortedRestaurants = useMemo(() => {
        return [...restaurants].sort((a, b) => {
            if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            if (sortBy === 'priceRange') {
                const priceOrder = { '便宜': 1, '中等': 2, '高級': 3 };
                return priceOrder[a.priceRange] - priceOrder[b.priceRange];
            }
            return 0;
        });
    }, [restaurants, sortBy]);

    const renderContent = () => {
        switch (appState) {
            case 'start':
                return (
                    <div className="text-center animate-fade-in">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-teal-300">今天想怎麼吃？</h2>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <button onClick={() => setAppState('solo')} className="bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                                幫我推薦
                            </button>
                            <button onClick={() => setAppState('random')} className="bg-purple-500 hover:bg-purple-400 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
                                隨便！交給命運
                            </button>
                        </div>
                    </div>
                );
            case 'solo':
                return (
                    <div className="w-full max-w-4xl mx-auto animate-fade-in-up space-y-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-center text-teal-300">1. 在哪裡吃？</h3>
                            <LocationSelector selectedLocation={selectedLocation} onSelect={setSelectedLocation} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-center text-teal-300">2. 想吃什麼種類的料理？ (可複選)</h3>
                            <CuisineSelector selectedCuisines={selectedCuisines} onSelect={handleCuisineSelect} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-center text-teal-300">3. 今天是什麼心情？</h3>
                            <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-center text-teal-300">4. 預算多少？</h3>
                            <BudgetSelector selectedBudget={selectedBudget} onSelect={setSelectedBudget} />
                        </div>
                        {error && <p className="text-red-400 text-center my-4">{error}</p>}
                        <div className="text-center pt-4">
                            <button onClick={() => findRestaurants(selectedCuisines, selectedLocation)} className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-3 px-12 rounded-lg text-xl transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={selectedCuisines.length === 0 || !selectedLocation}>
                                尋找餐廳
                            </button>
                        </div>
                         <div className="text-center pt-2">
                            <button onClick={reset} className="text-gray-400 hover:text-white">返回</button>
                        </div>
                    </div>
                );
            case 'random':
                return (
                    <div className="w-full flex flex-col items-center animate-fade-in">
                        <h2 className="text-2xl font-bold mb-8 text-purple-300">命運轉盤，轉出你的下一餐！</h2>
                        <Wheel items={CUISINES.map(c => c.name)} onFinish={handleWheelFinish} />
                         <p className="text-gray-400 mt-4 text-sm">隨機模式將會使用您目前的位置來尋找餐廳。</p>
                        <button onClick={() => setAppState('start')} className="mt-8 text-gray-400 hover:text-white">返回</button>
                    </div>
                );
            case 'loading':
                return <LoadingSpinner />;
            case 'results':
                return (
                    <div className="w-full max-w-5xl mx-auto animate-fade-in">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-teal-300 mb-4 md:mb-0">AI 推薦結果</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400">排序方式:</span>
                                <button onClick={() => setSortBy('rating')} className={`px-4 py-2 rounded-md ${sortBy === 'rating' ? 'bg-teal-500 text-gray-900' : 'bg-gray-700'}`}>評價最高</button>
                                <button onClick={() => setSortBy('priceRange')} className={`px-4 py-2 rounded-md ${sortBy === 'priceRange' ? 'bg-teal-500 text-gray-900' : 'bg-gray-700'}`}>價格</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedRestaurants.map(r => <RestaurantCard key={r.name} restaurant={r} />)}
                        </div>
                        <div className="text-center mt-12">
                            <button onClick={reset} className="bg-purple-500 hover:bg-purple-400 text-gray-900 font-bold py-3 px-12 rounded-lg text-xl transition-transform transform hover:scale-105">
                                再試一次
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 flex flex-col items-center">
            <Header />
            <main className="flex-grow w-full flex items-center justify-center">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;