import React from 'react';
import { Quote, User, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LeadershipSpeeches = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-[#f8fafc] to-white relative overflow-hidden font-cairo">
      {/* Custom Animations */}
      <style>{`
        @keyframes float-img {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-15px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Section Header */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 mb-2 pb-3 inline-block leading-normal">
            {isRtl ? 'كلمة القيادة الأكاديمية' : 'Leadership Speeches'}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto rounded-full" />
        </div>

        {/* President's Speech */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24 group">
          <div className="w-full lg:w-1/3 relative z-10" style={{ animation: 'float-img 4s ease-in-out infinite alternate' }}>
            <div className="aspect-[3/4] relative">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #2563eb',
                  boxShadow: '0 0 15px rgba(37,99,235,0.4), inset 0 0 15px rgba(37,99,235,0.2)',
                  animation: 'glow-pulse 3s ease-in-out infinite' 
                }} 
              />
              {/* Image Container */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <img src="/dr-essam.jpg.jpeg" alt="رئيس الجامعة" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Elegant dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl border border-blue-50 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 z-20">
              <Award className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 relative z-10" style={{ animation: 'float-img 5s ease-in-out infinite alternate-reverse' }}>
            <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg transition-all duration-500 group-hover:-translate-x-2 h-full flex flex-col justify-center">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #2563eb',
                  boxShadow: '0 0 15px rgba(37,99,235,0.4), inset 0 0 15px rgba(37,99,235,0.1)',
                  animation: 'glow-pulse 3s ease-in-out infinite' 
                }} 
              />
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 mb-4 leading-tight text-center">
                الأستاذ الدكتور / عصام الدين صادق فرحات
                <span className="text-blue-600 block mt-3 text-xl lg:text-2xl text-center">رئيس الجامعة</span>
              </h3>
              <h4 className="text-xl font-bold text-yellow-600 mb-8 flex items-center justify-center gap-2 text-center">
                <div className="w-8 h-1 bg-yellow-400 rounded-full" />
                راعي الابتكار والإبداع
                <div className="w-8 h-1 bg-yellow-400 rounded-full" />
              </h4>
              <p className="text-lg md:text-xl leading-loose text-slate-700 mb-8 relative z-10 text-center">
                "إن جامعة المنيا تضع الابتكار وريادة الأعمال في مقدمة أولوياتها الاستراتيجية، إيماناً منا بأن شبابنا هم الثروة الحقيقية القادرة على صناعة المستقبل. هذه المنصة هي جسر للتواصل بين العقول المبدعة وعالم الصناعة والأعمال، لننتقل معاً من مرحلة الأفكار إلى منتجات حقيقية تخدم مجتمعنا ووطننا."
              </p>
              <div className="flex justify-center">
                <button className="flex items-center justify-center gap-2 text-white bg-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all group/btn">
                  <span>{isRtl ? 'اقرأ الكلمة كاملة' : 'Read Full Speech'}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5 transform transition-transform group-hover/btn:-translate-x-1.5" /> : <ArrowRight className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advisor's Speech */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 group">
          <div className="w-full lg:w-1/3 relative z-10" style={{ animation: 'float-img 4.5s ease-in-out infinite alternate-reverse' }}>
            <div className="aspect-[3/4] relative">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #eab308',
                  boxShadow: '0 0 15px rgba(234,179,8,0.4), inset 0 0 15px rgba(234,179,8,0.2)',
                  animation: 'glow-pulse 3.5s ease-in-out infinite' 
                }} 
              />
              {/* Image Container */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <img src="/dr-eman.jpg.jpeg" alt="مستشار رئيس الجامعة" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-6 -left-6 bg-white p-5 rounded-3xl shadow-xl border border-yellow-50 transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 z-20">
              <Quote className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 relative z-10" style={{ animation: 'float-img 5.5s ease-in-out infinite alternate' }}>
            <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg transition-all duration-500 group-hover:translate-x-2 h-full flex flex-col justify-center">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #eab308',
                  boxShadow: '0 0 15px rgba(234,179,8,0.4), inset 0 0 15px rgba(234,179,8,0.1)',
                  animation: 'glow-pulse 3.5s ease-in-out infinite' 
                }} 
              />
              <Quote className="absolute top-8 right-8 w-20 h-20 text-yellow-50 -z-10" />
              <h3 className="text-2xl lg:text-3xl xl:text-[34px] font-black text-slate-900 mb-4 leading-tight text-center">
                الأستاذ الدكتور / إيمان زكي الشريف
                <span className="text-yellow-500 block mt-3 text-xl lg:text-2xl text-center">مستشار رئيس الجامعة لشئون الابتكار</span>
              </h3>

              <p className="text-lg md:text-xl leading-loose text-slate-700 mb-8 relative z-10 text-center">
                "نعمل جاهدين لتوفير بيئة داعمة تحتضن الأفكار المبتكرة وتحولها إلى واقع ملموس. منصة الابتكار هي خطوتنا الأهم لربط البحث العلمي والمشروعات التطبيقية بفرص حقيقية للتمويل والاحتضان. معاً نبني جيلاً من رواد الأعمال القادرين على قيادة قاطرة التنمية."
              </p>
              <div className="flex justify-center">
                <button className="flex items-center justify-center gap-2 text-white bg-yellow-500 px-6 py-3 rounded-full font-bold hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transition-all group/btn">
                  <span>{isRtl ? 'اقرأ الكلمة كاملة' : 'Read Full Speech'}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5 transform transition-transform group-hover/btn:-translate-x-1.5" /> : <ArrowRight className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeadershipSpeeches;
