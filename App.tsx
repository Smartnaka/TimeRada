import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TrendList from './components/TrendList';
import AngleGenerator from './components/AngleGenerator';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchTrends } from './services/trendService';
import { generateTweetAngles } from './services/geminiService';
import type { Trend, TweetAngle } from './types';

const App: React.FC = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [tweetAngles, setTweetAngles] = useState<TweetAngle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trendsScanned, setTrendsScanned] = useState<boolean>(false);

  const handleScanTrends = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTrends = await fetchTrends();
      setTrends(fetchedTrends);
      setTrendsScanned(true);
    } catch (err) {
      setError('Failed to fetch trends. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectTrend = useCallback((trend: Trend) => {
    setSelectedTrend(trend);
    setTweetAngles([]); // Clear previous angles when selecting a new trend
    setError(null);
  }, []);

  const handleGenerateAngles = useCallback(async () => {
    if (!selectedTrend) return;
    setIsLoading(true);
    setTweetAngles([]);
    setError(null);
    try {
      const angles = await generateTweetAngles(selectedTrend.name);
      setTweetAngles(angles);
    } catch (err) {
      setError('Failed to generate angles. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTrend]);
  
  const handleBack = useCallback(() => {
    setSelectedTrend(null);
    setTweetAngles([]);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        
        {!selectedTrend ? (
          <>
            {!trendsScanned ? (
              <div className="text-center">
                <button
                  onClick={handleScanTrends}
                  disabled={isLoading}
                  className="bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors text-lg disabled:bg-slate-600"
                >
                  {isLoading ? 'Scanning...' : 'Scan Trends Now'}
                </button>
              </div>
            ) : (
                isLoading ? <LoadingSpinner /> : <TrendList trends={trends} onSelectTrend={handleSelectTrend} />
            )}
          </>
        ) : (
          <AngleGenerator 
            trend={selectedTrend}
            angles={tweetAngles}
            isLoading={isLoading}
            onGenerate={handleGenerateAngles}
            onBack={handleBack}
          />
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Built with React, Tailwind, and the Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;