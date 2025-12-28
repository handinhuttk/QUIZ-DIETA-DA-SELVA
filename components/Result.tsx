import React from 'react';
import { AnalysisResult } from '../types';
import { Button } from './Button';

interface ResultProps {
  data: AnalysisResult;
  onNext: () => void;
}

// Componente Visual de Gráfico de Radar (SVG Puro)
const RadarChart: React.FC<{ scores: AnalysisResult['scores'] }> = ({ scores }) => {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  
  // Normalizar scores para o gráfico (Inflamação é invertido visualmente: quanto menor o raio, melhor, mas aqui queremos mostrar a intensidade do problema)
  const data = [
    scores.energia,    // Topo
    scores.autoestima, // Direita
    scores.inflamacao, // Baixo
    scores.sono        // Esquerda
  ];

  const labels = ["ENERGIA", "AUTOESTIMA", "INFLAMAÇÃO", "SONO"];
  
  // Helper para calcular pontos
  const getPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = data.map((val, i) => getPoint(val, i, 4)).map(p => `${p.x},${p.y}`).join(' ');
  const bgPoints = [100, 100, 100, 100].map((val, i) => getPoint(val, i, 4)).map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#334155" strokeWidth="1" opacity="0.5" />
        <circle cx={center} cy={center} r={radius * 0.75} fill="none" stroke="#334155" strokeWidth="1" opacity="0.3" />
        <circle cx={center} cy={center} r={radius * 0.5} fill="none" stroke="#334155" strokeWidth="1" opacity="0.3" />
        <circle cx={center} cy={center} r={radius * 0.25} fill="none" stroke="#334155" strokeWidth="1" opacity="0.3" />
        
        {/* Axes */}
        {[0, 1, 2, 3].map(i => {
           const p = getPoint(100, i, 4);
           return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#334155" opacity="0.5" />;
        })}

        {/* Data Path */}
        <polygon points={points} fill="rgba(16, 185, 129, 0.4)" stroke="#10B981" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
        
        {/* Data Points */}
        {data.map((val, i) => {
          const p = getPoint(val, i, 4);
          return <circle key={i} cx={p.x} cy={p.y} r="3" fill="#FCD34D" />;
        })}
      </svg>
      
      {/* Labels positioned absolutely */}
      <div className="absolute top-0 text-[10px] font-bold text-amber-400 -mt-2 bg-black/50 px-1 rounded">ENERGIA</div>
      <div className="absolute right-0 top-1/2 text-[10px] font-bold text-blue-400 -mr-6 translate-y-[-50%] bg-black/50 px-1 rounded">ESTIMA</div>
      <div className="absolute bottom-0 text-[10px] font-bold text-red-400 -mb-2 bg-black/50 px-1 rounded">INFLAMAÇÃO</div>
      <div className="absolute left-0 top-1/2 text-[10px] font-bold text-purple-400 -ml-4 translate-y-[-50%] bg-black/50 px-1 rounded">SONO</div>
    </div>
  );
};

export const Result: React.FC<ResultProps> = ({ data, onNext }) => {
  
  // Imagens baseadas no tipo (apenas ilustrativo)
  const getProfileImage = () => {
    switch(data.tipo_metabolico) {
      case 'A': return "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=600&auto=format&fit=crop"; // Mulher fit/stress
      case 'B': return "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop"; // Corpo/Exercicio
      default: return "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"; // Geral
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in-up">
      <div className="flex justify-center mb-6">
        <span className="bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Diagnóstico Completo
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Coluna Esquerda: Perfil Visual (4 colunas) */}
        <div className="lg:col-span-4 space-y-4">
            
            {/* Card do Avatar/Raio-X */}
            <div className="bg-[#0b100e] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative h-80 lg:h-96 group">
                <img 
                    src={getProfileImage()} 
                    alt="Perfil Metabólico" 
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                {/* Overlay de Scan */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(16,185,129,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1">Seu Arquétipo</div>
                    <h2 className="text-3xl font-black text-white font-serif leading-none mb-2">TIPO {data.tipo_metabolico}</h2>
                    <p className="text-slate-300 text-sm border-l-2 border-emerald-500 pl-3">{data.titulo_perfil}</p>
                </div>
            </div>

            {/* Radar Chart Card */}
            <div className="bg-[#0b100e]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-amber-500"></div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Mapeamento Biológico</h3>
                <RadarChart scores={data.scores} />
            </div>

        </div>

        {/* Coluna Direita: Texto e Dados (8 colunas) */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* Cards de Métricas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-emerald-500 text-xs font-bold uppercase mb-1">Meta 21 Dias</span>
                    <span className="text-3xl font-black text-white font-serif">-{data.expectativa_kg}<span className="text-lg text-slate-500">kg</span></span>
                </div>
                <div className="bg-amber-900/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-amber-500 text-xs font-bold uppercase mb-1">Inflamação</span>
                    <span className="text-2xl font-black text-white font-serif">{data.scores.inflamacao > 70 ? 'ALTA' : 'MÉDIA'}</span>
                </div>
                <div className="col-span-2 md:col-span-1 bg-blue-900/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-blue-400 text-xs font-bold uppercase mb-1">Estratégia</span>
                    <span className="text-sm font-bold text-white leading-tight">{data.foco_principal}</span>
                </div>
            </div>

            {/* Texto do Diagnóstico */}
            <div className="bg-[#0b100e]/90 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative">
                <div className="absolute -top-3 -right-3">
                    <span className="relative flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-500 items-center justify-center text-[10px] font-bold text-black">!</span>
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-serif">
                    <span className="text-2xl">📋</span> Laudo da Especialista
                </h3>
                
                <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base text-justify font-light">
                    {data.descricao_detalhada.split('\n').map((paragraph, idx) => (
                        paragraph.trim() && (
                        <p key={idx} className={`${idx === 0 ? 'text-white font-medium' : ''}`}>
                            {paragraph}
                        </p>
                        )
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Recomendações Imediatas:</h4>
                    <ul className="grid md:grid-cols-2 gap-3">
                        {data.recomendacoes.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-400 bg-black/20 p-2 rounded-lg">
                                <span className="text-emerald-500 font-bold">✓</span> {rec}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Button onClick={onNext} fullWidth variant="secondary" className="text-lg font-bold py-5 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-shadow">
               ACESSAR MEU PROTOCOLO AGORA
            </Button>
            <p className="text-center text-[10px] text-slate-600 mt-2 uppercase tracking-wide">Relatório gerado via Inteligência Artificial Ancestral</p>

        </div>
      </div>
    </div>
  );
};