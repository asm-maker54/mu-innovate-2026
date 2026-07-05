import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, BookOpen, GraduationCap, Mic, Settings, LayoutDashboard, 
  Calendar, Clock, FileText, CheckCircle, AlertCircle, LogOut,
  Upload, Camera, FileCheck, X, XCircle, ExternalLink,
  Play, Pause, Bell, ChevronUp, ChevronDown, ChevronRight, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeRole, setActiveRole] = useState('user');
  const [activeTab, setActiveTab] = useState('overview');


  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    organization: '',
    cv_url: '',
    speechTopic: '',
    speakerExpertise: '',
    speakerBio: '',
    speakerLinkedin: '',
    speakerFacebook: '',
    speakerX: '',
    speakerImage: '',
    startupName: '',
    industry: '',
    stage: '',
    elevatorPitch: '',
    researchTitle: '',
    researchIdea: '',
    trlLevel: '',
    mentorExpertise: '',
    yearsExperience: '',
    companyName: '',
    partnerType: '',
    partnerMessage: '',
    volunteerCommittee: '',
    volunteerReason: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  // Profile Image Editor States
  const [editorImageSrc, setEditorImageSrc] = useState(null);
  const [imageEditorOpen, setImageEditorOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Lightbox Modal for profile image preview
  const [imageLightboxOpen, setImageLightboxOpen] = useState(false);

  // Interactive Dashboard States (Crextio layout)
  const [trackerPlaying, setTrackerPlaying] = useState(false);
  const [trackerTime, setTrackerTime] = useState(225); // 3 minutes 45 seconds (03:45)
  const [activeAccordion, setActiveAccordion] = useState('personal'); // 'personal', 'docs', 'support'
  const [tasks, setTasks] = useState([
    { id: 1, text: 'استكمال ملف البيانات الشخصية', checked: true },
    { id: 2, text: 'تعديل وتأكيد الصورة الشخصية', checked: true },
    { id: 3, text: 'رفع ملف السيرة الذاتية (CV)', checked: true },
    { id: 4, text: 'مراجعة جدول الفعاليات والورش', checked: false },
    { id: 5, text: 'تأكيد الحضور في الجلسة الافتتاحية', checked: false },
    { id: 6, text: 'مشاركة رابط بطاقة المتحدث', checked: false },
    { id: 7, text: 'تنزيل كتيب المبتكرين للقمة', checked: false },
    { id: 8, text: 'التواصل مع الموجه الخاص بك', checked: false }
  ]);

  // Live stopwatch timer effect
  useEffect(() => {
    let interval = null;
    if (trackerPlaying) {
      interval = setInterval(() => {
        setTrackerTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [trackerPlaying]);

  const formatTrackerTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        organization: user.organization || '',
        cv_url: user.cv_url || user.details?.cv_url || '',
        speechTopic: user.details?.speechTopic || '',
        speakerExpertise: user.details?.speakerExpertise || '',
        speakerBio: user.details?.speakerBio || '',
        speakerLinkedin: user.details?.speakerLinkedin || '',
        speakerFacebook: user.details?.speakerFacebook || '',
        speakerX: user.details?.speakerX || '',
        speakerImage: user.details?.speakerImage || '',
        startupName: user.details?.startupName || '',
        industry: user.details?.industry || '',
        stage: user.details?.stage || '',
        elevatorPitch: user.details?.elevatorPitch || '',
        researchTitle: user.details?.researchTitle || '',
        researchIdea: user.details?.researchIdea || '',
        trlLevel: user.details?.trlLevel || '',
        mentorExpertise: user.details?.mentorExpertise || '',
        yearsExperience: user.details?.yearsExperience || '',
        companyName: user.details?.companyName || '',
        partnerType: user.details?.partnerType || '',
        partnerMessage: user.details?.partnerMessage || '',
        volunteerCommittee: user.details?.volunteerCommittee || '',
        volunteerReason: user.details?.volunteerReason || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveUserRecord = async (updatedUser) => {
    const { supabase, isSupabaseConfigured } = await import('../supabaseClient');
    if (isSupabaseConfigured) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const isUuid = uuidRegex.test(user.id);
      
      let query = supabase
        .from('registrations')
        .update({
          full_name: updatedUser.full_name,
          phone: updatedUser.phone,
          organization: updatedUser.organization,
          cv_url: updatedUser.cv_url,
          details: updatedUser.details
        });

      if (isUuid) {
        query = query.eq('id', user.id);
      } else {
        query = query.eq('email', user.email);
      }

      const { error } = await query;
      if (error) throw error;
    } else {
      const localRegs = JSON.parse(localStorage.getItem('local_registrations') || '[]');
      const updatedRegs = localRegs.map(r => (r.id === user.id || r.email === user.email) ? {
        ...r,
        full_name: updatedUser.full_name,
        phone: updatedUser.phone,
        organization: updatedUser.organization,
        cv_url: updatedUser.cv_url,
        details: updatedUser.details
      } : r);
      localStorage.setItem('local_registrations', JSON.stringify(updatedRegs));
    }
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setEditorImageSrc(reader.result);
      setZoom(1);
      setTranslateX(0);
      setTranslateY(0);
      setBrightness(100);
      setContrast(100);
      setImageEditorOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - translateX, y: e.clientY - translateY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTranslateX(e.clientX - dragStart.x);
    setTranslateY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX - translateX, y: e.touches[0].clientY - translateY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setTranslateX(e.touches[0].clientX - dragStart.x);
    setTranslateY(e.touches[0].clientY - dragStart.y);
  };

  const handleApplyImageEdit = async () => {
    setUploadingImage(true);
    setImageEditorOpen(false);

    try {
      const img = new Image();
      img.src = editorImageSrc;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      const size = 500; // Premium 500x500 avatar output
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Clear background
      ctx.clearRect(0, 0, size, size);

      // Apply brightness & contrast filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Draw the image preserving its aspect ratio (cover-fit into the square)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let baseWidth, baseHeight;
      if (imgAspect >= 1) {
        // Landscape or square: height fills the canvas, width scales proportionally
        baseHeight = size;
        baseWidth = size * imgAspect;
      } else {
        // Portrait: width fills the canvas, height scales proportionally
        baseWidth = size;
        baseHeight = size / imgAspect;
      }
      const drawWidth = baseWidth * zoom;
      const drawHeight = baseHeight * zoom;
      
      const cx = size / 2;
      const cy = size / 2;

      // DX and DY translate based on user drag
      const dx = cx - (drawWidth / 2) + translateX;
      const dy = cy - (drawHeight / 2) + translateY;

      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

      // Export as Blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      if (!blob) throw new Error("Failed to process image.");

      const processedFile = new File([blob], "profile_avatar.jpg", { type: 'image/jpeg' });

      const { supabase, isSupabaseConfigured } = await import('../supabaseClient');
      let finalUrl = '';
      if (isSupabaseConfigured) {
        const fileExt = 'jpg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-attachments')
          .upload(filePath, processedFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-attachments')
          .getPublicUrl(filePath);

        finalUrl = publicUrlData.publicUrl;
      } else {
        finalUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(processedFile);
        });
      }

      const updatedUser = {
        ...user,
        details: {
          ...user.details,
          speakerImage: finalUrl
        }
      };
      await saveUserRecord(updatedUser);
      setFormData(prev => ({ ...prev, speakerImage: finalUrl }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("حدث خطأ أثناء تعديل وحفظ الصورة: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCvFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingCv(true);
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabaseClient');
      let finalUrl = '';
      if (isSupabaseConfigured) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `cvs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-attachments')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-attachments')
          .getPublicUrl(filePath);

        finalUrl = publicUrlData.publicUrl;
      } else {
        // Base64/DataURL fallback for offline preview
        finalUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }
      
      const updatedUser = {
        ...user,
        cv_url: finalUrl
      };
      await saveUserRecord(updatedUser);
      setFormData(prev => ({ ...prev, cv_url: finalUrl }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("حدث خطأ أثناء رفع السيرة الذاتية: " + err.message);
    } finally {
      setUploadingCv(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const updatedUser = {
        ...user,
        full_name: formData.full_name,
        phone: formData.phone,
        organization: formData.organization,
        cv_url: formData.cv_url,
        details: {
          ...user.details,
          speechTopic: formData.speechTopic,
          speakerExpertise: formData.speakerExpertise,
          speakerBio: formData.speakerBio,
          speakerLinkedin: formData.speakerLinkedin,
          speakerFacebook: formData.speakerFacebook,
          speakerX: formData.speakerX,
          speakerImage: formData.speakerImage,
          startupName: formData.startupName,
          industry: formData.industry,
          stage: formData.stage,
          elevatorPitch: formData.elevatorPitch,
          researchTitle: formData.researchTitle,
          researchIdea: formData.researchIdea,
          trlLevel: formData.trlLevel,
          mentorExpertise: formData.mentorExpertise,
          yearsExperience: formData.yearsExperience,
          companyName: formData.companyName,
          partnerType: formData.partnerType,
          partnerMessage: formData.partnerMessage,
          volunteerCommittee: formData.volunteerCommittee,
          volunteerReason: formData.volunteerReason
        }
      };

      await saveUserRecord(updatedUser);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("حدث خطأ أثناء حفظ البيانات: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const session = localStorage.getItem('current_user');
    if (session) {
      const parsed = JSON.parse(session);
      setUser(parsed);
      setActiveRole(parsed.role || 'user');

      // Fetch latest registration status and files dynamically on load
      const loadLatestData = async () => {
        try {
          const { supabase, isSupabaseConfigured } = await import('../supabaseClient');
          if (isSupabaseConfigured) {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            const isUuid = uuidRegex.test(parsed.id);

            let query = supabase
              .from('registrations')
              .select('*');

            if (isUuid) {
              query = query.eq('id', parsed.id);
            } else {
              query = query.eq('email', parsed.email);
            }

            const { data, error } = await query.maybeSingle();
            if (!error && data) {
              localStorage.setItem('current_user', JSON.stringify(data));
              setUser(data);
              setActiveRole(data.role || 'user');
            }
          } else {
            // Local fallback
            const localRegs = JSON.parse(localStorage.getItem('local_registrations') || '[]');
            const matched = localRegs.find(r => r.id === parsed.id || r.email === parsed.email);
            if (matched) {
              localStorage.setItem('current_user', JSON.stringify(matched));
              setUser(matched);
              setActiveRole(matched.role || 'user');
            }
          }
        } catch (e) {
          console.error("Error refreshing dashboard data:", e);
        }
      };

      loadLatestData();
    } else {
      setUser({
        full_name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '01000000000',
        organization: 'جامعة المنيا',
        role: 'user',
        details: {}
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    navigate('/auth');
  };

  const roles = [
    { id: 'user', label: isRtl ? 'مستخدم عادي' : 'Regular User', icon: User },
    { id: 'speaker', label: isRtl ? 'متحدث القمة' : 'Summit Speaker', icon: Mic },
    { id: 'startup', label: isRtl ? 'شركة ناشئة / مشروع' : 'Startup / Project', icon: GraduationCap },
    { id: 'investor', label: isRtl ? 'مستثمر' : 'Investor', icon: User },
    { id: 'mentor', label: isRtl ? 'موجه / مدرب' : 'Mentor / Coach', icon: User },
    { id: 'researcher', label: isRtl ? 'باحث / مبتكر' : 'Researcher / Innovator', icon: BookOpen },
    { id: 'partner', label: isRtl ? 'شريك / راعي' : 'Partner / Sponsor', icon: User },
    { id: 'volunteer', label: isRtl ? 'متطوع تنظيمى' : 'Volunteer', icon: User }
  ];

  const getRoleLabel = (roleId) => roles.find(r => r.id === roleId)?.label;

  const renderOverviewTab = () => {
    const getRoleDetails = () => {
      switch (activeRole) {
        case 'speaker':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات الجلسة والتحدث الخاص بك' : 'Your Session & Speech Details'}</h3>
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Mic className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 text-lg mb-1">{user?.details?.speechTopic || (isRtl ? 'لم يحدد عنوان الجلسة بعد' : 'Session topic not set')}</h4>
                  <p className="text-sm font-bold text-slate-500 mb-3">{isRtl ? `مجال التخصص: ${user?.details?.speakerExpertise || 'غير محدد'}` : `Expertise: ${user?.details?.speakerExpertise || 'Not set'}`}</p>
                  <p className="text-slate-600 text-sm leading-relaxed bg-white/60 p-3 rounded-xl border border-slate-100">{user?.details?.speakerBio || (isRtl ? 'لا يوجد نبذة تعريفية مضافة.' : 'No speaker bio provided.')}</p>
                  {user?.details?.speakerLinkedin && (
                    <a href={user.details.speakerLinkedin} target="_blank" rel="noreferrer" className="inline-block mt-3 text-xs font-bold text-blue-600 hover:underline">
                      LinkedIn Profile ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        case 'startup':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات الشركة الناشئة / المشروع المبتكر' : 'Startup / Project Details'}</h3>
              <div className="p-6 border-s-4 border-emerald-500 bg-emerald-50/50 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-emerald-950 text-lg mb-1">{user?.details?.startupName || (isRtl ? 'لم يحدد اسم الشركة بعد' : 'Startup name not set')}</h4>
                    <p className="text-emerald-800 font-bold text-sm mb-3">
                      {isRtl ? `القطاع: ${user?.details?.industry || 'غير محدد'} | المرحلة: ${user?.details?.stage || 'غير محدد'}` : `Industry: ${user?.details?.industry || 'Not set'} | Stage: ${user?.details?.stage || 'Not set'}`}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed bg-white p-3 rounded-xl border border-slate-100">{user?.details?.elevatorPitch || (isRtl ? 'لا يوجد وصف مختصر مضاف.' : 'No elevator pitch provided.')}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'investor':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'البيانات الاستثمارية والاهتمام' : 'Investor Profile & Settings'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 text-right">
                  <span className="text-xs text-slate-400 block mb-1 font-bold">{isRtl ? 'الكيان الاستثماري' : 'Investor Entity'}</span>
                  <span className="font-black text-slate-700">{user?.details?.investorEntity || (isRtl ? 'مستثمر فردي / صندوق' : 'Angel / VC')}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 text-right">
                  <span className="text-xs text-slate-400 block mb-1 font-bold">{isRtl ? 'نوع التمويل المفضل' : 'Preferred Investment Type'}</span>
                  <span className="font-black text-slate-700">{user?.details?.investmentType || (isRtl ? 'غير محدد' : 'Not Specified')}</span>
                </div>
                {user?.details?.ticketSize && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 text-right md:col-span-2">
                    <span className="text-xs text-slate-400 block mb-1 font-bold">{isRtl ? 'حجم الاستثمار المستهدف' : 'Target Ticket Size'}</span>
                    <span className="font-black text-slate-700">{user?.details?.ticketSize}</span>
                  </div>
                )}
              </div>
            </div>
          );
        case 'mentor':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'ملف التوجيه والإرشاد' : 'Mentor / Coach Profile'}</h3>
              <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100">
                <h4 className="font-black text-slate-900 text-lg mb-2">{isRtl ? 'تفاصيل الخبرة ومجالات الإرشاد' : 'Expertise & Experience Details'}</h4>
                <p className="text-sm text-slate-600 font-bold mb-1">{isRtl ? `سنوات الخبرة العملية: ${user?.details?.yearsExperience || '0'} سنوات` : `Years of Experience: ${user?.details?.yearsExperience || '0'} years`}</p>
                <p className="text-sm text-slate-600 font-bold mb-4">{isRtl ? `مجال التدريب والتوجيه: ${user?.details?.mentorExpertise || 'غير محدد'}` : `Mentorship Domain: ${user?.details?.mentorExpertise || 'Not set'}`}</p>
              </div>
            </div>
          );
        case 'researcher':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات البحث التطبيقي / الابتكار العلمي' : 'Research Submission Details'}</h3>
              <div className="p-6 border-s-4 border-indigo-500 bg-indigo-50/50 rounded-2xl text-right">
                <h4 className="font-black text-indigo-950 text-lg mb-1">{user?.details?.researchTitle || (isRtl ? 'لم يحدد عنوان البحث بعد' : 'Research title not set')}</h4>
                <p className="text-xs text-indigo-800 font-bold mb-3">{isRtl ? `مستوى الجاهزية التكنولوجية (TRL): ${user?.details?.trlLevel || 'غير محدد'}` : `TRL Level: ${user?.details?.trlLevel || 'Not set'}`}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100">{user?.details?.researchIdea || (isRtl ? 'لا توجد تفاصيل مضافة للفكرة البحثية.' : 'No idea summary provided.')}</p>
              </div>
            </div>
          );
        case 'partner':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات الشراكة الاستراتيجية / الرعاية' : 'Partnership & Sponsor Profile'}</h3>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="font-black text-slate-900 text-lg mb-1">{user?.details?.companyName || user?.organization || (isRtl ? 'لم يحدد اسم المؤسسة بعد' : 'Company name not set')}</h4>
                <p className="text-sm text-slate-500 font-bold mb-3">{isRtl ? `نوع الشراكة المقترحة: ${user?.details?.partnerType || 'غير محدد'}` : `Proposed Partnership: ${user?.details?.partnerType || 'Not set'}`}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100">{user?.details?.partnerMessage || (isRtl ? 'لا توجد رسالة مقترحة.' : 'No custom message.')}</p>
              </div>
            </div>
          );
        case 'volunteer':
          return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات طلب التطوع واللجان المفضلة' : 'Volunteer Application Details'}</h3>
              <div className="p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-right">
                <h4 className="font-black text-[#26462C] text-lg mb-2">{isRtl ? `اللجنة المفضلة: ${user?.details?.volunteerCommittee || 'غير محدد'}` : `Committee: ${user?.details?.volunteerCommittee || 'Not set'}`}</h4>
                <p className="text-sm text-slate-600 font-semibold mb-3">{isRtl ? `هل لديك خبرة تطوعية سابقة؟: ${user?.details?.hasVolunteerExperience || 'لا'}` : `Has experience? ${user?.details?.hasVolunteerExperience || 'No'}`}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100">{user?.details?.volunteerReason || (isRtl ? 'لا يوجد سبب مفصل للتطوع.' : 'No reason provided.')}</p>
              </div>
            </div>
          );
        default:
          return (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-900/10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4">{isRtl ? 'مرحباً بك في منصة الابتكار' : 'Welcome to the Innovation Platform'}</h2>
                <p className="text-blue-100 mb-8 max-w-xl text-lg font-medium leading-relaxed">{isRtl ? 'استكشف الفعاليات، تابع الأخبار، وتواصل مع المبتكرين.' : 'Explore events, follow news, and connect with innovators.'}</p>
                <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-blue-50 transition-colors">
                  {isRtl ? 'تصفح الأجندة' : 'Browse Agenda'}
                </button>
              </div>
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z" />
                </svg>
              </div>
            </div>
          );
      }
    };

    const cvUrl = user?.cv_url || user?.details?.cv_url || '';

    return (
      <div className="space-y-6">
        {getRoleDetails()}

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-800 mb-4">{isRtl ? 'حالة الطلب والملفات المرفقة' : 'Application Status & Attachments'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Application Status */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="font-bold text-slate-700">{isRtl ? 'حالة الطلب' : 'Application Status'}</span>
              {(() => {
                const status = user?.status || 'تحت المراجعة الإدارية';
                if (status === 'مقبول للعرض في القمة') {
                  return (
                    <span className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-4 h-4" /> {isRtl ? 'تم القبول والاعتماد للعرض ✓' : 'Approved ✓'}
                    </span>
                  );
                } else if (status === 'مرفوض') {
                  return (
                    <span className="text-sm font-bold text-red-600 flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                      <XCircle className="w-4 h-4" /> {isRtl ? 'مرفوض' : 'Rejected'}
                    </span>
                  );
                } else {
                  return (
                    <span className="text-sm font-bold text-amber-600 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                      <Clock className="w-4 h-4" /> {isRtl ? 'تحت المراجعة الإدارية' : 'Pending Review'}
                    </span>
                  );
                }
              })()}
            </div>

            {/* CV File */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-slate-700">{isRtl ? 'السيرة الذاتية (CV)' : 'Resume / CV'}</span>
              </div>
              {cvUrl ? (
                <a 
                  href={cvUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-bold text-blue-600 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> {isRtl ? 'عرض وتحميل الملف ↗' : 'View File ↗'}
                </a>
              ) : (
                <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  {isRtl ? 'لم يتم الرفع بعد' : 'Not uploaded yet'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] p-3 md:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Main Crextio-styled Dashboard Container */}
      <div className="max-w-[98rem] mx-auto bg-white rounded-[2.5rem] border border-slate-200/50 shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
        
        {/* Top Navbar inside the Dashboard */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
              C
            </div>
            <div>
              <span className="font-black text-lg text-slate-800 tracking-tight">Crextio Minia</span>
              <span className="text-[10px] block font-semibold text-slate-400 -mt-1">{isRtl ? 'منصة الابتكار وريادة الأعمال' : 'Innovation & Entrepreneurship Platform'}</span>
            </div>
          </div>

          {/* Navigation links (styled as Crextio horizontal pill tabs) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 p-1.5 rounded-full">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {isRtl ? 'لوحة التحكم' : 'Dashboard'}
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'settings' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {isRtl ? 'الإعدادات والملف' : 'Settings & Profile'}
            </button>
            <a 
              href="/agenda"
              className="px-6 py-2.5 rounded-full text-xs font-black text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              {isRtl ? 'الفعاليات' : 'Calendar'}
            </a>
            <a 
              href="/speakers"
              className="px-6 py-2.5 rounded-full text-xs font-black text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all"
            >
              {isRtl ? 'المتحدثين' : 'People'}
            </a>
          </div>

          {/* Right actions: Settings Cog, Notification Bell, Logout */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('settings')}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              title={isRtl ? 'الإعدادات' : 'Settings'}
            >
              <Settings className="w-4 h-4" />
            </button>
            <div className="relative">
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isRtl ? 'خروج' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Tab Switch View */}
        {activeTab === 'overview' ? (
          <div className="flex flex-col gap-6">
            
            {/* Header: Welcome banner & Stats Pill row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                  {isRtl ? `مرحباً بك، ${user?.full_name?.split(' ')[0] || 'مبتكرنا'}` : `Welcome back, ${user?.full_name?.split(' ')[0] || 'User'}`}
                  <span className="text-2xl animate-bounce">👋</span>
                </h1>
                <p className="text-slate-400 text-sm mt-1 font-semibold">{isRtl ? 'تابع آخر إنجازاتك وتحديثات طلبك للقمة.' : 'Monitor your dashboard work progress and summit application.'}</p>
              </div>

              {/* Crextio Stats row */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Stats Pill 1 */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-full">
                  <span className="text-xs font-black text-slate-500">{isRtl ? 'جاهزية الملف' : 'Profile info'}</span>
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-xs font-black text-blue-600">85%</span>
                </div>

                {/* Stats Pill 2 */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-full">
                  <span className="text-xs font-black text-slate-500">{isRtl ? 'الالتزام بالوقت' : 'Project time'}</span>
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-[#1e40af] h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-xs font-black text-[#1e40af]">45%</span>
                </div>

                {/* Vertical Separator */}
                <div className="hidden sm:block w-px h-6 bg-slate-200 mx-2" />

                {/* Numerical counters */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-800">315</span>
                    <span className="text-[10px] font-bold text-slate-400 block -mt-1">{isRtl ? 'مشروع ابتكاري' : 'Projects'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-800">75</span>
                    <span className="text-[10px] font-bold text-slate-400 block -mt-1">{isRtl ? 'متحدث القمة' : 'Speakers'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-800">92</span>
                    <span className="text-[10px] font-bold text-slate-400 block -mt-1">{isRtl ? 'شريك ومرشد' : 'Mentors'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-Column main layout grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Column 1 (Left - Profile Card & Accordions) - span 3 */}
              <div className="lg:col-span-3 flex flex-col gap-5">
                {/* Profile Avatar Card (styled in premium soft gradient) */}
                <div className="bg-gradient-to-b from-sky-100 to-blue-200/60 rounded-[2rem] p-6 text-center border border-sky-200/50 shadow-md relative overflow-hidden flex flex-col items-center">
                  {/* Decorative soft white circle bg */}
                  <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-white/20 blur-xl pointer-events-none" />
                  
                  {/* Circular Avatar */}
                  <div className="relative w-28 h-28 mb-4 cursor-pointer group shrink-0">
                    {formData.speakerImage ? (
                      <img 
                        src={formData.speakerImage} 
                        alt={formData.full_name} 
                        onClick={() => setImageLightboxOpen(true)}
                        className="w-full h-full rounded-full object-cover shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
                        title={isRtl ? 'تكبير الصورة' : 'Zoom Image'}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-3xl shadow-xl border-4 border-white">
                        {formData.full_name?.charAt(0) || 'U'}
                      </div>
                    )}
                    {/* Camera Upload Overlay Button */}
                    <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md cursor-pointer transition-colors border-2 border-white">
                      <Camera className="w-3.5 h-3.5" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Name and Designation */}
                  <h3 className="font-black text-slate-800 text-lg leading-tight">{user?.full_name || 'أحمد محمد'}</h3>
                  <p className="text-xs font-bold text-blue-800/80 mt-1">{getRoleLabel(activeRole)}</p>
                  
                  {/* Status Badge */}
                  <div className="mt-4 px-4 py-1.5 rounded-full bg-white/95 text-blue-900 border border-sky-200 font-black text-[11px] shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    {user?.status === 'مقبول للعرض في القمة' ? (isRtl ? 'معتمد ومقبول' : 'Approved') : (isRtl ? 'حالة نشطة' : 'Active Account')}
                  </div>
                </div>

                {/* Sidebar Accordion (Pension Contributions, Devices, Compensation, Benefits) */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm flex flex-col gap-2">
                  {/* Accordion Item 1: Personal Details */}
                  <div className="border-b border-slate-100 pb-2">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === 'personal' ? null : 'personal')}
                      className="w-full py-3 flex items-center justify-between text-slate-700 font-black text-xs px-2 hover:bg-slate-50 rounded-xl transition-all"
                    >
                      <span>{isRtl ? 'البيانات الشخصية والمهنية' : 'Personal & Pro Details'}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === 'personal' && 'rotate-180'}`} />
                    </button>
                    {activeAccordion === 'personal' && (
                      <div className="px-3 pb-3 pt-1 space-y-2.5 text-[11px] font-bold text-slate-500 text-right">
                        <div>
                          <span className="text-slate-400 block mb-0.5">{isRtl ? 'رقم الهاتف' : 'Phone'}</span>
                          <span className="text-slate-700">{user?.phone || '010xxxxxx'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">{isRtl ? 'المؤسسة / الجامعة' : 'Organization'}</span>
                          <span className="text-slate-700">{user?.organization || 'جامعة المنيا'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 2: Attachments (CV) */}
                  <div className="border-b border-slate-100 pb-2">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === 'docs' ? null : 'docs')}
                      className="w-full py-3 flex items-center justify-between text-slate-700 font-black text-xs px-2 hover:bg-slate-50 rounded-xl transition-all"
                    >
                      <span>{isRtl ? 'المستندات والمرفقات' : 'Documents & CV'}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === 'docs' && 'rotate-180'}`} />
                    </button>
                    {activeAccordion === 'docs' && (
                      <div className="px-3 pb-3 pt-1 space-y-2.5 text-[11px] font-bold text-slate-500">
                        <div className="flex items-center justify-between">
                          <span>{isRtl ? 'السيرة الذاتية (CV)' : 'CV Document'}</span>
                          {user?.cv_url || user?.details?.cv_url ? (
                            <a href={user.cv_url || user.details?.cv_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                              {isRtl ? 'عرض ↗' : 'View ↗'}
                            </a>
                          ) : (
                            <span className="text-red-500">{isRtl ? 'غير مرفوع' : 'Not uploaded'}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion Item 3: Support */}
                  <div>
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === 'support' ? null : 'support')}
                      className="w-full py-3 flex items-center justify-between text-slate-700 font-black text-xs px-2 hover:bg-slate-50 rounded-xl transition-all"
                    >
                      <span>{isRtl ? 'الدعم الفني للقمة' : 'Technical Summit Support'}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === 'support' && 'rotate-180'}`} />
                    </button>
                    {activeAccordion === 'support' && (
                      <div className="px-3 pb-3 pt-1 text-[11px] font-bold text-slate-500 leading-relaxed">
                        {isRtl ? 'إذا واجهت أي مشكلة تقنية في حسابك أو الصورة الشخصية، يُرجى التواصل معنا عبر الدعم الفني للجامعة.' : 'If you face any issues, please reach out to our university web support desk.'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Column 2 (Center - Progress, Time Tracker, Calendar) - span 6 */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                {/* Top Row: Progress and Time Tracker side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Progress Card (Crextio Styled) */}
                  <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{isRtl ? 'توقيت العمل الأسبوعي' : 'Work Time Progress'}</span>
                        <h4 className="text-3xl font-black text-slate-800 mt-1">6.1 h</h4>
                        <p className="text-[11px] font-bold text-slate-400">{isRtl ? 'معدل الأداء هذا الأسبوع' : 'Average rate this week'}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] border border-blue-100">
                        1h 25m
                      </span>
                    </div>
                    {/* Mock bar chart with labels */}
                    <div className="flex items-end justify-between gap-1.5 pt-6 h-24">
                      {[15, 45, 25, 75, 35, 90, 50].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-full bg-slate-100 rounded-full h-16 relative overflow-hidden">
                            <div 
                              className={`w-full rounded-full absolute bottom-0 transition-all duration-500 ${
                                i === 5 ? 'bg-blue-600' : 'bg-blue-900'
                              }`} 
                              style={{ height: `${h}%` }} 
                            />
                          </div>
                          <span className="text-[9px] font-black text-slate-400">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Tracker Card (Crextio Styled stopwatch) */}
                  <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex flex-col items-center justify-between min-h-[220px]">
                    <div className="w-full flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{isRtl ? 'متتبع وقت الحضور' : 'Summit Timer Tracker'}</span>
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    
                    {/* Circular clock layout */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="42" 
                          stroke="#2563eb" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray="264"
                          strokeDashoffset={264 - (264 * (trackerTime % 3600)) / 3600}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-xl font-black text-slate-800 leading-none">
                          {formatTrackerTime(trackerTime)}
                        </span>
                        <span className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest">{isRtl ? 'وقت النشاط' : 'Work Time'}</span>
                      </div>
                    </div>

                    {/* Play/Pause controls */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setTrackerPlaying(!trackerPlaying)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
                          trackerPlaying 
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                        }`}
                      >
                        {trackerPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calendar Timeline Section (Crextio Styled schedule timeline) */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{isRtl ? 'أجندة الفعاليات والمواعيد' : 'Summit Agenda Planner'}</span>
                    <span className="text-xs font-black text-slate-800">{isRtl ? 'سبتمبر 2026' : 'September 2026'}</span>
                  </div>

                  {/* Horizontal Dates row */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-100 gap-1 overflow-x-auto">
                    {[22, 23, 24, 25, 26, 27].map((day, idx) => (
                      <div 
                        key={idx} 
                        className={`flex-1 min-w-[45px] py-2 rounded-xl text-center cursor-pointer transition-colors ${
                          day === 24 ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className="block text-[10px] font-bold opacity-60 uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx]}</span>
                        <span className="text-sm font-black mt-0.5 block">{day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Timeline Events schedule */}
                  <div className="space-y-3 pt-2">
                    {/* Event block 1 */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/70 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black text-blue-600 uppercase block">{isRtl ? '9:00 صباحاً - 10:30 صباحاً' : '9:00 am - 10:30 am'}</span>
                        <h5 className="font-black text-slate-800 text-sm mt-0.5">{isRtl ? 'اللقاء التنسيقي لفريق عمل الابتكار' : 'Weekly Innovation Team Sync'}</h5>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">{isRtl ? 'مناقشة خطة المشاريع وتوزيع المهام' : 'Discuss project guidelines & plans'}</p>
                      </div>
                      <div className="flex -space-x-2 overflow-hidden rtl:space-x-reverse shrink-0">
                        <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="team" />
                        <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="team" />
                        <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="team" />
                      </div>
                    </div>

                    {/* Event block 2 */}
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black text-blue-700 uppercase block">{isRtl ? '11:00 صباحاً - 12:30 مساءً' : '11:00 am - 12:30 pm'}</span>
                        <h5 className="font-black text-blue-900 text-sm mt-0.5">{isRtl ? 'جلسة تمهيدية للمبتكرين والشركات' : 'Startup Onboarding Session'}</h5>
                        <p className="text-[11px] font-bold text-blue-700/70 mt-0.5">{isRtl ? 'استعراض نظم الجوائز وفرص التمويل' : 'Introduction to funding structures'}</p>
                      </div>
                      <div className="flex -space-x-2 overflow-hidden rtl:space-x-reverse shrink-0">
                        <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="team" />
                        <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="team" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 (Right - Onboarding Progress & Checklist) - span 3 */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                {/* Onboarding Progress Card */}
                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{isRtl ? 'اكتمال خطوات القبول' : 'Onboarding Step'}</span>
                    <h4 className="text-2xl font-black text-slate-800">
                      {Math.round((tasks.filter(t => t.checked).length / tasks.length) * 100)}%
                    </h4>
                  </div>
                  {/* Styled linear progress blocks */}
                  <div className="flex items-center gap-1.5 pt-4">
                    {[1, 2, 3].map((step) => {
                      const completedCount = tasks.filter(t => t.checked).length;
                      const ratio = completedCount / tasks.length;
                      let active = false;
                      if (step === 1 && ratio >= 0.2) active = true;
                      if (step === 2 && ratio >= 0.6) active = true;
                      if (step === 3 && ratio >= 0.9) active = true;

                      return (
                        <div 
                          key={step} 
                          className={`h-7.5 flex-1 rounded-lg transition-all flex items-center justify-center text-[10px] font-black ${
                            active ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {step === 1 ? 'Task' : step === 2 ? 'Review' : 'Approved'}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Onboarding Task Checklist widget (fully interactive) */}
                <div className="bg-blue-950 rounded-[2.5rem] p-6 text-white shadow-lg shadow-blue-950/20 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-base">{isRtl ? 'المهام والخطوات المطلوبة' : 'Onboarding Checklist'}</h4>
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block mt-0.5">{isRtl ? 'خطوة بخطوة للقمة' : 'Step-by-step to summit'}</span>
                    </div>
                    <span className="text-xl font-black text-white bg-white/10 px-3 py-1 rounded-2xl text-xs">
                      {tasks.filter(t => t.checked).length}/{tasks.length}
                    </span>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {tasks.map((task) => (
                      <div 
                        key={task.id} 
                        onClick={() => {
                          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, checked: !t.checked } : t));
                        }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          task.checked 
                            ? 'bg-blue-500 border-blue-400 text-white' 
                            : 'border-white/30 text-transparent'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={`text-[11px] font-bold leading-tight transition-all ${
                          task.checked ? 'text-slate-300 line-through opacity-75' : 'text-slate-100'
                        }`}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Unified Status and CV block under role specific views (using renderOverviewTab's core components) */}
            {renderOverviewTab()}

          </div>
        ) : (
          <form onSubmit={handleProfileSave} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 space-y-8 shadow-sm">
            
            {/* Form Title & Success Alert */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-black text-slate-800">{isRtl ? 'تعديل بيانات الملف الشخصي' : 'Edit Profile Settings'}</h3>
                <p className="text-slate-400 text-xs mt-1 font-bold">{isRtl ? 'قم بتحديث صورتك، وسيرتك الذاتية، وبياناتك الشخصية' : 'Update your photo, resume, and info'}</p>
              </div>
              {saveSuccess && (
                <span className="text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-xs font-black border border-emerald-100 flex items-center gap-1.5 animate-bounce">
                  <CheckCircle className="w-4 h-4" /> {isRtl ? 'تم حفظ التغييرات بنجاح!' : 'Changes saved successfully!'}
                </span>
              )}
            </div>

            {/* Profile Photo Uploader Section */}
            <div className="flex flex-col items-center justify-center py-6 bg-slate-50/50 rounded-3xl border border-slate-100 p-6">
              <div className="relative group w-44 h-44 mb-4 cursor-pointer">
                {formData.speakerImage ? (
                  <img 
                    src={formData.speakerImage} 
                    alt={formData.full_name} 
                    onClick={() => setImageLightboxOpen(true)}
                    className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white group-hover:opacity-90 transition-opacity cursor-zoom-in" 
                    title={isRtl ? 'انقر لتكبير الصورة' : 'Click to enlarge'}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-4xl shadow-lg border-4 border-white">
                    {formData.full_name?.charAt(0) || 'U'}
                  </div>
                )}
                <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-lg cursor-pointer transition-colors border border-white">
                  <Camera className="w-4 h-4" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageFileChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              <div className="text-center">
                <label className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer inline-flex items-center gap-2 text-xs transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  {uploadingImage ? (isRtl ? 'جاري الرفع...' : 'Uploading...') : (isRtl ? 'اختر صورة شخصية جديدة' : 'Upload New Photo')}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageFileChange} 
                    className="hidden" 
                  />
                </label>
                <p className="text-slate-400 text-[10px] mt-2 font-semibold">{isRtl ? 'JPG, PNG أو WebP. بحد أقصى 5 ميجابايت.' : 'JPG, PNG or WebP. Max 5MB.'}</p>
              </div>
            </div>

            {/* Core Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'الاسم بالكامل *' : 'Full Name *'}</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 font-bold text-slate-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'الجامعة / جهة العمل *' : 'Organization *'}</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                />
              </div>
            </div>

            {/* CV Attachment Section */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="font-black text-slate-800 text-lg mb-4">{isRtl ? 'السيرة الذاتية والملف المهني (CV)' : 'CV & Professional Resume'}</h4>
              <div className="p-5 bg-blue-50/30 rounded-3xl border border-blue-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{isRtl ? 'ملف السيرة الذاتية المرفوع' : 'CV / Resume File'}</p>
                    {formData.cv_url && formData.cv_url !== '#' ? (
                      <a href={formData.cv_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline inline-block mt-0.5">
                        {isRtl ? 'تحميل أو عرض السيرة الذاتية الحالية ↗' : 'Download current CV ↗'}
                      </a>
                    ) : (
                      <p className="text-xs font-bold text-slate-400 mt-0.5">{isRtl ? 'لم يتم إرفاق سيرة ذاتية بعد' : 'No CV uploaded yet'}</p>
                    )}
                  </div>
                </div>
                <label className="bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-black px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm transition-colors inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {uploadingCv ? (isRtl ? 'جاري الرفع...' : 'Uploading...') : (isRtl ? 'تحديث / رفع ملف CV جديد' : 'Upload New CV')}
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleCvFileChange} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Role-Specific Info */}
            {activeRole === 'speaker' && (
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <h4 className="font-black text-slate-800 text-lg">{isRtl ? 'بيانات التحدث والمشاركة' : 'Speaking & Topic Details'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'موضوع التحدث المقترح *' : 'Proposed Speech Topic *'}</label>
                    <input
                      type="text"
                      name="speechTopic"
                      value={formData.speechTopic}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'مجال التخصص *' : 'Expertise *'}</label>
                    <select
                      name="speakerExpertise"
                      value={formData.speakerExpertise}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    >
                      <option value="ريادة الأعمال">{isRtl ? 'ريادة الأعمال' : 'Entrepreneurship'}</option>
                      <option value="التكنولوجيا والذكاء الاصطناعي">{isRtl ? 'التكنولوجيا والذكاء الاصطناعي' : 'Tech & AI'}</option>
                      <option value="الاستثمار والتمويل">{isRtl ? 'الاستثمار والتمويل' : 'Investment'}</option>
                      <option value="التسويق والمبيعات">{isRtl ? 'التسويق والمبيعات' : 'Marketing'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'السيرة الذاتية المختصرة (Bio) *' : 'Short Speaker Bio *'}</label>
                    <textarea
                      name="speakerBio"
                      value={formData.speakerBio}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      name="speakerLinkedin"
                      value={formData.speakerLinkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Facebook Profile URL</label>
                    <input
                      type="url"
                      name="speakerFacebook"
                      value={formData.speakerFacebook}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">X / Twitter URL</label>
                    <input
                      type="url"
                      name="speakerX"
                      value={formData.speakerX}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Other roles: startup, researcher details fields etc. */}
            {activeRole === 'startup' && (
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <h4 className="font-black text-slate-800 text-lg">{isRtl ? 'تفاصيل الشركة الناشئة' : 'Startup Details'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'اسم الشركة *' : 'Startup Name *'}</label>
                    <input
                      type="text"
                      name="startupName"
                      value={formData.startupName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'المجال / القطاع *' : 'Industry Sector *'}</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'مرحلة المشروع *' : 'Startup Stage *'}</label>
                    <input
                      type="text"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'وصف مختصر (Elevator Pitch) *' : 'Elevator Pitch *'}</label>
                    <textarea
                      name="elevatorPitch"
                      value={formData.elevatorPitch}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeRole === 'researcher' && (
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <h4 className="font-black text-slate-800 text-lg">{isRtl ? 'تفاصيل البحث العلمي' : 'Scientific Research Details'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'عنوان الورقة البحثية *' : 'Research Title *'}</label>
                    <input
                      type="text"
                      name="researchTitle"
                      value={formData.researchTitle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                    />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'مستوى الجاهزية TRL *' : 'TRL Level *'}</label>
                      <input
                        type="text"
                        name="trlLevel"
                        value={formData.trlLevel}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'ملخص الفكرة البحثية *' : 'Idea Summary *'}</label>
                      <textarea
                        name="researchIdea"
                        value={formData.researchIdea}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving || uploadingImage || uploadingCv}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-full shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {isSaving ? (isRtl ? 'جاري الحفظ...' : 'Saving...') : (isRtl ? 'حفظ التعديلات' : 'Save Changes')}
                </button>
              </div>
            </form>
          )}

        </div>


      {/* Image Editor Crop/Brightness Modal */}
      {imageEditorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-800">{isRtl ? 'تعديل الصورة الشخصية' : 'Edit Profile Image'}</h3>
              <button 
                onClick={() => setImageEditorOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Container with Circular Mask */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-semibold text-slate-400 mb-3">{isRtl ? 'اسحب الصورة لتعديل الموضع داخل الدائرة' : 'Drag image to reposition inside the circle'}</p>
              
              {/* Circular Crop Mask */}
              <div 
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500/30 bg-slate-100 cursor-move select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <img 
                  src={editorImageSrc} 
                  alt="Crop preview" 
                  draggable="false"
                  className="absolute max-w-none origin-center pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${zoom})`,
                    top: '50%',
                    left: '50%',
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Sliders Controls */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {/* Zoom Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>{isRtl ? 'تكبير وتصغير (Zoom)' : 'Zoom'}</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Brightness Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>{isRtl ? 'السطوع (Brightness)' : 'Brightness'}</span>
                  <span>{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={brightness} 
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Contrast Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                  <span>{isRtl ? 'التباين (Contrast)' : 'Contrast'}</span>
                  <span>{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="150" 
                  value={contrast} 
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-3">
              <button 
                onClick={() => setImageEditorOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                onClick={handleApplyImageEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                {isRtl ? 'تطبيق وحفظ' : 'Apply & Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Profile Image Lightbox Modal */}
      {imageLightboxOpen && formData.speakerImage && (
        <div 
          onClick={() => setImageLightboxOpen(false)}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out animate-fade-in"
        >
          <div className="relative max-w-3xl max-h-[85vh] p-2 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <img 
              src={formData.speakerImage} 
              alt={formData.full_name} 
              className="rounded-2xl max-w-full max-h-[80vh] object-contain border border-slate-100" 
            />
            <button 
              onClick={() => setImageLightboxOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-slate-800 p-2 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
