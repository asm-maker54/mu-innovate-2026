import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Award, BookOpen, Download, Search, CheckCircle, Clock, 
  AlertTriangle, Eye, ArrowLeft, RefreshCw, KeyRound, BarChart2,
  FileText, Briefcase, GraduationCap, Presentation, Newspaper,
  Trash, FileSpreadsheet, Sparkles, ShoppingBag, Plus, Edit, Upload
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

import { initialMockNews } from '../data/mockNews';
const isUUID = (str) => { const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; return regexExp.test(str); };

// Mock Data for Fallback
const mockGraduationProjects = [
  {
    id: "g1111111-1111-1111-1111-111111111111",
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
    id: "g2222222-2222-2222-2222-222222222222",
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
    id: "r1111111-1111-1111-1111-111111111111",
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
    id: "e1111111-1111-1111-1111-111111111111",
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
    id: "e2222222-2222-2222-2222-222222222222",
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
    id: "e3333333-3333-3333-3333-333333333333",
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

// Default admin accounts
const ADMIN_ACCOUNTS = {
  admin: { password: 'admin123', role: 'superAdmin', displayName: 'أدمن القمة الرئيسي', title: 'رئيس لجنة الإشراف العام' },
  academic: { password: 'acad123', role: 'academic', displayName: 'أدمن المشروعات والبحوث', title: 'مسؤول الأكاديمية العلمية' },
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminRole, setAdminRole] = useState('superAdmin');
  const [adminPermissions, setAdminPermissions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const defaultProfile = { name: 'أدمن القمة الرئيسي', title: 'رئيس لجنة الإشراف العام', avatar: '' };
  const [adminProfile, setAdminProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin_profile')) || defaultProfile; }
    catch { return defaultProfile; }
  });
  const [profileForm, setProfileForm] = useState({ name: '', title: '', avatar: '', newPassword: '', currentPassword: '' });
  const [profileSaved, setProfileSaved] = useState(false);
  
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
  const [newNewsData, setNewNewsData] = useState({ title: '', content: '', image_url: '', uploader_name: adminProfile.name });
  const [selectedType, setSelectedType] = useState(null); // 'graduation', 'research', 'registration'
  
  // Custom Admins State
  const [customAdmins, setCustomAdmins] = useState(() => JSON.parse(localStorage.getItem('custom_admins') || '[]'));
  const [adminForm, setAdminForm] = useState({ username: '', password: '', displayName: '', title: '', permissions: [] });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const [editingNewsId, setEditingNewsId] = useState(null);

  // --- Exhibition states for Innovations & Productive Units ---
  const [innovations, setInnovations] = useState([]);
  const [products, setProducts] = useState([]);
  const [isExhibitionModalOpen, setIsExhibitionModalOpen] = useState(false);
  const [exhibitionModalType, setExhibitionModalType] = useState('innovation'); // 'innovation' or 'product'
  const [exhibitionEditItem, setExhibitionEditItem] = useState(null);
  const [hoveredDot, setHoveredDot] = useState(null); // format: `${cardIdx}-${pointIdx}`
  const [hoveredLegendIdx, setHoveredLegendIdx] = useState(null);

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
      console.error("Error saving job:", err);
      if (err.message && (err.message.includes('jobs') || err.message.includes('schema cache') || err.message.includes('relation'))) {
        alert("تنبيه هام: جدول الوظائف (jobs) غير موجود حالياً في قاعدة بيانات Supabase الخاصة بك.\n\nلقد قمنا بحفظ التعديلات محلياً في المتصفح بنجاح لتتمكن من معاينة وتعديل الوظائف فوراً!\n\nلتفعيل الحفظ الدائم سحابياً، يرجى نسخ كود SQL الخاص بالوظائف من الملف:\nscratch/supabase_schema.sql\nوتشغيله في لوحة تحكم Supabase (قسم SQL Editor).");
        
        let updated;
        if (jobEditItem) {
          updated = jobs.map(item => item.id === jobEditItem.id ? { ...item, ...jobFormData } : item);
        } else {
          const newItem = {
            ...jobFormData,
            id: Date.now(),
            created_at: new Date().toISOString()
          };
          updated = [newItem, ...jobs];
        }
        setJobs(updated);
        localStorage.setItem('local_jobs', JSON.stringify(updated));
        
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
      } else {
        alert("حدث خطأ أثناء حفظ الوظيفة: " + err.message);
      }
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

  const handleNewsImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 1024 * 1024) {
      alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 1 ميجابايت لضمان سرعة التحميل.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewNewsData(prev => ({ ...prev, image_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    if (!newNewsData.title || !newNewsData.content) return;
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        if (editingNewsId) {
          const { error } = await supabase
            .from('news')
            .update({
              title: newNewsData.title,
              content: newNewsData.content,
              image_url: newNewsData.image_url,
              uploader_name: newNewsData.uploader_name
            })
            .eq('id', isUUID(editingNewsId) ? editingNewsId : Number(editingNewsId));
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('news')
            .insert([{
              title: newNewsData.title,
              content: newNewsData.content,
              image_url: newNewsData.image_url,
              uploader_name: newNewsData.uploader_name
            }]);
          if (error) throw error;
        }
      }

      // Sync state & local storage fallback
      let updated;
      if (editingNewsId) {
        updated = newsList.map(news => news.id === editingNewsId ? { ...news, ...newNewsData } : news);
      } else {
        const newNews = {
          ...newNewsData,
          id: isSupabaseConfigured ? undefined : Date.now().toString(),
          created_at: new Date().toISOString()
        };
        updated = isSupabaseConfigured ? newsList : [newNews, ...newsList];
      }

      if (!isSupabaseConfigured) {
        setNewsList(updated);
        localStorage.setItem('local_news', JSON.stringify(updated));
      } else {
        // Re-fetch news from database
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error) setNewsList(data || []);
      }

      setIsNewsModalOpen(false);
      setEditingNewsId(null);
      setNewNewsData({ title: '', content: '', image_url: '', uploader_name: adminProfile.name });
    } catch (err) {
      console.error("Error saving news:", err);
      if (err.message && (err.message.includes('news') || err.message.includes('schema cache') || err.message.includes('relation'))) {
        alert("تنبيه هام: جدول الأخبار (news) غير موجود حالياً في قاعدة بيانات Supabase الخاصة بك.\n\nلقد قمنا بحفظ التعديلات محلياً في المتصفح بنجاح لتتمكن من معاينة وتعديل الأخبار فوراً!\n\nلتفعيل الحفظ الدائم سحابياً، يرجى نسخ كود SQL الموجود في الملف:\nscratch/supabase_news_schema.sql\nوتشغيله في لوحة تحكم Supabase (قسم SQL Editor).");
        
        let updated;
        if (editingNewsId) {
          updated = newsList.map(news => news.id === editingNewsId ? { ...news, ...newNewsData } : news);
        } else {
          const newNews = {
            ...newNewsData,
            id: Date.now().toString(),
            created_at: new Date().toISOString()
          };
          updated = [newNews, ...newsList];
        }
        setNewsList(updated);
        localStorage.setItem('local_news', JSON.stringify(updated));
        
        setIsNewsModalOpen(false);
        setEditingNewsId(null);
        setNewNewsData({ title: '', content: '', image_url: '', uploader_name: adminProfile.name });
      } else {
        alert("حدث خطأ أثناء حفظ الخبر: " + err.message);
      }
    } finally {
      setLoading(false);
    }
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

  const handleDeleteNews = async (id) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الخبر نهائياً؟')) {
      setLoading(true);
      try {
        if (isSupabaseConfigured) {
          const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', id);
          if (error) throw error;
        }

        const updated = newsList.filter(news => news.id !== id);
        setNewsList(updated);
        if (!isSupabaseConfigured) {
          localStorage.setItem('local_news', JSON.stringify(updated));
        } else {
          // Re-fetch news
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error) setNewsList(data || []);
        }
      } catch (err) {
        alert("حدث خطأ أثناء حذف الخبر: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Check if already authenticated via session
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      const usernameKey = sessionStorage.getItem('adminUsername');
      if (usernameKey) {
        let account = ADMIN_ACCOUNTS[usernameKey];
        if (!account) {
          const customAdmins = JSON.parse(localStorage.getItem('custom_admins') || '[]');
          const found = customAdmins.find(a => a.username.toLowerCase() === usernameKey);
          if (found) account = { ...found, role: 'custom_admin' };
        }
        if (account) {
          setAdminRole(account.role);
          if (account.role === 'superAdmin') {
            setAdminPermissions(['overview', 'projects', 'research', 'jobs', 'news', 'registrations', 'admins', 'profile']);
          } else if (account.role === 'academic') {
            setAdminPermissions(['overview', 'projects', 'research', 'registrations', 'profile']);
          } else {
            setAdminPermissions(account.permissions || []);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameKey = username.trim().toLowerCase();
    
    let account = ADMIN_ACCOUNTS[usernameKey];
    if (!account) {
      const customAdmins = JSON.parse(localStorage.getItem('custom_admins') || '[]');
      const found = customAdmins.find(a => a.username.toLowerCase() === usernameKey);
      if (found) account = { ...found, role: 'custom_admin' };
    }

    if (account) {
      const savedPw = localStorage.getItem('admin_password_' + usernameKey);
      const validPassword = savedPw || account.password;
      
      // If user types the valid saved password OR the master original password (in case they forgot what they changed it to)
      if (password === validPassword || password === account.password) {
        setIsAuthenticated(true);
        setAdminRole(account.role);
        
        if (account.role === 'superAdmin') {
          setAdminPermissions(['overview', 'graduation', 'research', 'news', 'jobs', 'exhibition_innovations', 'exhibition_products', 'speakers', 'startups', 'investors', 'mentors', 'researchers', 'partners', 'volunteers', 'profile', 'admins']);
        } else if (account.role === 'academic') {
          setAdminPermissions(['overview', 'graduation', 'research', 'researchers', 'profile']);
        } else {
          setAdminPermissions(account.permissions || []);
        }

        const savedProfile = localStorage.getItem('admin_profile_' + usernameKey);
        const loadedProfile = savedProfile ? JSON.parse(savedProfile) : { name: account.displayName, title: account.title, avatar: account.avatar || '' };
        setAdminProfile(loadedProfile);
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        sessionStorage.setItem('adminUsername', usernameKey);
        setLoginError('');
        return;
      }
    }
    setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminRole('superAdmin');
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminUsername');
  };

  const handleSaveAdmin = (e) => {
    e.preventDefault();
    if (!adminForm.username || !adminForm.password) return alert('يرجى إدخال اسم المستخدم وكلمة المرور');
    const existing = customAdmins.find(a => a.username.toLowerCase() === adminForm.username.toLowerCase()) || ADMIN_ACCOUNTS[adminForm.username.toLowerCase()];
    if (existing) return alert('اسم المستخدم مسجل مسبقاً!');
    
    const newAdmin = { ...adminForm, id: Date.now().toString() };
    const updated = [...customAdmins, newAdmin];
    setCustomAdmins(updated);
    localStorage.setItem('custom_admins', JSON.stringify(updated));
    setAdminForm({ username: '', password: '', displayName: '', title: '', permissions: [] });
    alert('تم إنشاء حساب الإدارة بنجاح!');
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحساب نهائياً؟')) {
      const updated = customAdmins.filter(a => a.id !== id);
      setCustomAdmins(updated);
      localStorage.setItem('custom_admins', JSON.stringify(updated));
    }
  };

  const togglePermission = (permId) => {
    setAdminForm(prev => {
      const perms = prev.permissions;
      if (perms.includes(permId)) return { ...prev, permissions: perms.filter(p => p !== permId) };
      return { ...prev, permissions: [...perms, permId] };
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة (JPG, PNG, GIF).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setProfileForm({ ...profileForm, avatar: dataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const usernameKey = sessionStorage.getItem('adminUsername') || 'admin';
    const account = ADMIN_ACCOUNTS[usernameKey];
    const savedPw = localStorage.getItem('admin_password_' + usernameKey) || account?.password;
    if (profileForm.currentPassword && profileForm.currentPassword !== savedPw) {
      alert('كلمة المرور الحالية غير صحيحة!');
      return;
    }
    const updated = {
      name: profileForm.name || adminProfile.name,
      title: profileForm.title || adminProfile.title,
      avatar: profileForm.avatar || adminProfile.avatar
    };
    setAdminProfile(updated);
    localStorage.setItem('admin_profile_' + usernameKey, JSON.stringify(updated));
    if (profileForm.newPassword && profileForm.newPassword.length >= 6) {
      localStorage.setItem('admin_password_' + usernameKey, profileForm.newPassword);
    }
    setProfileForm({ name: '', title: '', avatar: '', newPassword: '', currentPassword: '' });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
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
        if (gErr) console.error("Graduation projects error:", gErr);
        setGradProjects(gData || []);

        // Fetch Applied Research
        const { data: rData, error: rErr } = await supabase
          .from('applied_research')
          .select('*')
          .order('created_at', { ascending: false });
        if (rErr) console.error("Applied research error:", rErr);
        setAppliedResearch(rData || []);

        // Fetch Registrations
        const { data: regData, error: regErr } = await supabase
          .from('registrations')
          .select('*')
          .order('created_at', { ascending: false });
        if (regErr) console.error("Registrations error:", regErr);
        setRegistrants(regData || []);

        // Fetch Jobs
        let jobsResult = [];
        const { data: jData, error: jErr } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!jErr) {
          if (jData && jData.length > 0) {
            jobsResult = jData;
          } else {
            // Seed default jobs
            const defaultJobsToSeed = [
              {
                title: 'مهندس برمجيات واجهات أمامية (Frontend)',
                company: 'TechVision Solutions',
                location: 'القرية الذكية، القاهرة',
                type: 'دوام كامل',
                experience: '1-3 سنوات',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
                details: 'تطوير وتصميم واجهات وتطبيقات الويب باستخدام React.js و TailwindCSS.'
              },
              {
                title: 'أخصائي تسويق إلكتروني',
                company: 'Global Media',
                location: 'عن بُعد (Remote)',
                type: 'دوام كامل',
                experience: 'حديث التخرج',
                logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200',
                details: 'إدارة حملات التواصل الاجتماعي وجوجل أدز وتهيئة محركات البحث.'
              },
              {
                title: 'محلل بيانات',
                company: 'Data Insights',
                location: 'المعادي، القاهرة',
                type: 'دوام جزئي',
                experience: '0-2 سنوات',
                logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
                details: 'تحليل البيانات واستخراج التقارير وتصميم لوحات عرض البيانات Power BI.'
              },
              {
                title: 'مهندس جودة برمجيات (QA)',
                company: 'SoftCore',
                location: 'المنيا الجديدة',
                type: 'دوام كامل',
                experience: '2+ سنوات',
                logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200',
                details: 'اختبار البرمجيات وتحديد الأخطاء وإعداد التقارير الفنية وعمل أتمتة للاختبارات.'
              }
            ];
            const { data: seededJobs, error: seedJobsErr } = await supabase
              .from('jobs')
              .insert(defaultJobsToSeed)
              .select();
            if (!seedJobsErr && seededJobs) {
              jobsResult = seededJobs;
            } else {
              console.error("Error seeding default jobs:", seedJobsErr);
              jobsResult = [];
            }
          }
          setJobs(jobsResult);
        } else {
          console.error("Error fetching jobs from supabase:", jErr);
        }

        // Fetch News
        let newsResult = [];
        const { data: nData, error: nErr } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });
        if (!nErr) {
          if (nData && nData.length > 0) {
            newsResult = nData;
          } else {
            // Seed initial mock news
            const newsToSeed = initialMockNews.map(n => ({
              title: n.title,
              content: n.content,
              image_url: n.image_url,
              uploader_name: n.uploader_name
            }));
            const { data: seededNews, error: seedNewsErr } = await supabase
              .from('news')
              .insert(newsToSeed)
              .select();
            if (!seedNewsErr && seededNews) {
              newsResult = seededNews;
            } else {
              console.error("Error seeding default news:", seedNewsErr);
              newsResult = initialMockNews;
            }
          }
          setNewsList(newsResult);
        } else {
          console.error("Error fetching news from supabase:", nErr);
          setNewsList(initialMockNews);
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

        // News local fallback
        const localNews = JSON.parse(localStorage.getItem('local_news') || '[]');
        if (!localStorage.getItem('local_news')) {
          localStorage.setItem('local_news', JSON.stringify(initialMockNews));
          setNewsList(initialMockNews);
        } else {
          setNewsList(localNews);
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
            rating: '4.6 (950)', tag: 'مطهر آمن', tagColor: 'bg-blue-700 text-white',
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
      <div className="min-h-screen flex bg-slate-50 font-['Cairo']" dir="rtl">
        {/* Right Side - Branding & Graphics */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#1E3A8A] overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] z-0"></div>
          {/* Abstract circles */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#F4A217]/20 blur-[80px] z-0"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] z-0"></div>
          
          <div className="relative z-10 text-center px-12 animate-fade-in">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <GraduationCap className="w-12 h-12 text-[#F4A217]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              قمة جامعة المنيا <br />
              <span className="text-[#F4A217]">لريادة الأعمال 2026</span>
            </h1>
            <p className="text-blue-200 text-lg font-semibold max-w-md mx-auto leading-relaxed">
              بوابتك لإدارة ومتابعة كافة فعاليات القمة، التحكم في المشروعات، المبتكرين، الشركات الناشئة، والمزيد..
            </p>
          </div>
          
          {/* Decorative grid */}
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>

        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="absolute inset-0 bg-slate-50 z-0"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 pointer-events-none"></div>

          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-10 lg:hidden">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <GraduationCap className="w-8 h-8 text-[#F4A217]" />
              </div>
              <h2 className="text-2xl font-black text-slate-800">قمة جامعة المنيا 2026</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 relative overflow-hidden">
              {/* Decorative corner inside form */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A217]/5 rounded-bl-[100px] z-0 pointer-events-none"></div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-black text-slate-800 mb-2">تسجيل الدخول الآمن</h3>
                <p className="text-sm font-bold text-slate-500">مرحباً بك مجدداً، يرجى إدخال بيانات الدخول الخاصة بك.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">اسم المستخدم</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin أو academic"
                      className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2">كلمة المرور</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono tracking-wider focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                      dir="ltr"
                      required
                    />
                  </div>
                  {loginError && (
                    <div className="mt-3 bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2 border border-red-100 animate-fade-in">
                      <span className="text-lg leading-none">⚠️</span>
                      <p className="text-xs font-bold pt-0.5">{loginError}</p>
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#1E3A8A] hover:bg-[#152C69] text-white py-4 rounded-xl font-black text-base shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all duration-300 mt-2"
                >
                  الدخول للوحة التحكم
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                <p className="text-xs font-bold text-slate-400 text-center mb-3">حسابات الإدارة الرئيسية المتاحة:</p>
                <div className="flex flex-col gap-2">
                  <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center text-[11px] font-bold border border-slate-100">
                    <span className="text-slate-500">المشرف الرئيسي:</span>
                    <span className="text-[#1E3A8A] bg-blue-100/50 px-2 py-1 rounded tracking-wide">admin / admin123</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center text-[11px] font-bold border border-slate-100">
                    <span className="text-slate-500">الإدارة الأكاديمية:</span>
                    <span className="text-[#1E3A8A] bg-blue-100/50 px-2 py-1 rounded tracking-wide">academic / acad123</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-slate-400 text-xs font-bold mt-8">
              &copy; 2026 قمة جامعة المنيا. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E3A8A]/80 to-[#0F172A] px-4 relative overflow-hidden" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F4A217]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/15 p-8 md:p-10 relative z-10">
          <div className="w-20 h-20 bg-[#F4A217]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 relative group border border-[#F4A217]/20">
            <div className="absolute inset-0 bg-[#F4A217]/10 rounded-3xl animate-pulse"></div>
            <KeyRound className="w-10 h-10 text-[#F4A217] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-center text-white mb-1 tracking-tight">لوحة الإدارة - القمة 2026</h2>
          <p className="text-xs font-bold text-blue-200/70 text-center mb-8">يرجى إدخال بيانات حسابك للوصول الآمن للوحة التحكم</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-blue-100/80 mb-2">اسم المستخدم *</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin أو academic"
                className="w-full border border-white/20 bg-white/10 rounded-xl p-3.5 text-white placeholder-blue-300/50 focus:bg-white/15 focus:ring-2 focus:ring-[#F4A217] focus:border-[#F4A217]/50 outline-none transition-all duration-300 font-bold text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-blue-100/80 mb-2">كلمة المرور *</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-white/20 bg-white/10 rounded-xl p-3.5 text-white placeholder-blue-300/50 focus:bg-white/15 focus:ring-2 focus:ring-[#F4A217] focus:border-[#F4A217]/50 font-mono text-center text-lg outline-none transition-all duration-300"
                required
              />
              {loginError && <p className="text-red-300 text-xs font-bold mt-2.5 text-center bg-red-500/10 rounded-lg p-2">{loginError}</p>}
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-[#F4A217] to-amber-500 hover:from-amber-500 hover:to-[#F4A217] text-[#0F172A] py-3.5 rounded-xl font-black text-base shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2">
              <span>تسجيل الدخول الآمن</span>
            </button>

            <div className="pt-3 border-t border-white/10 text-center">
              <p className="text-[11px] text-blue-200/50 font-bold">حسابات الدخول المتاحة:</p>
              <p className="text-[11px] text-blue-200/40 mt-1">super admin: admin / admin123 &nbsp;|&nbsp; academic: academic / acad123</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      
      {/* 1. RIGHT SIDEBAR (Navigation) */}
      <div className="w-72 bg-[#1E3A8A] text-white flex flex-col shrink-0 border-l border-slate-100/10 h-screen sticky top-0 overflow-y-auto z-30">
        {/* Logo and Summit Info */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-black/20">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7 text-[#F4A217]" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-tight">قمة جامعة المنيا</h2>
            <span className="text-[10px] text-blue-200/70 font-bold block mt-0.5">لوحة التحكم والمتابعة 2026</span>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#F4A217]/20 border-2 border-[#F4A217]/30 flex items-center justify-center shrink-0">
              {adminProfile.avatar ? (
                <img src={adminProfile.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#F4A217] font-black text-lg">{(adminProfile.name || 'A').charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-white truncate">{adminProfile.name}</p>
              <p className="text-[10px] text-blue-200/60 font-semibold truncate">{adminProfile.title}</p>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full mt-0.5 inline-block ${adminRole === 'superAdmin' ? 'bg-[#F4A217]/20 text-[#F4A217]' : 'bg-blue-400/20 text-blue-200'}`}>
                {adminRole === 'superAdmin' ? 'مسؤول رئيسي' : 'أدمن أكاديمي'}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', label: 'نظرة عامة', count: null, icon: BarChart2 },
            { id: 'graduation', label: 'مشروعات التخرج', count: stats.totalGP, icon: GraduationCap },
            { id: 'research', label: 'البحوث التطبيقية', count: stats.totalAR, icon: BookOpen },
            { id: 'news', label: 'الأخبار الإعلانية', count: newsList.length, icon: Newspaper },
            { id: 'jobs', label: 'وظائف الملتقى', count: jobs.length, icon: Briefcase },
            { id: 'exhibition_innovations', label: 'معرض الابتكارات', count: innovations.length, icon: Sparkles },
            { id: 'exhibition_products', label: 'معرض الوحدات', count: products.length, icon: ShoppingBag },
            { id: 'speakers', label: 'المتحدثون والمدربون', count: stats.totalSpeakers, icon: Presentation },
            { id: 'startups', label: 'الشركات الناشئة', count: stats.totalStartups, icon: Briefcase },
            { id: 'investors', label: 'المستثمرون للتمويل', count: stats.totalInvestors, icon: Users },
            { id: 'mentors', label: 'الموجهون والإرشاد', count: stats.totalMentors, icon: Users },
            { id: 'researchers', label: 'الباحثون / المبتكرون', count: stats.totalResearchers, icon: BookOpen },
            { id: 'partners', label: 'الشركاء والجهات الراعية', count: stats.totalPartners, icon: Users },
            { id: 'volunteers', label: 'لجان التطوع والتنظيم', count: stats.totalVolunteers, icon: Users },
            { id: 'admins', label: 'إدارة الصلاحيات', count: null, icon: KeyRound },
            { id: 'profile', label: 'الملف الشخصي', count: null, icon: Users },
          ].filter(tab => adminPermissions.includes(tab.id)).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 group cursor-pointer ${activeTab === tab.id ? 'bg-gradient-to-r from-[#F4A217] to-amber-500 text-[#1E3A8A] shadow-lg shadow-amber-500/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
            >
              <div className="flex items-center gap-2.5">
                <tab.icon className={`w-4 h-4 shrink-0 transition-colors ${activeTab === tab.id ? 'text-[#1E3A8A]' : 'text-blue-300/60 group-hover:text-white'}`} />
                <span>{tab.label}</span>
              </div>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-black ${activeTab === tab.id ? 'bg-[#1E3A8A] text-white' : 'bg-white/10 text-slate-300'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer: logout */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-2">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 rounded-xl font-bold text-xs transition-all cursor-pointer border border-red-500/20"
          >
            <span>تسجيل الخروج</span>
          </button>
          <div className="flex items-center gap-2 text-[10px] text-blue-300/40 font-bold px-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
            </span>
            <span>رقم الإصدار: v1.1.0 - 2026</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header bar inside workspace */}
        <header className="bg-white border-b border-slate-100 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 sticky top-0 z-20 shadow-sm">
          {/* Right Header: Search Bar */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="البحث الفوري بالاسم، الكلية، البريد الإلكتروني..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pr-11 pl-4 py-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none shadow-inner transition-all duration-300"
            />
          </div>

          {/* Left Header: Status Pulse and Logout */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            {isSupabaseConfigured ? (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-blue-200/60 text-blue-700 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>قاعدة البيانات نشطة</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>وضع المعاينة المحلية</span>
              </div>
            )}

            <button onClick={fetchData} className="p-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95" title="تحديث البيانات">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button onClick={handleLogout} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95 border border-red-100">
              خروج
            </button>
          </div>
        </header>

        {/* Content Body Grid */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {loading ? (
            <div className="py-20 text-center text-slate-500 font-bold flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#1E3A8A]" />
              <span>جاري تحميل البيانات...</span>
            </div>
          ) : (
            <>
              {/* ===== ADMINS MANAGEMENT TAB ===== */}
              {activeTab === 'admins' && adminRole === 'superAdmin' && (
                <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
                  <div className="mb-2">
                    <h3 className="text-2xl font-black text-slate-800">إدارة الصلاحيات وحسابات المديرين</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1">إنشاء مدراء فرعيين وتحديد أقسام لوحة التحكم المسموح لهم بالوصول إليها.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Add Admin Form */}
                    <div className="lg:col-span-1">
                      <form onSubmit={handleSaveAdmin} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
                        <h4 className="font-black text-slate-800 text-sm border-b border-slate-100 pb-3">إضافة مدير جديد</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2">اسم المستخدم (للدخول) *</label>
                            <input type="text" required value={adminForm.username} onChange={e => setAdminForm({...adminForm, username: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] outline-none text-xs font-semibold" placeholder="مثال: hr_admin" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2">كلمة المرور *</label>
                            <input type="password" required value={adminForm.password} onChange={e => setAdminForm({...adminForm, password: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] outline-none text-xs font-semibold" placeholder="••••••••" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2">الاسم الظاهر</label>
                            <input type="text" value={adminForm.displayName} onChange={e => setAdminForm({...adminForm, displayName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] outline-none text-xs font-semibold" placeholder="أدمن التوظيف" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2">المسمى الوظيفي</label>
                            <input type="text" value={adminForm.title} onChange={e => setAdminForm({...adminForm, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] outline-none text-xs font-semibold" placeholder="مسؤول قسم الموارد البشرية" />
                          </div>
                          
                          <div className="pt-2 border-t border-slate-100">
                            <label className="block text-xs font-black text-slate-800 mb-3">الصلاحيات (تحديد التبويبات المسموحة)</label>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {[
                                { id: 'overview', label: 'نظرة عامة' },
                                { id: 'graduation', label: 'مشاريع التخرج' },
                                { id: 'research', label: 'البحوث التطبيقية' },
                                { id: 'news', label: 'الأخبار' },
                                { id: 'jobs', label: 'الوظائف' },
                                { id: 'exhibition_innovations', label: 'معرض الابتكارات' },
                                { id: 'exhibition_products', label: 'معرض الوحدات' },
                                { id: 'speakers', label: 'المتحدثون' },
                                { id: 'startups', label: 'الشركات الناشئة' },
                                { id: 'investors', label: 'المستثمرون' },
                                { id: 'mentors', label: 'الموجهون' },
                                { id: 'researchers', label: 'الباحثون' },
                                { id: 'partners', label: 'الشركاء' },
                                { id: 'volunteers', label: 'المتطوعون' },
                                { id: 'profile', label: 'الملف الشخصي' },
                              ].map(perm => (
                                <label key={perm.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded-lg">
                                  <input 
                                    type="checkbox" 
                                    checked={adminForm.permissions.includes(perm.id)}
                                    onChange={() => togglePermission(perm.id)}
                                    className="w-4 h-4 rounded text-[#1E3A8A] focus:ring-[#1E3A8A]"
                                  />
                                  <span className="text-xs font-bold text-slate-600">{perm.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="w-full py-3 bg-[#1E3A8A] hover:bg-[#152C69] text-white rounded-xl font-black text-sm transition-colors shadow-md shadow-blue-900/20">
                          إنشاء الحساب الإداري
                        </button>
                      </form>
                    </div>

                    {/* Admins List */}
                    <div className="lg:col-span-2 space-y-4">
                      {customAdmins.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center">
                          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                            <KeyRound className="w-8 h-8 text-slate-300" />
                          </div>
                          <h4 className="text-sm font-black text-slate-500">لا يوجد حسابات فرعية حالياً</h4>
                          <p className="text-xs font-bold text-slate-400 mt-2">استخدم النموذج لإضافة حسابات للمشرفين الآخرين.</p>
                        </div>
                      ) : (
                        customAdmins.map(admin => (
                          <div key={admin.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shrink-0">
                                {admin.displayName ? admin.displayName.charAt(0) : admin.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h5 className="font-black text-slate-800 text-sm flex items-center gap-2">
                                  {admin.displayName || admin.username}
                                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">@{admin.username}</span>
                                </h5>
                                <p className="text-[11px] font-bold text-slate-400 mt-1">{admin.title || 'بدون مسمى وظيفي'}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {admin.permissions.slice(0, 5).map(p => (
                                    <span key={p} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black">{p}</span>
                                  ))}
                                  {admin.permissions.length > 5 && (
                                    <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-black">+{admin.permissions.length - 5} أكثر</span>
                                  )}
                                  {admin.permissions.length === 0 && (
                                    <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded text-[9px] font-black">بدون صلاحيات مقيدة</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button onClick={() => handleDeleteAdmin(admin.id)} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-xs transition-colors shrink-0">
                              حذف الحساب
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ===== PROFILE TAB ===== */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                  <div className="mb-2">
                    <h3 className="text-2xl font-black text-slate-800">الملف الشخصي للمسؤول</h3>
                    <p className="text-sm text-slate-500 font-semibold mt-1">تعديل بيانات حسابك الشخصية. سيظهر اسمك عند رفع الأخبار والوظائف.</p>
                  </div>

                  {profileSaved && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl px-5 py-3 font-bold text-sm flex items-center gap-2">
                      <span>✓</span> تم حفظ الملف الشخصي بنجاح!
                    </div>
                  )}

                  {/* Avatar Card */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                    <h4 className="font-black text-slate-800 text-sm mb-4">الصورة الشخصية</h4>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl overflow-hidden bg-[#1E3A8A]/10 border-2 border-[#1E3A8A]/20 flex items-center justify-center shrink-0">
                        {(profileForm.avatar || adminProfile.avatar) ? (
                          <img src={profileForm.avatar || adminProfile.avatar} alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
                        ) : (
                          <span className="text-[#1E3A8A] font-black text-3xl">{(adminProfile.name || 'A').charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl border border-blue-200 cursor-pointer transition-colors font-bold text-sm">
                            <Upload className="w-4 h-4" />
                            <span>رفع صورة من الجهاز</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarUpload}
                            />
                          </label>
                          <p className="text-[11px] text-slate-400 mt-1 font-semibold text-center">يتم تصغير الصورة تلقائياً لتناسب القائمة (حجم أقصى 300 بكسل).</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-px bg-slate-100 flex-1"></div>
                          <span className="text-[10px] font-bold text-slate-400">أو</span>
                          <div className="h-px bg-slate-100 flex-1"></div>
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="لصق رابط الصورة الشخصية (URL)"
                            value={profileForm.avatar}
                            onChange={e => setProfileForm({...profileForm, avatar: e.target.value})}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info & Password Form */}
                  <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
                    <h4 className="font-black text-slate-800 text-sm">معلومات الحساب</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">الاسم الظاهر *</label>
                        <input
                          type="text"
                          placeholder={adminProfile.name}
                          value={profileForm.name}
                          onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">المسمى الوظيفي</label>
                        <input
                          type="text"
                          placeholder={adminProfile.title}
                          value={profileForm.title}
                          onChange={e => setProfileForm({...profileForm, title: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="font-black text-slate-800 text-sm mb-4">تغيير كلمة المرور</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2">كلمة المرور الحالية</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={profileForm.currentPassword}
                            onChange={e => setProfileForm({...profileForm, currentPassword: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2">كلمة المرور الجديدة (6 أحرف+)</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={profileForm.newPassword}
                            onChange={e => setProfileForm({...profileForm, newPassword: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none font-mono"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 font-semibold">اتركهما فارغتين إذا لم تريد تغيير كلمة المرور</p>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-900 to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-blue-900 text-white py-3 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        حفظ التعديلات
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfileForm({ name: '', title: '', avatar: '', newPassword: '', currentPassword: '' })}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all cursor-pointer"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>

                  {/* Current credentials info */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h4 className="font-black text-blue-900 text-sm mb-3">معلومات الحساب الحالية</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><span className="font-bold text-slate-500 w-32">الاسم الظاهر:</span><span className="font-black text-slate-800">{adminProfile.name}</span></div>
                      <div className="flex items-center gap-2"><span className="font-bold text-slate-500 w-32">المسمى الوظيفي:</span><span className="font-semibold text-slate-700">{adminProfile.title}</span></div>
                      <div className="flex items-center gap-2"><span className="font-bold text-slate-500 w-32">نوع الصلاحية:</span><span className={`font-black px-2 py-0.5 rounded-lg text-xs ${adminRole === 'superAdmin' ? 'bg-[#1E3A8A]/10 text-[#1E3A8A]' : 'bg-blue-100 text-blue-700'}`}>{adminRole === 'superAdmin' ? 'مسؤول رئيسي (Super Admin)' : 'أدمن أكاديمي (Academic)'}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'overview' ? (
                /* --- OVERVIEW GRID VIEW --- */
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fade-in">
                  
                  {/* Center Panel (9 columns) */}
                  <div className="xl:col-span-9 space-y-8">
                    
                    {/* 1. Hero Banner */}
                    <div className="bg-gradient-to-r from-blue-900 to-[#1E3A8A] text-white p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
                      {/* Floating decorative elements */}
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F4A217]/10 rounded-full blur-[80px] pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10 text-center md:text-right">
                        <span className="inline-block bg-[#F4A217]/25 text-[#F4A217] border border-[#F4A217]/20 px-4 py-1.5 rounded-full text-xs font-black">
                          قمة جامعة المنيا للابتكار وريادة الأعمال 2026
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">يومك سعيد، يا مسؤول القمة!</h2>
                        <p className="text-slate-200 text-sm max-w-lg leading-relaxed font-semibold">متابعة كافة طلبات المبتكرين والباحثين، وإدارة معارض الابتكار وجدول الفعاليات بنجاح.</p>
                      </div>
                      
                      {/* Illustration/Icon Container */}
                      <div className="relative shrink-0 w-40 h-40 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl group">
                        <div className="absolute inset-0 bg-[#F4A217]/5 rounded-[2rem] animate-pulse"></div>
                        <GraduationCap className="w-20 h-20 text-[#F4A217] group-hover:rotate-12 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* 2. Sparkline Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'مشروعات التخرج', value: stats.totalGP, label: 'مشروع مضاف', color: 'text-blue-700', bg: 'bg-emerald-50', svgColor: 'text-emerald-600', percent: '+14%' },
                        { title: 'البحوث التطبيقية', value: stats.totalAR, label: 'بحث تطبيقي', color: 'text-[#1E3A8A]', bg: 'bg-[#1E3A8A]/10', svgColor: 'text-[#1E3A8A]', percent: '+8%' },
                        { title: 'ابتكارات المعرض', value: innovations.length, label: 'ابتكار تقني', color: 'text-[#F4A217]', bg: 'bg-[#F4A217]/10', svgColor: 'text-[#F4A217]', percent: '+22%' },
                        { title: 'وظائف وشواغر', value: jobs.length, label: 'وظيفة شاغرة', color: 'text-amber-600', bg: 'bg-amber-50', svgColor: 'text-amber-500', percent: '+18%' }
                      ].map((card, idx) => {
                        const cardVal = card.value || 0;
                        const p1 = Math.round(cardVal * 0.2);
                        const p2 = Math.round(cardVal * 0.5);
                        const p3 = Math.round(cardVal * 0.85);
                        const p4 = cardVal;
                        const points = [p1, p2, p3, p4];
                        const maxVal = Math.max(...points, 1);
                        const x_coords = [10, 36, 62, 88];
                        const pts = points.map((v, pIdx) => ({
                          x: x_coords[pIdx],
                          y: 30 - 5 - (v / maxVal) * 20,
                          val: v
                        }));

                        return (
                          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <span className="text-xs font-bold text-slate-400 block mb-1">{card.title}</span>
                                <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{card.value}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${card.bg} ${card.color}`}>
                                {card.percent}
                              </span>
                            </div>
                            <div className="flex items-end justify-between mt-2">
                              <span className="text-[10px] font-bold text-slate-400">
                                {hoveredDot && hoveredDot.startsWith(`${idx}-`) ? (
                                  <span className="text-slate-600 font-bold transition-all">
                                    {hoveredDot.split('-')[1] === '0' ? 'الأسبوع 1: ' :
                                     hoveredDot.split('-')[1] === '1' ? 'الأسبوع 2: ' :
                                     hoveredDot.split('-')[1] === '2' ? 'الأسبوع 3: ' : 'الحالي: '}
                                    <strong className="text-[#1E3A8A] font-black">{pts[parseInt(hoveredDot.split('-')[1])].val}</strong>
                                  </span>
                                ) : (
                                  card.label
                                )}
                              </span>
                              <div className="w-20 h-8 relative">
                                <svg className={`w-full h-full ${card.svgColor} overflow-visible`} viewBox="0 0 100 30">
                                  <path 
                                    d={`M ${pts[0].x},${pts[0].y} C ${(pts[0].x+pts[1].x)/2},${pts[0].y} ${(pts[0].x+pts[1].x)/2},${pts[1].y} ${pts[1].x},${pts[1].y} C ${(pts[1].x+pts[2].x)/2},${pts[1].y} ${(pts[1].x+pts[2].x)/2},${pts[2].y} ${pts[2].x},${pts[2].y} C ${(pts[2].x+pts[3].x)/2},${pts[2].y} ${(pts[2].x+pts[3].x)/2},${pts[3].y} ${pts[3].x},${pts[3].y}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                  />
                                  {pts.map((pt, pIdx) => (
                                    <circle
                                      key={pIdx}
                                      cx={pt.x}
                                      cy={pt.y}
                                      r={hoveredDot === `${idx}-${pIdx}` ? "4.5" : "2"}
                                      className="fill-white stroke-2 cursor-pointer transition-all duration-200"
                                      stroke="currentColor"
                                      onMouseEnter={() => setHoveredDot(`${idx}-${pIdx}`)}
                                      onMouseLeave={() => setHoveredDot(null)}
                                    />
                                  ))}
                                </svg>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 3. Double Charts: Circular Progress + Plans Done Progress Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Chart Left: Circular progress check */}
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col justify-between h-[300px]">
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-black text-slate-800 text-lg">فحص ومراجعة الطلبات</h4>
                          <span className="text-xs font-bold text-[#1E3A8A] bg-[#1E3A8A]/10 px-3 py-1 rounded-full">تحديث فوري</span>
                        </div>
                        <div className="flex items-center justify-around gap-6">
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="72" cy="72" r="56" className="text-slate-50" strokeWidth="12" stroke="currentColor" fill="transparent" />
                              <circle
                                cx="72"
                                cy="72"
                                r="56"
                                className={`${
                                  hoveredLegendIdx === 0 ? 'text-amber-500' :
                                  hoveredLegendIdx === 1 ? 'text-yellow-500' : 'text-[#1E3A8A]'
                                } transition-all duration-500 ease-out`}
                                strokeWidth="12"
                                strokeDasharray={2 * Math.PI * 56}
                                strokeDashoffset={2 * Math.PI * 56 * (1 - (
                                  hoveredLegendIdx === 0 ? 0.75 :
                                  hoveredLegendIdx === 1 ? 0.88 :
                                  hoveredLegendIdx === 2 ? 0.60 : 0.92
                                ))}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-3xl font-black text-slate-800 transition-all duration-300">
                                {hoveredLegendIdx === 0 ? '75%' :
                                 hoveredLegendIdx === 1 ? '88%' :
                                 hoveredLegendIdx === 2 ? '60%' : '92%'}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 transition-all duration-300">
                                {hoveredLegendIdx === 0 ? 'متحدث مقبول' :
                                 hoveredLegendIdx === 1 ? 'شركة مقبولة' :
                                 hoveredLegendIdx === 2 ? 'مستثمر مقبول' : 'تحت الفحص'}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3 font-semibold text-sm text-slate-600">
                            <div 
                              className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors group"
                              onMouseEnter={() => setHoveredLegendIdx(0)}
                              onMouseLeave={() => setHoveredLegendIdx(null)}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform"></span> 
                              <span>المتحدثون: {stats.totalSpeakers}</span>
                            </div>
                            <div 
                              className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors group"
                              onMouseEnter={() => setHoveredLegendIdx(1)}
                              onMouseLeave={() => setHoveredLegendIdx(null)}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover:scale-125 transition-transform"></span> 
                              <span>الشركات الناشئة: {stats.totalStartups}</span>
                            </div>
                            <div 
                              className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors group"
                              onMouseEnter={() => setHoveredLegendIdx(2)}
                              onMouseLeave={() => setHoveredLegendIdx(null)}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] group-hover:scale-125 transition-transform"></span> 
                              <span>المستثمرون: {stats.totalInvestors}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chart Right: Plans progress bars */}
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col justify-between h-[300px]">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-black text-slate-800 text-lg">نسب اكتمال لجان التنظيم</h4>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">أعمال اللجان</span>
                        </div>
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          {[
                            { name: 'لجنة الاستقبال والتسجيل', percent: 84, color: 'bg-[#1E3A8A]' },
                            { name: 'لجنة التقييم العلمي والفني', percent: 70, color: 'bg-amber-500' },
                            { name: 'التواصل مع الشركات والمستثمرين', percent: 55, color: 'bg-[#F4A217]' }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-xs font-bold text-slate-600">
                                <span>{item.name}</span>
                                <span>{item.percent}%</span>
                              </div>
                              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Right Sidebar Panel (3 columns) */}
                  <div className="xl:col-span-3 space-y-8">
                    
                    {/* Admin Profile Card */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -mr-6 -mt-6"></div>
                      
                      <div className="w-20 h-20 bg-gradient-to-tr from-blue-900 to-[#1E3A8A] rounded-[1.75rem] flex items-center justify-center shadow-lg relative z-10 mb-4 text-[#F4A217] font-black text-3xl">
                        AD
                      </div>

                      <h3 className="font-black text-slate-800 text-lg">أدمن القمة الرئيسي</h3>
                      <span className="text-xs text-slate-400 font-bold mb-6">رئيس لجنة الإشراف العام</span>
                      
                      <div className="w-full border-t border-slate-100 pt-6 space-y-4 text-right">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">حالة الخادم:</span>
                          <span className="text-emerald-600">نشط وصحي</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">نوع الاتصال:</span>
                          <span className="text-slate-700">{isSupabaseConfigured ? 'Supabase SDK' : 'LocalStorage fallback'}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">تاريخ تسجيل الدخول:</span>
                          <span className="text-slate-700">اليوم 11:00 ص</span>
                        </div>
                      </div>
                    </div>

                    {/* Summit Milestones Calendar */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
                      <div>
                        <h4 className="font-black text-slate-800 text-base mb-1">جدول فعاليات القمة</h4>
                        <p className="text-[10px] text-slate-400 font-semibold">متابعة الفترات الزمنية للفعاليات</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/50">
                        {[
                          { day: 'اليوم الأول', label: 'افتتاح وقبول', active: true },
                          { day: 'اليوم الثاني', label: 'ورش وتقييم', active: false },
                          { day: 'اليوم الثالث', label: 'حفل الختام', active: false }
                        ].map((item, idx) => (
                          <div key={idx} className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                            item.active 
                              ? 'bg-[#1E3A8A] text-white shadow-md' 
                              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                          }`}>
                            <span className="text-[10px] font-black block">{item.day}</span>
                            <span className={`text-[8px] font-bold block mt-0.5 ${item.active ? 'text-[#F4A217]' : 'text-slate-400'}`}>{item.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Activity List */}
                      <div className="space-y-4 pt-2">
                        {[
                          { time: '02:00 م', task: 'استقبال وفحص طلبات مشروعات الحاسبات', type: 'رئيسي' },
                          { time: '02:30 م', task: 'تقييم البحوث التطبيقية لقسم الهندسة', type: 'فرعي' },
                          { time: '03:00 م', task: 'تسجيل المتحدثين والمدربين الأجانب', type: 'رئيسي' },
                          { time: '03:50 م', task: 'حصر أعداد المسجلين بملتقى التوظيف', type: 'رصد' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-3 text-right">
                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg shrink-0 self-start">{item.time}</span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-700 leading-normal">{item.task}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </div>
              ) : (
                /* --- DATA TABLE VIEWS --- */
                <div className="space-y-6">
                  
                  {/* Search and filter controls */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="ابحث بالاسم، الكلية، البريد..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200/85 rounded-2xl pr-12 pl-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none shadow-sm transition-all duration-300"
                      />
                    </div>
                    {(activeTab === 'graduation' || activeTab === 'research') && (
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-slate-200/85 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] font-bold text-slate-700 outline-none shadow-sm transition-all duration-300 cursor-pointer"
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
                      className="bg-emerald-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer hover:-translate-y-0.5 border border-blue-500"
                      title="تصدير هذه القائمة إلى ملف إكسيل CSV"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>تصدير إلى إكسيل</span>
                    </button>
                  </div>

                  {/* DATA CONTAINER */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden p-6 md:p-8">

              {/* --- NEWS TAB --- */}
              {activeTab === 'news' && !selectedItem && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-xl font-black text-[#1E3A8A] mb-1">إدارة الأخبار</h3>
                      <p className="text-sm text-slate-500 font-bold">إضافة وتعديل وحذف الأخبار المعروضة في الصفحة الرئيسية.</p>
                    </div>
                    <button 
                      onClick={() => setIsNewsModalOpen(true)}
                      className="bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0"
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
                      <h3 className="text-xl font-black text-[#1E3A8A] mb-1">إدارة وظائف الملتقى</h3>
                      <p className="text-sm text-slate-500 font-bold">إضافة وتعديل وحذف الوظائف الشاغرة المعروضة للطلاب والخريجين بالملتقى.</p>
                    </div>
                    <button 
                      onClick={openAddJobModal}
                      className="bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0 cursor-pointer"
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
                              {r.details.speechTopic && <div className="text-xs text-[#1E3A8A] font-bold mt-1">الموضوع: {r.details.speechTopic}</div>}
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
                      className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
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
                      className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
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
                        className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-black text-sm text-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]"
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
                          <h2 className="text-2xl font-black text-[#1E3A8A]">{selectedItem.project_name_ar}</h2>
                          <p className="text-md text-slate-500 font-bold" dir="ltr">{selectedItem.project_name_en}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#1E3A8A] mb-3">ملخص المشروع</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.projectSummary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#1E3A8A] mb-2">المشكلة</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.problemAddressed}</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#1E3A8A] mb-2">الحل</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.solutionProvided}</p>
                          </div>
                        </div>

                        {/* Team members list */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#1E3A8A] mb-4">أعضاء الفريق ({selectedItem.team_members?.length} طلاب)</h4>
                          <div className="space-y-4">
                            {selectedItem.team_members?.map((m, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-2">
                                <div>
                                  <span className="font-black text-slate-800">{m.name}</span>
                                  <span className="text-xs bg-[#F4A217]/10 text-[#1E3A8A] px-2 py-0.5 rounded mr-2 font-bold">{m.role || 'عضو'}</span>
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
                          <h4 className="font-black text-[#1E3A8A] border-b pb-2">بيانات المقرر والجامعة</h4>
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
                          <h4 className="font-black text-[#1E3A8A] border-b pb-2">الملفات والمرفقات</h4>
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

                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>

      {/* Exhibition Modal (Add/Edit) */}
      {isExhibitionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsExhibitionModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl animate-scale-up flex flex-col max-h-[90vh]">
            <div className="bg-[#1E3A8A] text-white p-6 flex justify-between items-center shrink-0">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">اسم الفريق / المبتكر *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.team}
                        onChange={(e) => setInnovationFormData({...innovationFormData, team: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">التصنيف *</label>
                      <select 
                        value={innovationFormData.category}
                        onChange={(e) => setInnovationFormData({...innovationFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="مثال: React / Node.js"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">أيقونة العرض (اسم الأيقونة)</label>
                      <select 
                        value={innovationFormData.icon}
                        onChange={(e) => setInnovationFormData({...innovationFormData, icon: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs text-left"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button type="submit" className="flex-1 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="مثال: 150 ج.م"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">شعار التسويق (Tag) (اختياري)</label>
                      <input 
                        type="text" 
                        value={productFormData.tag}
                        onChange={(e) => setProductFormData({...productFormData, tag: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="مثال: الأكثر مبيعاً أو عصر بارد"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">لون الشعار</label>
                      <select 
                        value={productFormData.tagColor}
                        onChange={(e) => setProductFormData({...productFormData, tagColor: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs text-left"
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button type="submit" className="flex-1 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold transition-colors text-sm">
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
            <div className="bg-[#1E3A8A] text-white p-6 flex justify-between items-center shrink-0">
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none resize-none"
                    placeholder="اكتب تفاصيل الخبر هنا..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">صورة الخبر (اختياري)</label>
                  <div className="flex items-center gap-4">
                    {newNewsData.image_url ? (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <img src={newNewsData.image_url} alt="News preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setNewNewsData({...newNewsData, image_url: ''})}
                          className="absolute top-1 left-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shadow-md hover:bg-red-600 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 bg-slate-50 text-slate-400">
                        <span className="text-xs font-bold">بدون صورة</span>
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-3">
                      <label className="cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors">
                        <span>رفع صورة جديدة</span>
                        <input type="file" accept="image/*" onChange={handleNewsImageUpload} className="hidden" />
                      </label>
                      <p className="text-xs text-slate-500 font-semibold block">أو أدخل رابط الصورة مباشرة:</p>
                      <input 
                        type="text" 
                        value={newNewsData.image_url}
                        onChange={(e) => setNewNewsData({...newNewsData, image_url: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none text-xs"
                        placeholder="مثال: https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm"
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
            <div className="bg-[#1E3A8A] text-white p-6 flex justify-between items-center shrink-0">
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
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="مثال: القرية الذكية، القاهرة"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">رابط الشعار (اختياري)</label>
                    <input 
                      type="text" 
                      value={jobFormData.logo}
                      onChange={(e) => setJobFormData({...jobFormData, logo: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="مثال: https://example.com/logo.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">نوع الدوام *</label>
                    <select 
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({...jobFormData, type: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-bold text-xs"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs resize-none"
                    placeholder="اكتب متطلبات الوظيفة ووصف الدور بالتفصيل..."
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
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
