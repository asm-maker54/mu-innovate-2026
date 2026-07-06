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
    project_name_ar: "┘å╪╕╪º┘à ╪º┘ä╪▒┘è ╪º┘ä╪░┘â┘è ╪¿╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪╡╪╖┘å╪º╪╣┘è",
    project_name_en: "AI-Powered Smart Irrigation System",
    college: "┘â┘ä┘è╪⌐ ╪º┘ä╪¡╪º╪│╪¿╪º╪¬ ┘ê╪º┘ä┘à╪╣┘ä┘ê┘à╪º╪¬ (╪¡┘â┘ê┘à┘è╪⌐)",
    department: "╪╣┘ä┘ê┘à ╪º┘ä╪¡╪º╪│╪¿",
    year: "2025/2026",
    project_type: "╪¼┘à╪º╪╣┘è",
    status: "╪¬┘à ╪º╪│╪¬┘ä╪º┘à ╪º┘ä╪╖┘ä╪¿",
    team_members: [
      { name: "╪ú╪¡┘à╪» ┘à╪¡┘à╪» ╪╣┘ä┘è", id: "202201", college: "╪º┘ä╪¡╪º╪│╪¿╪º╪¬", email: "ahmed@example.com", phone: "01000000001", role: "┘é╪º╪ª╪» ╪º┘ä┘ü╪▒┘è┘é" },
      { name: "╪│╪º╪▒╪⌐ ┘à╪¡┘à┘ê╪» ╪¡╪│┘å", id: "202202", college: "╪º┘ä╪¡╪º╪│╪¿╪º╪¬", email: "sara@example.com", phone: "01000000002", role: "┘à╪╖┘ê╪▒ ╪¿╪▒┘à╪¼┘è╪º╪¬" }
    ],
    files: { summaryPdf: "#", pitchDeck: "#", screenshot: "#" },
    details: { projectSummary: "┘å╪╕╪º┘à ┘à╪¬┘â╪º┘à┘ä ┘è╪╣╪¬┘à╪» ╪╣┘ä┘ë ┘à╪│╪¬╪┤╪╣╪▒╪º╪¬ ╪º┘ä╪▒╪╖┘ê╪¿╪⌐ ┘ê╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪╡╪╖┘å╪º╪╣┘è ┘ä╪¬╪▒╪┤┘è╪» ╪º╪│╪¬┘ç┘ä╪º┘â ╪º┘ä┘à┘è╪º┘ç ┘ü┘è ╪º┘ä╪¡┘é┘ê┘ä ╪º┘ä╪▓╪▒╪º╪╣┘è╪⌐ ╪¿╪╡╪╣┘è╪» ┘à╪╡╪▒.", problemAddressed: "╪º┘ä┘ç╪»╪▒ ╪º┘ä┘â╪¿┘è╪▒ ┘ü┘è ┘à┘è╪º┘ç ╪º┘ä╪▒┘è ╪º┘ä╪¬┘é┘ä┘è╪»┘è╪⌐.", solutionProvided: "╪▒┘è ╪░┘â┘è ╪¬┘ä┘é╪º╪ª┘è ┘è╪╢╪« ┘à┘è╪º┘ç┘ï╪º ╪¡╪│╪¿ ╪¡╪º╪¼╪⌐ ╪º┘ä╪¬╪▒╪¿╪⌐ ╪º┘ä╪»┘é┘è┘é╪⌐." }
  },
  {
    id: "g2",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    project_name_ar: "┘â╪▒╪│┘è ┘à╪¬╪¡╪▒┘â ╪░┘â┘è ┘ä╪░┘ê┘è ╪º┘ä┘ç┘à┘à",
    project_name_en: "Smart Wheelchair for Disabled",
    college: "┘â┘ä┘è╪⌐ ╪º┘ä┘ç┘å╪»╪│╪⌐ (╪¿╪▒┘å╪º┘à╪¼ ┘ç┘å╪»╪│╪⌐ ╪º┘ä┘à┘è┘â╪º╪¬╪▒┘ê┘å┘è╪º╪¬ ┘ê╪º┘ä╪▒┘ê╪¿┘ê╪¬╪º╪¬ ╪º┘ä╪╡┘å╪º╪╣┘è╪⌐) (╪ú┘ç┘ä┘è╪⌐)",
    department: "┘à┘è┘â╪º╪¬╪▒┘ê┘å┘è╪º╪¬",
    year: "2025/2026",
    project_type: "╪¼┘à╪º╪╣┘è",
    status: "╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è",
    team_members: [
      { name: "┘à╪¡┘à┘ê╪» ╪«╪º┘ä╪» ╪│╪╣┘è╪»", id: "302201", college: "╪º┘ä┘ç┘å╪»╪│╪⌐ ╪º┘ä╪ú┘ç┘ä┘è╪⌐", email: "mahmoud@example.com", phone: "01100000001", role: "┘à┘ç┘å╪»╪│ ┘à┘è┘â╪º┘å┘è┘â╪º" }
    ],
    files: { summaryPdf: "#", pitchDeck: "#" },
    details: { projectSummary: "┘â╪▒╪│┘è ╪░┘â┘è ┘è╪¬╪¡╪▒┘â ╪¿╪Ñ╪┤╪º╪▒╪º╪¬ ╪º┘ä╪▒╪ú╪│ ┘ê╪¡╪▒┘â╪º╪¬ ╪º┘ä╪╣┘è┘å ┘ä┘à╪│╪º╪╣╪»╪⌐ ╪░┘ê┘è ╪º┘ä┘ç┘à┘à ╪╣┘ä┘ë ╪º┘ä╪¡╪▒┘â╪⌐ ╪¿┘è╪│╪▒ ┘ê╪ú┘à╪º┘å.", problemAddressed: "╪╡╪╣┘ê╪¿╪⌐ ╪º┘ä╪¬╪¡┘â┘à ┘ü┘è ╪º┘ä┘â╪▒╪º╪│┘è ╪º┘ä╪¬┘é┘ä┘è╪»┘è╪⌐.", solutionProvided: "╪º┘ä╪¬╪¡┘â┘à ╪¿╪Ñ╪┤╪º╪▒╪º╪¬ ╪º┘ä╪»┘à╪º╪║ ╪ú┘ê ╪¡╪▒┘â╪º╪¬ ╪º┘ä╪╣┘è┘å." }
  }
];

const mockAppliedResearch = [
  {
    id: "r1",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    pi_name: "╪». ╪ú╪│╪º┘à╪⌐ ┘à╪╡╪╖┘ü┘ë ┘â╪º┘à┘ä",
    pi_faculty: "┘â┘ä┘è╪⌐ ╪º┘ä╪╣┘ä┘ê┘à (╪¡┘â┘ê┘à┘è╪⌐)",
    pi_dept: "╪º┘ä┘â┘è┘à┘è╪º╪í",
    pi_rank: "╪ú╪│╪¬╪º╪░ ┘à╪┤╪º╪▒┘â",
    pi_email: "osama@minia.edu.eg",
    pi_phone: "01200000001",
    status: "╪¬╪¡╪¬ ╪º┘ä╪¬┘é┘è┘è┘à ╪º┘ä┘ü┘å┘è",
    files: { researchPdf: "#", marketSummaryPdf: "#" },
    details: { problem: "╪¬┘ä┘ê╪½ ╪º┘ä┘à┘è╪º┘ç ╪º┘ä╪¼┘ê┘ü┘è╪⌐ ╪¿╪¿╪╣╪╢ ╪º┘ä┘à╪▒┘â╪¿╪º╪¬ ╪º┘ä╪╣╪╢┘ê┘è╪⌐.", solution: "┘à╪▒┘â╪¿ ┘å╪º┘å┘ê ┘â╪▒╪¿┘ê┘å┘è ╪¼╪»┘è╪» ╪▒╪«┘è╪╡ ╪º┘ä╪½┘à┘å ┘è┘à╪¬╪╡ ╪º┘ä┘à┘ä┘ê╪½╪º╪¬ ╪¿┘â┘ü╪º╪í╪⌐ 99%." }
  }
];

