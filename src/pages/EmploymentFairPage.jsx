import React, { useEffect } from 'react';
import { Briefcase, Building2, MapPin, Clock, Search, ExternalLink, ChevronLeft, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmploymentFairPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobs = [
    {
      id: 1,
      title: 'مهندس برمجيات واجهات أمامية (Frontend)',
      company: 'TechVision Solutions',
      location: 'القرية الذكية، القاهرة',
      type: 'دوام كامل',
      experience: '1-3 سنوات',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      title: 'أخصائي تسويق إلكتروني',
      company: 'Global Media',
      location: 'عن بُعد (Remote)',
      type: 'دوام كامل',
      experience: 'حديث التخرج',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      title: 'محلل بيانات',
      company: 'Data Insights',
      location: 'المعادي، القاهرة',
      type: 'دوام جزئي',
      experience: '0-2 سنوات',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 4,
      title: 'مهندس جودة برمجيات (QA)',
      company: 'SoftCore',
      location: 'المنيا الجديدة',
      type: 'دوام كامل',
      experience: '2+ سنوات',
      logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-slate-50 font-sans" dir="rtl">
      
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 bg-emerald-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-700">
                <Briefcase className="w-4 h-4 text-emerald-300" />
                <span>جامعة المنيا</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                ملتقى التوظيف <span className="text-emerald-400">الافتراضي</span>
              </h1>
              <p className="text-xl text-emerald-50 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed opacity-90">
                فرصتك للانطلاق في مسيرتك المهنية. تواصل مع كبرى الشركات واستكشف مئات الفرص الوظيفية المتاحة لخريجي جامعة المنيا.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex items-center border border-white/20 w-full max-w-md">
                  <Search className="w-6 h-6 text-emerald-200 ml-3" />
                  <input type="text" placeholder="ابحث عن المسمى الوظيفي..." className="bg-transparent border-none focus:ring-0 text-white placeholder-emerald-200/70 w-full" />
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                    بحث
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-1/3">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">استعد للمقابلة</h3>
                    <p className="text-emerald-200 text-sm">احجز جلسة استشارية مجانية</p>
                  </div>
                </div>
                <Link to="/digital-mentors" className="block w-full text-center py-3 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                  تواصل مع مدرب مهني
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        
        {/* Jobs List */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">أحدث الوظائف المتاحة</h2>
              <p className="text-slate-500 text-lg">اكتشف الفرص التي تناسب طموحاتك</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-emerald-500 hover:shadow-xl transition-all group flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{job.title}</h3>
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors hidden sm:block">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-slate-600 font-medium mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                      <Briefcase className="w-4 h-4" />
                      {job.experience}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                      التقدم للوظيفة
                    </button>
                    <button className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                      التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm">
              عرض المزيد من الوظائف
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EmploymentFairPage;
