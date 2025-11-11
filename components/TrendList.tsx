import React from 'react';
import type { Trend } from '../types';

interface TrendListProps {
  trends: Trend[];
  onSelectTrend: (trend: Trend) => void;
}

const formatVolume = (volume: number | null) => {
    if (volume === null) return 'Trending';
    if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M posts`;
    if (volume >= 1_000) return `${(volume / 1_000).toFixed(0)}K posts`;
    return `${volume} posts`;
};


const TrendList: React.FC<TrendListProps> = ({ trends, onSelectTrend }) => {
  if (trends.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-800 rounded-lg">
        <p className="text-slate-400">No trends found at the moment. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
        {trends.map((trend, index) => (
            <div 
                key={trend.name}
                onClick={() => onSelectTrend(trend)}
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-slate-700 hover:border-cyan-400 transform hover:-translate-y-1"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-slate-400 text-sm">Trending Worldwide</p>
                        <h3 className="text-lg font-bold text-white">{trend.name}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{formatVolume(trend.tweet_volume)}</p>
                </div>
            </div>
        ))}
    </div>
  );
};

export default TrendList;