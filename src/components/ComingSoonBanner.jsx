import { useState, useEffect } from 'react';
import { Sparkles, Bell, CalendarDays, MapPin } from 'lucide-react';

const ComingSoonBanner = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = new Date('2026-11-01T09:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) { clearInterval(timer); return; }
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1a2035] rounded-xl flex items-center justify-center text-white font-black text-2xl md:text-3xl shadow-lg tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[#1a2035]/60 text-xs md:text-sm mt-2 font-bold">{label}</span>
    </div>
  );

  return (
    <div className="relative font-cairo mb-32" dir="rtl">
      
      {/* Background Banner */}
      <div className="relative overflow-hidden bg-gradient-to-l from-[#0d1b4b] via-[#1a1040] to-[#0a2540] pt-24 pb-36 border-b border-white/10">
        
        {/* Animated Stars / Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDuration: Math.random() * 3 + 2 + 's',
                animationDelay: Math.random() * 2 + 's',
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 border border-amber-400/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-bold">حدث تاريخي قادم</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            ترقّبوا{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              أول قمة
            </span>
            {' '}للابتكار<br className="hidden md:block" />وريادة الأعمال في{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              صعيد مصر
            </span>
          </h2>

        </div>
      </div>

      {/* Floating White Card */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-24 w-[95%] max-w-[65rem] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 z-20 border border-gray-100">
        
        {/* Left Side: Countdown */}
        <div className="flex flex-col items-center lg:items-start gap-4">
           <h3 className="text-[#111827] text-xl font-bold">العد التنازلي للقمة:</h3>
           <div className="flex items-end gap-3 md:gap-5" dir="ltr">
              <TimeUnit value={days} label="يوم" />
              <span className="text-[#1a2035]/30 text-2xl font-bold mb-6">:</span>
              <TimeUnit value={hours} label="ساعة" />
              <span className="text-[#1a2035]/30 text-2xl font-bold mb-6">:</span>
              <TimeUnit value={minutes} label="دقيقة" />
              <span className="text-[#1a2035]/30 text-2xl font-bold mb-6">:</span>
              <TimeUnit value={seconds} label="ثانية" />
           </div>
        </div>

        {/* Right Side: Details & Button */}
        <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
          <div className="flex flex-wrap justify-center lg:justify-end gap-3 text-gray-600 font-medium text-sm md:text-base">
            <div className="flex items-center gap-2 bg-slate-50 border border-gray-100 px-5 py-2.5 rounded-full shadow-sm">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <span>نوفمبر 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-gray-100 px-5 py-2.5 rounded-full shadow-sm">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>جامعة المنيا</span>
            </div>
          </div>
          <button className="w-full lg:w-auto px-10 py-4 bg-gradient-to-r from-[#ff9800] to-[#ff5722] text-white font-bold text-lg rounded-xl hover:from-[#f57c00] hover:to-[#e64a19] transition-all shadow-lg shadow-orange-500/30 hover:-translate-y-1">
            سجّل اهتمامك الآن
          </button>
        </div>

      </div>

    </div>
  );
};

export default ComingSoonBanner;
