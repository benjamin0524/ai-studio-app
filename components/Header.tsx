
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8 md:mb-16 w-full">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400 pb-2">
                AI 美食決定器
            </h1>
            <p className="text-gray-400 text-lg">不知道吃什麼？讓 AI 幫你搞定！</p>
        </header>
    );
};

export default Header;
