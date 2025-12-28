
import React, { useState, useEffect } from 'react';
import { QUIZ_FLOW } from '../constants';
import { UserAnswers, QuizInput } from '../types';
import { Button } from './Button';

interface QuizProps {
  onComplete: (answers: UserAnswers) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  
  // Local state for the current page inputs
  const [currentInputs, setCurrentInputs] = useState<UserAnswers>({});

  const page = QUIZ_FLOW[currentIndex];
  const progress = ((currentIndex + 1) / QUIZ_FLOW.length) * 100;

  // Initialize defaults for sliders when page changes
  useEffect(() => {
    const defaults: UserAnswers = {};
    page.inputs.forEach(input => {
      if (answers[input.id]) {
        defaults[input.id] = answers[input.id];
      } else if (input.type === 'slider') {
        defaults[input.id] = Math.floor(((input.max || 100) + (input.min || 0)) / 2);
      } else if (input.type === 'text' || input.type === 'email') {
        defaults[input.id] = '';
      }
    });
    setCurrentInputs(defaults);
  }, [currentIndex, page]);

  const handleInputChange = (inputId: string, value: string | number) => {
    const updatedInputs = { ...currentInputs, [inputId]: value };
    setCurrentInputs(updatedInputs);

    // Auto-advance for radio buttons if it's the only input on the page
    if (page.inputs.length === 1 && page.inputs[0].type === 'radio') {
       setTimeout(() => handleNext(updatedInputs), 250);
    }
  };

  const handleNext = (overrideInputs?: UserAnswers) => {
    const inputsToSave = overrideInputs || currentInputs;
    
    // Validate inputs
    for (const input of page.inputs) {
      const val = inputsToSave[input.id];
      if (input.type !== 'slider' && (!val || val === '')) {
         // Simple validation: just don't proceed if empty
         // In a real app, show error state
         return; 
      }
    }

    const newAnswers = { ...answers, ...inputsToSave };
    setAnswers(newAnswers);

    if (currentIndex < QUIZ_FLOW.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const renderInput = (input: QuizInput) => {
    const value = currentInputs[input.id];

    switch (input.type) {
      case 'text':
      case 'email':
        return (
          <div key={input.id} className="mb-4">
             {input.label && <label className="block text-slate-400 text-sm mb-2 font-bold uppercase tracking-wide">{input.label}</label>}
             <input
               type={input.type}
               placeholder={input.placeholder}
               value={value as string}
               onChange={(e) => handleInputChange(input.id, e.target.value)}
               className="w-full bg-[#050907]/50 border border-slate-700 text-slate-100 p-4 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
               autoFocus={page.inputs.length === 1 || input.id === 'nome'}
             />
          </div>
        );
      
      case 'radio':
        return (
          <div key={input.id} className="space-y-3">
             {input.label && <p className="text-slate-400 text-sm mb-2">{input.label}</p>}
             {input.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleInputChange(input.id, option.value)}
                  className={`w-full p-4 flex items-center border rounded-2xl transition-all duration-300 group text-left ${
                    value === option.value 
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' 
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08] hover:border-amber-400/30'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                    value === option.value ? 'border-amber-400' : 'border-slate-600'
                  }`}>
                    {value === option.value && <div className="w-3 h-3 bg-amber-400 rounded-full" />}
                  </div>
                  <span className={`text-lg font-medium transition-colors ${
                    value === option.value ? 'text-amber-100' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {option.label}
                  </span>
                </button>
             ))}
          </div>
        );

      case 'slider':
        return (
          <div key={input.id} className="mb-8 last:mb-0">
             <div className="text-center space-y-4">
                {input.label && <p className="text-slate-300 text-lg font-medium">{input.label}</p>}
                
                <div className="text-5xl font-serif font-black text-amber-400 tracking-tighter drop-shadow-lg">
                  {value}
                  <span className="text-xl text-slate-500 font-sans font-medium ml-1">{input.unit}</span>
                </div>
                
                <div className="px-2">
                  <input 
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step || 1}
                    value={value as number || 0}
                    onChange={(e) => handleInputChange(input.id, Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                
                <div className="flex justify-between text-xs text-slate-500 font-medium px-1 uppercase tracking-wide">
                  <span>Min: {input.min}</span>
                  <span>Max: {input.max}</span>
                </div>
             </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const showNextButton = page.inputs.some(i => i.type !== 'radio');

  return (
    <div className="w-full max-w-lg mx-auto min-h-[60vh] flex flex-col justify-center relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 -right-20 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>

      {/* Progress Bar */}
      <div className="mb-8 px-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
          <span>Fase {currentIndex + 1}</span>
          <span>{QUIZ_FLOW.length} Etapas</span>
        </div>
        <div className="w-full bg-slate-800/50 rounded-full h-1.5 backdrop-blur-sm overflow-hidden border border-white/5">
          <div 
            className="bg-gradient-to-r from-emerald-600 to-amber-400 h-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-[0_0_10px_rgba(252,211,77,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Dark Glass Card */}
      <div key={currentIndex} className="bg-[#0f1211]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-6 md:p-8 animate-fade-in-up ring-1 ring-white/5 relative overflow-hidden">
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-100 mb-6 text-center leading-snug tracking-tight">
          {page.title.includes('nome') && answers['nome'] 
            ? page.title.replace('[Nome]', answers['nome'] as string)
            : page.title
          }
        </h2>

        <div className="relative z-10">
          {page.inputs.map(renderInput)}

          {showNextButton && (
            <Button 
              onClick={() => handleNext()} 
              fullWidth 
              variant="primary" 
              className="mt-6 !bg-amber-500 hover:!bg-amber-600 !text-black font-bold"
            >
              Continuar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
