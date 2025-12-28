import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 animate-fade-in">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="relative w-full h-full bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-xl flex items-center justify-center">
           <span className="text-5xl animate-bounce grayscale opacity-80">🧬</span>
        </div>
        {/* Ring Spinner */}
        <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <div className="space-y-3 z-10">
        <h2 className="text-3xl font-bold text-slate-200 tracking-tight font-serif">Processando Dados...</h2>
        <p className="text-slate-500 text-lg">A I.A. do Protocolo da Selva está analisando seu perfil.</p>
      </div>

      <div className="w-full max-w-sm bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
          <span className="text-sm font-medium text-slate-400">Mapeando tipo metabólico</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-300"></div>
          <span className="text-sm font-medium text-slate-400">Calculando índice inflamatório</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-700"></div>
          <span className="text-sm font-medium text-slate-400">Gerando estratégia personalizada</span>
        </div>
      </div>
    </div>
  );
};