import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Award, Users } from 'lucide-react';

const AboutUsPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boardMembers = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    name: `عضو مجلس الإدارة ${i + 1}`,
    role: 'عضو مجلس إدارة',
    image: `https://ui-avatars.com/api/?name=Member+${i + 1}&background=f1f5f9&color=475569&size=150`,
  }));

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-[#f8fafc] font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#040b16]">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6">
            من نحن
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            تعرف على فريق عمل المركز الوطني للابتكار وريادة الأعمال بجامعة المنيا، نخبة من الخبراء والمتخصصين يسعون لبناء مستقبل مشرق.
          </p>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-20 relative">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <Award className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-black text-slate-800">مدير المركز</h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col md:flex-row items-center gap-10 hover:-translate-y-2 transition-transform duration-500">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-50 shadow-xl shrink-0 bg-blue-100 flex items-center justify-center relative">
              <User className="w-20 h-20 text-blue-300 absolute" />
              <img src="/avatar_female_1782723212690.png" alt="د. ايمان زكي الشريف" className="w-full h-full object-cover relative z-10" />
            </div>
            <div className="text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold mb-4">
                المركز الوطني للابتكار وريادة الأعمال
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">أ.د. إيمان زكي الشريف</h3>
              <p className="text-lg text-slate-500 font-medium mb-6">مدير المركز الوطني للابتكار وريادة الأعمال بجامعة المنيا</p>
              <p className="text-slate-600 leading-relaxed font-medium">
                تقود الدكتورة إيمان زكي الشريف مسيرة المركز نحو التميز والإبداع، من خلال وضع استراتيجيات مبتكرة لدعم رواد الأعمال والباحثين، وتوفير بيئة محفزة للابتكار تسهم في تحقيق التنمية المستدامة تماشياً مع رؤية مصر 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-24 bg-white relative border-t border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-slate-800 text-center">تشكيل مجلس إدارة المركز</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member) => (
              <div key={member.id} className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:bg-white hover:-translate-y-2 group">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg bg-white relative">
                  <User className="w-16 h-16 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-1.5 rounded-full">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
