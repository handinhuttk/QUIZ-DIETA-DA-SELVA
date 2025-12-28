import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { CHECKOUT_URL } from '../constants';

interface SalesPageProps {
  result: AnalysisResult;
}

export const SalesPage: React.FC<SalesPageProps> = ({ result }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 6); // 6 testimonials total
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = () => {
    if (confirm("Você será redirecionado para o pagamento seguro. Deseja continuar?")) {
        window.location.href = CHECKOUT_URL;
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      name: "Liani Castro",
      msgs: [
        { type: 'in', text: "Comecei o jejum com 75,900kg hj estou com 71,7kg... está um pouco lento porque estou na menopausa, mas vms que vms 💪" },
        { type: 'out', text: "Perdi 4 kg tbm! 😍 Por isso falei q estava super satisfeita com o meu progresso.", time: "11:37" }
      ]
    },
    {
      name: "Fernanda Lima",
      msgs: [
        { type: 'in', text: "Meninas, a calça 42 entrou!!! 😭 Não acredito, estava usando 46 mês passado." },
        { type: 'out', text: "O inchaço sumiu total. Agradeço demais ao protocolo, salvou minha autoestima.", time: "09:12" }
      ]
    },
    {
      name: "Patrícia Gomes",
      msgs: [
        { type: 'in', text: "Meu marido perguntou o que eu fiz. Minha pele limpou e tenho energia pra brincar com as crianças agora." },
        { type: 'out', text: "Era só cansaço antes. Agora acordo 6h da manhã disposta!", time: "14:20" }
      ]
    },
    {
      name: "Juliana Alves",
      msgs: [
        { type: 'in', text: "Já tinha tentado de tudo. Low carb, remédio... estava estagnada há 2 anos." },
        { type: 'out', text: "Em 15 dias de carnívora foram 5kg embora. O jejum destravou meu metabolismo 🙌", time: "18:45" }
      ]
    },
    {
      name: "Marcia Souza",
      msgs: [
        { type: 'in', text: "Anteriormente a calcinha não subia até ao umbigo. Hj a minha calcinha já sobre e fica sem enrolar 😂" },
        { type: 'out', text: "Meu objetivo era só tirar barriga. E estou a conseguir graças a Deus", time: "11:39" }
      ]
    },
    {
      name: "Ana Beatriz",
      msgs: [
        { type: 'in', text: "Sofria muito com azia e refluxo. Em 1 semana de protocolo, sumiu tudo." },
        { type: 'out', text: "O peso é consequência. Perdi 3kg, mas a saúde que ganhei não tem preço.", time: "20:10" }
      ]
    }
  ];

  return (
    <div className="animate-fade-in min-h-screen bg-[#050907] text-slate-200 font-sans -mx-4 md:-mx-0 md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative pb-20">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      <div className="relative z-10 max-w-3xl mx-auto p-6 md:p-10 space-y-12">
        
        {/* Headline */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            Análise Concluída
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#FCD34D] font-serif leading-tight drop-shadow-sm">
            O seu Desafio Detox Carnívoro de 21 dias para Emagrecer Está Pronto
          </h1>
          <p className="text-slate-400">Baseado no seu perfil: <span className="text-white font-bold">{result.titulo_perfil}</span></p>
        </div>

        {/* Deliverables Box */}
        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
          <h3 className="text-xl font-bold text-white mb-6 font-serif">Veja o que você receberá no aplicativo:</h3>
          <ul className="space-y-4">
            {[
              "Protocolos do Detox Carnívoro adaptados para suas necessidades",
              "Suporte Individual no WhatsApp",
              "Plano alimentar personalizado desde o café da manhã até o jantar",
              "Cardápios completos para eliminar gordura",
              "Desafio de 7 dias para eliminar de 4 a 7kg",
              "Acompanhamento do seu desenvolvimento durante 12 meses"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                <div className="mt-1 flex-shrink-0 bg-emerald-500 rounded-full p-0.5">
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
            
        {/* Bonuses Box */}
        <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6 md:p-8 relative">
            <h3 className="text-xl font-bold text-[#FCD34D] mb-6 font-serif text-center">Bônus Exclusivos:</h3>
            <div className="space-y-4">
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-amber-500/10">
                <span className="text-2xl">🎁</span>
                <div className="text-sm">
                <span className="text-[#FCD34D] font-bold">[BÔNUS 1]:</span> Receitas para aliviar sintomas de forma instantânea <span className="text-slate-500 line-through text-xs ml-1">(De R$47,00)</span> <span className="text-emerald-400 font-bold ml-1">por R$00,00</span>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-amber-500/10">
                <span className="text-2xl">🎁</span>
                <div className="text-sm">
                <span className="text-[#FCD34D] font-bold">[BÔNUS 2]:</span> Deliciosas e fáceis receitas emagrecedoras <span className="text-slate-500 line-through text-xs ml-1">(De R$67,00)</span> <span className="text-emerald-400 font-bold ml-1">por R$00,00</span>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-amber-500/10">
                <span className="text-2xl">🎁</span>
                <div className="text-sm">
                <span className="text-[#FCD34D] font-bold">[BÔNUS 3]:</span> 100 receitas de Doces Low Carb <span className="text-slate-500 line-through text-xs ml-1">(De R$37,00)</span> <span className="text-emerald-400 font-bold ml-1">por R$00,00</span>
                </div>
            </div>
            </div>
        </div>

        {/* Offer Section */}
        <div className="bg-[#0b1210] border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 to-transparent"></div>
            
            <h2 className="text-2xl font-serif font-bold text-slate-100 mb-2 relative z-10">DETOX CARNÍVORO</h2>
            <p className="text-slate-400 text-sm mb-6 relative z-10">Desafio completo</p>

            <div className="inline-flex items-end gap-2 mb-4 relative z-10">
            <div className="text-slate-500 line-through text-sm mb-2">De R$ 97</div>
            <div className="flex flex-col items-start leading-none">
                <span className="text-xs text-emerald-400 uppercase font-bold">Por apenas</span>
                <span className="text-5xl font-black text-[#FCD34D] tracking-tighter">R$ 27</span>
            </div>
            <div className="text-slate-500 text-sm mb-1">à vista</div>
            </div>

            {/* Scarcity Notice - Discreto */}
            <div className="mb-6 relative z-10 max-w-sm mx-auto bg-amber-500/5 border border-amber-500/10 rounded-lg p-2">
            <p className="text-[10px] text-amber-100/60 leading-tight">
                <span className="text-amber-500/90 font-bold mr-1">⚠️ Importante:</span>
                Devido à experiência do usuário e acompanhamento personalizado, poucas vagas serão disponibilizadas nesse valor.
            </p>
            </div>

            <button 
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-[#FCD34D] to-[#fbbf24] hover:brightness-110 text-slate-900 font-black text-xl py-5 px-8 rounded-xl shadow-[0_0_20px_rgba(252,211,77,0.3)] transition-all transform hover:scale-[1.02] uppercase tracking-wide mb-4 relative z-10"
            >
            COMEÇAR AGORA
            </button>

            <div className="flex flex-wrap justify-center gap-4 text-[10px] uppercase font-bold text-slate-500 relative z-10">
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Sem mensalidade</span>
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Pagamento único</span>
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Acesso imediato</span>
            </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
          {[
            { day: "7 Dias", height: "40%", label: "Elimina inchaço e gordura", sub: "Vai perder os primeiros 4 a 7kgs" },
            { day: "14 Dias", height: "70%", label: "Desintoxica o Corpo", sub: "Elimina toxinas e células danificadas" },
            { day: "21 Dias", height: "100%", label: "Regulação Hormonal", sub: "Acaba com sintomas e equilibra hormônios" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <span className="text-slate-400 text-xs font-bold uppercase mb-2">{item.day}</span>
              <div className="w-12 h-32 bg-slate-800 rounded-t-lg relative flex items-end justify-center p-1 overflow-hidden border border-slate-700">
                <div 
                  className={`w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all duration-1000 group-hover:brightness-110 shadow-[0_0_10px_rgba(16,185,129,0.3)]`} 
                  style={{ height: item.height }}
                >
                  <span className="text-[10px] font-bold text-emerald-950 w-full text-center block pt-1">{item.height.replace('%', '%')}</span>
                </div>
              </div>
              <p className="text-[#FCD34D] text-[10px] md:text-xs font-bold mt-3 leading-tight px-1">{item.label}</p>
              <p className="text-slate-500 text-[9px] md:text-[10px] leading-tight mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Social Proof (Auto Carousel) */}
        <div className="space-y-6 overflow-hidden">
          <h3 className="text-center text-xl font-serif font-bold text-slate-100">Veja o que nossas alunas estão falando:</h3>
          
          <div className="relative w-full">
             <div 
               className="flex transition-transform duration-700 ease-in-out"
               style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Mobile: 1 item width (100%)
             >
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full md:min-w-[50%] px-2">
                    <div className="bg-[#0b1210] rounded-2xl p-4 border border-slate-800 space-y-4 shadow-inner relative overflow-hidden h-80 md:h-72 flex flex-col justify-between">
                      <div className="absolute top-0 left-0 w-full h-10 bg-[#1f2c34] flex items-center px-4 space-x-3 border-b border-slate-700">
                          <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-[10px] text-white font-bold">{t.name.charAt(0)}</div>
                          <div className="text-xs text-slate-200 font-bold truncate">Grupo VIP - Protocolo da Selva</div>
                      </div>
                      
                      <div className="pt-10 space-y-3 text-xs md:text-sm flex-grow overflow-y-auto">
                          {t.msgs.map((msg, idx) => (
                            <div key={idx} className={`${msg.type === 'out' ? 'bg-[#005c4b] text-white ml-auto' : 'bg-[#1f2c34] text-slate-200'} p-3 rounded-lg max-w-[90%] shadow-sm ${msg.type === 'out' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                              {msg.type === 'in' && <p className="text-emerald-400 text-[10px] font-bold mb-1">~{t.name}</p>}
                              <p>{msg.text}</p>
                              {msg.time && <span className="text-[9px] text-emerald-100/70 block text-right mt-1">{msg.time}</span>}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Carousel Indicators */}
             <div className="flex justify-center gap-2 mt-4">
               {testimonials.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => setCurrentSlide(i)}
                   className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide % 6 === i ? 'bg-[#FCD34D] w-6' : 'bg-slate-700'}`}
                 />
               ))}
             </div>
          </div>
        </div>

        {/* Expert Bio */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 rounded-3xl p-6 border border-white/5">
           <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 relative">
             <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-20"></div>
             <img 
               src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600&auto=format&fit=crop" 
               alt="Amanda Souza" 
               className="w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
             />
           </div>
           <div className="text-center md:text-left space-y-3">
             <h3 className="text-xl font-bold text-[#FCD34D] font-serif">Conheça quem irá montar seu plano personalizado:</h3>
             <div className="text-slate-300 text-sm space-y-2">
               <p className="font-bold text-white">Amanda Souza <span className="font-normal text-slate-400">é reconhecida como uma das principais especialistas em detox carnívoro no Brasil.</span></p>
               <ul className="space-y-1 text-slate-400 text-xs">
                 <li className="flex items-center justify-center md:justify-start gap-2"><span className="text-pink-500">📍</span> Desenvolveu protocolos exclusivos para mais de 20.000 mulheres</li>
                 <li className="flex items-center justify-center md:justify-start gap-2"><span className="text-pink-500">📍</span> 91% de suas alunas relatam resultados visíveis em até 30 dias</li>
                 <li className="flex items-center justify-center md:justify-start gap-2"><span className="text-pink-500">📍</span> Coordenou estudos sobre jejum intermitente e saúde hormonal feminina</li>
               </ul>
             </div>
           </div>
        </div>

        {/* Guarantee */}
        <div className="text-center space-y-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FCD34D] to-[#b45309] rounded-full flex items-center justify-center shadow-lg p-1">
              <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center border-2 border-[#FCD34D]">
                 <span className="text-[#FCD34D] font-black text-2xl leading-none">60</span>
                 <span className="text-[#FCD34D] text-[8px] uppercase font-bold">Dias</span>
              </div>
           </div>
           <div>
             <h3 className="text-lg font-bold text-white mb-2">Garantia de 60 dias de devolução do dinheiro</h3>
             <p className="text-xs text-slate-400 max-w-md mx-auto">
               O nosso plano de jejum intermitente é apoiado por uma garantia de 100% de devolução do dinheiro. Estamos tão confiantes de que o nosso programa o ajudará que garantimos um reembolso total no prazo de 60 dias após a compra.
             </p>
           </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h3 className="text-center text-lg font-bold text-slate-200">Perguntas frequentes de nossas alunas</h3>
          <div className="space-y-2">
            {[
              { q: "No próximo mês tenho que pagar novamente?", a: "Não! O pagamento é único. Você paga apenas essa taxinha e tem acesso vitalício ao plano personalizado para sempre com direito as atualizações." },
              { q: "Posso cancelar se eu não gostar?", a: "Sim! Você tem uma garantia incondicional de 60 dias." },
              { q: "Como vou receber os bônus?", a: "Assim que seu pagamento for confirmado, você receberá um email com o link de acesso a plataforma exclusiva onde todo o material estará disponível." }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/30">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center p-4 text-left text-sm font-medium text-slate-300 hover:text-[#FCD34D] transition-colors"
                >
                  {faq.q}
                  <span className={`text-[#FCD34D] transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs text-slate-400 border-t border-slate-800/50 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating CTA */}
        <div className="sticky bottom-4 z-50 animate-fade-in-up">
          <button 
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg py-4 px-6 rounded-xl shadow-2xl border border-emerald-400/30 uppercase tracking-wide flex items-center justify-center gap-2 animate-bounce-slow"
          >
            QUERO MEU ACESSO AGORA
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
};