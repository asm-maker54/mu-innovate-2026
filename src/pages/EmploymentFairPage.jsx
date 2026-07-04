import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Building2, MapPin, Clock, Search, ExternalLink, 
  ChevronLeft, Target, Phone, ArrowLeft, CheckCircle, Star, Users,
  BookOpen, Sparkles, UserCheck, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EmploymentFairPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    faculty: '',
    cvUrl: '',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', faculty: '', cvUrl: '', message: '' });
    }, 5000);
  };

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

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-cairo text-slate-800" dir="rtl">
      
      {/* 1. Hero Section (White background, abstract colorful organic blobs, search input with blue button) */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        
        {/* Soft background glow circles */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Right Side: Text & Actions (In RTL, sits right) */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-black animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>ملتقى التوظيف السنوي والوظائف</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black leading-tight text-slate-900">
                بوابتك المهنية <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-red-600 to-orange-500">
                  للانطلاق والتميز
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg text-slate-500 leading-relaxed font-bold max-w-xl mx-auto lg:mx-0">
                نربط خريجي جامعة المنيا المتميزين بكبرى الشركات الإقليمية والمحلية، لتأهيلهم وتقديم قنوات اتصال مباشرة للمقابلات الفورية وفرص التدريب والتوظيف الحصرية.
              </p>

              {/* Floating search input with button (Matches screenshot) */}
              <div className="pt-2 max-w-md mx-auto lg:mx-0">
                <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center shadow-lg shadow-slate-100/80 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-500/10 transition-all">
                  <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="ابحث عن وظائف، شركات، أو تخصصات..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400/80 w-full text-xs sm:text-sm font-bold pr-2" 
                  />
                  <button 
                    onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    تصفح الوظائف
                  </button>
                </div>
              </div>

              {/* Phone contact text below it (Matches screenshot) */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-black text-slate-500 pt-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>تواصل معنا للاستفسار:</span>
                <a href="tel:0100000000" className="text-slate-900 hover:underline">0100000000</a>
              </div>

            </div>

            {/* Left Side: Circular Image with organic color blobs & charts backdrop (Matches screenshot) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              
              {/* Colorful organic blob backdrop (custom gradients) */}
              <div className="absolute w-72 h-72 sm:w-[420px] sm:h-[420px] bg-gradient-to-tr from-sky-400/20 via-emerald-300/10 to-red-400/20 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
              <div className="absolute w-60 h-60 sm:w-[350px] sm:h-[350px] bg-gradient-to-bl from-orange-400/10 via-yellow-200/10 to-blue-400/20 rounded-[50%_40%_30%_70%_/_50%_60%_40%_50%] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />

              {/* Main Image in circular mask */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-50 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80" 
                  alt="ملتقى توظيف جامعة المنيا" 
                  className="w-full h-full object-cover scale-[1.05]"
                />
              </div>

              {/* Floating bar chart card in background */}
              <div className="absolute -top-6 right-6 sm:right-16 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-3 shadow-xl flex flex-col gap-2 pointer-events-none">
                <span className="text-[9px] font-black text-slate-400">إحصائيات التوظيف الأسبوعية</span>
                <div className="flex items-end gap-1.5 h-12 w-20">
                  <div className="w-2.5 h-6 bg-red-400 rounded-t" />
                  <div className="w-2.5 h-10 bg-orange-400 rounded-t animate-pulse" />
                  <div className="w-2.5 h-8 bg-blue-500 rounded-t" />
                  <div className="w-2.5 h-12 bg-emerald-500 rounded-t" />
                </div>
              </div>

              {/* Floating pie chart card in background */}
              <div className="absolute -bottom-6 left-6 sm:left-16 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 pointer-events-none">
                <div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-red-500 animate-spin duration-3000 shrink-0" />
                <div className="text-right">
                  <span className="text-[9px] font-black text-slate-400 block">توافق الشواغر</span>
                  <span className="text-xs font-black text-slate-900">+89% تطابق</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Partners Ribbon (Grayscale logos from screenshot) */}
      <section className="py-8 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-slate-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
            <span className="hover:text-slate-600 transition-colors">مصنع القناة للسكر</span>
            <span className="hover:text-slate-600 transition-colors">مسرعة الأعمال أثر</span>
            <span className="hover:text-slate-600 transition-colors">شركة برمودة للتدوير</span>
            <span className="hover:text-slate-600 transition-colors">جهاز تنمية المشروعات</span>
            <span className="hover:text-slate-600 transition-colors">منصة Plug & Play العالمية</span>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section (Left: Boosts website traffic text, Right: 4 colored cards) */}
      <section className="py-20 bg-white">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Right Column: Why Choose Us info & Action (Left in LTR) */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              <span className="text-xs font-black text-[#f0a500] tracking-widest uppercase">لماذا تسجل بالملتقى؟</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                فرصتك الحقيقية للربط <br />
                المباشر بسوق العمل
              </h2>
              <p className="text-slate-500 font-bold text-sm sm:text-base leading-relaxed">
                ملتقى التوظيف ليس مجرد معرض لعرض الوظائف، بل منصة تفاعلية متكاملة تهيئ بيئة حقيقية لربط المبتكرين والخريجين بالشركاء الصناعيين والاستثماريين لتأهيل مخرجات الابتكار بالجامعة وتسهيل الحصول على عقود توظيف واستشارات.
              </p>
              
              <button 
                onClick={() => document.getElementById('register-cv')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs sm:text-sm cursor-pointer shadow-md transition-all inline-block"
              >
                انضم الآن وسجّل سيرتك الذاتية
              </button>
            </div>

            {/* Left Column: 4 Colored Grid Cards (Right in LTR) */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-right space-y-4 hover:border-orange-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">تصفح الشواغر والفرص</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  استكشف مئات الفرص الوظيفية والتدريبية المناسبة لمختلف التخصصات والخريجين الجدد.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-right space-y-4 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">مقابلات توظيف فورية</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  تواصل والتقِ بمديري التوظيف وممثلي كبرى الشركات والمصانع مباشرةً لإجراء مقابلات عمل.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-right space-y-4 hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shrink-0 shadow-md">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">استشارات مهنية مجانية</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  احجز جلسة استشارية خاصة لمراجعة سيرتك الذاتية وتعديلها وتحسينها مع مستشارين مهنيين.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-right space-y-4 hover:border-purple-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">دعم المشروعات الريادية</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  اعرض مشروع تخرجك أو ابتكارك الرقمي على المستثمرين للحصول على فرص احتضان وتمويل مالي.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. App/Platform Mockup Section (Left: Phone dashboard graphics, Right: Match skills text) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Right Column: Phone Mockups collage (Left in LTR) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              
              {/* Overlapping Phone Screens Collage (CSS styled cards mimicking dashboard UI) */}
              <div className="relative w-64 h-[440px] bg-[#0c1b30] rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-900 overflow-hidden shrink-0">
                {/* Speaker phone screen top */}
                <div className="w-20 h-4 bg-slate-900 mx-auto rounded-full mb-4" />
                
                {/* Simulated App Dashboard */}
                <div className="space-y-4 text-right text-white">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black text-blue-400">Minia Talent Pool</span>
                    <Users className="w-4 h-4 text-slate-400" />
                  </div>
                  
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-white/5 space-y-1.5">
                    <span className="text-[9px] text-slate-400 block font-bold">نسبة تطابق ملفك المهني</span>
                    <span className="text-lg font-black block text-emerald-400">92% تطابق</span>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 block">الوظائف المقترحة لك:</span>
                    {[
                      { title: 'مهندس برمجيات واجهات', comp: 'TechVision' },
                      { title: 'مطور خادم سحابي', comp: 'SoftCore' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-800/40 rounded-xl border border-white/5 text-[9px] flex justify-between items-center">
                        <span className="bg-blue-600/80 px-2 py-0.5 rounded text-[8px]">عرض</span>
                        <div>
                          <p className="font-bold">{item.title}</p>
                          <p className="text-slate-500">{item.comp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second overlapping mockup/screen (shifted right/down) */}
              <div className="absolute w-44 h-80 bg-white rounded-[2rem] p-3.5 shadow-2xl border-4 border-slate-200 overflow-hidden translate-x-28 translate-y-16 hidden sm:block">
                <div className="space-y-3 text-right">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 block">السيرة الذاتية المفحوصة</span>
                  <p className="text-xs font-black text-slate-900">سجل المقابلات الشخصية</p>
                  
                  <div className="space-y-2 text-[8px] font-bold text-slate-600">
                    <div className="p-2 bg-emerald-50 rounded-lg flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle className="w-3 h-3" />
                      <span>تم قبول طلب المقابلة</span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg flex items-center gap-1.5 text-blue-700">
                      <Clock className="w-3 h-3" />
                      <span>مقابلة قيد المراجعة</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Left Column: Skill matching info & stats (Right in LTR) */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              <span className="text-xs font-black text-blue-600 tracking-widest uppercase">التوظيف والترشيح الذكي</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                نطابق مهاراتك العلمية <br />
                مع متطلبات سوق العمل
              </h2>
              <p className="text-slate-500 font-bold text-sm sm:text-base leading-relaxed">
                من خلال بنك الكفاءات الجامعي (Minia Talent Pool)، نقوم بتحليل السير الذاتية للخريجين ومطابقتها إلكترونياً مع شواغر الشركات المشاركة، مما يزيد من سرعة إتمام التوظيف وجودة الاختيار الفني.
              </p>

              {/* Progress sliders (Matches screenshot) */}
              <div className="space-y-4 pt-2 text-right">
                {[
                  { title: 'دقة المطابقة الذكية للمهارات (AI Match)', val: 90, color: '#f0a500' },
                  { title: 'نسبة القبول الفني في المقابلات الأولية', val: 78, color: '#e04f3f' },
                  { title: 'رضا الشركات المشاركة عن كفاءات الخريجين', val: 95, color: '#10b981' }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-slate-800">{stat.title}</span>
                      <span className="text-slate-500">{stat.val}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${stat.val}%`, backgroundColor: stat.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Jobs Showcase List (Section with jobs list from earlier) */}
      <section id="jobs-section" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4">
              أحدث الوظائف والشواغر المعلنة بالملتقى
            </h2>
            <p className="text-slate-500 font-bold text-sm sm:text-base">
              تصفح وقدم مباشرةً على الوظائف المتوفرة حالياً بالملتقى بالتنسيق مع شركائنا.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 hover:border-slate-900 hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row gap-6 text-right group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-slate-100 shrink-0 bg-slate-50">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {job.title}
                      </h3>
                      <button className="text-slate-400 hover:text-slate-900 shrink-0">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-xs sm:text-sm text-slate-500 font-bold flex items-center gap-1.5 mb-4">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>{job.company}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 text-[10px] sm:text-xs">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 font-bold rounded-lg flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-700 font-bold rounded-lg flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.experience}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <button 
                      onClick={() => document.getElementById('register-cv')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-grow py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-md cursor-pointer text-center"
                    >
                      التقدم للوظيفة
                    </button>
                    <button 
                      onClick={() => document.getElementById('register-cv')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-black cursor-pointer text-center"
                    >
                      تفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="col-span-full py-16 text-center bg-slate-50 rounded-3xl border border-slate-200 px-4">
                <h4 className="text-slate-700 font-black text-base">لا توجد وظائف تطابق بحثك حالياً</h4>
                <p className="text-slate-400 text-xs mt-1 font-bold">جرب كتابة مسمى وظيفي آخر، أو سجل سيرتك الذاتية ليصلك تنبيه بالوظائف الجديدة.</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => document.getElementById('register-cv')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-black text-xs hover:bg-slate-50 cursor-pointer shadow-sm"
            >
              عرض المزيد من الوظائف
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Stats & Fluid Image Section (Matches bottom block of screenshot: 4 stats cards & woman shape) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Right Column: 4 grid stats cards (Left in LTR) */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
              
              {/* Stat 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-150 text-right space-y-2">
                <span className="text-3xl sm:text-4xl font-black text-red-600 block">+350</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 block">فرصة وظيفة معلنة</span>
                <p className="text-[10px] text-slate-500 font-bold leading-normal">
                  تحديث حصر الفرص بالتعاون مع 48 شركة ومصنع شريك بالتحالف.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-150 text-right space-y-2">
                <span className="text-3xl sm:text-4xl font-black text-orange-500 block">89%</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 block">معدل المقابلات والقبول</span>
                <p className="text-[10px] text-slate-500 font-bold leading-normal">
                  فرص نجاح مقابلة العمل المبدئية عند الترشيح الذكي لملفك.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-150 text-right space-y-2">
                <span className="text-3xl sm:text-4xl font-black text-blue-600 block">1500+</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 block">طالب وخريج مسجل</span>
                <p className="text-[10px] text-slate-500 font-bold leading-normal">
                  باحث عن العمل تم ربطه وتوجيهه مهنياً وتعديل سيرته الذاتية.
                </p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-150 text-right space-y-2">
                <span className="text-3xl sm:text-4xl font-black text-emerald-600 block">94%</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 block">معدل رضا المؤسسات الشريكة</span>
                <p className="text-[10px] text-slate-500 font-bold leading-normal">
                  مستوى الرضا عن جودة الفحص والمطابقة للكفاءات والمهارات الفنية.
                </p>
              </div>

            </div>

            {/* Left Column: Woman in fluid organic blob shape (Right in LTR) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative order-1 lg:order-2">
              
              {/* Organic blob background */}
              <div className="absolute w-72 h-72 sm:w-[400px] sm:h-[400px] bg-gradient-to-br from-red-400/20 via-yellow-300/10 to-teal-400/20 rounded-[60%_40%_30%_70%_/_50%_40%_60%_50%] pointer-events-none animate-[pulse_7s_ease-in-out_infinite]" />
              
              {/* Custom shaped profile frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[45%_55%_65%_35%_/_45%_45%_55%_55%] overflow-hidden border-4 border-white shadow-2xl bg-slate-50 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80" 
                  alt="ممثل العلاقات والتوظيف" 
                  className="w-full h-full object-cover scale-[1.05]"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. Structured Registration / CV Form (Matches bottom Reach Us section) */}
      <section id="register-cv" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-slate-200 text-right">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Briefcase className="w-12 h-12 text-[#e04f3f] mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">تقديم السيرة الذاتية (CV)</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-bold">
                سجل بياناتك وأرفق سيرتك الذاتية ليقوم مدراء الموارد البشرية بالشركات الشريكة بمراجعتها وترشيحك للمقابلات.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-black text-emerald-800">تم تقديم طلبك وسيرتك الذاتية بنجاح!</h4>
                <p className="text-xs sm:text-sm text-emerald-600 font-bold mt-1">سوف يقوم نظام المطابقة والتوظيف بالملتقى بفحص ملفك والرد عليك قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="اكتب اسمك كما هو في السيرة الذاتية..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="username@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">رقم الهاتف (الواتس آب)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="01xxxxxxxxx"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">كلية التخرج / التخصص</label>
                    <input 
                      type="text" 
                      required
                      value={formData.faculty}
                      onChange={(e) => setFormData({...formData, faculty: e.target.value})}
                      placeholder="كلية الحاسبات، الهندسة، التجارة..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 block">رابط السيرة الذاتية (Google Drive / LinkedIn / PDF)</label>
                  <input 
                    type="url" 
                    required
                    value={formData.cvUrl}
                    onChange={(e) => setFormData({...formData, cvUrl: e.target.value})}
                    placeholder="أدخل رابط ملف الـ PDF لسيرتك الذاتية..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 block">المهارات الأساسية والخبرات السابقة</label>
                  <textarea 
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="اكتب بإيجاز مهاراتك الفنية وخبراتك التي ترغب في إبرازها لأصحاب الأعمال..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-slate-900/25"
                >
                  <Send className="w-4 h-4" />
                  تقديم السيرة الذاتية للتسجيل بالملتقى
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default EmploymentFairPage;
