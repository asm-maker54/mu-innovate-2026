import React, { useState, useEffect, useRef } from 'react';
import { Video, Handshake, Presentation, Users, Briefcase, Settings, Lightbulb, Landmark, Trophy } from 'lucide-react';

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ImpactNumbers = () => {
  const stats = [
    {
      id: 8,
      icon: Landmark,
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      number: 1000,
      suffix: '+',
      label: 'طالب وطالبة في Minia Leads',
    },
    {
      id: 7,
      icon: Lightbulb,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      number: 300,
      prefix: '200-',
      label: 'فكرة ومشروع ابتكاري',
    },
    {
      id: 6,
      icon: Settings,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      number: 30,
      prefix: '20-',
      label: 'نموذج أولي مدعوم',
    },
    {
      id: 5,
      icon: Briefcase,
      color: 'text-blue-800',
      bgColor: 'bg-blue-100',
      number: 500,
      label: 'فرصة تدريب ومقابلة عمل',
    },
    {
      id: 4,
      icon: Users,
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      number: 3000,
      label: 'طالب وخريج في Minia Talent Pool',
    },
    {
      id: 3,
      icon: Presentation,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      number: 50,
      prefix: '30-',
      label: 'مدرب معتمد في الشبكة الرقمية',
    },
    {
      id: 2,
      icon: Handshake,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      number: 15,
      prefix: '10-',
      label: 'شراكة واتفاقية استراتيجية',
    },
    {
      id: 1,
      icon: Video,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      number: 50,
      prefix: '30-',
      label: 'مادة إعلامية وتسويقية',
    }
  ];

  return (
    <section className="py-16 bg-white relative" dir="rtl">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
            أثر القمة في أرقام
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Main Stats Banner */}
          <div className="flex-1 bg-white rounded-3xl border-2 border-blue-100 shadow-xl shadow-blue-900/5 p-6 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100 h-full">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="flex flex-col items-center justify-center text-center p-2 hover:-translate-y-1 transition-transform">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    
                    <div className={`text-2xl font-black mb-2 ${stat.color}`} style={{ direction: 'ltr' }}>
                      {stat.prefix}
                      <CountUp end={stat.number} />
                      {stat.suffix}
                    </div>
                    
                    <p className="text-xs font-semibold text-gray-600 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Trophy Banner */}
          <div className="lg:w-80 rounded-3xl bg-gradient-to-br from-[#0a1628] to-[#1a2f4f] p-8 relative overflow-hidden flex items-center justify-center text-center shadow-xl shadow-blue-900/20 group">
            {/* Animated stars background */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 40%, white 1px, transparent 1px), radial-gradient(circle at 40% 80%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <Trophy className="w-20 h-20 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-white text-2xl font-bold leading-snug">
                معاً جامعة <br/>مبتكرة ومستدامة<br/> تصنع المستقبل
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
