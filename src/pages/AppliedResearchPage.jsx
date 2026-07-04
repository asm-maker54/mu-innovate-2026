import React, { useEffect, useState } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, ArrowLeft, Check, 
  Settings, Users, Briefcase, Banknote, Search, HeartPulse, Cpu,
  Factory, Shield, Lock, Eye, MonitorSmartphone, GraduationCap,
  BarChart, ChevronLeft, Award, Zap, Rocket, Star, Globe, TrendingUp, Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AppliedResearchPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState(1);

  // Data Definitions
  const sectors = ['صحة وطب', 'زراعة ذكية', 'تصنيع غذائي', 'طاقة ومياه وبيئة', 'ذكاء اصطناعي، وتحول رقمي', 'تعليم وتكنولوجيا تعليم', 'سياحة وآثار', 'صناعات إبداعية', 'خدمات مجتمعية', 'هندسة وصناعة'];
  const outputTypes = ['بحث منشور', 'رسالة علمية', 'مشروع تخرج', 'نموذج أولي', 'منتج قابل للتطوير', 'تطبيق أو منصة', 'خدمة استشارية', 'براءة اختراع'];
  
  const stepsData = [
    {
      id: '01',
      title: 'قدم بحثك',
      desc: 'املأ بيانات بحثك الأساسية',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      items: ['بيانات الباحث الرئيسي والفريق', 'عنوان البحث وملخص علمي وتسويقي', 'القطاع المستهدف ونوع المخرج', 'الملفات والمرفقات الإلزامية']
    },
    {
      id: '02',
      title: 'حدد مستوى الجاهزية',
      desc: 'إلى أي مدى وصل بحثك؟',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      items: ['فكرة تحتاج تطوير', 'نتائج معملية أولية', 'نموذج أولي Prototype', 'جاهز للتطبيق أو التسويق']
    },
    {
      id: '03',
      title: 'راجع الملكية الفكرية',
      desc: 'حماية أفكارك قبل النشر',
      icon: ShieldCheck,
      color: 'bg-yellow-100 text-yellow-600',
      items: ['هل توجد براءة اختراع؟', 'هل يحتوي على أسرار فنية؟', 'هل يمكن عرض ملخص غير سري؟']
    },
    {
      id: '04',
      title: 'ارفع الملفات',
      desc: 'المرفقات المطلوبة للتقييم',
      icon: CheckCircle2,
      color: 'bg-purple-100 text-purple-600',
      items: ['ملف البحث PDF (إلزامي)', 'ملخص تسويقي (إلزامي)', 'عرض تقديمي Pitch Deck (اختياري)', 'صور وفيديو للنموذج (اختياري)']
    },
    {
      id: '05',
      title: 'اختر التعاون',
      desc: 'ماذا تريد من الشركاء؟',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      items: ['ترخيص تكنولوجيا أو تصنيع', 'تسويق أو تعاقد بحثي', 'تأسيس شركة أو تمويل']
    }
  ];

  const finalOutputs = [
    { t: 'Technology Offer Book', i: FileText, c: 'text-orange-500', bg: 'bg-orange-50' },
    { t: 'معرض البحوث', i: MonitorSmartphone, c: 'text-blue-500', bg: 'bg-blue-50' },
    { t: 'بحوث جاهزة', i: CheckCircle2, c: 'text-green-500', bg: 'bg-green-50' },
    { t: 'مرشحة لشركة نماء', i: Briefcase, c: 'text-purple-500', bg: 'bg-purple-50' },
    { t: 'تمويل وشراكات', i: Banknote, c: 'text-yellow-500', bg: 'bg-yellow-50' },
    { t: 'أثر مجتمعي', i: BarChart, c: 'text-pink-500', bg: 'bg-pink-50' }
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] overflow-hidden" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
          .font-cairo { font-family: 'Cairo', sans-serif; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
        `}
      </style>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-12 px-4 lg:px-8 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-8 z-10">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float -z-10 translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed -z-10 -translate-x-1/4"></div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-right relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm mb-6 border border-blue-100">
            <Award className="w-4 h-4" />
            قمة جامعة المنيا للابتكار
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#183059] mb-6 leading-tight">
            منصة تسويق <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-[#ea580c]">البحوث التطبيقية</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-600 font-bold mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            بوابتك لتحويل بحثك الأكاديمي إلى فرصة سوقية قابلة للتطبيق. اكتشف الشركاء، احمِ فكرتك، واصنع أثراً حقيقياً.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
            <Link to="/submit-research" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#183059] hover:bg-[#112240] text-white px-8 py-4 rounded-2xl font-black text-xl transition-all shadow-[0_8px_30px_rgb(24,48,89,0.3)] hover:-translate-y-1">
              <FileText className="w-5 h-5" />
              تقديم البحث التطبيقي
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-[#183059] border-2 border-slate-200 hover:border-[#183059] px-8 py-4 rounded-2xl font-black text-xl transition-all">
              <Eye className="w-5 h-5" />
              كيف تعمل المنصة؟
            </a>
          </div>

          {/* Process Flow */}
          <div className="glass-panel p-4 rounded-2xl inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-base font-bold text-slate-700">
            <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-blue-500"/> بحث تطبيقي</span>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500"/> تقييم الجاهزية</span>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-yellow-500"/> حماية فكرية</span>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1"><Users className="w-4 h-4 text-orange-500"/> شريك وصناعة</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="w-full lg:w-1/2 relative z-10 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Abstract Graphic representing research & innovation */}
            <div className="w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-50 rounded-[40px] border-8 border-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 text-center">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#183059_1px,transparent_1px)] [background-size:20px_20px]"></div>
               <Lightbulb className="w-32 h-32 text-[#ea580c] mb-6 drop-shadow-xl animate-float" strokeWidth={1} />
               <h3 className="text-3xl font-black text-[#183059] mb-2">ابتكر مستقبلك</h3>
               <p className="font-bold text-slate-500">من المختبر إلى السوق العالمي</p>
               
               {/* Floating Badges */}
               <div className="absolute top-12 -right-8 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg animate-float">
                  <div className="bg-green-100 p-2 rounded-xl text-green-600"><TrendingUp className="w-5 h-5"/></div>
                  <div className="text-right">
                    <div className="font-black text-slate-800 text-lg">أثر اقتصادي</div>
                    <div className="text-xs font-bold text-slate-500">حلول قابلة للتطبيق</div>
                  </div>
               </div>

               <div className="absolute bottom-12 -left-8 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg animate-float-delayed">
                  <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Users className="w-5 h-5"/></div>
                  <div className="text-right">
                    <div className="font-black text-slate-800 text-lg">شركاء وصناعة</div>
                    <div className="text-xs font-bold text-slate-500">تمويل وتعاون</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES & STATS (Dark Blue Background) */}
      <section className="bg-[#0f172a] text-white pt-12 pb-16 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] [background-size:30px_30px]"></div>
        
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Main Stats Overlapping Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 pt-8">
            {[
              { t: 'باحثون ومبتكرون', desc: 'نخبة من أفضل العقول لتقديم حلول مبتكرة ومتقدمة.', i: Users },
              { t: 'بحوث تطبيقية', desc: 'أبحاث قابلة للتطبيق والتحويل لمنتجات على أرض الواقع.', i: FileText },
              { t: 'شركاء وصناعة', desc: 'تعاون وثيق ومستمر مع القطاع الصناعي والتجاري.', i: Factory },
              { t: 'استثمار وتمويل', desc: 'فرص استثمارية واعدة لدعم الابتكار وريادة الأعمال.', i: Banknote },
              { t: 'أثر مجتمعي', desc: 'تأثير إيجابي فعال يخدم متطلبات المجتمع والبيئة.', i: HeartPulse }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#f8f9fa] p-6 flex flex-col items-center text-center shadow-md w-full sm:w-[220px] transform hover:-translate-y-1 transition-transform duration-300 rounded-lg border-b-4 border-[#ea580c]">
                <stat.i className="w-12 h-12 text-[#ea580c] mb-4" strokeWidth={1.5} />
                <h3 className="font-black text-lg text-[#183059] mb-2">{stat.t}</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed mb-6 flex-grow">{stat.desc}</p>
                <button className="bg-[#183059] text-white w-full py-2 text-sm font-bold hover:bg-[#112240] transition-colors rounded">
                  المزيد
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">اكتشف قطاعات <span className="text-[#ea580c]">البحوث</span></h2>
            <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto">تصفح القطاعات المستهدفة للوصول إلى الأبحاث والمخرجات التي تخدم مجالك بدقة.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {sectors.map((sector, idx) => (
              <div key={idx} className="group relative px-6 py-3 bg-[#1e293b]/40 backdrop-blur-sm border border-slate-700/50 hover:border-[#ea580c] rounded-full flex items-center gap-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.2)] hover:-translate-y-1">
                <div className="w-8 h-8 shrink-0 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-[#ea580c] transition-colors">
                  <span className="text-sm text-slate-400 group-hover:text-[#ea580c] font-black">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <span className="font-bold text-base text-slate-300 group-hover:text-white transition-colors">{sector}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-10">أنواع المخرجات <span className="text-[#ea580c]">المدعومة</span></h2>
            <div className="flex flex-wrap justify-center gap-3">
              {outputTypes.map((type, idx) => (
                <span key={idx} className="px-5 py-3 bg-[#1e293b]/40 border border-slate-700/50 rounded-xl text-base font-bold text-slate-300 hover:text-white hover:border-[#ea580c] transition-all cursor-pointer">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS / STEPS */}
      <section id="how-it-works" className="py-12 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[#ea580c] font-black tracking-widest text-sm mb-2 uppercase">رحلة الباحث</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#183059] mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">خطوات واضحة ومحددة تبدأ من تقديم فكرتك البحثية وتصل بك إلى إيجاد الشريك أو المستثمر المناسب.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stepsData.map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="text-5xl font-black text-slate-100 select-none group-hover:text-slate-200 transition-colors">{step.id}</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 font-bold text-sm mb-6 pb-6 border-b border-slate-100">{step.desc}</p>
                
                <ul className="space-y-3">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Custom Box for Status Tracking */}
            <div className="bg-[#183059] p-8 rounded-[32px] shadow-lg text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10">
                  <ActivityIcon className="w-8 h-8 text-white" />
                </div>
                <span className="text-5xl font-black text-white/10 select-none">06</span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2 relative z-10">حالة الطلب ومتابعته</h3>
              <p className="text-blue-200 font-bold text-sm mb-6 pb-6 border-b border-white/10 relative z-10">يتابع الباحث بحثه عبر مراحل واضحة</p>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-sm font-bold">
                   <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>
                   <span>تم استلام البحث</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                   <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>
                   <span>تقييم اللجنة الفنية</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold opacity-50">
                   <div className="w-6 h-6 rounded-full border-2 border-slate-400 flex items-center justify-center"></div>
                   <span>مقبول للعرض</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold opacity-50">
                   <div className="w-6 h-6 rounded-full border-2 border-slate-400 flex items-center justify-center"></div>
                   <span>مجدول للعرض على الشركاء</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL OUTPUTS & IP VIEW */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Right side: Outputs */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-black text-[#183059] mb-4">المخرجات النهائية</h2>
              <p className="text-slate-500 font-bold mb-8">بعد اجتياز التقييم، يتم توجيه البحث إلى المسار المناسب لتعظيم الاستفادة منه.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {finalOutputs.map((out, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${out.bg}`}>
                      <out.i className={`w-6 h-6 ${out.c}`} />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">{out.t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Left side: Privacy and Partners */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="bg-[#105a6b] rounded-3xl overflow-hidden shadow-xl text-white">
                <div className="bg-[#0c4755] p-6 text-center">
                  <h3 className="text-xl font-black flex items-center justify-center gap-3"><Eye className="w-6 h-6" /> ما الذي يظهر للشركاء؟</h3>
                </div>
                <div className="p-8 bg-white text-slate-800 text-center">
                  <h4 className="font-black text-[#105a6b] mb-4 border-b pb-4 border-slate-100">تظهر النسخة العامة غير السرية فقط وتشمل:</h4>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {['عنوان البحث', 'القطاع', 'المشكلة', 'الحل المقترح', 'مستوى الجاهزية', 'حالة الملكية', 'نوع الشراكة'].map(t => (
                      <span key={t} className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold flex items-start gap-3 text-right border border-red-100">
                    <Lock className="w-6 h-6 shrink-0 mt-0.5" />
                    <p>لا يظهر البحث الكامل ولا التفاصيل الفنية السرية للعامة أو للشركات إلا بعد موافقة اللجنة المختصة وبعد طلب اجتماع رسمي.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

// Custom Icon for Status
const ActivityIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

export default AppliedResearchPage;
