import React from 'react';
import { Lightbulb, Trophy, GraduationCap, Store, Briefcase, Handshake, ArrowLeft } from 'lucide-react';

const ExhibitionTracks = () => {
  const tracks = [
    {
      id: 1,
      title: 'المبادرات والبرامج',
      icon: Lightbulb,
      description: 'برنامج رواد جامعة المنيا، شبكة المدربين الرقمية، مبادرة الابتكار الأخضر والاستدامة، شركة نماء، برامج التدريب والاحتضان.',
      colors: {
        bg: 'bg-[#f4f8fb]',
        blob: 'bg-[#e2f0fa]',
        icon: 'text-[#3ea8e5]',
        hex: '#3ea8e5'
      }
    },
    {
      id: 2,
      title: 'المسابقات والعروض',
      icon: Trophy,
      description: 'Pitching Day، أفضل رائد أعمال، أفضل مشروع طلابي، رفع العروض والملفات، التحكيم وإعلان النتائج.',
      colors: {
        bg: 'bg-[#fff5f6]',
        blob: 'bg-[#ffe4e8]',
        icon: 'text-[#fc778a]',
        hex: '#fc778a'
      }
    },
    {
      id: 3,
      title: 'البحوث ومشروعات التخرج',
      icon: GraduationCap,
      description: 'تقديم البحوث التطبيقية، Technology Offer Book، تسويق مشروعات التخرج، تقييم الجاهزية، طلبات التعاون والتمويل.',
      colors: {
        bg: 'bg-[#f6f5fb]',
        blob: 'bg-[#ebe7f9]',
        icon: 'text-[#876ce3]',
        hex: '#876ce3'
      }
    },
    {
      id: 4,
      title: 'المعارض والمنتجات',
      icon: Store,
      description: 'معرض الابتكارات الرقمية، معرض الوحدات الإنتاجية، كتالوج المنتجات والخدمات، الحجز والمشاركة، عرض الصور والفيديوهات.',
      colors: {
        bg: 'bg-[#fef9f1]',
        blob: 'bg-[#fdf0dc]',
        icon: 'text-[#f5a841]',
        hex: '#f5a841'
      }
    },
    {
      id: 5,
      title: 'التوظيف والتدريب والشركاء',
      icon: Briefcase,
      description: 'ملتقى التوظيف، الوظائف والتدريب، Minia Talent Pool، الشركات المشاركة، طلب المقابلات.',
      colors: {
        bg: 'bg-[#f2fcf6]',
        blob: 'bg-[#e0f8e9]',
        icon: 'text-[#36c975]',
        hex: '#36c975'
      }
    },
    {
      id: 6,
      title: 'الاستثمار والملكية الفكرية',
      icon: Handshake,
      description: 'Investor Matchmaking، Founder Services Pavilion، Startup Readiness Desk، عيادة الملكية الفكرية، طلب اجتماع أو استشارة.',
      colors: {
        bg: 'bg-[#fff6f4]',
        blob: 'bg-[#ffeae6]',
        icon: 'text-[#f97e64]',
        hex: '#f97e64'
      }
    }
  ];

  return (
    <section id="tracks" className="py-10 md:py-12 bg-white relative font-cairo overflow-hidden" dir="rtl">
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 flex flex-col items-center relative">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-400 mb-4 pb-2 inline-block leading-normal">
            محاور القمة
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pink-400 to-pink-300 mx-auto rounded-full mb-6" />
          <p className="text-xl font-bold text-gray-600 max-w-3xl leading-relaxed">
            منظومة موحدة لربط الطلاب والباحثين والخريجين والشركات والمستثمرين والشركاء
          </p>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes float-card {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
          }
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
        `}</style>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tracks.map((track) => (
            <div 
              key={track.id}
              className={`${track.colors.bg} rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.03] group cursor-pointer relative shadow-lg hover:shadow-2xl z-10`}
              style={{
                animation: `float-card ${3 + (track.id % 3) * 0.5}s ease-in-out infinite alternate`
              }}
            >
              
              {/* Continuous Glowing Colored Border Effect */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                style={{ 
                  border: `2px solid ${track.colors.hex}`,
                  boxShadow: `0 0 15px ${track.colors.hex}40, inset 0 0 15px ${track.colors.hex}20`,
                  animation: `glow-pulse ${2.5 + (track.id % 3) * 0.5}s ease-in-out infinite` 
                }}
              />
              
              {/* Glossy overlay effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />

              {/* Icon Blob */}
              <div 
                className={`w-24 h-24 ${track.colors.blob} flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm group-hover:shadow-md relative z-10`}
                style={{ borderRadius: '53% 47% 52% 48% / 46% 54% 47% 53%' }}
              >
                <track.icon className={`w-10 h-10 ${track.colors.icon} transition-transform duration-500 group-hover:-translate-y-1`} strokeWidth={2} />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-black text-gray-900 mb-4 transition-colors duration-300 relative z-10 group-hover:text-gray-800">
                {track.title}
              </h3>
              
              <p className="text-gray-600 font-bold leading-relaxed mb-8 flex-grow relative z-10">
                {track.description}
              </p>

              {/* Animated Link */}
              <div className={`inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest transition-all duration-300 relative z-10 ${track.colors.icon}`}>
                <span>التفاصيل والمزيد</span>
                <ArrowLeft className="w-5 h-5 transform transition-transform duration-500 group-hover:-translate-x-2" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExhibitionTracks;
