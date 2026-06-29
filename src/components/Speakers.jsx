import React, { useState } from 'react';
import { ArrowLeft, Globe, Mail, Sparkles } from 'lucide-react';

const Speakers = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const speakers = [
    {
      id: 0,
      name: 'أحمد محمود',
      nameEn: 'AHMED MAHMOUD',
      role: 'مؤسس ومدير تنفيذي',
      company: 'TechVision',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      color: 'from-blue-600 to-indigo-900',
      accent: 'bg-blue-500'
    },
    {
      id: 1,
      name: 'د. إسماعيل فاروق',
      nameEn: 'ISMAEL FARO',
      role: 'نائب رئيس الذكاء الاصطناعي',
      company: 'IBM',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
      color: 'from-yellow-500 to-orange-700',
      accent: 'bg-yellow-400'
    },
    {
      id: 2,
      name: 'جيرجن وايتشينبيرجر',
      nameEn: 'JUERGEN WEICHENBERGER',
      role: 'شريك البيانات',
      company: 'Ernst & Young',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      color: 'from-purple-600 to-purple-900',
      accent: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'سارة عبد الله',
      nameEn: 'SARAH ABDALLAH',
      role: 'رئيسة قسم الابتكار',
      company: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      color: 'from-emerald-500 to-teal-900',
    },
    {
      id: 4,
      name: 'عمر ياسين',
      nameEn: 'OMAR YASSIN',
      role: 'مستثمر ومبادر',
      company: 'Venture Capital',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=800',
      color: 'from-red-500 to-rose-900',
      accent: 'bg-red-500'
    },
    {
      id: 5,
      name: 'ليلى منصور',
      nameEn: 'LAYLA MANSOUR',
      role: 'مديرة تطوير المنتجات',
      company: 'Amazon',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      color: 'from-cyan-500 to-blue-900',
      accent: 'bg-cyan-500'
    },
    {
      id: 6,
      name: 'طارق حلمي',
      nameEn: 'TAREK HELMY',
      role: 'مستشار الابتكار',
      company: 'Google',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      color: 'from-pink-500 to-fuchsia-900',
      accent: 'bg-pink-500'
    }
  ];

  return (
    <section className="py-24 bg-[#0a0f1c] relative overflow-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">عقول تصنع المستقبل</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              متحدثون بارزون
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              نخبة من الخبراء ورواد الأعمال وصناع القرار يشاركونكم رؤاهم حول مستقبل الابتكار والتكنولوجيا في قمة جامعة المنيا.
            </p>
          </div>
          
          <button className="hidden md:flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors group">
            عرض كل المتحدثين
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Interactive Expanding Cards (Accordion) */}
        <div className="flex flex-col lg:flex-row gap-4 h-[700px] lg:h-[500px] w-full">
          {speakers.map((speaker, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={speaker.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out flex-shrink-0 lg:flex-shrink ${
                  isActive 
                    ? 'h-[300px] lg:h-full lg:flex-[3] xl:flex-[4] shadow-2xl shadow-blue-900/20' 
                    : 'h-[100px] lg:h-full lg:flex-1 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-1000 ${
                      isActive ? 'scale-105' : 'scale-100 grayscale-[30%]'
                    }`}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${
                  isActive ? 'from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent opacity-90' : 'from-black/80 to-black/20'
                }`} />
                
                {/* Colored Tint for inactive cards */}
                <div className={`absolute inset-0 bg-gradient-to-br ${speaker.color} mix-blend-overlay transition-opacity duration-700 ${
                  isActive ? 'opacity-40' : 'opacity-80'
                }`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 lg:translate-y-0 lg:opacity-100'}`}>
                    
                    {/* Active State Details */}
                    <div className={`flex flex-col gap-2 ${isActive ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center lg:h-full'}`}>
                      
                      {/* Name - Shows vertically when inactive on desktop */}
                      <h3 className={`text-white font-black uppercase transition-all duration-700 ${
                        isActive 
                          ? 'text-3xl lg:text-4xl mb-1' 
                          : 'lg:-rotate-90 lg:text-2xl lg:whitespace-nowrap lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 tracking-wider'
                      }`}>
                        {isActive ? speaker.name : speaker.nameEn}
                      </h3>
                      
                      {/* Sub-details (Role & Company) - Only visible when active */}
                      <div className={`flex flex-col gap-1 transition-all duration-500 delay-200 overflow-hidden ${
                        isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 lg:hidden'
                      }`}>
                        <div className={`text-lg font-bold ${isActive ? 'text-blue-300' : ''}`}>
                          {speaker.role}
                        </div>
                        <div className="text-gray-300 font-semibold" dir="ltr">
                          @ {speaker.company}
                        </div>
                        
                        {/* Social Icons */}
                        <div className="flex gap-3 mt-4">
                          <div className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:${speaker.accent} transition-colors`}>
                            <Globe className="w-5 h-5" />
                          </div>
                          <div className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:${speaker.accent} transition-colors`}>
                            <Mail className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Decorative border line on active */}
                <div className={`absolute bottom-0 left-0 h-1 transition-all duration-700 ${speaker.accent} ${
                  isActive ? 'w-full' : 'w-0'
                }`} />
              </div>
            );
          })}
        </div>
        
        {/* Mobile "View All" Button */}
        <button className="mt-8 flex md:hidden items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
          عرض كل المتحدثين
          <ArrowLeft className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
};

export default Speakers;
