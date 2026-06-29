import React, { useState, useEffect } from 'react';
import { 
  Users, PlayCircle, Mic, Target, Handshake, Leaf, MapPin, 
  UsersRound, CalendarDays, Camera, MessagesSquare,
  Building2, Laptop, LineChart, Briefcase, Lightbulb, ShieldCheck,
  Clock, CheckCircle2, ChevronDown, Music, Trophy, Presentation, Medal, FileSignature, PartyPopper, Store
} from 'lucide-react';

const day1 = [
  { time: '08:30 - 09:00', title: 'استقبال رسمي وتسجيل كبار الضيوف', content: 'قيادات الجامعة، الوزير، المحافظ، الشركاء، ممثلو الصناعة والبنوك', outcome: 'تنظيم الحركة والبروتوكول وإتاحة ملف مختصر للقمة', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { time: '09:00 - 09:15', title: 'السلام الجمهوري وفيلم افتتاحي', content: 'عرض قصة جامعة المنيا: من التعليم إلى الابتكار', outcome: 'رسالة مؤسسية موحدة', icon: PlayCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  { time: '09:15 - 09:45', title: 'فقرة موسيقية', content: 'فقرة موسيقية وطنية', outcome: 'رسالة مؤسسية موحدة', icon: Music, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { time: '09:45 - 10:15', title: 'كلمات الافتتاح', content: 'رئيس الجامعة، الوزير، المحافظ، الشركاء الاستراتيجيون', outcome: 'إعلان سياسي ومؤسسي داعم للقمة', icon: Mic, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { time: '10:15 - 10:35', title: 'إطلاق منظومة المبادرات والبرامج', content: 'رواد جامعة المنيا، الابتكار الأخضر، شبكة المدربين، تسويق البحوث، الملكية الفكرية، التوظيف', outcome: 'إطلاق رسمي للحزمة التنفيذية', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { time: '10:35 - 10:50', title: 'توقيع بروتوكولات وشراكات استراتيجية', content: 'جهاز تنمية المشروعات، شركات توظيف، بنوك، جهات تدريب، حاضنات', outcome: 'خطابات نوايا/بروتوكولات', icon: Handshake, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { time: '10:50 - 11:45', title: 'إطلاق شركة نماء', content: 'عرض الهوية والقطاعات وخطة التسويق', outcome: 'تدشين الذراع الإنتاجي والتسويقي للجامعة', icon: Leaf, color: 'text-green-600', bg: 'bg-green-600/10' },
  { time: '11:45 - 12:45', title: 'الجولة الوزارية في شارع الابتكار والمعارض', content: 'معرض منتجات الوحدات الإنتاجية، معرض الابتكارات الرقمية، معرض تسويق البحوث، الابتكار الأخضر، ملتقى التوظيف، جناح خدمات المؤسسين', outcome: 'مشاهدة مخرجات ملموسة وتوثيق إعلامي قوي', icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { time: '12:45 - 13:00', title: 'المائدة المستديرة الوزارية: جامعة المنيا بوابة الابتكار في صعيد مصر', content: 'الصناعة، الزراعة، الاستثمار، البنوك، الحاضنات، شركة نماء، الكليات', outcome: 'توصيات تنفيذية ومصفوفة شراكات', icon: UsersRound, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { time: '13:00 - 13:20', title: 'إعلان خريطة 90 يومًا وتوصيات اليوم الأول', content: 'إعلان ما سيحدث بعد القمة', outcome: 'التزام زمني واضح للمتابعة', icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { time: '13:20 - 15:00', title: 'صورة تذكارية ومؤتمر صحفي مختصر', content: 'إعلام الجامعة والشركاء', outcome: 'تعظيم الأثر الإعلامي', icon: Camera, color: 'text-slate-600', bg: 'bg-slate-600/10' },
  { time: '15:00 - 15:30', title: 'استكمال جولات المعارض ولقاءات الشركاء', content: 'طلاب، شركات، باحثون، وحدات إنتاج', outcome: 'بدء التفاعل والتسجيل والمتابعة', icon: MessagesSquare, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const day1Exhibitions = [
  { title: 'معرض منتجات الوحدات الإنتاجية بجامعة المنيا', desc: 'يعرض المنتجات والخدمات القابلة للتسويق عبر شركة نماء.' },
  { title: 'معرض تسويق البحوث حسب الجاهزية', desc: 'يعرض البحوث ومشروعات التخرج التطبيقية وفق مستويات الحماية والتطوير والتسويق.' },
  { title: 'معرض الابتكارات الرقمية ومشروعات الكليات', desc: 'يعرض التطبيقات والمنصات والنماذج الرقمية والذكاء الاصطناعي وحلول الطلاب.' },
  { title: 'معرض الابتكار الأخضر', desc: 'يعرض حلول “كل كلية… حل أخضر” في الطاقة والمياه والمخلفات والزراعة والغذاء والسياحة والصحة.' },
  { title: 'ملتقى التوظيف والشراكات المهنية', desc: 'جناح الشركات وفرص التدريب والتوظيف وMinia Talent Pool.' },
  { title: 'جناح خدمات المؤسسين', desc: 'جهاز تنمية المشروعات، البنوك، الملكية الفكرية، التأسيس، الضرائب، الحاضنات، المسرعات، وجهات التوظيف.' },
  { title: 'منطقة الوصول إلى السوق', desc: 'دعم المنتجات في التسعير، الوصف، التصوير، التغليف، وصفحة البيع.' },
];

const day2 = [
  { time: '09:00 - 10:30', title: 'ورش جهاز تنمية المشروعات', content: 'ابدأ مشروعك، حسن مشروعك، دراسة الجدوى، التمويل', outcome: 'تأهيل الفرق للتمويل والتأسيس', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { time: '09:00 - 10:30', title: 'ورش شبكة مدربي جامعة المنيا الرقمية', content: 'AI، تحليل بيانات، تسويق رقمي، عمل حر، أمن سيبراني', outcome: 'بدء تدريب فعلي بقيادة أبناء الجامعة', icon: Laptop, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { time: '10:45 - 12:00', title: 'جلسات تسويق البحوث الفنية', content: 'تقييم الجاهزية، الحماية، نموذج أولي، شريك صناعي', outcome: 'ملفات بحوث قابلة للمتابعة', icon: LineChart, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { time: '12:00 - 13:30', title: 'جلسات التوظيف والمقابلات', content: 'مقابلات، مراجعة CV، LinkedIn، مهارات مهنية', outcome: 'فرص ومواعيد مقابلات', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { time: '13:30 - 15:00', title: 'تحديات الشركات وفرق الحلول', content: 'إعلان تحديات وحلول أولية متعددة التخصصات', outcome: 'فرق عمل ومقترحات حلول', icon: Lightbulb, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { time: '15:00 - 16:00', title: 'عيادات الملكية الفكرية والتأسيس', content: 'IP، عقود مؤسسين، Startup ID، جاهزية قانونية', outcome: 'فحص أولي للمشروعات', icon: ShieldCheck, color: 'text-teal-500', bg: 'bg-teal-500/10' },
];

const day3 = [
  { time: '09:00 - 10:30', title: 'نهائيات Pitching', content: 'أفضل رائد أعمال وأفضل رائدة أعمال ومشروعات القطاعات', outcome: 'قائمة فائزين ومرشحين للاحتضان', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { time: '10:30 - 12:00', title: 'Minia Venture Day', content: 'عروض مختصرة للمشروعات الجاهزة أمام المستثمرين والبنوك والحاضنات', outcome: 'قائمة تمويل/احتضان محتملة', icon: Presentation, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { time: '12:00 - 13:00', title: 'Investor Matchmaking Rooms', content: 'اجتماعات 15 دقيقة لكل مشروع مع جهة مناسبة', outcome: 'نماذج متابعة لكل اجتماع', icon: Handshake, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { time: '13:00 - 14:00', title: 'جوائز جامعة المنيا للابتكار', content: 'تكريم الكليات، الوحدات، الباحثين، المشروعات، الشركاء', outcome: 'تعزيز ثقافة التميز', icon: Medal, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { time: '14:00 - 14:30', title: 'إعلان خطة 90 يومًا', content: 'مسارات تدريب، احتضان، تمويل، تسويق، توظيف، حماية', outcome: 'التزامات تنفيذية واضحة', icon: FileSignature, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { time: '14:30 - 15:30', title: 'الحفل الفني والختام', content: 'إبداع طلابي وتكريم وشكر الشركاء', outcome: 'ختام إعلامي ومؤسسي', icon: PartyPopper, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const AgendaItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div 
      className={`group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer ${isOpen ? 'ring-2 ring-blue-500/20' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
        
        {/* Time Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 min-w-[140px] justify-center text-slate-700 font-bold">
          <Clock className="w-4 h-4 text-slate-400" />
          <span dir="ltr">{item.time}</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-start gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${item.bg}`}>
            <Icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {item.content}
            </p>
          </div>
        </div>

        {/* Expand Icon */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-none border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
          {!isOpen && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
              <CheckCircle2 className="w-4 h-4" />
              المخرج المستهدف
            </div>
          )}
          <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Expandable Outcome Section */}
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-slate-50 border-t border-slate-100`}>
        <div className="p-6 md:px-8">
          <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-blue-700 font-bold mb-1 text-sm">المخرج المتوقع</h4>
              <p className="text-slate-700 font-medium">{item.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgendaPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-24 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-blue-600 mb-6 text-sm font-bold">
            <CalendarDays className="w-4 h-4" />
            جدول الفعاليات
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            أجندة القمة
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            تعرف على تفاصيل الجلسات، ورش العمل، والأنشطة الموزعة على ثلاثة أيام حافلة بالابتكار والإبداع.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab(1)}
              className={`flex-1 sm:flex-none whitespace-nowrap sm:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === 1 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              اليوم الأول
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`flex-1 sm:flex-none whitespace-nowrap sm:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === 2 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              اليوم الثاني
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`flex-1 sm:flex-none whitespace-nowrap sm:px-10 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 ${
                activeTab === 3 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              اليوم الثالث
            </button>
          </div>
        </div>

        {/* Day Header Info */}
        <div className="mb-8 text-center sm:text-right">
          <h2 className={`text-2xl md:text-3xl font-black ${
            activeTab === 1 ? 'text-blue-600' : 
            activeTab === 2 ? 'text-emerald-600' : 'text-purple-600'
          }`}>
            {activeTab === 1 ? 'اليوم الأول: اليوم الوزاري رفيع المستوى' : 
             activeTab === 2 ? 'اليوم الثاني: يوم التشغيل الفني والتدريب والشراكات' : 
             'اليوم الثالث: يوم العروض والجوائز وخطة 90 يومًا'}
          </h2>
        </div>

        {/* Agenda List */}
        <div className="space-y-4">
          {activeTab === 1 && day1.map((item, index) => (
            <div key={`d1-${index}`} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}>
              <AgendaItem item={item} />
            </div>
          ))}

          {activeTab === 2 && day2.map((item, index) => (
            <div key={`d2-${index}`} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}>
              <AgendaItem item={item} />
            </div>
          ))}
          
          {activeTab === 3 && day3.map((item, index) => (
            <div key={`d3-${index}`} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}>
              <AgendaItem item={item} />
            </div>
          ))}
        </div>

        {/* Extra Section: Day 1 Exhibitions */}
        {activeTab === 1 && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 delay-300">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Store className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black">المعارض التي سيتم افتتاحها في اليوم الأول</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {day1Exhibitions.map((exhibition, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                      <h4 className="text-blue-300 font-bold text-lg mb-2 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {exhibition.title}
                      </h4>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed pr-5">
                        {exhibition.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgendaPage;
