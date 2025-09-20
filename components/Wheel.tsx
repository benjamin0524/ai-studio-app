
import React, { useState, useRef, useEffect } from 'react';

interface WheelProps {
    items: string[];
    onFinish: (selectedItem: string) => void;
}

const Wheel: React.FC<WheelProps> = ({ items, onFinish }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const spinButtonRef = useRef<HTMLButtonElement>(null);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        const newRotation = rotation + 360 * 5 + Math.random() * 360;
        setRotation(newRotation);

        if (spinButtonRef.current) {
            spinButtonRef.current.disabled = true;
        }

        setTimeout(() => {
            const finalAngle = newRotation % 360;
            const itemAngle = 360 / items.length;
            const selectedIndex = Math.floor((360 - finalAngle + itemAngle / 2) % 360 / itemAngle);
            onFinish(items[selectedIndex]);
            setIsSpinning(false);
            if (spinButtonRef.current) {
                spinButtonRef.current.disabled = false;
            }
        }, 6000);
    };
    
    useEffect(() => {
        // Automatically spin on mount
        const timer = setTimeout(spin, 500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const segmentAngle = 360 / items.length;
    const colors = ['#4fd1c5', '#6b46c1', '#f56565', '#ed8936', '#4299e1', '#38b2ac'];

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                <div 
                    className="absolute w-full h-full rounded-full border-8 border-gray-700 shadow-2xl"
                    style={{
                        transition: 'transform 6s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: `rotate(${rotation}deg)`
                    }}
                    ref={wheelRef}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="absolute w-1/2 h-1/2"
                            style={{
                                transform: `rotate(${index * segmentAngle}deg)`,
                                transformOrigin: '100% 100%',
                                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 0)`,
                                backgroundColor: colors[index % colors.length],
                            }}
                        >
                            <div
                                className="absolute w-full h-full flex items-center justify-center"
                                style={{
                                    transform: `rotate(${segmentAngle / 2}deg) translate(-25%, -25%)`,
                                    transformOrigin: '50% 50%',
                                }}
                            >
                                <span className="text-gray-900 font-bold text-sm md:text-base">{item}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-red-500" style={{ top: '-10px' }}></div>
                 <button 
                    ref={spinButtonRef}
                    onClick={spin}
                    className="absolute w-20 h-20 rounded-full bg-white text-gray-900 font-bold text-lg flex items-center justify-center shadow-inner z-10 border-4 border-gray-400 disabled:opacity-50 disabled:cursor-wait"
                 >
                    Spin!
                </button>
            </div>
        </div>
    );
};

export default Wheel;
