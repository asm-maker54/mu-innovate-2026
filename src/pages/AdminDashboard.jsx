import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Award, BookOpen, Download, Search, CheckCircle, Clock, 
  AlertTriangle, Eye, ArrowLeft, RefreshCw, KeyRound, BarChart2,
  FileText, Briefcase, GraduationCap, Presentation
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

// Mock Data for Fallback
const mockGraduationProjects = [
  {
    id: "g1",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    project_name_ar: "نظام الري الذكي بالذكاء الاصطناعي",
    project_name_en: "AI-Powered Smart Irrigation System",
    college: "كلية الحاسبات والمعلومات (حكومية)",
    department: "علوم الحاسب",
    year: "2025/2026",
    project_type: "جماعي",
    status: "تم استلام الطلب",
    team_members: [
      { name: "أحمد محمد علي", id: "202201", college: "الحاسبات", email: "ahmed@example.com", phone: "01000000001", role: "قائد الفريق" },
      { name: "سارة محمود حسن", id: "202202", college: "الحاسبات", email: "sara@example.com", phone: "01000000002", role: "مطور برمجيات" }
    ],
    files: { summaryPdf: "#", pitchDeck: "#", screenshot: "#" },
    details: { projectSummary: "نظام متكامل يعتمد على مستشعرات الرطوبة والذكاء الاصطناعي لترشيد استهلاك المياه في الحقول الزراعية بصعيد مصر.", problemAddressed: "الهدر الكبير في مياه الري التقليدية.", solutionProvided: "ري ذكي تلقائي يضخ مياهًا حسب حاجة التربة الدقيقة." }
  },
  {
    id: "g2",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    project_name_ar: "كرسي متحرك ذكي لذوي الهمم",
    project_name_en: "Smart Wheelchair for Disabled",
    college: "كلية الهندسة (برنامج هندسة الميكاترونيات والروبوتات الصناعية) (أهلية)",
    department: "ميكاترونيات",
    year: "2025/2026",
    project_type: "جماعي",
    status: "تحت الفحص الإداري",
    team_members: [
      { name: "محمود خالد سعيد", id: "302201", college: "الهندسة الأهلية", email: "mahmoud@example.com", phone: "01100000001", role: "مهندس ميكانيكا" }
    ],
    files: { summaryPdf: "#", pitchDeck: "#" },
    details: { projectSummary: "كرسي ذكي يتحرك بإشارات الرأس وحركات العين لمساعدة ذوي الهمم على الحركة بيسر وأمان.", problemAddressed: "صعوبة التحكم في الكراسي التقليدية.", solutionProvided: "التحكم بإشارات الدماغ أو حركات العين." }
  }
];

const mockAppliedResearch = [
  {
    id: "r1",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    pi_name: "د. أسامة مصطفى كامل",
    pi_faculty: "كلية العلوم (حكومية)",
    pi_dept: "الكيمياء",
    pi_rank: "أستاذ مشارك",
    pi_email: "osama@minia.edu.eg",
    pi_phone: "01200000001",
    status: "تحت التقييم الفني",
    files: { researchPdf: "#", marketSummaryPdf: "#" },
    details: { problem: "تلوث المياه الجوفية ببعض المركبات العضوية.", solution: "مركب نانو كربوني جديد رخيص الثمن يمتص الملوثات بكفاءة 99%." }
  }
];

