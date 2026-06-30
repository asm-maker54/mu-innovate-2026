import React from 'react';
import { Award, Briefcase, Cpu, Globe2, Landmark, MonitorSmartphone } from 'lucide-react';

const SponsorsSection = () => {
  const sponsors = [
    {
      id: 1,
      title: 'الراعي الماسي',
      description: 'شريك استراتيجي لدعم الابتكار بميزانية ضخمة.',
      icon: Award,
    },
    {
      id: 2,
      title: 'الراعي الذهبي',
      description: 'دعم لوجستي وتقني متميز لنجاح القمة.',
      icon: Landmark,
    },
    {
      id: 3,
      title: 'شريك التكنولوجيا',
      description: 'توفير البنية التحتية وأحدث الحلول.',
      icon: Cpu,
    },
    {
      id: 4,
      title: 'شريك الأعمال',
      description: 'تقديم استشارات وتوجيه للشركات الناشئة.',
      icon: Briefcase,
    },
    {
      id: 5,
      title: 'الراعي الإعلامي',
      description: 'تغطية إعلامية شاملة عبر المنصات.',
      icon: Globe2,
    },
    {
      id: 6,
      title: 'راعي التدريب',
      description: 'تقديم ورش عمل متخصصة لرفع كفاءة الطلاب.',
      icon: MonitorSmartphone,
    }
  ];

  return (
    <section className="bg-[#0f192b] font-cairo overflow-hidden" dir="rtl">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Right Side (Image in RTL) */}
        <div className="w-full lg:w-[45%] relative h-[400px] lg:h-auto">
          <div className="absolute inset-0 bg-[#0f192b]">
             <img 
               src="/summit_networking.png" 
               alt="Sponsors" 
               className="w-full h-full object-cover lg:rounded-l-[8rem]"
             />
             <div className="absolute inset-0 bg-blue-900/30 lg:rounded-l-[8rem]" />
          </div>
        </div>

        {/* Left Side (Content in RTL) */}
        <div className="w-full lg:w-[55%] px-6 py-10 lg:px-20 lg:py-12 flex flex-col justify-center relative">
          
          {/* Decorative Dot grid */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '16px 16px' }} />

          <div className="mb-16 relative">
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <span className="text-sm font-bold tracking-wider">تعرّف على رعاة القمة</span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 leading-[1.3] relative z-10 pb-2">
              شركاء النجاح
            </h2>
            
            {/* Creative Background Glow */}
            <div className="absolute top-10 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-[40px] -z-10 pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {sponsors.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-5 group cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-300 shadow-lg">
                    <Icon className="w-5 h-5 text-white group-hover:text-[#0f192b] transition-colors" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[17px] mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-[13px] leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SponsorsSection;
