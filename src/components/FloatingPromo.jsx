import React, { useState } from 'react';
import { X, CalendarDays, MapPin } from 'lucide-react';

const FloatingPromo = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[100] w-[340px] bg-[#23263a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 font-cairo shadow-blue-900/30 animate-fade-in-up" dir="rtl">
      
      {/* Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 left-4 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Image Area */}
      <div className="h-48 w-full relative">
        <img 
          src="/summit_networking.png" 
          alt="Summit 2026" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#23263a] via-[#23263a]/40 to-transparent" />
      </div>

      {/* Content Area */}
      <div className="px-6 pb-8 relative -mt-6 text-center">
        
        {/* Badge */}
        <div className="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-full mb-3">
          <span className="text-amber-300 text-xs font-bold">حدث تاريخي قادم</span>
        </div>

        <h3 className="text-xl font-black text-white leading-snug mb-3">
          ترقّبوا أول قمة للابتكار وريادة الأعمال في صعيد مصر
        </h3>
        
        <div className="flex items-center justify-center gap-3 text-slate-300/80 text-[13px] font-medium mb-6">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-blue-300" />
            <span>نوفمبر 2026</span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <span>جامعة المنيا</span>
          </div>
        </div>

        <button className="w-full bg-[#ff9800] hover:bg-[#e68a00] text-white font-bold py-3.5 px-4 rounded-full transition-colors shadow-lg shadow-orange-500/20">
          سجّل اهتمامك الآن
        </button>

      </div>
    </div>
  );
};

export default FloatingPromo;
