import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Handshake, Rocket, TrendingUp, GraduationCap, Heart } from 'lucide-react';

const JoinUs = () => {
  const roles = [
    {
      id: '01',
      roleKey: 'speaker',
      title: 'متحدث',
      icon: Mic2,
      description: 'شارك خبراتك على المسرح الرئيسي إلى جانب قادة الفكر والابتكار وريادة الأعمال في مصر والمنطقة.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      id: '02',
      roleKey: 'partner',
      title: 'شريك',
      icon: Handshake,
      description: 'حزم شراكات متنوعة مصممة لتتوافق مع أهداف مؤسستك وتعزز حضورك في منظومة الابتكار.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      id: '03',
      roleKey: 'startup',
      title: 'شركات ناشئة',
      icon: Rocket,
      description: 'اعرض ابتكارك أمام المستثمرين وقادة الصناعة والشركاء المحتملين في أكبر منصة لريادة الأعمال.',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-500',
    },
    {
      id: '04',
      roleKey: 'investor',
      title: 'مستثمر',
      icon: TrendingUp,
      description: 'اكتشف أفضل الفرص الاستثمارية في المشاريع الناشئة وتواصل مع رواد الأعمال وقادة الفكر.',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      id: '05',
      roleKey: 'mentor',
      title: 'مدرب',
      icon: GraduationCap,
      description: 'ساهم في تشكيل الجيل القادم من رواد الأعمال من خلال مشاركة خبراتك وتوجيه الشركات الناشئة.',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      id: '06',
      roleKey: 'volunteer',
      title: 'متطوع',
      icon: Heart,
      description: 'انضم لبرنامج متطوعي القمة واكتسب خبرة عملية وتواصل مع القادة وساهم في الحدث الريادي.',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
    },
  ];

  return (
    <section className="py-24 bg-white font-cairo relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            انضم إلينا في رحلة الابتكار
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            اختر دورك وكن جزءاً من أكبر منظومة ابتكار وريادة أعمال في صعيد مصر. المنصة مفتوحة للجميع لترك بصمة مؤثرة.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div 
              key={role.id} 
              className={`${role.bgColor} rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-8 transition-transform hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Content Side (Right in RTL) */}
              <div className="flex-1 text-center sm:text-start">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{role.title}</h3>
                <p className="text-slate-600 mb-6 font-medium leading-relaxed">
                  {role.description}
                </p>
                <Link
                  to={`/register?role=${role.roleKey}`}
                  className="inline-flex bg-[#047857] hover:bg-[#065f46] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md"
                >
                  سجل اهتمامك
                </Link>
              </div>

              {/* Illustration/Icon Side (Left in RTL) */}
              <div className="shrink-0 mt-6 sm:mt-0">
                <div className="w-32 h-32 bg-white/60 rounded-full flex items-center justify-center shadow-sm border border-white/50">
                  <role.icon className={`w-16 h-16 ${role.iconColor}`} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JoinUs;
