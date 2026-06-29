import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Globe, Users, FileCheck } from 'lucide-react';

const InnovationCenters = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const centers = [
    {
      title: isRtl ? 'مركز الابتكار وريادة الاعمال' : 'Innovation & Entrepreneurship Center',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      icon: Lightbulb,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: isRtl ? 'الاقتصاد المعرفي ونقل التقنية' : 'Knowledge Economy & Tech Transfer',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      icon: Globe,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: isRtl ? 'نادي الابتكار وريادة الأعمال' : 'Innovation & Entrepreneurship Club',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: isRtl ? 'براءات الاختراع' : 'Patents',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      icon: FileCheck,
      color: 'from-amber-500 to-orange-600',
    }
  ];

  return (
    <section className="py-24 bg-white font-cairo overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            {isRtl ? 'الابتكار فى جامعة المنيا' : 'Innovation at Minia University'}
          </h2>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isRtl 
              ? 'منظومة متكاملة لدعم المبتكرين ورواد الأعمال، من الفكرة وحتى تحويلها إلى واقع وتوثيق ملكيتها الفكرية.'
              : 'An integrated ecosystem to support innovators and entrepreneurs, from idea to reality and IP registration.'}
          </p>
        </div>

        {/* Cards Grid - Modern Full-Image Overlay Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {centers.map((center, idx) => {
            const Icon = center.icon;
            return (
              <div 
                key={idx} 
                className="group relative h-80 lg:h-96 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Full Background Image */}
                <img 
                  src={center.image} 
                  alt={center.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                
                {/* Top Floating Glass Icon */}
                <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg z-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col justify-end h-full pointer-events-none">
                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 leading-snug">
                    {center.title}
                  </h3>
                  
                  {/* Colored Accent Line */}
                  <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${center.color} mb-4 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100`} />
                  
                  {/* Hover Action / Arrow */}
                  <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <span className="text-sm font-bold">{isRtl ? 'اكتشف المزيد' : 'Discover More'}</span>
                    <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default InnovationCenters;