const mockRegistrations = [
  {
    id: "reg1",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "┘à. ┘â╪▒┘è┘à ╪╣╪¿╪» ╪º┘ä╪╣╪▓┘è╪▓ ┘à╪╡╪╖┘ü┘ë",
    email: "karim@startup.com",
    phone: "01020304050",
    organization: "╪┤╪▒┘â╪⌐ ┘å┘à╪º╪í ┘ä┘ä╪¬┘â┘å┘ê┘ä┘ê╪¼┘è╪º",
    role: "startup",
    cv_url: "#",
    details: { startupName: "┘å┘à╪º╪í ╪¬┘è┘â", industry: "╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪╡╪╖┘å╪º╪╣┘è ┘ê╪º┘ä╪¬╪¡┘ê┘ä ╪º┘ä╪▒┘é┘à┘è", stage: "┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è ┘à╪¼╪▒╪¿", elevatorPitch: "┘à┘å╪╡╪⌐ ╪░┘â┘è╪⌐ ┘ä╪▒╪¿╪╖ ╪º┘ä┘à╪▓╪º╪▒╪╣┘è┘å ╪¿╪º┘ä╪ú╪│┘ê╪º┘é ┘à╪¿╪º╪┤╪▒╪⌐ ┘ä╪¬┘é┘ä┘è┘ä ╪º┘ä╪¡┘ä┘é╪º╪¬ ╪º┘ä┘ê╪│┘è╪╖╪⌐." }
  },
  {
    id: "reg2",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "╪ú.╪». ╪│┘ä┘ê┘ë ╪╣╪¿╪» ╪º┘ä╪▒╪¡┘à┘å ╪¡╪│┘å",
    email: "salwa@knowledge.com",
    phone: "01122334455",
    organization: "╪¼╪º┘à╪╣╪⌐ ╪º┘ä┘é╪º┘ç╪▒╪⌐",
    role: "speaker",
    cv_url: "#",
    details: { speechTopic: "┘à╪│╪¬┘é╪¿┘ä ╪▒┘è╪º╪»╪⌐ ╪º┘ä╪ú╪╣┘à╪º┘ä ┘ü┘è ╪º┘ä╪¼╪º┘à╪╣╪º╪¬ ╪º┘ä┘à╪╡╪▒┘è╪⌐", speakerExpertise: "╪º┘ä╪º╪¿╪¬┘â╪º╪▒ ╪º┘ä╪¼╪º┘à╪╣┘è", speakerBio: "╪«╪¿┘è╪▒╪⌐ ┘ü┘è ┘å┘é┘ä ╪º┘ä╪¬┘â┘å┘ê┘ä┘ê╪¼┘è╪º ┘ê╪¬╪ú╪│┘è╪│ ╪º┘ä╪¡╪º╪╢┘å╪º╪¬ ╪º┘ä╪¼╪º┘à╪╣┘è╪⌐ ┘ä╪ú┘â╪½╪▒ ┘à┘å ┘í┘Ñ ╪╣╪º┘à╪º┘ï." }
  },
  {
    id: "reg3",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    full_name: "╪». ╪╖╪º╪▒┘é ╪¼┘ä╪º┘ä ┘ü┘ê╪▓┘è",
    email: "tarek@angelinvest.net",
    phone: "01599887766",
    organization: "╪╡┘å╪»┘ê┘é ┘à╪╡╪▒ ┘ä┘ä╪º╪│╪¬╪½┘à╪º╪▒ ╪º┘ä┘à┘ä╪º╪ª┘â┘è",
    role: "investor",
    cv_url: null,
    details: { investorEntity: "┘à╪│╪¬╪½┘à╪▒ ┘ü╪▒╪»┘è", investmentType: "╪¬┘à┘ê┘è┘ä ╪ú┘ê┘ä┘è / Seed Capital" }
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
  const [newNewsData, setNewNewsData] = useState({ title: '', content: '', image_url: '', uploader_name: '╪ú╪»┘à┘å ╪º┘ä┘å╪╕╪º┘à' });
  const [selectedType, setSelectedType] = useState(null); // 'graduation', 'research', 'registration'
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('╪º┘ä┘â┘ä');

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
    type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
    experience: '╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼',
    logo: '',
    details: ''
  });

  const [innovationFormData, setInnovationFormData] = useState({
    name: '',
    category: 'ai',
    level: 'prototype',
    levelName: '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è',
    team: '',
    desc: '',
    image: '',
    tech: 'Python',
    speed: '┘ü┘ê╪▒┘è',
    accuracy: '95%',
    icon: 'Cpu'
  });

  const [productFormData, setProductFormData] = useState({
    name: '',
    category: '┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐',
    faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐',
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
    if (window.confirm('┘ç┘ä ╪ú┘å╪¬ ┘à╪¬╪ú┘â╪» ┘à┘å ╪¡╪░┘ü ┘ç╪░╪º ╪º┘ä╪º╪¿╪¬┘â╪º╪▒╪ƒ')) {
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
    if (window.confirm('┘ç┘ä ╪ú┘å╪¬ ┘à╪¬╪ú┘â╪» ┘à┘å ╪¡╪░┘ü ┘ç╪░╪º ╪º┘ä┘à┘å╪¬╪¼╪ƒ')) {
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
        type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
        experience: '╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼',
        logo: '',
        details: ''
      });
    } catch (err) {
      alert("╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪¡┘ü╪╕ ╪º┘ä┘ê╪╕┘è┘ü╪⌐: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('┘ç┘ä ╪ú┘å╪¬ ┘à╪¬╪ú┘â╪» ┘à┘å ╪¡╪░┘ü ┘ç╪░┘ç ╪º┘ä┘ê╪╕┘è┘ü╪⌐ ┘å┘ç╪º╪ª┘è╪º┘ï╪ƒ')) {
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
        alert("╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪¡╪░┘ü ╪º┘ä┘ê╪╕┘è┘ü╪⌐: " + err.message);
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
      type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
      experience: '╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼',
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
      type: item.type || '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
      experience: item.experience || '╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼',
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
      levelName: '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è',
      team: '',
      desc: '',
      image: '',
      tech: 'Python',
      speed: '┘ü┘ê╪▒┘è',
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
      levelName: item.levelName || '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è',
      team: item.team || '',
      desc: item.desc || '',
      image: item.image || '',
      tech: item.stats?.tech || item.tech || 'Python',
      speed: item.stats?.speed || item.speed || '┘ü┘ê╪▒┘è',
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
      category: '┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐',
      faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐',
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
      category: item.category || '┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐',
      faculty: item.faculty || '┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐',
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
        if (editingNewsId) {
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
      setNewNewsData({ title: '', content: '', image_url: '', uploader_name: '╪ú╪»┘à┘å ╪º┘ä┘å╪╕╪º┘à' });
    } catch (err) {
      alert("╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪¡┘ü╪╕ ╪º┘ä╪«╪¿╪▒: " + err.message);
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
    if (window.confirm('┘ç┘ä ╪ú┘å╪¬ ┘à╪¬╪ú┘â╪» ┘à┘å ╪▒╪║╪¿╪¬┘â ┘ü┘è ╪¡╪░┘ü ┘ç╪░╪º ╪º┘ä╪«╪¿╪▒ ┘å┘ç╪º╪ª┘è╪º┘ï╪ƒ')) {
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
        alert("╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪¡╪░┘ü ╪º┘ä╪«╪¿╪▒: " + err.message);
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
      setLoginError('┘â┘ä┘à╪⌐ ╪º┘ä┘à╪▒┘ê╪▒ ╪║┘è╪▒ ╪╡╪¡┘è╪¡╪⌐!');
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
                title: '┘à┘ç┘å╪»╪│ ╪¿╪▒┘à╪¼┘è╪º╪¬ ┘ê╪º╪¼┘ç╪º╪¬ ╪ú┘à╪º┘à┘è╪⌐ (Frontend)',
                company: 'TechVision Solutions',
                location: '╪º┘ä┘é╪▒┘è╪⌐ ╪º┘ä╪░┘â┘è╪⌐╪î ╪º┘ä┘é╪º┘ç╪▒╪⌐',
                type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
                experience: '1-3 ╪│┘å┘ê╪º╪¬',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
                details: '╪¬╪╖┘ê┘è╪▒ ┘ê╪¬╪╡┘à┘è┘à ┘ê╪º╪¼┘ç╪º╪¬ ┘ê╪¬╪╖╪¿┘è┘é╪º╪¬ ╪º┘ä┘ê┘è╪¿ ╪¿╪º╪│╪¬╪«╪»╪º┘à React.js ┘ê TailwindCSS.'
              },
              {
                title: '╪ú╪«╪╡╪º╪ª┘è ╪¬╪│┘ê┘è┘é ╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è',
                company: 'Global Media',
                location: '╪╣┘å ╪¿┘Å╪╣╪» (Remote)',
                type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
                experience: '╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼',
                logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200',
                details: '╪Ñ╪»╪º╪▒╪⌐ ╪¡┘à┘ä╪º╪¬ ╪º┘ä╪¬┘ê╪º╪╡┘ä ╪º┘ä╪º╪¼╪¬┘à╪º╪╣┘è ┘ê╪¼┘ê╪¼┘ä ╪ú╪»╪▓ ┘ê╪¬┘ç┘è╪ª╪⌐ ┘à╪¡╪▒┘â╪º╪¬ ╪º┘ä╪¿╪¡╪½.'
              },
              {
                title: '┘à╪¡┘ä┘ä ╪¿┘è╪º┘å╪º╪¬',
                company: 'Data Insights',
                location: '╪º┘ä┘à╪╣╪º╪»┘è╪î ╪º┘ä┘é╪º┘ç╪▒╪⌐',
                type: '╪»┘ê╪º┘à ╪¼╪▓╪ª┘è',
                experience: '0-2 ╪│┘å┘ê╪º╪¬',
                logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
                details: '╪¬╪¡┘ä┘è┘ä ╪º┘ä╪¿┘è╪º┘å╪º╪¬ ┘ê╪º╪│╪¬╪«╪▒╪º╪¼ ╪º┘ä╪¬┘é╪º╪▒┘è╪▒ ┘ê╪¬╪╡┘à┘è┘à ┘ä┘ê╪¡╪º╪¬ ╪╣╪▒╪╢ ╪º┘ä╪¿┘è╪º┘å╪º╪¬ Power BI.'
              },
              {
                title: '┘à┘ç┘å╪»╪│ ╪¼┘ê╪»╪⌐ ╪¿╪▒┘à╪¼┘è╪º╪¬ (QA)',
                company: 'SoftCore',
                location: '╪º┘ä┘à┘å┘è╪º ╪º┘ä╪¼╪»┘è╪»╪⌐',
                type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
                experience: '2+ ╪│┘å┘ê╪º╪¬',
                logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200',
                details: '╪º╪«╪¬╪¿╪º╪▒ ╪º┘ä╪¿╪▒┘à╪¼┘è╪º╪¬ ┘ê╪¬╪¡╪»┘è╪» ╪º┘ä╪ú╪«╪╖╪º╪í ┘ê╪Ñ╪╣╪»╪º╪» ╪º┘ä╪¬┘é╪º╪▒┘è╪▒ ╪º┘ä┘ü┘å┘è╪⌐ ┘ê╪╣┘à┘ä ╪ú╪¬┘à╪¬╪⌐ ┘ä┘ä╪º╪«╪¬╪¿╪º╪▒╪º╪¬.'
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
            title: '┘à┘ç┘å╪»╪│ ╪¿╪▒┘à╪¼┘è╪º╪¬ ┘ê╪º╪¼┘ç╪º╪¬ ╪ú┘à╪º┘à┘è╪⌐ (Frontend)',
            company: 'TechVision Solutions',
            location: '╪º┘ä┘é╪▒┘è╪⌐ ╪º┘ä╪░┘â┘è╪⌐╪î ╪º┘ä┘é╪º┘ç╪▒╪⌐',
            type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
            experience: '1-3 ╪│┘å┘ê╪º╪¬',
            logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
            details: '╪¬╪╖┘ê┘è╪▒ ┘ê╪¬╪╡┘à┘è┘à ┘ê╪º╪¼┘ç╪º╪¬ ┘ê╪¬╪╖╪¿┘è┘é╪º╪¬ ╪º┘ä┘ê┘è╪¿ ╪¿╪º╪│╪¬╪«╪»╪º┘à React.js ┘ê TailwindCSS.'
          },
          {
            id: 2,
            title: '╪ú╪«╪╡╪º╪ª┘è ╪¬╪│┘ê┘è┘é ╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è',
            company: 'Global Media',
            location: '╪╣┘å ╪¿┘Å╪╣╪» (Remote)',
            type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
            experience: '╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼',
            logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=200',
            details: '╪Ñ╪»╪º╪▒╪⌐ ╪¡┘à┘ä╪º╪¬ ╪º┘ä╪¬┘ê╪º╪╡┘ä ╪º┘ä╪º╪¼╪¬┘à╪º╪╣┘è ┘ê╪¼┘ê╪¼┘ä ╪ú╪»╪▓ ┘ê╪¬┘ç┘è╪ª╪⌐ ┘à╪¡╪▒┘â╪º╪¬ ╪º┘ä╪¿╪¡╪½.'
          },
          {
            id: 3,
            title: '┘à╪¡┘ä┘ä ╪¿┘è╪º┘å╪º╪¬',
            company: 'Data Insights',
            location: '╪º┘ä┘à╪╣╪º╪»┘è╪î ╪º┘ä┘é╪º┘ç╪▒╪⌐',
            type: '╪»┘ê╪º┘à ╪¼╪▓╪ª┘è',
            experience: '0-2 ╪│┘å┘ê╪º╪¬',
            logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200',
            details: '╪¬╪¡┘ä┘è┘ä ╪º┘ä╪¿┘è╪º┘å╪º╪¬ ┘ê╪º╪│╪¬╪«╪▒╪º╪¼ ╪º┘ä╪¬┘é╪º╪▒┘è╪▒ ┘ê╪¬╪╡┘à┘è┘à ┘ä┘ê╪¡╪º╪¬ ╪╣╪▒╪╢ ╪º┘ä╪¿┘è╪º┘å╪º╪¬ Power BI.'
          },
          {
            id: 4,
            title: '┘à┘ç┘å╪»╪│ ╪¼┘ê╪»╪⌐ ╪¿╪▒┘à╪¼┘è╪º╪¬ (QA)',
            company: 'SoftCore',
            location: '╪º┘ä┘à┘å┘è╪º ╪º┘ä╪¼╪»┘è╪»╪⌐',
            type: '╪»┘ê╪º┘à ┘â╪º┘à┘ä',
            experience: '2+ ╪│┘å┘ê╪º╪¬',
            logo: 'https://images.unsplash.com/photo-1496200502058-a73099b244ce?auto=format&fit=crop&q=80&w=200',
            details: '╪º╪«╪¬╪¿╪º╪▒ ╪º┘ä╪¿╪▒┘à╪¼┘è╪º╪¬ ┘ê╪¬╪¡╪»┘è╪» ╪º┘ä╪ú╪«╪╖╪º╪í ┘ê╪Ñ╪╣╪»╪º╪» ╪º┘ä╪¬┘é╪º╪▒┘è╪▒ ╪º┘ä┘ü┘å┘è╪⌐ ┘ê╪╣┘à┘ä ╪ú╪¬┘à╪¬╪⌐ ┘ä┘ä╪º╪«╪¬╪¿╪º╪▒╪º╪¬.'
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
            name: '┘å╪╕╪º┘à ╪¬╪┤╪«┘è╪╡ ╪º┘ä╪ú┘ê╪▒╪º┘à ╪º┘ä╪░┘â┘è ╪¿╪º┘ä╪▒┘å┘è┘å ╪º┘ä┘à╪║┘å╪º╪╖┘è╪│┘è',
            category: 'ai',
            level: 'advanced',
            levelName: '┘à╪│╪¬┘ê┘ë ┘à╪¬┘é╪»┘à',
            team: '┘ü╪▒┘è┘é ╪│┘è╪¼┘à╪º ╪º┘ä╪╖╪¿┘è',
            desc: '╪¿╪▒┘à╪¼┘è╪º╪¬ ╪░┘â╪º╪í ╪º╪╡╪╖┘å╪º╪╣┘è ╪¬┘é┘ê┘à ╪¿╪¬╪¡┘ä┘è┘ä ╪╡┘ê╪▒ ╪º┘ä╪▒┘å┘è┘å ┘ä╪│╪▒╪╣╪⌐ ╪▒╪╡╪» ╪º┘ä╪ú┘ê╪▒╪º┘à ╪¿┘å╪│╪¿╪⌐ ╪»┘é╪⌐ ╪¬┘ü┘ê┘é 98% ┘ê╪¬┘ê┘ü┘è╪▒ ╪º┘ä┘ê┘é╪¬ ┘ä┘ä╪ú╪╖╪¿╪º╪í.',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
            tech: 'Python / PyTorch', speed: '3 ╪½┘ê╪º┘å┘ì', accuracy: '98%', icon: 'Cpu'
          },
          {
            id: 2,
            name: '╪¼╪»╪º╪▒ ╪º┘ä╪¡┘à╪º┘è╪⌐ ╪º┘ä┘ü╪º╪ª┘é ┘ä┘ä╪ú╪¼┘ç╪▓╪⌐ ╪º┘ä╪╖╪¿┘è╪⌐ ╪º┘ä╪░┘â┘è╪⌐',
            category: 'cyber',
            level: 'ready',
            levelName: '╪¼╪º┘ç╪▓ ┘ä┘ä╪¬╪¿┘å┘è ╪º┘ä╪¬╪¼╪º╪▒┘è',
            team: '╪¡╪╡┘å ╪º┘ä┘à┘å┘è╪º ╪º┘ä╪▒┘é┘à┘è',
            desc: '╪¿╪▒┘ê╪¬┘ê┘â┘ê┘ä ╪¡┘à╪º┘è╪⌐ ╪┤╪¿┘â┘è╪⌐ ┘è┘à┘å╪╣ ╪º╪«╪¬╪▒╪º┘é╪º╪¬ ╪ú╪¼┘ç╪▓╪⌐ ╪Ñ┘å╪╣╪º╪┤ ╪º┘ä┘é┘ä╪¿ ┘ê╪º┘ä╪ú╪│╪▒┘æ╪⌐ ╪º┘ä┘à╪¬╪╡┘ä╪⌐ ╪¿╪º┘ä╪Ñ┘å╪¬╪▒┘å╪¬ ╪»╪º╪«┘ä ╪º┘ä┘à╪│╪¬╪┤┘ü┘è╪º╪¬ ┘ê╪º┘ä┘à╪▒╪º┘â╪▓.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
            tech: 'Rust / C++', speed: '┘ü┘ê╪▒┘è', accuracy: '99.9%', icon: 'Lock'
          },
          {
            id: 3,
            name: '╪¡╪º┘ê┘è╪⌐ ╪º┘ä┘å┘ü╪º┘è╪º╪¬ ╪º┘ä╪░┘â┘è╪⌐ ┘ä╪¡╪│╪º╪¿╪º╪¬ ╪º┘ä╪¿┘è╪ª╪⌐ ╪º┘ä┘à╪│╪¬╪»╪º┘à╪⌐',
            category: 'iot',
            level: 'prototype',
            levelName: '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è',
            team: '┘à╪¿╪¬┘â╪▒┘ê ╪º┘ä╪║╪» ╪º┘ä╪¿┘è╪ª┘è',
            desc: '╪¼┘ç╪º╪▓ ╪▒╪╡╪» ┘è╪│╪¬╪┤╪╣╪▒ ╪º┘à╪¬┘ä╪º╪í ╪º┘ä╪¡╪º┘ê┘è╪º╪¬ ┘ê┘è┘ü╪▒╪▓ ╪º┘ä┘å┘ü╪º┘è╪º╪¬ ╪¬┘ä┘é╪º╪ª┘è╪º┘ï ╪¿╪º╪│╪¬╪«╪»╪º┘à ╪¡╪│╪º╪│╪º╪¬ ╪º┘ä┘à╪│╪º┘ü╪⌐ ┘ê┘à╪╣╪º┘ä╪¼╪⌐ ╪º┘ä╪╡┘ê╪▒ ╪º┘ä┘à╪¬┘é╪»┘à╪⌐.',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
            tech: 'Arduino / ESP32', speed: '╪¬┘ä┘é╪º╪ª┘è', accuracy: '90%', icon: 'Sprout'
          },
          {
            id: 4,
            name: '┘à┘å╪╡╪⌐ ╪¬╪│┘ê┘è┘é ┘ê╪¬┘ê╪¼┘è┘ç ╪º┘ä┘à╪┤╪▒┘ê╪╣╪º╪¬ ╪º┘ä╪¬╪╣┘ä┘è┘à┘è╪⌐ ┘ä┘ä╪┤╪¿╪º╪¿',
            category: 'apps',
            level: 'ready',
            levelName: '╪¼╪º┘ç╪▓ ┘ä┘ä╪¬╪¿┘å┘è ╪º┘ä╪¬╪¼╪º╪▒┘è',
            team: '┘ü╪▒┘è┘é ╪Ñ┘å╪¼╪º╪▓ ┘ä┘ä╪¿╪▒┘à╪¼┘è╪º╪¬',
            desc: '╪¿┘ê╪º╪¿╪⌐ ╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è╪⌐ ╪¬╪▒╪¿╪╖ ╪ú┘ü┘â╪º╪▒ ╪º┘ä╪«╪▒┘è╪¼┘è┘å ┘ê╪º┘ä┘à╪¿╪¬┘â╪▒┘è┘å ╪¿╪º┘ä┘à╪┤╪▒┘ü┘è┘å ┘ê╪º┘ä┘à╪│╪¬╪½┘à╪▒┘è┘å ┘ä╪¬┘à┘ê┘è┘ä ╪»╪▒╪º╪│╪º╪¬ ╪º┘ä╪¼╪»┘ê┘ë ┘ê╪º┘ä╪¬╪»╪▒┘è╪¿ ╪º┘ä┘ü╪╣┘ä┘è.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
            tech: 'React / Node.js', speed: '╪│╪¡╪º╪¿┘è', accuracy: '100%', icon: 'Globe'
          },
          {
            id: 5,
            name: '╪░╪▒╪º╪╣ ╪ó┘ä┘è╪⌐ ┘ä╪Ñ╪¼╪▒╪º╪í ╪º┘ä╪¼╪▒╪º╪¡╪º╪¬ ╪º┘ä╪»┘é┘è┘é╪⌐ ╪╣┘å ╪¿╪╣╪»',
            category: 'ai',
            level: 'prototype',
            levelName: '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è',
            team: '┘å╪¿╪╢ ┘à┘è┘â╪º╪¬╪▒┘ê┘å┘â╪│',
            desc: '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è ┘ä╪░╪▒╪º╪╣ ╪▒┘ê╪¿┘ê╪¬┘è╪⌐ ╪¬╪¡╪º┘â┘è ╪¡╪▒┘â╪⌐ ┘è╪» ╪º┘ä╪╖╪¿┘è╪¿ ╪¿╪Ñ╪¡╪»╪º╪½┘è╪º╪¬ ╪»┘é┘è┘é╪⌐ ╪¼╪»╪º┘ï ╪╣╪¿╪▒ ╪º┘ä┘ê┘è╪¿ ┘ê╪º┘ä╪ú┘ê╪º┘à╪▒ ╪º┘ä╪╡┘ê╪¬┘è╪⌐ ╪º┘ä┘ü┘ê╪▒┘è╪⌐.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
            tech: 'Python / ROS', speed: '┘ä╪¡╪╕┘è', accuracy: '95%', icon: 'Cpu'
          },
          {
            id: 6,
            name: '╪¿╪▒┘ê╪¬┘ê┘â┘ê┘ä ╪¬╪ú┘à┘è┘å ╪º┘ä┘à╪╣╪º┘à┘ä╪º╪¬ ╪º┘ä╪▓╪▒╪º╪╣┘è╪⌐ ╪¿╪│┘ä╪º╪│┘ä ╪º┘ä┘â╪¬┘ä',
            category: 'cyber',
            level: 'advanced',
            levelName: '┘à╪│╪¬┘ê┘ë ┘à╪¬┘é╪»┘à',
            team: '╪│┘å╪º╪¿┘ä ╪º┘ä╪¬╪┤┘ü┘è╪▒',
            desc: '┘å╪╕╪º┘à ╪¬╪┤┘ü┘è╪▒ ╪║┘è╪▒ ┘à╪▒┘â╪▓┘è ┘ä╪¬╪ú┘à┘è┘å ┘à╪¿┘è╪╣╪º╪¬ ╪º┘ä┘à╪¡╪º╪╡┘è┘ä ┘ê╪º┘ä┘ê╪¡╪»╪º╪¬ ╪º┘ä╪Ñ┘å╪¬╪º╪¼┘è╪⌐ ┘ä┘à┘å╪╣ ╪º┘ä╪¬┘ä╪º╪╣╪¿ ╪¿╪º┘ä╪ú╪│╪╣╪º╪▒ ┘ê╪│╪¼┘ä╪º╪¬ ╪º┘ä┘à╪▓╪º╪▒╪╣┘è┘å.',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
            tech: 'Solidity / JS', speed: '╪½╪º┘å┘è╪¬╪º┘å', accuracy: '100%', icon: 'Database'
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
            name: '╪╣╪│┘ä ┘å╪¡┘ä ╪╖╪¿┘è╪╣┘è ┘à╪╡┘ü┘ë ┘å┘é┘è', category: '┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐', faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐', facultyId: 'agriculture',
            price: '150 ╪¼.┘à', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
            rating: '4.9 (1.2K)', tag: '╪º┘ä╪ú┘â╪½╪▒ ┘à╪¿┘è╪╣╪º┘ï', tagColor: 'bg-amber-500 text-white',
            details: '╪╣╪¿┘ê╪⌐ 1 ┘â╪¼┘à ╪╣╪│┘ä ┘à╪╡┘ü┘ë ┘å┘é┘è ╪«╪º┘ä┘è ╪¬┘à╪º┘à╪º┘ï ┘à┘å ╪º┘ä╪│┘â╪▒ ╪º┘ä┘à╪╢╪º┘ü ╪ú┘ê ╪º┘ä┘à┘ê╪º╪» ╪º┘ä╪¡╪º┘ü╪╕╪⌐╪î ┘à┘å ╪Ñ┘å╪¬╪º╪¼ ┘à┘å╪º╪¡┘ä ┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐.'
          },
          {
            id: 2,
            name: '╪▓┘è╪¬ ╪▓┘è╪¬┘ê┘å ╪¿┘â╪▒ ┘à┘à╪¬╪º╪▓ ┘à╪╣╪╡┘ê╪▒ ╪¿╪º╪▒╪»', category: '┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐', faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐', facultyId: 'agriculture',
            price: '180 ╪¼.┘à', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500',
            rating: '4.8 (850)', tag: '╪╣╪╡╪▒ ╪¿╪º╪▒╪» ╪╖╪¿┘è╪╣┘è', tagColor: 'bg-amber-600 text-white',
            details: '╪▓┘è╪¬ ╪▓┘è╪¬┘ê┘å ╪¿┘â╪▒ ┘à┘à╪¬╪º╪▓ ╪»╪▒╪¼╪⌐ ╪ú┘ê┘ä┘ë╪î ┘å╪│╪¿╪⌐ ╪¡┘à┘ê╪╢╪⌐ ┘à┘å╪«┘ü╪╢╪⌐ ╪¼╪»╪º┘ï╪î ┘à╪╣╪╡┘ê╪▒ ┘à┘è┘â╪º┘å┘è┘â┘è╪º┘ï ╪╣┘ä┘ë ╪º┘ä╪¿╪º╪▒╪» ┘ä┘ü┘ê╪º╪ª╪» ┘â╪º┘à┘ä╪⌐.'
          },
          {
            id: 3,
            name: '┘å╪¿╪º╪¬╪º╪¬ ╪▓┘è┘å╪⌐ ┘ê╪┤╪¬┘ä╪º╪¬ ╪▓┘ç┘ê╪▒ ┘à┘å╪▓┘ä┘è╪⌐', category: '┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐', faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐', facultyId: 'agriculture',
            price: '35 ╪¼.┘à', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=500',
            rating: '4.7 (310)', tag: '╪┤╪¬┘ä╪º╪¬ ╪▓┘ç┘ê╪▒', tagColor: 'bg-green-600 text-white',
            details: '┘à╪¼┘à┘ê╪╣╪⌐ ┘à╪¬┘à┘è╪▓╪⌐ ┘à┘å ┘å╪¿╪º╪¬╪º╪¬ ╪º┘ä╪╕┘ä ┘ê╪º┘ä╪▓┘è┘å╪⌐ ╪º┘ä┘à┘å╪▓┘ä┘è╪⌐ ╪º┘ä┘à╪¼┘ç╪▓╪⌐ ┘ä┘ä╪▓╪▒╪º╪╣╪⌐ ┘ê╪¬╪¼┘à┘è┘ä ╪º┘ä┘à┘â╪º╪¬╪¿ ┘ê╪º┘ä╪¿┘ä┘â┘ê┘å╪º╪¬.'
          },
          {
            id: 4,
            name: '┘à┘å╪╕┘ü╪º╪¬ ┘ê┘à╪╖┘ç╪▒ ╪ú╪▒╪╢┘è╪º╪¬ ╪╣╪º┘ä┘è ╪º┘ä╪¼┘ê╪»╪⌐', category: '┘à┘å╪╕┘ü╪º╪¬ ╪╡┘å╪º╪╣┘è╪⌐', faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪╣┘ä┘ê┘à', facultyId: 'science',
            price: '45 ╪¼.┘à', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=500',
            rating: '4.7 (2.1K)', tag: '╪º┘ä╪ú╪╣┘ä┘ë ┘à╪¿┘è╪╣╪º┘ï', tagColor: 'bg-emerald-600 text-white',
            details: '┘à╪╖┘ç╪▒╪º╪¬ ┘ê┘à┘å╪╕┘ü╪º╪¬ ╪ó┘à┘å╪⌐ ╪╣╪º┘ä┘è╪⌐ ╪º┘ä╪¬╪▒┘â┘è╪▓ ┘ä┘ä╪Ñ┘å╪¬╪º╪¼ ╪º┘ä┘à┘å╪▓┘ä┘è ┘ê╪º┘ä╪¬╪¼╪º╪▒┘è╪î ┘à╪╡┘å╪╣╪⌐ ┘ê┘ü┘é ╪º┘ä┘à╪╣╪º┘è┘è╪▒ ╪º┘ä╪╖╪¿┘è╪⌐ ╪¿┘é╪│┘à ╪º┘ä┘â┘è┘à┘è╪º╪í.'
          },
          {
            id: 5,
            name: '╪╡╪º╪¿┘ê┘å ╪│╪º╪ª┘ä ┘à╪╣┘é┘à ┘à╪╢╪º╪» ┘ä┘ä╪¿┘â╪¬┘è╪▒┘è╪º', category: '┘à┘å╪╕┘ü╪º╪¬ ╪╡┘å╪º╪╣┘è╪⌐', faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪╣┘ä┘ê┘à', facultyId: 'science',
            price: '60 ╪¼.┘à', image: 'https://images.unsplash.com/photo-1607006342411-101a4e101155?auto=format&fit=crop&q=80&w=500',
            rating: '4.6 (950)', tag: '┘à╪╖┘ç╪▒ ╪ó┘à┘å', tagColor: 'bg-emerald-700 text-white',
            details: '╪╣╪¿┘ê╪⌐ ╪╣╪º╪ª┘ä┘è╪⌐ 3 ┘ä╪¬╪▒ ┘à┘å ╪º┘ä╪╡╪º╪¿┘ê┘å ╪º┘ä╪│╪º╪ª┘ä ╪º┘ä┘à╪╣╪▓╪▓ ╪¿┘à╪▒╪╖╪¿╪º╪¬ ╪º┘ä╪¼┘ä╪│╪▒┘è┘å ┘ä╪¡┘à╪º┘è╪⌐ ╪º┘ä╪ú┘è╪»┘è ┘ê╪¬╪▒╪╖┘è╪¿┘ç╪º ╪¿┘ü╪º╪╣┘ä┘è╪⌐ ╪¬╪º┘à╪⌐.'
          },
          {
            id: 6,
            name: '┘à╪╣┘é┘à ┘â╪¡┘ê┘ä┘è ╪╖╪¿┘è ╪¿╪¬╪▒┘â┘è╪▓ 70%', category: '┘à┘å╪╕┘ü╪º╪¬ ╪╡┘å╪º╪╣┘è╪⌐', faculty: '┘â┘ä┘è╪⌐ ╪º┘ä╪╣┘ä┘ê┘à', facultyId: 'science',
            price: '50 ╪¼.┘à', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500',
            rating: '4.9 (1.4K)', tag: '╪╖╪¿┘è ┘à╪╣╪¬┘à╪»', tagColor: 'bg-cyan-600 text-white',
            details: '╪¿╪«╪º╪« ┘â╪¡┘ê┘ä ╪Ñ┘è╪½┘è┘ä┘è ┘å┘é┘è ╪¬╪▒┘â┘è╪▓ 70% ┘ä┘ä╪¬╪╣┘é┘è┘à ╪º┘ä┘à╪¿╪º╪┤╪▒ ┘ê╪¡┘à╪º┘è╪⌐ ╪º┘ä╪ú╪│╪╖╪¡ ┘ê╪º┘ä╪ú┘è╪»┘è ╪¿┘ü╪º╪╣┘ä┘è╪⌐ ╪¬╪º┘à╪⌐ ┘à╪╡┘å╪╣ ╪¿┘à╪╣╪º┘à┘ä ╪º┘ä┘â┘ä┘è╪⌐.'
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
      alert("╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪¬╪¡╪»┘è╪½ ╪º┘ä╪¡╪º┘ä╪⌐: " + err.message);
    }
  };

  const handleDeleteItem = async (itemId, type) => {
    const isConfirm = window.confirm(
      isRtl 
        ? "┘ç┘ä ╪ú┘å╪¬ ┘à╪¬╪ú┘â╪» ┘à┘å ╪▒╪║╪¿╪¬┘â ┘ü┘è ╪¡╪░┘ü ┘ç╪░╪º ╪º┘ä╪│╪¼┘ä ┘å┘ç╪º╪ª┘è╪º┘ï╪ƒ ┘ä╪º ┘è┘à┘â┘å ╪º┘ä╪¬╪▒╪º╪¼╪╣ ╪╣┘å ┘ç╪░╪º ╪º┘ä╪Ñ╪¼╪▒╪º╪í." 
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
      alert(isRtl ? "╪¬┘à ╪¡╪░┘ü ╪º┘ä╪│╪¼┘ä ╪¿┘å╪¼╪º╪¡." : "Record deleted successfully.");
    } catch (err) {
      alert((isRtl ? "╪¡╪»╪½ ╪«╪╖╪ú ╪ú╪½┘å╪º╪í ╪º┘ä╪¡╪░┘ü: " : "Error deleting record: ") + err.message);
    }
  };

  const handleExportToExcel = () => {
    let dataToExport = [];
    let headers = [];
    let filename = '';

    if (activeTab === 'graduation') {
      const items = getFilteredGradProjects();
      headers = ['╪¬╪º╪▒┘è╪« ╪º┘ä╪¬┘é╪»┘è┘à', '╪º╪│┘à ╪º┘ä┘à╪┤╪▒┘ê╪╣ ╪¿╪º┘ä╪╣╪▒╪¿┘è╪⌐', '╪º╪│┘à ╪º┘ä┘à╪┤╪▒┘ê╪╣ ╪¿╪º┘ä╪Ñ┘å╪¼┘ä┘è╪▓┘è╪⌐', '╪º┘ä┘â┘ä┘è╪⌐ ┘ê╪º┘ä╪¼╪º┘à╪╣╪⌐', '╪º┘ä┘å┘ê╪╣', '╪º┘ä╪¡╪º┘ä╪⌐', '╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è ┘ä┘ä╪▒╪º╪ª╪»', '╪º┘ä┘ç╪º╪¬┘ü', '╪º┘ä┘à┘ä╪«╪╡'];
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
      filename = '┘à╪┤╪▒┘ê╪╣╪º╪¬_╪º┘ä╪¬╪«╪▒╪¼.csv';
    } else if (activeTab === 'research') {
      const items = getFilteredResearch();
      headers = ['╪¬╪º╪▒┘è╪« ╪º┘ä╪¬┘é╪»┘è┘à', '╪º┘ä╪¿╪º╪¡╪½ ╪º┘ä╪▒╪ª┘è╪│┘è', '╪º┘ä╪»╪▒╪¼╪⌐ ╪º┘ä╪╣┘ä┘à┘è╪⌐', '╪º┘ä┘â┘ä┘è╪⌐ ┘ê╪º┘ä╪¼╪º┘à╪╣╪⌐', '╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è', '╪º┘ä┘ç╪º╪¬┘ü', '╪º┘ä╪¡╪º┘ä╪⌐', '╪╣┘å┘ê╪º┘å ╪º┘ä╪¿╪¡╪½', '╪º┘ä┘à┘ä╪«╪╡'];
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
      filename = '╪º┘ä╪¿╪¡┘ê╪½_╪º┘ä╪¬╪╖╪¿┘è┘é┘è╪⌐.csv';
    } else if (['speakers', 'startups', 'investors', 'mentors', 'researchers', 'partners', 'volunteers'].includes(activeTab)) {
      const role = activeTab.slice(0, -1);
      const items = getFilteredRegistrants(role);
      headers = ['╪º┘ä╪¬╪º╪▒┘è╪«', '╪º┘ä╪º╪│┘à ╪º┘ä┘â╪º┘à┘ä', '╪º┘ä╪¼┘ç╪⌐ / ╪º┘ä┘à╪ñ╪│╪│╪⌐', '╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è', '╪▒┘é┘à ╪º┘ä┘ç╪º╪¬┘ü', '╪º┘ä╪▒┘é┘à ╪º┘ä┘é┘ê┘à┘è', '╪º┘ä╪¡╪º┘ä╪⌐', '╪▒╪º╪¿╪╖ ╪º┘ä╪│┘è╪▒╪⌐ ╪º┘ä╪░╪º╪¬┘è╪⌐'];
      dataToExport = items.map(r => [
        new Date(r.created_at).toLocaleDateString('ar-EG'),
        r.full_name,
        r.organization,
        r.email,
        r.phone,
        r.details?.nationalId || '',
        r.status || '╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è',
        r.cv_url || ''
      ]);
      
      const roleNamesAr = {
        speaker: '╪º┘ä┘à╪¬╪¡╪»╪½┘ê┘å',
        startup: '╪º┘ä╪┤╪▒┘â╪º╪¬_╪º┘ä┘å╪º╪┤╪ª╪⌐',
        investor: '╪º┘ä┘à╪│╪¬╪½┘à╪▒┘ê┘å',
        mentor: '╪º┘ä┘à┘ê╪¼┘ç┘ê┘å',
        researcher: '╪º┘ä╪¿╪º╪¡╪½┘ê┘å_┘ê╪º┘ä┘à╪¿╪¬┘â╪▒┘ê┘å',
        partner: '╪º┘ä╪┤╪▒┘â╪º╪í_┘ê╪º┘ä╪▒╪╣╪º╪⌐',
        volunteer: '╪º┘ä┘à╪¬╪╖┘ê╪╣┘ê┘å'
      };
      filename = `${roleNamesAr[role] || '╪º┘ä┘à╪│╪¼┘ä┘ê┘å'}.csv`;
    } else if (activeTab === 'news') {
      headers = ['╪º┘ä╪¬╪º╪▒┘è╪«', '╪º┘ä╪╣┘å┘ê╪º┘å', '╪º┘ä┘â╪º╪¬╪¿ / ╪º┘ä┘å╪º╪┤╪▒', '╪º┘ä┘à╪¡╪¬┘ê┘ë'];
      dataToExport = newsList.map(n => [
        new Date(n.created_at).toLocaleDateString('ar-EG'),
        n.title,
        n.uploader_name,
        n.content
      ]);
      filename = '╪º┘ä╪ú╪«╪¿╪º╪▒.csv';
    } else if (activeTab === 'jobs') {
      headers = ['╪º┘ä╪¬╪º╪▒┘è╪«', '╪º┘ä┘à╪│┘à┘ë ╪º┘ä┘ê╪╕┘è┘ü┘è', '╪º┘ä╪┤╪▒┘â╪⌐', '╪º┘ä┘à┘ê┘é╪╣', '╪º┘ä┘å┘ê╪╣', '╪º┘ä╪«╪¿╪▒╪⌐', '╪¬┘ü╪º╪╡┘è┘ä ╪º┘ä┘ê╪╕┘è┘ü╪⌐'];
      dataToExport = jobs.map(j => [
        j.created_at ? new Date(j.created_at).toLocaleDateString('ar-EG') : '',
        j.title,
        j.company,
        j.location,
        j.type,
        j.experience,
        j.details || ''
      ]);
      filename = '╪┤┘ê╪º╪║╪▒_╪º┘ä┘ê╪╕╪º╪ª┘ü.csv';
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
      const matchesStatus = statusFilter === '╪º┘ä┘â┘ä' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredResearch = () => {
    return appliedResearch.filter(r => {
      const matchesSearch = r.pi_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.pi_faculty.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.pi_email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === '╪º┘ä┘â┘ä' || r.status === statusFilter;
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
          <h2 className="text-2xl md:text-3xl font-black text-center text-[#26462C] mb-2 tracking-tight">┘ä┘ê╪¡╪⌐ ╪º┘ä╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä┘é┘à╪⌐ 2026</h2>
          <p className="text-xs font-bold text-slate-400 text-center mb-8">┘è╪▒╪¼┘ë ╪Ñ╪»╪«╪º┘ä ╪▒┘à╪▓ ╪º┘ä╪¬╪¡┘é┘é ┘ä┘ä┘ê╪╡┘ê┘ä ╪º┘ä╪ó┘à┘å ┘ä┘ä┘ê╪¡╪⌐ ╪º┘ä╪¬╪¡┘â┘à</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-600 mb-2.5">┘â┘ä┘à╪⌐ ┘à╪▒┘ê╪▒ ╪º┘ä┘à╪│╪ñ┘ê┘ä *</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó"
                className="w-full border border-slate-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#26462C] focus:border-[#26462C] font-mono text-center text-lg outline-none transition-all duration-300 shadow-inner"
                required
              />
              {loginError && <p className="text-red-500 text-xs font-bold mt-2.5 text-center">{loginError}</p>}
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-800 to-[#26462C] hover:from-emerald-700 hover:to-[#1e3622] text-[#F4A217] py-3.5 rounded-xl font-black text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
              <span>╪¬╪│╪¼┘è┘ä ╪º┘ä╪»╪«┘ê┘ä ╪º┘ä╪ó┘à┘å</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      
      {/* 1. RIGHT SIDEBAR (Navigation) */}
      <div className="w-72 bg-[#26462C] text-white flex flex-col shrink-0 border-l border-slate-100/10 h-screen sticky top-0 overflow-y-auto z-30">
        {/* Logo and Summit Info */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7 text-[#F4A217]" />
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-tight">┘é┘à╪⌐ ╪¼╪º┘à╪╣╪⌐ ╪º┘ä┘à┘å┘è╪º</h2>
            <span className="text-[10px] text-slate-300 font-bold block mt-0.5">┘ä┘ê╪¡╪⌐ ╪º┘ä╪¬╪¡┘â┘à ┘ê╪º┘ä┘à╪¬╪º╪¿╪╣╪⌐ 2026</span>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'overview', label: '┘å╪╕╪▒╪⌐ ╪╣╪º┘à╪⌐', count: null, icon: BarChart2 },
            { id: 'news', label: '╪º┘ä╪ú╪«╪¿╪º╪▒ ╪º┘ä╪Ñ╪╣┘ä╪º┘å┘è╪⌐', count: newsList.length, icon: Newspaper },
            { id: 'jobs', label: '┘ê╪╕╪º╪ª┘ü ╪º┘ä┘à┘ä╪¬┘é┘ë', count: jobs.length, icon: Briefcase },
            { id: 'exhibition_innovations', label: '┘à╪╣╪▒╪╢ ╪º┘ä╪º╪¿╪¬┘â╪º╪▒╪º╪¬', count: innovations.length, icon: Sparkles },
            { id: 'exhibition_products', label: '┘à╪╣╪▒╪╢ ╪º┘ä┘ê╪¡╪»╪º╪¬', count: products.length, icon: ShoppingBag },
            { id: 'graduation', label: '┘à╪┤╪▒┘ê╪╣╪º╪¬ ╪º┘ä╪¬╪«╪▒╪¼', count: stats.totalGP, icon: GraduationCap },
            { id: 'research', label: '╪º┘ä╪¿╪¡┘ê╪½ ╪º┘ä╪¬╪╖╪¿┘è┘é┘è╪⌐', count: stats.totalAR, icon: BookOpen },
            { id: 'speakers', label: '╪º┘ä┘à╪¬╪¡╪»╪½┘ê┘å ┘ê╪º┘ä┘à╪»╪▒╪¿┘ê┘å', count: stats.totalSpeakers, icon: Presentation },
            { id: 'startups', label: '╪º┘ä╪┤╪▒┘â╪º╪¬ ╪º┘ä┘å╪º╪┤╪ª╪⌐', count: stats.totalStartups, icon: Briefcase },
            { id: 'investors', label: '╪º┘ä┘à╪│╪¬╪½┘à╪▒┘ê┘å ┘ä┘ä╪¬┘à┘ê┘è┘ä', count: stats.totalInvestors, icon: Users },
            { id: 'mentors', label: '╪º┘ä┘à┘ê╪¼┘ç┘ê┘å ┘ê╪º┘ä╪Ñ╪▒╪┤╪º╪»', count: stats.totalMentors, icon: Users },
            { id: 'researchers', label: '╪º┘ä╪¿╪º╪¡╪½┘ê┘å / ╪º┘ä┘à╪¿╪¬┘â╪▒┘ê┘å', count: stats.totalResearchers, icon: BookOpen },
            { id: 'partners', label: '╪º┘ä╪┤╪▒┘â╪º╪í ┘ê╪º┘ä╪¼┘ç╪º╪¬ ╪º┘ä╪▒╪º╪╣┘è╪⌐', count: stats.totalPartners, icon: Users },
            { id: 'volunteers', label: '┘ä╪¼╪º┘å ╪º┘ä╪¬╪╖┘ê╪╣ ┘ê╪º┘ä╪¬┘å╪╕┘è┘à', count: stats.totalVolunteers, icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 group cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#F4A217] to-amber-500 text-[#26462C] shadow-lg shadow-amber-500/10'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <tab.icon className={`w-4 h-4 shrink-0 transition-colors ${activeTab === tab.id ? 'text-[#26462C]' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{tab.label}</span>
              </div>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
                  activeTab === tab.id ? 'bg-[#26462C] text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>╪▒┘é┘à ╪º┘ä╪Ñ╪╡╪»╪º╪▒: v1.0.4 - 2026</span>
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
              placeholder="╪º┘ä╪¿╪¡╪½ ╪º┘ä┘ü┘ê╪▒┘è ╪¿╪º┘ä╪º╪│┘à╪î ╪º┘ä┘â┘ä┘è╪⌐╪î ╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pr-11 pl-4 py-2.5 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#26462C] focus:border-[#26462C] outline-none shadow-inner transition-all duration-300"
            />
          </div>

          {/* Left Header: Status Pulse and Logout */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            {isSupabaseConfigured ? (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>┘é╪º╪╣╪»╪⌐ ╪º┘ä╪¿┘è╪º┘å╪º╪¬ ┘å╪┤╪╖╪⌐</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>┘ê╪╢╪╣ ╪º┘ä┘à╪╣╪º┘è┘å╪⌐ ╪º┘ä┘à╪¡┘ä┘è╪⌐</span>
              </div>
            )}

            <button onClick={fetchData} className="p-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95" title="╪¬╪¡╪»┘è╪½ ╪º┘ä╪¿┘è╪º┘å╪º╪¬">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button onClick={handleLogout} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95 border border-red-100">
              ╪«╪▒┘ê╪¼
            </button>
          </div>
        </header>

        {/* Content Body Grid */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {loading ? (
            <div className="py-20 text-center text-slate-500 font-bold flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#26462C]" />
              <span>╪¼╪º╪▒┘è ╪¬╪¡┘à┘è┘ä ╪º┘ä╪¿┘è╪º┘å╪º╪¬...</span>
            </div>
          ) : (
            <>
              {activeTab === 'overview' ? (
                /* --- OVERVIEW GRID VIEW --- */
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fade-in">
                  
                  {/* Center Panel (9 columns) */}
                  <div className="xl:col-span-9 space-y-8">
                    
                    {/* 1. Hero Banner */}
                    <div className="bg-gradient-to-r from-emerald-800 to-[#26462C] text-white p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
                      {/* Floating decorative elements */}
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F4A217]/10 rounded-full blur-[80px] pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10 text-center md:text-right">
                        <span className="inline-block bg-[#F4A217]/25 text-[#F4A217] border border-[#F4A217]/20 px-4 py-1.5 rounded-full text-xs font-black">
                          ┘é┘à╪⌐ ╪¼╪º┘à╪╣╪⌐ ╪º┘ä┘à┘å┘è╪º ┘ä┘ä╪º╪¿╪¬┘â╪º╪▒ ┘ê╪▒┘è╪º╪»╪⌐ ╪º┘ä╪ú╪╣┘à╪º┘ä 2026
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">┘è┘ê┘à┘â ╪│╪╣┘è╪»╪î ┘è╪º ┘à╪│╪ñ┘ê┘ä ╪º┘ä┘é┘à╪⌐!</h2>
                        <p className="text-slate-200 text-sm max-w-lg leading-relaxed font-semibold">┘à╪¬╪º╪¿╪╣╪⌐ ┘â╪º┘ü╪⌐ ╪╖┘ä╪¿╪º╪¬ ╪º┘ä┘à╪¿╪¬┘â╪▒┘è┘å ┘ê╪º┘ä╪¿╪º╪¡╪½┘è┘å╪î ┘ê╪Ñ╪»╪º╪▒╪⌐ ┘à╪╣╪º╪▒╪╢ ╪º┘ä╪º╪¿╪¬┘â╪º╪▒ ┘ê╪¼╪»┘ê┘ä ╪º┘ä┘ü╪╣╪º┘ä┘è╪º╪¬ ╪¿┘å╪¼╪º╪¡.</p>
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
                        { title: '┘à╪┤╪▒┘ê╪╣╪º╪¬ ╪º┘ä╪¬╪«╪▒╪¼', value: stats.totalGP, label: '┘à╪┤╪▒┘ê╪╣ ┘à╪╢╪º┘ü', color: 'text-emerald-700', bg: 'bg-emerald-50', svgColor: 'text-emerald-600', path: 'M 0,20 Q 25,5 50,25 T 100,10', percent: '+14%' },
                        { title: '╪º┘ä╪¿╪¡┘ê╪½ ╪º┘ä╪¬╪╖╪¿┘è┘é┘è╪⌐', value: stats.totalAR, label: '╪¿╪¡╪½ ╪¬╪╖╪¿┘è┘é┘è', color: 'text-[#26462C]', bg: 'bg-[#26462C]/10', svgColor: 'text-[#26462C]', path: 'M 0,10 Q 25,25 50,5 T 100,20', percent: '+8%' },
                        { title: '╪º╪¿╪¬┘â╪º╪▒╪º╪¬ ╪º┘ä┘à╪╣╪▒╪╢', value: innovations.length, label: '╪º╪¿╪¬┘â╪º╪▒ ╪¬┘é┘å┘è', color: 'text-[#F4A217]', bg: 'bg-[#F4A217]/10', svgColor: 'text-[#F4A217]', path: 'M 0,25 Q 30,10 60,30 T 100,5', percent: '+22%' },
                        { title: '┘ê╪╕╪º╪ª┘ü ┘ê╪┤┘ê╪º╪║╪▒', value: jobs.length, label: '┘ê╪╕┘è┘ü╪⌐ ╪┤╪º╪║╪▒╪⌐', color: 'text-amber-600', bg: 'bg-amber-50', svgColor: 'text-amber-500', path: 'M 0,15 Q 25,5 50,20 T 100,8', percent: '+18%' }
                      ].map((card, idx) => (
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
                            <span className="text-[10px] font-bold text-slate-400">{card.label}</span>
                            <div className="w-16 h-8">
                              <svg className={`w-full h-full ${card.svgColor} overflow-visible`} viewBox="0 0 100 30">
                                <path d={card.path} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 3. Double Charts: Circular Progress + Plans Done Progress Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Chart Left: Circular progress check */}
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col justify-between h-[300px]">
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-black text-slate-800 text-lg">┘ü╪¡╪╡ ┘ê┘à╪▒╪º╪¼╪╣╪⌐ ╪º┘ä╪╖┘ä╪¿╪º╪¬</h4>
                          <span className="text-xs font-bold text-[#26462C] bg-[#26462C]/10 px-3 py-1 rounded-full">╪¬╪¡╪»┘è╪½ ┘ü┘ê╪▒┘è</span>
                        </div>
                        <div className="flex items-center justify-around gap-6">
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="72" cy="72" r="56" className="text-slate-50" strokeWidth="12" stroke="currentColor" fill="transparent" />
                              <circle
                                cx="72"
                                cy="72"
                                r="56"
                                className="text-[#26462C] transition-all duration-1000 ease-out"
                                strokeWidth="12"
                                strokeDasharray={2 * Math.PI * 56}
                                strokeDashoffset={2 * Math.PI * 56 * (1 - 0.92)}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-3xl font-black text-slate-800">92%</span>
                              <span className="text-[10px] font-bold text-slate-400">╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡</span>
                            </div>
                          </div>
                          <div className="space-y-3 font-semibold text-sm text-slate-600">
                            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> <span>╪º┘ä┘à╪¬╪¡╪»╪½┘ê┘å: {stats.totalSpeakers}</span></div>
                            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> <span>╪º┘ä╪┤╪▒┘â╪º╪¬ ╪º┘ä┘å╪º╪┤╪ª╪⌐: {stats.totalStartups}</span></div>
                            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#26462C]"></span> <span>╪º┘ä┘à╪│╪¬╪½┘à╪▒┘ê┘å: {stats.totalInvestors}</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Chart Right: Plans progress bars */}
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col justify-between h-[300px]">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-black text-slate-800 text-lg">┘å╪│╪¿ ╪º┘â╪¬┘à╪º┘ä ┘ä╪¼╪º┘å ╪º┘ä╪¬┘å╪╕┘è┘à</h4>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">╪ú╪╣┘à╪º┘ä ╪º┘ä┘ä╪¼╪º┘å</span>
                        </div>
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          {[
                            { name: '┘ä╪¼┘å╪⌐ ╪º┘ä╪º╪│╪¬┘é╪¿╪º┘ä ┘ê╪º┘ä╪¬╪│╪¼┘è┘ä', percent: 84, color: 'bg-[#26462C]' },
                            { name: '┘ä╪¼┘å╪⌐ ╪º┘ä╪¬┘é┘è┘è┘à ╪º┘ä╪╣┘ä┘à┘è ┘ê╪º┘ä┘ü┘å┘è', percent: 70, color: 'bg-amber-500' },
                            { name: '╪º┘ä╪¬┘ê╪º╪╡┘ä ┘à╪╣ ╪º┘ä╪┤╪▒┘â╪º╪¬ ┘ê╪º┘ä┘à╪│╪¬╪½┘à╪▒┘è┘å', percent: 55, color: 'bg-[#F4A217]' }
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
                      
                      <div className="w-20 h-20 bg-gradient-to-tr from-emerald-800 to-[#26462C] rounded-[1.75rem] flex items-center justify-center shadow-lg relative z-10 mb-4 text-[#F4A217] font-black text-3xl">
                        AD
                      </div>

                      <h3 className="font-black text-slate-800 text-lg">╪ú╪»┘à┘å ╪º┘ä┘é┘à╪⌐ ╪º┘ä╪▒╪ª┘è╪│┘è</h3>
                      <span className="text-xs text-slate-400 font-bold mb-6">╪▒╪ª┘è╪│ ┘ä╪¼┘å╪⌐ ╪º┘ä╪Ñ╪┤╪▒╪º┘ü ╪º┘ä╪╣╪º┘à</span>
                      
                      <div className="w-full border-t border-slate-100 pt-6 space-y-4 text-right">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">╪¡╪º┘ä╪⌐ ╪º┘ä╪«╪º╪»┘à:</span>
                          <span className="text-emerald-600">┘å╪┤╪╖ ┘ê╪╡╪¡┘è</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">┘å┘ê╪╣ ╪º┘ä╪º╪¬╪╡╪º┘ä:</span>
                          <span className="text-slate-700">{isSupabaseConfigured ? 'Supabase SDK' : 'LocalStorage fallback'}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-400">╪¬╪º╪▒┘è╪« ╪¬╪│╪¼┘è┘ä ╪º┘ä╪»╪«┘ê┘ä:</span>
                          <span className="text-slate-700">╪º┘ä┘è┘ê┘à 11:00 ╪╡</span>
                        </div>
                      </div>
                    </div>

                    {/* Summit Milestones Calendar */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft space-y-6">
                      <div>
                        <h4 className="font-black text-slate-800 text-base mb-1">╪¼╪»┘ê┘ä ┘ü╪╣╪º┘ä┘è╪º╪¬ ╪º┘ä┘é┘à╪⌐</h4>
                        <p className="text-[10px] text-slate-400 font-semibold">┘à╪¬╪º╪¿╪╣╪⌐ ╪º┘ä┘ü╪¬╪▒╪º╪¬ ╪º┘ä╪▓┘à┘å┘è╪⌐ ┘ä┘ä┘ü╪╣╪º┘ä┘è╪º╪¬</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/50">
                        {[
                          { day: '╪º┘ä┘è┘ê┘à ╪º┘ä╪ú┘ê┘ä', label: '╪º┘ü╪¬╪¬╪º╪¡ ┘ê┘é╪¿┘ê┘ä', active: true },
                          { day: '╪º┘ä┘è┘ê┘à ╪º┘ä╪½╪º┘å┘è', label: '┘ê╪▒╪┤ ┘ê╪¬┘é┘è┘è┘à', active: false },
                          { day: '╪º┘ä┘è┘ê┘à ╪º┘ä╪½╪º┘ä╪½', label: '╪¡┘ü┘ä ╪º┘ä╪«╪¬╪º┘à', active: false }
                        ].map((item, idx) => (
                          <div key={idx} className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                            item.active 
                              ? 'bg-[#26462C] text-white shadow-md' 
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
                          { time: '02:00 ┘à', task: '╪º╪│╪¬┘é╪¿╪º┘ä ┘ê┘ü╪¡╪╡ ╪╖┘ä╪¿╪º╪¬ ┘à╪┤╪▒┘ê╪╣╪º╪¬ ╪º┘ä╪¡╪º╪│╪¿╪º╪¬', type: '╪▒╪ª┘è╪│┘è' },
                          { time: '02:30 ┘à', task: '╪¬┘é┘è┘è┘à ╪º┘ä╪¿╪¡┘ê╪½ ╪º┘ä╪¬╪╖╪¿┘è┘é┘è╪⌐ ┘ä┘é╪│┘à ╪º┘ä┘ç┘å╪»╪│╪⌐', type: '┘ü╪▒╪╣┘è' },
                          { time: '03:00 ┘à', task: '╪¬╪│╪¼┘è┘ä ╪º┘ä┘à╪¬╪¡╪»╪½┘è┘å ┘ê╪º┘ä┘à╪»╪▒╪¿┘è┘å ╪º┘ä╪ú╪¼╪º┘å╪¿', type: '╪▒╪ª┘è╪│┘è' },
                          { time: '03:50 ┘à', task: '╪¡╪╡╪▒ ╪ú╪╣╪»╪º╪» ╪º┘ä┘à╪│╪¼┘ä┘è┘å ╪¿┘à┘ä╪¬┘é┘ë ╪º┘ä╪¬┘ê╪╕┘è┘ü', type: '╪▒╪╡╪»' }
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
                        placeholder="╪º╪¿╪¡╪½ ╪¿╪º┘ä╪º╪│┘à╪î ╪º┘ä┘â┘ä┘è╪⌐╪î ╪º┘ä╪¿╪▒┘è╪»..."
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
                        <option value="╪º┘ä┘â┘ä">┘â┘ä ╪º┘ä╪¡╪º┘ä╪º╪¬</option>
                        <option value="╪¬┘à ╪º╪│╪¬┘ä╪º┘à ╪º┘ä╪╖┘ä╪¿">╪¬┘à ╪º╪│╪¬┘ä╪º┘à ╪º┘ä╪╖┘ä╪¿</option>
                        <option value="╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è">╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è</option>
                        <option value="╪¬╪¡╪¬ ╪º┘ä╪¬┘é┘è┘è┘à ╪º┘ä┘ü┘å┘è">╪¬╪¡╪¬ ╪º┘ä╪¬┘é┘è┘è┘à ╪º┘ä┘ü┘å┘è</option>
                        <option value="╪¬╪¡╪¬ ┘à╪▒╪º╪¼╪╣╪⌐ ╪º┘ä┘à┘ä┘â┘è╪⌐ ╪º┘ä┘ü┘â╪▒┘è╪⌐">╪¬╪¡╪¬ ┘à╪▒╪º╪¼╪╣╪⌐ ╪º┘ä┘à┘ä┘â┘è╪⌐ ╪º┘ä┘ü┘â╪▒┘è╪⌐</option>
                        <option value="┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐">┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐</option>
                      </select>
                    )}
                    <button
                      onClick={handleExportToExcel}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer hover:-translate-y-0.5 border border-emerald-500"
                      title="╪¬╪╡╪»┘è╪▒ ┘ç╪░┘ç ╪º┘ä┘é╪º╪ª┘à╪⌐ ╪Ñ┘ä┘ë ┘à┘ä┘ü ╪Ñ┘â╪│┘è┘ä CSV"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>╪¬╪╡╪»┘è╪▒ ╪Ñ┘ä┘ë ╪Ñ┘â╪│┘è┘ä</span>
                    </button>
                  </div>

                  {/* DATA CONTAINER */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden p-6 md:p-8">

              {/* --- NEWS TAB --- */}
              {activeTab === 'news' && !selectedItem && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="text-xl font-black text-[#26462C] mb-1">╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä╪ú╪«╪¿╪º╪▒</h3>
                      <p className="text-sm text-slate-500 font-bold">╪Ñ╪╢╪º┘ü╪⌐ ┘ê╪¬╪╣╪»┘è┘ä ┘ê╪¡╪░┘ü ╪º┘ä╪ú╪«╪¿╪º╪▒ ╪º┘ä┘à╪╣╪▒┘ê╪╢╪⌐ ┘ü┘è ╪º┘ä╪╡┘ü╪¡╪⌐ ╪º┘ä╪▒╪ª┘è╪│┘è╪⌐.</p>
                    </div>
                    <button 
                      onClick={() => setIsNewsModalOpen(true)}
                      className="bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0"
                    >
                      + ╪Ñ╪╢╪º┘ü╪⌐ ╪«╪¿╪▒ ╪¼╪»┘è╪»
                    </button>
                  </div>

                  {newsList.length === 0 ? (
                    <div className="py-20 text-center text-slate-500 font-bold bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                      ┘ä╪º ╪¬┘ê╪¼╪» ╪ú╪«╪¿╪º╪▒ ┘à╪╢╪º┘ü╪⌐ ╪¡╪¬┘ë ╪º┘ä╪ó┘å.
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
                                <span className="text-xs font-bold">┘ä╪º ╪¬┘ê╪¼╪» ╪╡┘ê╪▒╪⌐</span>
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
                               <button onClick={() => openEditNewsModal(newsItem)} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors">╪¬╪╣╪»┘è┘ä</button>
                               <button onClick={() => handleDeleteNews(newsItem.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">╪¡╪░┘ü</button>
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
                      <h3 className="text-xl font-black text-[#26462C] mb-1">╪Ñ╪»╪º╪▒╪⌐ ┘ê╪╕╪º╪ª┘ü ╪º┘ä┘à┘ä╪¬┘é┘ë</h3>
                      <p className="text-sm text-slate-500 font-bold">╪Ñ╪╢╪º┘ü╪⌐ ┘ê╪¬╪╣╪»┘è┘ä ┘ê╪¡╪░┘ü ╪º┘ä┘ê╪╕╪º╪ª┘ü ╪º┘ä╪┤╪º╪║╪▒╪⌐ ╪º┘ä┘à╪╣╪▒┘ê╪╢╪⌐ ┘ä┘ä╪╖┘ä╪º╪¿ ┘ê╪º┘ä╪«╪▒┘è╪¼┘è┘å ╪¿╪º┘ä┘à┘ä╪¬┘é┘ë.</p>
                    </div>
                    <button 
                      onClick={openAddJobModal}
                      className="bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm shrink-0 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>+ ╪Ñ╪╢╪º┘ü╪⌐ ┘ê╪╕┘è┘ü╪⌐ ╪¼╪»┘è╪»╪⌐</span>
                    </button>
                  </div>

                  {jobs.length === 0 ? (
                    <div className="py-20 text-center text-slate-500 font-bold bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
                      ┘ä╪º ╪¬┘ê╪¼╪» ┘ê╪╕╪º╪ª┘ü ┘à╪╢╪º┘ü╪⌐ ╪¡╪¬┘ë ╪º┘ä╪ó┘å.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                            <th className="p-4">╪┤╪╣╪º╪▒ ╪º┘ä╪┤╪▒┘â╪⌐</th>
                            <th className="p-4">╪º┘ä┘à╪│┘à┘ë ╪º┘ä┘ê╪╕┘è┘ü┘è</th>
                            <th className="p-4">╪º┘ä╪┤╪▒┘â╪⌐</th>
                            <th className="p-4">╪º┘ä┘à┘ê┘é╪╣</th>
                            <th className="p-4">╪º┘ä┘å┘ê╪╣</th>
                            <th className="p-4">╪º┘ä╪«╪¿╪▒╪⌐</th>
                            <th className="p-4 text-center">╪º┘ä╪Ñ╪¼╪▒╪º╪í╪º╪¬</th>
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
                                    ╪¬╪╣╪»┘è┘ä
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteJob(j.id)} 
                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                                  >
                                    ╪¡╪░┘ü
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
                        <th className="p-4">╪¬╪º╪▒┘è╪« ╪º┘ä╪¬┘é╪»┘è┘à</th>
                        <th className="p-4">╪º╪│┘à ╪º┘ä┘à╪┤╪▒┘ê╪╣</th>
                        <th className="p-4">╪º┘ä┘â┘ä┘è╪⌐ ┘ê╪º┘ä╪¼╪º┘à╪╣╪⌐</th>
                        <th className="p-4">╪º┘ä┘å┘ê╪╣</th>
                        <th className="p-4">╪º┘ä╪¡╪º┘ä╪⌐</th>
                        <th className="p-4 text-center">╪º┘ä╪Ñ╪¼╪▒╪º╪í╪º╪¬</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredGradProjects().length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">┘ä╪º ╪¬┘ê╪¼╪» ┘à╪┤╪▒┘ê╪╣╪º╪¬ ╪¬╪«╪▒╪¼ ┘à╪╖╪º╪¿┘é╪⌐ ┘ä┘ä╪¿╪¡╪½</td></tr>
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
                                p.status === '┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐' ? 'bg-green-100 text-green-700' :
                                p.status.includes('╪¬╪¡╪¬') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{p.status}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => { setSelectedItem(p); setSelectedType('graduation'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                  <Eye className="w-4 h-4" /> ┘ü╪¡╪╡ ╪º┘ä╪¬┘ü╪º╪╡┘è┘ä
                                </button>
                                <button onClick={() => handleDeleteItem(p.id, 'graduation')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs" title="╪¡╪░┘ü">
                                  <Trash className="w-3.5 h-3.5" /> ╪¡╪░┘ü
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
                        <th className="p-4">╪¬╪º╪▒┘è╪« ╪º┘ä╪¬┘é╪»┘è┘à</th>
                        <th className="p-4">╪º┘ä╪¿╪º╪¡╪½ ╪º┘ä╪▒╪ª┘è╪│┘è</th>
                        <th className="p-4">╪º┘ä┘â┘ä┘è╪⌐ ┘ê╪º┘ä╪¼╪º┘à╪╣╪⌐</th>
                        <th className="p-4">╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è</th>
                        <th className="p-4">╪º┘ä╪¡╪º┘ä╪⌐</th>
                        <th className="p-4 text-center">╪º┘ä╪Ñ╪¼╪▒╪º╪í╪º╪¬</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredResearch().length === 0 ? (
                        <tr><td colSpan="6" className="p-8 text-center text-slate-400 font-bold">┘ä╪º ╪¬┘ê╪¼╪» ╪¿╪¡┘ê╪½ ╪¬╪╖╪¿┘è┘é┘è╪⌐ ┘à╪╖╪º╪¿┘é╪⌐ ┘ä┘ä╪¿╪¡╪½</td></tr>
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
                                r.status === '┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐' ? 'bg-green-100 text-green-700' :
                                r.status.includes('╪¬╪¡╪¬') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{r.status}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => { setSelectedItem(r); setSelectedType('research'); }} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs">
                                  <Eye className="w-4 h-4" /> ┘ü╪¡╪╡ ╪º┘ä╪¬┘ü╪º╪╡┘è┘ä
                                </button>
                                <button onClick={() => handleDeleteItem(r.id, 'research')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1.5 font-bold text-xs" title="╪¡╪░┘ü">
                                  <Trash className="w-3.5 h-3.5" /> ╪¡╪░┘ü
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
                        <th className="p-4">╪º┘ä╪¬╪º╪▒┘è╪«</th>
                        <th className="p-4">╪º┘ä╪º╪│┘à ╪º┘ä┘â╪º┘à┘ä</th>
                        <th className="p-4">╪º┘ä╪¼┘ç╪⌐ / ╪º┘ä┘à╪ñ╪│╪│╪⌐</th>
                        <th className="p-4">╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è</th>
                        <th className="p-4">╪▒┘é┘à ╪º┘ä┘ç╪º╪¬┘ü</th>
                        <th className="p-4 text-center">╪º┘ä┘à┘ä┘ü / ╪º┘ä╪│┘è╪▒╪⌐ ╪º┘ä╪░╪º╪¬┘è╪⌐</th>
                        <th className="p-4">╪º┘ä╪¡╪º┘ä╪⌐</th>
                        <th className="p-4 text-center">╪º┘ä╪Ñ╪¼╪▒╪º╪í╪º╪¬</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredRegistrants(activeTab.slice(0, -1)).length === 0 ? (
                        <tr><td colSpan="8" className="p-8 text-center text-slate-400 font-bold">┘ä╪º ┘è┘ê╪¼╪» ┘à╪│╪¼┘ä┘ê┘å ┘ü┘è ┘ç╪░╪º ╪º┘ä┘é╪│┘à</td></tr>
                      ) : (
                        getFilteredRegistrants(activeTab.slice(0, -1)).map(r => (
                          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">{new Date(r.created_at).toLocaleDateString('ar-EG')}</td>
                            <td className="p-4 font-black text-slate-800">
                              <div>{r.full_name}</div>
                              {r.details.nationalId && <div className="text-xs text-purple-700 font-bold mt-1">╪º┘ä╪▒┘é┘à ╪º┘ä┘é┘ê┘à┘è: {r.details.nationalId}</div>}
                              {r.details.speechTopic && <div className="text-xs text-[#26462C] font-bold mt-1">╪º┘ä┘à┘ê╪╢┘ê╪╣: {r.details.speechTopic}</div>}
                              {r.details.startupName && <div className="text-xs text-[#F4A217] font-bold mt-1">╪º┘ä╪┤╪▒┘â╪⌐ ╪º┘ä┘å╪º╪┤╪ª╪⌐: {r.details.startupName}</div>}
                              {r.details.researchTitle && <div className="text-xs text-blue-600 font-bold mt-1">╪╣┘å┘ê╪º┘å ╪º┘ä╪¿╪¡╪½: {r.details.researchTitle}</div>}
                              {r.details.companyName && <div className="text-xs text-indigo-600 font-bold mt-1">╪º┘ä┘à╪ñ╪│╪│╪⌐: {r.details.companyName} ({r.details.partnerType})</div>}
                              {r.details.volunteerCommittee && <div className="text-xs text-emerald-600 font-bold mt-1">┘ä╪¼┘å╪⌐ ╪º┘ä╪¬╪╖┘ê╪╣: {r.details.volunteerCommittee}</div>}
                            </td>
                            <td className="p-4 font-bold text-slate-600">{r.organization}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.email}</td>
                            <td className="p-4 font-semibold text-slate-500">{r.phone}</td>
                            <td className="p-4 text-center">
                              {r.cv_url && r.cv_url !== '#' ? (
                                <a href={r.cv_url} target="_blank" className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs">
                                  <Download className="w-3.5 h-3.5" /> ╪¬╪¡┘à┘è┘ä ╪º┘ä┘à┘ä┘ü
                                </a>
                              ) : (
                                <span className="text-slate-400 font-bold text-xs">┘ä╪º ┘è┘ê╪¼╪» ┘à╪▒┘ü┘é</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                r.status === '┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐' ? 'bg-green-100 text-green-700' :
                                (r.status || '').includes('╪¬╪¡╪¬') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                              }`}>{r.status || '╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è'}</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                {r.status === '┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐' ? (
                                  <button 
                                    onClick={() => handleStatusChange(r.id, 'registration', '╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è')}
                                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold text-xs transition-colors whitespace-nowrap"
                                  >
                                    ╪Ñ┘ä╪║╪º╪í ╪º┘ä┘é╪¿┘ê┘ä
                                  </button>
                                ) : (
                                  <div className="flex flex-col items-center gap-1">
                                    <button 
                                      onClick={() => handleStatusChange(r.id, 'registration', '┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐')}
                                      disabled={!r.cv_url || r.cv_url === '#'}
                                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-sm whitespace-nowrap ${
                                        (!r.cv_url || r.cv_url === '#') 
                                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                                          : 'bg-green-600 hover:bg-green-700 text-white'
                                      }`}
                                      title={(!r.cv_url || r.cv_url === '#') ? '┘è╪▒╪¼┘ë ╪▒┘ü╪╣ ╪º┘ä╪│┘è╪▒╪⌐ ╪º┘ä╪░╪º╪¬┘è╪⌐ ╪ú┘ê┘ä╪º┘ï ┘ä╪¬╪¬┘à┘â┘å ┘à┘å ╪º┘ä┘é╪¿┘ê┘ä' : ''}
                                    >
                                      ┘à┘ê╪º┘ü┘é╪⌐ ┘ê┘é╪¿┘ê┘ä
                                    </button>
                                    {(!r.cv_url || r.cv_url === '#') && (
                                      <span className="text-[9px] text-red-500 font-bold whitespace-nowrap">┘è╪¼╪¿ ╪▒┘ü╪╣ ╪º┘ä┘Ç CV ╪ú┘ê┘ä╪º┘ï</span>
                                    )}
                                  </div>
                                )}
                                <button 
                                  onClick={() => handleDeleteItem(r.id, 'registration')} 
                                  className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg inline-flex items-center gap-1 font-bold text-xs" 
                                  title="╪¡╪░┘ü ╪º┘ä╪¡╪│╪º╪¿"
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
                    <h3 className="text-lg font-black text-slate-800">╪Ñ╪»╪º╪▒╪⌐ ┘à╪╣╪▒┘ê╪╢╪º╪¬ ┘à╪╣╪▒╪╢ ╪º┘ä╪º╪¿╪¬┘â╪º╪▒╪º╪¬ ╪º┘ä╪▒┘é┘à┘è╪⌐ ┘ê╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪╡╪╖┘å╪º╪╣┘è</h3>
                    <button 
                      onClick={openAddInnovationModal}
                      className="px-5 py-2.5 bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
                    >
                      <Plus className="w-4 h-4" /> ╪Ñ╪╢╪º┘ü╪⌐ ╪º╪¿╪¬┘â╪º╪▒ ╪¼╪»┘è╪»
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {innovations.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
                        ┘ä╪º ╪¬┘ê╪¼╪» ╪º╪¿╪¬┘â╪º╪▒╪º╪¬ ┘à╪╢╪º┘ü╪⌐ ╪¡╪º┘ä┘è╪º┘ï. ╪º╪╢╪║╪╖ ╪╣┘ä┘ë ╪º┘ä╪▓╪▒ ╪¿╪º┘ä╪ú╪╣┘ä┘ë ┘ä╪Ñ╪╢╪º┘ü╪⌐ ╪ú┘ê┘ä ╪º╪¿╪¬┘â╪º╪▒.
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
                                {item.category === 'ai' ? '╪░┘â╪º╪í ╪º╪╡╪╖┘å╪º╪╣┘è' : 
                                 item.category === 'cyber' ? '╪ú┘à┘å ╪│┘è╪¿╪▒╪º┘å┘è' :
                                 item.category === 'iot' ? '╪Ñ┘å╪¬╪▒┘å╪¬ ╪ú╪┤┘è╪º╪í' : '╪¬╪╖╪¿┘è┘é╪º╪¬ ┘ê┘è╪¿/╪¼┘ê╪º┘ä'}
                              </span>
                            </div>
                            <div className="p-6 space-y-3">
                              <span className="text-[10px] font-black text-slate-400">{item.team}</span>
                              <h4 className="font-black text-slate-800 text-base leading-snug line-clamp-1">{item.name}</h4>
                              <p className="text-xs font-bold text-slate-400 leading-relaxed line-clamp-2">{item.desc}</p>
                              
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                <span>╪º┘ä┘à╪│╪¬┘ê┘ë: <strong className="text-blue-600">{item.levelName || item.level}</strong></span>
                                <span>╪º┘ä╪¬┘é┘å┘è╪⌐: <strong>{item.stats?.tech || item.tech || 'Python'}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2">
                            <button 
                              onClick={() => openEditInnovationModal(item)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> ╪¬╪╣╪»┘è┘ä
                            </button>
                            <button 
                              onClick={() => handleDeleteInnovation(item.id)}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" /> ╪¡╪░┘ü
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
                    <h3 className="text-lg font-black text-slate-800">╪Ñ╪»╪º╪▒╪⌐ ┘à╪╣╪▒┘ê╪╢╪º╪¬ ┘ê┘à┘å╪¬╪¼╪º╪¬ ╪º┘ä┘ê╪¡╪»╪º╪¬ ╪º┘ä╪Ñ┘å╪¬╪º╪¼┘è╪⌐ ╪¿╪º┘ä┘â┘ä┘è╪º╪¬</h3>
                    <button 
                      onClick={openAddProductModal}
                      className="px-5 py-2.5 bg-[#26462C] hover:bg-[#1a301e] text-[#F4A217] rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-green-900/10"
                    >
                      <Plus className="w-4 h-4" /> ╪Ñ╪╢╪º┘ü╪⌐ ┘à┘å╪¬╪¼ ╪¼╪»┘è╪»
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length === 0 ? (
                      <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
                        ┘ä╪º ╪¬┘ê╪¼╪» ┘à┘å╪¬╪¼╪º╪¬ ┘à╪╢╪º┘ü╪⌐ ╪¡╪º┘ä┘è╪º┘ï. ╪º╪╢╪║╪╖ ╪╣┘ä┘ë ╪º┘ä╪▓╪▒ ╪¿╪º┘ä╪ú╪╣┘ä┘ë ┘ä╪Ñ╪╢╪º┘ü╪⌐ ╪ú┘ê┘ä ┘à┘å╪¬╪¼.
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
                                <span>╪º┘ä┘é╪│┘à: <strong className="text-indigo-600">{item.category}</strong></span>
                                <span>╪º┘ä╪¬┘é┘è┘è┘à: <strong>{item.rating || '4.8 (120)'}</strong></span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2">
                            <button 
                              onClick={() => openEditProductModal(item)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" /> ╪¬╪╣╪»┘è┘ä
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(item.id)}
                              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <Trash className="w-3.5 h-3.5" /> ╪¡╪░┘ü
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
                      <ArrowLeft className="w-4 h-4" /> ╪º┘ä╪╣┘ê╪»╪⌐ ┘ä┘ä╪¼╪»┘ê┘ä
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-400">╪¬╪¡╪»┘è╪½ ╪¡╪º┘ä╪⌐ ╪º┘ä╪╖┘ä╪¿:</span>
                      <select
                        value={selectedItem.status}
                        onChange={(e) => handleStatusChange(selectedItem.id, selectedType, e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 font-black text-sm text-[#26462C] focus:ring-2 focus:ring-[#26462C]"
                      >
                        <option value="╪¬┘à ╪º╪│╪¬┘ä╪º┘à ╪º┘ä╪╖┘ä╪¿">╪¬┘à ╪º╪│╪¬┘ä╪º┘à ╪º┘ä╪╖┘ä╪¿</option>
                        <option value="╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è">╪¬╪¡╪¬ ╪º┘ä┘ü╪¡╪╡ ╪º┘ä╪Ñ╪»╪º╪▒┘è</option>
                        <option value="╪¬╪¡╪¬ ╪º┘ä╪¬┘é┘è┘è┘à ╪º┘ä┘ü┘å┘è">╪¬╪¡╪¬ ╪º┘ä╪¬┘é┘è┘è┘à ╪º┘ä┘ü┘å┘è</option>
                        <option value="╪¬╪¡╪¬ ┘à╪▒╪º╪¼╪╣╪⌐ ╪º┘ä┘à┘ä┘â┘è╪⌐ ╪º┘ä┘ü┘â╪▒┘è╪⌐">╪¬╪¡╪¬ ┘à╪▒╪º╪¼╪╣╪⌐ ╪º┘ä┘à┘ä┘â┘è╪⌐ ╪º┘ä┘ü┘â╪▒┘è╪⌐</option>
                        <option value="┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐">┘à┘é╪¿┘ê┘ä ┘ä┘ä╪╣╪▒╪╢ ┘ü┘è ╪º┘ä┘é┘à╪⌐</option>
                      </select>
                    </div>
                  </div>

                  {/* GRADUATION PROJECT DETAIL VIEW */}
                  {selectedType === 'graduation' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <span className="text-xs font-bold text-slate-400 block mb-1">╪º╪│┘à ╪º┘ä┘à╪┤╪▒┘ê╪╣ (╪╣╪▒╪¿┘è / ╪Ñ┘å╪¼┘ä┘è╪▓┘è)</span>
                          <h2 className="text-2xl font-black text-[#26462C]">{selectedItem.project_name_ar}</h2>
                          <p className="text-md text-slate-500 font-bold" dir="ltr">{selectedItem.project_name_en}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#26462C] mb-3">┘à┘ä╪«╪╡ ╪º┘ä┘à╪┤╪▒┘ê╪╣</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.projectSummary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#26462C] mb-2">╪º┘ä┘à╪┤┘â┘ä╪⌐</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.problemAddressed}</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="font-black text-[#26462C] mb-2">╪º┘ä╪¡┘ä</h4>
                            <p className="text-slate-600 text-sm font-semibold">{selectedItem.details?.solutionProvided}</p>
                          </div>
                        </div>

                        {/* Team members list */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-[#26462C] mb-4">╪ú╪╣╪╢╪º╪í ╪º┘ä┘ü╪▒┘è┘é ({selectedItem.team_members?.length} ╪╖┘ä╪º╪¿)</h4>
                          <div className="space-y-4">
                            {selectedItem.team_members?.map((m, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-2">
                                <div>
                                  <span className="font-black text-slate-800">{m.name}</span>
                                  <span className="text-xs bg-[#F4A217]/10 text-[#26462C] px-2 py-0.5 rounded mr-2 font-bold">{m.role || '╪╣╪╢┘ê'}</span>
                                </div>
                                <div className="text-xs font-semibold text-slate-500 flex flex-wrap gap-4">
                                  <span>╪º┘ä┘â┘ä┘è╪⌐: {m.college}</span>
                                  <span>╪º┘ä┘ç╪º╪¬┘ü: {m.phone}</span>
                                  <span>╪º┘ä╪¿╪▒┘è╪»: {m.email}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Side project info & attachments */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-[#26462C] border-b pb-2">╪¿┘è╪º┘å╪º╪¬ ╪º┘ä┘à┘é╪▒╪▒ ┘ê╪º┘ä╪¼╪º┘à╪╣╪⌐</h4>
                          <div>
                            <span className="text-xs text-slate-400 block">╪º┘ä┘â┘ä┘è╪⌐</span>
                            <span className="font-bold text-slate-700">{selectedItem.college}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">╪º┘ä┘é╪│┘à</span>
                            <span className="font-bold text-slate-700">{selectedItem.department}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">╪│┘å╪⌐ ╪º┘ä╪¬╪«╪▒╪¼</span>
                            <span className="font-bold text-slate-700">{selectedItem.year}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-[#26462C] border-b pb-2">╪º┘ä┘à┘ä┘ü╪º╪¬ ┘ê╪º┘ä┘à╪▒┘ü┘é╪º╪¬</h4>
                          {Object.keys(selectedItem.files || {}).length === 0 ? (
                            <span className="text-xs text-slate-400 font-bold">┘ä╪º ╪¬┘ê╪¼╪» ┘à┘ä┘ü╪º╪¬ ┘à╪▒┘ü┘ê╪╣╪⌐</span>
                          ) : (
                            Object.entries(selectedItem.files).map(([key, url]) => (
                              <a 
                                href={url !== '#' ? url : undefined} 
                                onClick={(e) => {
                                  if (url === '#') {
                                    e.preventDefault();
                                    alert('╪╣╪░╪▒╪º┘ï╪î ┘ç╪░╪º ╪º┘ä┘à┘ä┘ü ╪║┘è╪▒ ┘à╪¬┘ê┘ü╪▒ ╪¡╪º┘ä┘è╪º┘ï.');
                                  }
                                }}
                                target="_blank" 
                                rel="noreferrer"
                                key={key} 
                                className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {key === 'summaryPdf' ? '┘à┘ä╪«╪╡ ╪º┘ä┘à╪┤╪▒┘ê╪╣ PDF' :
                                   key === 'pitchDeck' ? '╪º┘ä╪╣╪▒╪╢ ╪º┘ä╪¬┘é╪»┘è┘à┘è' :
                                   key === 'screenshot' ? '╪╡┘ê╪▒╪⌐ ┘ä┘é╪╖╪⌐ ╪º┘ä╪┤╪º╪┤╪⌐' : key}
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
                          <span className="text-xs font-bold text-slate-400 block mb-1">╪º╪│┘à ╪º┘ä╪¿╪º╪¡╪½ ╪º┘ä╪▒╪ª┘è╪│┘è</span>
                          <h2 className="text-2xl font-black text-[#183059]">{selectedItem.pi_name}</h2>
                          <p className="text-md text-slate-500 font-bold">{selectedItem.pi_rank} - {selectedItem.pi_faculty}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-slate-800 mb-2">╪º┘ä┘à╪┤┘â┘ä╪⌐ ╪º┘ä┘à╪│╪¬┘ç╪»┘ü╪⌐ ╪¿╪º┘ä╪¿╪¡╪½</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.problem}</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h4 className="font-black text-slate-800 mb-2">╪º┘ä╪¡┘ä ┘ê╪º┘ä╪¬╪╖╪¿┘è┘é ╪º┘ä┘à┘é╪¬╪▒╪¡</h4>
                          <p className="text-slate-700 leading-relaxed font-semibold">{selectedItem.details?.solution}</p>
                        </div>
                      </div>

                      {/* Research Side Panel */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">╪¿┘è╪º┘å╪º╪¬ ╪º┘ä╪º╪¬╪╡╪º┘ä ┘ä┘ä╪¿╪º╪¡╪½</h4>
                          <div>
                            <span className="text-xs text-slate-400 block">╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_email}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">╪▒┘é┘à ╪º┘ä┘ç╪º╪¬┘ü</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_phone}</span>
                          </div>
                          <div>
                            <span className="text-xs text-slate-400 block">╪º┘ä┘é╪│┘à ╪º┘ä╪╣┘ä┘à┘è</span>
                            <span className="font-bold text-slate-700">{selectedItem.pi_dept}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">╪º┘ä┘à┘ä┘ü╪º╪¬ ╪º┘ä╪¿╪¡╪½┘è╪⌐</h4>
                          {Object.keys(selectedItem.files || {}).length === 0 ? (
                            <span className="text-xs text-slate-400 font-bold">┘ä╪º ╪¬┘ê╪¼╪» ┘à┘ä┘ü╪º╪¬ ┘à╪▒┘ü┘ê╪╣╪⌐</span>
                          ) : (
                            Object.entries(selectedItem.files).map(([key, url]) => (
                              <a 
                                href={url !== '#' ? url : undefined} 
                                onClick={(e) => {
                                  if (url === '#') {
                                    e.preventDefault();
                                    alert('╪╣╪░╪▒╪º┘ï╪î ┘ç╪░╪º ╪º┘ä┘à┘ä┘ü ╪║┘è╪▒ ┘à╪¬┘ê┘ü╪▒ ╪¡╪º┘ä┘è╪º┘ï.');
                                  }
                                }}
                                target="_blank" 
                                rel="noreferrer"
                                key={key} 
                                className="flex items-center justify-between p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-red-500" />
                                  {key === 'researchPdf' ? '┘à┘ä┘ü ╪º┘ä╪¿╪¡╪½ ╪º┘ä╪▒╪ª┘è╪│┘è' :
                                   key === 'marketSummaryPdf' ? '╪º┘ä┘à┘ä╪«╪╡ ╪º┘ä╪¬╪│┘ê┘è┘é┘è' : key}
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
            <div className="bg-[#26462C] text-white p-6 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-black text-[#F4A217]">
                {exhibitionModalType === 'innovation'
                  ? (exhibitionEditItem ? '╪¬╪╣╪»┘è┘ä ╪¿┘è╪º┘å╪º╪¬ ╪º┘ä╪º╪¿╪¬┘â╪º╪▒' : '╪Ñ╪╢╪º┘ü╪⌐ ╪º╪¿╪¬┘â╪º╪▒ ╪¼╪»┘è╪» ┘ä┘à╪╣╪▒╪╢ ╪º┘ä╪º╪¿╪¬┘â╪º╪▒╪º╪¬')
                  : (exhibitionEditItem ? '╪¬╪╣╪»┘è┘ä ╪¿┘è╪º┘å╪º╪¬ ╪º┘ä┘à┘å╪¬╪¼' : '╪Ñ╪╢╪º┘ü╪⌐ ┘à┘å╪¬╪¼ ╪¼╪»┘è╪» ┘ä┘ä┘ê╪¡╪»╪º╪¬ ╪º┘ä╪Ñ┘å╪¬╪º╪¼┘è╪⌐')
                }
              </h2>
              <button 
                onClick={() => setIsExhibitionModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold"
              >
                Γ£ò
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-right" dir="rtl">
              {exhibitionModalType === 'innovation' ? (
                <form onSubmit={handleSaveInnovation} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪╣┘å┘ê╪º┘å ╪º┘ä╪º╪¿╪¬┘â╪º╪▒ *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.name}
                        onChange={(e) => setInnovationFormData({...innovationFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º╪│┘à ╪º┘ä┘ü╪▒┘è┘é / ╪º┘ä┘à╪¿╪¬┘â╪▒ *</label>
                      <input 
                        type="text" 
                        required
                        value={innovationFormData.team}
                        onChange={(e) => setInnovationFormData({...innovationFormData, team: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä╪¬╪╡┘å┘è┘ü *</label>
                      <select 
                        value={innovationFormData.category}
                        onChange={(e) => setInnovationFormData({...innovationFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="ai">╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪╡╪╖┘å╪º╪╣┘è</option>
                        <option value="cyber">╪º┘ä╪ú┘à┘å ╪º┘ä╪│┘è╪¿╪▒╪º┘å┘è</option>
                        <option value="iot">╪Ñ┘å╪¬╪▒┘å╪¬ ╪º┘ä╪ú╪┤┘è╪º╪í</option>
                        <option value="apps">╪¬╪╖╪¿┘è┘é╪º╪¬ ╪º┘ä┘ê┘è╪¿ ┘ê╪º┘ä╪¼┘ê╪º┘ä</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">┘à╪│╪¬┘ê┘ë ╪º┘ä╪¼╪º┘ç╪▓┘è╪⌐ *</label>
                      <select 
                        value={innovationFormData.level}
                        onChange={(e) => {
                          const val = e.target.value;
                          let name = '┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è';
                          if (val === 'advanced') name = '┘à╪│╪¬┘ê┘ë ┘à╪¬┘é╪»┘à';
                          if (val === 'ready') name = '╪¼╪º┘ç╪▓ ┘ä┘ä╪¬╪¿┘å┘è ╪º┘ä╪¬╪¼╪º╪▒┘è';
                          setInnovationFormData({...innovationFormData, level: val, levelName: name});
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="prototype">┘å┘à┘ê╪░╪¼ ╪ú┘ê┘ä┘è</option>
                        <option value="advanced">┘à╪│╪¬┘ê┘ë ┘à╪¬┘é╪»┘à</option>
                        <option value="ready">╪¼╪º┘ç╪▓ ┘ä┘ä╪¬╪¿┘å┘è ╪º┘ä╪¬╪¼╪º╪▒┘è</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä╪¬┘é┘å┘è╪⌐ ╪º┘ä┘à╪│╪¬╪«╪»┘à╪⌐</label>
                      <input 
                        type="text" 
                        value={innovationFormData.tech}
                        onChange={(e) => setInnovationFormData({...innovationFormData, tech: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="┘à╪½╪º┘ä: React / Node.js"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪ú┘è┘é┘ê┘å╪⌐ ╪º┘ä╪╣╪▒╪╢ (╪º╪│┘à ╪º┘ä╪ú┘è┘é┘ê┘å╪⌐)</label>
                      <select 
                        value={innovationFormData.icon}
                        onChange={(e) => setInnovationFormData({...innovationFormData, icon: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="Cpu">Cpu (┘à╪╣╪º┘ä╪¼)</option>
                        <option value="Lock">Lock (┘é┘ü┘ä ╪¡┘à╪º┘è╪⌐)</option>
                        <option value="Sprout">Sprout (╪¿┘è╪ª┘è / ┘å╪¿╪º╪¬)</option>
                        <option value="Globe">Globe (╪Ñ┘å╪¬╪▒┘å╪¬ / ╪┤╪¿┘â╪⌐)</option>
                        <option value="Database">Database (┘é┘ê╪º╪╣╪» ╪¿┘è╪º┘å╪º╪¬)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪▒╪º╪¿╪╖ ╪╡┘ê╪▒╪⌐ ╪º┘ä╪º╪¿╪¬┘â╪º╪▒</label>
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
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä┘ê╪╡┘ü ┘ê╪º┘ä╪┤╪▒╪¡ *</label>
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
                      {exhibitionEditItem ? '╪¡┘ü╪╕ ╪º┘ä╪¬╪╣╪»┘è┘ä╪º╪¬' : '╪Ñ╪╢╪º┘ü╪⌐ ┘ä┘ä╪º╪¿╪¬┘â╪º╪▒╪º╪¬'}
                    </button>
                    <button type="button" onClick={() => setIsExhibitionModalOpen(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
                      ╪Ñ┘ä╪║╪º╪í
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º╪│┘à ╪º┘ä┘à┘å╪¬╪¼ / ╪º┘ä╪«╪»┘à╪⌐ *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.name}
                        onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä┘â┘ä┘è╪⌐ ╪º┘ä┘à┘å╪¬╪¼╪⌐ *</label>
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
                        <option value="agriculture">┘â┘ä┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣╪⌐</option>
                        <option value="science">┘â┘ä┘è╪⌐ ╪º┘ä╪╣┘ä┘ê┘à</option>
                        <option value="artedu">┘â┘ä┘è╪⌐ ╪º┘ä╪¬╪▒╪¿┘è╪⌐ ╪º┘ä┘ü┘å┘è╪⌐</option>
                        <option value="specific">┘â┘ä┘è╪⌐ ╪º┘ä╪¬╪▒╪¿┘è╪⌐ ╪º┘ä┘å┘ê╪╣┘è╪⌐</option>
                        <option value="engineering">┘â┘ä┘è╪⌐ ╪º┘ä┘ç┘å╪»╪│╪⌐</option>
                        <option value="computers">┘â┘ä┘è╪⌐ ╪º┘ä╪¡╪º╪│╪¿╪º╪¬ ┘ê╪º┘ä┘à╪╣┘ä┘ê┘à╪º╪¬</option>
                        <option value="pharmacy">┘â┘ä┘è╪⌐ ╪º┘ä╪╡┘è╪»┘ä╪⌐</option>
                        <option value="finearts">┘â┘ä┘è╪⌐ ╪º┘ä┘ü┘å┘ê┘å ╪º┘ä╪¼┘à┘è┘ä╪⌐</option>
                        <option value="tourism">┘â┘ä┘è╪⌐ ╪º┘ä╪│┘è╪º╪¡╪⌐ ┘ê╪º┘ä┘ü┘å╪º╪»┘é</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä╪¬╪╡┘å┘è┘ü ┘ê╪º┘ä┘é╪╖╪º╪╣ *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.category}
                        onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="┘à╪½╪º┘ä: ┘à┘å╪¬╪¼╪º╪¬ ╪▓╪▒╪º╪╣┘è╪⌐ ╪ú┘ê ┘à┘å╪╕┘ü╪º╪¬"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä╪│╪╣╪▒ ╪º┘ä╪¬╪¼╪º╪▒┘è *</label>
                      <input 
                        type="text" 
                        required
                        value={productFormData.price}
                        onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="┘à╪½╪º┘ä: 150 ╪¼.┘à"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪┤╪╣╪º╪▒ ╪º┘ä╪¬╪│┘ê┘è┘é (Tag) (╪º╪«╪¬┘è╪º╪▒┘è)</label>
                      <input 
                        type="text" 
                        value={productFormData.tag}
                        onChange={(e) => setProductFormData({...productFormData, tag: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                        placeholder="┘à╪½╪º┘ä: ╪º┘ä╪ú┘â╪½╪▒ ┘à╪¿┘è╪╣╪º┘ï ╪ú┘ê ╪╣╪╡╪▒ ╪¿╪º╪▒╪»"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">┘ä┘ê┘å ╪º┘ä╪┤╪╣╪º╪▒</label>
                      <select 
                        value={productFormData.tagColor}
                        onChange={(e) => setProductFormData({...productFormData, tagColor: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] outline-none font-bold text-xs"
                      >
                        <option value="bg-emerald-600 text-white">╪ú╪«╪╢╪▒ ╪▓┘à╪▒╪»┘è</option>
                        <option value="bg-amber-500 text-white">╪░┘ç╪¿┘è / ╪¿╪▒╪¬┘é╪º┘ä┘è</option>
                        <option value="bg-blue-600 text-white">╪ú╪▓╪▒┘é ╪»╪º┘â┘å</option>
                        <option value="bg-purple-600 text-white">╪¿┘å┘ü╪│╪¼┘è ┘ü┘å┘è</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪▒╪º╪¿╪╖ ╪╡┘ê╪▒╪⌐ ╪º┘ä┘à┘å╪¬╪¼</label>
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
                      <label className="block text-xs font-bold text-slate-700 mb-2">╪¬┘ü╪º╪╡┘è┘ä ┘ê┘à┘ê╪º╪╡┘ü╪º╪¬ ╪º┘ä┘à┘å╪¬╪¼ *</label>
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
                      {exhibitionEditItem ? '╪¡┘ü╪╕ ╪º┘ä╪¬╪╣╪»┘è┘ä╪º╪¬' : '╪Ñ╪╢╪º┘ü╪⌐ ┘ä┘ä┘à┘å╪¬╪¼╪º╪¬'}
                    </button>
                    <button type="button" onClick={() => setIsExhibitionModalOpen(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
                      ╪Ñ┘ä╪║╪º╪í
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
              <h2 className="text-2xl font-black text-[#F4A217]">{editingNewsId ? '╪¬╪╣╪»┘è┘ä ╪º┘ä╪«╪¿╪▒' : '╪Ñ╪╢╪º┘ü╪⌐ ╪«╪¿╪▒ ╪¼╪»┘è╪»'}</h2>
              <button 
                onClick={() => setIsNewsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold"
              >
                Γ£ò
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleSaveNews} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">╪╣┘å┘ê╪º┘å ╪º┘ä╪«╪¿╪▒ *</label>
                  <input 
                    type="text" 
                    required
                    value={newNewsData.title}
                    onChange={(e) => setNewNewsData({...newNewsData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none"
                    placeholder="╪º┘â╪¬╪¿ ╪╣┘å┘ê╪º┘å ╪º┘ä╪«╪¿╪▒ ┘ç┘å╪º"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">┘à╪¡╪¬┘ê┘ë ┘ê╪¬┘ü╪º╪╡┘è┘ä ╪º┘ä╪«╪¿╪▒ *</label>
                  <textarea 
                    required
                    rows={5}
                    value={newNewsData.content}
                    onChange={(e) => setNewNewsData({...newNewsData, content: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none resize-none"
                    placeholder="╪º┘â╪¬╪¿ ╪¬┘ü╪º╪╡┘è┘ä ╪º┘ä╪«╪¿╪▒ ┘ç┘å╪º..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">╪▒╪º╪¿╪╖ ╪╡┘ê╪▒╪⌐ ╪º┘ä╪«╪¿╪▒ (╪º╪«╪¬┘è╪º╪▒┘è)</label>
                  <input 
                    type="text" 
                    value={newNewsData.image_url}
                    onChange={(e) => setNewNewsData({...newNewsData, image_url: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none"
                    placeholder="┘à╪½╪º┘ä: https://example.com/image.jpg"
                  />
                  <p className="text-xs text-slate-500 mt-2 font-semibold">╪Ñ╪░╪º ╪¬╪▒┘â╪¬ ┘ç╪░╪º ╪º┘ä╪¡┘é┘ä ┘ü╪º╪▒╪║╪º┘ï╪î ╪│┘è╪¬┘à ┘ê╪╢╪╣ ╪ú┘è┘é┘ê┘å╪⌐ ╪º┘ü╪¬╪▒╪º╪╢┘è╪⌐.</p>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#26462C] hover:bg-[#1a301e] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm"
                  >
                    {editingNewsId ? '╪¡┘ü╪╕ ╪º┘ä╪¬╪╣╪»┘è┘ä╪º╪¬' : '┘å╪┤╪▒ ╪º┘ä╪«╪¿╪▒'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsNewsModalOpen(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                  >
                    ╪Ñ┘ä╪║╪º╪í
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
              <h2 className="text-2xl font-black text-[#F4A217]">{jobEditItem ? '╪¬╪╣╪»┘è┘ä ┘ê╪╕┘è┘ü╪⌐' : '╪Ñ╪╢╪º┘ü╪⌐ ┘ê╪╕┘è┘ü╪⌐ ╪¼╪»┘è╪»╪⌐'}</h2>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors font-bold cursor-pointer"
              >
                Γ£ò
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 text-right" dir="rtl">
              <form onSubmit={handleSaveJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä┘à╪│┘à┘ë ╪º┘ä┘ê╪╕┘è┘ü┘è *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.title}
                      onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="┘à╪½╪º┘ä: ┘à┘ç┘å╪»╪│ ╪¿╪▒┘à╪¼┘è╪º╪¬ ┘ê╪º╪¼┘ç╪º╪¬ ╪ú┘à╪º┘à┘è╪⌐"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">╪º╪│┘à ╪º┘ä╪┤╪▒┘â╪⌐ *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.company}
                      onChange={(e) => setJobFormData({...jobFormData, company: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="┘à╪½╪º┘ä: TechVision Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä┘à┘ê┘é╪╣ ╪º┘ä╪¼╪║╪▒╪º┘ü┘è *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.location}
                      onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="┘à╪½╪º┘ä: ╪º┘ä┘é╪▒┘è╪⌐ ╪º┘ä╪░┘â┘è╪⌐╪î ╪º┘ä┘é╪º┘ç╪▒╪⌐"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">╪▒╪º╪¿╪╖ ╪º┘ä╪┤╪╣╪º╪▒ (╪º╪«╪¬┘è╪º╪▒┘è)</label>
                    <input 
                      type="text" 
                      value={jobFormData.logo}
                      onChange={(e) => setJobFormData({...jobFormData, logo: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="┘à╪½╪º┘ä: https://example.com/logo.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">┘å┘ê╪╣ ╪º┘ä╪»┘ê╪º┘à *</label>
                    <select 
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({...jobFormData, type: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-bold text-xs"
                    >
                      <option value="╪»┘ê╪º┘à ┘â╪º┘à┘ä">╪»┘ê╪º┘à ┘â╪º┘à┘ä</option>
                      <option value="╪»┘ê╪º┘à ╪¼╪▓╪ª┘è">╪»┘ê╪º┘à ╪¼╪▓╪ª┘è</option>
                      <option value="╪╣┘å ╪¿┘Å╪╣╪» (Remote)">╪╣┘å ╪¿┘Å╪╣╪» (Remote)</option>
                      <option value="╪¬╪»╪▒┘è╪¿ (Internship)">╪¬╪»╪▒┘è╪¿ (Internship)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">╪º┘ä╪«╪¿╪▒╪⌐ ╪º┘ä┘à╪╖┘ä┘ê╪¿╪⌐ *</label>
                    <input 
                      type="text" 
                      required
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({...jobFormData, experience: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs"
                      placeholder="┘à╪½╪º┘ä: ╪¡╪»┘è╪½ ╪º┘ä╪¬╪«╪▒╪¼╪î 1-3 ╪│┘å┘ê╪º╪¬"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">╪¬┘ü╪º╪╡┘è┘ä ┘ê╪┤╪▒┘ê╪╖ ╪º┘ä┘ê╪╕┘è┘ü╪⌐ *</label>
                  <textarea 
                    required
                    rows={4}
                    value={jobFormData.details}
                    onChange={(e) => setJobFormData({...jobFormData, details: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#26462C] focus:ring-1 focus:ring-[#26462C] outline-none font-semibold text-xs resize-none"
                    placeholder="╪º┘â╪¬╪¿ ┘à╪¬╪╖┘ä╪¿╪º╪¬ ╪º┘ä┘ê╪╕┘è┘ü╪⌐ ┘ê┘ê╪╡┘ü ╪º┘ä╪»┘ê╪▒ ╪¿╪º┘ä╪¬┘ü╪╡┘è┘ä..."
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-[#26462C] hover:bg-[#1a301e] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {jobEditItem ? '╪¡┘ü╪╕ ╪º┘ä╪¬╪╣╪»┘è┘ä╪º╪¬' : '╪Ñ╪╢╪º┘ü╪⌐ ╪º┘ä┘ê╪╕┘è┘ü╪⌐'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    ╪Ñ┘ä╪║╪º╪í
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
