import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Award, MapPin, Globe, Link as LinkIcon, Network, 
  MessageSquare, Briefcase, Star, Send, Users, 
  CheckCircle, ArrowLeft, ExternalLink, ChevronLeft, ChevronRight,
  TrendingUp, Award as AwardIcon, ShieldCheck
} from 'lucide-react';

const AlumniFairPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    graduationYear: '',
    faculty: '',
    company: '',
    position: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Skills/Stats from the "About Me" section in the screenshot
  const stats = [
    { title: 'معدل التوظيف والتشغيل المهني', value: 92, color: 'bg-red-600', barColor: '#b91c1c' },
    { title: 'مشاريع ريادية وشركات ناشئة ممولة', value: 85, color: 'bg-amber-600', barColor: '#d97706' },
    { title: 'شراكات صناعية واتفاقيات تدريب', value: 78, color: 'bg-slate-500', barColor: '#64748b' },
    { title: 'نقل الخبرات والتوجيه المهني للطلاب', value: 95, color: 'bg-indigo-900', barColor: '#312e81' }
  ];

  // Services from the "My Design Services" section in the screenshot
  const services = [
    {
      id: 1,
      title: 'التوجيه والإرشاد المهني',
      desc: 'جلسات استشارية وورش عمل تفاعلية يقودها خبراء من الخريجين لتطوير وتوجيه مسار الطلاب الجدد.',
      icon: Users,
      bg: 'bg-blue-50 text-blue-600'
    },
    {
      id: 2,
      title: 'منصة وظائف الخريجين',
      desc: 'بوابة توظيف حصرية تربط الخريجين المميزين بفرص العمل المتاحة لدى شركائنا المحليين والدوليين.',
      icon: Briefcase,
      bg: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 3,
      title: 'حاضنة أعمال الخريجين',
      desc: 'دعم وتمويل المشاريع الريادية والأفكار الإبداعية لخريجينا لتمكينهم من إطلاق شركاتهم الخاصة.',
      icon: Network,
      bg: 'bg-purple-50 text-purple-600'
    },
    {
      id: 4,
      title: 'التواصل والربط المجتمعي',
      desc: 'تنظيم ملتقيات سنوية ولقاءات دورية لبناء شبكات علاقات متينة وتبادل المنافع المهنية.',
      icon: MessageSquare,
      bg: 'bg-emerald-50 text-emerald-600'
    }
  ];

  // Portfolio projects from the "My Portfolio" section in the screenshot
  const portfolio = [
    {
      id: 1,
      name: 'منصة PharmaTech للصيدلة الذكية',
      category: 'tech',
      owner: 'د. ياسمين طارق (صيدلة 2018)',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
      description: 'شركة ناشئة لربط الصيدليات وتسهيل توزيع الأدوية، نجحت في الحصول على جولة تمويلية بقيمة 2 مليون دولار.'
    },
    {
      id: 2,
      name: 'شركة TechBuild للمقاولات والاستشارات',
      category: 'engineering',
      owner: 'م. خالد عبد الرحمن (هندسة 2015)',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      description: 'شركة رائدة تقدم حلول التصميم المعماري ثلاثي الأبعاد وإدارة المشروعات الإنشائية الكبرى بالخليج العربي.'
    },
    {
      id: 3,
      name: 'تطبيق التقييم المالي الذكي للمحافظ الاستثمارية',
      category: 'consulting',
      owner: 'أ. محمود سامي (تجارة 2019)',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      description: 'منصة استشارية متكاملة لتحليل المخاطر المالية وإدارة أصول الشركات الصغيرة والمتوسطة بدقة عالية.'
    },
    {
      id: 4,
      name: 'استوديو الإبداع للفنون والجداريات النحتية',
      category: 'creative',
      owner: 'أ. منى أحمد (فنون جميلة 2021)',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      description: 'معرض وورشة عمل فنية متخصصة في تصميم اللوحات الجدارية الضخمة والنحت الديكوري للمباني السكنية والإدارية.'
    }
  ];

  const filteredPortfolio = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', graduationYear: '', faculty: '', company: '', position: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-cairo text-slate-800" dir="rtl">
      
      {/* 1. Hero Section (Matching the screenshot: light background, circular image with dotted background, custom badges) */}
      <section className="relative pt-32 pb-24 bg-[#f3f8fc] overflow-hidden">
        
        {/* Subtle decorative dot grids in background */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[radial-gradient(#2563eb_2px,transparent_2px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-[radial-gradient(#2563eb_2px,transparent_2px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Right Side: Text details (In RTL, it sits on the right side) */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-blue-600 text-xs sm:text-sm font-black">
                <GraduationCap className="w-4 h-4" />
                <span>ملتقى خريجي جامعة المنيا</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black leading-tight text-slate-900">
                بوابة نجاح <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-800">
                  خريجي جامعة المنيا
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg text-slate-500 leading-relaxed font-bold max-w-xl mx-auto lg:mx-0">
                بشغفٍ للتطوير والتواصل المستمر، نجمع كفاءات جامعة المنيا المتميزة حول العالم لبناء مجتمع مهني رائد يسهم في تمكين أجيال الغد وصناعة الأثر المستدام.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('join-forum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  تواصل معنا
                </button>
                <button 
                  onClick={() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl font-black text-sm transition-all cursor-pointer shadow-sm"
                >
                  معرض الأعمال
                </button>
              </div>

            </div>

            {/* Left Side: Circular Image with Concentric Rings & Badges (Matches screenshot) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              
              {/* Overlapping concentric dotted circular pattern in the background */}
              <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] border border-blue-200/55 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite] pointer-events-none">
                <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] border border-dashed border-blue-300/40 rounded-full" />
              </div>

              {/* Main Image Container */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                  alt="ممثل الخريجين المتميزين" 
                  className="w-full h-full object-cover scale-[1.05]"
                />
              </div>

              {/* Floating Reviews/Graduates Badge (Left in LTR, Right in RTL) */}
              <div className="absolute top-10 right-4 sm:right-10 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-bounce duration-1000">
                <div className="flex -space-x-2 space-x-reverse shrink-0">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="w-7 h-7 rounded-full border border-white bg-slate-300 overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${1500000000000 + n * 10000}?w=50`} alt="Alumni face" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 text-[10px] font-black">
                    <Star className="w-3 h-3 fill-current" />
                    <span>5★ تقييم مهني</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 block mt-0.5">+20 ألف خريج</span>
                </div>
              </div>

              {/* Floating Location Indicator Pin */}
              <div className="absolute bottom-16 right-6 sm:right-16 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border border-white shrink-0">
                <MapPin className="w-4 h-4" />
              </div>

              {/* Social networks panel below the image (Matches screenshot) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
                <a href="#" className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xs" title="Facebook">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                <a href="#" className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all text-xs" title="Telegram">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.6-1.5 4.35-1.76 4.84-1.77.11 0 .35.03.5.16.13.1.17.24.18.35.01.07.02.21 0 .36z"/>
                  </svg>
                </a>
                <a href="#" className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-all text-xs" title="LinkedIn">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. About Me Section (Matching the screenshot: person pointing, skill sliders) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Right Side: Image with floating background shapes (Left in LTR) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-blue-600/10 rounded-full blur-2xl" />
              <div className="absolute -top-8 -left-8 w-44 h-44 bg-indigo-600/5 rounded-full blur-2xl" />
              
              <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80" 
                  alt="عن الملتقى" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Left Side: About Me details with skill sliders (Right in LTR) */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                عن ملتقى خريجي الجامعة
              </h2>
              
              <p className="text-slate-500 font-bold text-sm sm:text-base leading-relaxed">
                ملتقى مهني سنوي وربط إلكتروني دائم لخريجي جامعة المنيا المتميزين، نعمل برؤية مختلفة لتهيئة قنوات الربط المهني، ومساعدة الطلاب والخريجين الجدد على شق طريقهم المهني بنجاح عبر برامج التوجيه والشراكات الفعالة.
              </p>

              {/* Progress sliders (Matches screenshot) */}
              <div className="space-y-5 pt-4 text-right">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between font-black text-xs sm:text-sm">
                      <span className="text-slate-800">{stat.title}</span>
                      <span className="text-slate-500">{stat.value}%</span>
                    </div>
                    {/* Range container */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${stat.value}%`,
                          backgroundColor: stat.barColor
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. My Design Services Section (Matching the screenshot: 4 cards grid) */}
      <section className="py-20 bg-[#f3f8fc] border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4">
              ما نقدمه لخريجينا وطلابنا
            </h2>
            <p className="text-slate-500 font-bold text-sm sm:text-base">
              نوفر حزمة متكاملة من الخدمات التنموية والمهنية لضمان انتقال سلس ومتميز من البيئة الأكاديمية إلى سوق العمل.
            </p>
          </div>

          {/* Grid Cards (Matches screenshot styling: clean white, solid borders, hover link) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div key={srv.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 flex flex-col h-full text-right group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform ${srv.bg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                  
                  <button 
                    onClick={() => document.getElementById('join-forum')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 cursor-pointer self-start"
                  >
                    <span>سجل رغبتك</span>
                    <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. My Portfolio Section (Matching the screenshot: Filter tabs, portfolio grid cards) */}
      <section id="portfolio-section" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4">
              قصص نجاح ومشاريع الخريجين
            </h2>
            <p className="text-slate-500 font-bold text-sm sm:text-base">
              نستعرض هنا مشروعات مميزة وشركات ناشئة ناجحة أسسها خريجو جامعة المنيا وتلقوا دعماً أو شراكات ممتازة.
            </p>
          </div>

          {/* Filter Tabs (Matches screenshot tabs) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: 'all', name: 'الكل' },
              { id: 'tech', name: 'تقنية وبرمجة' },
              { id: 'engineering', name: 'استشارات وهندسة' },
              { id: 'creative', name: 'فنون وإبداع' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-all border ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid Cards (Matches screenshot grid styling) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group text-right">
                
                <div className="h-52 overflow-hidden relative bg-slate-100 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-blue-600 block">{item.owner}</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">قصة نجاح الخريج</span>
                    <button className="text-blue-600 font-black hover:text-blue-700 flex items-center gap-1">
                      <span>عرض التفاصيل</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Join Network Registration Form (Matches the Contact Us theme of the screenshot) */}
      <section id="join-forum" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-slate-100 text-right">
            
            <div className="text-center max-w-2xl mx-auto mb-10">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">سجل في ملتقى الخريجين</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-bold">
                كن جزءاً من تحالف وقاعدة بيانات خريجي جامعة المنيا للتواصل وتلقي فرص العمل والاستشارات وبناء العلاقات المهنية.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-black text-emerald-800">تم تسجيل بياناتك بنجاح!</h4>
                <p className="text-xs sm:text-sm text-emerald-600 font-bold mt-1">سيتواصل معك منسق الملتقى وتصلك معلومات العضوية قريباً.</p>
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
                      placeholder="اكتب اسمك كاملاً..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="example@mail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-850 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">سنة التخرج</label>
                    <input 
                      type="number" 
                      required
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                      placeholder="مثال: 2018"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">الكلية</label>
                    <input 
                      type="text" 
                      required
                      value={formData.faculty}
                      onChange={(e) => setFormData({...formData, faculty: e.target.value})}
                      placeholder="كلية الهندسة، العلوم، الصيدلة..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">جهة العمل الحالية (إن وجد)</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="اسم الشركة أو المؤسسة..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">الوظيفة الحالية</label>
                    <input 
                      type="text" 
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      placeholder="مثال: مهندس برمجيات، محاسب..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 block">كيف تود التعاون والمشاركة بالملتقى؟</label>
                  <textarea 
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="مشاركة قصة نجاح، تقديم فرص تدريبية للطلاب، التوجيه المهني، إلخ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                  تسجيل بياناتي بالملتقى
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AlumniFairPage;
