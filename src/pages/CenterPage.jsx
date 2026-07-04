import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Award, BookOpen, Scale, Globe, Users, CheckCircle, 
  Play, Star, ArrowLeft, ArrowRight, TrendingUp, Lightbulb, ShieldCheck
} from 'lucide-react';
import FadeInView from '../components/FadeInView';

const CenterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      id: 1,
      title: 'حاضنات ومسرعات الأعمال',
      description: 'دعم وتمويل متكامل للأفكار الريادية والشركات الناشئة لربطها بالأسواق والمستثمرين.',
      icon: Rocket,
      bg: 'bg-blue-50/50 border-blue-100',
      iconBg: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'براءات الاختراع والملكية الفكرية',
      description: 'توجيه الباحثين والمبتكرين لحماية وتسجيل الملكية الفكرية وبراءات الاختراع محلياً وعالمياً.',
      icon: Scale,
      bg: 'bg-purple-50/50 border-purple-100',
      iconBg: 'bg-purple-100 text-purple-600'
    },
    {
      id: 3,
      title: 'ورش العمل والبرامج التدريبية',
      description: 'تدريب مكثف وتأهيل للطلاب في مجالات التكنولوجيا وإدارة المشاريع وريادة الأعمال.',
      icon: BookOpen,
      bg: 'bg-emerald-50/50 border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 4,
      title: 'المنح والتعاون الدولي',
      description: 'توفير التمويل الخارجي والفرص البحثية المشتركة بالتعاون مع كبرى الجهات والجامعات الدولية.',
      icon: Globe,
      bg: 'bg-indigo-50/50 border-indigo-100',
      iconBg: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 5,
      title: 'نقل وتسويق التكنولوجيا',
      description: 'ربط مخرجات البحث العلمي بالاحتياجات الصناعية وتسهيل ترخيص المنتجات التقنية.',
      icon: Award,
      bg: 'bg-orange-50/50 border-orange-100',
      iconBg: 'bg-orange-100 text-orange-600'
    },
    {
      id: 6,
      title: 'ريادة الأعمال الرقمية',
      description: 'تحفيز الابتكار الرقمي وبناء الحلول الذكية المعتمدة على الذكاء الاصطناعي وتكنولوجيا الويب.',
      icon: Users,
      bg: 'bg-pink-50/50 border-pink-100',
      iconBg: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 font-cairo relative overflow-hidden" dir="rtl">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-450/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-orange-450/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden mb-12">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Block: Title, Text, Buttons */}
            <div className="w-full lg:w-1/2 text-center lg:text-right">
              <FadeInView delay={100} direction="up">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-6 border border-blue-100 shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                  { 'المركز الوطني للابتكار وريادة الأعمال بجامعة المنيا' }
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                  بوابتك لتحويل الابتكار إلى <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-600 to-orange-500 underline decoration-orange-500/30 underline-offset-8">
                    مشاريع ناجحة
                  </span>
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed font-medium mb-10 max-w-xl mx-auto lg:mx-0">
                  نحن هنا لتمكين الباحثين والطلاب والرياديين في جامعة المنيا من خلال توفير بيئة متكاملة تحتضن الأفكار، تحمي الملكية الفكرية، وتسهل الوصول للمستثمرين.
                </p>

                {/* Call To Actions */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <Link 
                    to="/activities"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-750 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                  >
                    استكشف أنشطتنا
                  </Link>
                  <button 
                    onClick={() => document.getElementById('promo-video')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 text-blue-600" />
                    شاهد الفيديو التعريفي
                  </button>
                </div>

                {/* User Reviews & Avatars Block */}
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-200/65">
                  <div className="flex -space-x-3 space-x-reverse">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-10 h-10 rounded-full border-2 border-white bg-slate-250 flex items-center justify-center overflow-hidden">
                        <Users className="w-5 h-5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-xs font-bold text-slate-500 mt-1 block">انضم إلى 1,500+ طالب وباحث مستفيد من خدماتنا</span>
                  </div>
                </div>
              </FadeInView>
            </div>

            {/* Right Block: Image with Floating Badges */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <FadeInView delay={200} direction="up">
                <div className="relative group">
                  {/* Offset Blue Frame */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] transform translate-x-4 translate-y-4 opacity-15 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                  
                  {/* Main Image Container */}
                  <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative bg-blue-50 z-10 shrink-0">
                    <img 
                      src="/dr-eman.jpg.jpeg" 
                      alt="مدير المركز" 
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    />
                  </div>

                  {/* Floating Badge 1: Director Title */}
                  <div className="absolute -top-4 -right-10 bg-white/95 backdrop-blur-sm border border-slate-100 p-3.5 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Award className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">مدير المركز</span>
                      <span className="text-xs font-black text-slate-850">أ.د. إيمان زكي الشريف</span>
                    </div>
                  </div>

                  {/* Floating Badge 2: Metrics */}
                  <div className="absolute bottom-6 -left-12 bg-white/95 backdrop-blur-sm border border-slate-100 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <TrendingUp className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <span className="text-lg font-black text-slate-900 leading-none">45+</span>
                      <span className="text-[10px] font-bold text-slate-500 block mt-0.5">شركة ناشئة محتضنة</span>
                    </div>
                  </div>

                  {/* Floating Badge 3: Testimonial Quote */}
                  <div className="absolute -bottom-10 right-10 bg-white/95 backdrop-blur-sm border border-slate-100 p-4 rounded-2xl shadow-xl z-20 max-w-[200px] hidden sm:block">
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-[10px] text-slate-600 font-bold leading-normal">
                      "المركز ساعدني في تسجيل براءة اختراعي وبدء مشروعي بنجاح كبير."
                    </p>
                    <span className="text-[9px] font-black text-slate-400 block mt-2">- د. محمد علي</span>
                  </div>

                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

      {/* Partners/Sponsors Row */}
      <section className="py-8 bg-white border-y border-slate-200/70">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
            شركاء النجاح الاستراتيجيين في المنظومة الابتكارية
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {['جامعة المنيا', 'أكاديمية البحث العلمي', 'مكتب TICO', 'مكتب TISC', 'وحدة GICO'].map((partner, i) => (
              <span key={i} className="text-lg font-black text-slate-700 tracking-tight hover:text-blue-600 transition-colors cursor-default">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Video Promo Section */}
      <section id="promo-video" className="py-16 bg-white border-b border-slate-100 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-10">
            <span className="text-orange-600 font-bold text-sm block mb-3 uppercase tracking-wider">شاهد العرض التقديمي</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">الفيديو التعريفي بمركز الابتكار</h2>
            <p className="text-slate-500 font-medium text-base mt-2 max-w-xl mx-auto">
              شاهد هذا العرض المرئي للتعرف على أهداف المركز وكيف يساهم في رعاية الابتكار ودعم رواد الأعمال وبناء المستقبل.
            </p>
          </div>
          
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 aspect-video bg-slate-950 max-w-4xl mx-auto group">
            {/* Embedded video - YouTube placeholder */}
            <iframe 
              className="w-full h-full absolute inset-0"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="مركز الابتكار وريادة الأعمال بجامعة المنيا" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Pillars Section ("What You'll Learn" Grid) */}
      <section className="py-20">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-sm block mb-3 uppercase tracking-wider">ماذا نقدم؟</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              كل ما تحتاجه لتطوير مشروعك وابتكارك
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              منظومة عمل متكاملة تقدم الدعم الريادي والتوجيه التقني تحت إشراف نخبة من الأكاديميين والمستشارين.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <FadeInView key={pillar.id} delay={100 * (pillar.id % 3)}>
                <div className={`p-8 rounded-[2rem] border ${pillar.bg} shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col group`}>
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-6 shrink-0`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-bold">
                    {pillar.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Director Banner ("Meet Your Instructor" Style) */}
      <section className="py-8 mb-12">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView delay={100}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10 lg:gap-14 shadow-2xl relative overflow-hidden">
              {/* Background Decor Graphic */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full -mt-16 -ml-16 pointer-events-none"></div>

              {/* Left Column: Photo */}
              <div className="relative shrink-0 z-10">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white/20 shadow-xl relative bg-blue-50/10">
                  <img 
                    src="/dr-eman.jpg.jpeg" 
                    alt="أ.د. إيمان زكي الشريف" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Title & Highlights */}
              <div className="flex-1 relative z-10 text-center md:text-right">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-600 text-white font-bold text-xs mb-4 shadow-lg shadow-orange-600/20">
                  <Award className="w-4 h-4" />
                  كلمة مدير المركز الوطني للابتكار
                </span>
                
                <h3 className="text-3xl sm:text-4xl font-black mb-3">أ.د. إيمان زكي الشريف</h3>
                <p className="text-amber-300 font-black text-sm sm:text-base mb-6">
                  مستشار رئيس الجامعة لشئون الابتكار والريادة
                </p>

                {/* Key Achievements Bullet Highlights - Symmetrical 3-Column Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right mb-6">
                  {[
                    'الإشراف على نقل وتسويق التكنولوجيا وحماية براءات الاختراع بالجامعة.',
                    'قيادة برامج الحاضنات والمسابقات الابتكارية لتخريج مشاريع ناجحة.',
                    'ربط البحث الأكاديمي والابتكارات بمتطلبات التنمية الصناعية والمستدامة.'
                  ].map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/10 p-4 rounded-xl border border-white/20">
                      <CheckCircle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                      <span className="text-xs sm:text-sm text-blue-50 font-bold leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>

                <p className="text-blue-100/90 italic font-medium leading-relaxed max-w-xl">
                  "نؤمن بأن الابتكار الحقيقي ينشأ من تمكين عقول شبابنا وربط أفكارهم بمنظومة ريادية قادرة على الاستدامة والمنافسة."
                </p>
              </div>

            </div>
          </FadeInView>
        </div>
      </section>

      {/* Support / Value Section ("Pricing" section matching screenshot layout) */}
      <section className="py-20">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Block: Invest/Values Info (8 cols) */}
            <div className="lg:col-span-7">
              <span className="text-orange-600 font-bold text-sm block mb-3 uppercase tracking-wider">سجل اهتمامك اليوم</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
                استثمر في مستقبلك الريادي اليوم
              </h2>
              <p className="text-slate-650 leading-relaxed font-bold text-base mb-8 max-w-xl">
                جميع برامج وخدمات مركز الابتكار وريادة الأعمال مدعومة بالكامل ومجانية لطلاب وباحثي وخريجي جامعة المنيا.
              </p>

              {/* Checklist details */}
              <div className="space-y-4">
                {[
                  { title: 'احتضان متكامل ومساحات عمل مشتركة مجاناً.', desc: 'نوفر المكاتب وقاعات الاجتماعات لفرق العمل الفائزة بالدعم.' },
                  { title: 'استشارات فنية وقانونية لتسجيل البراءات.', desc: 'نساعدك مجاناً في حماية الملكية الفكرية لبحوثك وابتكاراتك.' },
                  { title: 'توجيه وإرشاد مباشر من خبراء معتمدين.', desc: 'توجيه دوري من رواد أعمال ومستشارين لتسريع نمو مشروعك.' },
                  { title: 'التشبيك مع صناديق الاستثمار والجهات المانحة.', desc: 'نفتح لك قنوات الاتصال بالصناديق الاستثمارية لتمويل توسعك.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="w-5.5 h-5.5 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-black text-slate-850 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Block: Support Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeInView delay={200} direction="up">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl max-w-sm w-full text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mt-8 -ml-8 pointer-events-none"></div>
                  
                  <span className="text-slate-400 font-black text-xs uppercase tracking-wider block mb-4">قيمة الدعم المتاح</span>
                  
                  {/* Financial Value Indicator */}
                  <div className="mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">مجاني بالكامل</span>
                    <span className="text-sm font-bold text-slate-500 block mt-2">100% مدعوم ومكفول</span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8">
                    <p className="text-xs text-slate-650 font-bold leading-normal">
                      يحظى المركز بدعم مباشر من جامعة المنيا وأكاديمية البحث العلمي والتكنولوجيا (TICO) لتسهيل ريادة الأعمال.
                    </p>
                  </div>

                  <Link 
                    to="/auth"
                    className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all mb-4"
                  >
                    سجل حسابك وابدأ رحلتك الآن
                  </Link>

                  <span className="text-[10px] text-slate-400 font-bold block">متاح لجميع التخصصات الأكاديمية بالجامعة</span>
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default CenterPage;
