import React, { useEffect } from 'react';
import { GraduationCap, Award, MapPin, Globe, Link as LinkIcon, Network, MessageSquare, Briefcase } from 'lucide-react';

const AlumniFairPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const alumni = [
    {
      id: 1,
      name: 'م. خالد عبد الرحمن',
      graduationYear: '2015',
      faculty: 'كلية الهندسة',
      position: 'مدير العمليات',
      company: 'TechBuild Corp',
      location: 'دبي، الإمارات',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      story: 'بدأ رحلته كمطور برمجيات في المنيا وتدرج ليصل إلى إدارة العمليات التقنية لشركة من أكبر الشركات في الشرق الأوسط.'
    },
    {
      id: 2,
      name: 'د. ياسمين طارق',
      graduationYear: '2018',
      faculty: 'كلية الصيدلة',
      position: 'مؤسس ومدير تنفيذي',
      company: 'PharmaTech Solutions',
      location: 'القاهرة، مصر',
      image: 'https://images.unsplash.com/photo-1594824436998-ddedceea1f34?auto=format&fit=crop&q=80&w=400',
      story: 'أسست شركتها الناشئة التي توفر حلولاً تكنولوجية لربط الصيدليات وتسهيل توزيع الأدوية وحصلت على تمويل بـ 2 مليون دولار.'
    },
    {
      id: 3,
      name: 'أ. محمود سامي',
      graduationYear: '2019',
      faculty: 'كلية التجارة',
      position: 'محلل مالي أول',
      company: 'بنك الاستثمار الدولي',
      location: 'لندن، بريطانيا',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400',
      story: 'استفاد من برامج التبادل الطلابي بجامعة المنيا ليكمل دراساته العليا في بريطانيا وينضم لكبرى البنوك العالمية.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-slate-50 font-sans" dir="rtl">
      
      {/* Hero Section */}
      <section className="bg-amber-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border-4 border-amber-500/30">
            <GraduationCap className="w-12 h-12 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">ملتقى خريجي جامعة المنيا</h1>
          <p className="text-xl text-amber-50 max-w-2xl mx-auto mb-10 leading-relaxed">
            شبكة تجمع خريجينا المتميزين حول العالم. تواصل، تبادل الخبرات، وكن جزءاً من قصة نجاح الأجيال القادمة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-amber-500 text-amber-950 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
              انضم لشبكة الخريجين
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
              دليل الخريجين
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        
        {/* Features / Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-20">
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex items-center gap-4 border border-slate-100">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Network className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">بناء العلاقات</h3>
              <p className="text-sm text-slate-500">تواصل مع زملاء الدراسة</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex items-center gap-4 border border-slate-100">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">فرص العمل</h3>
              <p className="text-sm text-slate-500">وظائف حصرية للخريجين</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex items-center gap-4 border border-slate-100">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">نقل الخبرات</h3>
              <p className="text-sm text-slate-500">كن مرشداً للطلاب الجدد</p>
            </div>
          </div>
        </div>

        {/* Alumni Profiles */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">قصص نجاح نلهم بها الأجيال</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">تعرف على مسيرات مهنية مميزة لخريجي جامعة المنيا الذين تركوا بصمة في مجالاتهم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((person) => (
              <div key={person.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 right-4 z-20 text-white">
                    <h3 className="text-2xl font-black mb-1">{person.name}</h3>
                    <p className="text-white/80 flex items-center gap-2 text-sm font-medium">
                      <Award className="w-4 h-4" />
                      خريج {person.faculty} - دفعة {person.graduationYear}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-slate-700 font-bold">
                    <Briefcase className="w-5 h-5 text-amber-500" />
                    <span>{person.position} @ {person.company}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 text-slate-500 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    <span>{person.location}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 pb-6 border-b border-slate-100">
                    "{person.story}"
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="text-amber-600 font-bold text-sm hover:text-amber-700">قراءة المزيد</button>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Globe className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AlumniFairPage;
