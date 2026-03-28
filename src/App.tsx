import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Gift, 
  CheckCircle2, 
  XCircle, 
  Info,
  Heart,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Utensils,
  Volume2,
  VolumeX,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRef } from 'react';
const coupleImage = "/1.jpg";

const AnimatedIcon = ({ icon: Icon, className = "", size = "w-6 h-6" }: { icon: any, className?: string, size?: string }) => (
  <motion.div
    whileHover={{ scale: 1.15, rotate: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className={`inline-block ${className}`}
  >
    <Icon className={`${size}`} />
  </motion.div>
);

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center mt-8">
      {[
        { label: 'DÍAS', value: timeLeft.days },
        { label: 'HORAS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEG', value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center w-16">
          <div className="relative h-10 w-full flex justify-center overflow-hidden border-b border-white/30 pb-1">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={item.value}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-2xl md:text-3xl font-light absolute"
              >
                {String(item.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] tracking-widest mt-1 opacity-70">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12">
    {subtitle && <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{subtitle}</p>}
    <h2 className="text-3xl font-serif italic text-dark">{children}</h2>
  </div>
);

const Card = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`bg-white rounded-2xl p-6 shadow-sm border border-gold/10 ${className}`}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gold/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-colors"
      >
        <span className="text-sm font-medium tracking-wide text-dark group-hover:text-gold transition-colors uppercase">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gold"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm text-gray-500 leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'confirmed' | 'declined'>('pending');
  const [name, setName] = useState('');
  const [music, setMusic] = useState('');

  const handleRsvp = (status: 'confirmed' | 'declined') => {
    setRsvpStatus(status);
    const phoneNumber = "5493814066123";
    let message = "";
    
    if (status === 'confirmed') {
      message = `¡Hola! Confirmo mi asistencia a la boda de Karina & Javier.\n\nNombre/Grupo: ${name || 'No especificado'}\nTema recomendado: ${music || 'No especificado'}\n\n¡Nos vemos pronto!`;
    } else {
      message = `Hola, lamentablemente no podré asistir a la boda de Karina & Javier. (Atte: ${name || 'Invitado'})\n\n¡Gracias por la invitación!`;
    }
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-stone-200">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" 
            alt="Wedding" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-8">
            Karina & <br className="md:hidden" /> Javier
          </h1>

          <p className="max-w-xs mx-auto text-sm opacity-90 leading-relaxed mb-8">
            Nos encantaría que seas parte de este momento tan especial para nosotros.
          </p>
          
          <div className="w-12 h-[1px] bg-white/50 mx-auto mb-8" />
          
          <p className="text-xl tracking-[0.4em] font-light">02 MAY 2026</p>
          
          <CountdownTimer targetDate="2026-05-02T21:00:00" />
        </motion.div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-12 bg-white mx-auto" />
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-24 space-y-32">
        {/* Cuándo & Dónde */}
        <section>
          <SectionTitle subtitle="DETALLES DEL EVENTO">Cuándo & Dónde</SectionTitle>
          
          <div className="space-y-6">
            <Card className="bg-cream border-none text-center py-10">
              <AnimatedIcon icon={Calendar} className="mb-4 text-gold" />
              <h3 className="text-lg font-medium mb-1">Fecha & Hora</h3>
              <p className="text-gray-600 text-sm">Sábado, 02 de mayo de 2026</p>
              <p className="text-gray-600 text-sm mb-6">21:00 hs</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-shadow">
                <AnimatedIcon icon={Calendar} size="w-3 h-3" /> Google Calendar
              </button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-cream border-none text-center">
                <AnimatedIcon icon={MapPin} className="mb-4 text-gold" />
                <h3 className="text-lg font-medium mb-1">Ceremonia</h3>
                <p className="text-gray-600 text-xs mb-1 font-medium">Parroquia Sagrada Familia</p>
                <p className="text-gray-500 text-[10px] mb-4">Caseros 351, Alderetes, Tucumán</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Caseros+351,+Alderetes,+Tucumán" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-widest font-bold text-gold flex items-center gap-1 mx-auto hover:underline"
                >
                  <AnimatedIcon icon={MapPin} size="w-3 h-3" /> Google Maps
                </a>
              </Card>

              <Card className="bg-cream border-none text-center">
                <AnimatedIcon icon={MapPin} className="mb-4 text-gold" />
                <h3 className="text-lg font-medium mb-1">Fiesta</h3>
                <p className="text-gray-600 text-xs mb-1 font-medium">Salón Isabella</p>
                <p className="text-gray-500 text-[10px] mb-4">Ayacucho 104, Alderetes, Tucumán</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Ayacucho+104,+Alderetes,+Tucumán" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-widest font-bold text-gold flex items-center gap-1 mx-auto hover:underline"
                >
                  <AnimatedIcon icon={MapPin} size="w-3 h-3" /> Google Maps
                </a>
              </Card>
            </div>

            <div className="rounded-2xl overflow-hidden h-80 relative shadow-inner border border-gray-100">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?saddr=Caseros+351,+Alderetes,+Tucumán&daddr=Ayacucho+104,+Alderetes,+Tucumán&t=&z=15&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Confirmación */}
        <section>
          <SectionTitle subtitle="CONFIRMACIÓN">¿Nos acompañás?</SectionTitle>
          <Card className="bg-cream border-none text-center py-12">
            <AnimatePresence mode="wait">
              {rsvpStatus === 'pending' ? (
                <motion.div 
                  key="pending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <p className="text-gray-600 italic">Por favor, confirmanos tu asistencia antes del 18 de abril.</p>
                  
                  <div className="space-y-4 max-w-sm mx-auto text-left">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2">Nombre y Apellido / Grupo Familiar</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Familia Pérez / Juan Gómez"
                        className="w-full px-4 py-2 bg-white border border-gold/20 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gold mb-2">Recomendación para el DJ</label>
                      <input 
                        type="text" 
                        value={music}
                        onChange={(e) => setMusic(e.target.value)}
                        placeholder="¿Qué tema no puede faltar?"
                        className="w-full px-4 py-2 bg-white border border-gold/20 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => handleRsvp('confirmed')}
                      className="px-8 py-3 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 transition-colors"
                    >
                      Sí, asistiré
                    </button>
                    <button 
                      onClick={() => handleRsvp('declined')}
                      className="px-8 py-3 border border-gold text-gold rounded-full text-sm font-medium hover:bg-gold/10 transition-colors"
                    >
                      No podré ir
                    </button>
                  </div>
                </motion.div>
              ) : rsvpStatus === 'confirmed' ? (
                <motion.div 
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <AnimatedIcon icon={CheckCircle2} size="w-12 h-12" className="text-green-600 mb-4" />
                  <h3 className="text-xl font-medium">¡Genial! Te esperamos</h3>
                  <p className="text-gray-600 text-sm">Tu asistencia ha sido confirmada.</p>
                  <button onClick={() => setRsvpStatus('pending')} className="text-xs text-gray-400 underline">Cambiar respuesta</button>
                </motion.div>
              ) : (
                <motion.div 
                  key="declined"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <AnimatedIcon icon={XCircle} size="w-12 h-12" className="text-red-400 mb-4" />
                  <h3 className="text-xl font-medium">¡Qué lástima que no puedas venir!</h3>
                  <p className="text-gray-600 text-sm">Declinaste la invitación.</p>
                  <button onClick={() => setRsvpStatus('pending')} className="text-xs text-gray-400 underline">Cambiar respuesta</button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </section>

        {/* Ten en cuenta */}
        <section>
          <SectionTitle subtitle="INFORMACIÓN IMPORTANTE">Ten en cuenta</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] rounded-full overflow-hidden border-8 border-cream">
              <img 
                src={coupleImage} 
                alt="Karina & Javier" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-4">Para Ella</p>
                <div className="flex gap-3">
                  {['#E6B8B8', '#4A1C1C', '#F5F5DC'].map(color => (
                    <div key={color} className="w-8 h-8 rounded-full shadow-inner border border-gray-100" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-4">Para Él</p>
                <div className="flex gap-3">
                  {['#1A1A1A', '#2C3E50'].map(color => (
                    <div key={color} className="w-8 h-8 rounded-full shadow-inner border border-gray-100" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <Card className="bg-cream border-none space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg flex items-center justify-center">
                    <AnimatedIcon icon={Info} size="w-4 h-4" className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dress Code: <span className="font-light italic">look canchero</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg flex items-center justify-center">
                    <AnimatedIcon icon={CheckCircle2} size="w-4 h-4" className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">¡Los niños también son bienvenidos!</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Cronograma */}
        <section>
          <SectionTitle subtitle="CRONOGRAMA">Momentos del día</SectionTitle>
          <div className="relative space-y-12 before:absolute before:inset-0 before:left-[19px] before:w-[1px] before:bg-gray-200">
            {[
              { time: '20:45 hs', event: 'Toma tu lugar', desc: 'Te esperamos para comenzar', icon: Clock },
              { time: '21:00 hs', event: 'Ceremonia', desc: 'Parroquia Sagrada Familia', icon: Heart },
              { time: '22:00 hs', event: 'Cena', desc: 'Salón Isabella', icon: Utensils },
              { time: '00:00 hs', event: 'Fiesta', desc: 'Música y baile', icon: Music },
              { time: '05:00 hs', event: 'Vuelta a casa', desc: '¡Gracias por venir!', icon: Clock },
            ].map((item, idx) => (
              <div key={idx} className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 bg-white border border-gold/30 rounded-full flex items-center justify-center z-10 shadow-sm overflow-hidden">
                  <AnimatedIcon icon={item.icon} size="w-4 h-4" className="text-gold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gold mb-1">{item.time}</p>
                  <h4 className="text-lg font-medium">{item.event}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <SectionTitle subtitle="BLOQUES / FAQS">Antes de que nos consultes…</SectionTitle>
          <Card className="bg-cream border-none px-8 py-4">
            <FAQItem 
              question="¿CÓMO ME VISTO?" 
              answer="Nuestro dress code es relajado y cómodo. Venite con un look canchero, en el que te sientas vos mismo y puedas disfrutar toda la noche sin preocuparte por el outfit."
            />
            <FAQItem 
              question="¿QUÉ LES REGALO?" 
              answer="Para nosotros, el mejor regalo es que nos acompañes en este día tan especial. Tu presencia y buena energía son todo lo que necesitamos para celebrar nuestro amor; no hace falta nada más."
            />
            <FAQItem 
              question="¿PUEDO LLEVAR A LOS PEQUES?" 
              answer="¡Claro que sí! Están todos más que bienvenidos, tanto adultos como niños. La idea es estar juntos con la mejor onda y disfrutar de este gran día en familia."
            />
            <FAQItem 
              question="¿DÓNDE ESTACIONO?" 
              answer="El salón/parroquia cuenta con espacio para estacionar con comodidad muy cerquita del ingreso. Te recomendamos llegar unos minutos antes para evitar vueltas innecesarias."
            />
            <FAQItem 
              question="¿QUÉ PASA SI TENGO MÁS DUDAS?" 
              answer="Si todavía te quedó alguna pregunta, escribinos por WhatsApp / Instagram y te ayudamos con lo que necesites para que solo te preocupes por disfrutar."
            />
          </Card>
        </section>

        <footer className="text-center pt-12 pb-24 border-t border-gray-100">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4 font-medium">Te esperamos</p>
          <p className="text-3xl font-serif italic text-gold/30">K & J</p>
        </footer>
      </div>
    </div>
  );
}