const mockRegistrations = [
  {
    id: "reg1",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "م. كريم عبد العزيز مصطفى",
    email: "karim@startup.com",
    phone: "01020304050",
    organization: "شركة نماء للتكنولوجيا",
    role: "startup",
    cv_url: "#",
    details: { startupName: "نماء تيك", industry: "الذكاء الاصطناعي والتحول الرقمي", stage: "نموذج أولي مجرب", elevatorPitch: "منصة ذكية لربط المزارعين بالأسواق مباشرة لتقليل الحلقات الوسيطة." }
  },
  {
    id: "reg2",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "أ.د. سلوى عبد الرحمن حسن",
    email: "salwa@knowledge.com",
    phone: "01122334455",
    organization: "جامعة القاهرة",
    role: "speaker",
    cv_url: "#",
    details: { speechTopic: "مستقبل ريادة الأعمال في الجامعات المصرية", speakerExpertise: "الابتكار الجامعي", speakerBio: "خبيرة في نقل التكنولوجيا وتأسيس الحاضنات الجامعية لأكثر من ١٥ عاماً." }
  },
  {
    id: "reg3",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "د. طارق جلال فوزي",
    email: "tarek@angelinvest.net",
    phone: "01599887766",
    organization: "صندوق مصر للاستثمار الملائكي",
    role: "investor",
    cv_url: null,
    details: { investorEntity: "مستثمر فردي", investmentType: "تمويل أولي / Seed Capital" }
  }
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Database state
  const [gradProjects, setGradProjects] = useState([]);
  const [appliedResearch, setAppliedResearch] = useState([]);
  const [registrants, setRegistrants] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Selection details modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'graduation', 'research', 'registration'
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  useEffect(() => {
    // Check if already authenticated via session
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin@mu2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('كلمة المرور غير صحيحة!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        // Fetch Graduation Projects
        const { data: gData, error: gErr } = await supabase
          .from('graduation_projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (gErr) throw gErr;
        setGradProjects(gData || []);

        // Fetch Applied Research
        const { data: rData, error: rErr } = await supabase
          .from('applied_research')
          .select('*')
          .order('created_at', { ascending: false });
        if (rErr) throw rErr;
        setAppliedResearch(rData || []);

        // Fetch Registrations
        const { data: regData, error: regErr } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });
        if (regErr) throw regErr;
        setRegistrants(regData || []);
      } else {
        // Use Mock Data
        setGradProjects(mockGraduationProjects);
        setAppliedResearch(mockAppliedResearch);
        setRegistrants(mockRegistrations);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (itemId, type, newStatus) => {
    try {
      if (isSupabaseConfigured) {
        const table = type === 'graduation' ? 'graduation_projects' : 'applied_research';
        const { error } = await supabase
          .from(table)
          .update({ status: newStatus })
          .eq('id', itemId);
        if (error) throw error;
      }
      
      // Update local state
      if (type === 'graduation') {
        setGradProjects(prev => prev.map(p => p.id === itemId ? { ...p, status: newStatus } : p));
      } else {
        setAppliedResearch(prev => prev.map(r => r.id === itemId ? { ...r, status: newStatus } : r));
      }

      if (selectedItem && selectedItem.id === itemId) {
        setSelectedItem(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("حدث خطأ أثناء تحديث الحالة: " + err.message);
    }
  };

  // Filter Functions
  const getFilteredGradProjects = () => {
    return gradProjects.filter(p => {
      const matchesSearch = p.project_name_ar.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.project_name_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.college.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'الكل' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredResearch = () => {
    return appliedResearch.filter(r => {
      const matchesSearch = r.pi_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.pi_faculty.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.pi_email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'الكل' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredRegistrants = (role) => {
    return registrants.filter(r => {
      const matchesRole = !role || r.role === role;
      const matchesSearch = r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.organization.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesSearch;
    });
  };

  // Stats Counters
  const getStats = () => {
    const totalGP = gradProjects.length;
    const totalAR = appliedResearch.length;
    const totalSpeakers = registrants.filter(r => r.role === 'speaker').length;
    const totalStartups = registrants.filter(r => r.role === 'startup').length;
    const totalInvestors = registrants.filter(r => r.role === 'investor').length;
    const totalMentors = registrants.filter(r => r.role === 'mentor').length;
    return { totalGP, totalAR, totalSpeakers, totalStartups, totalInvestors, totalMentors, totalReg: registrants.length };
  };

  const stats = getStats();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 px-4" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 animate-fade-in">
          <div className="w-16 h-16 bg-[#26462C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <KeyRound className="w-8 h-8 text-[#26462C]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-center text-[#26462C] mb-2">لوحة الإدارة القمة 2026</h2>
          <p className="text-sm font-semibold text-slate-500 text-center mb-8">يرجى إدخال رمز التحقق للوصول إلى لوحة التحكم</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">كلمة مرور المسؤول</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-[#26462C] focus:border-[#26462C] font-mono text-center text-lg"
                required
              />
              {loginError && <p className="text-red-500 text-sm font-bold mt-2 text-center">{loginError}</p>}
            </div>
            
            <button type="submit" className="w-full bg-[#26462C] hover:bg-[#1e3622] text-[#F4A217] py-3.5 rounded-xl font-black text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 font-sans" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-[#26462C]">لوحة تحكم إدارة القمة</h1>
              {!isSupabaseConfigured && (
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                  وضع المعاينة (بيانات تجريبية)
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-slate-500 mt-1">متابعة وفحص الطلبات، إدارة الكليات، والملفات المرفوعة للقمة</p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button onClick={fetchData} className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors" title="تحديث البيانات">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors">
              خروج
            </button>
          </div>
        </div>

        {/* Overview Stats Dashboard */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">مشروعات التخرج</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800">{stats.totalGP}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">البحوث التطبيقية</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800">{stats.totalAR}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Presentation className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">المتحدثون والمدربون</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800">{stats.totalSpeakers + stats.totalMentors}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">الشركات والمستثمرون</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800">{stats.totalStartups + stats.totalInvestors}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-slate-200">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: BarChart2 },
            { id: 'graduation', label: `مشروعات التخرج (${stats.totalGP})`, icon: GraduationCap },
            { id: 'research', label: `البحوث التطبيقية (${stats.totalAR})`, icon: BookOpen },
            { id: 'speakers', label: `المتحدثون (${stats.totalSpeakers})`, icon: Presentation },
            { id: 'startups', label: `الشركات الناشئة (${stats.totalStartups})`, icon: Briefcase },
            { id: 'investors', label: `المستثمرون (${stats.totalInvestors})`, icon: Users },
            { id: 'mentors', label: `الموجهون (${stats.totalMentors})`, icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all shrink-0 ${activeTab === tab.id ? 'bg-[#26462C] text-[#F4A217] shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and filter controls */}
        {activeTab !== 'overview' && !selectedItem && (
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث بالاسم، الكلية، البريد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pr-12 pl-4 py-3 text-sm focus:ring-2 focus:ring-[#26462C]"
              />
            </div>
            {(activeTab === 'graduation' || activeTab === 'research') && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#26462C] font-bold text-slate-700"
              >
                <option value="الكل">كل الحالات</option>
                <option value="تم استلام الطلب">تم استلام الطلب</option>
                <option value="تحت الفحص الإداري">تحت الفحص الإداري</option>
                <option value="تحت التقييم الفني">تحت التقييم الفني</option>
                <option value="تحت مراجعة الملكية الفكرية">تحت مراجعة الملكية الفكرية</option>
                <option value="مقبول للعرض في القمة">مقبول للعرض في القمة</option>
              </select>
            )}
          </div>
        )}

        {/* DATA CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6">
          
          {loading ? (
            <div className="py-20 text-center text-slate-500 font-bold flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#26462C]" />
              <span>جاري تحميل البيانات...</span>
            </div>
          ) : (
            <>
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-xl font-black text-[#26462C] mb-6">حالة المنصة وملخص الإحصائيات</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Database status and guide */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" /> إعدادات ربط Supabase
                      </h4>
                      {isSupabaseConfigured ? (
                        <div className="text-sm text-green-700 bg-green-50 border border-green-200 p-4 rounded-xl font-bold leading-relaxed">
                          ✓ تم ربط المنصة بقاعدة بيانات Supabase بنجاح! جميع البيانات المرفوعة حقيقية ومحدثة سحابياً.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 p-4 rounded-xl font-bold leading-relaxed">
                            ! لم يتم العثور على متغيرات الاتصال بـ Supabase. يتم تشغيل لوحة التحكم حالياً في وضع العرض التجريبي ببيانات افتراضية.
                          </p>
                          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 space-y-2">
                            <span className="font-black text-slate-800 block mb-1">خطوات تشغيل قواعد البيانات والملفات:</span>
                            <div>1. قم بإنشاء مشروع في <a href="https://supabase.com" target="_blank" className="text-blue-600 underline font-bold">Supabase</a>.</div>
                            <div>2. انسخ كود SQL من الملف <span className="font-bold">scratch/supabase_schema.sql</span> وشغله في SQL Editor الخاص بـ Supabase لإنشاء الجداول.</div>
                            <div>3. أنشئ ملفاً باسم <span className="font-bold">.env</span> وضع به مفاتيح الـ URL والـ Anon Key الموضحة في النموذج.</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick guides to files */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Download className="w-5 h-5 text-[#F4A217]" /> إدارة الملفات والمرفقات المرفوعة
                      </h4>
                      <p className="text-sm text-slate-600 font-semibold mb-4 leading-relaxed">
                        يتم رفع جميع الملفات (ملخصات PDF، عروض تقديمية، صور لقطات الشاشة) مباشرة إلى Bucket التخزين في Supabase. يمكنك للإدارة فتح الملفات وقراءتها بنقرة واحدة من لوحة التحكم.
                      </p>
                      <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex-1 text-center">
                          <span className="text-xs font-bold text-slate-400 block mb-1">أقصى حجم للملف</span>
                          <span className="font-black text-slate-700">10 ميجابايت</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex-1 text-center">
                          <span className="text-xs font-bold text-slate-400 block mb-1">صيغ الملفات المسموحة</span>
                          <span className="font-black text-slate-700">PDF, PPTX, JPG, PNG</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- GRADUATION PROJECTS TAB --- */}
              {activeTab === 'graduation' && !selectedItem && (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                        <th className="p-4">تاريخ التقديم</th>
                        <th className="p-4">اسم المشروع</th>
                        <th className="p-4">الكلية والجامعة</th>
                        <th className="p-4">النوع</th>
                        <th className="p-4">الحالة</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredGradProjects().length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">لا توجد مشروعات تخرج مطابقة للبحث</td></tr>
                      ) : (
                        getFilteredGradProjects().map(p => (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">{new Date(p.created_at).toLocaleDateString('ar-EG')}</td>
                            <td className="p-4 font-black text-slate-800">
                              <div>{p.project_name_ar}</div>
                              <div className="text-xs text-slate-400 font-normal mt-0.5" dir="ltr">{p.project_name_en}</div>
                            </td>
                            <td className="p-4 font-bold text-slate-600">{p.college}</td>
                            <td className="p-4 font-bold text-slate-500">{p.project_type}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                p.status === 'مقبول للعرض في القمة' ? 'bg-green-100 text-green-700' :
                                p.status.includes('تحت') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{p.status}</span>
                            </td>
                            <td className="p-4 text-center">
                              <button onClick={() => { setSelectedItem(p); setSelectedType('graduation'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                <Eye className="w-4 h-4" /> فحص التفاصيل
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* --- APPLIED RESEARCH TAB --- */}
              {activeTab === 'research' && !selectedItem && (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                        <th className="p-4">تاريخ التقديم</th>
                        <th className="p-4">الباحث الرئيسي</th>
                        <th className="p-4">الكلية والجامعة</th>
                        <th className="p-4">البريد الإلكتروني</th>
                        <th className="p-4">الحالة</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredResearch().length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">لا توجد بحوث تطبيقية مطابقة للبحث</td></tr>
                      ) : (
                        getFilteredResearch().map(r => (
                          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">{new Date(r.created_at).toLocaleDateString('ar-EG')}</td>
                            <td className="p-4 font-black text-slate-800">
                              <div>{r.pi_name}</div>
                              <div className="text-xs text-slate-400 font-normal mt-0.5">{r.pi_rank}</div>
                            </td>
                            <td className="p-4 font-bold text-slate-600">{r.pi_faculty}</td>
                            <td className="p-4 font-bold text-slate-500">{r.pi_email}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                r.status === 'مقبول للعرض في القمة' ? 'bg-green-100 text-green-700' :
                                r.status.includes('تحت') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{r.status}</span>
                            </td>
                            <td className="p-4 text-center">
                              <button onClick={() => { setSelectedItem(r); setSelectedType('research'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                <Eye className="w-4 h-4" /> فحص التفاصيل
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* --- REGISTRATIONS TABS (SPEAKERS, STARTUPS, INVESTORS, MENTORS) --- */}
              {['speakers', 'startups', 'investors', 'mentors'].includes(activeTab) && !selectedItem && (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                        <th className="p-4">التاريخ</th>
                        <th className="p-4">الاسم الكامل</th>
                        <th className="p-4">الجهة / المؤسسة</th>
                        <th className="p-4">البريد الإلكتروني</th>
                        <th className="p-4">رقم الهاتف</th>
                        <th className="p-4 text-center">الملف / السيرة الذاتية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredRegistrants(activeTab.slice(0, -1)).length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">لا يوجد مسجلون في هذا القسم</td></tr>
                      ) : (
                        getFilteredRegistrants(activeTab.slice(0, -1)).map(r => (
                          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">{new Date(r.created_at).toLocaleDateString('ar-EG')}</td>
                            <td className="p-4 font-black text-slate-800">
                              <div>{r.full_name}</div>
                              {r.details.speechTopic && <div className="text-xs text-[#26462C] font-bold mt-1">الموضوع: {r.details.speechTopic}</div>}
                              {r.details.startupName && <div className="text-xs text-[#F4A217] font-bold mt-1">الشركة: {r.details.startupName}</div>}
                            </td>
                            <td className="p-4 font-bold text-slate-600">{r.organization}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.email}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.phone}</td>
                            <td className="p-4 text-center">
                              {r.cv_url ? (
                                <a href={r.cv_url} target="_blank" className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs">
                                  <Download className="w-3.5 h-3.5" /> تحميل الملف
                                </a>
                              ) : (
                                <span className="text-slate-400 font-bold text-xs">لا يوجد مرفق</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* --- SELECTED DETAIL MODAL VIEW --- */}
              {selectedItem && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <button onClick={() => setSelectedItem(null)} className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-bold text-sm bg-slate-100 px-4 py-2 rounded-xl">
                      <ArrowLeft className="w-4 h-4" /> العودة للجدول
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-400">تحديث حالة الطلب:</span>
                      <select
                        value={selectedItem.status}
                        onChange={(e) => handleStatusChange(selectedItem.id, selectedType, e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-black text-sm text-[#26462C] focus:ring-2 focus:ring-[#26462C]"
                      >
                        <option value="تم استلام الطلب">تم استلام الطلب</option>
                        <option value="تحت الفحص الإداري">تحت الفحص الإداري</option>
                        <option value="تحت التقييم الفني">تحت التقييم الفني</option>
                        <option value="تحت مراجعة الملكية الفكرية">تحت مراجعة الملكية الفكرية</option>
                        <option value="مقبول للعرض في القمة">مقبول للعرض في القمة</option>
                      </select>
                    </div>
                  </div>

                  {/* GRADUATION PROJECT DETAIL VIEW */}
                  {selectedType === 'graduation' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <span className="text-xs font-bold text-slate-400 block mb-1">اسم المشروع (عربي / إنجليزي)</span>
                          <h2 className="text-2xl font-black text-[#26462C]">{selectedItem.project_name_ar}</h2>
                          <p className="text-md text-slate-500 font-bold" dir="ltr">{selectedItem.project_name_en}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#26462C] mb-3">ملخص المشروع</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.projectSummary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#26462C] mb-2">المشكلة</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.problemAddressed}</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#26462C] mb-2">الحل</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.solutionProvided}</p>
                          </div>
                        </div>

                        {/* Team members list */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#26462C] mb-4">أعضاء الفريق ({selectedItem.team_members?.length} طلاب)</h4>
                          <div className="space-y-4">
                            {selectedItem.team_members?.map((m, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-2">
                                <div>
                                  <span className="font-black text-slate-800">{m.name}</span>
                                  <span className="text-xs bg-[#F4A217]/10 text-[#26462C] px-2 py-0.5 rounded mr-2 font-bold">{m.role || 'عضو'}</span>
                                </div>
                                <div className="text-xs font-semibold text-slate-500 flex flex-wrap gap-4">
                                  <span>الكلية: {m.college}</span>
                                  <span>الهاتف: {m.phone}</span>
                                  <span>البريد: {m.email}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Side project info & attachments */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-[#26462C] border-b pb-2">بيانات المقرر والجامعة</h4>
                          <div>
                            <span className="text-xs text-slate-400 block">الكلية</span>
                            <span className="font-bold text-slate-700">{selectedItem.college}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">القسم</span>
                            <span className="font-bold text-slate-700">{selectedItem.department}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">سنة التخرج</span>
                            <span className="font-bold text-slate-700">{selectedItem.year}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-[#26462C] border-b pb-2">الملفات والمرفقات</h4>
                          {Object.keys(selectedItem.files || {}).length === 0 ? (
                            <span className="text-xs text-slate-400 font-bold">لا توجد ملفات مرفوعة</span>
                          ) : (
                            Object.entries(selectedItem.files).map(([key, url]) => (
                              <a href={url} target="_blank" key={key} className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors">
                                <span className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {key === 'summaryPdf' ? 'ملخص المشروع PDF' :
                                   key === 'pitchDeck' ? 'العرض التقديمي' :
                                   key === 'screenshot' ? 'صورة لقطة الشاشة' : key}
                                </span>
                                <Download className="w-4 h-4 text-slate-400" />
                              </a>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APPLIED RESEARCH DETAIL VIEW */}
                  {selectedType === 'research' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <span className="text-xs font-bold text-slate-400 block mb-1">اسم الباحث الرئيسي</span>
                          <h2 className="text-2xl font-black text-[#183059]">{selectedItem.pi_name}</h2>
                          <p className="text-md text-slate-500 font-bold">{selectedItem.pi_rank} - {selectedItem.pi_faculty}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-slate-800 mb-2">المشكلة المستهدفة بالبحث</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.problem}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-slate-800 mb-2">الحل والتطبيق المقترح</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.solution}</p>
                        </div>
                      </div>

                      {/* Research Side Panel */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">بيانات الاتصال للباحث</h4>
                          <div>
                            <span className="text-xs text-slate-400 block">البريد الإلكتروني</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_email}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">رقم الهاتف</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_phone}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">القسم العلمي</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_dept}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">الملفات البحثية</h4>
                          {Object.keys(selectedItem.files || {}).length === 0 ? (
                            <span className="text-xs text-slate-400 font-bold">لا توجد ملفات مرفوعة</span>
                          ) : (
                            Object.entries(selectedItem.files).map(([key, url]) => (
                              <a href={url} target="_blank" key={key} className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors">
                                <span className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {key === 'researchPdf' ? 'ملف البحث الرئيسي' :
                                   key === 'marketSummaryPdf' ? 'الملخص التسويقي' : key}
                                </span>
                                <Download className="w-4 h-4 text-slate-400" />
                              </a>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
