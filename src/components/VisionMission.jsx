import React from 'react';
import { Eye, Target, Sparkles, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VisionMission = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <section className="py-10 md:py-12 bg-white font-cairo overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images Section (Left in LTR, Left in RTL as well if we use order) */}
          <div className="w-full lg:w-1/2 relative lg:order-2">
            
            {/* Main Image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-square md:aspect-auto md:h-[500px] w-[85%] ms-auto">
              <img 
                src="/summit_networking.png" 
                alt="Innovation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/40 to-transparent" />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="absolute bottom-12 right-0 w-[55%] md:w-[280px] h-[220px] rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src="/summit_pitch.png" 
                alt="Teamwork" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Yellow Badge */}
            <div className="absolute bottom-4 right-10 md:right-24 bg-[#FFC107] text-[#111827] rounded-2xl p-4 md:p-6 shadow-xl flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px] transform hover:-translate-y-2 transition-transform duration-300">
              <span className="text-3xl md:text-5xl font-black mb-1 leading-none text-right flex items-center" dir="ltr">
                2026
              </span>
              <span className="text-sm md:text-base font-bold whitespace-nowrap">
                النسخة الأولى
              </span>
            </div>

            {/* Decorative Dots (Optional) */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-dots-pattern opacity-10 pointer-events-none" />
          </div>

          {/* Text Section (Right in LTR, Right in RTL if order-1) */}
          <div className="w-full lg:w-1/2 lg:order-1 flex flex-col justify-center">
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-black text-[#111827] leading-[1.2] mb-6">
              تمكين العقول نحو <span className="text-[#FFC107]">مستقبل ابتكاري رائد</span>
            </h2>

            {/* Main Description */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10 font-bold">
              المركز الوطني للابتكار وريادة الأعمال بجامعة المنيا يضع حجر الأساس لمنظومة متكاملة تدعم الأفكار والمشاريع الناشئة وتحولها لواقع مؤثر في صعيد مصر.
            </p>

            {/* Vision & Mission Cards */}
            <div className="flex flex-col gap-8 mb-10">
              
              {/* Vision Card */}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-16 h-16 bg-[#111827] rounded-[1.2rem] flex items-center justify-center shadow-lg">
                  <Eye className="w-8 h-8 text-[#FFC107]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#111827] mb-2">الرؤية</h3>
                  <p className="text-gray-700 leading-relaxed font-bold">
                    أن تصبح جامعة المنيا مركزاً إقليمياً رائداً للابتكار وريادة الأعمال في صعيد مصر، قادرة على تحويل الأفكار إلى شركات والبحوث إلى منتجات.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-16 h-16 bg-[#111827] rounded-[1.2rem] flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-[#FFC107]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#111827] mb-2">الرسالة</h3>
                  <p className="text-gray-700 leading-relaxed font-bold">
                    إطلاق قمة سنوية متكاملة تجمع بين الابتكار وريادة الأعمال والتوظيف والتدريب والتحول الرقمي، من خلال شراكات فاعلة ومؤشرات واضحة.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div>
              <button className="bg-[#FFC107] hover:bg-[#ffb300] text-[#111827] px-8 py-3.5 rounded-full font-black text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                اقرأ المزيد
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;
