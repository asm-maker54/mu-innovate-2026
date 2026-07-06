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

const isUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(String(str));
};

// Mock Data for Fallback
const mockGraduationProjects = [
  {
    id: "g1",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    project_name_ar: "Ù†Ø¸Ø§Ù… Ø§Ù„Ø±ÙŠ Ø§Ù„Ø°ÙƒÙŠ Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ",
    project_name_en: "AI-Powered Smart Irrigation System",
    college: "ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª ÙˆØ§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª (Ø­ÙƒÙˆÙ…ÙŠØ©)",
    department: "Ø¹Ù„ÙˆÙ… Ø§Ù„Ø­Ø§Ø³Ø¨",
    year: "2025/2026",
    project_type: "Ø¬Ù…Ø§Ø¹ÙŠ",
    status: "ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø·Ù„Ø¨",
    team_members: [
      { name: "Ø£Ø­Ù…Ø¯ Ù…Ø­Ù…Ø¯ Ø¹Ù„ÙŠ", id: "202201", college: "Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª", email: "ahmed@example.com", phone: "01000000001", role: "Ù‚Ø§Ø¦Ø¯ Ø§Ù„ÙØ±ÙŠÙ‚" },
      { name: "Ø³Ø§Ø±Ø© Ù…Ø­Ù…ÙˆØ¯ Ø­Ø³Ù†", id: "202202", college: "Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª", email: "sara@example.com", phone: "01000000002", role: "Ù…Ø·ÙˆØ± Ø¨Ø±Ù…Ø¬ÙŠØ§Øª" }
    ],
    files: { summaryPdf: "#", pitchDeck: "#", screenshot: "#" },
    details: { projectSummary: "Ù†Ø¸Ø§Ù… Ù…ØªÙƒØ§Ù…Ù„ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ù…Ø³ØªØ´Ø¹Ø±Ø§Øª Ø§Ù„Ø±Ø·ÙˆØ¨Ø© ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„ØªØ±Ø´ÙŠØ¯ Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ Ø§Ù„Ù…ÙŠØ§Ù‡ ÙÙŠ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ø§Ù„Ø²Ø±Ø§Ø¹ÙŠØ© Ø¨ØµØ¹ÙŠØ¯ Ù…ØµØ±.", problemAddressed: "Ø§Ù„Ù‡Ø¯Ø± Ø§Ù„ÙƒØ¨ÙŠØ± ÙÙŠ Ù…ÙŠØ§Ù‡ Ø§Ù„Ø±ÙŠ Ø§Ù„ØªÙ‚Ù„ÙŠØ¯ÙŠØ©.", solutionProvided: "Ø±ÙŠ Ø°ÙƒÙŠ ØªÙ„Ù‚Ø§Ø¦ÙŠ ÙŠØ¶Ø® Ù…ÙŠØ§Ù‡Ù‹Ø§ Ø­Ø³Ø¨ Ø­Ø§Ø¬Ø© Ø§Ù„ØªØ±Ø¨Ø© Ø§Ù„Ø¯Ù‚ÙŠÙ‚Ø©." }
  },
  {
    id: "g2",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    project_name_ar: "ÙƒØ±Ø³ÙŠ Ù…ØªØ­Ø±Ùƒ Ø°ÙƒÙŠ Ù„Ø°ÙˆÙŠ Ø§Ù„Ù‡Ù…Ù…",
    project_name_en: "Smart Wheelchair for Disabled",
    college: "ÙƒÙ„ÙŠØ© Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© (Ø¨Ø±Ù†Ø§Ù…Ø¬ Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…ÙŠÙƒØ§ØªØ±ÙˆÙ†ÙŠØ§Øª ÙˆØ§Ù„Ø±ÙˆØ¨ÙˆØªØ§Øª Ø§Ù„ØµÙ†Ø§Ø¹ÙŠØ©) (Ø£Ù‡Ù„ÙŠØ©)",
    department: "Ù…ÙŠÙƒØ§ØªØ±ÙˆÙ†ÙŠØ§Øª",
    year: "2025/2026",
    project_type: "Ø¬Ù…Ø§Ø¹ÙŠ",
    status: "ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ",
    team_members: [
      { name: "Ù…Ø­Ù…ÙˆØ¯ Ø®Ø§Ù„Ø¯ Ø³Ø¹ÙŠØ¯", id: "302201", college: "Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ø£Ù‡Ù„ÙŠØ©", email: "mahmoud@example.com", phone: "01100000001", role: "Ù…Ù‡Ù†Ø¯Ø³ Ù…ÙŠÙƒØ§Ù†ÙŠÙƒØ§" }
    ],
    files: { summaryPdf: "#", pitchDeck: "#" },
    details: { projectSummary: "ÙƒØ±Ø³ÙŠ Ø°ÙƒÙŠ ÙŠØªØ­Ø±Ùƒ Ø¨Ø¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ø±Ø£Ø³ ÙˆØ­Ø±ÙƒØ§Øª Ø§Ù„Ø¹ÙŠÙ† Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© Ø°ÙˆÙŠ Ø§Ù„Ù‡Ù…Ù… Ø¹Ù„Ù‰ Ø§Ù„Ø­Ø±ÙƒØ© Ø¨ÙŠØ³Ø± ÙˆØ£Ù…Ø§Ù†.", problemAddressed: "ØµØ¹ÙˆØ¨Ø© Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„ÙƒØ±Ø§Ø³ÙŠ Ø§Ù„ØªÙ‚Ù„ÙŠØ¯ÙŠØ©.", solutionProvided: "Ø§Ù„ØªØ­ÙƒÙ… Ø¨Ø¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ø¯Ù…Ø§Øº Ø£Ùˆ Ø­Ø±ÙƒØ§Øª Ø§Ù„Ø¹ÙŠÙ†." }
  }
];

const mockAppliedResearch = [
  {
    id: "r1",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    pi_name: "Ø¯. Ø£Ø³Ø§Ù…Ø© Ù…ØµØ·ÙÙ‰ ÙƒØ§Ù…Ù„",
    pi_faculty: "ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ… (Ø­ÙƒÙˆÙ…ÙŠØ©)",
    pi_dept: "Ø§Ù„ÙƒÙŠÙ…ÙŠØ§Ø¡",
    pi_rank: "Ø£Ø³ØªØ§Ø° Ù…Ø´Ø§Ø±Ùƒ",
    pi_email: "osama@minia.edu.eg",
    pi_phone: "01200000001",
    status: "ØªØ­Øª Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„ÙÙ†ÙŠ",
    files: { researchPdf: "#", marketSummaryPdf: "#" },
    details: { problem: "ØªÙ„ÙˆØ« Ø§Ù„Ù…ÙŠØ§Ù‡ Ø§Ù„Ø¬ÙˆÙÙŠØ© Ø¨Ø¨Ø¹Ø¶ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª Ø§Ù„Ø¹Ø¶ÙˆÙŠØ©.", solution: "Ù…Ø±ÙƒØ¨ Ù†Ø§Ù†Ùˆ ÙƒØ±Ø¨ÙˆÙ†ÙŠ Ø¬Ø¯ÙŠØ¯ Ø±Ø®ÙŠØµ Ø§Ù„Ø«Ù…Ù† ÙŠÙ…ØªØµ Ø§Ù„Ù…Ù„ÙˆØ«Ø§Øª Ø¨ÙƒÙØ§Ø¡Ø© 99%." }
  }
];

