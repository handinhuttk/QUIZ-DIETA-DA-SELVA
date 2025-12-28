import React, { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Loading } from './components/Loading';
import { Result } from './components/Result';
import { SalesPage } from './components/SalesPage';
import { QuizState, Step, UserAnswers } from './types';
import { analyzeProfile } from './services/geminiService';

const SESSION_KEY = 'protocolo_selva_session';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('LANDING');
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [result, setResult] = useState<QuizState['result']>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const parsed: QuizState = JSON.parse(saved);
        setStep(parsed.currentStep);
        setAnswers(parsed.answers);
        setResult(parsed.result);
      } catch (e) {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const state: QuizState = {
      currentStep: step,
      questionIndex: 0,
      answers,
      result
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  }, [step, answers, result]);

  const handleStart = () => {
    setStep('QUIZ');
  };

  const handleQuizComplete = async (finalAnswers: UserAnswers) => {
    setAnswers(finalAnswers);
    setStep('ANALYZING');
    
    const startTime = Date.now();
    
    try {
        const analysisData = await analyzeProfile(finalAnswers);
        
        const elapsedTime = Date.now() - startTime;
        const minWait = 3000; 
        
        setTimeout(() => {
            setResult(analysisData);
            setStep('RESULT');
        }, Math.max(0, minWait - elapsedTime));

    } catch (error) {
        console.error("Failed to analyze", error);
        alert("Ocorreu um erro na conexão com a IA. Tente novamente.");
        setStep('LANDING');
    }
  };

  const handleGoToOffer = () => {
    setStep('OFFER');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Premium Header - Dark Glass */}
      {step !== 'OFFER' && (
        <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-[#050907]/80 backdrop-blur-lg border-b border-white/5 shadow-lg">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="font-black text-xl tracking-tighter text-slate-100 flex items-center gap-2">
              <span className="text-2xl drop-shadow-md">🦁</span>
              <span className="hidden xs:inline font-serif tracking-tight">PROTOCOLO <span className="text-emerald-500">DA SELVA</span></span>
            </div>
            {step !== 'LANDING' && step !== 'RESULT' && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                AMBIENTE CRIPTOGRAFADO
              </div>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 pt-24 md:pt-32">
        {step === 'LANDING' && <Landing onStart={handleStart} />}
        {step === 'QUIZ' && <Quiz onComplete={handleQuizComplete} />}
        {step === 'ANALYZING' && <Loading />}
        {step === 'RESULT' && result && <Result data={result} onNext={handleGoToOffer} />}
        {step === 'OFFER' && result && <SalesPage result={result} />}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-slate-600 text-sm mt-auto relative z-10 border-t border-white/5 bg-[#050907]">
        <p className="font-medium">© {new Date().getFullYear()} Protocolo da Selva.</p>
        <div className="flex justify-center space-x-6 mt-4 text-xs font-bold uppercase tracking-widest opacity-60">
           <span className="hover:text-slate-400 cursor-pointer transition-colors">Termos</span>
           <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacidade</span>
           <span className="hover:text-slate-400 cursor-pointer transition-colors">Contato</span>
        </div>
      </footer>
    </div>
  );
};

export default App;