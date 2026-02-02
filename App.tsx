import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Timer,
  PlusCircle,
  Smile,
  Sparkles,
  ShoppingCart,
  UtensilsCrossed,
  ClipboardList,
  ShoppingBag,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const DynamicDateBanner = () => {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date();
    const d1 = new Date();
    d1.setDate(today.getDate() - 1);
    const d2 = new Date();
    d2.setDate(today.getDate() - 2);
    const formatDate = (date: Date) => date.getDate().toString().padStart(2, '0');
    setDates([formatDate(d2), formatDate(d1), formatDate(today)]);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-center font-bold text-sm md:text-base sticky top-0 w-full shadow-lg z-50">
      OFERTA VÁLIDA APENAS NOS DIAS {dates.join(', ')}
    </div>
  );
};

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(16 * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex items-center justify-center gap-2 text-orange-600 font-bold text-sm md:text-base my-1 uppercase tracking-wide">
      <Timer size={18} />
      <span>ESSA OFERTA EXPIRA EM {minutes.toString().padStart(2, '0')}:{remainingSeconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

const CTAButton = ({ text, onClick, className = "", showIcon = false }: { text: string, onClick?: () => void, className?: string, showIcon?: boolean }) => (
  <button 
    onClick={onClick}
    className={`w-full md:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 px-6 md:px-10 rounded-2xl shadow-lg transform transition active:scale-95 uppercase text-base md:text-xl flex items-center justify-center gap-3 whitespace-nowrap animate-pulseScale ${className}`}
  >
    {showIcon && <ShoppingBag size={24} className="shrink-0" />}
    {text}
  </button>
);

const SectionTitle: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <h2 className={`text-2xl md:text-3xl font-bold text-brand-primary mb-4 text-center uppercase leading-tight ${className}`}>
    {children}
  </h2>
);

const AccordionItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-800 pr-4 text-sm md:text-base leading-tight">{question}</span>
        <ChevronDown size={20} className={`transform transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 font-regular leading-relaxed text-sm md:text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

const TestimonialCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<number | null>(null);

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    autoPlayRef.current = window.setInterval(next, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
    setTouchStart(null);
    setTouchEnd(null);
    autoPlayRef.current = window.setInterval(next, 4000);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="absolute -inset-10 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl bg-white aspect-[9/16] md:aspect-[4/5] transition-all"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="w-full flex-shrink-0 h-full flex items-center justify-center bg-white p-2">
              <img 
                src={src} 
                alt={`Depoimento ${idx + 1}`} 
                className="w-full h-full object-contain select-none pointer-events-none rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={() => { if(autoPlayRef.current) clearInterval(autoPlayRef.current); prev(); }}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white text-brand-primary p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 border border-gray-100"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={() => { if(autoPlayRef.current) clearInterval(autoPlayRef.current); next(); }}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white text-brand-primary p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 border border-gray-100"
      >
        <ChevronRight size={28} />
      </button>
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { if(autoPlayRef.current) clearInterval(autoPlayRef.current); setCurrentIndex(idx); }}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const offerRef = useRef<HTMLDivElement>(null);

  const scrollToOffer = () => {
    offerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkoutLink = "https://indec-digital.mycartpanda.com/checkout/206586422:1";

  const goToCheckout = () => {
    window.location.href = checkoutLink;
  };

  const recipes = [
    { title: "Ninho de Batatas com Ovos e Frios", time: "10 min", cal: "195 cal", img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769885315/NINHO_DE_BATATA_COM_OVO_ilbjnu.jpg" },
    { title: "Pizza Rápida de Frigideira", time: "18 min", cal: "207 cal", img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884572/PIZZA_DE_FRIGIDEIRA_2_a21q5v.webp" },
    { title: "Omelete de Frios Tostada", time: "9 min", cal: "125 cal", img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884572/OMELETE_DE_FRIOS_wsch4o.webp" },
    { title: "Saladas de Frutas Digestivas", time: "12 min", cal: "120 cal", img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884573/SALADAS_DE_FRUTAS_2_gbcuq4.webp" },
    { title: "Pão Cremoso com Queijo", time: "8 min", cal: "170 cal", img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884572/PAO_CREMOSO_GRATINADO_imhxqn.webp" },
    { title: "Sanduíche Proteico", time: "10 min", cal: "180 cal", img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884575/SANDUICHE_PROTEICO_DE_FRIGIDEIRA_dk49jn.jpg" },
  ];

  const testimonials = [
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884567/DEPO_01_uoghex.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884567/DEPO_02_gfo0ai.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_03_up9aaz.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_04_nc6sot.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_05_i3d7vm.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_07_pidsou.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/DEPO_08_oouo9v.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884569/DEPO_09_drtlln.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884569/DEPO_10_fzklof.webp",
    "https://res.cloudinary.com/drcqck3r9/image/upload/v1769884569/DEPO_11_kc66gc.webp",
  ];

  const whatYouFind = [
    { icon: <PlusCircle size={22} className="text-brand-primary" />, text: "Receitas de até 350 calorias" },
    { icon: <Clock size={22} className="text-brand-primary" />, text: "Máximo 15 minutos de preparo" },
    { icon: <Smile size={22} className="text-brand-primary" />, text: "Saborosas de verdade" },
    { icon: <Sparkles size={22} className="text-brand-primary" />, text: "Proteicas e nutritivas" },
    { icon: <ShoppingCart size={22} className="text-brand-primary" />, text: "Com ingredientes simples" },
    { icon: <UtensilsCrossed size={22} className="text-brand-primary" />, text: "Usando liquidificador e frigideira" },
    { icon: <ClipboardList size={22} className="text-brand-primary" />, text: "Passo a passo de preparo" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-green-100 overflow-x-hidden">
      <DynamicDateBanner />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 md:py-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-brand-primary leading-tight max-w-4xl mb-3 uppercase">
          Aprenda a Fazer <span className="text-brand-accent">+67 Cafés da Manhã Saudáveis</span>, Prontos em Até <span className="text-brand-accent">15 Minutos</span> e com no Máximo <span className="text-brand-accent">300 Calorias</span>
        </h1>
        <p className="text-base md:text-lg text-center text-gray-600 max-w-2xl mb-6 font-regular">
          Receitas rápidas, com calorias baixas e criadas pela Nutri Laura Maria para quem quer sabor e praticidade no dia a dia.
        </p>
        
        <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl mb-6 transform hover:scale-[1.01] transition">
          <img 
            src="https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/Capa_salgada_yixvkk.webp" 
            alt="Capa Guia Receitas" 
            className="w-full h-auto"
          />
        </div>

        <div className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm mb-4 w-full max-w-xs md:max-w-sm">
          <p className="text-red-600 line-through text-base font-bold">De R$99,90</p>
          <p className="text-gray-600 text-xs">por apenas</p>
          <p className="text-4xl font-bold text-green-600 my-1">R$10,00</p>
          <p className="text-[10px] text-gray-500 mt-2 leading-tight italic">
            Apenas um valor simbólico para separar quem realmente quer aprender as receitas da nutri dos curiosos.
          </p>
        </div>

        <CTAButton text="QUERO AS RECEITAS AGORA" onClick={scrollToOffer} />
      </section>

      {/* O Que Você Vai Encontrar */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-8 text-center uppercase leading-tight">
            O QUE VOCÊ<br />
            <span className="text-brand-accent">VAI ENCONTRAR:</span>
          </h2>
          <div className="max-w-md mx-auto space-y-3">
              {whatYouFind.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
                  <div className="shrink-0 p-2 bg-gray-50 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="font-bold text-gray-700 text-base md:text-lg leading-tight">{item.text}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SectionTitle>
            ALGUNS CAFÉS DA MANHÃ DA <span className="text-brand-accent">NUTRI</span> QUE VOCÊ IRÁ <span className="text-brand-accent">APRENDER:</span>
          </SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5_xl mx-auto mt-6">
            {recipes.map((recipe, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col h-full">
                <img src={recipe.img} alt={recipe.title} className="w-full h-28 md:h-40 object-cover" />
                <div className="p-3 md:p-5 flex flex-col justify-between flex-grow">
                  <h3 className="font-bold text-[12px] md:text-base text-gray-800 mb-2 leading-tight uppercase">{recipe.title}</h3>
                  <div className="flex items-center justify-between text-[10px] md:text-sm">
                    <span className="flex items-center gap-1 text-green-800 font-bold"><Clock size={12} /> {recipe.time}</span>
                    <span className="font-bold text-red-600">{recipe.cal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm md:text-base font-regular text-gray-600">
            E muito mais… +67 receitas da nutri que transformarão o seu café da manhã de forma saudável.
          </p>
          <div className="mt-8 text-center">
            <CTAButton text="QUERO AS RECEITAS" onClick={scrollToOffer} />
          </div>
        </div>
      </section>

      {/* Doces */}
      <section className="bg-brand-primary py-20 md:py-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 max-w-4xl mx-auto leading-tight uppercase">
            <span className="text-yellow-200">+32 OPÇÕES</span> DE CAFÉS DA MANHÃ DOCE, SAUDÁVEIS, ZERO AÇÚCAR E <span className="text-yellow-200">IRRESISTÍVEIS.</span>
          </h2>
          <p className="text-sm md:text-lg font-medium mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Além dos 67 opções da nutri, você ainda recebe +32 receitas de café da manhã doces e zero açúcar pra quando bater aquela vontade de comer um docinho.
          </p>
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500 ring-4 ring-white/10">
            <img 
              src="https://res.cloudinary.com/drcqck3r9/image/upload/v1769884568/Capa_doce_jqujjr.webp" 
              alt="Receitas Doces" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Bonus Block */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle>VOCÊ AINDA IRÁ RECEBER <span className="text-brand-accent">+3 BÔNUS</span> EXCLUSIVOS:</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6 max-w-5_xl mx-auto mt-10">
            {[
              {
                title: "SALADAS DE POTE + MOLHOS",
                desc: "+30 saladas no pote with molhos deliciosos que saciam de verdade, prepare tudo em apenas 30 minutos e tenha salada pronta para a sua família por 7 dias",
                img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769886405/SALADAS_DE_POTE_bqdnph.jpg"
              },
              {
                title: "AIRFRYER PROTÉICA",
                desc: "Receitas rápidas, alta em proteínas e de baixas calorias",
                img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769886423/AIRFRIYER_nowa1b.webp"
              },
              {
                title: "MARMITAS FIT FÁCIL",
                desc: "Chega de cojinhar todo santo dia, tenha a paz de ter comida pronta e ficar 15 dias longe do fogão",
                img: "https://res.cloudinary.com/drcqck3r9/image/upload/v1769886795/MARMITAS_FIT_ekjvww.webp"
              }
            ].map((bonus, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col h-full shadow-sm">
                <img src={bonus.img} alt={bonus.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                <h3 className="font-bold text-base text-brand-primary mb-1 uppercase leading-tight">{bonus.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{bonus.desc}</p>
                <div className="mt-auto pt-2 flex items-center gap-2 text-xs">
                  <span className="text-red-400 line-through">(R$ 29,90)</span>
                  <span className="font-bold text-green-600">HOJE É GRÁTIS</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton text="QUERO AS RECEITAS" onClick={scrollToOffer} />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-8 bg-green-50/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 overflow-hidden border border-green-100">
            <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-6 text-center uppercase leading-tight">ENTÃO VOCÊ PRECISA DISSO:</h3>
            <div className="space-y-3 mb-8">
              {[
                "Cardápio criado por uma nutricionista",
                "Mais de 67 opções saudáveis",
                "Baixíssimas em calorias",
                "Sabor novo todos os dias sem enjoar",
                "Feitas em menos de 15 minutos",
                "Não precisa de utensílios profissionais",
                "Nutrição completa pra começar o dia"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-gray-800 text-sm md:text-base">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <CTAButton text="QUERO AS RECEITAS" onClick={scrollToOffer} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-14 overflow-hidden bg-gray-50/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-6 text-center uppercase leading-tight">
            VEJA O QUE DIZEM SOBRE AS<br />
            <span className="text-brand-accent">RECEITAS DA NUTRI:</span>
          </h2>
          <TestimonialCarousel images={testimonials} />
        </div>
      </section>

      {/* Offer Block */}
      <section ref={offerRef} className="py-8 md:py-12 bg-[#f9f7f2]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand-primary/10 p-6 md:p-10 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-8 text-center uppercase tracking-tight">
              CAFÉS DA MANHÃ DA NUTRI
            </h2>
            <div className="w-full max-w-lg mb-8">
              <img 
                src="https://res.cloudinary.com/drcqck3r9/image/upload/v1769884570/MOCKUP_CELULAR_NOTEBOOK_TABLET_nsnfpl.webp" 
                alt="Kit Completo" 
                className="w-full h-auto drop-shadow-xl rounded-2xl"
              />
            </div>
            <div className="w-full max-w-md space-y-1 mb-6">
              {[
                "✅+67 receitas de café da manhã",
                "✅+32 receitas doces para o café da manhã",
                "✅Saladas de potes + molhos",
                "✅Airfryer proteica",
                "✅Marmitas Fit Fácil"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 font-bold text-brand-primary text-sm md:text-base border-b border-gray-50 pb-1.5">
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="text-center mb-6 flex flex-col items-center">
              <span className="text-red-600 line-through text-base md:text-lg font-bold">De R$99,90</span>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-0.5">Por apenas</p>
              <div className="text-6xl md:text-7xl font-bold text-green-600 flex items-start gap-1 leading-none mt-1">
                <span className="text-2xl mt-4">R$</span>
                <span>10,00</span>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-4">
              <a 
                href={checkoutLink}
                className="w-full max-w-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-5 px-6 rounded-2xl shadow-xl transform transition active:scale-95 text-lg md:text-2xl uppercase tracking-wider flex items-center justify-center gap-3 whitespace-nowrap animate-pulseScale"
              >
                <ShoppingBag size={28} />
                QUERO COMPRAR AGORA
              </a>
              <CountdownTimer />
              <div className="flex items-center justify-center gap-4 md:gap-8 text-gray-400 font-bold text-[10px] md:text-xs">
                <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-green-500" /> Compra 100% Segura</div>
                <div className="flex items-center gap-1.5">7 Dias de Garantia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-left">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <img 
                src="https://res.cloudinary.com/drcqck3r9/image/upload/v1769884569/EXPERT_fzdyf5.webp" 
                alt="Nutri Laura Maria" 
                className="w-full h-auto rounded-3xl shadow-xl"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-brand-primary mb-1">Quem sou eu?</h2>
              <h3 className="text-xl font-bold text-brand-accent mb-4">Receitas da Nutri Laura Maria</h3>
              <div className="text-gray-600 font-regular text-sm md:text-base leading-relaxed mb-6 space-y-4">
                <p>Meu nome é Laura Maria e, por muito tempo, emagrecer sempre foi uma luta pra mim.</p>
                <p>Eu tentava me alimentar bem, mas falhava logo nos primeiros dias, principalmente por não saber o que comer no café da manhã. Pulava refeições, comia qualquer coisa ou exagerava no doce, e isso sabotava todo o resto do dia.</p>
                <p>Tudo mudou quando me tornei nutricionista e entendi o processo. Passei a organizar meu café da manhã with receitas rápidas, saudáveis, saborosas e que realmente saciam, e percebi que acertar a primeira refeição do dia facilitava o controle da fome, da anciedade e das escolhas ao longo do dia.</p>
                <p>Essas receitas foram grandes aliadas no meu emagrecimento e fizeram tanto sucesso entre minhas pacientes e na internet que resolvi organizá-las em um guia prático, pra quem quer emagrecer com agilidade, sabor e sem dieta chata.</p>
                <p>Além dos cafés da manhã, incluí tudo o que uso e indico na prática: Saladas no pote que duram até 7 dias na geladeira, receitas de marmitas congeladas pra ganhar tempo e um guia de airfryer pra facilitar a rotina de quem quer comer saudável.</p>
              </div>
              <CTAButton text="QUERO COMPRAR AGORA" onClick={goToCheckout} className="text-sm py-3 px-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-10 bg-gray-50 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <img 
            src="https://res.cloudinary.com/drcqck3r9/image/upload/v1769884575/SELO_DE_GARANTIA_cfinwj.webp" 
            alt="Selo de Garantia" 
            className="w-48 md:w-64 mx-auto mb-6"
          />
          <h2 className="text-2xl md:text-4xl font-bold text-brand-primary mb-4 uppercase">
            <span className="text-brand-accent">Devolvemos</span> seu <span className="text-brand-accent">Dinheiro</span> e Você <span className="text-brand-accent">Fica</span> com o Guia de Receitas!
          </h2>
          <p className="text-base md:text-lg text-gray-700 font-regular mb-8 leading-relaxed">
            Essa é nossa garantia: Teste por 7 dias e se não gostar, <span className="font-bold text-brand-accent">devolvemos</span> seu <span className="font-bold text-brand-accent">dinheiro</span> na hora e você ainda <span className="font-bold text-brand-accent">fica</span> com o guia!
          </p>
          <CTAButton text="QUERO COMPRAR AGORA" onClick={goToCheckout} />
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-5_xl">
          <h2 className="text-2xl md:text-4xl font-bold text-brand-primary mb-6 text-center uppercase leading-tight">
            COMO IREI <span className="text-brand-accent">RECEBER</span> AS RECEITAS?
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
            <div className="w-full md:w-1/2 group">
              <div className="relative p-2 bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-brand-primary/10 overflow-hidden transform transition-all duration-700 hover:scale-[1.02]">
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-primary/5 to-brand-accent/5 rounded-[1.8rem] -z-10 blur-md opacity-20"></div>
                <div className="overflow-hidden rounded-2xl relative">
                   <img 
                    src="https://res.cloudinary.com/drcqck3r9/image/upload/v1769884569/APOSTILA_FISICA_MERCADO_k4kdju.png" 
                    alt="Apostila Digital" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-1.5">
              {[
                "Recebe imediatamente no E-mail após a compra",
                "Pode imprimir no papel",
                "Pode ver no celular",
                "Pode ver no computador",
                "Pode ver no tablet",
                "Novas receitas mensalmente",
                "Pode solicitar o reenvio"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100 font-bold text-gray-800 text-sm md:text-base hover:bg-white hover:shadow-md transition duration-300">
                  <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                  <span>{item}</span>
                </div>
              ))}
              <div className="pt-4">
                <CTAButton text="QUERO COMPRAR AGORA" onClick={goToCheckout} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>DÚVIDAS FREQUENTES</SectionTitle>
          <div className="space-y-1 mt-8">
            <AccordionItem 
              question="As receitas têm mesmo sabor de verdade?" 
              answer="Sim! O maior foco da nutri Laura foi unir saúde com sabor de verdade. Nada de comida sem graça, são receitas realmente gostosas, testadas e aprovadas." 
            />
            <AccordionItem 
              question="São receitas saudáveis?" 
              answer="Todas são saudáveis, equilibradas e pensadas para oferecer os nutrientes e vitaminas que seu corpo precisa para começar bem o dia." 
            />
            <AccordionItem 
              question="As receitas servem para a família toda?" 
              answer="Com certeza! São ideias que agradam adultos e crianças, com ingredientes acessíveis e muito sabor." 
            />
            <AccordionItem 
              question="As receitas são fáceis de fazer?" 
              answer="Sim! As receitas são simples de seguir, com ingredientes acessíveis e instruções claras, perfeitas para o dia a dia corrido." 
            />
            <AccordionItem 
              question="Preciso saber cozinhar para aproveitar?" 
              answer="Não! As receitas foram pensadas para todos os níveis de habilidade na cozinha, inclusive iniciantes." 
            />
            <AccordionItem 
              question="Tem lista de ingredientes acessíveis?" 
              answer="Sim. A nutri priorizou ingredientes que você encontra com facilidade em mercados comuns, sem precisar de produtos caros ou raros." 
            />
            <AccordionItem 
              question="Vou precisar de batedeira ou utensílios especiais?" 
              answer="Não! As receitas foram pensadas para o dia a dia, usando utensílios simples que você já tem em casa, como colher, garfo, liquidificador e frigideira." 
            />
          </div>
          <div className="mt-10 text-center">
            <CTAButton text="QUERO COMPRAR AGORA" onClick={goToCheckout} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary py-16 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm md:text-base mb-8 opacity-80">
            © 2026 Saladas da Laura Maria. Todos os direitos reservados.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            <a href="#" className="text-sm font-bold underline hover:opacity-70 transition">Termos de Uso</a>
            <a href="#" className="text-sm font-bold underline hover:opacity-70 transition">Privacidade</a>
            <a href="#" className="text-sm font-bold underline hover:opacity-70 transition">Suporte</a>
          </div>

          <p className="text-[10px] md:text-xs opacity-50 max-w-2xl mx-auto leading-relaxed">
            Este produto não substitui o parecer médico profissional. Always consult a doctor or nutritionist for health and dietary matters. Results may vary from person to person.
          </p>
        </div>
      </footer>
    </div>
  );
}