const mockRegistrations = [
  {
    id: "reg1",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "Ù…. ÙƒØ±ÙŠÙ… Ø¹Ø¨Ø¯ Ø§Ù„Ø¹Ø²ÙŠØ² Ù…ØµØ·ÙÙ‰",
    email: "karim@startup.com",
    phone: "01020304050",
    organization: "Ø´Ø±ÙƒØ© Ù†Ù…Ø§Ø¡ Ù„Ù„ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§",
    role: "startup",
    cv_url: "#",
    details: { startupName: "Ù†Ù…Ø§Ø¡ ØªÙŠÙƒ", industry: "Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ù„ØªØ­ÙˆÙ„ Ø§Ù„Ø±Ù‚Ù…ÙŠ", stage: "Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ Ù…Ø¬Ø±Ø¨", elevatorPitch: "Ù…Ù†ØµØ© Ø°ÙƒÙŠØ© Ù„Ø±Ø¨Ø· Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ÙŠÙ† Ø¨Ø§Ù„Ø£Ø³ÙˆØ§Ù‚ Ù…Ø¨Ø§Ø´Ø±Ø© Ù„ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„Ø­Ù„Ù‚Ø§Øª Ø§Ù„ÙˆØ³ÙŠØ·Ø©." }
  },
  {
    id: "reg2",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "Ø£.Ø¯. Ø³Ù„ÙˆÙ‰ Ø¹Ø¨Ø¯ Ø§Ù„Ø±Ø­Ù…Ù† Ø­Ø³Ù†",
    email: "salwa@knowledge.com",
    phone: "01122334455",
    organization: "Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©",
    role: "speaker",
    cv_url: "#",
    details: { speechTopic: "Ù…Ø³ØªÙ‚Ø¨Ù„ Ø±ÙŠØ§Ø¯Ø© Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ ÙÙŠ Ø§Ù„Ø¬Ø§Ù…Ø¹Ø§Øª Ø§Ù„Ù…ØµØ±ÙŠØ©", speakerExpertise: "Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø± Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ", speakerBio: "Ø®Ø¨ÙŠØ±Ø© ÙÙŠ Ù†Ù‚Ù„ Ø§Ù„ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§ ÙˆØªØ£Ø³ÙŠØ³ Ø§Ù„Ø­Ø§Ø¶Ù†Ø§Øª Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠØ© Ù„Ø£ÙƒØ«Ø± Ù…Ù† Ù¡Ù¥ Ø¹Ø§Ù…Ø§Ù‹." }
  },
  {
    id: "reg3",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "Ø¯. Ø·Ø§Ø±Ù‚ Ø¬Ù„Ø§Ù„ ÙÙˆØ²ÙŠ",
    email: "tarek@angelinvest.net",
    phone: "01599887766",
    organization: "ØµÙ†Ø¯ÙˆÙ‚ Ù…ØµØ± Ù„Ù„Ø§Ø³ØªØ«Ù…Ø§Ø± Ø§Ù„Ù…Ù„Ø§Ø¦ÙƒÙŠ",
    role: "investor",
    cv_url: null,
    details: { investorEntity: "Ù…Ø³ØªØ«Ù…Ø± ÙØ±Ø¯ÙŠ", investmentType: "ØªÙ…ÙˆÙŠÙ„ Ø£ÙˆÙ„ÙŠ / Seed Capital" }
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
  const [adminRole, setAdminRole] = useState('superAdmin'); // 'superAdmin' | 'academic'
  const [activeTab, setActiveTab] = useState('overview');

  // Admin profile (persisted in localStorage)
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
  const [newNewsData, setNewNewsData] = useState({ title: '', content: '', image_url: '', uploader_name: 'Ø£Ø¯Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù…' });
  const [selectedType, setSelectedType] = useState(null); // 'graduation', 'research', 'registration'
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Ø§Ù„ÙƒÙ„');

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
    type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
    experience: 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
    logo: '',
    details: ''
  });

  const [innovationFormData, setInnovationFormData] = useState({
    name: '',
    category: 'ai',
    level: 'prototype',
    levelName: 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ',
    team: '',
    desc: '',
    image: '',
    tech: 'Python',
    speed: 'ÙÙˆØ±ÙŠ',
    accuracy: '95%',
    icon: 'Cpu'
  });

  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ©',
    faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©',
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
    if (window.confirm('Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø­Ø°Ù Ù‡Ø°Ø§ Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø±ØŸ')) {
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
    if (window.confirm('Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø­Ø°Ù Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬ØŸ')) {
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
        if (jobEditItem && isUUID(jobEditItem.id)) {
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
        type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
        experience: 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
        logo: '',
        details: ''
      });
    } catch (err) {
      console.error("Error saving job:", err);
      if (err.message && (err.message.includes('jobs') || err.message.includes('schema cache') || err.message.includes('relation'))) {
        alert("ØªÙ†Ø¨ÙŠÙ‡ Ù‡Ø§Ù…: Ø¬Ø¯ÙˆÙ„ Ø§Ù„ÙˆØ¸Ø§Ø¦Ù (jobs) ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯ Ø­Ø§Ù„ÙŠØ§Ù‹ ÙÙŠ Ù‚Ø§Ø¹Ø¯Ø© Ø¨ÙŠØ§Ù†Ø§Øª Supabase Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.\n\nÙ„Ù‚Ø¯ Ù‚Ù…Ù†Ø§ Ø¨Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª Ù…Ø­Ù„ÙŠØ§Ù‹ ÙÙŠ Ø§Ù„Ù…ØªØµÙØ­ Ø¨Ù†Ø¬Ø§Ø­ Ù„ØªØªÙ…ÙƒÙ† Ù…Ù† Ù…Ø¹Ø§ÙŠÙ†Ø© ÙˆØªØ¹Ø¯ÙŠÙ„ Ø§Ù„ÙˆØ¸Ø§Ø¦Ù ÙÙˆØ±Ø§Ù‹!\n\nÙ„ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø­ÙØ¸ Ø§Ù„Ø¯Ø§Ø¦Ù… Ø³Ø­Ø§Ø¨ÙŠØ§Ù‹ØŒ ÙŠØ±Ø¬Ù‰ Ù†Ø³Ø® ÙƒÙˆØ¯ SQL Ø§Ù„Ø®Ø§Øµ Ø¨Ø§Ù„ÙˆØ¸Ø§Ø¦Ù Ù…Ù† Ø§Ù„Ù…Ù„Ù:\nscratch/supabase_schema.sql\nÙˆØªØ´ØºÙŠÙ„Ù‡ ÙÙŠ Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Supabase (Ù‚Ø³Ù… SQL Editor).");
        
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
          type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
          experience: 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
          logo: '',
          details: ''
        });
      } else {
        alert("Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø­ÙØ¸ Ø§Ù„ÙˆØ¸ÙŠÙØ©: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø­Ø°Ù Ù‡Ø°Ù‡ Ø§Ù„ÙˆØ¸ÙŠÙØ© Ù†Ù‡Ø§Ø¦ÙŠØ§Ù‹ØŸ')) {
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
        alert("Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø­Ø°Ù Ø§Ù„ÙˆØ¸ÙŠÙØ©: " + err.message);
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
      type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
      experience: 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
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
      type: item.type || 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
      experience: item.experience || 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
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
      levelName: 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ',
      team: '',
      desc: '',
      image: '',
      tech: 'Python',
      speed: 'ÙÙˆØ±ÙŠ',
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
      levelName: item.levelName || 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ',
      team: item.team || '',
      desc: item.desc || '',
      image: item.image || '',
      tech: item.stats?.tech || item.tech || 'Python',
      speed: item.stats?.speed || item.speed || 'ÙÙˆØ±ÙŠ',
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
      category: 'Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ©',
      faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©',
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
      category: item.category || 'Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ©',
      faculty: item.faculty || 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©',
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

  const handleSaveNews = async (e) => {
    e.preventDefault();
    if (!newNewsData.title || !newNewsData.content) return;
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        if (editingNewsId && isUUID(editingNewsId)) {
          const { error } = await supabase
            .from('news')
            .update({
              title: newNewsData.title,
              content: newNewsData.content,
              image_url: newNewsData.image_url,
              uploader_name: newNewsData.uploader_name
            })
            .eq('id', editingNewsId);
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
        alert("ØªÙ†Ø¨ÙŠÙ‡ Ù‡Ø§Ù…: Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø£Ø®Ø¨Ø§Ø± (news) ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯ Ø­Ø§Ù„ÙŠØ§Ù‹ Ù ÙŠ Ù‚Ø§Ø¹Ø¯Ø© Ø¨ÙŠØ§Ù†Ø§Øª Supabase Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ.\n\nÙ„Ù‚Ø¯ Ù‚Ù…Ù†Ø§ Ø¨Ø­Ù Ø¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª Ù…Ø­Ù„ÙŠØ§Ù‹ Ù ÙŠ Ø§Ù„Ù…ØªØµÙ Ø­ Ø¨Ù†Ø¬Ø§Ø­ Ù„ØªØªÙ…ÙƒÙ† Ù…Ù† Ù…Ø¹Ø§ÙŠÙ†Ø© ÙˆØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø£Ø®Ø¨Ø§Ø± Ù ÙˆØ±Ø§Ù‹!\n\nÙ„ØªÙ Ø¹ÙŠÙ„ Ø§Ù„Ø­Ù Ø¸ Ø§Ù„Ø¯Ø§Ø¦Ù… Ø³Ø­Ø§Ø¨ÙŠØ§Ù‹ØŒ ÙŠØ±Ø¬Ù‰ Ù†Ø³Ø® ÙƒÙˆØ¯ SQL Ø§Ù„Ù…ÙˆØ¬ÙˆØ¯ Ù ÙŠ Ø§Ù„Ù…Ù„Ù :\nscratch/supabase_news_schema.sql\nÙˆØªØ´ØºÙŠÙ„Ù‡ Ù ÙŠ Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Supabase (Ù‚Ø³Ù… SQL Editor).");
        
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
        setNewNewsData({ title: '', content: '', image_url: '', uploader_name: 'Ø£Ø¯Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù…' });
      } else {
        alert("Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø­ÙØ¸ Ø§Ù„Ø®Ø¨Ø±: " + err.message);
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
    if (window.confirm('Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø±ØºØ¨ØªÙƒ ÙÙŠ Ø­Ø°Ù Ù‡Ø°Ø§ Ø§Ù„Ø®Ø¨Ø± Ù†Ù‡Ø§Ø¦ÙŠØ§Ù‹ØŸ')) {
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
        alert("Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø­Ø°Ù Ø§Ù„Ø®Ø¨Ø±: " + err.message);
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
      setLoginError('ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± ØºÙŠØ± ØµØ­ÙŠØ­Ø©!');
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
                title: 'Ù…Ù‡Ù†Ø¯Ø³ Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØ§Ø¬Ù‡Ø§Øª Ø£Ù…Ø§Ù…ÙŠØ© (Frontend)',
                company: 'TechVision Solutions',
                location: 'Ø§Ù„Ù‚Ø±ÙŠØ© Ø§Ù„Ø°ÙƒÙŠØ©ØŒ Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©',
                type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
                experience: '1-3 Ø³Ù†ÙˆØ§Øª',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
                details: 'ØªØ·ÙˆÙŠØ± ÙˆØªØµÙ…ÙŠÙ… ÙˆØ§Ø¬Ù‡Ø§Øª ÙˆØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„ÙˆÙŠØ¨ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… React.js Ùˆ TailwindCSS.'
              },
              {
                title: 'Ø£Ø®ØµØ§Ø¦ÙŠ ØªØ³ÙˆÙŠÙ‚ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
                company: 'Global Media',
                location: 'Ø¹Ù† Ø¨ÙØ¹Ø¯ (Remote)',
                type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
                experience: 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
                logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200',
                details: 'Ø¥Ø¯Ø§Ø±Ø© Ø­Ù…Ù„Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠ ÙˆØ¬ÙˆØ¬Ù„ Ø£Ø¯Ø² ÙˆØªÙ‡ÙŠØ¦Ø© Ù…Ø­Ø±ÙƒØ§Øª Ø§Ù„Ø¨Ø­Ø«.'
              },
              {
                title: 'Ù…Ø­Ù„Ù„ Ø¨ÙŠØ§Ù†Ø§Øª',
                company: 'Data Insights',
                location: 'Ø§Ù„Ù…Ø¹Ø§Ø¯ÙŠØŒ Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©',
                type: 'Ø¯ÙˆØ§Ù… Ø¬Ø²Ø¦ÙŠ',
                experience: '0-2 Ø³Ù†ÙˆØ§Øª',
                logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
                details: 'ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± ÙˆØªØµÙ…ÙŠÙ… Ù„ÙˆØ­Ø§Øª Ø¹Ø±Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Power BI.'
              },
              {
                title: 'Ù…Ù‡Ù†Ø¯Ø³ Ø¬ÙˆØ¯Ø© Ø¨Ø±Ù…Ø¬ÙŠØ§Øª (QA)',
                company: 'SoftCore',
                location: 'Ø§Ù„Ù…Ù†ÙŠØ§ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©',
                type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
                experience: '2+ Ø³Ù†ÙˆØ§Øª',
                logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200',
                details: 'Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡ ÙˆØ¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± Ø§Ù„ÙÙ†ÙŠØ© ÙˆØ¹Ù…Ù„ Ø£ØªÙ…ØªØ© Ù„Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª.'
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
            title: 'Ù…Ù‡Ù†Ø¯Ø³ Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØ§Ø¬Ù‡Ø§Øª Ø£Ù…Ø§Ù…ÙŠØ© (Frontend)',
            company: 'TechVision Solutions',
            location: 'Ø§Ù„Ù‚Ø±ÙŠØ© Ø§Ù„Ø°ÙƒÙŠØ©ØŒ Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©',
            type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
            experience: '1-3 Ø³Ù†ÙˆØ§Øª',
            logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
            details: 'ØªØ·ÙˆÙŠØ± ÙˆØªØµÙ…ÙŠÙ… ÙˆØ§Ø¬Ù‡Ø§Øª ÙˆØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„ÙˆÙŠØ¨ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… React.js Ùˆ TailwindCSS.'
          },
          {
            id: 2,
            title: 'Ø£Ø®ØµØ§Ø¦ÙŠ ØªØ³ÙˆÙŠÙ‚ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
            company: 'Global Media',
            location: 'Ø¹Ù† Ø¨ÙØ¹Ø¯ (Remote)',
            type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
            experience: 'Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬',
            logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200',
            details: 'Ø¥Ø¯Ø§Ø±Ø© Ø­Ù…Ù„Ø§Øª Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠ ÙˆØ¬ÙˆØ¬Ù„ Ø£Ø¯Ø² ÙˆØªÙ‡ÙŠØ¦Ø© Ù…Ø­Ø±ÙƒØ§Øª Ø§Ù„Ø¨Ø­Ø«.'
          },
          {
            id: 3,
            title: 'Ù…Ø­Ù„Ù„ Ø¨ÙŠØ§Ù†Ø§Øª',
            company: 'Data Insights',
            location: 'Ø§Ù„Ù…Ø¹Ø§Ø¯ÙŠØŒ Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©',
            type: 'Ø¯ÙˆØ§Ù… Ø¬Ø²Ø¦ÙŠ',
            experience: '0-2 Ø³Ù†ÙˆØ§Øª',
            logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
            details: 'ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± ÙˆØªØµÙ…ÙŠÙ… Ù„ÙˆØ­Ø§Øª Ø¹Ø±Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Power BI.'
          },
          {
            id: 4,
            title: 'Ù…Ù‡Ù†Ø¯Ø³ Ø¬ÙˆØ¯Ø© Ø¨Ø±Ù…Ø¬ÙŠØ§Øª (QA)',
            company: 'SoftCore',
            location: 'Ø§Ù„Ù…Ù†ÙŠØ§ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©',
            type: 'Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„',
            experience: '2+ Ø³Ù†ÙˆØ§Øª',
            logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200',
            details: 'Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡ ÙˆØ¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± Ø§Ù„ÙÙ†ÙŠØ© ÙˆØ¹Ù…Ù„ Ø£ØªÙ…ØªØ© Ù„Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª.'
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
            name: 'Ù†Ø¸Ø§Ù… ØªØ´Ø®ÙŠØµ Ø§Ù„Ø£ÙˆØ±Ø§Ù… Ø§Ù„Ø°ÙƒÙŠ Ø¨Ø§Ù„Ø±Ù†ÙŠÙ† Ø§Ù„Ù…ØºÙ†Ø§Ø·ÙŠØ³ÙŠ',
            category: 'ai',
            level: 'advanced',
            levelName: 'Ù…Ø³ØªÙˆÙ‰ Ù…ØªÙ‚Ø¯Ù…',
            team: 'ÙØ±ÙŠÙ‚ Ø³ÙŠØ¬Ù…Ø§ Ø§Ù„Ø·Ø¨ÙŠ',
            desc: 'Ø¨Ø±Ù…Ø¬ÙŠØ§Øª Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ØªÙ‚ÙˆÙ… Ø¨ØªØ­Ù„ÙŠÙ„ ØµÙˆØ± Ø§Ù„Ø±Ù†ÙŠÙ† Ù„Ø³Ø±Ø¹Ø© Ø±ØµØ¯ Ø§Ù„Ø£ÙˆØ±Ø§Ù… Ø¨Ù†Ø³Ø¨Ø© Ø¯Ù‚Ø© ØªÙÙˆÙ‚ 98% ÙˆØªÙˆÙÙŠØ± Ø§Ù„ÙˆÙ‚Øª Ù„Ù„Ø£Ø·Ø¨Ø§Ø¡.',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
            tech: 'Python / PyTorch', speed: '3 Ø«ÙˆØ§Ù†Ù', accuracy: '98%', icon: 'Cpu'
          },
          {
            id: 2,
            name: 'Ø¬Ø¯Ø§Ø± Ø§Ù„Ø­Ù…Ø§ÙŠØ© Ø§Ù„ÙØ§Ø¦Ù‚ Ù„Ù„Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„Ø·Ø¨ÙŠØ© Ø§Ù„Ø°ÙƒÙŠØ©',
            category: 'cyber',
            level: 'ready',
            levelName: 'Ø¬Ø§Ù‡Ø² Ù„Ù„ØªØ¨Ù†ÙŠ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ',
            team: 'Ø­ØµÙ† Ø§Ù„Ù…Ù†ÙŠØ§ Ø§Ù„Ø±Ù‚Ù…ÙŠ',
            desc: 'Ø¨Ø±ÙˆØªÙˆÙƒÙˆÙ„ Ø­Ù…Ø§ÙŠØ© Ø´Ø¨ÙƒÙŠØ© ÙŠÙ…Ù†Ø¹ Ø§Ø®ØªØ±Ø§Ù‚Ø§Øª Ø£Ø¬Ù‡Ø²Ø© Ø¥Ù†Ø¹Ø§Ø´ Ø§Ù„Ù‚Ù„Ø¨ ÙˆØ§Ù„Ø£Ø³Ø±Ù‘Ø© Ø§Ù„Ù…ØªØµÙ„Ø© Ø¨Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø³ØªØ´ÙÙŠØ§Øª ÙˆØ§Ù„Ù…Ø±Ø§ÙƒØ².',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
            tech: 'Rust / C++', speed: 'ÙÙˆØ±ÙŠ', accuracy: '99.9%', icon: 'Lock'
          },
          {
            id: 3,
            name: 'Ø­Ø§ÙˆÙŠØ© Ø§Ù„Ù†ÙØ§ÙŠØ§Øª Ø§Ù„Ø°ÙƒÙŠØ© Ù„Ø­Ø³Ø§Ø¨Ø§Øª Ø§Ù„Ø¨ÙŠØ¦Ø© Ø§Ù„Ù…Ø³ØªØ¯Ø§Ù…Ø©',
            category: 'iot',
            level: 'prototype',
            levelName: 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ',
            team: 'Ù…Ø¨ØªÙƒØ±Ùˆ Ø§Ù„ØºØ¯ Ø§Ù„Ø¨ÙŠØ¦ÙŠ',
            desc: 'Ø¬Ù‡Ø§Ø² Ø±ØµØ¯ ÙŠØ³ØªØ´Ø¹Ø± Ø§Ù…ØªÙ„Ø§Ø¡ Ø§Ù„Ø­Ø§ÙˆÙŠØ§Øª ÙˆÙŠÙØ±Ø² Ø§Ù„Ù†ÙØ§ÙŠØ§Øª ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø­Ø³Ø§Ø³Ø§Øª Ø§Ù„Ù…Ø³Ø§ÙØ© ÙˆÙ…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„ØµÙˆØ± Ø§Ù„Ù…ØªÙ‚Ø¯Ù…Ø©.',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
            tech: 'Arduino / ESP32', speed: 'ØªÙ„Ù‚Ø§Ø¦ÙŠ', accuracy: '90%', icon: 'Sprout'
          },
          {
            id: 4,
            name: 'Ù…Ù†ØµØ© ØªØ³ÙˆÙŠÙ‚ ÙˆØªÙˆØ¬ÙŠÙ‡ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ù„Ù„Ø´Ø¨Ø§Ø¨',
            category: 'apps',
            level: 'ready',
            levelName: 'Ø¬Ø§Ù‡Ø² Ù„Ù„ØªØ¨Ù†ÙŠ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ',
            team: 'ÙØ±ÙŠÙ‚ Ø¥Ù†Ø¬Ø§Ø² Ù„Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª',
            desc: 'Ø¨ÙˆØ§Ø¨Ø© Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ© ØªØ±Ø¨Ø· Ø£ÙÙƒØ§Ø± Ø§Ù„Ø®Ø±ÙŠØ¬ÙŠÙ† ÙˆØ§Ù„Ù…Ø¨ØªÙƒØ±ÙŠÙ† Ø¨Ø§Ù„Ù…Ø´Ø±ÙÙŠÙ† ÙˆØ§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ† Ù„ØªÙ…ÙˆÙŠÙ„ Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø¬Ø¯ÙˆÙ‰ ÙˆØ§Ù„ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙØ¹Ù„ÙŠ.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
            tech: 'React / Node.js', speed: 'Ø³Ø­Ø§Ø¨ÙŠ', accuracy: '100%', icon: 'Globe'
          },
          {
            id: 5,
            name: 'Ø°Ø±Ø§Ø¹ Ø¢Ù„ÙŠØ© Ù„Ø¥Ø¬Ø±Ø§Ø¡ Ø§Ù„Ø¬Ø±Ø§Ø­Ø§Øª Ø§Ù„Ø¯Ù‚ÙŠÙ‚Ø© Ø¹Ù† Ø¨Ø¹Ø¯',
            category: 'ai',
            level: 'prototype',
            levelName: 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ',
            team: 'Ù†Ø¨Ø¶ Ù…ÙŠÙƒØ§ØªØ±ÙˆÙ†ÙƒØ³',
            desc: 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ Ù„Ø°Ø±Ø§Ø¹ Ø±ÙˆØ¨ÙˆØªÙŠØ© ØªØ­Ø§ÙƒÙŠ Ø­Ø±ÙƒØ© ÙŠØ¯ Ø§Ù„Ø·Ø¨ÙŠØ¨ Ø¨Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª Ø¯Ù‚ÙŠÙ‚Ø© Ø¬Ø¯Ø§Ù‹ Ø¹Ø¨Ø± Ø§Ù„ÙˆÙŠØ¨ ÙˆØ§Ù„Ø£ÙˆØ§Ù…Ø± Ø§Ù„ØµÙˆØªÙŠØ© Ø§Ù„ÙÙˆØ±ÙŠØ©.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
            tech: 'Python / ROS', speed: 'Ù„Ø­Ø¸ÙŠ', accuracy: '95%', icon: 'Cpu'
          },
          {
            id: 6,
            name: 'Ø¨Ø±ÙˆØªÙˆÙƒÙˆÙ„ ØªØ£Ù…ÙŠÙ† Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ø²Ø±Ø§Ø¹ÙŠØ© Ø¨Ø³Ù„Ø§Ø³Ù„ Ø§Ù„ÙƒØªÙ„',
            category: 'cyber',
            level: 'advanced',
            levelName: 'Ù…Ø³ØªÙˆÙ‰ Ù…ØªÙ‚Ø¯Ù…',
            team: 'Ø³Ù†Ø§Ø¨Ù„ Ø§Ù„ØªØ´ÙÙŠØ±',
            desc: 'Ù†Ø¸Ø§Ù… ØªØ´ÙÙŠØ± ØºÙŠØ± Ù…Ø±ÙƒØ²ÙŠ Ù„ØªØ£Ù…ÙŠÙ† Ù…Ø¨ÙŠØ¹Ø§Øª Ø§Ù„Ù…Ø­Ø§ØµÙŠÙ„ ÙˆØ§Ù„ÙˆØ­Ø¯Ø§Øª Ø§Ù„Ø¥Ù†ØªØ§Ø¬ÙŠØ© Ù„Ù…Ù†Ø¹ Ø§Ù„ØªÙ„Ø§Ø¹Ø¨ Ø¨Ø§Ù„Ø£Ø³Ø¹Ø§Ø± ÙˆØ³Ø¬Ù„Ø§Øª Ø§Ù„Ù…Ø²Ø§Ø±Ø¹ÙŠÙ†.',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
            tech: 'Solidity / JS', speed: 'Ø«Ø§Ù†ÙŠØªØ§Ù†', accuracy: '100%', icon: 'Database'
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
            name: 'Ø¹Ø³Ù„ Ù†Ø­Ù„ Ø·Ø¨ÙŠØ¹ÙŠ Ù…ØµÙÙ‰ Ù†Ù‚ÙŠ', category: 'Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ©', faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©', facultyId: 'agriculture',
            price: '150 Ø¬.Ù…', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
            rating: '4.9 (1.2K)', tag: 'Ø§Ù„Ø£ÙƒØ«Ø± Ù…Ø¨ÙŠØ¹Ø§Ù‹', tagColor: 'bg-amber-500 text-white',
            details: 'Ø¹Ø¨ÙˆØ© 1 ÙƒØ¬Ù… Ø¹Ø³Ù„ Ù…ØµÙÙ‰ Ù†Ù‚ÙŠ Ø®Ø§Ù„ÙŠ ØªÙ…Ø§Ù…Ø§Ù‹ Ù…Ù† Ø§Ù„Ø³ÙƒØ± Ø§Ù„Ù…Ø¶Ø§Ù Ø£Ùˆ Ø§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„Ø­Ø§ÙØ¸Ø©ØŒ Ù…Ù† Ø¥Ù†ØªØ§Ø¬ Ù…Ù†Ø§Ø­Ù„ ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©.'
          },
          {
            id: 2,
            name: 'Ø²ÙŠØª Ø²ÙŠØªÙˆÙ† Ø¨ÙƒØ± Ù…Ù…ØªØ§Ø² Ù…Ø¹ØµÙˆØ± Ø¨Ø§Ø±Ø¯', category: 'Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ©', faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©', facultyId: 'agriculture',
            price: '180 Ø¬.Ù…', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500',
            rating: '4.8 (850)', tag: 'Ø¹ØµØ± Ø¨Ø§Ø±Ø¯ Ø·Ø¨ÙŠØ¹ÙŠ', tagColor: 'bg-amber-600 text-white',
            details: 'Ø²ÙŠØª Ø²ÙŠØªÙˆÙ† Ø¨ÙƒØ± Ù…Ù…ØªØ§Ø² Ø¯Ø±Ø¬Ø© Ø£ÙˆÙ„Ù‰ØŒ Ù†Ø³Ø¨Ø© Ø­Ù…ÙˆØ¶Ø© Ù…Ù†Ø®ÙØ¶Ø© Ø¬Ø¯Ø§Ù‹ØŒ Ù…Ø¹ØµÙˆØ± Ù…ÙŠÙƒØ§Ù†ÙŠÙƒÙŠØ§Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨Ø§Ø±Ø¯ Ù„ÙÙˆØ§Ø¦Ø¯ ÙƒØ§Ù…Ù„Ø©.'
          },
          {
            id: 3,
            name: 'Ù†Ø¨Ø§ØªØ§Øª Ø²ÙŠÙ†Ø© ÙˆØ´ØªÙ„Ø§Øª Ø²Ù‡ÙˆØ± Ù…Ù†Ø²Ù„ÙŠØ©', category: 'Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ©', faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©', facultyId: 'agriculture',
            price: '35 Ø¬.Ù…', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=500',
            rating: '4.7 (310)', tag: 'Ø´ØªÙ„Ø§Øª Ø²Ù‡ÙˆØ±', tagColor: 'bg-green-600 text-white',
            details: 'Ù…Ø¬Ù…ÙˆØ¹Ø© Ù…ØªÙ…ÙŠØ²Ø© Ù…Ù† Ù†Ø¨Ø§ØªØ§Øª Ø§Ù„Ø¸Ù„ ÙˆØ§Ù„Ø²ÙŠÙ†Ø© Ø§Ù„Ù…Ù†Ø²Ù„ÙŠØ© Ø§Ù„Ù…Ø¬Ù‡Ø²Ø© Ù„Ù„Ø²Ø±Ø§Ø¹Ø© ÙˆØªØ¬Ù…ÙŠÙ„ Ø§Ù„Ù…ÙƒØ§ØªØ¨ ÙˆØ§Ù„Ø¨Ù„ÙƒÙˆÙ†Ø§Øª.'
          },
          {
            id: 4,
            name: 'Ù…Ù†Ø¸ÙØ§Øª ÙˆÙ…Ø·Ù‡Ø± Ø£Ø±Ø¶ÙŠØ§Øª Ø¹Ø§Ù„ÙŠ Ø§Ù„Ø¬ÙˆØ¯Ø©', category: 'Ù…Ù†Ø¸ÙØ§Øª ØµÙ†Ø§Ø¹ÙŠØ©', faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ…', facultyId: 'science',
            price: '45 Ø¬.Ù…', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=500',
            rating: '4.7 (2.1K)', tag: 'Ø§Ù„Ø£Ø¹Ù„Ù‰ Ù…Ø¨ÙŠØ¹Ø§Ù‹', tagColor: 'bg-emerald-600 text-white',
            details: 'Ù…Ø·Ù‡Ø±Ø§Øª ÙˆÙ…Ù†Ø¸ÙØ§Øª Ø¢Ù…Ù†Ø© Ø¹Ø§Ù„ÙŠØ© Ø§Ù„ØªØ±ÙƒÙŠØ² Ù„Ù„Ø¥Ù†ØªØ§Ø¬ Ø§Ù„Ù…Ù†Ø²Ù„ÙŠ ÙˆØ§Ù„ØªØ¬Ø§Ø±ÙŠØŒ Ù…ØµÙ†Ø¹Ø© ÙˆÙÙ‚ Ø§Ù„Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø·Ø¨ÙŠØ© Ø¨Ù‚Ø³Ù… Ø§Ù„ÙƒÙŠÙ…ÙŠØ§Ø¡.'
          },
          {
            id: 5,
            name: 'ØµØ§Ø¨ÙˆÙ† Ø³Ø§Ø¦Ù„ Ù…Ø¹Ù‚Ù… Ù…Ø¶Ø§Ø¯ Ù„Ù„Ø¨ÙƒØªÙŠØ±ÙŠØ§', category: 'Ù…Ù†Ø¸ÙØ§Øª ØµÙ†Ø§Ø¹ÙŠØ©', faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ…', facultyId: 'science',
            price: '60 Ø¬.Ù…', image: 'https://images.unsplash.com/photo-1607006342411-101a4e101155?auto=format&fit=crop&q=80&w=500',
            rating: '4.6 (950)', tag: 'Ù…Ø·Ù‡Ø± Ø¢Ù…Ù†', tagColor: 'bg-blue-700 text-white',
            details: 'Ø¹Ø¨ÙˆØ© Ø¹Ø§Ø¦Ù„ÙŠØ© 3 Ù„ØªØ± Ù…Ù† Ø§Ù„ØµØ§Ø¨ÙˆÙ† Ø§Ù„Ø³Ø§Ø¦Ù„ Ø§Ù„Ù…Ø¹Ø²Ø² Ø¨Ù…Ø±Ø·Ø¨Ø§Øª Ø§Ù„Ø¬Ù„Ø³Ø±ÙŠÙ† Ù„Ø­Ù…Ø§ÙŠØ© Ø§Ù„Ø£ÙŠØ¯ÙŠ ÙˆØªØ±Ø·ÙŠØ¨Ù‡Ø§ Ø¨ÙØ§Ø¹Ù„ÙŠØ© ØªØ§Ù…Ø©.'
          },
          {
            id: 6,
            name: 'Ù…Ø¹Ù‚Ù… ÙƒØ­ÙˆÙ„ÙŠ Ø·Ø¨ÙŠ Ø¨ØªØ±ÙƒÙŠØ² 70%', category: 'Ù…Ù†Ø¸ÙØ§Øª ØµÙ†Ø§Ø¹ÙŠØ©', faculty: 'ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ…', facultyId: 'science',
            price: '50 Ø¬.Ù…', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500',
            rating: '4.9 (1.4K)', tag: 'Ø·Ø¨ÙŠ Ù…Ø¹ØªÙ…Ø¯', tagColor: 'bg-cyan-600 text-white',
            details: 'Ø¨Ø®Ø§Ø® ÙƒØ­ÙˆÙ„ Ø¥ÙŠØ«ÙŠÙ„ÙŠ Ù†Ù‚ÙŠ ØªØ±ÙƒÙŠØ² 70% Ù„Ù„ØªØ¹Ù‚ÙŠÙ… Ø§Ù„Ù…Ø¨Ø§Ø´Ø± ÙˆØ­Ù…Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø·Ø­ ÙˆØ§Ù„Ø£ÙŠØ¯ÙŠ Ø¨ÙØ§Ø¹Ù„ÙŠØ© ØªØ§Ù…Ø© Ù…ØµÙ†Ø¹ Ø¨Ù…Ø¹Ø§Ù…Ù„ Ø§Ù„ÙƒÙ„ÙŠØ©.'
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
      alert("Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø­Ø§Ù„Ø©: " + err.message);
    }
  };

  const handleDeleteItem = async (itemId, type) => {
    const isConfirm = window.confirm(
      isRtl 
        ? "Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø±ØºØ¨ØªÙƒ ÙÙŠ Ø­Ø°Ù Ù‡Ø°Ø§ Ø§Ù„Ø³Ø¬Ù„ Ù†Ù‡Ø§Ø¦ÙŠØ§Ù‹ØŸ Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø§Ù„ØªØ±Ø§Ø¬Ø¹ Ø¹Ù† Ù‡Ø°Ø§ Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡." 
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
      alert(isRtl ? "ØªÙ… Ø­Ø°Ù Ø§Ù„Ø³Ø¬Ù„ Ø¨Ù†Ø¬Ø§Ø­." : "Record deleted successfully.");
    } catch (err) {
      alert((isRtl ? "Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø­Ø°Ù: " : "Error deleting record: ") + err.message);
    }
  };

  const handleExportToExcel = () => {
    let dataToExport = [];
    let headers = [];
    let filename = '';

    if (activeTab === 'graduation') {
      const items = getFilteredGradProjects();
      headers = ['ØªØ§Ø±ÙŠØ® Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…', 'Ø§Ø³Ù… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©', 'Ø§Ø³Ù… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø¨Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©', 'Ø§Ù„ÙƒÙ„ÙŠØ© ÙˆØ§Ù„Ø¬Ø§Ù…Ø¹Ø©', 'Ø§Ù„Ù†ÙˆØ¹', 'Ø§Ù„Ø­Ø§Ù„Ø©', 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ù„Ù„Ø±Ø§Ø¦Ø¯', 'Ø§Ù„Ù‡Ø§ØªÙ', 'Ø§Ù„Ù…Ù„Ø®Øµ'];
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
      filename = 'Ù…Ø´Ø±ÙˆØ¹Ø§Øª_Ø§Ù„ØªØ®Ø±Ø¬.csv';
    } else if (activeTab === 'research') {
      const items = getFilteredResearch();
      headers = ['ØªØ§Ø±ÙŠØ® Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…', 'Ø§Ù„Ø¨Ø§Ø­Ø« Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ', 'Ø§Ù„Ø¯Ø±Ø¬Ø© Ø§Ù„Ø¹Ù„Ù…ÙŠØ©', 'Ø§Ù„ÙƒÙ„ÙŠØ© ÙˆØ§Ù„Ø¬Ø§Ù…Ø¹Ø©', 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ', 'Ø§Ù„Ù‡Ø§ØªÙ', 'Ø§Ù„Ø­Ø§Ù„Ø©', 'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø¨Ø­Ø«', 'Ø§Ù„Ù…Ù„Ø®Øµ'];
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
      filename = 'Ø§Ù„Ø¨Ø­ÙˆØ«_Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠØ©.csv';
    } else if (['speakers', 'startups', 'investors', 'mentors', 'researchers', 'partners', 'volunteers'].includes(activeTab)) {
      const role = activeTab.slice(0, -1);
      const items = getFilteredRegistrants(role);
      headers = ['Ø§Ù„ØªØ§Ø±ÙŠØ®', 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„', 'Ø§Ù„Ø¬Ù‡Ø© / Ø§Ù„Ù…Ø¤Ø³Ø³Ø©', 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ', 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ', 'Ø§Ù„Ø±Ù‚Ù… Ø§Ù„Ù‚ÙˆÙ…ÙŠ', 'Ø§Ù„Ø­Ø§Ù„Ø©', 'Ø±Ø§Ø¨Ø· Ø§Ù„Ø³ÙŠØ±Ø© Ø§Ù„Ø°Ø§ØªÙŠØ©'];
      dataToExport = items.map(r => [
        new Date(r.created_at).toLocaleDateString('ar-EG'),
        r.full_name,
        r.organization,
        r.email,
        r.phone,
        r.details?.nationalId || '',
        r.status || 'ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ',
        r.cv_url || ''
      ]);
      
      const roleNamesAr = {
        speaker: 'Ø§Ù„Ù…ØªØ­Ø¯Ø«ÙˆÙ†',
        startup: 'Ø§Ù„Ø´Ø±ÙƒØ§Øª_Ø§Ù„Ù†Ø§Ø´Ø¦Ø©',
        investor: 'Ø§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙˆÙ†',
        mentor: 'Ø§Ù„Ù…ÙˆØ¬Ù‡ÙˆÙ†',
        researcher: 'Ø§Ù„Ø¨Ø§Ø­Ø«ÙˆÙ†_ÙˆØ§Ù„Ù…Ø¨ØªÙƒØ±ÙˆÙ†',
        partner: 'Ø§Ù„Ø´Ø±ÙƒØ§Ø¡_ÙˆØ§Ù„Ø±Ø¹Ø§Ø©',
        volunteer: 'Ø§Ù„Ù…ØªØ·ÙˆØ¹ÙˆÙ†'
      };
      filename = `${roleNamesAr[role] || 'Ø§Ù„Ù…Ø³Ø¬Ù„ÙˆÙ†'}.csv`;
    } else if (activeTab === 'news') {
      headers = ['Ø§Ù„ØªØ§Ø±ÙŠØ®', 'Ø§Ù„Ø¹Ù†ÙˆØ§Ù†', 'Ø§Ù„ÙƒØ§ØªØ¨ / Ø§Ù„Ù†Ø§Ø´Ø±', 'Ø§Ù„Ù…Ø­ØªÙˆÙ‰'];
      dataToExport = newsList.map(n => [
        new Date(n.created_at).toLocaleDateString('ar-EG'),
        n.title,
        n.uploader_name,
        n.content
      ]);
      filename = 'Ø§Ù„Ø£Ø®Ø¨Ø§Ø±.csv';
    } else if (activeTab === 'jobs') {
      headers = ['Ø§Ù„ØªØ§Ø±ÙŠØ®', 'Ø§Ù„Ù…Ø³Ù…Ù‰ Ø§Ù„ÙˆØ¸ÙŠÙÙŠ', 'Ø§Ù„Ø´Ø±ÙƒØ©', 'Ø§Ù„Ù…ÙˆÙ‚Ø¹', 'Ø§Ù„Ù†ÙˆØ¹', 'Ø§Ù„Ø®Ø¨Ø±Ø©', 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„ÙˆØ¸ÙŠÙØ©'];
      dataToExport = jobs.map(j => [
        j.created_at ? new Date(j.created_at).toLocaleDateString('ar-EG') : '',
        j.title,
        j.company,
        j.location,
        j.type,
        j.experience,
        j.details || ''
      ]);
      filename = 'Ø´ÙˆØ§ØºØ±_Ø§Ù„ÙˆØ¸Ø§Ø¦Ù.csv';
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
      const matchesStatus = statusFilter === 'Ø§Ù„ÙƒÙ„' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredResearch = () => {
    return appliedResearch.filter(r => {
      const matchesSearch = r.pi_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.pi_faculty.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.pi_email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'Ø§Ù„ÙƒÙ„' || r.status === statusFilter;
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
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E3A8A]/80 to-[#0F172A] px-4 relative overflow-hidden" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {/* Decorative background glows */}
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
            { id: 'overview', label: 'نظرة عامة', count: null, icon: BarChart2, roles: ['superAdmin', 'academic'] },
            { id: 'graduation', label: 'مشروعات التخرج', count: stats.totalGP, icon: GraduationCap, roles: ['superAdmin', 'academic'] },
            { id: 'research', label: 'البحوث التطبيقية', count: stats.totalAR, icon: BookOpen, roles: ['superAdmin', 'academic'] },
            { id: 'news', label: 'الأخبار الإعلانية', count: newsList.length, icon: Newspaper, roles: ['superAdmin'] },
            { id: 'jobs', label: 'وظائف الملتقى', count: jobs.length, icon: Briefcase, roles: ['superAdmin'] },
            { id: 'exhibition_innovations', label: 'معرض الابتكارات', count: innovations.length, icon: Sparkles, roles: ['superAdmin'] },
            { id: 'exhibition_products', label: 'معرض الوحدات', count: products.length, icon: ShoppingBag, roles: ['superAdmin'] },
            { id: 'speakers', label: 'المتحدثون والمدربون', count: stats.totalSpeakers, icon: Presentation, roles: ['superAdmin'] },
            { id: 'startups', label: 'الشركات الناشئة', count: stats.totalStartups, icon: Briefcase, roles: ['superAdmin'] },
            { id: 'investors', label: 'المستثمرون للتمويل', count: stats.totalInvestors, icon: Users, roles: ['superAdmin'] },
            { id: 'mentors', label: 'الموجهون والإرشاد', count: stats.totalMentors, icon: Users, roles: ['superAdmin'] },
            { id: 'researchers', label: 'الباحثون / المبتكرون', count: stats.totalResearchers, icon: BookOpen, roles: ['superAdmin'] },
            { id: 'partners', label: 'الشركاء والجهات الراعية', count: stats.totalPartners, icon: Users, roles: ['superAdmin'] },
            { id: 'volunteers', label: 'لجان التطوع والتنظيم', count: stats.totalVolunteers, icon: Users, roles: ['superAdmin'] },
            { id: 'profile', label: 'الملف الشخصي', count: null, icon: Users, roles: ['superAdmin', 'academic'] },
          ].filter(tab => tab.roles.includes(adminRole)).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 group cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#F4A217] to-amber-500 text-[#1E3A8A] shadow-lg shadow-amber-500/20'
                  : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <tab.icon className={`w-4 h-4 shrink-0 transition-colors ${activeTab === tab.id ? 'text-[#1E3A8A]' : 'text-blue-300/60 group-hover:text-white'}`} />
                <span>{tab.label}</span>
              </div>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
                  activeTab === tab.id ? 'bg-[#1E3A8A] text-white' : 'bg-white/10 text-slate-300'
                }`}>
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
              placeholder="Ø§Ù„Ø¨Ø­Ø« Ø§Ù„ÙÙˆØ±ÙŠ Ø¨Ø§Ù„Ø§Ø³Ù…ØŒ Ø§Ù„ÙƒÙ„ÙŠØ©ØŒ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ..."
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
                <span>Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù†Ø´Ø·Ø©</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ©</span>
              </div>
            )}

            <button onClick={fetchData} className="p-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95" title="ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button onClick={handleLogout} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95 border border-red-100">
              Ø®Ø±ÙˆØ¬
            </button>
          </div>
        </header>

        {/* Content Body Grid */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {loading ? (
            <div className="py-20 text-center text-slate-500 font-bold flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#1E3A8A]" />
              <span>Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª...</span>
            </div>
          ) : (
            <>
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
                          Ù‚Ù…Ø© Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ù…Ù†ÙŠØ§ Ù„Ù„Ø§Ø¨ØªÙƒØ§Ø± ÙˆØ±ÙŠØ§Ø¯Ø© Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ 2026
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">ÙŠÙˆÙ…Ùƒ Ø³Ø¹ÙŠØ¯ØŒ ÙŠØ§ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ù‚Ù…Ø©!</h2>
                        <p className="text-slate-200 text-sm max-w-lg leading-relaxed font-semibold">Ù…ØªØ§Ø¨Ø¹Ø© ÙƒØ§ÙØ© Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ù…Ø¨ØªÙƒØ±ÙŠÙ† ÙˆØ§Ù„Ø¨Ø§Ø­Ø«ÙŠÙ†ØŒ ÙˆØ¥Ø¯Ø§Ø±Ø© Ù…Ø¹Ø§Ø±Ø¶ Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø± ÙˆØ¬Ø¯ÙˆÙ„ Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ§Øª Ø¨Ù†Ø¬Ø§Ø­.</p>
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
                        { title: 'Ù…Ø´Ø±ÙˆØ¹Ø§Øª Ø§Ù„ØªØ®Ø±Ø¬', value: stats.totalGP, label: 'Ù…Ø´Ø±ÙˆØ¹ Ù…Ø¶Ø§Ù', color: 'text-blue-700', bg: 'bg-emerald-50', svgColor: 'text-emerald-600', percent: '+14%' },
                        { title: 'Ø§Ù„Ø¨Ø­ÙˆØ« Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠØ©', value: stats.totalAR, label: 'Ø¨Ø­Ø« ØªØ·Ø¨ÙŠÙ‚ÙŠ', color: 'text-[#1E3A8A]', bg: 'bg-[#1E3A8A]/10', svgColor: 'text-[#1E3A8A]', percent: '+8%' },
                        { title: 'Ø§Ø¨ØªÙƒØ§Ø±Ø§Øª Ø§Ù„Ù…Ø¹Ø±Ø¶', value: innovations.length, label: 'Ø§Ø¨ØªÙƒØ§Ø± ØªÙ‚Ù†ÙŠ', color: 'text-[#F4A217]', bg: 'bg-[#F4A217]/10', svgColor: 'text-[#F4A217]', percent: '+22%' },
                        { title: 'ÙˆØ¸Ø§Ø¦Ù ÙˆØ´ÙˆØ§ØºØ±', value: jobs.length, label: 'ÙˆØ¸ÙŠÙØ© Ø´Ø§ØºØ±Ø©', color: 'text-amber-600', bg: 'bg-amber-50', svgColor: 'text-amber-500', percent: '+18%' }
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
                                    {hoveredDot.split('-')[1] === '0' ? 'Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ 1: ' :
                                     hoveredDot.split('-')[1] === '1' ? 'Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ 2: ' :
                                     hoveredDot.split('-')[1] === '2' ? 'Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ 3: ' : 'Ø§Ù„Ø­Ø§Ù„ÙŠ: '}
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
                          <h4 className="font-black text-slate-800 text-lg">ÙØ­Øµ ÙˆÙ…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø·Ù„Ø¨Ø§Øª</h4>
                          <span className="text-xs font-bold text-[#1E3A8A] bg-[#1E3A8A]/10 px-3 py-1 rounded-full">ØªØ­Ø¯ÙŠØ« ÙÙˆØ±ÙŠ</span>
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
                                {hoveredLegendIdx === 0 ? 'Ù…ØªØ­Ø¯Ø« Ù…Ù‚Ø¨ÙˆÙ„' :
                                 hoveredLegendIdx === 1 ? 'Ø´Ø±ÙƒØ© Ù…Ù‚Ø¨ÙˆÙ„Ø©' :
                                 hoveredLegendIdx === 2 ? 'Ù…Ø³ØªØ«Ù…Ø± Ù…Ù‚Ø¨ÙˆÙ„' : 'ØªØ­Øª Ø§Ù„ÙØ­Øµ'}
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
                              <span>Ø§Ù„Ù…ØªØ­Ø¯Ø«ÙˆÙ†: {stats.totalSpeakers}</span>
                            </div>
                            <div 
                              className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors group"
                              onMouseEnter={() => setHoveredLegendIdx(1)}
                              onMouseLeave={() => setHoveredLegendIdx(null)}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover:scale-125 transition-transform"></span> 
                              <span>Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù†Ø§Ø´Ø¦Ø©: {stats.totalStartups}</span>
                            </div>
                            <div 
                              className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors group"
                              onMouseEnter={() => setHoveredLegendIdx(2)}
                              onMouseLeave={() => setHoveredLegendIdx(null)}
                            >
                              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] group-hover:scale-125 transition-transform"></span> 
                              <span>Ø§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙˆÙ†: {stats.totalInvestors}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chart Right: Plans progress bars */}
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col justify-between h-[300px]">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-black text-slate-800 text-lg">Ù†Ø³Ø¨ Ø§ÙƒØªÙ…Ø§Ù„ Ù„Ø¬Ø§Ù† Ø§Ù„ØªÙ†Ø¸ÙŠÙ…</h4>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ù„Ø¬Ø§Ù†</span>
                        </div>
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          {[
                            { name: 'Ù„Ø¬Ù†Ø© Ø§Ù„Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ ÙˆØ§Ù„ØªØ³Ø¬ÙŠÙ„', percent: 84, color: 'bg-[#1E3A8A]' },
                            { name: 'Ù„Ø¬Ù†Ø© Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„Ø¹Ù„Ù…ÙŠ ÙˆØ§Ù„ÙÙ†ÙŠ', percent: 70, color: 'bg-amber-500' },
                            { name: 'Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ø§Ù„Ø´Ø±ÙƒØ§Øª ÙˆØ§Ù„Ù…Ø³ØªØ«Ù…Ø±ÙŠÙ†', percent: 55, color: 'bg-[#F4A217]' }
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

                      <h3 className="font-black text-slate-800 text-lg">Ø£Ø¯Ù…Ù† Ø§Ù„Ù‚Ù…Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ</h3>
                      <span className="text-xs text-slate-400 font-bold mb-6">Ø±Ø¦ÙŠØ³ Ù„Ø¬Ù†Ø© Ø§Ù„Ø¥Ø´Ø±Ø§Ù Ø§Ù„Ø¹Ø§Ù…</span>
                      
                      <div className="w-full border-t border-slate-100 pt-6 space-y-4 text-right">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">Ø­Ø§Ù„Ø© Ø§Ù„Ø®Ø§Ø¯Ù…:</span>
                          <span className="text-emerald-600">Ù†Ø´Ø· ÙˆØµØ­ÙŠ</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">Ù†ÙˆØ¹ Ø§Ù„Ø§ØªØµØ§Ù„:</span>
                          <span className="text-slate-700">{isSupabaseConfigured ? 'Supabase SDK' : 'LocalStorage fallback'}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">ØªØ§Ø±ÙŠØ® ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„:</span>
                          <span className="text-slate-700">Ø§Ù„ÙŠÙˆÙ… 11:00 Øµ</span>
                        </div>
                      </div>
                    </div>

                    {/* Summit Milestones Calendar */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
                      <div>
                        <h4 className="font-black text-slate-800 text-base mb-1">Ø¬Ø¯ÙˆÙ„ ÙØ¹Ø§Ù„ÙŠØ§Øª Ø§Ù„Ù‚Ù…Ø©</h4>
                        <p className="text-[10px] text-slate-400 font-semibold">Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„ÙØªØ±Ø§Øª Ø§Ù„Ø²Ù…Ù†ÙŠØ© Ù„Ù„ÙØ¹Ø§Ù„ÙŠØ§Øª</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/50">
                        {[
                          { day: 'Ø§Ù„ÙŠÙˆÙ… Ø§Ù„Ø£ÙˆÙ„', label: 'Ø§ÙØªØªØ§Ø­ ÙˆÙ‚Ø¨ÙˆÙ„', active: true },
                          { day: 'Ø§Ù„ÙŠÙˆÙ… Ø§Ù„Ø«Ø§Ù†ÙŠ', label: 'ÙˆØ±Ø´ ÙˆØªÙ‚ÙŠÙŠÙ…', active: false },
                          { day: 'Ø§Ù„ÙŠÙˆÙ… Ø§Ù„Ø«Ø§Ù„Ø«', label: 'Ø­ÙÙ„ Ø§Ù„Ø®ØªØ§Ù…', active: false }
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
                          { time: '02:00 Ù…', task: 'Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ ÙˆÙØ­Øµ Ø·Ù„Ø¨Ø§Øª Ù…Ø´Ø±ÙˆØ¹Ø§Øª Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª', type: 'Ø±Ø¦ÙŠØ³ÙŠ' },
                          { time: '02:30 Ù…', task: 'ØªÙ‚ÙŠÙŠÙ… Ø§Ù„Ø¨Ø­ÙˆØ« Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠØ© Ù„Ù‚Ø³Ù… Ø§Ù„Ù‡Ù†Ø¯Ø³Ø©', type: 'ÙØ±Ø¹ÙŠ' },
                          { time: '03:00 Ù…', task: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ù…ØªØ­Ø¯Ø«ÙŠÙ† ÙˆØ§Ù„Ù…Ø¯Ø±Ø¨ÙŠÙ† Ø§Ù„Ø£Ø¬Ø§Ù†Ø¨', type: 'Ø±Ø¦ÙŠØ³ÙŠ' },
                          { time: '03:50 Ù…', task: 'Ø­ØµØ± Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…Ø³Ø¬Ù„ÙŠÙ† Ø¨Ù…Ù„ØªÙ‚Ù‰ Ø§Ù„ØªÙˆØ¸ÙŠÙ', type: 'Ø±ØµØ¯' }
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
                        placeholder="Ø§Ø¨Ø­Ø« Ø¨Ø§Ù„Ø§Ø³Ù…ØŒ Ø§Ù„ÙƒÙ„ÙŠØ©ØŒ Ø§Ù„Ø¨Ø±ÙŠØ¯..."
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
                        <option value="Ø§Ù„ÙƒÙ„">ÙƒÙ„ Ø§Ù„Ø­Ø§Ù„Ø§Øª</option>
                        <option value="ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø·Ù„Ø¨">ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø·Ù„Ø¨</option>
                        <option value="ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ">ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ</option>
                        <option value="ØªØ­Øª Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„ÙÙ†ÙŠ">ØªØ­Øª Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„ÙÙ†ÙŠ</option>
                        <option value="ØªØ­Øª Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø§Ù„ÙÙƒØ±ÙŠØ©">ØªØ­Øª Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø§Ù„ÙÙƒØ±ÙŠØ©</option>
                        <option value="Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©">Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©</option>
                      </select>
                    )}
                    <button
                      onClick={handleExportToExcel}
                      className="bg-emerald-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer hover:-translate-y-0.5 border border-blue-500"
                      title="ØªØµØ¯ÙŠØ± Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø¥Ù„Ù‰ Ù…Ù„Ù Ø¥ÙƒØ³ÙŠÙ„ CSV"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>ØªØµØ¯ÙŠØ± Ø¥Ù„Ù‰ Ø¥ÙƒØ³ÙŠÙ„</span>
                    </button>
                  </div>

                  {/* DATA CONTAINER */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden p-6 md:p-8">

              {/* --- NEWS TAB --- */}
              {activeTab === 'news' && !selectedItem && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-xl font-black text-[#1E3A8A] mb-1">Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø£Ø®Ø¨Ø§Ø±</h3>
                      <p className="text-sm text-slate-500 font-bold">Ø¥Ø¶Ø§ÙØ© ÙˆØªØ¹Ø¯ÙŠÙ„ ÙˆØ­Ø°Ù Ø§Ù„Ø£Ø®Ø¨Ø§Ø± Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø© ÙÙŠ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.</p>
                    </div>
                    <button 
                      onClick={() => setIsNewsModalOpen(true)}
                      className="bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0"
                    >
                      + Ø¥Ø¶Ø§ÙØ© Ø®Ø¨Ø± Ø¬Ø¯ÙŠØ¯
                    </button>
                  </div>

                  {newsList.length === 0 ? (
                    <div className="py-20 text-center text-slate-500 font-bold bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                      Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£Ø®Ø¨Ø§Ø± Ù…Ø¶Ø§ÙØ© Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.
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
                                <span className="text-xs font-bold">Ù„Ø§ ØªÙˆØ¬Ø¯ ØµÙˆØ±Ø©</span>
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
                               <button onClick={() => openEditNewsModal(newsItem)} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors">ØªØ¹Ø¯ÙŠÙ„</button>
                               <button onClick={() => handleDeleteNews(newsItem.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">Ø­Ø°Ù</button>
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
                      <h3 className="text-xl font-black text-[#1E3A8A] mb-1">Ø¥Ø¯Ø§Ø±Ø© ÙˆØ¸Ø§Ø¦Ù Ø§Ù„Ù…Ù„ØªÙ‚Ù‰</h3>
                      <p className="text-sm text-slate-500 font-bold">Ø¥Ø¶Ø§ÙØ© ÙˆØªØ¹Ø¯ÙŠÙ„ ÙˆØ­Ø°Ù Ø§Ù„ÙˆØ¸Ø§Ø¦Ù Ø§Ù„Ø´Ø§ØºØ±Ø© Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø© Ù„Ù„Ø·Ù„Ø§Ø¨ ÙˆØ§Ù„Ø®Ø±ÙŠØ¬ÙŠÙ† Ø¨Ø§Ù„Ù…Ù„ØªÙ‚Ù‰.</p>
                    </div>
                    <button 
                      onClick={openAddJobModal}
                      className="bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>+ Ø¥Ø¶Ø§ÙØ© ÙˆØ¸ÙŠÙØ© Ø¬Ø¯ÙŠØ¯Ø©</span>
                    </button>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="py-20 text-center text-slate-500 font-bold bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                      Ù„Ø§ ØªÙˆØ¬Ø¯ ÙˆØ¸Ø§Ø¦Ù Ù…Ø¶Ø§ÙØ© Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                            <th className="p-4">Ø´Ø¹Ø§Ø± Ø§Ù„Ø´Ø±ÙƒØ©</th>
                            <th className="p-4">Ø§Ù„Ù…Ø³Ù…Ù‰ Ø§Ù„ÙˆØ¸ÙŠÙÙŠ</th>
                            <th className="p-4">Ø§Ù„Ø´Ø±ÙƒØ©</th>
                            <th className="p-4">Ø§Ù„Ù…ÙˆÙ‚Ø¹</th>
                            <th className="p-4">Ø§Ù„Ù†ÙˆØ¹</th>
                            <th className="p-4">Ø§Ù„Ø®Ø¨Ø±Ø©</th>
                            <th className="p-4 text-center">Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
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
                                    ØªØ¹Ø¯ÙŠÙ„
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteJob(j.id)} 
                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                                  >
                                    Ø­Ø°Ù
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
                        <th className="p-4">ØªØ§Ø±ÙŠØ® Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…</th>
                        <th className="p-4">Ø§Ø³Ù… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹</th>
                        <th className="p-4">Ø§Ù„ÙƒÙ„ÙŠØ© ÙˆØ§Ù„Ø¬Ø§Ù…Ø¹Ø©</th>
                        <th className="p-4">Ø§Ù„Ù†ÙˆØ¹</th>
                        <th className="p-4">Ø§Ù„Ø­Ø§Ù„Ø©</th>
                        <th className="p-4 text-center">Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredGradProjects().length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ø´Ø±ÙˆØ¹Ø§Øª ØªØ®Ø±Ø¬ Ù…Ø·Ø§Ø¨Ù‚Ø© Ù„Ù„Ø¨Ø­Ø«</td></tr>
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
                                p.status === 'Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©' ? 'bg-green-100 text-green-700' :
                                p.status.includes('ØªØ­Øª') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{p.status}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => { setSelectedItem(p); setSelectedType('graduation'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                  <Eye className="w-4 h-4" /> ÙØ­Øµ Ø§Ù„ØªÙØ§ØµÙŠÙ„
                                </button>
                                <button onClick={() => handleDeleteItem(p.id, 'graduation')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs" title="Ø­Ø°Ù">
                                  <Trash className="w-3.5 h-3.5" /> Ø­Ø°Ù
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
                        <th className="p-4">ØªØ§Ø±ÙŠØ® Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…</th>
                        <th className="p-4">Ø§Ù„Ø¨Ø§Ø­Ø« Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ</th>
                        <th className="p-4">Ø§Ù„ÙƒÙ„ÙŠØ© ÙˆØ§Ù„Ø¬Ø§Ù…Ø¹Ø©</th>
                        <th className="p-4">Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ</th>
                        <th className="p-4">Ø§Ù„Ø­Ø§Ù„Ø©</th>
                        <th className="p-4 text-center">Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredResearch().length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨Ø­ÙˆØ« ØªØ·Ø¨ÙŠÙ‚ÙŠØ© Ù…Ø·Ø§Ø¨Ù‚Ø© Ù„Ù„Ø¨Ø­Ø«</td></tr>
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
                                r.status === 'Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©' ? 'bg-green-100 text-green-700' :
                                r.status.includes('ØªØ­Øª') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{r.status}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => { setSelectedItem(r); setSelectedType('research'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                  <Eye className="w-4 h-4" /> ÙØ­Øµ Ø§Ù„ØªÙØ§ØµÙŠÙ„
                                </button>
                                <button onClick={() => handleDeleteItem(r.id, 'research')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs" title="Ø­Ø°Ù">
                                  <Trash className="w-3.5 h-3.5" /> Ø­Ø°Ù
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
                        <th className="p-4">Ø§Ù„ØªØ§Ø±ÙŠØ®</th>
                        <th className="p-4">Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„</th>
                        <th className="p-4">Ø§Ù„Ø¬Ù‡Ø© / Ø§Ù„Ù…Ø¤Ø³Ø³Ø©</th>
                        <th className="p-4">Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ</th>
                        <th className="p-4">Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ</th>
                        <th className="p-4 text-center">Ø§Ù„Ù…Ù„Ù / Ø§Ù„Ø³ÙŠØ±Ø© Ø§Ù„Ø°Ø§ØªÙŠØ©</th>
                        <th className="p-4">Ø§Ù„Ø­Ø§Ù„Ø©</th>
                        <th className="p-4 text-center">Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredRegistrants(activeTab.slice(0, -1)).length === 0 ? (
                        <tr><td colSpan="8" className="p-8 text-center text-slate-400 font-bold">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø³Ø¬Ù„ÙˆÙ† ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù‚Ø³Ù…</td></tr>
                      ) : (
                        getFilteredRegistrants(activeTab.slice(0, -1)).map(r => (
                          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">{new Date(r.created_at).toLocaleDateString('ar-EG')}</td>
                            <td className="p-4 font-black text-slate-800">
                              <div>{r.full_name}</div>
                              {r.details.nationalId && <div className="text-xs text-purple-700 font-bold mt-1">Ø§Ù„Ø±Ù‚Ù… Ø§Ù„Ù‚ÙˆÙ…ÙŠ: {r.details.nationalId}</div>}
                              {r.details.speechTopic && <div className="text-xs text-[#1E3A8A] font-bold mt-1">Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹: {r.details.speechTopic}</div>}
                              {r.details.startupName && <div className="text-xs text-[#F4A217] font-bold mt-1">Ø§Ù„Ø´Ø±ÙƒØ© Ø§Ù„Ù†Ø§Ø´Ø¦Ø©: {r.details.startupName}</div>}
                              {r.details.researchTitle && <div className="text-xs text-blue-600 font-bold mt-1">Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø¨Ø­Ø«: {r.details.researchTitle}</div>}
                              {r.details.companyName && <div className="text-xs text-indigo-600 font-bold mt-1">Ø§Ù„Ù…Ø¤Ø³Ø³Ø©: {r.details.companyName} ({r.details.partnerType})</div>}
                              {r.details.volunteerCommittee && <div className="text-xs text-emerald-600 font-bold mt-1">Ù„Ø¬Ù†Ø© Ø§Ù„ØªØ·ÙˆØ¹: {r.details.volunteerCommittee}</div>}
                            </td>
                            <td className="p-4 font-bold text-slate-600">{r.organization}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.email}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.phone}</td>
                            <td className="p-4 text-center">
                              {r.cv_url && r.cv_url !== '#' ? (
                                <a href={r.cv_url} target="_blank" className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs">
                                  <Download className="w-3.5 h-3.5" /> ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù„Ù
                                </a>
                              ) : (
                                <span className="text-slate-400 font-bold text-xs">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø±ÙÙ‚</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                r.status === 'Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©' ? 'bg-green-100 text-green-700' :
                                (r.status || '').includes('ØªØ­Øª') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{r.status || 'ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ'}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                {r.status === 'Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©' ? (
                                  <button 
                                    onClick={() => handleStatusChange(r.id, 'registration', 'ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ')}
                                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold text-xs transition-colors whitespace-nowrap"
                                  >
                                    Ø¥Ù„ØºØ§Ø¡ Ø§Ù„Ù‚Ø¨ÙˆÙ„
                                  </button>
                                ) : (
                                  <div className="flex flex-col items-center gap-1">
                                    <button 
                                      onClick={() => handleStatusChange(r.id, 'registration', 'Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©')}
                                      disabled={!r.cv_url || r.cv_url === '#'}
                                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-sm whitespace-nowrap ${
                                        (!r.cv_url || r.cv_url === '#') 
                                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                                          : 'bg-green-600 hover:bg-green-700 text-white'
                                      }`}
                                      title={(!r.cv_url || r.cv_url === '#') ? 'ÙŠØ±Ø¬Ù‰ Ø±ÙØ¹ Ø§Ù„Ø³ÙŠØ±Ø© Ø§Ù„Ø°Ø§ØªÙŠØ© Ø£ÙˆÙ„Ø§Ù‹ Ù„ØªØªÙ…ÙƒÙ† Ù…Ù† Ø§Ù„Ù‚Ø¨ÙˆÙ„' : ''}
                                    >
                                      Ù…ÙˆØ§ÙÙ‚Ø© ÙˆÙ‚Ø¨ÙˆÙ„
                                    </button>
                                    {(!r.cv_url || r.cv_url === '#') && (
                                      <span className="text-[9px] text-red-500 font-bold whitespace-nowrap">ÙŠØ¬Ø¨ Ø±ÙØ¹ Ø§Ù„Ù€ CV Ø£ÙˆÙ„Ø§Ù‹</span>
                                    )}
                                  </div>
                                )}
                                <button 
                                  onClick={() => handleDeleteItem(r.id, 'registration')} 
                                  className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs" 
                                  title="Ø­Ø°Ù Ø§Ù„Ø­Ø³Ø§Ø¨"
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
                    <h3 className="text-lg font-black text-slate-800">Ø¥Ø¯Ø§Ø±Ø© Ù…Ø¹Ø±ÙˆØ¶Ø§Øª Ù…Ø¹Ø±Ø¶ Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø±Ø§Øª Ø§Ù„Ø±Ù‚Ù…ÙŠØ© ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ</h3>
                    <button 
                      onClick={openAddInnovationModal}
                      className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
                    >
                      <Plus className="w-4 h-4" /> Ø¥Ø¶Ø§ÙØ© Ø§Ø¨ØªÙƒØ§Ø± Ø¬Ø¯ÙŠØ¯
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {innovations.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
                        Ù„Ø§ ØªÙˆØ¬Ø¯ Ø§Ø¨ØªÙƒØ§Ø±Ø§Øª Ù…Ø¶Ø§ÙØ© Ø­Ø§Ù„ÙŠØ§Ù‹. Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø²Ø± Ø¨Ø§Ù„Ø£Ø¹Ù„Ù‰ Ù„Ø¥Ø¶Ø§ÙØ© Ø£ÙˆÙ„ Ø§Ø¨ØªÙƒØ§Ø±.
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
                                {item.category === 'ai' ? 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ' : 
                                 item.category === 'cyber' ? 'Ø£Ù…Ù† Ø³ÙŠØ¨Ø±Ø§Ù†ÙŠ' :
                                 item.category === 'iot' ? 'Ø¥Ù†ØªØ±Ù†Øª Ø£Ø´ÙŠØ§Ø¡' : 'ØªØ·Ø¨ÙŠÙ‚Ø§Øª ÙˆÙŠØ¨/Ø¬ÙˆØ§Ù„'}
                              </span>
                            </div>
                            <div className="p-6 space-y-3">
                              <span className="text-[10px] font-black text-slate-400">{item.team}</span>
                              <h4 className="font-black text-slate-800 text-base leading-snug line-clamp-1">{item.name}</h4>
                              <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">{item.desc}</p>
                              
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                <span>Ø§Ù„Ù…Ø³ØªÙˆÙ‰: <strong className="text-blue-600">{item.levelName || item.level}</strong></span>
                                <span>Ø§Ù„ØªÙ‚Ù†ÙŠØ©: <strong>{item.stats?.tech || item.tech || 'Python'}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2">
                            <button 
                              onClick={() => openEditInnovationModal(item)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> ØªØ¹Ø¯ÙŠÙ„
                            </button>
                            <button 
                              onClick={() => handleDeleteInnovation(item.id)}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" /> Ø­Ø°Ù
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
                    <h3 className="text-lg font-black text-slate-800">Ø¥Ø¯Ø§Ø±Ø© Ù…Ø¹Ø±ÙˆØ¶Ø§Øª ÙˆÙ…Ù†ØªØ¬Ø§Øª Ø§Ù„ÙˆØ­Ø¯Ø§Øª Ø§Ù„Ø¥Ù†ØªØ§Ø¬ÙŠØ© Ø¨Ø§Ù„ÙƒÙ„ÙŠØ§Øª</h3>
                    <button 
                      onClick={openAddProductModal}
                      className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
                    >
                      <Plus className="w-4 h-4" /> Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
                        Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª Ù…Ø¶Ø§ÙØ© Ø­Ø§Ù„ÙŠØ§Ù‹. Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø²Ø± Ø¨Ø§Ù„Ø£Ø¹Ù„Ù‰ Ù„Ø¥Ø¶Ø§ÙØ© Ø£ÙˆÙ„ Ù…Ù†ØªØ¬.
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
                                <span>Ø§Ù„Ù‚Ø³Ù…: <strong className="text-indigo-600">{item.category}</strong></span>
                                <span>Ø§Ù„ØªÙ‚ÙŠÙŠÙ…: <strong>{item.rating || '4.8 (120)'}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2">
                            <button 
                              onClick={() => openEditProductModal(item)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> ØªØ¹Ø¯ÙŠÙ„
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(item.id)}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" /> Ø­Ø°Ù
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
                      <ArrowLeft className="w-4 h-4" /> Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø¬Ø¯ÙˆÙ„
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-400">ØªØ­Ø¯ÙŠØ« Ø­Ø§Ù„Ø© Ø§Ù„Ø·Ù„Ø¨:</span>
                      <select
                        value={selectedItem.status}
                        onChange={(e) => handleStatusChange(selectedItem.id, selectedType, e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-black text-sm text-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]"
                      >
                        <option value="ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø·Ù„Ø¨">ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø·Ù„Ø¨</option>
                        <option value="ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ">ØªØ­Øª Ø§Ù„ÙØ­Øµ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ</option>
                        <option value="ØªØ­Øª Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„ÙÙ†ÙŠ">ØªØ­Øª Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„ÙÙ†ÙŠ</option>
                        <option value="ØªØ­Øª Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø§Ù„ÙÙƒØ±ÙŠØ©">ØªØ­Øª Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø§Ù„ÙÙƒØ±ÙŠØ©</option>
                        <option value="Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©">Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù‚Ù…Ø©</option>
                      </select>
                    </div>
                  </div>

                  {/* GRADUATION PROJECT DETAIL VIEW */}
                  {selectedType === 'graduation' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <span className="text-xs font-bold text-slate-400 block mb-1">Ø§Ø³Ù… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ (Ø¹Ø±Ø¨ÙŠ / Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠ)</span>
                          <h2 className="text-2xl font-black text-[#1E3A8A]">{selectedItem.project_name_ar}</h2>
                          <p className="text-md text-slate-500 font-bold" dir="ltr">{selectedItem.project_name_en}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#1E3A8A] mb-3">Ù…Ù„Ø®Øµ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.projectSummary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#1E3A8A] mb-2">Ø§Ù„Ù…Ø´ÙƒÙ„Ø©</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.problemAddressed}</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#1E3A8A] mb-2">Ø§Ù„Ø­Ù„</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.solutionProvided}</p>
                          </div>
                        </div>

                        {/* Team members list */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#1E3A8A] mb-4">Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„ÙØ±ÙŠÙ‚ ({selectedItem.team_members?.length} Ø·Ù„Ø§Ø¨)</h4>
                          <div className="space-y-4">
                            {selectedItem.team_members?.map((m, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-2">
                                <div>
                                  <span className="font-black text-slate-800">{m.name}</span>
                                  <span className="text-xs bg-[#F4A217]/10 text-[#1E3A8A] px-2 py-0.5 rounded mr-2 font-bold">{m.role || 'Ø¹Ø¶Ùˆ'}</span>
                                </div>
                                <div className="text-xs font-semibold text-slate-500 flex flex-wrap gap-4">
                                  <span>Ø§Ù„ÙƒÙ„ÙŠØ©: {m.college}</span>
                                  <span>Ø§Ù„Ù‡Ø§ØªÙ: {m.phone}</span>
                                  <span>Ø§Ù„Ø¨Ø±ÙŠØ¯: {m.email}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Side project info & attachments */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-[#1E3A8A] border-b pb-2">Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù‚Ø±Ø± ÙˆØ§Ù„Ø¬Ø§Ù…Ø¹Ø©</h4>
                          <div>
                            <span className="text-xs text-slate-400 block">Ø§Ù„ÙƒÙ„ÙŠØ©</span>
                            <span className="font-bold text-slate-700">{selectedItem.college}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">Ø§Ù„Ù‚Ø³Ù…</span>
                            <span className="font-bold text-slate-700">{selectedItem.department}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">Ø³Ù†Ø© Ø§Ù„ØªØ®Ø±Ø¬</span>
                            <span className="font-bold text-slate-700">{selectedItem.year}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-[#1E3A8A] border-b pb-2">Ø§Ù„Ù…Ù„ÙØ§Øª ÙˆØ§Ù„Ù…Ø±ÙÙ‚Ø§Øª</h4>
                          {Object.keys(selectedItem.files || {}).length === 0 ? (
                            <span className="text-xs text-slate-400 font-bold">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù„ÙØ§Øª Ù…Ø±ÙÙˆØ¹Ø©</span>
                          ) : (
                            Object.entries(selectedItem.files).map(([key, url]) => (
                              <a 
                                href={url !== '#' ? url : undefined} 
                                onClick={(e) => {
                                  if (url === '#') {
                                    e.preventDefault();
                                    alert('Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ù…Ù„Ù ØºÙŠØ± Ù…ØªÙˆÙØ± Ø­Ø§Ù„ÙŠØ§Ù‹.');
                                  }
                                }}
                                target="_blank" 
                                rel="noreferrer"
                                key={key} 
                                className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {key === 'summaryPdf' ? 'Ù…Ù„Ø®Øµ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ PDF' :
                                   key === 'pitchDeck' ? 'Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…ÙŠ' :
                                   key === 'screenshot' ? 'ØµÙˆØ±Ø© Ù„Ù‚Ø·Ø© Ø§Ù„Ø´Ø§Ø´Ø©' : key}
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
                          <span className="text-xs font-bold text-slate-400 block mb-1">Ø§Ø³Ù… Ø§Ù„Ø¨Ø§Ø­Ø« Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ</span>
                          <h2 className="text-2xl font-black text-[#183059]">{selectedItem.pi_name}</h2>
                          <p className="text-md text-slate-500 font-bold">{selectedItem.pi_rank} - {selectedItem.pi_faculty}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-slate-800 mb-2">Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ© Ø¨Ø§Ù„Ø¨Ø­Ø«</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.problem}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-slate-800 mb-2">Ø§Ù„Ø­Ù„ ÙˆØ§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù…Ù‚ØªØ±Ø­</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.solution}</p>
                        </div>
                      </div>

                      {/* Research Side Panel */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø§ØªØµØ§Ù„ Ù„Ù„Ø¨Ø§Ø­Ø«</h4>
                          <div>
                            <span className="text-xs text-slate-400 block">Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_email}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_phone}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ø¹Ù„Ù…ÙŠ</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_dept}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">Ø§Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ø¨Ø­Ø«ÙŠØ©</h4>
                          {Object.keys(selectedItem.files || {}).length === 0 ? (
                            <span className="text-xs text-slate-400 font-bold">Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù„ÙØ§Øª Ù…Ø±ÙÙˆØ¹Ø©</span>
                          ) : (
                            Object.entries(selectedItem.files).map(([key, url]) => (
                              <a 
                                href={url !== '#' ? url : undefined} 
                                onClick={(e) => {
                                  if (url === '#') {
                                    e.preventDefault();
                                    alert('Ø¹Ø°Ø±Ø§Ù‹ØŒ Ù‡Ø°Ø§ Ø§Ù„Ù…Ù„Ù ØºÙŠØ± Ù…ØªÙˆÙØ± Ø­Ø§Ù„ÙŠØ§Ù‹.');
                                  }
                                }}
                                target="_blank" 
                                rel="noreferrer"
                                key={key} 
                                className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {key === 'researchPdf' ? 'Ù…Ù„Ù Ø§Ù„Ø¨Ø­Ø« Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ' :
                                   key === 'marketSummaryPdf' ? 'Ø§Ù„Ù…Ù„Ø®Øµ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠ' : key}
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
                  ? (exhibitionEditItem ? 'ØªØ¹Ø¯ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø±' : 'Ø¥Ø¶Ø§ÙØ© Ø§Ø¨ØªÙƒØ§Ø± Ø¬Ø¯ÙŠØ¯ Ù„Ù…Ø¹Ø±Ø¶ Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø±Ø§Øª')
                  : (exhibitionEditItem ? 'ØªØ¹Ø¯ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬' : 'Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯ Ù„Ù„ÙˆØ­Ø¯Ø§Øª Ø§Ù„Ø¥Ù†ØªØ§Ø¬ÙŠØ©')
                }
              </h2>
              <button 
                onClick={() => setIsExhibitionModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold"
              >
                âœ•
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-right" dir="rtl">
              {exhibitionModalType === 'innovation' ? (
                <form onSubmit={handleSaveInnovation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø± *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.name}
                        onChange={(e) => setInnovationFormData({...innovationFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ø³Ù… Ø§Ù„ÙØ±ÙŠÙ‚ / Ø§Ù„Ù…Ø¨ØªÙƒØ± *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.team}
                        onChange={(e) => setInnovationFormData({...innovationFormData, team: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„ØªØµÙ†ÙŠÙ *</label>
                      <select 
                        value={innovationFormData.category}
                        onChange={(e) => setInnovationFormData({...innovationFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      >
                        <option value="ai">Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ</option>
                        <option value="cyber">Ø§Ù„Ø£Ù…Ù† Ø§Ù„Ø³ÙŠØ¨Ø±Ø§Ù†ÙŠ</option>
                        <option value="iot">Ø¥Ù†ØªØ±Ù†Øª Ø§Ù„Ø£Ø´ÙŠØ§Ø¡</option>
                        <option value="apps">ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„ÙˆÙŠØ¨ ÙˆØ§Ù„Ø¬ÙˆØ§Ù„</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ø¬Ø§Ù‡Ø²ÙŠØ© *</label>
                      <select 
                        value={innovationFormData.level}
                        onChange={(e) => {
                          const val = e.target.value;
                          let name = 'Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ';
                          if (val === 'advanced') name = 'Ù…Ø³ØªÙˆÙ‰ Ù…ØªÙ‚Ø¯Ù…';
                          if (val === 'ready') name = 'Ø¬Ø§Ù‡Ø² Ù„Ù„ØªØ¨Ù†ÙŠ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ';
                          setInnovationFormData({...innovationFormData, level: val, levelName: name});
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      >
                        <option value="prototype">Ù†Ù…ÙˆØ°Ø¬ Ø£ÙˆÙ„ÙŠ</option>
                        <option value="advanced">Ù…Ø³ØªÙˆÙ‰ Ù…ØªÙ‚Ø¯Ù…</option>
                        <option value="ready">Ø¬Ø§Ù‡Ø² Ù„Ù„ØªØ¨Ù†ÙŠ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„ØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø©</label>
                      <input 
                        type="text" 
                        value={innovationFormData.tech}
                        onChange={(e) => setInnovationFormData({...innovationFormData, tech: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="Ù…Ø«Ø§Ù„: React / Node.js"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø£ÙŠÙ‚ÙˆÙ†Ø© Ø§Ù„Ø¹Ø±Ø¶ (Ø§Ø³Ù… Ø§Ù„Ø£ÙŠÙ‚ÙˆÙ†Ø©)</label>
                      <select 
                        value={innovationFormData.icon}
                        onChange={(e) => setInnovationFormData({...innovationFormData, icon: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      >
                        <option value="Cpu">Cpu (Ù…Ø¹Ø§Ù„Ø¬)</option>
                        <option value="Lock">Lock (Ù‚ÙÙ„ Ø­Ù…Ø§ÙŠØ©)</option>
                        <option value="Sprout">Sprout (Ø¨ÙŠØ¦ÙŠ / Ù†Ø¨Ø§Øª)</option>
                        <option value="Globe">Globe (Ø¥Ù†ØªØ±Ù†Øª / Ø´Ø¨ÙƒØ©)</option>
                        <option value="Database">Database (Ù‚ÙˆØ§Ø¹Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø±Ø§Ø¨Ø· ØµÙˆØ±Ø© Ø§Ù„Ø§Ø¨ØªÙƒØ§Ø±</label>
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
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„ÙˆØµÙ ÙˆØ§Ù„Ø´Ø±Ø­ *</label>
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
                      {exhibitionEditItem ? 'Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª' : 'Ø¥Ø¶Ø§ÙØ© Ù„Ù„Ø§Ø¨ØªÙƒØ§Ø±Ø§Øª'}
                    </button>
                    <button type="button" onClick={() => setIsExhibitionModalOpen(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
                      Ø¥Ù„ØºØ§Ø¡
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬ / Ø§Ù„Ø®Ø¯Ù…Ø© *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.name}
                        onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„ÙƒÙ„ÙŠØ© Ø§Ù„Ù…Ù†ØªØ¬Ø© *</label>
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
                        <option value="agriculture">ÙƒÙ„ÙŠØ© Ø§Ù„Ø²Ø±Ø§Ø¹Ø©</option>
                        <option value="science">ÙƒÙ„ÙŠØ© Ø§Ù„Ø¹Ù„ÙˆÙ…</option>
                        <option value="artedu">ÙƒÙ„ÙŠØ© Ø§Ù„ØªØ±Ø¨ÙŠØ© Ø§Ù„ÙÙ†ÙŠØ©</option>
                        <option value="specific">ÙƒÙ„ÙŠØ© Ø§Ù„ØªØ±Ø¨ÙŠØ© Ø§Ù„Ù†ÙˆØ¹ÙŠØ©</option>
                        <option value="engineering">ÙƒÙ„ÙŠØ© Ø§Ù„Ù‡Ù†Ø¯Ø³Ø©</option>
                        <option value="computers">ÙƒÙ„ÙŠØ© Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª ÙˆØ§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª</option>
                        <option value="pharmacy">ÙƒÙ„ÙŠØ© Ø§Ù„ØµÙŠØ¯Ù„Ø©</option>
                        <option value="finearts">ÙƒÙ„ÙŠØ© Ø§Ù„ÙÙ†ÙˆÙ† Ø§Ù„Ø¬Ù…ÙŠÙ„Ø©</option>
                        <option value="tourism">ÙƒÙ„ÙŠØ© Ø§Ù„Ø³ÙŠØ§Ø­Ø© ÙˆØ§Ù„ÙÙ†Ø§Ø¯Ù‚</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„ØªØµÙ†ÙŠÙ ÙˆØ§Ù„Ù‚Ø·Ø§Ø¹ *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.category}
                        onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="Ù…Ø«Ø§Ù„: Ù…Ù†ØªØ¬Ø§Øª Ø²Ø±Ø§Ø¹ÙŠØ© Ø£Ùˆ Ù…Ù†Ø¸ÙØ§Øª"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„ØªØ¬Ø§Ø±ÙŠ *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.price}
                        onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="Ù…Ø«Ø§Ù„: 150 Ø¬.Ù…"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø´Ø¹Ø§Ø± Ø§Ù„ØªØ³ÙˆÙŠÙ‚ (Tag) (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
                      <input 
                        type="text" 
                        value={productFormData.tag}
                        onChange={(e) => setProductFormData({...productFormData, tag: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                        placeholder="Ù…Ø«Ø§Ù„: Ø§Ù„Ø£ÙƒØ«Ø± Ù…Ø¨ÙŠØ¹Ø§Ù‹ Ø£Ùˆ Ø¹ØµØ± Ø¨Ø§Ø±Ø¯"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ù„ÙˆÙ† Ø§Ù„Ø´Ø¹Ø§Ø±</label>
                      <select 
                        value={productFormData.tagColor}
                        onChange={(e) => setProductFormData({...productFormData, tagColor: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] outline-none font-bold text-xs"
                      >
                        <option value="bg-emerald-600 text-white">Ø£Ø®Ø¶Ø± Ø²Ù…Ø±Ø¯ÙŠ</option>
                        <option value="bg-amber-500 text-white">Ø°Ù‡Ø¨ÙŠ / Ø¨Ø±ØªÙ‚Ø§Ù„ÙŠ</option>
                        <option value="bg-blue-600 text-white">Ø£Ø²Ø±Ù‚ Ø¯Ø§ÙƒÙ†</option>
                        <option value="bg-purple-600 text-white">Ø¨Ù†ÙØ³Ø¬ÙŠ ÙÙ†ÙŠ</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Ø±Ø§Ø¨Ø· ØµÙˆØ±Ø© Ø§Ù„Ù…Ù†ØªØ¬</label>
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
                      <label className="block text-xs font-bold text-slate-700 mb-2">ØªÙØ§ØµÙŠÙ„ ÙˆÙ…ÙˆØ§ØµÙØ§Øª Ø§Ù„Ù…Ù†ØªØ¬ *</label>
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
                      {exhibitionEditItem ? 'Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª' : 'Ø¥Ø¶Ø§ÙØ© Ù„Ù„Ù…Ù†ØªØ¬Ø§Øª'}
                    </button>
                    <button type="button" onClick={() => setIsExhibitionModalOpen(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
                      Ø¥Ù„ØºØ§Ø¡
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
              <h2 className="text-2xl font-black text-[#F4A217]">{editingNewsId ? 'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø®Ø¨Ø±' : 'Ø¥Ø¶Ø§ÙØ© Ø®Ø¨Ø± Ø¬Ø¯ÙŠØ¯'}</h2>
              <button 
                onClick={() => setIsNewsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold"
              >
                âœ•
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleSaveNews} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø®Ø¨Ø± *</label>
                  <input 
                    type="text" 
                    required
                    value={newNewsData.title}
                    onChange={(e) => setNewNewsData({...newNewsData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    placeholder="Ø§ÙƒØªØ¨ Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø®Ø¨Ø± Ù‡Ù†Ø§"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Ù…Ø­ØªÙˆÙ‰ ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø®Ø¨Ø± *</label>
                  <textarea 
                    required
                    rows={5}
                    value={newNewsData.content}
                    onChange={(e) => setNewNewsData({...newNewsData, content: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none resize-none"
                    placeholder="Ø§ÙƒØªØ¨ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø®Ø¨Ø± Ù‡Ù†Ø§..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Ø±Ø§Ø¨Ø· ØµÙˆØ±Ø© Ø§Ù„Ø®Ø¨Ø± (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
                  <input 
                    type="text" 
                    value={newNewsData.image_url}
                    onChange={(e) => setNewNewsData({...newNewsData, image_url: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                    placeholder="Ù…Ø«Ø§Ù„: https://example.com/image.jpg"
                  />
                  <p className="text-xs text-slate-500 mt-2 font-semibold">Ø¥Ø°Ø§ ØªØ±ÙƒØª Ù‡Ø°Ø§ Ø§Ù„Ø­Ù‚Ù„ ÙØ§Ø±ØºØ§Ù‹ØŒ Ø³ÙŠØªÙ… ÙˆØ¶Ø¹ Ø£ÙŠÙ‚ÙˆÙ†Ø© Ø§ÙØªØ±Ø§Ø¶ÙŠØ©.</p>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm"
                  >
                    {editingNewsId ? 'Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª' : 'Ù†Ø´Ø± Ø§Ù„Ø®Ø¨Ø±'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsNewsModalOpen(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                  >
                    Ø¥Ù„ØºØ§Ø¡
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
              <h2 className="text-2xl font-black text-[#F4A217]">{jobEditItem ? 'ØªØ¹Ø¯ÙŠÙ„ ÙˆØ¸ÙŠÙØ©' : 'Ø¥Ø¶Ø§ÙØ© ÙˆØ¸ÙŠÙØ© Ø¬Ø¯ÙŠØ¯Ø©'}</h2>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold cursor-pointer"
              >
                âœ•
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-right" dir="rtl">
              <form onSubmit={handleSaveJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„Ù…Ø³Ù…Ù‰ Ø§Ù„ÙˆØ¸ÙŠÙÙŠ *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.title}
                      onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="Ù…Ø«Ø§Ù„: Ù…Ù‡Ù†Ø¯Ø³ Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØ§Ø¬Ù‡Ø§Øª Ø£Ù…Ø§Ù…ÙŠØ©"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ø³Ù… Ø§Ù„Ø´Ø±ÙƒØ© *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.company}
                      onChange={(e) => setJobFormData({...jobFormData, company: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="Ù…Ø«Ø§Ù„: TechVision Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø§Ù„Ø¬ØºØ±Ø§ÙÙŠ *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.location}
                      onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="Ù…Ø«Ø§Ù„: Ø§Ù„Ù‚Ø±ÙŠØ© Ø§Ù„Ø°ÙƒÙŠØ©ØŒ Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Ø±Ø§Ø¨Ø· Ø§Ù„Ø´Ø¹Ø§Ø± (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
                    <input 
                      type="text" 
                      value={jobFormData.logo}
                      onChange={(e) => setJobFormData({...jobFormData, logo: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="Ù…Ø«Ø§Ù„: https://example.com/logo.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Ù†ÙˆØ¹ Ø§Ù„Ø¯ÙˆØ§Ù… *</label>
                    <select 
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({...jobFormData, type: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-bold text-xs"
                    >
                      <option value="Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„">Ø¯ÙˆØ§Ù… ÙƒØ§Ù…Ù„</option>
                      <option value="Ø¯ÙˆØ§Ù… Ø¬Ø²Ø¦ÙŠ">Ø¯ÙˆØ§Ù… Ø¬Ø²Ø¦ÙŠ</option>
                      <option value="Ø¹Ù† Ø¨ÙØ¹Ø¯ (Remote)">Ø¹Ù† Ø¨ÙØ¹Ø¯ (Remote)</option>
                      <option value="ØªØ¯Ø±ÙŠØ¨ (Internship)">ØªØ¯Ø±ÙŠØ¨ (Internship)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Ø§Ù„Ø®Ø¨Ø±Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({...jobFormData, experience: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs"
                      placeholder="Ù…Ø«Ø§Ù„: Ø­Ø¯ÙŠØ« Ø§Ù„ØªØ®Ø±Ø¬ØŒ 1-3 Ø³Ù†ÙˆØ§Øª"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">ØªÙØ§ØµÙŠÙ„ ÙˆØ´Ø±ÙˆØ· Ø§Ù„ÙˆØ¸ÙŠÙØ© *</label>
                  <textarea 
                    required
                    rows={4}
                    value={jobFormData.details}
                    onChange={(e) => setJobFormData({...jobFormData, details: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none font-semibold text-xs resize-none"
                    placeholder="Ø§ÙƒØªØ¨ Ù…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„ÙˆØ¸ÙŠÙØ© ÙˆÙˆØµÙ Ø§Ù„Ø¯ÙˆØ± Ø¨Ø§Ù„ØªÙØµÙŠÙ„..."
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#1E3A8A] hover:bg-[#1e3a8a] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {jobEditItem ? 'Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª' : 'Ø¥Ø¶Ø§ÙØ© Ø§Ù„ÙˆØ¸ÙŠÙØ©'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    Ø¥Ù„ØºØ§Ø¡
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


