import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, ArrowLeft, Calendar, Users, MapPin, Sparkles, Target, Star, 
  Video, Image as ImageIcon, PlayCircle, ShieldCheck, Award, 
  TrendingUp, CheckCircle, ShoppingBag, Play, Sprout, FlaskConical, Palette, Scissors,
  ChevronLeft, ChevronRight, Cpu, Globe, Database, Lock, Code, Coins, Search, Terminal, MessageSquare
} from 'lucide-react';
import FadeInView from '../components/FadeInView';

// Shared data source for exhibitions
export const exhibitionsData = [
  {
    id: 1,
    title: 'معرض الابتكارات الرقمية',
    titleEn: 'Digital Innovations Exhibition',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
    description: 'إبراز التطبيقات، المنصات الرقمية، مشروعات الذكاء الاصطناعي، الأمن السيبراني، ولوحات البيانات المصممة بأيدي الطلاب.',
    color: 'bg-[#0f4c43]',
    gradient: 'from-[#0f4c43] to-[#0a3630]',
    textColor: 'text-teal-900',
    stats: { projects: 120, participants: 350, awards: 15 }
  },
  {
    id: 3,
    title: 'تسويق البحوث التطبيقية',
    titleEn: 'Applied Research',
    subtitle: '(Applied Research)',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1920',
    description: 'تصنيف وحصر البحوث التطبيقية وفقاً لمستويات الجاهزية التكنولوجية، مع إتاحة منصة لرفع البحث وفكرته لتسويقه للجهات الصناعية.',
    color: 'bg-[#d86200]',
    gradient: 'from-[#d86200] to-[#7a3700]',
    textColor: 'text-orange-900',
    stats: { projects: 50, participants: 120, awards: 5 }
  },
  {
    id: 4,
    title: 'معرض منتجات الوحدات الإنتاجية',
    titleEn: 'Production Units Products Exhibition',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1611078505537-83eb260fb1cd?auto=format&fit=crop&q=80&w=1920',
    description: 'حصر وعرض ما بين 100 إلى 150 منتجاً وخدمة جامعية، وربطها ببطاقات تسويقية موحدة (توضح السعر، التكلفة، وجاهزية قنوات البيع).',
    color: 'bg-[#0d47a1]',
    gradient: 'from-[#0d47a1] to-[#05214d]',
    textColor: 'text-blue-900',
    stats: { projects: 150, participants: 80, awards: 0 }
  }
];

