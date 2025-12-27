
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FloatingShapes } from './components/FloatingShapes';
import { AiStrategist } from './components/AiStrategist';
import { 
  Menu, 
  ChevronRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  ArrowUpRight,
  Zap,
  Layout,
  Globe,
  Star,
  CheckCircle2,
  Loader2,
  X,
  ShieldCheck,
  Sparkles,
  Command,
  Scale
} from 'lucide-react';
import { Service, PortfolioItem } from './types';

const SERVICES: Service[] = [
  { id: '1', title: 'Brand Identity', description: 'Crafting unique visual stories that resonate with global audiences.', icon: 'Star' },
  { id: '2', title: 'Digital Strategy', description: 'Data-driven roadmaps to navigate the complex digital landscape.', icon: 'Zap' },
  { id: '3', title: 'Web Experience', description: 'Immersive 3D and interactive platforms built for high conversion.', icon: 'Globe' },
  { id: '4', title: 'UI/UX Design', description: 'Human-centric interfaces that blend aesthetics with seamless utility.', icon: 'Layout' },
];

const PORTFOLIO: PortfolioItem[] = [
  { id: 1, title: 'Luminal Tech', category: 'Brand Strategy', imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'Aura Fashion', category: 'E-Commerce', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, title: 'Vertex Global', category: 'Digital Campaign', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'Solas Energy', category: 'Interactive Design', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' },
  { id: 5, title: 'Nexa Motors', category: 'Product Launch', imageUrl: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=1200' },
  { id: 6, title: 'Pulse App', category: 'UI/UX Design', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200' },
];

const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    content: "At Nexus, your privacy is our digital priority. We collect minimal data necessary for performance and analytics. Your information is encrypted using industry-standard protocols and is never sold to third-party data brokers. We comply with global standards including GDPR and CCPA to ensure your digital footprint remains yours alone."
  },
  terms: {
    title: "Terms of Service",
    content: "Engaging with Nexus implies acceptance of our operational protocols. All creative outputs are protected under intellectual property laws until final delivery and payment. We maintain a high-performance environment and expect mutual professional respect. Misuse of our digital assets or reverse engineering of our proprietary tech is strictly prohibited."
  },
  cookies: {
    title: "Cookie Policy",
    content: "We use essential cookies to maintain session security and performance. Functional cookies help us remember your preferences, such as your interaction with Nexus Alpha. You can opt-out of non-essential tracking at any time via your browser settings, though it may alter the visual fidelity of our 3D experiences."
  }
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [summaryModal, setSummaryModal] = useState<{ isOpen: boolean; type: 'work' | 'studio' | 'privacy' | 'terms' | 'cookies' }>({
    isOpen: false,
    type: 'work'
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const consent = localStorage.getItem('nexus_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('nexus_cookie_consent', 'true');
    setShowCookieConsent(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200';
    e.currentTarget.className = e.currentTarget.className + " opacity-50";
  };

  const openModal = (type: 'work' | 'studio' | 'privacy' | 'terms' | 'cookies') => {
    setSummaryModal({ isOpen: true, type });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] selection:bg-indigo-500 selection:text-white text-sm">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-50 p-4 md:p-6 flex justify-between items-center mix-blend-difference">
        <a href="#" className="text-xl font-black tracking-tighter">NEXUS.</a>
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#services" className="hover:text-indigo-500 transition-colors">Services</a>
          <a href="#work" className="hover:text-indigo-500 transition-colors">Work</a>
          <a href="#contact" className="hover:text-indigo-500 transition-colors">Contact</a>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-[#0a0a0a] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}><X size={28} /></button>
            </div>
            <div className="flex flex-col gap-6 text-3xl font-black tracking-tighter mt-12">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>SERVICES</a>
              <a href="#work" onClick={() => setIsMenuOpen(false)}>WORK</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <FloatingShapes />
        
        <div className="relative z-10 text-center max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              DEFINING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 italic font-serif">
                DIGITAL
              </span> NARRATIVE
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium"
          >
            We blend avant-garde design with strategic intelligence to craft immersive brands that dominate the future market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2"
          >
            <button 
              onClick={() => openModal('work')}
              className="group bg-white text-black px-8 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-indigo-600 hover:text-white hover:scale-[1.05] hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)] transition-all duration-300 active:scale-95"
            >
              VIEW OUR WORK
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => openModal('studio')}
              className="text-white border border-white/20 px-8 py-3.5 rounded-full font-bold text-xs hover:bg-white/10 hover:border-white/50 hover:scale-[1.05] transition-all duration-300 active:scale-95"
            >
              OUR STUDIO
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 uppercase text-[9px] tracking-widest font-bold"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
          SCROLL
        </motion.div>
      </header>

      <AnimatePresence>
        {summaryModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#121212] border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={() => setSummaryModal(prev => ({ ...prev, isOpen: false }))}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                  {summaryModal.type === 'work' && <Sparkles size={24} />}
                  {summaryModal.type === 'studio' && <Command size={24} />}
                  {(summaryModal.type === 'privacy' || summaryModal.type === 'cookies') && <ShieldCheck size={24} />}
                  {summaryModal.type === 'terms' && <Scale size={24} />}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight uppercase">
                    {summaryModal.type === 'work' ? 'Nexus Portfolio' : 
                     summaryModal.type === 'studio' ? 'The Nexus Studio' :
                     LEGAL_CONTENT[summaryModal.type as keyof typeof LEGAL_CONTENT]?.title}
                  </h3>
                  <div className="h-[2px] w-12 bg-indigo-500 mx-auto rounded-full" />
                </div>

                <p className="text-white/60 text-base leading-relaxed font-medium">
                  {summaryModal.type === 'work' && "A curated collection of digital experiences where strategy meets high-art. We specialize in transforming bold visions into market-leading brand realities through immersive storytelling and cutting-edge tech."}
                  {summaryModal.type === 'studio' && "Our creative laboratory is a cloud-native collective of designers, thinkers, and engineers. We operate at the intersection of human intuition and artificial intelligence to define the next era of digital interaction."}
                  {(summaryModal.type === 'privacy' || summaryModal.type === 'terms' || summaryModal.type === 'cookies') && 
                    LEGAL_CONTENT[summaryModal.type as keyof typeof LEGAL_CONTENT]?.content}
                </p>

                <button 
                  onClick={() => setSummaryModal(prev => ({ ...prev, isOpen: false }))}
                  className="px-8 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
                >
                  Close
                </button>
              </div>

              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="services" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-indigo-500 uppercase tracking-widest font-black text-xs">Elevate Your Presence</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">CRAFTED SOLUTIONS.</h2>
          </div>
          <p className="max-w-xs text-white/50 text-left lg:text-right italic font-serif text-base">
            "Design is the silent ambassador of your brand."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-indigo-600/10 hover:border-indigo-500/50 transition-all duration-500"
            >
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                {service.icon === 'Zap' && <Zap size={18} />}
                {service.icon === 'Globe' && <Globe size={18} />}
                {service.icon === 'Layout' && <Layout size={18} />}
                {service.icon === 'Star' && <Star size={18} />}
              </div>
              <h3 className="text-lg font-bold mb-3">{service.title}</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6">
                {service.description}
              </p>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-indigo-500 transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="work" className="bg-white text-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 space-y-2">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">FEATURED WORK</h2>
            <p className="text-base font-medium text-black/40">Selected projects that redefined boundaries.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    onError={handleImageError}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <ArrowUpRight size={20} className="text-black" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold uppercase tracking-tight leading-tight">{item.title}</h4>
                  <p className="text-black/40 text-[11px] font-semibold tracking-wider">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
              LET'S BUILD <br />
              <span className="text-indigo-500 italic font-serif">MAGIC</span> TOGETHER.
            </h2>
            <p className="text-white/50 text-base max-w-sm">
              Whether you're a startup or an established enterprise, we have the vision to propel your brand forward.
            </p>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Email us</p>
              <a href="mailto:hello@nexus.creative" className="text-2xl font-bold hover:text-indigo-500 transition-colors text-white">hello@nexus.creative</a>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"><Instagram size={18} /></a>
              <a href="#" className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"><Twitter size={18} /></a>
              <a href="#" className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="relative">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 p-8 md:p-12 rounded-2xl border border-indigo-500/30 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
              >
                <CheckCircle2 size={48} className="text-indigo-500" />
                <h3 className="text-2xl font-black tracking-tight uppercase text-white">MESSAGE SENT</h3>
                <p className="text-white/50 text-sm">Our team will be in touch shortly.</p>
                <button onClick={() => setFormStatus('idle')} className="text-indigo-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Send another</button>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-black text-white/40">Name</label>
                    <input type="text" required className="w-full bg-white/5 border-b border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-black text-white/40">Email</label>
                    <input type="email" required className="w-full bg-white/5 border-b border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest font-black text-white/40">Message</label>
                  <textarea rows={3} required className="w-full bg-white/5 border-b border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Tell us about your project..." />
                </div>
                <button disabled={formStatus === 'submitting'} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]">
                  {formStatus === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <>SEND INQUIRY <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-medium">
            &copy; {new Date().getFullYear()} NEXUS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-white/50">
            <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => openModal('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => openModal('cookies')} className="hover:text-white transition-colors cursor-pointer">Cookie Policy</button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[60] bg-[#121212] border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600/20 p-2.5 rounded-lg text-indigo-500">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white">Legal Notice</h4>
                <p className="text-white/50 text-[11px] leading-relaxed">
                  We use essential cookies to ensure the best digital experience. By continuing to explore Nexus, you consent to our <button onClick={() => openModal('cookies')} className="text-indigo-400 hover:underline">Cookie Policy</button>.
                </p>
                <div className="flex gap-3 pt-1">
                  <button onClick={acceptCookies} className="flex-1 bg-white text-black py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-indigo-500 hover:text-white transition-all">Accept All</button>
                  <button onClick={() => setShowCookieConsent(false)} className="flex-1 border border-white/10 text-white/50 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-white/5 transition-all">Manage</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AiStrategist />
    </div>
  );
};

export default App;
