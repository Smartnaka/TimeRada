
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-slate-700">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter">
          <span className="text-cyan-400">Trend</span> Radar
        </h1>
        <p className="text-slate-400 mt-2">
          Scan X trends and generate viral tweet angles with AI.
        </p>
      </div>
    </header>
  );
};

export default Header;
