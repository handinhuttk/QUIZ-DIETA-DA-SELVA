import React from 'react';
import { Button } from './Button';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 animate-fade-in relative">
      
      {/* Abstract Background Blur Spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="space-y-6 max-w-2xl z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 text-xs font-bold rounded-full shadow-sm tracking-wide uppercase">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Análise Metabólica Ancestral
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black text-slate-100 leading-[1.1] tracking-tight font-serif">
          PROTOCOLO <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">
            DA SELVA
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
          Descubra o código genético do seu corpo e destrave a queima de gordura natural com o método ancestral.
        </p>
      </div>

      <div className="relative w-full max-w-md my-10 group cursor-pointer" onClick={onStart}>
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-900 to-amber-900 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop" 
            alt="Lifestyle Premium" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
             <div className="text-white text-left">
               <p className="font-medium text-amber-400 text-sm tracking-widest uppercase mb-1">Resultado em 2 min</p>
               <p className="font-bold text-2xl font-serif">Mapeamento Genético</p>
             </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 z-10">
        <Button onClick={onStart} fullWidth variant="secondary" className="text-xl py-5 shadow-emerald-900/50">
          Iniciar Análise Gratuita
        </Button>
        <p className="text-xs text-slate-500 font-medium">
          🔒 Seus dados são processados localmente e não são armazenados.
        </p>
      </div>
    </div>
  );
};