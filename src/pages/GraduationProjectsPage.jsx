import React, { useEffect } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, ArrowLeft, Check, 
  Settings, Users, Briefcase, Banknote, Search, HeartPulse, Cpu,
  Factory, Shield, Lock, Eye, MonitorSmartphone, GraduationCap,
  BarChart, Zap, Rocket, Handshake, Presentation, Lightbulb, Trophy,
  Smartphone, Code, Image, Heart, Palette, Wrench, Sprout, Building2,
  Stethoscope, BookOpen, Brush, Plane, Wind, Home, Globe, MessageSquare,
  HelpCircle, UploadCloud, ClipboardCheck, Award
} from 'lucide-react';

const InfoBox = ({ number, title, colorHex, children, className = '' }) => (
  <div className={`border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group ${className}`} style={{ borderColor: colorHex }}>
    <div className={`text-white px-4 py-3 flex items-center justify-between shrink-0`} style={{ backgroundColor: colorHex }}>
      <span className="font-black text-lg">{title}</span>
      <span className="bg-white px-3 py-1 rounded text-lg font-black shadow-inner" style={{ color: colorHex }}>{number}</span>
    </div>
    <div className="p-5 flex-1 flex flex-col bg-slate-50/50 group-hover:bg-white transition-colors">
      {children}
    </div>
  </div>
);

const GraduationProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8fafc] font-sans" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
          .font-black { font-weight: 900; }
          .font-bold { font-weight: 700; }
        `}
      </style>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-10 w-full relative">
          <div className="absolute top-0 right-4 hidden md:block opacity-20">
             <GraduationCap className="w-32 h-32 text-[#183059]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#183059] mb-4">منصة تسويق مشروعات التخرج</h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#d69e2e] mb-4 bg-yellow-50 py-2 px-6 rounded-full inline-block border border-yellow-200 shadow-sm">
            من مشروع تخرج إلى منتج قابل للتطبيق أو التوظيف أو الاحتضان
          </h2>
          <p className="text-lg md:text-xl font-bold text-slate-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            منصة رقمية تربط طلاب الجامعة مع الشركات والمستثمرين والحاضنات لتحويل أفكاركم إلى فرص حقيقية
          </p>
          
          {/* Top 6 Icons Banner */}
          <div className="bg-[#183059] rounded-2xl flex flex-wrap justify-between items-center p-4 md:px-8 text-white shadow-xl max-w-5xl mx-auto border-b-4 border-[#d69e2e]">
             <div className="flex flex-col items-center gap-2 p-2">
               <Rocket className="w-8 h-8 text-[#63b3ed]" />
               <span className="font-bold text-sm">حول فكرتك</span>
             </div>
             <ArrowLeft className="w-5 h-5 text-slate-400 hidden md:block" />
             <div className="flex flex-col items-center gap-2 p-2">
               <Handshake className="w-8 h-8 text-[#63b3ed]" />
               <span className="font-bold text-sm">تواصل</span>
             </div>
             <ArrowLeft className="w-5 h-5 text-slate-400 hidden md:block" />
             <div className="flex flex-col items-center gap-2 p-2">
               <Presentation className="w-8 h-8 text-[#63b3ed]" />
               <span className="font-bold text-sm">اعرض</span>
             </div>
             <ArrowLeft className="w-5 h-5 text-slate-400 hidden md:block" />
             <div className="flex flex-col items-center gap-2 p-2">
               <Settings className="w-8 h-8 text-[#63b3ed]" />
               <span className="font-bold text-sm">طوّر</span>
             </div>
             <ArrowLeft className="w-5 h-5 text-slate-400 hidden md:block" />
             <div className="flex flex-col items-center gap-2 p-2">
               <Lightbulb className="w-8 h-8 text-[#63b3ed]" />
               <span className="font-bold text-sm">ابتكر</span>
             </div>
             <ArrowLeft className="w-5 h-5 text-slate-400 hidden md:block" />
             <div className="flex flex-col items-center gap-2 p-2 bg-[#2b6cb0] px-4 py-2 rounded-xl">
               <Trophy className="w-8 h-8 text-[#ecc94b]" />
               <span className="font-bold text-sm text-center">إلى منتج أو شركة<br/>أو فرصة عمل</span>
             </div>
          </div>
        </div>

        {/* 3 Column Layout for the 8 Boxes & Circle */}
        <div className="flex flex-col xl:flex-row gap-6 relative items-start mb-12">
          
          {/* Right Column (RTL) - Boxes 1, 2, 3 */}
          <div className="w-full xl:w-1/4 flex flex-col gap-6">
            <InfoBox number="01" title="قدّم مشروع تخرجك" colorHex="#2b6cb0">
              <div className="flex gap-3 mb-4">
                <ClipboardCheck className="w-10 h-10 text-[#2b6cb0] shrink-0" />
                <ul className="space-y-3 text-sm font-bold text-slate-700">
                  {['بيانات المشروع والفريق والمشرف', 'ملخص المشروع (علمي وتسويقي)', 'المشكلة والحل والقطاع المستهدف', 'المرحلة الحالية ومستوى الجاهزية', 'الملفات والمرفقات المطلوبة'].map(t => (
                    <li key={t} className="flex items-start gap-2">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-[#2b6cb0] shrink-0" /> 
                      <span className="leading-tight">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </InfoBox>

            <InfoBox number="02" title="نوع مشروع التخرج" colorHex="#2f855a">
              <ul className="space-y-3 text-sm font-bold text-slate-700">
                {[
                  { t: 'تطبيق موبايل / منصة رقمية', i: Smartphone },
                  { t: 'جهاز أو نموذج هندسي', i: Cpu },
                  { t: 'منتج غذائي / زراعي', i: Sprout },
                  { t: 'ذكاء اصطناعي / برمجة', i: Code },
                  { t: 'تصميم إبداعي / إعلام', i: Palette },
                  { t: 'مشروع خدمي أو اجتماعي', i: Users },
                  { t: 'أخرى', i: HelpCircle }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white p-2 rounded border border-slate-100 shadow-sm">
                    <item.i className="w-5 h-5 text-[#2f855a]" />
                    <span>{item.t}</span>
                  </li>
                ))}
              </ul>
            </InfoBox>

            <InfoBox number="03" title="القطاع المستهدف" colorHex="#7cb342">
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold text-slate-700">
                {[
                  { t: 'الصناعة', i: Factory },
                  { t: 'الزراعة', i: Sprout },
                  { t: 'الصحة', i: HeartPulse },
                  { t: 'التعليم', i: BookOpen },
                  { t: 'الإبداع', i: Brush },
                  { t: 'السياحة', i: Plane },
                  { t: 'البيئة والطاقة', i: Wind },
                  { t: 'الذكاء الاصطناعي', i: Cpu },
                  { t: 'أخرى', i: HelpCircle },
                  { t: 'الاقتصاد المنزلي', i: Home },
                  { t: 'المجتمع', i: Users }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg hover:bg-[#7cb342] hover:text-white transition-colors cursor-pointer border border-slate-100">
                    <item.i className="w-6 h-6" />
                    <span className="leading-tight">{item.t}</span>
                  </div>
                ))}
              </div>
            </InfoBox>
          </div>

          {/* Center Column - Circle & Box 4 & 5 */}
          <div className="w-full xl:w-2/4 flex flex-col gap-6 items-center pt-8">
            
            {/* Central Circle */}
            <div className="relative flex justify-center mb-8 w-full">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-[12px] border-slate-100 bg-white shadow-2xl flex flex-col items-center justify-center relative transform hover:scale-105 transition-transform duration-500 overflow-hidden">
                {/* Colored ring segments for visual flair */}
                <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-[#2b6cb0] border-r-[#2f855a] border-b-[#ecc94b] border-l-[#6b46c1] opacity-70" />
                <div className="bg-[#183059] p-4 rounded-full mb-3 shadow-lg">
                  <GraduationCap className="w-12 h-12 text-white" />
                  <Users className="w-12 h-6 text-white -mt-2" />
                </div>
                <h2 className="text-3xl font-black text-[#183059] text-center leading-tight mb-2">مشروع تخرجك</h2>
                <h3 className="text-xl font-bold text-slate-600 text-center leading-tight">فرصة حقيقية<br/>لمستقبل أفضل</h3>
              </div>
            </div>

            {/* Boxes 4 and 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <InfoBox number="05" title="المشكلة والحل" colorHex="#d69e2e">
                <div className="flex gap-4 h-full items-center">
                  <div className="flex flex-col justify-center items-center shrink-0">
                    <HelpCircle className="w-16 h-16 text-[#d69e2e]/20 mb-2" />
                  </div>
                  <ul className="space-y-3 text-xs md:text-sm font-bold text-slate-700 flex-1">
                    {['ما المشكلة التي يعالجها المشروع؟', 'من الفئة المستفيدة؟', 'ما الحل المقترح؟', 'ما الميزة الجديدة أو الفريدة؟', 'هل يمكن تطبيقه بعد التخرج؟'].map(t => (
                      <li key={t} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d69e2e] shrink-0" /> 
                        <span className="leading-tight">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InfoBox>

              <InfoBox number="04" title="مستوى جاهزية المشروع" colorHex="#ed8936">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center text-xs font-bold text-slate-700 mt-2">
                  {[
                    { t: 'جاهز للاحتضان', i: Rocket },
                    { t: 'جاهز للتطوير', i: Wrench },
                    { t: 'معروض في معرض', i: Award },
                    { t: 'تجربة ميدانية', i: Globe },
                    { t: 'نموذج أولي', i: Cpu },
                    { t: 'تصميم مبدئي', i: Palette },
                    { t: 'فكرة', i: Lightbulb }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-[#ed8936] border border-orange-100">
                        <item.i className="w-5 h-5" />
                      </div>
                      <span className="leading-tight">{item.t}</span>
                    </div>
                  ))}
                </div>
              </InfoBox>
            </div>
          </div>

          {/* Left Column (RTL) - Boxes 8, 7, 6 */}
          <div className="w-full xl:w-1/4 flex flex-col gap-6">
            <InfoBox number="08" title="نوع الدعم المطلوب" colorHex="#183059">
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                {[
                  'مرشد / خبير', 'اختبار المستخدمين', 'تصميم علامة تجارية', 'عرض أمام مستثمرين', 'إدراج ضمن شركة نماء', 'توظيف أو تدريب', 'تأسيس شركة ناشئة',
                  'تدريب', 'تمويل', 'احتضان', 'تطوير تقني', 'شريك صناعي', 'تسويق وبيع', 'حماية فكرية'
                ].map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#183059] shrink-0" />
                    <span className="leading-tight">{t}</span>
                  </div>
                ))}
              </div>
            </InfoBox>

            <InfoBox number="07" title="الملكية الفكرية" colorHex="#319795">
              <ul className="space-y-3 text-xs font-bold text-slate-700 mb-4">
                {[
                  'هل المشروع قابل للحماية؟', 'هل تم نشره أو عرضه سابقاً؟', 'هل يحتوي على أسرار فنية؟', 
                  'هل توافق على عرض ملخص غير سري؟', 'هل يحتاج مراجعة عيادة الملكية الفكرية؟'
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#319795] shrink-0" />
                    <span className="leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto bg-[#319795] text-white p-3 rounded-lg flex items-center justify-center gap-3 font-bold shadow-md cursor-pointer hover:bg-[#287d7b] transition-colors">
                <Lock className="w-6 h-6" />
                <div className="text-center leading-tight">
                  <div>نحمي ابتكارك</div>
                  <div>ونضمن حقوقك</div>
                </div>
              </div>
            </InfoBox>

            <InfoBox number="06" title="الملفات المطلوبة" colorHex="#6b46c1">
              <div className="flex flex-col gap-4">
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <div className="text-center font-bold text-[#6b46c1] text-xs mb-2 border-b border-purple-200 pb-1">إلزامية</div>
                  <ul className="space-y-2 text-xs font-bold text-slate-800">
                    {['ملخص المشروع (1-2 صفحة)', 'عرض تقديمي (Pitch Deck)', 'صورة / لقطة شاشة', 'بيانات الفريق والمشرف', 'فيديو قصير يوضح المشروع'].map(t => (
                      <li key={t} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#6b46c1] shrink-0" /> 
                        <span className="leading-tight">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-center font-bold text-slate-500 text-xs mb-2 border-b border-slate-100 pb-1">اختيارية</div>
                  <ul className="space-y-2 text-xs font-bold text-slate-600">
                    {['تقرير المشروع الكامل', 'رابط التطبيق أو المنصة', 'نموذج أولي / صور / فيديو', 'دراسة جدوى / نموذج عمل', 'شهادات / خطابات اهتمام', 'موافقات أو ملكية فكرية'].map(t => (
                      <li key={t} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-slate-300 shrink-0" /> 
                        <span className="leading-tight">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoBox>
          </div>

        </div>

        {/* Timeline: مراحل سير الطلب */}
        <div className="mb-8 w-full bg-white rounded-2xl p-6 border-2 border-[#183059] shadow-sm relative mt-16">
          <div className="absolute -top-4 right-8 bg-[#183059] text-white px-6 py-1.5 rounded-full font-black text-lg shadow-md">
            مراحل سير الطلب
          </div>
          <div className="flex flex-nowrap overflow-x-auto pb-4 pt-6 justify-between gap-4 w-full">
            {[
              { t: 'تم استلام المشروع', i: UploadCloud, c: '#4299e1' },
              { t: 'تحت الفحص الإداري', i: ClipboardCheck, c: '#3182ce' },
              { t: 'تحت التقييم الفني', i: Search, c: '#2b6cb0' },
              { t: 'مراجعة الملكية الفكرية', i: Shield, c: '#2c5282' },
              { t: 'مقبول للعرض في المنصة', i: CheckCircle2, c: '#48bb78' },
              { t: 'مدرج في معرض المشروعات', i: Presentation, c: '#38a169' },
              { t: 'مرشح للاحتضان أو شركة نماء', i: Rocket, c: '#d69e2e' },
              { t: 'عرض أمام شركة أو مستثمر', i: Handshake, c: '#dd6b20' },
              { t: 'متابعة ما بعد القمة', i: Eye, c: '#e53e3e' },
              { t: 'تحويل إلى فرصة', i: Trophy, c: '#319795' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[90px] relative group">
                {idx > 0 && <div className="absolute top-6 right-[50%] w-full h-1 bg-slate-100 -z-10 group-hover:bg-blue-100 transition-colors" />}
                <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold mb-2 z-10 shadow-sm" style={{ backgroundColor: step.c }}>{idx + 1}</div>
                <step.i className="w-8 h-8 mb-2 z-10 transition-transform group-hover:scale-110" style={{ color: step.c }} />
                <span className="text-xs font-bold text-slate-700 text-center leading-tight">{step.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 3 Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Right: ما الذي يظهر للشركات والمستثمرين؟ */}
          <div className="bg-white border-2 border-[#183059] rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#183059] text-white text-center py-3 font-black text-lg">
              ما الذي يظهر للشركات والمستثمرين؟
            </div>
            <div className="p-5 flex flex-col items-center">
              <div className="flex w-full gap-4 items-center">
                <ul className="space-y-2 text-sm font-bold text-slate-700 flex-1">
                  {['اسم المشروع', 'الكلية والقسم', 'القطاع المستهدف', 'المشكلة والحل', 'مستوى الجاهزية', 'نوع الدعم المطلوب'].map(t => (
                    <li key={t} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-[#d69e2e] shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="w-32 shrink-0 flex justify-center">
                  <MonitorSmartphone className="w-24 h-24 text-[#2b6cb0]" />
                </div>
              </div>
              <button className="mt-6 w-full bg-[#38a169] text-white py-3 rounded-xl font-black text-lg shadow-md hover:bg-[#2f855a] transition-colors">
                طلب لقاء مع فريق المشروع
              </button>
            </div>
          </div>

          {/* Center: المخرجات والمسارات بعد القمة */}
          <div className="bg-white border-2 border-[#2b6cb0] rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#2b6cb0] text-white text-center py-3 font-black text-lg">
              المخرجات والمسارات بعد القمة
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              {[
                { t: 'مسار التوظيف', p: 'فرص عمل تدريب للفريق', i: Briefcase, c: '#5a4a42' },
                { t: 'مسار شركة نماء', p: 'تحويل المشروع إلى منتج أو خدمة', i: Building2, c: '#2b6cb0' },
                { t: 'مسار الاحتضان', p: 'تحويل المشروع إلى شركة ناشئة', i: Sprout, c: '#38a169' },
                { t: 'مسار الشراكات', p: 'ربط المشروع بشركات وجهات', i: Handshake, c: '#d69e2e' },
                { t: 'مسار التطوير', p: 'تطوير المشروع فنياً وتجارياً', i: Settings, c: '#319795' },
                { t: 'مسار الملكية الفكرية', p: 'حماية الابتكار والبراءات', i: Shield, c: '#2c5282' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                  <item.i className="w-8 h-8 mb-2" style={{ color: item.c }} />
                  <span className="font-bold text-sm text-slate-800 mb-1">{item.t}</span>
                  <span className="text-xs text-slate-500 font-semibold leading-tight">{item.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left: تقييم اللجنة */}
          <div className="bg-white border-2 border-[#2c5282] rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#2c5282] text-white text-center py-3 font-black text-lg">
              تقييم اللجنة
            </div>
            <div className="p-5 flex gap-4">
              <div className="w-16 shrink-0 flex flex-col items-center">
                <ClipboardCheck className="w-12 h-12 text-[#d69e2e] mb-4" />
                <div className="font-black text-2xl text-[#2c5282] mt-auto">100</div>
              </div>
              <div className="flex-1">
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  {[
                    {l:'وضوح المشكلة', s:10}, {l:'قوة الحل', s:15}, {l:'الابتكار والتميز', s:15}, 
                    {l:'قابلية التطبيق', s:15}, {l:'جاهزية النموذج الأولي', s:15}, 
                    {l:'الأثر الاقتصادي/المجتمعي', s:10}, {l:'قابلية التسويق أو الاحتضان', s:10}, {l:'جودة العرض والملفات', s:10}
                  ].map((t, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="leading-tight">{t.l}</span>
                      <span className="bg-[#2c5282] text-white px-2 py-0.5 rounded-full font-black text-[10px]">{t.s}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between pt-1">
                    <span className="font-black text-[#2c5282]">المجموع</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
           <div className="absolute left-0 bottom-0 opacity-20 hidden md:block">
             <GraduationCap className="w-48 h-48 -mb-10 -ml-10" />
           </div>
           
           <div className="flex-1 z-10 text-center md:text-right mb-6 md:mb-0">
             <h3 className="text-xl md:text-2xl font-black text-[#ecc94b] mb-2">مشروع تخرجك ليس نهاية الدراسة...</h3>
             <h4 className="text-2xl md:text-3xl font-black">بل بداية منتج أو شركة أو فرصة عمل</h4>
           </div>

           <div className="flex gap-6 z-10 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
             <div className="flex flex-col items-center gap-2">
               <Lightbulb className="w-8 h-8 text-[#ecc94b]" />
               <span className="font-bold text-sm">فكرة اليوم</span>
             </div>
             <div className="w-px bg-white/30" />
             <div className="flex flex-col items-center gap-2">
               <BarChart className="w-8 h-8 text-[#63b3ed]" />
               <span className="font-bold text-sm">ابتكار الغد</span>
             </div>
             <div className="w-px bg-white/30" />
             <div className="flex flex-col items-center gap-2">
               <Trophy className="w-8 h-8 text-[#48bb78]" />
               <span className="font-bold text-sm">فرصة المستقبل</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default GraduationProjectsPage;
