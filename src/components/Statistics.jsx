import React from 'react';
import { useTranslation } from 'react-i18next';
import { Rocket, FileCheck, Users, Lightbulb } from 'lucide-react';

const Statistics = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const stats = [
    {
      id: 1,
      icon: Rocket,
      value: '+50',
      title: isRtl ? 'شركة ناشئة' : 'Startups',
      description: isRtl ? 'تم احتضانها ودعمها' : 'Incubated & Supported',
      color: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      icon: FileCheck,
      value: '+120',
      title: isRtl ? 'براءة اختراع' : 'Patents',
      description: isRtl ? 'مسجلة دولياً ومحلياً' : 'Registered Locally & Globally',
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      id: 3,
      icon: Users,
      value: '+5000',
      title: isRtl ? 'طالب متدرب' : 'Trained Students',
      description: isRtl ? 'في برامج ريادة الأعمال' : 'In Entrepreneurship Programs',
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      id: 4,
      icon: Lightbulb,
      value: '+200',
      title: isRtl ? 'مشروع مدعوم' : 'Funded Projects',
      description: isRtl ? 'أفكار تحولت لواقع' : 'Ideas turned into reality',
      color: 'from-purple-500 to-pink-600',
      bgLight: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-900/20 blur-[100px]"></div>
      </div>

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {isRtl ? 'إحصائيات وإنجازات مركز الابتكار' : 'Innovation Center Statistics & Achievements'}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            {isRtl 
              ? 'أرقام تعكس التزامنا بدعم المبتكرين ورواد الأعمال وتحويل أفكارهم إلى مشاريع ناجحة على أرض الواقع.' 
              : 'Numbers that reflect our commitment to supporting innovators and entrepreneurs, turning their ideas into successful real-world projects.'}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="group bg-[#0d1b2a] rounded-[3rem] p-6 pb-12 border border-white/5 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-white/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
              
              {/* Icon Circle */}
              <div className={`w-20 h-20 xl:w-24 xl:h-24 rounded-full bg-[#1b263b] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner relative z-10 border border-white/5 ${stat.iconColor}`}>
                <stat.icon className="w-8 h-8 xl:w-10 xl:h-10" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Value */}
                <h3 className="text-3xl xl:text-4xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {stat.value}
                </h3>
                
                {/* Title */}
                <h4 className="text-sm xl:text-base font-bold text-gray-400 mt-1">
                  {stat.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
