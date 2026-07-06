import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Video, Calendar, Star, GraduationCap, ChevronLeft, 
  Search, Phone, Play, Send, Award, Laptop, Monitor, Sparkles, 
  CheckCircle, ArrowLeft, ArrowUpRight, List, Grid, ArrowUpDown, Filter,
  FileText, CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const DigitalMentorsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'rating', 'sessions'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  
  const [sessionFormSubmitted, setSessionFormSubmitted] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const [dbMentors, setDbMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('mentors').select('*');
        if (!error && data) {
          setDbMentors(data);
        }
      }
    };
    fetchMentors();
  }, []);

  // Expanded Mentors List
  const defaultMentors = [
    {
      id: 1,
      name: 'د. أحمد محمود',
      title: 'أستاذ مساعد - كلية الحاسبات والمعلومات',
      specialty: 'الذكاء الاصطناعي وتعلم الآلة',
      category: 'ai',
      rating: 4.9,
      sessions: 120,
      email: 'a.mahmoud@minia.edu.eg',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: 'م. سارة إبراهيم',
      title: 'خبيرة تسويق رقمي ومستشارة شركات',
      specialty: 'التسويق الإلكتروني ونمو الشركات',
      category: 'marketing',
      rating: 4.8,
      sessions: 85,
      email: 'sara.marketing@minia-hub.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      name: 'د. كريم حسن',
      title: 'أستاذ إدارة الأعمال ومستشار ريادي',
      specialty: 'تطوير نماذج الأعمال للمشاريع الناشئة',
      category: 'business',
      rating: 5.0,
      sessions: 200,
      email: 'k.hassan@minia.edu.eg',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 4,
      name: 'م. خالد عبد الرحمن',
      title: 'مطور نظم سحابية أول',
      specialty: 'البرمجة وتطوير الويب والنظم الموزعة',
      category: 'web',
      rating: 4.9,
      sessions: 150,
      email: 'k.abdulrahman@dev-corp.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 5,
      name: 'د. ليلى عبد العزيز',
      title: 'أستاذة علوم البيئة والاستدامة',
      specialty: 'ريادة الأعمال الخضراء والمشاريع البيئية',
      category: 'sustainability',
      rating: 5.0,
      sessions: 95,
      email: 'laila.eco@minia.edu.eg',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 6,
      name: 'م. عمر شريف',
      title: 'استشاري تصميم واجهات وتجربة المستخدم',
      specialty: 'التصميم الرقمي وتجربة المستخدم UI/UX',
      category: 'design',
      rating: 4.7,
      sessions: 110,
      email: 'omar.ux@creative-studio.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const mentors = dbMentors.length > 0 ? dbMentors : defaultMentors;

  // Expanded Learning Topics
  const topics = [
    {
      id: 1,
      title: 'تحليل الأعمال والمشاريع',
      count: '2 مساق تدريبي',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      icon: Laptop
    },
    {
      id: 2,
      title: 'علم البيانات والذكاء الاصطناعي',
      count: '6 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80',
      icon: Award
    },
    {
      id: 3,
      title: 'التسويق والنمو الرقمي',
      count: '4 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
      icon: Monitor
    },
    {
      id: 4,
      title: 'المهارات القيادية والشخصية',
      count: '8 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80',
      icon: Users
    },
    {
      id: 5,
      title: 'البرمجة وتطوير الويب',
      count: '5 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      icon: Laptop
    },
    {
      id: 6,
      title: 'التصميم وتجربة المستخدم UI/UX',
      count: '3 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1541462608141-2ff580de097e?w=600&auto=format&fit=crop&q=80',
      icon: Award
    },
    {
      id: 7,
      title: 'إنترنت الأشياء IoT والأنظمة',
      count: '3 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      icon: Monitor
    },
    {
      id: 8,
      title: 'الريادة الخضراء والاستدامة',
      count: '4 مساقات تدريبية',
      image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&auto=format&fit=crop&q=80',
      icon: Sparkles
    }
  ];

  // Filtering Logic
  const filteredMentors = mentors
    .filter(men => {
      const matchSearch = men.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          men.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          men.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSpecialty = selectedSpecialty === 'all' || men.category === selectedSpecialty;
      return matchSearch && matchSpecialty;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        comparison = b.rating - a.rating;
      } else if (sortBy === 'sessions') {
        comparison = b.sessions - a.sessions;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setSessionFormSubmitted(true);
    setTimeout(() => {
      setSessionFormSubmitted(false);
      setSelectedMentor(null);
      setBookingData({ name: '', email: '', phone: '', date: '', message: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-cairo text-slate-100" dir="rtl">
      
      {/* 1. Hero Section (Deep dark blue background, circular image with orange border) */}
      <section className="relative pt-32 pb-24 bg-[#0a1128] overflow-hidden border-b border-slate-900">
        
        {/* Subtle glowing elements in background */}
        <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Right Side: Text details */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-900 text-blue-400 text-xs sm:text-sm font-black">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>شبكة التدريب والتوجيه الرقمي بجامعة المنيا</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black leading-tight text-white">
                مسار تعلم أفضل <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-500 to-amber-400">
                  لمستقبل واعد يبدأ هنا
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg text-slate-400 leading-relaxed font-bold max-w-xl mx-auto lg:mx-0">
                منصتنا التعليمية المتقدمة للتدريب والتوجيه الأكاديمي والمهني عن بُعد. تواصل مع نخبة من الموجهين والأكاديميين لتطوير مهاراتك وبناء مسارك المستقبلي بنجاح.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('topics-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  تصفح المساقات
                </button>
                <Link 
                  to="/register?role=mentor" 
                  className="px-8 py-4 bg-transparent border border-slate-700 text-slate-200 hover:bg-slate-900 rounded-2xl font-black text-sm transition-all shadow-sm"
                >
                  انضم كمدرب رقمي
                </Link>
              </div>

            </div>

            {/* Left Side: Circular masked students group with orange gradient frame */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              
              {/* Thin gradient border layout around the mask */}
              <div className="absolute w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full border border-orange-500/30 flex items-center justify-center animate-[spin_60s_linear_infinite] pointer-events-none">
                <div className="w-60 h-60 sm:w-[340px] sm:h-[340px] border border-dashed border-slate-700/60 rounded-full" />
              </div>

              {/* Main Image Mask */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl bg-gradient-to-tr from-slate-900 to-slate-800 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80" 
                  alt="مجموعة الطلاب المدربين" 
                  className="w-full h-full object-cover scale-[1.05]"
                />
              </div>

              <div className="absolute top-4 right-4 sm:right-12 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg text-xs font-black animate-bounce">
                <GraduationCap className="w-5 h-5" />
              </div>

              <div className="absolute bottom-6 right-0 sm:right-6 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-2xl p-3 shadow-xl pointer-events-none text-right">
                <span className="text-[10px] font-black text-orange-500">ورش تدريب حية</span>
                <p className="text-xs font-black text-white mt-0.5">انضم إلينا اليوم</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 bg-slate-950 border-b border-slate-900">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0f162e] rounded-3xl p-8 border border-slate-900 hover:border-slate-800 shadow-xl hover:-translate-y-1 transition-all text-right space-y-5 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-orange-500 transition-colors">توجيه وإرشاد معتمد</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-bold">
                  نخبة من الأكاديميين والمستشارين المعتمدين لمتابعة ودعم مسار الطلاب والرد على استشاراتهم.
                </p>
              </div>
              <button 
                onClick={() => document.getElementById('database-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-black text-orange-500 hover:text-orange-600 inline-flex items-center gap-1 cursor-pointer self-start pt-4"
              >
                <span>احجز الآن</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0f162e] rounded-3xl p-8 border border-slate-900 hover:border-slate-800 shadow-xl hover:-translate-y-1 transition-all text-right space-y-5 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-orange-500 transition-colors">عقول مبتكرة</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-bold">
                  تطوير حلول برمجية وأفكار إبداعية بالتعاون مع الطلاب وتجهيزهم بمهارات ريادة الأعمال التقنية.
                </p>
              </div>
              <button 
                onClick={() => document.getElementById('topics-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-black text-orange-500 hover:text-orange-600 inline-flex items-center gap-1 cursor-pointer self-start pt-4"
              >
                <span>تصفح المزيد</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0f162e] rounded-3xl p-8 border border-slate-900 hover:border-slate-800 shadow-xl hover:-translate-y-1 transition-all text-right space-y-5 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Play className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-orange-500 transition-colors">دروس ومحاضرات حية</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-bold">
                  محاضرات ومناقشات تفاعلية مسجلة لتمنحك أقصى مرونة في مراجعة وتكرار مسار تعلمك.
                </p>
              </div>
              <button 
                onClick={() => document.getElementById('topics-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-black text-orange-500 hover:text-orange-600 inline-flex items-center gap-1 cursor-pointer self-start pt-4"
              >
                <span>شاهد العروض</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0f162e] rounded-3xl p-8 border border-slate-900 hover:border-slate-800 shadow-xl hover:-translate-y-1 transition-all text-right space-y-5 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-orange-500 transition-colors">توثيق الإنجازات</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-bold">
                  سجل حافل بالشهادات المهنية المعتمدة وقصص نجاح متدربينا في الحصول على وظائف مرموقة.
                </p>
              </div>
              <button 
                onClick={() => document.getElementById('database-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-black text-orange-500 hover:text-orange-600 inline-flex items-center gap-1 cursor-pointer self-start pt-4"
              >
                <span>عرض السجل</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-20 bg-[#0a1128] border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Right Column */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full overflow-hidden shadow-2xl border-4 border-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80" 
                  alt="مجتمع التعلم" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-6 left-2 sm:left-6 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block">هل تود معرفة المزيد؟</span>
                  <a href="tel:0100000000" className="text-xs sm:text-sm font-black text-white hover:underline">0100000000</a>
                </div>
              </div>

            </div>

            {/* Left Column */}
            <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
              <span className="text-xs font-black text-orange-500 tracking-widest uppercase">عن مجتمعنا التعليمي</span>
              
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                بناء مجتمع تعلم متميز <br />
                ومستمر مدى الحياة
              </h2>
              
              <p className="text-slate-400 font-bold text-sm sm:text-base leading-relaxed">
                نهتم بتقديم تجربة تفاعلية تجمع بين التوجيه الأكاديمي والعملي، ونوفر بيئة متكاملة تمنح الطلاب والخريجين قنوات إرشاد سهلة ومرنة مع كبار الكفاءات بجامعة المنيا.
              </p>

              {/* Features bullets */}
              <div className="space-y-4 pt-4 text-right">
                
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white">مرونة عالية وجلسات مسجلة</h4>
                    <p className="text-xs text-slate-400 font-bold mt-1 leading-normal">
                      تتلاءم الجلسات التدريبية المباشرة مع جدولك اليومي، مع إمكانية مراجعة الدروس والمسارات مجاناً بأي وقت.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white">اتصال مباشر وجلسات فردية</h4>
                    <p className="text-xs text-slate-400 font-bold mt-1 leading-normal">
                      جلسات إرشاد وتوجيه (One-on-One) مخصصة لتلبية متطلبات مشروعك، دراستك، أو تطوير سيرتك الذاتية.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4">
                <button 
                  onClick={() => document.getElementById('database-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xs sm:text-sm cursor-pointer shadow-md transition-all inline-block"
                >
                  اكتشف المزيد من الموجهين
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Favorite Topics Section (Added more topics in grid) */}
      <section id="topics-section" className="py-20 bg-slate-950 border-b border-slate-900">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-orange-500 tracking-widest uppercase">المجالات والمسارات التدريبية المحدثة</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              تصفح مجالات التعلم المفضلة
            </h2>
            <p className="text-slate-400 font-bold text-sm sm:text-base mt-2">
              توسعنا في توفير التخصصات لتشمل مجالات الثورة الصناعية الرابعة والاستدامة البيئية والبرمجة الحديثة.
            </p>
          </div>

          {/* Expanded Cards slider grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((top) => {
              const IconComp = top.icon;
              return (
                <div key={top.id} className="bg-[#0f162e] rounded-3xl overflow-hidden border border-slate-900 hover:border-slate-800 shadow-lg hover:-translate-y-1 transition-all group flex flex-col h-full text-right relative">
                  
                  {/* Topic image container */}
                  <div className="h-56 overflow-hidden relative shrink-0">
                    <img 
                      src={top.image} 
                      alt={top.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Orange rounded icon overlay on bottom of the image */}
                    <div className="absolute -bottom-5 right-6 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border border-slate-950 z-20 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content details */}
                  <div className="p-6 pt-8 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                        {top.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-bold block mt-1">{top.count}</span>
                    </div>

                    <button 
                      onClick={() => {
                        let catMap = 'all';
                        if (top.id === 2) catMap = 'ai';
                        else if (top.id === 3) catMap = 'marketing';
                        else if (top.id === 1) catMap = 'business';
                        else if (top.id === 5) catMap = 'web';
                        else if (top.id === 8) catMap = 'sustainability';
                        else if (top.id === 6) catMap = 'design';
                        setSelectedSpecialty(catMap);
                        document.getElementById('database-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 text-xs font-black text-orange-500 hover:text-orange-600 cursor-pointer self-start"
                    >
                      <span>عرض المدربين</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Mentors Database Explorer (Interactive Dashboard & Grid/Table toggles) */}
      <section id="database-section" className="py-20 bg-[#0a1128] border-b border-slate-900">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black text-orange-500 tracking-widest uppercase">قاعدة بيانات تفاعلية</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">مستكشف شبكة الموجهين والخبراء</h2>
            <p className="text-slate-400 font-bold text-sm sm:text-base mt-2">
              ابحث وفلتر ورتب ملفات الخبراء والأكاديميين المعتمدين بالشبكة من خلال قاعدة البيانات التفاعلية.
            </p>
          </div>

          {/* Database Controls Toolbar */}
          <div className="bg-[#0f162e] border border-slate-900 rounded-[2rem] p-6 mb-8 flex flex-col gap-6">
            
            {/* Search and view toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search bar */}
              <div className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2.5 flex items-center shadow-inner w-full md:max-w-md shrink-0">
                <Search className="w-5 h-5 text-slate-500 ml-2.5 shrink-0" />
                <input 
                  type="text" 
                  placeholder="ابحث بالاسم، المسمى المهني، أو البريد..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 w-full text-xs sm:text-sm font-bold pr-1" 
                />
              </div>

              {/* View Toggle and Sort controls */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                
                {/* View toggler */}
                <div className="bg-slate-950 p-1 rounded-xl flex items-center border border-slate-800 shrink-0">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="عرض بطاقات"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${viewMode === 'table' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="عرض جدول تفاعلي"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Order Toggler */}
                <button 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:text-orange-500 cursor-pointer flex items-center gap-1.5 text-xs font-black"
                  title="تغيير اتجاه الترتيب"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>{sortOrder === 'asc' ? 'تصاعدي' : 'تنازلي'}</span>
                </button>

              </div>

            </div>

            {/* Specialty Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900/60">
              {[
                { id: 'all', name: 'الكل' },
                { id: 'ai', name: 'الذكاء الاصطناعي' },
                { id: 'marketing', name: 'التسويق الرقمي' },
                { id: 'business', name: 'ريادة الأعمال' },
                { id: 'web', name: 'تطوير الويب' },
                { id: 'sustainability', name: 'الاستدامة البيئية' },
                { id: 'design', name: 'تصميم الواجهات' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSpecialty(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all border ${
                    selectedSpecialty === tab.id
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

          </div>

          {/* Interactive Rendering Modes */}
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="bg-[#0f162e] rounded-3xl p-6 shadow-xl border border-slate-900 hover:border-slate-800 transition-all flex flex-col justify-between h-full group text-right">
                  
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-800">
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-white group-hover:text-orange-500 transition-colors leading-tight">
                          {mentor.name}
                        </h3>
                        <p className="text-xs text-orange-500 font-bold mt-1 leading-snug">{mentor.title}</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-2xl p-4 mb-4 border border-slate-900/80">
                      <span className="text-[10px] text-slate-400 block font-bold mb-1">مجال التخصص والإرشاد:</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-200">{mentor.specialty}</span>
                    </div>

                    <div className="bg-slate-900/30 rounded-2xl p-3 mb-6 border border-slate-900/50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                      <span>البريد الإلكتروني:</span>
                      <span className="text-slate-350 select-all" dir="ltr">{mentor.email}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold mb-6 text-slate-400">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{mentor.rating} (تقييم)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{mentor.sessions} جلسة إرشادية</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedMentor(mentor);
                      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 bg-slate-900 hover:bg-orange-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer border border-slate-800 hover:border-orange-500 shadow-md"
                  >
                    حجز جلسة استشارية
                  </button>

                </div>
              ))}

              {filteredMentors.length === 0 && (
                <div className="col-span-full py-16 text-center bg-[#0f162e] rounded-3xl border border-slate-900 px-4">
                  <h4 className="text-slate-300 font-black text-base">لا يوجد موجهون يطابقون خيارات البحث</h4>
                  <p className="text-slate-500 text-xs mt-1 font-bold">جرب تغيير الفئة المحددة أو حذف بعض الكلمات من حقل البحث.</p>
                </div>
              )}
            </div>
          ) : (
            /* Table Database View */
            <div className="overflow-x-auto bg-[#0f162e] border border-slate-900 rounded-[2rem] shadow-xl">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-300 font-black">
                    <th className="p-4 sm:p-5">الصورة والاسم</th>
                    <th className="p-4 sm:p-5">المسمى الوظيفي</th>
                    <th className="p-4 sm:p-5">مجال التخصص</th>
                    <th className="p-4 sm:p-5 cursor-pointer hover:text-orange-500 transition-colors" onClick={() => toggleSort('rating')}>
                      <div className="flex items-center gap-1">
                        <span>التقييم</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 cursor-pointer hover:text-orange-500 transition-colors" onClick={() => toggleSort('sessions')}>
                      <div className="flex items-center gap-1">
                        <span>الجلسات المنفذة</span>
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                    </th>
                    <th className="p-4 sm:p-5">البريد الإلكتروني</th>
                    <th className="p-4 sm:p-5 text-center">العمليات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {filteredMentors.map((mentor) => (
                    <tr key={mentor.id} className="hover:bg-slate-900/40 transition-colors group">
                      <td className="p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                          <img src={mentor.image} alt={mentor.name} className="w-10 h-10 rounded-xl object-cover shrink-0 bg-slate-800" />
                          <span className="font-black text-white group-hover:text-orange-500 transition-colors">{mentor.name}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400 font-bold">{mentor.title}</td>
                      <td className="p-4 sm:p-5">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-orange-400 font-bold text-[10px] border border-slate-900">
                          {mentor.specialty}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5">
                        <div className="flex items-center gap-1 text-amber-500 font-black">
                          <Star className="w-4 h-4 fill-current shrink-0" />
                          <span>{mentor.rating}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-300 font-black">{mentor.sessions} جلسة</td>
                      <td className="p-4 sm:p-5 text-slate-400 font-bold select-all" dir="ltr">{mentor.email}</td>
                      <td className="p-4 sm:p-5 text-center">
                        <button 
                          onClick={() => {
                            setSelectedMentor(mentor);
                            document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md"
                        >
                          حجز موعد
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredMentors.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-16 text-center text-slate-500 font-bold">
                        لا يوجد موجهون يطابقون خيارات البحث والفلترة.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>

      {/* 6. Booking/Appointment Section (Anchor linked, matches form layout style) */}
      {selectedMentor && (
        <section id="booking-section" className="py-20 bg-slate-950 border-t border-slate-900">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-[#0f162e] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-slate-900 text-right space-y-6">
              
              <div className="text-center max-w-2xl mx-auto">
                <GraduationCap className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl sm:text-2xl font-black text-white">حجز جلسة إرشادية مع {selectedMentor.name}</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">أدخل بياناتك بالأسفل وسيتواصل معك منسق الشبكة لتحديد موعد وتفاصيل الاتصال بالفيديو.</p>
              </div>

              {sessionFormSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-800 rounded-3xl p-8 text-center space-y-2">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-1 animate-pulse" />
                  <h4 className="text-lg font-black text-emerald-400">تم إرسال طلب الحجز بنجاح!</h4>
                  <p className="text-xs text-emerald-600 font-bold">سوف يتم مراجعة طلبك وإرسال رابط الاتصال المرئي عبر الواتساب والبريد المذكورين قريباً.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 block">الاسم بالكامل</label>
                      <input 
                        type="text" 
                        required
                        value={bookingData.name}
                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                        placeholder="أدخل اسمك..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 block">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        placeholder="example@mail.com"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 block">رقم الهاتف (الواتس آب)</label>
                      <input 
                        type="tel" 
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        placeholder="01xxxxxxxxx"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-400 block">التاريخ والوقت المفضل</label>
                      <input 
                        type="datetime-local" 
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 block">موضوع الاستشارة أو المشروع</label>
                    <textarea 
                      rows="3"
                      value={bookingData.message}
                      onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                      placeholder="صف بالتفصيل ما ترغب في مناقشته مع الموجه..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-white focus:outline-none focus:border-orange-500"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="submit"
                      className="flex-grow bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-orange-500/25"
                    >
                      <Send className="w-4 h-4" />
                      تأكيد طلب حجز الجلسة
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSelectedMentor(null)}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-black"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default DigitalMentorsPage;