// Layout 1: Digital Innovations Exhibition (Matches Travel/Discover design from screenshot)
const DigitalInnovationsLayout = ({ exhibition, isRtl }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'كل الابتكارات' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'cyber', name: 'الأمن السيبراني' },
    { id: 'iot', name: 'إنترنت الأشياء' },
    { id: 'apps', name: 'تطبيقات الويب والجوال' }
  ];

  const levels = [
    { id: 'all', name: 'جميع المستويات' },
    { id: 'prototype', name: 'نموذج أولي' },
    { id: 'advanced', name: 'مستوى متقدم' },
    { id: 'ready', name: 'جاهز للتبني التجاري' }
  ];

  const innovations = [
    {
      id: 1,
      name: 'نظام تشخيص الأورام الذكي بالرنين المغناطيسي',
      category: 'ai',
      level: 'advanced',
      levelName: 'مستوى متقدم',
      team: 'فريق سيجما الطبي',
      desc: 'برمجيات ذكاء اصطناعي تقوم بتحليل صور الرنين لسرعة رصد الأورام بنسبة دقة تفوق 98% وتوفير الوقت للأطباء.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
      stats: { accuracy: '98%', speed: '3 ثوانٍ', tech: 'Python / PyTorch' },
      icon: Cpu,
      iconColor: 'text-[#f0a500] bg-orange-50'
    },
    {
      id: 2,
      name: 'جدار الحماية الفائق للأجهزة الطبية الذكية',
      category: 'cyber',
      level: 'ready',
      levelName: 'جاهز للتبني التجاري',
      team: 'حصن المنيا الرقمي',
      desc: 'بروتوكول حماية شبكية يمنع اختراقات أجهزة إنعاش القلب والأسرّة المتصلة بالإنترنت داخل المستشفيات والمراكز.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      stats: { accuracy: '99.9%', speed: 'فوري', tech: 'Rust / C++' },
      icon: Lock,
      iconColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 3,
      name: 'حاوية النفايات الذكية لحسابات البيئة المستدامة',
      category: 'iot',
      level: 'prototype',
      levelName: 'نموذج أولي',
      team: 'مبتكرو الغد البيئي',
      desc: 'جهاز رصد يستشعر امتلاء الحاويات ويفرز النفايات تلقائياً باستخدام حساسات المسافة ومعالجة الصور المتقدمة.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      stats: { accuracy: '90%', speed: 'تلقائي', tech: 'Arduino / ESP32' },
      icon: Sprout,
      iconColor: 'text-amber-700 bg-amber-50'
    },
    {
      id: 4,
      name: 'منصة تسويق وتوجيه المشروعات التعليمية للشباب',
      category: 'apps',
      level: 'ready',
      levelName: 'جاهز للتبني التجاري',
      team: 'فريق إنجاز للبرمجيات',
      desc: 'بوابة إلكترونية تربط أفكار الخريجين والمبتكرين بالمشرفين والمستثمرين لتمويل دراسات الجدوى والتدريب الفعلي.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
      stats: { accuracy: '100%', speed: 'سحابي', tech: 'React / Node.js' },
      icon: Globe,
      iconColor: 'text-blue-600 bg-blue-50'
    },
    {
      id: 5,
      name: 'ذراع آلية لإجراء الجراحات الدقيقة عن بعد',
      category: 'ai',
      level: 'prototype',
      levelName: 'نموذج أولي',
      team: 'نبض ميكاترونكس',
      desc: 'نموذج أولي لذراع روبوتية تحاكي حركة يد الطبيب بإحداثيات دقيقة جداً عبر الويب والأوامر الصوتية الفورية.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
      stats: { accuracy: '95%', speed: 'لحظي', tech: 'Python / ROS' },
      icon: Cpu,
      iconColor: 'text-purple-600 bg-purple-50'
    },
    {
      id: 6,
      name: 'بروتوكول تأمين المعاملات الزراعية بسلاسل الكتل',
      category: 'cyber',
      level: 'advanced',
      levelName: 'مستوى متقدم',
      team: 'سنابل التشفير',
      desc: 'نظام تشفير غير مركزي لتأمين مبيعات المحاصيل والوحدات الإنتاجية لمنع التلاعب بالأسعار وسجلات المزارعين.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
      stats: { accuracy: '100%', speed: 'ثانيتان', tech: 'Solidity / JS' },
      icon: Database,
      iconColor: 'text-[#f0a500] bg-orange-50'
    }
  ];

  const filteredInnovations = innovations.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
    const matchesSearch = item.name.includes(searchQuery) || item.desc.includes(searchQuery) || item.team.includes(searchQuery);
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo" dir="rtl">
      
      {/* 1. Hero Section (Deep Teal Green with Orange Accent & Overlapping elements) */}
      <section className="relative pt-28 pb-32 overflow-hidden bg-gradient-to-br from-[#0c3830] via-[#092e27] to-[#041714] text-white">
        
        {/* Dynamic Glowing circles */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#f0a500]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <Link to="/#tracks" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-bold text-sm">العودة للرئيسية / المعارض</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Block: Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f0a500] font-black text-xs uppercase tracking-wider">
                معرض الابتكارات الرقمية والذكاء الاصطناعي
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-black leading-tight text-white">
                بوابتك لاستكشاف <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-[#f0a500]">
                  مستقبل الحلول الرقمية
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed font-bold max-w-xl mx-auto lg:mx-0">
                منصة حيوية تبرز المشروعات الطلابية الابتكارية، التطبيقات السحابية، مشروعات الذكاء الاصطناعي، الأمن السيبراني، وأنظمة إنترنت الأشياء المتميزة بجامعة المنيا.
              </p>

              {/* Call to action */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => document.getElementById('search-hub')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#f0a500] hover:bg-[#d89400] text-slate-950 rounded-2xl font-black text-sm shadow-lg shadow-[#f0a500]/25 transition-all cursor-pointer"
                >
                  استكشف المشروعات والابتكارات
                </button>
                <button 
                  onClick={() => document.getElementById('incubation-packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-5 h-5 text-[#f0a500]" />
                  باقات الدعم والاحتضان
                </button>
              </div>

              {/* Ratings and Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 border-t border-white/10">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="w-10 h-10 rounded-full border-2 border-[#092e27] bg-slate-800 flex items-center justify-center overflow-hidden">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#f0a500]">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold text-slate-300 mt-1 block">أكثر من 15 براءة اختراع ونموذج صناعي ممول</span>
                </div>
              </div>

            </div>

            {/* Right Block: Overlapping images collage (From the Discover/Travel layout) */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] shrink-0">
                
                {/* Main image in golden offset border */}
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-4 border-[#f0a500] shadow-2xl z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" 
                    alt="Cyber Tech" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlapping circular badge "100% Innovation" (mimicking the 60% discount sticker) */}
                <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#f0a500] text-slate-950 flex flex-col items-center justify-center shadow-xl z-20 transform rotate-12">
                  <span className="text-xl sm:text-2xl font-black block leading-none">100%</span>
                  <span className="text-[10px] font-black tracking-widest mt-1 block">ابتكار برمي</span>
                </div>

                {/* Smaller overlapping circular image 1 */}
                <div className="absolute bottom-6 -left-12 w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300" 
                    alt="AI Robotics" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating badge details */}
                <div className="absolute bottom-16 -right-16 bg-[#104c40]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl z-20 w-48 text-right hidden sm:block">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-slate-300">جاهزية التبني التجاري</span>
                    <span className="text-xs font-black text-[#f0a500]">مرتفع</span>
                  </div>
                  <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                    <div className="h-full bg-[#f0a500] rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-[8px] text-slate-400 font-bold block mt-1.5">خاضع للتطوير والاستثمار</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Wavy bottom shape separator (from the Discover/Travel layout) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,87.43,26.85,157.78,46.54,233.56,61.08,321.39,56.44Z" className="fill-slate-50"></path>
          </svg>
        </div>

      </section>

      {/* 2. Search & Filter Bar (Floating Widget) */}
      <section id="search-hub" className="relative z-20 px-4 -mt-12">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-2xl p-5 sm:p-6 rounded-[2rem] flex flex-col md:flex-row gap-4 items-center justify-between text-right">
          
          {/* Query search input */}
          <div className="w-full md:w-1/3 space-y-1">
            <label className="text-[10px] font-black text-slate-400 block">ابحث بالاسم أو الفكرة</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="أدخل كلمات البحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f4c43]"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Category Select */}
          <div className="w-full md:w-1/4 space-y-1">
            <label className="text-[10px] font-black text-slate-400 block">فئة الابتكار</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0f4c43]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Level Select */}
          <div className="w-full md:w-1/4 space-y-1">
            <label className="text-[10px] font-black text-slate-400 block">مستوى جاهزية المشروع</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0f4c43]"
            >
              {levels.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto pt-4 md:pt-0">
            <button 
              onClick={() => document.getElementById('innovations-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-6 py-3 bg-[#0f4c43] hover:bg-[#092e27] text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-900/10"
            >
              <Search className="w-4 h-4" />
              <span>بحث سريع</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. Easy Steps (Process block matching "Easy Steps for Bookings") */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#f0a500] font-black text-sm block mb-3 uppercase tracking-wider">خطوات ميسرة لنشر وتطوير ابتكارك</span>
            <h2 className="text-3xl font-black text-slate-900">كيف ندعم فكرتك الرقمية بالجامعة؟</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'تسجيل الفكرة الرقمية', desc: 'أدخل تفاصيل مشروعك أو منصتك عبر بوابة التقديم واحصل على رقم تسجيل موحد للمتابعة.' },
              { num: '2', title: 'التقييم والتحكيم الفني', desc: 'يقوم المحكمون وخبراء التكنولوجيا بمراجعة الملف وفحصه وتقديم إرشادات للتطوير.' },
              { num: '3', title: 'الاحتضان والتمويل التجاري', desc: 'نعرض مشروعك في فعاليات معرض الابتكار لجذب الممولين أو احتضانه داخل مركز ريادة الأعمال.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-right space-y-4 hover:shadow-lg transition-shadow relative overflow-hidden group">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black text-lg border border-orange-100">
                  {step.num}
                </div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0f4c43] transition-colors">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Golden highlight banner (e.g. 48+ Travel Package banner style) */}
          <div className="mt-16 bg-gradient-to-l from-yellow-400 to-[#f0a500] rounded-3xl p-6 sm:p-8 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="text-center sm:text-right">
              <span className="text-xs font-black uppercase tracking-wider block mb-1">الابتكار التكنولوجي لجامعة المنيا</span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight">
                أكثر من 48 مشروعاً رقمياً حصل على تمويل وتوجيه كامل في الربع الأخير.
              </h3>
            </div>
            <button 
              onClick={() => document.getElementById('innovations-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-[#0f4c43] hover:bg-[#092e27] text-white rounded-xl font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              عرض الابتكارات المدعومة
            </button>
          </div>

        </div>
      </section>

      {/* 4. Trending Destination (Innovations Catalog section) */}
      <section id="innovations-list" className="py-20 bg-white">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8 text-right">
            <div>
              <span className="text-[#f0a500] font-black text-sm block mb-3 uppercase tracking-wider">الابتكار والذكاء الاصطناعي</span>
              <h2 className="text-3xl font-black text-slate-900">كتالوج المشروعات والحلول البرمجية</h2>
            </div>
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 py-2 rounded-full font-bold text-xs cursor-pointer transition-all border ${
                    selectedCategory === c.id
                      ? 'bg-[#0f4c43] text-white border-[#0f4c43] shadow-md shadow-teal-900/10'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Innovations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[350px]">
            {filteredInnovations.map((item) => {
              const Icon = item.icon;
              return (
                <FadeInView key={item.id} delay={100 * (item.id % 3)}>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 flex flex-col h-full group">
                    
                    {/* Image Block */}
                    <div className="h-56 overflow-hidden relative shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <div className="absolute top-4 right-4 bg-[#f0a500] text-slate-950 px-3 py-1 rounded-full text-[10px] font-black shadow-md">
                        {item.levelName}
                      </div>

                      <div className={`absolute bottom-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg border border-slate-200/20 ${item.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-6 flex flex-col flex-1 justify-between text-right">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 block mb-1">{item.team}</span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 group-hover:text-[#0f4c43] transition-colors leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-3 mb-6">
                          {item.desc}
                        </p>
                      </div>

                      {/* Specs stats */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200/60 text-center">
                        <div className="bg-white/60 p-2 rounded-xl border border-slate-200/30">
                          <span className="text-[8px] font-black text-slate-400 block">دقة الأداء</span>
                          <span className="text-xs font-black text-slate-800 block mt-0.5">{item.stats.accuracy}</span>
                        </div>
                        <div className="bg-white/60 p-2 rounded-xl border border-slate-200/30">
                          <span className="text-[8px] font-black text-slate-400 block">زمن الاستجابة</span>
                          <span className="text-xs font-black text-slate-800 block mt-0.5">{item.stats.speed}</span>
                        </div>
                        <div className="bg-white/60 p-2 rounded-xl border border-slate-200/30">
                          <span className="text-[8px] font-black text-slate-400 block">البيئة البرمجية</span>
                          <span className="text-[10px] font-black text-[#0f4c43] truncate block mt-0.5" title={item.stats.tech}>
                            {item.stats.tech}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </FadeInView>
              );
            })}

            {filteredInnovations.length === 0 && (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border border-slate-200 flex flex-col items-center justify-center px-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
                  <Cpu className="w-8 h-8" />
                </div>
                <h4 className="text-slate-700 font-black text-lg">لا توجد ابتكارات مطابقة لبحثك حالياً</h4>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  تأكد من اختيار تصنيف آخر أو تعديل كلمات البحث لتصل إلى المشاريع الرقمية المعروضة بالمعرض.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. Incubation & Funding Packages (Pricing Cards style from screenshot) */}
      <section id="incubation-packages" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#f0a500] font-black text-sm block mb-3 uppercase tracking-wider">فرص الدعم والاستثمار المفتوحة</span>
            <h2 className="text-3xl font-black text-slate-900">باقات احتضان وتمويل الابتكارات</h2>
            <p className="text-slate-500 font-medium text-sm mt-2">
              نوفر في مركز الابتكار حزم تمويل ودعم فني متكاملة لنقل فكرتك من المعمل إلى السوق التجاري.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Package 1 */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-md text-center flex flex-col justify-between relative overflow-hidden group">
              <div>
                <span className="text-[10px] font-black text-[#0f4c43] uppercase tracking-wider block mb-4">المرحلة الأولى</span>
                <h3 className="text-2xl font-black text-slate-900 mb-2">باقة الاحتضان الأساسي</h3>
                <div className="text-3xl font-black text-[#f0a500] my-4">10,000 ج.م <span className="text-xs text-slate-400 font-bold block mt-1">تمويل مبدئي</span></div>
                
                <ul className="space-y-3.5 my-6 text-right font-bold text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>تمويل شراء الحساسات والمكونات الأساسية.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>استشارات وإشراف علمي من هيئة التدريس.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>توفير معمل مجاني لتصنيع النموذج الأولي.</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3.5 bg-slate-100 hover:bg-[#0f4c43] hover:text-white text-slate-800 rounded-2xl font-black text-xs transition-all cursor-pointer mt-4"
              >
                التقديم على الباقة
              </button>
            </div>

            {/* Package 2 (Highlighted/Best Value) */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-[#f0a500] shadow-2xl text-center flex flex-col justify-between relative overflow-hidden group transform lg:scale-105">
              <div className="absolute top-0 right-0 bg-[#f0a500] text-slate-950 text-[9px] font-black uppercase tracking-wider px-6 py-1.5 rounded-bl-2xl">
                الأكثر طلباً واهتماماً
              </div>
              <div>
                <span className="text-[10px] font-black text-[#0f4c43] uppercase tracking-wider block mb-4 mt-2">المرحلة المتقدمة</span>
                <h3 className="text-2xl font-black text-slate-900 mb-2">باقة تسريع ريادة الأعمال</h3>
                <div className="text-4xl font-black text-blue-600 my-4">50,000 ج.م <span className="text-xs text-slate-400 font-bold block mt-1">تمويل تشغيلي وتطويري</span></div>
                
                <ul className="space-y-3.5 my-6 text-right font-bold text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>فحص أمني دقيق وثغرات برمجية للشبكة.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>دراسة الجدوى وتخطيط الهوية البصرية والتسويق.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>تمويل جزئي لإنشاء الشركة وتسجيل براءة الاختراع.</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3.5 bg-[#0f4c43] hover:bg-[#092e27] text-white rounded-2xl font-black text-xs transition-all cursor-pointer mt-4 shadow-md"
              >
                التقديم على الباقة المسرعة
              </button>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-md text-center flex flex-col justify-between relative overflow-hidden group">
              <div>
                <span className="text-[10px] font-black text-[#0f4c43] uppercase tracking-wider block mb-4">مستوى المؤسسات</span>
                <h3 className="text-2xl font-black text-slate-900 mb-2">باقة الشراكة الاستثمارية</h3>
                <div className="text-3xl font-black text-[#f0a500] my-4">مفتوح <span className="text-xs text-slate-400 font-bold block mt-1">شراكة كاملة ورعاية صناعية</span></div>
                
                <ul className="space-y-3.5 my-6 text-right font-bold text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ربط مباشر بشركاء صناعيين وصناديق رأس المال المخاطر.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>توفير بيئة ترخيص فني وتجاري دولي كامل.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>تأسيس شركة جامعية ناشئة مرخصة (Spin-off).</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3.5 bg-slate-100 hover:bg-[#0f4c43] hover:text-white text-slate-800 rounded-2xl font-black text-xs transition-all cursor-pointer mt-4"
              >
                التقديم على باقة ريادة
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Testimonial Section (Investor/Advisor feedback style) */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Abstract curve details */}
        <div className="absolute right-0 top-0 w-32 h-64 bg-slate-100/50 rounded-l-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-[#f0a500] mb-8 border border-orange-100">
            <MessageSquare className="w-6 h-6" />
          </div>

          {/* Testimonial container */}
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl font-black text-slate-800 leading-relaxed max-w-3xl mx-auto">
              "لقد أبهرني مستوى النضج البرمجي والتكنولوجي الذي تقدمه مشروعات الطلاب في هذا المعرض. الكوادر مجهزة وقادرة على إنتاج حلول تنافس منتجات شركات التكنولوجيا العالمية."
            </p>

            <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-100 max-w-sm mx-auto">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#f0a500] shadow-md shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" 
                  alt="د. طارق محمود" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <h4 className="font-black text-base text-slate-900">د. طارق محمود العيسوي</h4>
                <p className="text-xs font-bold text-slate-400 mt-0.5">استشاري ذكاء اصطناعي ومستثمر تقني</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Reach & Get in Touch Form (Matches Reach & Get in Touch from screenshot) */}
      <section id="apply-form" className="py-20 bg-[#0c3830] text-white relative">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Box: Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              <span className="text-[#f0a500] font-black text-sm uppercase tracking-wider block">تسجيل وتأمين الابتكار</span>
              <h2 className="text-3xl sm:text-4xl font-black">قدّم فكرتك الرقمية واحصل على رعاية ودعم فوري!</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                قم بملء البيانات في النموذج المجاور وسيتواصل معك منسقو مكتب التوجيه الفني بمركز الابتكار وريادة الأعمال بجامعة المنيا لبحث النموذج الأولي للمشروع والتسجيل بالمعرض.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 max-w-sm mx-auto lg:mx-0">
                <Terminal className="w-5 h-5 text-[#f0a500] shrink-0" />
                <span className="text-xs font-bold text-slate-200">التقديم متاح لكافة الكليات والمراحل الطلابية.</span>
              </div>
            </div>

            {/* Right Box: Form (Matches form layout in screenshot) */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-6">
                
                <h3 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-4 text-right">
                  طلب تسجيل فكرة ابتكار رقمي
                </h3>

                <form className="space-y-4 text-right" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 block">اسم المبتكر/الفريق الجماعي</label>
                    <input 
                      type="text" 
                      placeholder="أدخل الاسم الرباعي لممثل الفريق..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f4c43]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 block">الكلية التابع لها</label>
                      <input 
                        type="text" 
                        placeholder="مثال: الحاسبات والمعلومات..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f4c43]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 block">البريد الإلكتروني الجامعي</label>
                      <input 
                        type="email" 
                        placeholder="username@mu.edu.eg..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f4c43]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 block">فئة الابتكار ومستوى النضج</label>
                    <input 
                      type="text" 
                      placeholder="مثال: ذكاء اصطناعي - نموذج أولي ESP32..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f4c43]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500 block">ملخص فكرة المشروع التكنولوجي</label>
                    <textarea 
                      rows="3"
                      placeholder="اكتب شرحاً مختصراً لفكرة الابتكار والحل البرمجي المطبق..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f4c43] resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#f0a500] hover:bg-[#d89400] text-slate-950 rounded-2xl font-black text-sm transition-all cursor-pointer shadow-lg shadow-[#f0a500]/10 flex items-center justify-center gap-2"
                  >
                    <span>إرسال طلب التسجيل والدعم الفني</span>
                  </button>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

const FeaturedProductsCarousel = ({ isRtl }) => {
  const featured = [
    {
      id: 1,
      name: 'عسل نحل طبيعي مصفى نقي',
      faculty: 'كلية الزراعة',
      price: '150 ج.م',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
      description: 'عبوة 1 كجم عسل مصفى نقي خالي تماماً من السكر المضاف، منتج بجودة أكاديمية عالية ومعايير صحية صارمة.'
    },
    {
      id: 2,
      name: 'زيت زيتون بكر ممتاز معصور بارد',
      faculty: 'كلية الزراعة',
      price: '180 ج.م',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500',
      description: 'زيت زيتون بكر ممتاز درجة أولى، نسبة حموضة منخفضة جداً، معصور ميكانيكياً على البارد للحفاظ على الفوائد الصحية.'
    },
    {
      id: 3,
      name: 'لوحة جدارية نحت بارز على الجبس',
      faculty: 'كلية الفنون الجميلة',
      price: '850 ج.م',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=500',
      description: 'جدارية ثلاثية الأبعاد منحوتة يدوياً بالكامل على الجبس المقوى، تجمع بين أصالة التاريخ وحداثة الفن المعاصر.'
    },
    {
      id: 4,
      name: 'مستحضرات تجميل وتركيبات طبيعية',
      faculty: 'كلية الصيدلة',
      price: '250 ج.م',
      image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=300&fit=crop&q=80',
      description: 'مجموعة متكاملة من مستحضرات العناية بالبشرة والتركيبات الطبيعية الآمنة، مصنعة بمعامل الكلية وتحت إشراف أساتذة متخصصين.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featured.length) % featured.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featured.length);
  };

  const current = featured[currentIndex];

  return (
    <div className="bg-white text-slate-900 border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden flex flex-col w-full max-w-[460px] h-[520px] relative group transition-all duration-300">
      <div className="h-72 overflow-hidden relative bg-slate-50 shrink-0">
        <img 
          src={current.image} 
          alt={current.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md">
          منتج متميز رائد
        </span>
        <span className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
          {current.faculty}
        </span>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 text-right">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-blue-600">{current.price}</span>
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 line-clamp-1">
            {current.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed line-clamp-3">
            {current.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {featured.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'h-2 w-6 bg-blue-600' : 'h-2 w-2 bg-slate-200 hover:bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductiveUnitsLayout = ({ exhibition, isRtl }) => {
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const carouselRef = useRef(null);

  const sectors = [
    { id: 'all', name: 'جميع القطاعات' },
    { id: 'engineering', name: 'القطاع الهندسي والتكنولوجي' },
    { id: 'medical', name: 'القطاع الطبي والصيدلي' },
    { id: 'scientific', name: 'القطاع العلمي والزراعي' },
    { id: 'creative', name: 'القطاع الفني والإبداعي' },
    { id: 'humanities', name: 'القطاع التربوي والإنساني' }
  ];

  const faculties = [
    // Engineering & Tech
    { id: 'engineering', name: 'كلية الهندسة', sector: 'engineering', icon: Sparkles, activeBg: 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-500/20', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', hasProducts: true, desc: 'استشارات هندسية، نماذج ثلاثية، ومعدات مبتكرة', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&fit=crop&q=80' },
    { id: 'computers', name: 'كلية الحاسبات والمعلومات', sector: 'engineering', icon: Sparkles, activeBg: 'bg-gradient-to-tr from-blue-600 to-cyan-600 shadow-blue-500/20', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600', hasProducts: true, desc: 'برمجيات سحابية، أنظمة ذكية، وتطبيقات هاتف', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&fit=crop&q=80' },

    // Medical & Pharma
    { id: 'medicine', name: 'كلية الطب', sector: 'medical', icon: ShieldCheck, activeBg: 'bg-gradient-to-tr from-red-500 to-rose-600 shadow-red-500/20', iconBg: 'bg-red-50', iconColor: 'text-red-600', hasProducts: false, desc: 'خدمات طبية ورعاية صحية متكاملة', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&fit=crop&q=80' },
    { id: 'pharmacy', name: 'كلية الصيدلة', sector: 'medical', icon: ShieldCheck, activeBg: 'bg-gradient-to-tr from-teal-500 to-emerald-600 shadow-teal-500/20', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', hasProducts: true, desc: 'تركيبات صيدلانية ومستحضرات تجميل طبيعية', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=300&fit=crop&q=80' },
    { id: 'dentistry', name: 'كلية طب الأسنان', sector: 'medical', icon: ShieldCheck, activeBg: 'bg-gradient-to-tr from-sky-500 to-blue-600 shadow-sky-500/20', iconBg: 'bg-sky-50', iconColor: 'text-sky-600', hasProducts: false, desc: 'علاجات الأسنان المتقدمة والوقاية', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&fit=crop&q=80' },
    { id: 'nursing', name: 'كلية التمريض', sector: 'medical', icon: ShieldCheck, activeBg: 'bg-gradient-to-tr from-purple-500 to-indigo-600 shadow-purple-500/20', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', hasProducts: false, desc: 'تدريب تمريضي ورعاية منزلية', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&fit=crop&q=80' },
    { id: 'vet', name: 'كلية الطب البيطري', sector: 'medical', icon: ShieldCheck, activeBg: 'bg-gradient-to-tr from-amber-600 to-orange-600 shadow-amber-500/20', iconBg: 'bg-amber-50', iconColor: 'text-amber-700', hasProducts: false, desc: 'رعاية بيطرية وفحوصات حيوانية', image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=300&fit=crop&q=80' },

    // Scientific & Agri
    { id: 'science', name: 'كلية العلوم', sector: 'scientific', icon: FlaskConical, activeBg: 'bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-emerald-500/20', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', hasProducts: true, desc: 'منظفات صناعية، كحول معقم، وصابون طبيعي', image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=300&fit=crop&q=80' },
    { id: 'agriculture', name: 'كلية الزراعة', sector: 'scientific', icon: Sprout, activeBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/20', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', hasProducts: true, desc: 'عسل نحل مصفى، زيت زيتون بكر، ونباتات زينة', image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=300&fit=crop&q=80' },

    // Creative & Artistic
    { id: 'finearts', name: 'كلية الفنون الجميلة', sector: 'creative', icon: Palette, activeBg: 'bg-gradient-to-tr from-pink-500 to-rose-600 shadow-pink-500/20', iconBg: 'bg-pink-50', iconColor: 'text-pink-600', hasProducts: true, desc: 'لوحات نحت، جداريات، وتصاميم معمارية فنية', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&fit=crop&q=80' },
    { id: 'artedu', name: 'كلية التربية الفنية', sector: 'creative', icon: Palette, activeBg: 'bg-gradient-to-tr from-purple-500 to-fuchsia-600 shadow-purple-500/20', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', hasProducts: true, desc: 'تحف خشبية، لوحات زيتية، وأواني فخارية', image: 'https://images.unsplash.com/photo-1547891654-e66ed7edd96c?w=300&fit=crop&q=80' },
    { id: 'specific', name: 'كلية التربية النوعية', sector: 'creative', icon: Scissors, activeBg: 'bg-gradient-to-tr from-blue-600 to-cyan-600 shadow-blue-500/20', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', hasProducts: true, desc: 'ملابس جاهزة، مفروشات، وحقائب جلد طبيعي', image: 'https://images.unsplash.com/photo-1520004434532-6684162097cf?w=300&fit=crop&q=80' },
    { id: 'tourism', name: 'كلية السياحة والفنادق', sector: 'creative', icon: Award, activeBg: 'bg-gradient-to-tr from-orange-500 to-red-500 shadow-orange-500/20', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', hasProducts: true, desc: 'حلويات فندقية، وخدمات إرشاد سياحي تفاعلية', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&fit=crop&q=80' },

    // Humanities & Educational
    { id: 'education', name: 'كلية التربية', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'استشارات تعليمية وحقائب تدريبية تربوية', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&fit=crop&q=80' },
    { id: 'arts_humanities', name: 'كلية الآداب', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'ترجمة فورية، تدقيق لغوي، وبحوث اجتماعية', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&fit=crop&q=80' },
    { id: 'law', name: 'كلية الحقوق', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'استشارات قانونية وصياغة عقود تجارية', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&fit=crop&q=80' },
    { id: 'alsun', name: 'كلية الألسن', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'ترجمة معتمدة لعدة لغات عالمية', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=300&fit=crop&q=80' },
    { id: 'dar_eloom', name: 'كلية دار العلوم', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'علوم اللغة العربية والدراسات الإسلامية', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&fit=crop&q=80' },
    { id: 'earlychildhood', name: 'كلية التربية للطفولة المبكرة', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'وسائل تعليمية وألعاب أطفال ابتكارية', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&fit=crop&q=80' },
    { id: 'sports', name: 'كلية التربية الرياضية', sector: 'humanities', icon: Users, activeBg: 'bg-gradient-to-tr from-slate-600 to-slate-700 shadow-slate-500/20', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', hasProducts: false, desc: 'برمجيات تدريب بدني وتأهيل رياضي متكامل', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&fit=crop&q=80' }
  ];

  const products = [
    // Agriculture (3 products)
    {
      id: 1,
      name: 'عسل نحل طبيعي مصفى نقي',
      category: 'منتجات زراعية',
      faculty: 'كلية الزراعة',
      facultyId: 'agriculture',
      price: '150 ج.م',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
      rating: '4.9 (1.2K)',
      tag: 'الأكثر مبيعاً',
      tagColor: 'bg-amber-500 text-white',
      details: 'عبوة 1 كجم عسل مصفى نقي خالي تماماً من السكر المضاف أو المواد الحافظة، من إنتاج مناحل كلية الزراعة.'
    },
    {
      id: 2,
      name: 'زيت زيتون بكر ممتاز معصور بارد',
      category: 'منتجات زراعية',
      faculty: 'كلية الزراعة',
      facultyId: 'agriculture',
      price: '180 ج.م',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500',
      rating: '4.8 (850)',
      tag: 'عصر بارد طبيعي',
      tagColor: 'bg-amber-600 text-white',
      details: 'زيت زيتون بكر ممتاز درجة أولى، نسبة حموضة منخفضة جداً، معصور ميكانيكياً على البارد لفوائد كاملة.'
    },
    {
      id: 3,
      name: 'نباتات زينة وشتلات زهور منزلية',
      category: 'منتجات زراعية',
      faculty: 'كلية الزراعة',
      facultyId: 'agriculture',
      price: '35 ج.م',
      image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=500',
      rating: '4.7 (310)',
      tag: 'شتلات زهور',
      tagColor: 'bg-green-600 text-white',
      details: 'مجموعة متميزة من نباتات الظل والزينة المنزلية المجهزة للزراعة وتجميل المكاتب والبلكونات.'
    },

    // Science (3 products)
    {
      id: 4,
      name: 'منظفات ومطهر أرضيات عالي الجودة',
      category: 'منظفات صناعية',
      faculty: 'كلية العلوم',
      facultyId: 'science',
      price: '45 ج.م',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=500',
      rating: '4.7 (2.1K)',
      tag: 'الأعلى مبيعاً',
      tagColor: 'bg-emerald-600 text-white',
      details: 'مطهرات ومنظفات آمنة عالية التركيز للإنتاج المنزلي والتجاري، مصنعة وفق المعايير الطبية بقسم الكيمياء.'
    },
    {
      id: 5,
      name: 'صابون سائل معقم مضاد للبكتيريا',
      category: 'منظفات صناعية',
      faculty: 'كلية العلوم',
      facultyId: 'science',
      price: '60 ج.م',
      image: 'https://images.unsplash.com/photo-1607006342411-101a4e101155?auto=format&fit=crop&q=80&w=500',
      rating: '4.6 (950)',
      tag: 'مطهر آمن',
      tagColor: 'bg-emerald-700 text-white',
      details: 'عبوة عائلية 3 لتر من الصابون السائل المعزز بمرطبات الجلسرين لحماية الأيدي وترطيبها بفاعلية تامة.'
    },
    {
      id: 6,
      name: 'معقم كحولي طبي بتركيز 70%',
      category: 'منظفات صناعية',
      faculty: 'كلية العلوم',
      facultyId: 'science',
      price: '50 ج.م',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500',
      rating: '4.9 (1.4K)',
      tag: 'طبي معتمد',
      tagColor: 'bg-cyan-600 text-white',
      details: 'بخاخ كحول إيثيلي نقي تركيز 70% للتعقيم المباشر وحماية الأسطح والأيدي بفاعلية تامة مصنع بمعامل الكلية.'
    },

    // Art Education (3 products)
    {
      id: 7,
      name: 'قطع أثاث ومصنوعات خشبية يدوية',
      category: 'صناعات يدوية تحف',
      faculty: 'كلية التربية الفنية',
      facultyId: 'artedu',
      price: '350 ج.م',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=500',
      rating: '4.8 (980)',
      tag: 'صناعة يدوية',
      tagColor: 'bg-purple-600 text-white',
      details: 'منتجات ديكور خشبية وتحف فنية مصنوعة يدوياً بالكامل، تجمع بين الفن المصري والأصالة لتزيين منزلك.'
    },
    {
      id: 8,
      name: 'لوحات فنية مرسومة بالزيت زاهية',
      category: 'صناعات يدوية تحف',
      faculty: 'كلية التربية الفنية',
      facultyId: 'artedu',
      price: '450 ج.م',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=500',
      rating: '4.9 (420)',
      tag: 'لوحة أصلية',
      tagColor: 'bg-indigo-600 text-white',
      details: 'لوحات فنية زيتية أصلية مرسومة بأيدي طلاب وأعضاء هيئة التدريس تجسد التراث الجميل والمناظر الطبيعية.'
    },
    {
      id: 9,
      name: 'خزفيات وأواني فخارية مزخرفة',
      category: 'صناعات يدوية تحف',
      faculty: 'كلية التربية الفنية',
      facultyId: 'artedu',
      price: '120 ج.م',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=500',
      rating: '4.6 (180)',
      tag: 'خزفيات يدوية',
      tagColor: 'bg-fuchsia-600 text-white',
      details: 'أواني وتحف فخارية مزخرفة بألوان مبهجة ونقوش يدوية لتضفي طابعاً ريفياً دافئاً في أرجاء المكان.'
    },

    // Specific Education (3 products)
    {
      id: 10,
      name: 'ملابس جاهزة ومنسوجات راقية',
      category: 'منسوجات وملابس',
      faculty: 'كلية التربية النوعية',
      facultyId: 'specific',
      price: '190 ج.م',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=500',
      rating: '4.6 (1.5K)',
      tag: 'جودة متميزة',
      tagColor: 'bg-blue-600 text-white',
      details: 'ملابس قطنية مصنعة بأعلى مواصفات الجودة بأقسام الاقتصاد المنزلي وتصميم الملابس بالكلية.'
    },
    {
      id: 11,
      name: 'أغطية ومفروشات منزلية مطرزة',
      category: 'منسوجات وملابس',
      faculty: 'كلية التربية النوعية',
      facultyId: 'specific',
      price: '280 ج.م',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=500',
      rating: '4.8 (640)',
      tag: 'تطريز يدوي',
      tagColor: 'bg-cyan-600 text-white',
      details: 'أغطية سرير ومفروشات منزلية مطرزة بدقة فائقة لتناسب أحدث صيحات الديكور لغرف النوم.'
    },
    {
      id: 12,
      name: 'مصنوعات جلدية طبيعية فاخرة',
      category: 'منسوجات وملابس',
      faculty: 'كلية التربية النوعية',
      facultyId: 'specific',
      price: '320 ج.م',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500',
      rating: '4.7 (790)',
      tag: 'جلد طبيعي 100%',
      tagColor: 'bg-pink-600 text-white',
      details: 'حقائب ومحافظ جلدية مصنعة من الجلود الطبيعية المحلية المتينة بتصاميم تناسب الاستعمال اليومي.'
    },

    // Engineering & Computers (2 products)
    {
      id: 13,
      name: 'نموذج توربين رياح ذكي لتوليد الطاقة',
      category: 'حلول هندسية',
      faculty: 'كلية الهندسة',
      facultyId: 'engineering',
      price: '5,500 ج.م',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=500',
      rating: '4.8 (120)',
      tag: 'نموذج هندسي',
      tagColor: 'bg-blue-600 text-white',
      details: 'توربين رياح مصغر بتصميم انسيابي لتوليد طاقة كهربائية نظيفة للأجهزة البسيطة وتدريس المبادئ الفيزيائية.'
    },
    {
      id: 14,
      name: 'نظام إدارة مستودعات سحابي ذكي',
      category: 'أنظمة برمجية',
      faculty: 'كلية الحاسبات والمعلومات',
      facultyId: 'computers',
      price: '3,200 ج.م',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500',
      rating: '4.9 (95)',
      tag: 'حلول سحابية',
      tagColor: 'bg-cyan-600 text-white',
      details: 'نظام متكامل لإدارة المخازن والمبيعات سحابياً، يدعم الجرد التلقائي وإصدار الفواتير الإلكترونية المعتمدة.'
    },

    // Pharmacy (1 product)
    {
      id: 15,
      name: 'مستحضر تجميل طبيعي بالصبار والبابونج',
      category: 'مستحضرات طبيعية',
      faculty: 'كلية الصيدلة',
      facultyId: 'pharmacy',
      price: '95 ج.م',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=500',
      rating: '4.7 (340)',
      tag: 'مستخلص طبيعي',
      tagColor: 'bg-teal-600 text-white',
      details: 'كريم مرطب طبيعي مستخلص من الصبار العضوي وزهور البابونج لتغذية البشرة وتلطيفها، خالي تماماً من البارابين.'
    },

    // Fine Arts & Tourism (2 products)
    {
      id: 16,
      name: 'لوحة جدارية نحت بارز على الجبس',
      category: 'جداريات وتحف',
      faculty: 'كلية الفنون الجميلة',
      facultyId: 'finearts',
      price: '850 ج.م',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=500',
      rating: '4.9 (80)',
      tag: 'عمل فني أصيل',
      tagColor: 'bg-pink-600 text-white',
      details: 'جدارية ثلاثية الأبعاد منحوتة يدوياً بالكامل على الجبس المقوى، تمثل دمجاً رائعاً للحضارة الفرعونية والفن الحديث.'
    },
    {
      id: 17,
      name: 'دليل سياحي تفاعلي لمحافظة المنيا',
      category: 'خدمات إرشادية',
      faculty: 'كلية السياحة والفنادق',
      facultyId: 'tourism',
      price: '150 ج.م',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=500',
      rating: '4.8 (60)',
      tag: 'دليل تفاعلي',
      tagColor: 'bg-orange-600 text-white',
      details: 'دليل سياحي يجمع بين الطباعة الورقية والرمز الرقمي QR لعرض مقاطع فيديو وخرائط تفاعلية لمعالم محافظة المنيا.'
    }
  ];

  // If sector is changed, filter the faculties shown in the carousel
  const visibleFaculties = selectedSector === 'all'
    ? faculties
    : faculties.filter(f => f.sector === selectedSector);

  // If selected faculty is not in the visible list, reset it to 'all'
  useEffect(() => {
    if (selectedFaculty !== 'all') {
      const isVisible = visibleFaculties.some(f => f.id === selectedFaculty);
      if (!isVisible) {
        setSelectedFaculty('all');
      }
    }
  }, [selectedSector, visibleFaculties, selectedFaculty]);

  const filteredProducts = selectedFaculty === 'all'
    ? (selectedSector === 'all' 
        ? products 
        : products.filter(p => faculties.find(f => f.id === p.facultyId)?.sector === selectedSector)
      )
    : products.filter(p => p.facultyId === selectedFaculty);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.6;
      const multiplier = isRtl ? -1 : 1;
      const targetScroll = scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount) * multiplier;
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo" dir="rtl">
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0c1b30] via-[#091524] to-[#040810] text-white">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <Link to="/#tracks" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-bold">العودة للرئيسية / المعارض</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Block */}
            <div className="w-full lg:w-1/2 text-center lg:text-right">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 font-bold text-xs mb-6">
                معرض منتجات جامعة المنيا (20 كلية)
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-tight text-white mb-6">
                صنع في جامعة المنيا: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-orange-500 decoration-orange-500/30 underline-offset-8">
                  منتجات بأيدي علمية
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed font-bold mb-10 max-w-xl mx-auto lg:mx-0">
                حصر وعرض شامل لأكثر من 150 منتجاً وخدمة جامعية متميزة مصنعة بالكامل داخل الوحدات الإنتاجية بـ 20 كلية مختلفة بجامعة المنيا، جاهزة للبيع والتسويق لخدمة المجتمع.
              </p>

              {/* Call To Actions */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <button 
                  onClick={() => document.getElementById('exhibition-navigation')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all cursor-pointer"
                >
                  تصفح كليات ومنتجات المعرض
                </button>
                <button 
                  onClick={() => document.getElementById('about-exhibition')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5 text-orange-400" />
                  شاهد طريقة عمل الوحدات
                </button>
              </div>

              {/* Stats & Trust */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/10">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="w-10 h-10 rounded-full border-2 border-[#091524] bg-slate-800 flex items-center justify-center overflow-hidden">
                      <Users className="w-5 h-5 text-slate-500" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold text-slate-300 mt-1 block">أكثر من 5,000+ مستهلك محلي يثق بمنتجاتنا الجامعية</span>
                </div>
              </div>

            </div>

            {/* Right Block: Featured Products Carousel */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <FeaturedProductsCarousel isRtl={isRtl} />
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Banner Section */}
      <section className="py-6 bg-[#0f1b2d] border-b border-white/5 text-white">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'جودة أكاديمية معتمدة', desc: 'إشراف كامل من لجان جودة متخصصة', icon: ShieldCheck, color: 'text-blue-400' },
              { title: 'تصنيع محلي 100%', desc: 'إنتاج محلي داخل معامل وكليات الجامعة', icon: Award, color: 'text-orange-400' },
              { title: 'أسعار اقتصادية للجميع', desc: 'منتجات متميزة بأسعار تنافسية مناسبة', icon: Star, color: 'text-amber-400' },
              { title: 'جاهزية قنوات التوزيع', desc: 'سرعة الشحن والتسليم للمؤسسات والأفراد', icon: Users, color: 'text-emerald-450' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 text-right">
                <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${item.color} border border-white/10 shrink-0`}>
                  <item.icon className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition Description & Goals */}
      <section id="about-exhibition" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-blue-50 text-blue-600 mb-6 border border-blue-100 shadow-sm">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">رؤية وأهداف المعرض الإنتاجي</h2>
          <p className="text-lg text-slate-600 leading-relaxed font-bold mb-10">
            يهدف معرض منتجات الوحدات الإنتاجية إلى تسويق وبيع مخرجات الإنتاج الجامعي من السلع والخدمات التي تصنعها الكليات الـ 20 لجامعة المنيا. نسعى من خلال بطاقات تسويقية موحدة لتوضيح الأسعار وجاهزية قنوات البيع لدعم الصناعة الوطنية والمساهمة في تحقيق الاكتفاء الذاتي للمجتمع.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right">
            {[
              'حصر وعرض أكثر من 150 منتجاً جامعياً ذي جودة عالية.',
              'ربط المنتجات ببطاقات تسويقية توضح السعر والجاهزية التجارية.',
              'تقديم بدائل محلية للمستهلكين بأسعار اقتصادية منافسة.',
              'توفير تدريب عملي للطلاب على الإنتاج والبيع الفعلي في 20 كلية.'
            ].map((goal, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100/70">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Navigation and Carousel (Apple style) */}
      <section id="exhibition-navigation" className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-orange-600 font-bold text-sm block mb-3 uppercase tracking-wider">كليات جامعة المنيا الـ 20</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">تصفح حسب الكلية والقطاع</h2>
            <p className="text-slate-500 font-medium text-base">
              انقر على القطاع الأكاديمي لتصفية الكليات، ثم مرر واختر الكلية لعرض منتجاتها بأسلوب تفاعلي حديث.
            </p>
          </div>

          {/* Sector Tabs (Pill style) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className={`px-5 py-3 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-all border ${
                  selectedSector === sec.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {sec.name}
              </button>
            ))}
          </div>

          {/* Apple-style Category Circle Slider */}
          <div className="relative group/carousel max-w-6xl mx-auto mb-16">
            
            {/* Scroll buttons */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-[-20px] top-1/2 -translate-y-12 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden sm:flex"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              className="absolute right-[-20px] top-1/2 -translate-y-12 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-opacity hidden sm:flex"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Horizontal Track */}
            <div 
              ref={carouselRef}
              className="flex items-start overflow-x-auto gap-8 sm:gap-10 pb-6 px-4 no-scrollbar scroll-smooth snap-x"
            >
              {/* "Show All" circle button */}
              <button
                onClick={() => setSelectedFaculty('all')}
                className="flex flex-col items-center select-none cursor-pointer shrink-0 snap-start group/item"
              >
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ring-offset-2 ${
                  selectedFaculty === 'all'
                    ? 'ring-4 ring-blue-600 border-white scale-105 shadow-lg shadow-blue-500/20'
                    : 'border-slate-200 hover:border-slate-400 scale-100'
                }`}>
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                </div>
                <span className={`text-[11px] sm:text-xs font-black text-center mt-3 max-w-[100px] leading-tight transition-colors ${
                  selectedFaculty === 'all' ? 'text-blue-600 font-extrabold' : 'text-slate-800'
                }`}>
                  عرض جميع الكليات
                </span>
              </button>

              {visibleFaculties.map((fac) => {
                const isActive = selectedFaculty === fac.id;
                const Icon = fac.icon;
                const prodCount = products.filter(p => p.facultyId === fac.id).length;
                
                return (
                  <button
                    key={fac.id}
                    onClick={() => setSelectedFaculty(fac.id)}
                    className="flex flex-col items-center select-none cursor-pointer shrink-0 snap-start group/item"
                  >
                    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ring-offset-2 ${
                      isActive
                        ? 'ring-4 ring-blue-600 border-white scale-105 shadow-lg shadow-blue-500/20'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}>
                      <img 
                        src={fac.image} 
                        alt={fac.name} 
                        className="w-full h-full object-cover grayscale-[15%] group-hover/item:grayscale-0 group-hover/item:scale-105 transition-all duration-350"
                      />
                      
                      {/* Corner Icon Badge */}
                      <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md text-slate-700 border border-slate-100 ${fac.iconColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    
                    <span className={`text-[11px] sm:text-xs font-bold text-center mt-3 max-w-[100px] leading-tight transition-colors line-clamp-2 ${
                      isActive ? 'text-blue-600 font-extrabold' : 'text-slate-800'
                    }`}>
                      {fac.name}
                      {fac.hasProducts && (
                        <span className="block text-[9px] font-black text-slate-400 mt-0.5">({prodCount} منتجات)</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Selection Details Card */}
          <div className="max-w-4xl mx-auto">
            {selectedFaculty === 'all' ? (
              <div className="bg-gradient-to-tr from-[#0f1b2d] to-[#1e2e45] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden text-center sm:text-right">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-16 -ml-16 pointer-events-none"></div>
                <h3 className="text-xl sm:text-2xl font-black mb-3">جميع المنتجات والخدمات الجامعية المعروضة</h3>
                <p className="text-slate-350 text-sm leading-relaxed max-w-2xl font-bold">
                  تصفح المنتجات في الأسفل لجميع الكليات مجتمعة. أو قم باختيار كلية معينة من الدوائر الفوقية لتصفية المعروضات وعرض خصائص منفصلة للكلية.
                </p>
              </div>
            ) : (
              (() => {
                const activeFac = faculties.find(f => f.id === selectedFaculty);
                const activeSector = sectors.find(s => s.id === activeFac?.sector);
                const activeProducts = products.filter(p => p.facultyId === selectedFaculty);
                
                if (!activeFac) return null;
                const Icon = activeFac.icon;
                
                return (
                  <FadeInView delay={50}>
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${activeFac.iconBg} ${activeFac.iconColor} border border-slate-100`}>
                            <Icon className="w-7 h-7" />
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-black text-slate-400 block mb-0.5">{activeSector?.name}</span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{activeFac.name}</h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3.5 py-1.5 rounded-full text-xs font-black ${
                            activeFac.hasProducts ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                            {activeFac.hasProducts ? 'منتجات جاهزة للبيع' : 'الوحدة قيد التجهيز الفني'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-slate-500 font-bold text-sm leading-relaxed text-right">
                        {activeFac.desc}. تضم الوحدة الإنتاجية بهذه الكلية كوادر متميزة ومعامل مجهزة لتصنيع المنتجات وتلبية متطلبات السوق المحلي بأسعار اقتصادية وجودة عالية.
                      </p>
                      
                      {/* Faculty stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-right">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 block">عدد المنتجات النشطة</span>
                          <span className="text-base font-black text-slate-800 mt-1 block">{activeProducts.length} منتجات</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 block">الطاقة الإنتاجية</span>
                          <span className="text-base font-black text-slate-800 mt-1 block">تلبية الطلبات الكبرى</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 block">مدة التجهيز والتوريد</span>
                          <span className="text-base font-black text-slate-800 mt-1 block">خلال 48 ساعة</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 block">منافذ التوزيع المتاحة</span>
                          <span className="text-base font-black text-slate-800 mt-1 block">مقر الجامعة + منافذ خارجية</span>
                        </div>
                      </div>
                    </div>
                  </FadeInView>
                );
              })()
            )}
          </div>

        </div>
      </section>

      {/* Products Display Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[350px]">
            {filteredProducts.map((prod) => (
              <FadeInView key={prod.id} delay={100 * (prod.id % 4)}>
                <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 flex flex-col h-full group">
                  
                  <div className="h-56 overflow-hidden relative bg-slate-100 shrink-0">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black shadow-md ${prod.tagColor}`}>
                      {prod.tag}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black text-white">
                      {prod.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between text-right">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-500 mb-3">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold text-slate-600">{prod.rating}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {prod.name}
                      </h3>
                      
                      <p className="text-xs text-slate-400 font-bold leading-relaxed mb-6 line-clamp-3">
                        {prod.details}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 truncate">{prod.faculty}</span>
                      </div>
                      
                      <span className="text-base font-black text-blue-600 whitespace-nowrap">{prod.price}</span>
                    </div>

                  </div>
                </div>
              </FadeInView>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-slate-200 flex flex-col items-center justify-center px-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-slate-700 font-black text-lg">المنتجات قيد التجهيز الفني</h4>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  تقوم الوحدة الإنتاجية بهذه الكلية حالياً بحصر منتجاتها وتسعيرها وتجهيز بطاقات الجاهزية التجارية لعرضها في المعرض قريباً.
                </p>
                <Link 
                  to="/contact"
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  سجل رغبتك في الشراء المسبق
                </Link>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Bottom Call To Action Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView delay={100}>
            <div className="bg-[#0c1b30] rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-16 -ml-16 pointer-events-none"></div>
              
              <div className="text-center md:text-right">
                <h3 className="text-2xl sm:text-3xl font-black mb-3">ابدأ رحلة التعاون والتعاقد اليوم</h3>
                <p className="text-slate-400 font-bold text-sm sm:text-base max-w-xl">
                  تواصل معنا لشراء المنتجات أو عقد اتفاقيات التوريد والإنتاج المشترك مع كليات ووحدات جامعة المنيا.
                </p>
              </div>

              <Link 
                to="/contact"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-2xl font-black text-sm shadow-lg shadow-amber-400/25 transition-all whitespace-nowrap cursor-pointer shrink-0"
              >
                تواصل لشراء المنتجات والتعاقد
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

    </div>
  );
};

const ExhibitionDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const exhibition = exhibitionsData.find(e => e.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-cairo" dir="rtl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المعرض غير موجود</h1>
          <Link to="/" className="text-blue-600 hover:underline">العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    );
  }

  // If this is the Digital Innovations Exhibition, render the custom layout matching the travel screenshot!
  if (exhibition.id === 1) {
    return <DigitalInnovationsLayout exhibition={exhibition} isRtl={isRtl} />;
  }

  // If this is the Productive Units Exhibition, render the custom design matching the screenshot!
  if (exhibition.id === 4) {
    return <ProductiveUnitsLayout exhibition={exhibition} isRtl={isRtl} />;
  }

  // Mock projects data for other exhibitions
  const mockProjects = [
    { name: 'مشروع ذكي متكامل', category: 'تكنولوجيا', team: 'فريق ألفا', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500' },
    { name: 'حل مستدام للطاقة', category: 'بيئة', team: 'فريق بيتا', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500' },
    { name: 'نظام إدارة سحابي', category: 'برمجيات', team: 'فريق جاما', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500' },
  ];

  const mockVideos = [
    { title: 'جولة افتراضية في المعرض', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', duration: '03:45' },
    { title: 'لقاء مع الفائزين بالنسخة السابقة', thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800', duration: '12:20' }
  ];

  const mockGallery = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500',
    'https://images.unsplash.com/photo-1558403194-611308249627?w=500'
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br ${exhibition.gradient} overflow-hidden`}>
        <div className="absolute inset-0">
          <img 
            src={exhibition.image} 
            alt={exhibition.title} 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <Link to="/#tracks" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group">
            <ArrowRight className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} />
            <span className="font-bold">العودة للمعارض</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-end">
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm mb-6">
                {exhibition.subtitle || 'معرض متخصص'}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {isRtl ? exhibition.title : exhibition.titleEn}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl font-medium">
                {exhibition.description}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center flex-1 lg:min-w-[140px]">
                <div className="text-3xl font-black mb-1">{exhibition.stats.projects}+</div>
                <div className="text-white/80 text-sm font-bold">مشروع/منتج</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center flex-1 lg:min-w-[140px]">
                <div className="text-3xl font-black mb-1">{exhibition.stats.participants}+</div>
                <div className="text-white/80 text-sm font-bold">مشارك</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${exhibition.textColor}`}>
                <Target className="w-6 h-6" /> أهداف المعرض
              </h2>
              <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed list-disc list-inside marker:text-gray-400">
                <li>تسليط الضوء على الابتكارات الرائدة والمشاريع التطبيقية.</li>
                <li>توفير منصة للتواصل بين المبتكرين والمستثمرين.</li>
                <li>تقييم الجاهزية التكنولوجية والتجارية للمشروعات.</li>
                <li>تحفيز روح الإبداع والريادة بين المشاركين.</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-black mb-8 flex items-center gap-2 ${exhibition.textColor}`}>
                <Sparkles className="w-6 h-6" /> أبرز المشروعات (بيانات افتراضية)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mockProjects.map((project, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                    <div className="h-48 overflow-hidden relative">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                      <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" /> {project.team}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-black mb-8 flex items-center gap-2 ${exhibition.textColor}`}>
                <Video className="w-6 h-6" /> التغطية المرئية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVideos.map((video, idx) => (
                  <div key={idx} className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="aspect-video relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <PlayCircle className="w-10 h-10" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-black mb-8 flex items-center gap-2 ${exhibition.textColor}`}>
                <ImageIcon className="w-6 h-6" /> معرض الصور
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mockGallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-black mb-6 ${exhibition.textColor}`}>معلومات المعرض</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${exhibition.color}`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">تاريخ إقامة المعرض</div>
                    <div className="text-gray-600">نوفمبر 2026</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${exhibition.color}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">المكان</div>
                    <div className="text-gray-600">جامعة المنيا، صالة المعارض الكبرى</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${exhibition.color}`}>
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">التقييم والجوائز</div>
                    <div className="text-gray-600">سيتم تكريم أفضل {exhibition.stats.awards} مشاريع مختارة بتمويل مبدئي.</div>
                  </div>
                </div>
              </div>
              
              <Link to={exhibition.id === 3 ? "/register?role=researcher" : "/register"} className={`flex items-center justify-center w-full mt-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-lg transition-all ${exhibition.color}`}>
                {exhibition.id === 3 ? 'رفع البحث التطبيقي' : 'تسجيل المشاركة بالمعرض'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetails;
