import React from 'react';
import { 
  Monitor, Trophy, Briefcase, 
  Lightbulb, GraduationCap, Handshake, Store,
  ArrowLeft, ArrowRight, BarChart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FeatureBox3D = ({ title, colorHex, icon: Icon, link, isRtl, children }) => {
  return (
    <div 
      className="group relative w-full h-full bg-white rounded-[2rem] p-6 sm:p-8 flex flex-col transition-all duration-500 hover:-translate-y-3 z-10 overflow-hidden border border-slate-100"
      style={{
        boxShadow: `0 4px 20px -10px rgba(0,0,0,0.05)`
      }}
    >
      {/* Dynamic Hover Glow Shadow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none -z-10"
        style={{ boxShadow: `0 20px 40px -15px ${colorHex}50` }}
      />
      
      {/* Decorative Gradient Orbs */}
      <div 
        className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20 pointer-events-none"
        style={{ backgroundColor: colorHex }}
      />
      <div 
        className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-0 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-10 pointer-events-none"
        style={{ backgroundColor: colorHex }}
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0"
          style={{ backgroundColor: `${colorHex}15`, color: colorHex }}
        >
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-black text-xl text-slate-800 leading-snug">
          {title}
        </h3>
      </div>
      
      {/* List */}
      <ul className="space-y-4 mb-8 flex-1 relative z-10">
        {children}
      </ul>

      {/* Action Button */}
      <div className="mt-auto relative z-10">
        <Link 
          to={link}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group/btn overflow-hidden relative"
          style={{ backgroundColor: colorHex, boxShadow: `0 10px 20px -10px ${colorHex}` }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
          <span className="relative z-10">{isRtl ? 'التفاصيل والمزيد' : 'View Details'}</span>
          {isRtl ? <ArrowLeft className="w-5 h-5 relative z-10 transform transition-transform group-hover/btn:-translate-x-1" /> : <ArrowRight className="w-5 h-5 relative z-10 transform transition-transform group-hover/btn:translate-x-1" />}
        </Link>
      </div>
    </div>
  );
};

const ListItem = ({ children, colorHex, isRtl }) => (
  <li className="flex items-start gap-3 text-slate-600 font-bold text-[15px] group/item transition-colors hover:text-slate-900">
    <div 
      className={`w-2 h-2 rounded-full shrink-0 mt-2 transition-transform duration-300 ${isRtl ? 'group-hover/item:-translate-x-1' : 'group-hover/item:translate-x-1'}`}
      style={{ backgroundColor: colorHex, boxShadow: `0 0 10px ${colorHex}` }} 
    />
    <span className="leading-relaxed">{children}</span>
  </li>
);

const DigitalPlatform = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden font-cairo">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 lg:px-8 relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Title */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] mb-4 inline-block drop-shadow-sm">
            {isRtl ? 'المنصة الرقمية' : 'Digital Platform'}
          </h2>
          <p className="text-xl font-bold text-slate-600 max-w-2xl mx-auto">
            {isRtl ? 'منظومة موحدة لربط الطلاب والباحثين والخريجين والشركات والمستثمرين والشركاء' : 'Unified system connecting students, researchers, alumni, companies, investors, and partners'}
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mt-8 shadow-lg shadow-blue-500/30" />
        </div>

        {/* 3D Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          
          <FeatureBox3D title="المبادرات والبرامج" colorHex="#0d9488" icon={Lightbulb} link="/digital-mentors" isRtl={isRtl}>
            <ListItem colorHex="#0d9488" isRtl={isRtl}>برنامج رواد جامعة المنيا</ListItem>
            <ListItem colorHex="#0d9488" isRtl={isRtl}>شبكة المدربين الرقمية</ListItem>
            <ListItem colorHex="#0d9488" isRtl={isRtl}>مبادرة الابتكار الأخضر والاستدامة</ListItem>
            <ListItem colorHex="#0d9488" isRtl={isRtl}>شركة نماء</ListItem>
            <ListItem colorHex="#0d9488" isRtl={isRtl}>برامج التدريب والاحتضان</ListItem>
          </FeatureBox3D>

          <FeatureBox3D title="المسابقات والعروض" colorHex="#d97706" icon={Trophy} link="/agenda" isRtl={isRtl}>
            <ListItem colorHex="#d97706" isRtl={isRtl}>Pitching Day</ListItem>
            <ListItem colorHex="#d97706" isRtl={isRtl}>أفضل رائد أعمال</ListItem>
            <ListItem colorHex="#d97706" isRtl={isRtl}>أفضل مشروع طلابي</ListItem>
            <ListItem colorHex="#d97706" isRtl={isRtl}>رفع العروض والملفات</ListItem>
            <ListItem colorHex="#d97706" isRtl={isRtl}>التحكيم وإعلان النتائج</ListItem>
          </FeatureBox3D>

          <FeatureBox3D title="البحوث ومشروعات التخرج" colorHex="#ea580c" icon={GraduationCap} link="/graduation-projects" isRtl={isRtl}>
            <ListItem colorHex="#ea580c" isRtl={isRtl}>تقديم البحوث التطبيقية</ListItem>
            <ListItem colorHex="#ea580c" isRtl={isRtl}>Technology Offer Book</ListItem>
            <ListItem colorHex="#ea580c" isRtl={isRtl}>تسويق مشروعات التخرج</ListItem>
            <ListItem colorHex="#ea580c" isRtl={isRtl}>تقييم الجاهزية</ListItem>
            <ListItem colorHex="#ea580c" isRtl={isRtl}>طلبات التعاون والتمويل</ListItem>
          </FeatureBox3D>

          <FeatureBox3D title="المعارض والمنتجات" colorHex="#16a34a" icon={Store} link="/exhibition/1" isRtl={isRtl}>
            <ListItem colorHex="#16a34a" isRtl={isRtl}>معرض الابتكارات الرقمية</ListItem>
            <ListItem colorHex="#16a34a" isRtl={isRtl}>معرض الوحدات الإنتاجية</ListItem>
            <ListItem colorHex="#16a34a" isRtl={isRtl}>كتالوج المنتجات والخدمات</ListItem>
            <ListItem colorHex="#16a34a" isRtl={isRtl}>الحجز والمشاركة</ListItem>
            <ListItem colorHex="#16a34a" isRtl={isRtl}>عرض الصور والفيديوهات</ListItem>
          </FeatureBox3D>

          <FeatureBox3D title="التوظيف والتدريب والشركاء" colorHex="#6b21a8" icon={Briefcase} link="/employment-fair" isRtl={isRtl}>
            <ListItem colorHex="#6b21a8" isRtl={isRtl}>ملتقى التوظيف</ListItem>
            <ListItem colorHex="#6b21a8" isRtl={isRtl}>الوظائف والتدريب</ListItem>
            <ListItem colorHex="#6b21a8" isRtl={isRtl}>Minia Talent Pool</ListItem>
            <ListItem colorHex="#6b21a8" isRtl={isRtl}>الشركات المشاركة</ListItem>
            <ListItem colorHex="#6b21a8" isRtl={isRtl}>طلب المقابلات</ListItem>
          </FeatureBox3D>

          <FeatureBox3D title="الاستثمار والملكية الفكرية" colorHex="#1d4ed8" icon={Handshake} link="/dashboard" isRtl={isRtl}>
            <ListItem colorHex="#1d4ed8" isRtl={isRtl}>Investor Matchmaking</ListItem>
            <ListItem colorHex="#1d4ed8" isRtl={isRtl}>Founder Services Pavilion</ListItem>
            <ListItem colorHex="#1d4ed8" isRtl={isRtl}>Startup Readiness Desk</ListItem>
            <ListItem colorHex="#1d4ed8" isRtl={isRtl}>عيادة الملكية الفكرية</ListItem>
            <ListItem colorHex="#1d4ed8" isRtl={isRtl}>طلب اجتماع أو استشارة</ListItem>
          </FeatureBox3D>
        </div>


      </div>
    </section>
  );
};

export default DigitalPlatform;
