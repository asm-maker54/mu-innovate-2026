import React, { useState, useEffect } from 'react';
import { 
  Leaf, Sprout, Recycle, Sun, Droplet, Award, Users, Tractor, 
  Factory, Calendar, MapPin, CheckCircle, ArrowLeft, X, Send, 
  FileText, Briefcase, GraduationCap, ChevronLeft, ChevronRight
} from 'lucide-react';

const GreenInnovationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeImg, setActiveImg] = useState('/green1.jpg');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'student', // student, researcher, entrepreneur, investor
    interest: 'incubation', // incubation, research, partnership
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const images = [
    '/green1.jpg',
    '/green2.jpg',
    '/green3.jpg',
    '/green4.jpg',
    '/green5.jpg',
    '/green6.jpg'
  ];

  const attendees = [
    { name: 'اللواء عماد كدواني', role: 'محافظ المنيا' },
    { name: 'د. حسام عثمان', role: 'نائب وزير التعليم العالي لشئون الابتكار' },
    { name: 'د. عصام فرحات', role: 'رئيس جامعة المنيا' },
    { name: 'د. محمد أبو زيد', role: 'نائب محافظ المنيا' },
    { name: 'د. إيمان الشريف', role: 'المدير التنفيذي للمشروع وعميد تربية نوعية' }
  ];

  const partners = [
    { name: 'مصنع القناة للسكر', desc: 'شريك صناعي استراتيجي' },
    { name: 'مسرعة الأعمال "أثر"', desc: 'توجيه وتسريع نمو الشركات' },
    { name: 'منصة Plug & Play العالمية', desc: 'ريادة أعمال دولية واستثمار' },
    { name: 'شركة برمودة', desc: 'تكنولوجيا الأسمدة والتدوير' },
    { name: 'جهاز تنمية المشروعات', desc: 'دعم وتمويل المشروعات الصغيرة' },
    { name: 'منظمة الفاو (FAO)', desc: 'شراكة دولية للتنمية المستدامة' }
  ];

  const pillars = [
    {
      title: 'المجمّع الزراعي الذكي',
      desc: 'بنية تحتية متطورة تشمل 1000 فدان بمركز البحوث الزراعية وصوب تجريبية مجهزة بحساسات متقدمة لدعم الزراعة الرقمية.',
      icon: Tractor,
      bg: 'bg-emerald-50 text-emerald-700'
    },
    {
      title: 'تدوير المخلفات الحيوية',
      desc: 'تحويل التحديات البيئية وإعادة تدوير المتبقيات الزراعية لإنتاج مخصبات وأسمدة عضوية عالية الكفاءة وخفض التكلفة.',
      icon: Recycle,
      bg: 'bg-teal-50 text-teal-700'
    },
    {
      title: 'منصة إدارة المعرفة',
      desc: 'منظومة رقمية متكاملة لجمع وتحليل البيانات الزراعية واستخدام تقنيات الذكاء الاصطناعي للتنبؤ بالإنتاج ومواجهة الآفات.',
      icon: Factory,
      bg: 'bg-cyan-50 text-cyan-700'
    },
    {
      title: 'تمكين الشباب والمبتكرين',
      desc: 'توجيه مشروعات التخرج والرسائل العلمية لحل مشكلات المياه والتربة وتوفير فرص ريادة الأعمال للشباب والطلاب.',
      icon: GraduationCap,
      bg: 'bg-amber-50 text-amber-700'
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', type: 'student', interest: 'incubation', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-cairo text-slate-800" dir="rtl">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#0c3830] text-white">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <img 
            src="/green1.jpg" 
            alt="الريادة الخضراء" 
            className="w-full h-full object-cover object-center filter blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c3830]/90 to-[#0c3830]" />
        </div>
        
        {/* Decorative Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden translate-y-1">
          <svg viewBox="0 0 1440 200" fill="none" className="w-full h-24 text-slate-50 preserve-3d">
            <path d="M0,128L80,117.3C160,107,320,85,480,96C640,107,800,149,960,160C1120,171,1280,149,1360,138.7L1440,128L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z" fill="currentColor"></path>
          </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black mb-8 animate-pulse">
            <Leaf className="w-4 h-4" />
            <span>المبادرة الرئاسية "تحالف وتنمية"</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight max-w-5xl mx-auto">
            تحالف <span className="text-[#f0a500] drop-shadow-md">الريادة الخضراء</span>
            <span className="block text-xl sm:text-2xl lg:text-3xl mt-4 text-emerald-100 font-medium">
              المجمع الذكي لتعزيز الإنتاجية الزراعية والتنمية المستدامة بإقليم شمال الصعيد
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg text-emerald-50/90 max-w-4xl mx-auto leading-relaxed font-bold">
            المشروع القومي الرائد الفائز برعاية وزارة التعليم العالي والبحث العلمي لتطوير الاقتصاد المعرفي وربط البحث العلمي بالتحديات الحقيقية للقطاع الزراعي.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs sm:text-sm text-emerald-200">
            <span className="flex items-center gap-1 bg-[#092923] px-3 py-1 rounded-full border border-emerald-900/30 font-bold">
              <Calendar className="w-4 h-4 text-[#f0a500]" />
              اليوبيل الذهبي لجامعة المنيا
            </span>
            <span className="flex items-center gap-1 bg-[#092923] px-3 py-1 rounded-full border border-emerald-900/30 font-bold">
              <MapPin className="w-4 h-4 text-[#f0a500]" />
              مركز المؤتمرات بالجامعة
            </span>
          </div>
        </div>
      </section>

      {/* Main Content & News Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Right Side: The Main News Text (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 relative">
              <span className="inline-block text-[#f0a500] font-black text-xs sm:text-sm mb-4">#جامعة_المنيا_المركز_الإعلامي</span>
              
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-6 leading-tight">
                جامعة المنيا تعقد ندوة تعريفية بمشروع «الريادة الخضراء» الفائز بالمبادرة الرئاسية «تحالف وتنمية»
              </h2>

              <div className="w-20 h-1.5 bg-emerald-600 rounded-full mb-8" />

              <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 font-bold">
                <p className="text-slate-900 text-base sm:text-lg font-black bg-emerald-50/50 p-4 rounded-2xl border-r-4 border-emerald-600">
                  عقدت جامعة المنيا، برئاسة الدكتور عصام فرحات، أولى فعاليات احتفالها باليوبيل الذهبي، بتنظيم ندوة تعريفية موسعة بمشروع «الريادة الخضراء – المجمع الذكي لتعزيز الإنتاجية الزراعية والتنمية المستدامة»، المشروع الفائز بالمبادرة الرئاسية «تحالف وتنمية»، والذي يقود تحالف إقليم شمال الصعيد، وذلك بالقاعة الكبرى بمركز المؤتمرات بالجامعة، بهدف التعريف بأهداف المشروع ومكوناته ومحاوره، وحزم ومسارات العمل الخاصة به.
                </p>

                <p>
                  جاءت الندوة بحضور <strong>اللواء عماد كدواني محافظ المنيا</strong>، و<strong>الدكتور حسام عثمان نائب وزير التعليم العالي والبحث العلمي لشئون الابتكار وريادة الأعمال</strong>، والدكتور محمد أبو زيد نائب محافظ المنيا، ونواب رئيس الجامعة وأعضاء التحالف المتميزين.
                </p>

                <div className="border-t border-b border-slate-100 py-6 my-6">
                  <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <Users className="w-5 h-5 text-emerald-600" />
                    كبار الحضور والشخصيات العامة بالندوة:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {attendees.map((attendee, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-black text-slate-900">{attendee.name}</p>
                          <p className="text-slate-500 font-medium text-[11px]">{attendee.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p>
                  وشارك في الندوة ممثلو الجهات الشريكة بالتحالف، والتي تضم مصنع القناة للسكر، ومسرعة الأعمال «أثر»، وشركة برمودة، ومنصة Plug & Play العالمية، بالإضافة إلى جهاز تنمية المشروعات، وعدد من كبار رجال الأعمال والمستثمرين، وأعضاء هيئة التدريس، والباحثين، وطلاب الجامعة.
                </p>

                <p>
                  وتناولت الندوة استعراض رؤية المشروع ودوره في تعزيز الابتكار وريادة الأعمال في القطاع الزراعي، وربط البحث العلمي بالصناعة، ودعم التنمية المستدامة، بما يسهم في تحقيق أثر اقتصادي وتنموي ملموس على مستوى إقليم شمال الصعيد، في إطار توجه الدولة نحو الاقتصاد المعرفي وتحقيق أهداف الاستراتيجية الوطنية للتعليم العالي والبحث العلمي.
                </p>

                {/* President Quote */}
                <div className="bg-gradient-to-tr from-emerald-950 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 my-8 relative overflow-hidden shadow-lg">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                  <Sprout className="w-12 h-12 text-emerald-400 opacity-20 absolute top-4 left-4" />
                  <h4 className="text-[#f0a500] font-black text-sm sm:text-base mb-3">حديث الدكتور عصام فرحات رئيس الجامعة:</h4>
                  <p className="text-xs sm:text-base leading-relaxed font-bold italic text-emerald-50">
                    "إن فوز تحالف جامعة المنيا بمشروع «الريادة الخضراء» ضمن تسعة تحالفات فائزة من بين 104 تحالفات تقدمت للمنافسة، بمشاركة 808 جهة ومؤسسة صناعية، يعكس المكانة المتقدمة للجامعة كمركز للابتكار وريادة الأعمال، ويجسد الثقة في كوادرها البشرية المتميزة. هذا المشروع هو الأكبر تنموياً في تاريخ الجامعة ويهدف لتعزيز الاقتصاد القائم على المعرفة بالإقليم."
                  </p>
                </div>

                <p>
                  من جانبه، أعرب الدكتور حسام عثمان نائب وزير التعليم العالي والبحث العلمي لشئون الابتكار وريادة الأعمال، عن سعادته بتواجده في أول تنفيذ فعلي لهذا المشروع، مؤكداً أن توجه الدولة المصرية يرتكز على الاقتصاد المعرفي بوصفه ركيزة أساسية لاكتشاف المواهب، وحماية الملكية الفكرية، ودعم الابتكار، وتعزيز الدور المحوري للجامعات في تحقيق التنمية المستدامة وتوفير فرص العمل للطلاب والخريجين.
                </p>

                <p>
                  وفي السياق ذاته، استعرضت الدكتورة إيمان الشريف ملامح مشروع «الريادة الخضراء»، مؤكدة أنه مشروع غير تقليدي ينطلق برؤية مختلفة، ويُعد محاولة جادة لتحويل المشكلات والتحديات المتراكمة في القطاع الزراعي بإقليم شمال الصعيد إلى فرص استثمارية واقتصادية قائمة على اقتصاد المعرفة، من خلال التعامل مع تحديات متشابكة بيئيًا ومناخيًا ومجتمعيًا، إلى جانب تحديات التسويق والتمويل والتكنولوجيا والإنتاج.
                </p>
              </div>
            </div>

            {/* Left Side: Dynamic Gallery & Key Info (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Photo Gallery Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  ألبوم صور الفعالية والندوة
                </h3>
                
                {/* Active Image with Lightbox link */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-inner bg-slate-100 cursor-pointer" onClick={() => setLightboxImg(activeImg)}>
                  <img 
                    src={activeImg} 
                    alt="فعاليات ندوة الريادة الخضراء بجامعة المنيا" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full text-xs font-black shadow-md">اضغط لتكبير الصورة 🔍</span>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-bold">
                    اليوبيل الذهبي لجامعة المنيا
                  </span>
                </div>

                {/* Image Grid Thumbnails */}
                <div className="grid grid-cols-3 gap-2.5 mt-3">
                  {images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImg(img)}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${activeImg === img ? 'border-emerald-600 scale-[0.97] shadow-md' : 'border-transparent hover:border-slate-300'}`}
                    >
                      <img src={img} alt={`تفاصيل الندوة ${index + 1}`} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-emerald-900/10 ${activeImg === img ? 'opacity-0' : 'opacity-20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Partners Hub Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Factory className="w-5 h-5 text-emerald-600" />
                  أعضاء التحالف والشركاء الصناعيين
                </h3>
                
                <div className="space-y-3">
                  {partners.map((partner, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl border border-slate-100 transition-colors flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">{partner.name}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-bold">{partner.desc}</p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">شريك فاعل</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats panel */}
              <div className="bg-gradient-to-tr from-amber-500 to-[#f0a500] text-slate-950 rounded-3xl p-6 shadow-xl border border-amber-300/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-2xl"></div>
                <h3 className="text-lg font-black mb-3">ميزانية وتمويل المشروع 💸</h3>
                <p className="text-2xl sm:text-3xl font-black tracking-tight mb-2">يتجاوز 1,000,000,000 ج.م</p>
                <p className="text-xs font-black leading-relaxed text-slate-900">
                  مخصص لدعم 9 تحالفات وطنية فائزة بالمبادرة الرئاسية وتأهيل المجمع الذكي لتعزيز التنمية والابتكار بالصعيد.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Project Pillars - 4 pillars grid */}
      <section className="py-20 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-black mb-3">
              <Sprout className="w-3.5 h-3.5" />
              أهداف التنمية والريادة
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4">
              محاور ومشروعات الريادة الخضراء بالجامعة
            </h2>
            <p className="text-xs sm:text-base text-slate-500 max-w-2xl mx-auto font-bold">
              يغطي التحالف مجموعة متكاملة من حزم ومسارات العمل لإطلاق بيئة تكنولوجية متكاملة لخدمة المزارعين والمبتكرين.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-slate-50 hover:bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:shadow-2xl transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${pillar.bg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connect/Inquiry Form Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0c3830] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
              <Leaf className="w-12 h-12 text-[#f0a500] mx-auto mb-4" />
              <h3 className="text-xl sm:text-3xl font-black mb-2">تقديم الأفكار والتعاون البحثي</h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 font-bold">
                إذا كنت طالباً، باحثاً، أو رائد أعمال ولديك فكرة في مجالات الاقتصاد الأخضر، المياه، أو الزراعة الذكية، سجّل بياناتك للتواصل معك.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-800/40 border border-emerald-500/30 rounded-2xl p-6 text-center z-10 relative">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-black mb-1">تم إرسال طلبك بنجاح!</h4>
                <p className="text-xs text-emerald-200">سوف يقوم فريق عمل "تحالف الريادة الخضراء" بالتواصل معك في أقرب وقت.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 z-10 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-emerald-200 block">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="اكتب اسمك هنا..."
                      className="w-full bg-slate-900/40 border border-emerald-950 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-[#f0a500]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-emerald-200 block">رقم الهاتف (الواتس آب)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="01xxxxxxxxx"
                      className="w-full bg-slate-900/40 border border-emerald-950 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-[#f0a500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-emerald-200 block">الصفة الأكاديمية/المهنية</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-slate-900/40 border border-emerald-950 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-[#f0a500]"
                    >
                      <option value="student" className="text-slate-900">طالب بجامعة المنيا</option>
                      <option value="researcher" className="text-slate-900">عضو هيئة تدريس / باحث</option>
                      <option value="entrepreneur" className="text-slate-900">رائد أعمال / مبتكر</option>
                      <option value="investor" className="text-slate-900">مستثمر / شريك صناعي</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-emerald-200 block">مجال الاهتمام الرئيسي</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-slate-900/40 border border-emerald-950 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-[#f0a500]"
                    >
                      <option value="incubation" className="text-slate-900">حاضنة ريادة الأعمال الخضراء</option>
                      <option value="research" className="text-slate-900">التمويل والتحالفات البحثية</option>
                      <option value="partnership" className="text-slate-900">شراكة لوجستية أو صناعية</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-emerald-200 block">تفاصيل الفكرة أو الاستفسار</label>
                  <textarea 
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="اشرح لنا باختصار فكرتك أو كيف تود التعاون مع تحالف الريادة الخضراء..."
                    className="w-full bg-slate-900/40 border border-emerald-950 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-[#f0a500]"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#f0a500] hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  إرسال البيانات والتسجيل بالتحالف
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 left-6 text-white hover:text-[#f0a500] bg-white/10 p-2.5 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10">
            <img 
              src={lightboxImg} 
              alt="معاينة الصورة بكامل الحجم" 
              className="max-w-full max-h-[80vh] object-contain mx-auto" 
            />
            
            {/* Lightbox Navigation Buttons */}
            <div className="absolute inset-y-0 -left-20 -right-20 flex items-center justify-between px-6 pointer-events-none hidden md:flex">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIdx = images.indexOf(lightboxImg);
                  const prevIdx = (currentIdx - 1 + images.length) % images.length;
                  setLightboxImg(images[prevIdx]);
                }}
                className="text-white hover:text-[#f0a500] bg-black/50 p-3 rounded-full backdrop-blur-md transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIdx = images.indexOf(lightboxImg);
                  const nextIdx = (currentIdx + 1) % images.length;
                  setLightboxImg(images[nextIdx]);
                }}
                className="text-white hover:text-[#f0a500] bg-black/50 p-3 rounded-full backdrop-blur-md transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GreenInnovationPage;
