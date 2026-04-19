/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Lock, 
  Cpu, 
  ArrowRight, 
  Activity, 
  ShieldAlert,
  Server,
  ChevronDown
} from 'lucide-react';
import { useState, ReactNode } from 'react';

import { ThreeBackground } from './components/ThreeBackground';

const Section = ({ children, className = "", id }: { children: ReactNode, className?: string, id?: string }) => (
  <section className={`min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 relative ${className}`}>
    {children}
  </section>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left hover:text-cyber-pink transition-colors focus:outline-none cursor-pointer"
      >
        <span className="font-display text-xl">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyber-pink' : 'text-white/30'}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-white/50 leading-relaxed font-light">{answer}</p>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <div className="font-sans">
      <ThreeBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Nemefisto" className="w-12 h-12 object-contain mix-blend-screen" />
          <span className="font-display font-bold text-xl tracking-tighter uppercase">Nemefisto</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
          <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-cyber-pink transition-colors">Технологии</a>
          <a href="#network" onClick={(e) => { e.preventDefault(); document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-cyber-pink transition-colors">Сеть</a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-cyber-pink transition-colors">Приватность</a>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white text-black font-display font-bold uppercase text-sm rounded-sm hover:bg-cyber-pink hover:text-white transition-all cursor-pointer"
        >
          Регистрация
        </motion.button>
      </nav>

      {/* Hero Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 text-cyber-pink mb-6">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-mono tracking-[0.3em] uppercase">Status: Undetectable</span>
          </div>
          <h1 className="font-display text-6xl md:text-9xl font-bold leading-[0.9] tracking-tighter mb-8 uppercase">
             Nemefisto: <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-cyber-blue to-purple-500">
               Тень в Сети
             </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-10 font-light">
            Премиальный доступ без компромиссов. Технологии stealth-протоколов нового поколения для тех, кто ценит абсолютную свободу и скорость.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ x: 10 }}
              className="group flex items-center gap-3 px-8 py-4 bg-cyber-pink text-white font-display font-bold uppercase rounded-sm cursor-pointer shadow-[0_0_30px_rgba(255,0,122,0.3)] transition-shadow hover:shadow-[0_0_50px_rgba(255,0,122,0.6)]"
            >
              Начать работу <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button className="px-8 py-4 border border-white/20 hover:border-white/40 transition-colors font-display font-bold uppercase tracking-wider rounded-sm cursor-pointer">
              Подробнее
            </button>
          </div>
        </motion.div>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="order-2 md:order-1"
          >
            <div className="space-y-4">
              {[
                { title: 'Xray & VLESS', desc: 'Максимальная маскировка трафика под обычный HTTPS. Недоступно для DPI-фильтров.' },
                { title: 'xHTTP Core', desc: 'Ультра-быстрый протокол для стриминга и гейминга без задержек.' },
                { title: 'Shield Core', desc: 'Интегрированная защита от утечек DNS и IPv6.' }
              ].map((f, i) => (
                <div key={i} className="glass-card p-6 rounded-lg group hover:border-cyber-blue transition-all">
                  <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full group-hover:scale-150 transition-transform" />
                    {f.title}
                  </h3>
                  <p className="text-white/50 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase mb-8 leading-tight">
              Сила Скрытых <br /> <span className="text-cyber-blue">Протоколов</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Мы не просто скрываем ваш IP. Мы меняем саму структуру вашего присутствия в сети. Прокручивайте ниже, чтобы увидеть Nemefisto в действии.
            </p>
            <div className="flex gap-10">
              <div>
                <div className="text-4xl font-display font-bold text-white mb-1">0.1s</div>
                <div className="text-xs uppercase tracking-widest text-white/30">Connect Time</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-1">AES-256</div>
                <div className="text-xs uppercase tracking-widest text-white/30">Encryption</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Fly-through Technical Detail Section */}
      <Section id="tech">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-12 tracking-tight">
             Инженерия <span className="text-cyber-pink">Будущего</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <p className="text-white/60 leading-relaxed">
                  Nemefisto использует ядро Xray-core, которое позволяет сегментировать трафик и обходить самые сложные системы анализа пакетов. Каждое соединение уникально — сервер не может отличить ваш VPN-туннель от обычного просмотра YouTube или Zoom-вызова.
                </p>
                <div className="p-1 border-l-2 border-cyber-pink pl-6 italic text-sm text-white/40">
                   "Безопасность — это не забор, это невидимость."
                </div>
             </div>
             <div className="glass-card p-8 rounded border-cyber-blue/20">
                <div className="text-cyber-blue font-mono text-xs mb-4 uppercase tracking-widest">Protocol Matrix</div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs uppercase">VLESS + Reality</span>
                      <span className="text-[10px] bg-cyber-blue/10 text-cyber-blue px-2 py-0.5 rounded">Active</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs uppercase">Shadowsocks-2022</span>
                      <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded">Standby</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs uppercase">Trojan-Go</span>
                      <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded">Standby</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Section>

      {/* Network Nodes Section */}
      <Section id="network" className="py-0">
         <div className="max-w-6xl mx-auto w-full text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8">
               Глобальная <span className="text-cyber-blue">Матрица</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto mb-16">
              Мы не арендуем дешевые VPS. Наша сеть опирается на Tier-1 дата-центры с прямым пирингом. 10 Гбит/с порты и оптимизированная маршрутизация.
            </p>
            
            {/* Minimalist Tech Map Representation */}
            <div className="glass-card p-8 rounded-lg relative overflow-hidden border-cyber-blue/10 flex items-center justify-center min-h-[300px]">
               <div className="absolute inset-0 opacity-20" style={{ 
                 backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                 backgroundSize: '24px 24px'
               }} />
               <div className="relative z-10 flex flex-wrap justify-center gap-12 font-mono text-sm tracking-widest uppercase text-white/40">
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                     <div className="w-3 h-3 bg-cyber-pink shadow-[0_0_10px_rgba(255,0,122,0.8)] rounded-full group-hover:scale-150 transition-transform"></div>
                     <span className="text-white/80">EU-Central</span>
                     <span className="text-[10px]">12ms</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                     <div className="w-3 h-3 bg-cyber-blue shadow-[0_0_10px_rgba(0,240,255,0.8)] rounded-full group-hover:scale-150 transition-transform"></div>
                     <span className="text-white/80">US-East</span>
                     <span className="text-[10px]">85ms</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                     <div className="w-3 h-3 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] rounded-full group-hover:scale-150 transition-transform"></div>
                     <span className="text-white/80">AP-South</span>
                     <span className="text-[10px]">140ms</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                     <div className="w-3 h-3 bg-cyber-pink shadow-[0_0_10px_rgba(255,0,122,0.8)] rounded-full group-hover:scale-150 transition-transform"></div>
                     <span className="text-white/80">EU-North</span>
                     <span className="text-[10px]">25ms</span>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-12 text-center">
             Частые <span className="text-white/30">Вопросы</span>
          </h2>
          <div className="flex flex-col space-y-2">
            <FAQItem 
              question="Чем вы лучше обычного VPN (OpenVPN / WireGuard)?" 
              answer="OpenVPN и WireGuard легко детектируются по сигнатурам (DPI). Провайдеры видят, что вы используете VPN, и могут блокировать или замедлять трафик. Xray/VLESS маскирует трафик под обычное посещение защищенных HTTPS-сайтов. Для провайдера вы просто скроллите случайный сайт." 
            />
            <FAQItem 
              question="Будет ли работать в Китае, Иране, РФ?" 
              answer="Да. Инфраструктура специально создана для обхода Великих Файрволов (GFW) и агрессивных ТСПУ. Мы регулярно ротируем IP-пулы и используем технологию Reality, которая позволяет подменять SNI налету." 
            />
            <FAQItem 
              question="Вы храните логи подключений?" 
              answer="Нет. Все серверы работают из RAM (оперативной памяти). Как только сервер перезагружается, вся информация физически исчезает. У нас нет биллинговой системы, привязанной к вашей кредитке — используются только крипто-переводы и анонимные ключи." 
            />
            <FAQItem 
              question="На каких устройствах я могу это использовать?" 
              answer="На всех. Доступны клиенты (v2rayNG, Nekobox, V2rayN, Shadowrocket) для Windows, macOS, Linux, Android и iOS. Также можно настроить прямо на Wi-Fi роутере (OpenWrt/Padavan)." 
            />
          </div>
        </div>
      </Section>

      {/* Privacy Section */}
      <Section id="privacy">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-10 inline-block"
          >
            <div className="p-6 bg-cyber-pink/10 rounded-full border border-cyber-pink/20 mb-8">
              <ShieldAlert className="w-16 h-16 text-cyber-pink" />
            </div>
          </motion.div>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase mb-8">
            Никаких имен. <br /> Никаких логов.
          </h2>
          <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl mx-auto mb-12">
            Наша политика No-Logs — это не просто обещание, это архитектурный стандарт. Мы не храним историю ваших посещений, IP-адреса или метаданные. <span className="text-white">Вы привидение в системе.</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: Globe, label: 'Анонимная регистрация' },
              { icon: Lock, label: 'Шифрование AES-256' },
              { icon: Server, label: 'Разрозненная сеть серверов' }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <item.icon className="w-6 h-6 text-cyber-pink" />
                <span className="font-display font-medium text-sm uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer / CTA */}
      <footer className="px-6 md:px-24 py-40 border-t border-white/5 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="max-w-xl">
            <h2 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.8]">
              Готовы <br /> Исчезнуть?
            </h2>
            <p className="text-white/40 font-light mb-10">
              Присоединяйтесь к закрытому сообществу Nemefisto и верните себе право на приватность. Регистрация занимает 30 секунд.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-12 py-5 bg-white text-black font-display font-bold uppercase text-lg hover:bg-cyber-blue transition-colors cursor-pointer"
            >
              Создать аккаунт
            </motion.button>
          </div>
          
          <div className="text-right flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-cyber-pink cursor-pointer transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-cyber-pink cursor-pointer transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
            </div>
            <div className="text-white/20 text-xs uppercase tracking-[0.5em]">
              Nemefisto © 2026 / All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
