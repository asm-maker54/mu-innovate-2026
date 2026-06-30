import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, ArrowLeft, ArrowRight,
  Settings, Users, Briefcase, Search, HeartPulse, Cpu,
  Factory, Shield, Lock, Eye, MonitorSmartphone, GraduationCap,
  BarChart, Rocket, Handshake, Presentation, Lightbulb, Trophy,
  Smartphone, Code, Palette, Wrench, Sprout, Building2,
  BookOpen, Brush, Plane, Wind, Home, Globe,
  HelpCircle, UploadCloud, ClipboardCheck, Award, FileText, CheckCircle
} from 'lucide-react';

const SectionTitle = ({ title, subtitle, isDark, align = 'right' }) => (
  <div className={`mb-12 ${align === 'center' ? 'flex flex-col items-center text-center' : 'text-right'}`}>
    <div className={`flex items-center justify-center gap-2 mb-2 ${isDark ? 'text-[#F4A217]' : 'text-[#F4A217]'}`}>
      <span className="w-8 h-px bg-[#F4A217]"></span>
      <span className="font-bold text-sm md:text-base tracking-wider">{subtitle}</span>
    </div>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black ${isDark ? 'text-white' : 'text-[#26462C]'} leading-tight`}>
      {title}
    </h2>
  </div>
);

const GraduationProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
          .font-black { font-weight: 900; }
          .font-bold { font-weight: 700; }
          .hero-gradient { background: linear-gradient(135deg, #1e3622 0%, #26462C 100%); }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#F4A217] rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#4CAF50] rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#F4A217] animate-pulse"></span>
              <span className="text-white text-sm font-bold">منصة تسويق مشروعات التخرج</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              من مشروع تخرج إلى <br/>
              <span className="text-[#F4A217]">منتج أو شركة أو فرصة عمل</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 font-medium mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              منصة رقمية تربط طلاب الجامعة مع الشركات والمستثمرين والحاضنات لتحويل أفكاركم إلى فرص حقيقية تخدم المجتمع وسوق العمل.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                to="/submit-graduation-project" 
                className="w-full sm:w-auto bg-[#F4A217] text-[#26462C] px-8 py-4 rounded-full font-black text-lg hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(244,162,23,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                سجل مشروع تخرجك
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right/Left Image & Steps Badges */}
          <div className="flex-1 w-full flex justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-[#F4A217] rounded-full opacity-10 scale-110 blur-xl animate-pulse"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {[
                  { icon: Rocket, label: 'حول فكرتك' },
                  { icon: Handshake, label: 'تواصل' },
                  { icon: Presentation, label: 'اعرض' },
                  { icon: Settings, label: 'طوّر' },
                  { icon: Lightbulb, label: 'ابتكر' },
                  { icon: Trophy, label: 'منتج/عمل', highlight: true }
                ].map((item, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center p-6 rounded-3xl ${item.highlight ? 'bg-[#F4A217] text-[#26462C]' : 'bg-white/10 backdrop-blur-md text-white border border-white/10'} hover:-translate-y-2 transition-transform duration-300 shadow-xl`}>
                    <item.icon className="w-10 h-10 mb-3" />
                    <span className="font-bold text-sm text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Info Section (Services Style) - White bg */}
      <section className="py-20 bg-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="الأساسيات" title="معلومات التقديم الأساسية" isDark={false} align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#F4A217] group-hover:text-white transition-colors">
                <ClipboardCheck className="w-7 h-7 text-[#26462C] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-[#26462C] mb-4">قدّم مشروع تخرجك</h3>
              <ul className="space-y-3 text-slate-600 font-semibold">
                {['بيانات المشروع والفريق والمشرف', 'ملخص المشروع (علمي وتسويقي)', 'المشكلة والحل والقطاع المستهدف', 'المرحلة الحالية ومستوى الجاهزية', 'الملفات والمرفقات المطلوبة'].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-[#F4A217] mt-1">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#F4A217] transition-colors">
                <Settings className="w-7 h-7 text-[#26462C] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-[#26462C] mb-4">نوع مشروع التخرج</h3>
              <ul className="space-y-3 text-slate-600 font-semibold">
                {[
                  { t: 'تطبيق موبايل / منصة رقمية', i: Smartphone },
                  { t: 'جهاز أو نموذج هندسي', i: Cpu },
                  { t: 'منتج غذائي / زراعي', i: Sprout },
                  { t: 'ذكاء اصطناعي / برمجة', i: Code },
                  { t: 'تصميم إبداعي / إعلام', i: Palette },
                  { t: 'مشروع خدمي / اجتماعي', i: Users }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-slate-50">
                    <item.i className="w-5 h-5 text-[#F4A217]" />
                    <span className="text-sm">{item.t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3 */}
            <div className="bg-[#f8fafc] rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#F4A217] transition-colors">
                <Globe className="w-7 h-7 text-[#26462C] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-[#26462C] mb-4">القطاع المستهدف</h3>
              <div className="grid grid-cols-2 gap-3 text-slate-600 font-semibold text-sm">
                {[
                  { t: 'الصناعة', i: Factory }, { t: 'الزراعة', i: Sprout },
                  { t: 'الصحة', i: HeartPulse }, { t: 'التعليم', i: BookOpen },
                  { t: 'الإبداع', i: Brush }, { t: 'الذكاء الاصطناعي', i: Cpu },
                  { t: 'البيئة والطاقة', i: Wind }, { t: 'المجتمع', i: Users }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 p-2 bg-white rounded-lg hover:border-[#F4A217] border border-transparent transition-colors shadow-sm">
                    <item.i className="w-5 h-5 text-[#26462C]" />
                    <span className="text-xs text-center leading-tight">{item.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section (Light Grey bg) */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="تفاصيل التقييم" title="متطلبات ومستوى الجاهزية" isDark={false} align="center" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Box 4 & 5 Combined Layout */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#F4A217] opacity-5 rounded-br-full"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#26462C] rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#26462C]">المشكلة والحل</h3>
              </div>
              
              <ul className="space-y-4 text-slate-600 font-semibold mb-8">
                {['ما المشكلة التي يعالجها المشروع؟', 'من الفئة المستفيدة؟', 'ما الحل المقترح؟', 'ما الميزة الجديدة أو الفريدة؟', 'هل يمكن تطبيقه بعد التخرج؟'].map(t => (
                  <li key={t} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F4A217]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-100 pt-8 mt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F4A217] rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-[#26462C]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#26462C]">مستوى الجاهزية</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    'جاهز للاحتضان', 'جاهز للتطوير', 'معروض في معرض', 
                    'تجربة ميدانية', 'نموذج أولي', 'تصميم مبدئي', 'فكرة'
                  ].map((t, idx) => (
                    <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Boxes 6, 7, 8 in a split grid */}
            <div className="grid grid-cols-1 gap-8">
              
              {/* Box 7: IP */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-[#26462C] transition-colors">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#26462C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6 text-[#F4A217]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#26462C]">الملكية الفكرية</h3>
                  </div>
                  <ul className="space-y-3 text-slate-600 font-semibold mb-6">
                    {[
                      'هل المشروع قابل للحماية؟', 'هل تم نشره أو عرضه سابقاً؟', 
                      'هل يحتوي على أسرار فنية؟', 'هل توافق على عرض ملخص غير سري؟'
                    ].map((t, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#F4A217]" />
                        <span className="text-sm md:text-base">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#26462C] text-white p-4 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg mt-auto">
                  <Lock className="w-6 h-6 text-[#F4A217]" />
                  <span>نحمي ابتكارك ونضمن حقوقك</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Box 6: Files */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-[#26462C] mb-4 border-b pb-2">الملفات المطلوبة</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[#F4A217] font-bold text-sm block mb-2">إلزامية:</span>
                      <ul className="text-xs font-semibold text-slate-600 space-y-1.5">
                        <li>• ملخص المشروع</li>
                        <li>• عرض تقديمي</li>
                        <li>• صورة / لقطة شاشة</li>
                        <li>• بيانات الفريق</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold text-sm block mb-2">اختيارية:</span>
                      <ul className="text-xs font-semibold text-slate-500 space-y-1.5">
                        <li>• التقرير الكامل</li>
                        <li>• رابط المنصة/نموذج</li>
                        <li>• فيديو Demo قصير</li>
                        <li>• دراسة جدوى</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Box 8: Support */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-black text-[#26462C] mb-4 border-b pb-2">نوع الدعم</h3>
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                    {[
                      'مرشد/خبير', 'تمويل', 'احتضان', 'تسويق', 
                      'توظيف', 'تصميم', 'تطوير تقني', 'حماية فكرية',
                      'تأسيس شركة', 'شريك صناعي'
                    ].map((t, idx) => (
                      <span key={idx} className="bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="الجدول الزمني" title="مراحل سير الطلب" isDark={false} align="center" />
          
          <div className="relative mt-16 pb-8 overflow-x-auto hide-scrollbar">
            <div className="min-w-[800px] flex justify-between relative px-8">
              {/* The connecting line */}
              <div className="absolute top-1/2 right-12 left-12 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
              
              {[
                { t: 'استلام المشروع', i: UploadCloud, active: true },
                { t: 'فحص إداري', i: ClipboardCheck, active: false },
                { t: 'تقييم فني', i: Search, active: false },
                { t: 'مراجعة ملكية', i: Shield, active: false },
                { t: 'مقبول للعرض', i: CheckCircle2, active: false },
                { t: 'مدرج بالمعرض', i: Presentation, active: false },
                { t: 'مرشح للاحتضان', i: Rocket, active: false },
                { t: 'عرض لمستثمر', i: Handshake, active: false },
                { t: 'تحويل لفرصة', i: Trophy, active: false }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center group w-24">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-4 transition-transform group-hover:scale-110 ${idx === 0 ? 'bg-[#F4A217] text-[#26462C]' : 'bg-white text-slate-400 border-2 border-slate-100 group-hover:border-[#26462C] group-hover:text-[#26462C]'}`}>
                    <step.i className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold text-center leading-tight ${idx === 0 ? 'text-[#26462C]' : 'text-slate-500'}`}>
                    {step.t}
                  </span>
                  {/* Small step number badge */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm ${idx === 0 ? 'bg-[#26462C]' : 'bg-slate-300'}`}>
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing-Style Bottom Sections (Dark Green) */}
      <section className="py-24 bg-[#26462C] relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 border-[30px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 border-[40px] border-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle subtitle="ما بعد التقديم" title="مخرجات المشروع والتقييم" isDark={true} align="center" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center mt-12">
            
            {/* Card 1 (Dark) */}
            <div className="bg-[#1e3622] rounded-[2rem] p-8 border border-white/10 shadow-2xl flex flex-col h-full transform transition-transform hover:-translate-y-2">
              <div className="text-[#F4A217] mb-6">
                <MonitorSmartphone className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-white mb-6">ما يظهر للمستثمرين؟</h3>
              
              <ul className="space-y-4 text-gray-300 font-semibold mb-8 flex-1">
                {['اسم المشروع', 'الكلية والقسم', 'القطاع المستهدف', 'المشكلة والحل', 'مستوى الجاهزية', 'نوع الدعم المطلوب'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#F4A217] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors mt-auto">
                نموذج العرض المختصر
              </button>
            </div>

            {/* Card 2 (Yellow - Highlighted) */}
            <div className="bg-[#F4A217] rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_40px_rgba(244,162,23,0.3)] flex flex-col h-full lg:scale-110 z-10">
              <div className="bg-[#26462C] text-[#F4A217] w-max px-4 py-1.5 rounded-full text-sm font-black mb-6">
                الهدف الأسمى
              </div>
              <h3 className="text-3xl font-black text-[#26462C] mb-8">المخرجات والمسارات</h3>
              
              <div className="space-y-5 flex-1">
                {[
                  { t: 'مسار التوظيف', p: 'فرص عمل تدريب', i: Briefcase },
                  { t: 'مسار شركة نماء', p: 'منتج أو خدمة', i: Building2 },
                  { t: 'مسار الاحتضان', p: 'شركة ناشئة', i: Sprout },
                  { t: 'مسار الشراكات', p: 'ربط بجهات', i: Handshake }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/20 rounded-2xl p-3 border border-white/30 hover:bg-white/30 transition-colors">
                    <div className="w-10 h-10 bg-[#26462C] rounded-xl flex items-center justify-center shrink-0">
                      <item.i className="w-5 h-5 text-[#F4A217]" />
                    </div>
                    <div>
                      <div className="font-black text-[#26462C] leading-tight">{item.t}</div>
                      <div className="text-sm text-[#26462C]/80 font-bold">{item.p}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/submit-graduation-project" className="w-full mt-8 bg-[#26462C] text-[#F4A217] py-4 rounded-xl font-black text-lg shadow-md hover:bg-[#1e3622] transition-colors flex items-center justify-center gap-2">
                سجل مشروعك الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            {/* Card 3 (Dark) */}
            <div className="bg-[#1e3622] rounded-[2rem] p-8 border border-white/10 shadow-2xl flex flex-col h-full transform transition-transform hover:-translate-y-2">
              <div className="text-[#F4A217] mb-6 flex justify-between items-center">
                <ClipboardCheck className="w-12 h-12" />
                <div className="text-3xl font-black text-white/50">100</div>
              </div>
              <h3 className="text-2xl font-black text-white mb-6">تقييم اللجنة</h3>
              
              <ul className="space-y-4 text-gray-300 text-sm font-semibold mb-8 flex-1">
                {[
                  {l:'وضوح المشكلة وقوة الحل', s:25}, 
                  {l:'الابتكار وقابلية التطبيق', s:30}, 
                  {l:'النموذج الأولي', s:15}, 
                  {l:'الأثر الاقتصادي والمجتمعي', s:10}, 
                  {l:'التسويق وجودة العرض', s:20}
                ].map((t, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span>{t.l}</span>
                    <span className="bg-[#F4A217] text-[#26462C] px-2 py-0.5 rounded font-black text-xs">{t.s} نقطة</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-4 border-t border-white/20 text-center">
                <p className="text-gray-400 text-xs">يتم التقييم من قبل لجان متخصصة</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default GraduationProjectsPage;
