import React, { useState, useEffect } from "react";
import { AnalysisForm } from "./components/AnalysisForm";
import { AnalysisResult } from "./components/AnalysisResult";
import { LoadingState } from "./components/LoadingState";
import { SplashScreen } from "./components/SplashScreen";
import { InteractiveLogo } from "./components/InteractiveLogo";
import { analyzeCareerFit } from "./services/careerAnalysis";
import { CareerAnalysisResult } from "./types";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [result, setResult] = useState<CareerAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = async (skills: { name: string; level: string }[], company: string, resume?: { data: string; mimeType: string }) => {
    setLoading(true);
    setError(null);
    setCompanyName(company);
    try {
      const data = await analyzeCareerFit(skills, company, resume);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze career fit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCompanyName("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-teal-500/30">
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {!showSplash && (
        <>
          {/* Header */}
          <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={handleReset}>
                <InteractiveLogo size="sm" />
                <h1 className="text-xl font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors">CareerFit Analyst</h1>
              </div>
              {result && (
                <button
                  onClick={handleReset}
                  className="text-sm font-medium text-gray-400 hover:text-teal-400 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Analyze Another
                </button>
              )}
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
            {error && (
              <div className="mb-8 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400 flex items-center justify-center">
                {error}
              </div>
            )}

            {loading ? (
              <LoadingState />
            ) : result ? (
              <AnalysisResult result={result} companyName={companyName} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <AnalysisForm onSubmit={handleAnalyze} isSubmitting={loading} />
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}
