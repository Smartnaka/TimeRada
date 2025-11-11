
import React from 'react';
import type { Trend, TweetAngle } from '../types';
import LoadingSpinner from './LoadingSpinner';
import CopyButton from './CopyButton';

interface AngleGeneratorProps {
  trend: Trend;
  angles: TweetAngle[];
  isLoading: boolean;
  onGenerate: () => void;
  onBack: () => void;
}

const BackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 4-1.414-1.414a1 1 0 010-1.414l7.707-7.707a1 1 0 011.414 0L21 8m-5 8l2.293-2.293a1 1 0 000-1.414L11 6l-4 4-1.414 1.414a1 1 0 000 1.414l7.707 7.707a1 1 0 001.414 0L21 16" />
    </svg>
);

const AngleGenerator: React.FC<AngleGeneratorProps> = ({ trend, angles, isLoading, onGenerate, onBack }) => {
  return (
    <div className="w-full">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors mb-6"
      >
        <BackIcon />
        Back to Trends
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{trend.name}</h2>
        <p className="text-slate-400">
          Ready to join the conversation? Generate some tweet angles below.
        </p>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-cyan-500 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        <SparklesIcon />
        {isLoading ? 'Generating...' : 'Generate Angles'}
      </button>

      {isLoading && angles.length === 0 && <LoadingSpinner />}
      
      {angles.length > 0 && (
        <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-slate-300">Generated Angles:</h3>
            {angles.map((angle, index) => (
                <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex justify-between items-start space-x-4">
                    <p className="text-white flex-1">{angle.tweet}</p>
                    <div className="flex-shrink-0">
                        <CopyButton textToCopy={angle.tweet} />
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AngleGenerator;
