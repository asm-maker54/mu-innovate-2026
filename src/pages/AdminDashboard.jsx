import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Award, BookOpen, Download, Search, CheckCircle, Clock, 
  AlertTriangle, Eye, ArrowLeft, RefreshCw, KeyRound, BarChart2,
  FileText, Briefcase, GraduationCap, Presentation, Newspaper,
  Trash, FileSpreadsheet, Sparkles, ShoppingBag, Plus, Edit
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { initialMockNews } from '../data/mockNews';

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
  const [newsList, setNewsList] = useState(initialMockNews);
  const [loading, setLoading] = useState(false);
  
  // Selection details modal
  const [selectedItem, setSelectedItem] = useState(null);
  
  // News modal state
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [newNewsData, setNewNewsData] = useState({ title: '', content: '', image_url: '', uploader_name: 'أدمن النظام' });
  const [selectedType, setSelectedType] = useState(null); // 'graduation', 'research', 'registration'
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const [editingNewsId, setEditingNewsId] = useState(null);

  // --- Exhibition states for Innovations & Productive Units ---
  const [innovations, setInnovations] = useState([]);
  const [products, setProducts] = useState([]);
  const [isExhibitionModalOpen, setIsExhibitionModalOpen] = useState(false);
  const [exhibitionModalType, setExhibitionModalType] = useState('innovation'); // 'innovation' or 'product'
  const [exhibitionEditItem, setExhibitionEditItem] = useState(null);

  // --- Jobs states ---
  const [jobs, setJobs] = useState([]);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobEditItem, setJobEditItem] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'دوام كامل',
    experience: 'حديث التخرج',
    logo: '',
    details: ''
  });

  const [innovationFormData, setInnovationFormData] = useState({
    name: '',
    category: 'ai',
    level: 'prototype',
    levelName: 'نموذج أولي',
    team: '',
    desc: '',
    image: '',
    tech: 'Python',
    speed: 'فوري',
    accuracy: '95%',
    icon: 'Cpu'
  });

  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'منتجات زراعية',
    faculty: 'كلية الزراعة',
    facultyId: 'agriculture',
    price: '',
    image: '',
    rating: '4.8 (120)',
    tag: '',
    tagColor: 'bg-emerald-600 text-white',
    details: ''
  });

  // --- Exhibition Save/Delete Handlers ---
  const handleSaveInnovation = (e) => {
    e.preventDefault();
    let updated;
    if (exhibitionEditItem) {
      updated = innovations.map(item => item.id === exhibitionEditItem.id ? { ...item, ...innovationFormData } : item);
    } else {
      const newItem = {
        ...innovationFormData,
        id: Date.now()
      };
      updated = [newItem, ...innovations];
    }
    setInnovations(updated);
    localStorage.setItem('exhibition_innovations', JSON.stringify(updated));
    setIsExhibitionModalOpen(false);
    setExhibitionEditItem(null);
  };

  const handleDeleteInnovation = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الابتكار؟')) {
      const updated = innovations.filter(item => item.id !== id);
      setInnovations(updated);
      localStorage.setItem('exhibition_innovations', JSON.stringify(updated));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    let updated;
    if (exhibitionEditItem) {
      updated = products.map(item => item.id === exhibitionEditItem.id ? { ...item, ...productFormData } : item);
    } else {
      const newItem = {
        ...productFormData,
        id: Date.now()
      };
      updated = [newItem, ...products];
    }
    setProducts(updated);
    localStorage.setItem('exhibition_products', JSON.stringify(updated));
    setIsExhibitionModalOpen(false);
    setExhibitionEditItem(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const updated = products.filter(item => item.id !== id);
      setProducts(updated);
      localStorage.setItem('exhibition_products', JSON.stringify(updated));
    }
  };

  // --- Jobs Save/Delete/Modal Handlers ---
  const handleSaveJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        if (jobEditItem) {
          const { error } = await supabase
            .from('jobs')
            .update({
              title: jobFormData.title,
              company: jobFormData.company,
              location: jobFormData.location,
              type: jobFormData.type,
              experience: jobFormData.experience,
              logo: jobFormData.logo,
              details: jobFormData.details
            })
            .eq('id', jobEditItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('jobs')
            .insert([{
              title: jobFormData.title,
              company: jobFormData.company,
              location: jobFormData.location,
              type: jobFormData.type,
              experience: jobFormData.experience,
              logo: jobFormData.logo,
              details: jobFormData.details
            }]);
          if (error) throw error;
        }
      }

      // Offline / state handling
      let updated;
      if (jobEditItem) {
        updated = jobs.map(item => item.id === jobEditItem.id ? { ...item, ...jobFormData } : item);
      } else {
        const newItem = {
          ...jobFormData,
          id: isSupabaseConfigured ? undefined : Date.now(),
          created_at: new Date().toISOString()
        };
        updated = isSupabaseConfigured ? jobs : [newItem, ...jobs];
      }

      if (!isSupabaseConfigured) {
        setJobs(updated);
        localStorage.setItem('local_jobs', JSON.stringify(updated));
      } else {
        // Refresh online data
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error) setJobs(data || []);
      }

      setIsJobModalOpen(false);
      setJobEditItem(null);
      setJobFormData({
        title: '',
        company: '',
        location: '',
        type: 'دوام كامل',
        experience: 'حديث التخرج',
        logo: '',
        details: ''
      });
    } catch (err) {
      alert("حدث خطأ أثناء حفظ الوظيفة: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الوظيفة نهائياً؟')) {
      setLoading(true);
      try {
        if (isSupabaseConfigured) {
          const { error } = await supabase
            .from('jobs')
            .delete()
            .eq('id', id);
          if (error) throw error;
        }

        const updated = jobs.filter(item => item.id !== id);
        setJobs(updated);
        if (!isSupabaseConfigured) {
          localStorage.setItem('local_jobs', JSON.stringify(updated));
        } else {
          // Sync with server just in case
          const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error) setJobs(data || []);
        }
      } catch (err) {
        alert("حدث خطأ أثناء حذف الوظيفة: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const openAddJobModal = () => {
    setJobEditItem(null);
    setJobFormData({
      title: '',
      company: '',
      location: '',
      type: 'دوام كامل',
      experience: 'حديث التخرج',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
      details: ''
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (item) => {
    setJobEditItem(item);
    setJobFormData({
      title: item.title || '',
      company: item.company || '',
      location: item.location || '',
      type: item.type || 'دوام كامل',
      experience: item.experience || 'حديث التخرج',
      logo: item.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
      details: item.details || ''
    });
    setIsJobModalOpen(true);
  };

  const openAddInnovationModal = () => {
    setExhibitionModalType('innovation');
    setExhibitionEditItem(null);
    setInnovationFormData({
      name: '',
      category: 'ai',
      level: 'prototype',
      levelName: 'نموذج أولي',
      team: '',
      desc: '',
      image: '',
      tech: 'Python',
      speed: 'فوري',
      accuracy: '95%',
      icon: 'Cpu'
    });
    setIsExhibitionModalOpen(true);
  };

  const openEditInnovationModal = (item) => {
    setExhibitionModalType('innovation');
    setExhibitionEditItem(item);
    setInnovationFormData({
      name: item.name || '',
      category: item.category || 'ai',
      level: item.level || 'prototype',
      levelName: item.levelName || 'نموذج أولي',
      team: item.team || '',
      desc: item.desc || '',
      image: item.image || '',
      tech: item.stats?.tech || item.tech || 'Python',
      speed: item.stats?.speed || item.speed || 'فوري',
      accuracy: item.stats?.accuracy || item.accuracy || '95%',
      icon: item.icon || 'Cpu'
    });
    setIsExhibitionModalOpen(true);
  };

  const openAddProductModal = () => {
    setExhibitionModalType('product');
    setExhibitionEditItem(null);
    setProductFormData({
      name: '',
      category: 'منتجات زراعية',
      faculty: 'كلية الزراعة',
      facultyId: 'agriculture',
      price: '',
      image: '',
      rating: '4.8 (120)',
      tag: '',
      tagColor: 'bg-emerald-600 text-white',
      details: ''
    });
    setIsExhibitionModalOpen(true);
  };

  const openEditProductModal = (item) => {
    setExhibitionModalType('product');
    setExhibitionEditItem(item);
    setProductFormData({
      name: item.name || '',
      category: item.category || 'منتجات زراعية',
      faculty: item.faculty || 'كلية الزراعة',
      facultyId: item.facultyId || 'agriculture',
      price: item.price || '',
      image: item.image || '',
      rating: item.rating || '4.8 (120)',
      tag: item.tag || '',
      tagColor: item.tagColor || 'bg-emerald-600 text-white',
      details: item.details || ''
    });
    setIsExhibitionModalOpen(true);
  };

  const handleSaveNews = (e) => {
    e.preventDefault();
    if (!newNewsData.title || !newNewsData.content) return;
    
    if (editingNewsId) {
      setNewsList(newsList.map(news => news.id === editingNewsId ? { ...news, ...newNewsData } : news));
    } else {
      const newNews = {
        ...newNewsData,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      setNewsList([newNews, ...newsList]);
    }
    
    setIsNewsModalOpen(false);
    setEditingNewsId(null);
    setNewNewsData({ title: '', content: '', image_url: '', uploader_name: 'أدمن النظام' });
  };

  const openEditNewsModal = (newsItem) => {
    setNewNewsData({
      title: newsItem.title,
      content: newsItem.content,
      image_url: newsItem.image_url || '',
      uploader_name: newsItem.uploader_name
    });
    setEditingNewsId(newsItem.id);
    setIsNewsModalOpen(true);
  };

  const handleDeleteNews = (id) => {
    if(window.confirm('هل أنت متأكد من رغبتك في حذف هذا الخبر؟')) {
      setNewsList(newsList.filter(news => news.id !== id));
    }
  };

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

        // Fetch Jobs
        const { data: jData, error: jErr } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!jErr) {
          setJobs(jData || []);
        } else {
          console.error("Error fetching jobs from supabase:", jErr);
        }
      } else {
        // Use Mock Data merged with localStorage Data for offline/demo persistence
        const localRegs = JSON.parse(localStorage.getItem('local_registrations') || '[]');
        const localGradProjects = JSON.parse(localStorage.getItem('local_graduation_projects') || '[]');
        const localAppliedResearch = JSON.parse(localStorage.getItem('local_applied_research') || '[]');

        setGradProjects([...localGradProjects, ...mockGraduationProjects]);
        setAppliedResearch([...localAppliedResearch, ...mockAppliedResearch]);
        setRegistrants([...localRegs, ...mockRegistrations]);

        // Jobs local fallback
        const localJobs = JSON.parse(localStorage.getItem('local_jobs') || '[]');
        const defaultJobs = [
          {
            id: 1,
            title: 'مهندس برمجيات واجهات أمامية (Frontend)',
            company: 'TechVision Solutions',
            location: 'القرية الذكية، القاهرة',
            type: 'دوام كامل',
            experience: '1-3 سنوات',
            logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
            details: 'تطوير وتصميم واجهات وتطبيقات الويب باستخدام React.js و TailwindCSS.'
          },
          {
            id: 2,
            title: 'أخصائي تسويق إلكتروني',
            company: 'Global Media',
            location: 'عن بُعد (Remote)',
            type: 'دوام كامل',
            experience: 'حديث التخرج',
            logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200',
            details: 'إدارة حملات التواصل الاجتماعي وجوجل أدز وتهيئة محركات البحث.'
          },
          {
            id: 3,
            title: 'محلل بيانات',
            company: 'Data Insights',
            location: 'المعادي، القاهرة',
            type: 'دوام جزئي',
            experience: '0-2 سنوات',
            logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
            details: 'تحليل البيانات واستخراج التقارير وتصميم لوحات عرض البيانات Power BI.'
          },
          {
            id: 4,
            title: 'مهندس جودة برمجيات (QA)',
            company: 'SoftCore',
            location: 'المنيا الجديدة',
            type: 'دوام كامل',
            experience: '2+ سنوات',
            logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200',
            details: 'اختبار البرمجيات وتحديد الأخطاء وإعداد التقارير الفنية وعمل أتمتة للاختبارات.'
          }
        ];
        if (!localStorage.getItem('local_jobs')) {
          localStorage.setItem('local_jobs', JSON.stringify(defaultJobs));
          setJobs(defaultJobs);
        } else {
          setJobs(localJobs);
        }
      }

      // Load innovations from localStorage with fallback
      const localInnos = localStorage.getItem('exhibition_innovations');
      if (localInnos) {
        try { setInnovations(JSON.parse(localInnos)); } catch(e) {}
      } else {
        const defaultInnovations = [
          {
            id: 1,
            name: 'نظام تشخيص الأورام الذكي بالرنين المغناطيسي',
            category: 'ai',
            level: 'advanced',
            levelName: 'مستوى متقدم',
            team: 'فريق سيجما الطبي',
            desc: 'برمجيات ذكاء اصطناعي تقوم بتحليل صور الرنين لسرعة رصد الأورام بنسبة دقة تفوق 98% وتوفير الوقت للأطباء.',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
            tech: 'Python / PyTorch', speed: '3 ثوانٍ', accuracy: '98%', icon: 'Cpu'
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
            tech: 'Rust / C++', speed: 'فوري', accuracy: '99.9%', icon: 'Lock'
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
            tech: 'Arduino / ESP32', speed: 'تلقائي', accuracy: '90%', icon: 'Sprout'
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
            tech: 'React / Node.js', speed: 'سحابي', accuracy: '100%', icon: 'Globe'
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
            tech: 'Python / ROS', speed: 'لحظي', accuracy: '95%', icon: 'Cpu'
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
            tech: 'Solidity / JS', speed: 'ثانيتان', accuracy: '100%', icon: 'Database'
          }
        ];
        localStorage.setItem('exhibition_innovations', JSON.stringify(defaultInnovations));
        setInnovations(defaultInnovations);
      }

      // Load products from localStorage with fallback
      const localProducts = localStorage.getItem('exhibition_products');
      if (localProducts) {
        try { setProducts(JSON.parse(localProducts)); } catch(e) {}
      } else {
        const defaultProducts = [
          {
            id: 1,
            name: 'عسل نحل طبيعي مصفى نقي', category: 'منتجات زراعية', faculty: 'كلية الزراعة', facultyId: 'agriculture',
            price: '150 ج.م', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
            rating: '4.9 (1.2K)', tag: 'الأكثر مبيعاً', tagColor: 'bg-amber-500 text-white',
            details: 'عبوة 1 كجم عسل مصفى نقي خالي تماماً من السكر المضاف أو المواد الحافظة، من إنتاج مناحل كلية الزراعة.'
          },
          {
            id: 2,
            name: 'زيت زيتون بكر ممتاز معصور بارد', category: 'منتجات زراعية', faculty: 'كلية الزراعة', facultyId: 'agriculture',
            price: '180 ج.م', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500',
            rating: '4.8 (850)', tag: 'عصر بارد طبيعي', tagColor: 'bg-amber-600 text-white',
            details: 'زيت زيتون بكر ممتاز درجة أولى، نسبة حموضة منخفضة جداً، معصور ميكانيكياً على البارد لفوائد كاملة.'
          },
          {
            id: 3,
            name: 'نباتات زينة وشتلات زهور منزلية', category: 'منتجات زراعية', faculty: 'كلية الزراعة', facultyId: 'agriculture',
            price: '35 ج.م', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=500',
            rating: '4.7 (310)', tag: 'شتلات زهور', tagColor: 'bg-green-600 text-white',
            details: 'مجموعة متميزة من نباتات الظل والزينة المنزلية المجهزة للزراعة وتجميل المكاتب والبلكونات.'
          },
          {
            id: 4,
            name: 'منظفات ومطهر أرضيات عالي الجودة', category: 'منظفات صناعية', faculty: 'كلية العلوم', facultyId: 'science',
            price: '45 ج.م', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=500',
            rating: '4.7 (2.1K)', tag: 'الأعلى مبيعاً', tagColor: 'bg-emerald-600 text-white',
            details: 'مطهرات ومنظفات آمنة عالية التركيز للإنتاج المنزلي والتجاري، مصنعة وفق المعايير الطبية بقسم الكيمياء.'
          },
          {
            id: 5,
            name: 'صابون سائل معقم مضاد للبكتيريا', category: 'منظفات صناعية', faculty: 'كلية العلوم', facultyId: 'science',
            price: '60 ج.م', image: 'https://images.unsplash.com/photo-1607006342411-101a4e101155?auto=format&fit=crop&q=80&w=500',
            rating: '4.6 (950)', tag: 'مطهر آمن', tagColor: 'bg-emerald-700 text-white',
            details: 'عبوة عائلية 3 لتر من الصابون السائل المعزز بمرطبات الجلسرين لحماية الأيدي وترطيبها بفاعلية تامة.'
          },
          {
            id: 6,
            name: 'معقم كحولي طبي بتركيز 70%', category: 'منظفات صناعية', faculty: 'كلية العلوم', facultyId: 'science',
            price: '50 ج.م', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500',
            rating: '4.9 (1.4K)', tag: 'طبي معتمد', tagColor: 'bg-cyan-600 text-white',
            details: 'بخاخ كحول إيثيلي نقي تركيز 70% للتعقيم المباشر وحماية الأسطح والأيدي بفاعلية تامة مصنع بمعامل الكلية.'
          }
        ];
        localStorage.setItem('exhibition_products', JSON.stringify(defaultProducts));
        setProducts(defaultProducts);
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
        const table = 
          type === 'graduation' ? 'graduation_projects' : 
          type === 'research' ? 'applied_research' : 'registrations';
        const { error } = await supabase
          .from(table)
          .update({ status: newStatus })
          .eq('id', itemId);
        if (error) throw error;
      } else {
        if (type === 'registration') {
          const localRegs = JSON.parse(localStorage.getItem('local_registrations') || '[]');
          const updated = localRegs.map(r => r.id === itemId ? { ...r, status: newStatus } : r);
          localStorage.setItem('local_registrations', JSON.stringify(updated));
        } else if (type === 'graduation') {
          const localProjects = JSON.parse(localStorage.getItem('local_graduation_projects') || '[]');
          const updated = localProjects.map(p => p.id === itemId ? { ...p, status: newStatus } : p);
          localStorage.setItem('local_graduation_projects', JSON.stringify(updated));
        } else if (type === 'research') {
          const localResearch = JSON.parse(localStorage.getItem('local_applied_research') || '[]');
          const updated = localResearch.map(r => r.id === itemId ? { ...r, status: newStatus } : r);
          localStorage.setItem('local_applied_research', JSON.stringify(updated));
        }
      }
      
      // Update local state
      if (type === 'graduation') {
        setGradProjects(prev => prev.map(p => p.id === itemId ? { ...p, status: newStatus } : p));
      } else if (type === 'research') {
        setAppliedResearch(prev => prev.map(r => r.id === itemId ? { ...r, status: newStatus } : r));
      } else if (type === 'registration') {
        setRegistrants(prev => prev.map(r => r.id === itemId ? { ...r, status: newStatus } : r));
      }

      if (selectedItem && selectedItem.id === itemId) {
        setSelectedItem(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("حدث خطأ أثناء تحديث الحالة: " + err.message);
    }
  };

  const handleDeleteItem = async (itemId, type) => {
    const isConfirm = window.confirm(
      isRtl 
        ? "هل أنت متأكد من رغبتك في حذف هذا السجل نهائياً؟ لا يمكن التراجع عن هذا الإجراء." 
        : "Are you sure you want to delete this record permanently? This action cannot be undone."
    );
    if (!isConfirm) return;

    try {
      if (isSupabaseConfigured) {
        const table = 
          type === 'graduation' ? 'graduation_projects' : 
          type === 'research' ? 'applied_research' : 'registrations';

        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', itemId);
        if (error) throw error;
      } else {
        if (type === 'registration') {
          const localRegs = JSON.parse(localStorage.getItem('local_registrations') || '[]');
          const updated = localRegs.filter(r => r.id !== itemId);
          localStorage.setItem('local_registrations', JSON.stringify(updated));
        } else if (type === 'graduation') {
          const localProjects = JSON.parse(localStorage.getItem('local_graduation_projects') || '[]');
          const updated = localProjects.filter(p => p.id !== itemId);
          localStorage.setItem('local_graduation_projects', JSON.stringify(updated));
        } else if (type === 'research') {
          const localResearch = JSON.parse(localStorage.getItem('local_applied_research') || '[]');
          const updated = localResearch.filter(r => r.id !== itemId);
          localStorage.setItem('local_applied_research', JSON.stringify(updated));
        }
      }

      // Update local state
      if (type === 'graduation') {
        setGradProjects(prev => prev.filter(p => p.id !== itemId));
      } else if (type === 'research') {
        setAppliedResearch(prev => prev.filter(r => r.id !== itemId));
      } else if (type === 'registration') {
        setRegistrants(prev => prev.filter(r => r.id !== itemId));
      }

      if (selectedItem && selectedItem.id === itemId) {
        setSelectedItem(null);
      }
      alert(isRtl ? "تم حذف السجل بنجاح." : "Record deleted successfully.");
    } catch (err) {
      alert((isRtl ? "حدث خطأ أثناء الحذف: " : "Error deleting record: ") + err.message);
    }
  };

  const handleExportToExcel = () => {
    let dataToExport = [];
    let headers = [];
    let filename = '';

    if (activeTab === 'graduation') {
      const items = getFilteredGradProjects();
      headers = ['تاريخ التقديم', 'اسم المشروع بالعربية', 'اسم المشروع بالإنجليزية', 'الكلية والجامعة', 'النوع', 'الحالة', 'البريد الإلكتروني للرائد', 'الهاتف', 'الملخص'];
      dataToExport = items.map(p => [
        new Date(p.created_at).toLocaleDateString('ar-EG'),
        p.project_name_ar,
        p.project_name_en,
        p.college,
        p.project_type,
        p.status,
        p.leader_email || '',
        p.leader_phone || '',
        p.abstract || ''
      ]);
      filename = 'مشروعات_التخرج.csv';
    } else if (activeTab === 'research') {
      const items = getFilteredResearch();
      headers = ['تاريخ التقديم', 'الباحث الرئيسي', 'الدرجة العلمية', 'الكلية والجامعة', 'البريد الإلكتروني', 'الهاتف', 'الحالة', 'عنوان البحث', 'الملخص'];
      dataToExport = items.map(r => [
        new Date(r.created_at).toLocaleDateString('ar-EG'),
        r.pi_name,
        r.pi_rank,
        r.pi_faculty,
        r.pi_email,
        r.pi_phone || '',
        r.status,
        r.research_title || '',
        r.research_abstract || ''
      ]);
      filename = 'البحوث_التطبيقية.csv';
    } else if (['speakers', 'startups', 'investors', 'mentors', 'researchers', 'partners', 'volunteers'].includes(activeTab)) {
      const role = activeTab.slice(0, -1);
      const items = getFilteredRegistrants(role);
      headers = ['التاريخ', 'الاسم الكامل', 'الجهة / المؤسسة', 'البريد الإلكتروني', 'رقم الهاتف', 'الرقم القومي', 'الحالة', 'رابط السيرة الذاتية'];
      dataToExport = items.map(r => [
        new Date(r.created_at).toLocaleDateString('ar-EG'),
        r.full_name,
        r.organization,
        r.email,
        r.phone,
        r.details?.nationalId || '',
        r.status || 'تحت الفحص الإداري',
        r.cv_url || ''
      ]);
      
      const roleNamesAr = {
        speaker: 'المتحدثون',
        startup: 'الشركات_الناشئة',
        investor: 'المستثمرون',
        mentor: 'الموجهون',
        researcher: 'الباحثون_والمبتكرون',
        partner: 'الشركاء_والرعاة',
        volunteer: 'المتطوعون'
      };
      filename = `${roleNamesAr[role] || 'المسجلون'}.csv`;
    } else if (activeTab === 'news') {
      headers = ['التاريخ', 'العنوان', 'الكاتب / الناشر', 'المحتوى'];
      dataToExport = newsList.map(n => [
        new Date(n.created_at).toLocaleDateString('ar-EG'),
        n.title,
        n.uploader_name,
        n.content
      ]);
      filename = 'الأخبار.csv';
    } else if (activeTab === 'jobs') {
      headers = ['التاريخ', 'المسمى الوظيفي', 'الشركة', 'الموقع', 'النوع', 'الخبرة', 'تفاصيل الوظيفة'];
      dataToExport = jobs.map(j => [
        j.created_at ? new Date(j.created_at).toLocaleDateString('ar-EG') : '',
        j.title,
        j.company,
        j.location,
        j.type,
        j.experience,
        j.details || ''
      ]);
      filename = 'شواغر_الوظائف.csv';
    } else {
      return;
    }

    // Convert data to CSV format with UTF-8 BOM so Excel opens it with Arabic characters correctly
    let csvContent = '\uFEFF'; // UTF-8 BOM
    
    // Add header row
    csvContent += headers.map(header => `"${header.replace(/"/g, '""')}"`).join(',') + '\n';
    
    // Add data rows
    dataToExport.forEach(row => {
      csvContent += row.map(value => {
        const strValue = String(value === null || value === undefined ? '' : value);
        return `"${strValue.replace(/"/g, '""')}"`;
      }).join(',') + '\n';
    });

    // Create a download link and trigger it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const getStats = () => {
    const totalGP = gradProjects.length;
    const totalAR = appliedResearch.length;
    const totalSpeakers = registrants.filter(r => r.role === 'speaker').length;
    const totalStartups = registrants.filter(r => r.role === 'startup').length;
    const totalInvestors = registrants.filter(r => r.role === 'investor').length;
    const totalMentors = registrants.filter(r => r.role === 'mentor').length;
    const totalResearchers = registrants.filter(r => r.role === 'researcher').length;
    const totalPartners = registrants.filter(r => r.role === 'partner').length;
    const totalVolunteers = registrants.filter(r => r.role === 'volunteer').length;
    const totalJobs = jobs.length;
    return { 
      totalGP, 
      totalAR, 
      totalSpeakers, 
      totalStartups, 
      totalInvestors, 
      totalMentors, 
      totalResearchers,
      totalPartners,
      totalVolunteers,
      totalJobs,
      totalReg: registrants.length 
    };
  };

  const stats = getStats();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-100 px-4 relative overflow-hidden" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {/* Decorative background glows */}
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-emerald-200/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#F4A217]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100/80 p-8 md:p-10 relative z-10 hover:shadow-emerald-900/5 transition-all duration-500">
          <div className="w-20 h-20 bg-[#26462C]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 relative group">
            <div className="absolute inset-0 bg-[#26462C]/5 rounded-3xl animate-ping opacity-60"></div>
            <KeyRound className="w-10 h-10 text-[#26462C] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-center text-[#26462C] mb-2 tracking-tight">لوحة الإدارة القمة 2026</h2>
          <p className="text-xs font-bold text-slate-400 text-center mb-8">يرجى إدخال رمز التحقق للوصول الآمن للوحة التحكم</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-600 mb-2.5">كلمة مرور المسؤول *</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#26462C] focus:border-[#26462C] font-mono text-center text-lg outline-none transition-all duration-300 shadow-inner"
                required
              />
              {loginError && <p className="text-red-500 text-xs font-bold mt-2.5 text-center">{loginError}</p>}
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-800 to-[#26462C] hover:from-emerald-700 hover:to-[#1e3622] text-[#F4A217] py-3.5 rounded-xl font-black text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
              <span>تسجيل الدخول الآمن</span>
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100/80 shadow-soft mb-8 transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black text-[#26462C] tracking-tight">لوحة تحكم إدارة القمة</h1>
              
              {isSupabaseConfigured ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>متصل بالسحابة (Supabase)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>وضع المعاينة (محلي / تجريبي)</span>
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1.5">متابعة وفحص الطلبات، إدارة الكليات، الوظائف، والملفات المرفوعة للقمة</p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button onClick={fetchData} className="p-3 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95" title="تحديث البيانات">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95 border border-red-100">
              خروج من النظام
            </button>
          </div>
        </div>

        {/* Overview Stats Dashboard */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100/80 shadow-soft flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <GraduationCap className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">مشروعات التخرج</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{stats.totalGP}</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100/80 shadow-soft flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <BookOpen className="w-7 h-7 text-indigo-600 group-hover:text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">البحوث التطبيقية</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{stats.totalAR}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100/80 shadow-soft flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <Presentation className="w-7 h-7 text-emerald-600 group-hover:text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">المتحدثون والمدربون</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{stats.totalSpeakers + stats.totalMentors}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100/80 shadow-soft flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <Briefcase className="w-7 h-7 text-amber-600 group-hover:text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">الشركات والمستثمرون</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{stats.totalStartups + stats.totalInvestors}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100/80 shadow-soft flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group col-span-2 md:col-span-1">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <Briefcase className="w-7 h-7 text-purple-600 group-hover:text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">وظائف ملتقى التوظيف</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{stats.totalJobs}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent border-b border-slate-200/60">
          {[
            { id: 'overview', label: 'نظرة عامة', count: null, icon: BarChart2 },
            { id: 'news', label: 'الأخبار', count: newsList.length, icon: Newspaper },
            { id: 'jobs', label: 'وظائف الملتقى', count: jobs.length, icon: Briefcase },
            { id: 'exhibition_innovations', label: 'معرض الابتكارات', count: innovations.length, icon: Sparkles },
            { id: 'exhibition_products', label: 'معرض الوحدات', count: products.length, icon: ShoppingBag },
            { id: 'graduation', label: 'مشروعات التخرج', count: stats.totalGP, icon: GraduationCap },
            { id: 'research', label: 'البحوث التطبيقية', count: stats.totalAR, icon: BookOpen },
            { id: 'speakers', label: 'المتحدثون', count: stats.totalSpeakers, icon: Presentation },
            { id: 'startups', label: 'الشركات الناشئة', count: stats.totalStartups, icon: Briefcase },
            { id: 'investors', label: 'المستثمرون', count: stats.totalInvestors, icon: Users },
            { id: 'mentors', label: 'الموجهون', count: stats.totalMentors, icon: Users },
            { id: 'researchers', label: 'الباحثون / المبتكرون', count: stats.totalResearchers, icon: BookOpen },
            { id: 'partners', label: 'الشركاء / الرعاة', count: stats.totalPartners, icon: Users },
            { id: 'volunteers', label: 'المتطوعون', count: stats.totalVolunteers, icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 shrink-0 border cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-emerald-800 to-[#26462C] text-[#F4A217] border-transparent shadow-md transform scale-102 hover:shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#F4A217]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold transition-colors ${
                  activeTab === tab.id ? 'bg-[#F4A217] text-[#26462C]' : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                  {tab.count}
                </span>
              )}
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
                className="w-full bg-white border border-slate-200/85 rounded-2xl pr-12 pl-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#26462C] focus:border-[#26462C] outline-none shadow-sm transition-all duration-300"
              />
            </div>
            {(activeTab === 'graduation' || activeTab === 'research') && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-slate-200/85 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#26462C] focus:border-[#26462C] font-bold text-slate-700 outline-none shadow-sm transition-all duration-300 cursor-pointer"
              >
                <option value="الكل">كل الحالات</option>
                <option value="تم استلام الطلب">تم استلام الطلب</option>
                <option value="تحت الفحص الإداري">تحت الفحص الإداري</option>
                <option value="تحت التقييم الفني">تحت التقييم الفني</option>
                <option value="تحت مراجعة الملكية الفكرية">تحت مراجعة الملكية الفكرية</option>
                <option value="مقبول للعرض في القمة">مقبول للعرض في القمة</option>
              </select>
            )}
            <button
              onClick={handleExportToExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer hover:-translate-y-0.5 border border-emerald-500"
              title="تصدير هذه القائمة إلى ملف إكسيل CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>تصدير إلى إكسيل</span>
            </button>
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

              {/* --- NEWS TAB --- */}
              {activeTab === 'news' && !selectedItem && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-xl font-black text-[#26462C] mb-1">إدارة الأخبار</h3>
                      <p className="text-sm text-slate-500 font-bold">إضافة وتعديل وحذف الأخبار المعروضة في الصفحة الرئيسية.</p>
                    </div>
                    <button 
                      onClick={() => setIsNewsModalOpen(true)}
                      className="bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0"
                    >
                      + إضافة خبر جديد
                    </button>
                  </div>

                  {newsList.length === 0 ? (
                    <div className="py-20 text-center text-slate-500 font-bold bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                      لا توجد أخبار مضافة حتى الآن.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {newsList.map(newsItem => (
                        <div key={newsItem.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                          <div className="h-48 bg-slate-100 relative overflow-hidden">
                            {newsItem.image_url ? (
                              <img src={newsItem.image_url} alt={newsItem.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="flex flex-col items-center justify-center w-full h-full text-slate-400 bg-slate-100">
                                <Newspaper className="w-10 h-10 mb-2 opacity-50" />
                                <span className="text-xs font-bold">لا توجد صورة</span>
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-black text-slate-800 text-lg mb-2 line-clamp-2">{newsItem.title}</h4>
                            <p className="text-slate-500 text-sm line-clamp-3 flex-1 mb-4 leading-relaxed">{newsItem.content}</p>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-400 border-t border-slate-100 pt-4 mt-auto">
                              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {new Date(newsItem.created_at).toLocaleDateString('ar-EG')}</div>
                              <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5"/> {newsItem.uploader_name}</div>
                            </div>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                               <button onClick={() => openEditNewsModal(newsItem)} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors">تعديل</button>
                               <button onClick={() => handleDeleteNews(newsItem.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">حذف</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- JOBS TAB --- */}
              {activeTab === 'jobs' && !selectedItem && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-xl font-black text-[#26462C] mb-1">إدارة وظائف الملتقى</h3>
                      <p className="text-sm text-slate-500 font-bold">إضافة وتعديل وحذف الوظائف الشاغرة المعروضة للطلاب والخريجين بالملتقى.</p>
                    </div>
                    <button 
                      onClick={openAddJobModal}
                      className="bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>+ إضافة وظيفة جديدة</span>
                    </button>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="py-20 text-center text-slate-500 font-bold bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                      لا توجد وظائف مضافة حتى الآن.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                            <th className="p-4">شعار الشركة</th>
                            <th className="p-4">المسمى الوظيفي</th>
                            <th className="p-4">الشركة</th>
                            <th className="p-4">الموقع</th>
                            <th className="p-4">النوع</th>
                            <th className="p-4">الخبرة</th>
                            <th className="p-4 text-center">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {jobs.filter(j => 
                            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            j.location.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map(j => (
                            <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                                  <img src={j.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'} alt={j.company} className="w-full h-full object-cover" />
                                </div>
                              </td>
                              <td className="p-4 font-black text-slate-800">{j.title}</td>
                              <td className="p-4 font-bold text-slate-600">{j.company}</td>
                              <td className="p-4 font-semibold text-slate-500">{j.location}</td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs">
                                  {j.type}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 bg-orange-50 text-orange-700 font-bold rounded-lg text-xs">
                                  {j.experience}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button 
                                    onClick={() => openEditJobModal(j)} 
                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                                  >
                                    تعديل
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteJob(j.id)} 
                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                                  >
                                    حذف
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => { setSelectedItem(p); setSelectedType('graduation'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                  <Eye className="w-4 h-4" /> فحص التفاصيل
                                </button>
                                <button onClick={() => handleDeleteItem(p.id, 'graduation')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs" title="حذف">
                                  <Trash className="w-3.5 h-3.5" /> حذف
                                </button>
                              </div>
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
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => { setSelectedItem(r); setSelectedType('research'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                  <Eye className="w-4 h-4" /> فحص التفاصيل
                                </button>
                                <button onClick={() => handleDeleteItem(r.id, 'research')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs" title="حذف">
                                  <Trash className="w-3.5 h-3.5" /> حذف
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* --- REGISTRATIONS TABS (SPEAKERS, STARTUPS, INVESTORS, MENTORS, RESEARCHERS, PARTNERS, VOLUNTEERS) --- */}
              {['speakers', 'startups', 'investors', 'mentors', 'researchers', 'partners', 'volunteers'].includes(activeTab) && !selectedItem && (
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
                        <th className="p-4">الحالة</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredRegistrants(activeTab.slice(0, -1)).length === 0 ? (
                        <tr><td colSpan="8" className="p-8 text-center text-slate-400 font-bold">لا يوجد مسجلون في هذا القسم</td></tr>
                      ) : (
                        getFilteredRegistrants(activeTab.slice(0, -1)).map(r => (
                          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">{new Date(r.created_at).toLocaleDateString('ar-EG')}</td>
                            <td className="p-4 font-black text-slate-800">
                              <div>{r.full_name}</div>
                              {r.details.nationalId && <div className="text-xs text-purple-700 font-bold mt-1">الرقم القومي: {r.details.nationalId}</div>}
                              {r.details.speechTopic && <div className="text-xs text-[#26462C] font-bold mt-1">الموضوع: {r.details.speechTopic}</div>}
                              {r.details.startupName && <div className="text-xs text-[#F4A217] font-bold mt-1">الشركة الناشئة: {r.details.startupName}</div>}
                              {r.details.researchTitle && <div className="text-xs text-blue-600 font-bold mt-1">عنوان البحث: {r.details.researchTitle}</div>}
                              {r.details.companyName && <div className="text-xs text-indigo-600 font-bold mt-1">المؤسسة: {r.details.companyName} ({r.details.partnerType})</div>}
                              {r.details.volunteerCommittee && <div className="text-xs text-emerald-600 font-bold mt-1">لجنة التطوع: {r.details.volunteerCommittee}</div>}
                            </td>
                            <td className="p-4 font-bold text-slate-600">{r.organization}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.email}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.phone}</td>
                            <td className="p-4 text-center">
                              {r.cv_url && r.cv_url !== '#' ? (
                                <a href={r.cv_url} target="_blank" className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs">
                                  <Download className="w-3.5 h-3.5" /> تحميل الملف
                                </a>
                              ) : (
                                <span className="text-slate-400 font-bold text-xs">لا يوجد مرفق</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                r.status === 'مقبول للعرض في القمة' ? 'bg-green-100 text-green-700' :
                                (r.status || '').includes('تحت') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{r.status || 'تحت الفحص الإداري'}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                {r.status === 'مقبول للعرض في القمة' ? (
                                  <button 
                                    onClick={() => handleStatusChange(r.id, 'registration', 'تحت الفحص الإداري')}
                                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold text-xs transition-colors whitespace-nowrap"
                                  >
                                    إلغاء القبول
                                  </button>
                                ) : (
                                  <div className="flex flex-col items-center gap-1">
                                    <button 
                                      onClick={() => handleStatusChange(r.id, 'registration', 'مقبول للعرض في القمة')}
                                      disabled={!r.cv_url || r.cv_url === '#'}
                                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-sm whitespace-nowrap ${
                                        (!r.cv_url || r.cv_url === '#') 
                                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                                          : 'bg-green-600 hover:bg-green-700 text-white'
                                      }`}
                                      title={(!r.cv_url || r.cv_url === '#') ? 'يرجى رفع السيرة الذاتية أولاً لتتمكن من القبول' : ''}
                                    >
                                      موافقة وقبول
                                    </button>
                                    {(!r.cv_url || r.cv_url === '#') && (
                                      <span className="text-[9px] text-red-500 font-bold whitespace-nowrap">يجب رفع الـ CV أولاً</span>
                                    )}
                                  </div>
                                )}
                                <button 
                                  onClick={() => handleDeleteItem(r.id, 'registration')} 
                                  className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs" 
                                  title="حذف الحساب"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* --- EXHIBITION INNOVATIONS TAB --- */}
              {activeTab === 'exhibition_innovations' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800">إدارة معروضات معرض الابتكارات الرقمية والذكاء الاصطناعي</h3>
                    <button 
                      onClick={openAddInnovationModal}
                      className="px-5 py-2.5 bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
                    >
                      <Plus className="w-4 h-4" /> إضافة ابتكار جديد
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {innovations.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
                        لا توجد ابتكارات مضافة حالياً. اضغط على الزر بالأعلى لإضافة أول ابتكار.
                      </div>
                    ) : (
                      innovations.filter(item => 
                        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.team?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map(item => (
                        <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                          <div>
                            <div className="relative h-48 bg-slate-100">
                              <img 
                                src={item.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600'} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                              />
                              <span className="absolute top-4 right-4 bg-teal-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                {item.category === 'ai' ? 'ذكاء اصطناعي' : 
                                 item.category === 'cyber' ? 'أمن سيبراني' :
                                 item.category === 'iot' ? 'إنترنت أشياء' : 'تطبيقات ويب/جوال'}
                              </span>
                            </div>
                            <div className="p-6 space-y-3">
                              <span className="text-[10px] font-black text-slate-400">{item.team}</span>
                              <h4 className="font-black text-slate-800 text-base leading-snug line-clamp-1">{item.name}</h4>
                              <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">{item.desc}</p>
                              
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                <span>المستوى: <strong className="text-blue-600">{item.levelName || item.level}</strong></span>
                                <span>التقنية: <strong>{item.stats?.tech || item.tech || 'Python'}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2">
                            <button 
                              onClick={() => openEditInnovationModal(item)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> تعديل
                            </button>
                            <button 
                              onClick={() => handleDeleteInnovation(item.id)}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" /> حذف
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* --- EXHIBITION PRODUCTS TAB --- */}
              {activeTab === 'exhibition_products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800">إدارة معروضات ومنتجات الوحدات الإنتاجية بالكليات</h3>
                    <button 
                      onClick={openAddProductModal}
                      className="px-5 py-2.5 bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
                    >
                      <Plus className="w-4 h-4" /> إضافة منتج جديد
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
                        لا توجد منتجات مضافة حالياً. اضغط على الزر بالأعلى لإضافة أول منتج.
                      </div>
                    ) : (
                      products.filter(item => 
                        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.faculty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map(item => (
                        <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                          <div>
                            <div className="relative h-48 bg-slate-100">
                              <img 
                                src={item.image || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600'} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                              />
                              {item.tag && (
                                <span className={`absolute top-4 right-4 text-white text-[10px] font-black px-3 py-1 rounded-full ${item.tagColor || 'bg-amber-500'}`}>
                                  {item.tag}
                                </span>
                              )}
                              <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-black px-3 py-1 rounded-full shadow-sm">
                                {item.price}
                              </span>
                            </div>
                            <div className="p-6 space-y-3">
                              <span className="text-[10px] font-black text-slate-400">{item.faculty}</span>
                              <h4 className="font-black text-slate-800 text-base leading-snug line-clamp-1">{item.name}</h4>
                              <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">{item.details}</p>
                              
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                <span>القسم: <strong className="text-indigo-600">{item.category}</strong></span>
                                <span>التقييم: <strong>{item.rating || '4.8 (120)'}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2">
                            <button 
                              onClick={() => openEditProductModal(item)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> تعديل
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(item.id)}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" /> حذف
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
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
                              <a 
                                href={url !== '#' ? url : undefined} 
                                onClick={(e) => {
                                  if (url === '#') {
                                    e.preventDefault();
                                    alert('عذراً، هذا الملف غير متوفر حالياً.');
                                  }
                                }}
                                target="_blank" 
                                rel="noreferrer"
                                key={key} 
                                className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                              >
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
                              <a 
                                href={url !== '#' ? url : undefined} 
                                onClick={(e) => {
                                  if (url === '#') {
                                    e.preventDefault();
                                    alert('عذراً، هذا الملف غير متوفر حالياً.');
                                  }
                                }}
                                target="_blank" 
                                rel="noreferrer"
                                key={key} 
                                className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                              >
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

      {/* Exhibition Modal (Add/Edit) */}
      {isExhibitionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsExhibitionModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl animate-scale-up flex flex-col max-h-[90vh]">
            <div className="bg-[#26462C] text-white p-6 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-black text-[#F4A217]">
                {exhibitionModalType === 'innovation'
                  ? (exhibitionEditItem ? 'تعديل بيانات الابتكار' : 'إضافة ابتكار جديد لمعرض الابتكارات')
                  : (exhibitionEditItem ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للوحدات الإنتاجية')
                }
              </h2>
              <button 
                onClick={() => setIsExhibitionModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-right" dir="rtl">
              {exhibitionModalType === 'innovation' ? (
                <form onSubmit={handleSaveInnovation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">عنوان الابتكار *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.name}
                        onChange={(e) => setInnovationFormData({...innovationFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">اسم الفريق / المبتكر *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.team}
                        onChange={(e) => setInnovationFormData({...innovationFormData, team: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">التصنيف *</label>
                      <select 
                        value={innovationFormData.category}
                        onChange={(e) => setInnovationFormData({...innovationFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="ai">الذكاء الاصطناعي</option>
                        <option value="cyber">الأمن السيبراني</option>
                        <option value="iot">إنترنت الأشياء</option>
                        <option value="apps">تطبيقات الويب والجوال</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">مستوى الجاهزية *</label>
                      <select 
                        value={innovationFormData.level}
                        onChange={(e) => {
                          const val = e.target.value;
                          let name = 'نموذج أولي';
                          if (val === 'advanced') name = 'مستوى متقدم';
                          if (val === 'ready') name = 'جاهز للتبني التجاري';
                          setInnovationFormData({...innovationFormData, level: val, levelName: name});
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="prototype">نموذج أولي</option>
                        <option value="advanced">مستوى متقدم</option>
                        <option value="ready">جاهز للتبني التجاري</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">التقنية المستخدمة</label>
                      <input 
                        type="text" 
                        value={innovationFormData.tech}
                        onChange={(e) => setInnovationFormData({...innovationFormData, tech: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="مثال: React / Node.js"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">أيقونة العرض (اسم الأيقونة)</label>
                      <select 
                        value={innovationFormData.icon}
                        onChange={(e) => setInnovationFormData({...innovationFormData, icon: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="Cpu">Cpu (معالج)</option>
                        <option value="Lock">Lock (قفل حماية)</option>
                        <option value="Sprout">Sprout (بيئي / نبات)</option>
                        <option value="Globe">Globe (إنترنت / شبكة)</option>
                        <option value="Database">Database (قواعد بيانات)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">رابط صورة الابتكار</label>
                      <input 
                        type="url" 
                        value={innovationFormData.image}
                        onChange={(e) => setInnovationFormData({...innovationFormData, image: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs text-left"
                        dir="ltr"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">الوصف والشرح *</label>
                      <textarea 
                        required
                        rows={3}
                        value={innovationFormData.desc}
                        onChange={(e) => setInnovationFormData({...innovationFormData, desc: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button type="submit" className="flex-1 bg-[#26462C] hover:bg-[#1a301e] text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
                      {exhibitionEditItem ? 'حفظ التعديلات' : 'إضافة للابتكارات'}
                    </button>
                    <button type="button" onClick={() => setIsExhibitionModalOpen(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">اسم المنتج / الخدمة *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.name}
                        onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">الكلية المنتجة *</label>
                      <select 
                        value={productFormData.facultyId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const selectEl = e.target;
                          const name = selectEl.options[selectEl.selectedIndex].text;
                          setProductFormData({...productFormData, facultyId: val, faculty: name});
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="agriculture">كلية الزراعة</option>
                        <option value="science">كلية العلوم</option>
                        <option value="artedu">كلية التربية الفنية</option>
                        <option value="specific">كلية التربية النوعية</option>
                        <option value="engineering">كلية الهندسة</option>
                        <option value="computers">كلية الحاسبات والمعلومات</option>
                        <option value="pharmacy">كلية الصيدلة</option>
                        <option value="finearts">كلية الفنون الجميلة</option>
                        <option value="tourism">كلية السياحة والفنادق</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">التصنيف والقطاع *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.category}
                        onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="مثال: منتجات زراعية أو منظفات"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">السعر التجاري *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.price}
                        onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="مثال: 150 ج.م"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">شعار التسويق (Tag) (اختياري)</label>
                      <input 
                        type="text" 
                        value={productFormData.tag}
                        onChange={(e) => setProductFormData({...productFormData, tag: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="مثال: الأكثر مبيعاً أو عصر بارد"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">لون الشعار</label>
                      <select 
                        value={productFormData.tagColor}
                        onChange={(e) => setProductFormData({...productFormData, tagColor: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="bg-emerald-600 text-white">أخضر زمردي</option>
                        <option value="bg-amber-500 text-white">ذهبي / برتقالي</option>
                        <option value="bg-blue-600 text-white">أزرق داكن</option>
                        <option value="bg-purple-600 text-white">بنفسجي فني</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">رابط صورة المنتج</label>
                      <input 
                        type="url" 
                        value={productFormData.image}
                        onChange={(e) => setProductFormData({...productFormData, image: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs text-left"
                        dir="ltr"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">تفاصيل ومواصفات المنتج *</label>
                      <textarea 
                        required
                        rows={3}
                        value={productFormData.details}
                        onChange={(e) => setProductFormData({...productFormData, details: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button type="submit" className="flex-1 bg-[#26462C] hover:bg-[#1a301e] text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
                      {exhibitionEditItem ? 'حفظ التعديلات' : 'إضافة للمنتجات'}
                    </button>
                    <button type="button" onClick={() => setIsExhibitionModalOpen(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
                      إلغاء
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add News Modal */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsNewsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl animate-scale-up flex flex-col max-h-[90vh]">
            <div className="bg-[#26462C] text-white p-6 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-black text-[#F4A217]">{editingNewsId ? 'تعديل الخبر' : 'إضافة خبر جديد'}</h2>
              <button 
                onClick={() => setIsNewsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleSaveNews} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الخبر *</label>
                  <input 
                    type="text" 
                    required
                    value={newNewsData.title}
                    onChange={(e) => setNewNewsData({...newNewsData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none"
                    placeholder="اكتب عنوان الخبر هنا"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">محتوى وتفاصيل الخبر *</label>
                  <textarea 
                    required
                    rows={5}
                    value={newNewsData.content}
                    onChange={(e) => setNewNewsData({...newNewsData, content: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none resize-none"
                    placeholder="اكتب تفاصيل الخبر هنا..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رابط صورة الخبر (اختياري)</label>
                  <input 
                    type="text" 
                    value={newNewsData.image_url}
                    onChange={(e) => setNewNewsData({...newNewsData, image_url: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none"
                    placeholder="مثال: https://example.com/image.jpg"
                  />
                  <p className="text-xs text-slate-500 mt-2 font-semibold">إذا تركت هذا الحقل فارغاً، سيتم وضع أيقونة افتراضية.</p>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#26462C] hover:bg-[#1a301e] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm"
                  >
                    {editingNewsId ? 'حفظ التعديلات' : 'نشر الخبر'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsNewsModalOpen(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Job Modal */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsJobModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl animate-scale-up flex flex-col max-h-[90vh]">
            <div className="bg-[#26462C] text-white p-6 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-black text-[#F4A217]">{jobEditItem ? 'تعديل وظيفة' : 'إضافة وظيفة جديدة'}</h2>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-right" dir="rtl">
              <form onSubmit={handleSaveJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">المسمى الوظيفي *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.title}
                      onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="مثال: مهندس برمجيات واجهات أمامية"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">اسم الشركة *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.company}
                      onChange={(e) => setJobFormData({...jobFormData, company: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="مثال: TechVision Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">الموقع الجغرافي *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.location}
                      onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="مثال: القرية الذكية، القاهرة"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">رابط الشعار (اختياري)</label>
                    <input 
                      type="text" 
                      value={jobFormData.logo}
                      onChange={(e) => setJobFormData({...jobFormData, logo: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="مثال: https://example.com/logo.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">نوع الدوام *</label>
                    <select 
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({...jobFormData, type: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-bold text-xs"
                    >
                      <option value="دوام كامل">دوام كامل</option>
                      <option value="دوام جزئي">دوام جزئي</option>
                      <option value="عن بُعد (Remote)">عن بُعد (Remote)</option>
                      <option value="تدريب (Internship)">تدريب (Internship)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">الخبرة المطلوبة *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({...jobFormData, experience: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="مثال: حديث التخرج، 1-3 سنوات"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">تفاصيل وشروط الوظيفة *</label>
                  <textarea 
                    required
                    rows={4}
                    value={jobFormData.details}
                    onChange={(e) => setJobFormData({...jobFormData, details: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs resize-none"
                    placeholder="اكتب متطلبات الوظيفة ووصف الدور بالتفصيل..."
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#26462C] hover:bg-[#1a301e] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {jobEditItem ? 'حفظ التعديلات' : 'إضافة الوظيفة'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
