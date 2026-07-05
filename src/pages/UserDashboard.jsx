import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, BookOpen, GraduationCap, Mic, Settings, LayoutDashboard, 
  Calendar, Clock, FileText, CheckCircle, AlertCircle, LogOut,
  Upload, Camera, FileCheck
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

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        organization: user.organization || '',
        cv_url: user.cv_url || '',
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

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabaseClient');
      let finalUrl = '';
      if (isSupabaseConfigured) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-attachments')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('project-attachments')
          .getPublicUrl(filePath);

        finalUrl = publicUrlData.publicUrl;
      } else {
        // Base64 fallback for offline preview
        finalUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }
      setFormData(prev => ({ ...prev, speakerImage: finalUrl }));
    } catch (err) {
      alert("حدث خطأ أثناء رفع الصورة: " + err.message);
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
      setFormData(prev => ({ ...prev, cv_url: finalUrl }));
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

      const { supabase, isSupabaseConfigured } = await import('../supabaseClient');
      if (isSupabaseConfigured) {
        // Validate if ID is a standard UUID format
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
    switch (activeRole) {
      case 'speaker':
        return (
          <div className="space-y-6">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="font-black text-slate-800 mb-4">{isRtl ? 'حالة الطلب والملفات المرفقة' : 'Application Status & Attachments'}</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <span className="font-bold text-slate-700">{isRtl ? 'السيرة الذاتية (CV)' : 'Resume / CV'}</span>
                  </div>
                  <span className="text-sm font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <Clock className="w-4 h-4" /> {isRtl ? 'تحت المراجعة الإدارية' : 'Pending Review'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'startup':
        return (
          <div className="space-y-6">
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
                  <div className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-500/20 text-center shrink-0">
                    {isRtl ? 'قيد الفحص الفني' : 'Under Technical Review'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'investor':
        return (
          <div className="space-y-6">
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
          </div>
        );
      case 'mentor':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'ملف التوجيه والإرشاد' : 'Mentor / Coach Profile'}</h3>
              <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100">
                <h4 className="font-black text-slate-900 text-lg mb-2">{isRtl ? 'تفاصيل الخبرة ومجالات الإرشاد' : 'Expertise & Experience Details'}</h4>
                <p className="text-sm text-slate-600 font-bold mb-1">{isRtl ? `سنوات الخبرة العملية: ${user?.details?.yearsExperience || '0'} سنوات` : `Years of Experience: ${user?.details?.yearsExperience || '0'} years`}</p>
                <p className="text-sm text-slate-600 font-bold mb-4">{isRtl ? `مجال التدريب والتوجيه: ${user?.details?.mentorExpertise || 'غير محدد'}` : `Mentorship Domain: ${user?.details?.mentorExpertise || 'Not set'}`}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-black">
                  <CheckCircle className="w-3.5 h-3.5" /> {isRtl ? 'مرشد نشط بالقمة' : 'Active Summit Mentor'}
                </span>
              </div>
            </div>
          </div>
        );
      case 'researcher':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات البحث التطبيقي / الابتكار العلمي' : 'Research Submission Details'}</h3>
              <div className="p-6 border-s-4 border-indigo-500 bg-indigo-50/50 rounded-2xl text-right">
                <h4 className="font-black text-indigo-950 text-lg mb-1">{user?.details?.researchTitle || (isRtl ? 'لم يحدد عنوان البحث بعد' : 'Research title not set')}</h4>
                <p className="text-xs text-indigo-800 font-bold mb-3">{isRtl ? `مستوى الجاهزية التكنولوجية (TRL): ${user?.details?.trlLevel || 'غير محدد'}` : `TRL Level: ${user?.details?.trlLevel || 'Not set'}`}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100">{user?.details?.researchIdea || (isRtl ? 'لا توجد تفاصيل مضافة للفكرة البحثية.' : 'No idea summary provided.')}</p>
                <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-3 py-1.5 rounded-full">
                    {isRtl ? 'قيد تقييم اللجنة العلمية' : 'Scientific Committee Evaluation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'partner':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات الشراكة الاستراتيجية / الرعاية' : 'Partnership & Sponsor Profile'}</h3>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="font-black text-slate-900 text-lg mb-1">{user?.details?.companyName || user?.organization || (isRtl ? 'لم يحدد اسم المؤسسة بعد' : 'Company name not set')}</h4>
                <p className="text-sm text-slate-500 font-bold mb-3">{isRtl ? `نوع الشراكة المقترحة: ${user?.details?.partnerType || 'غير محدد'}` : `Proposed Partnership: ${user?.details?.partnerType || 'Not set'}`}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100">{user?.details?.partnerMessage || (isRtl ? 'لا توجد رسالة مقترحة.' : 'No custom message.')}</p>
              </div>
            </div>
          </div>
        );
      case 'volunteer':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'بيانات طلب التطوع واللجان المفضلة' : 'Volunteer Application Details'}</h3>
              <div className="p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-right">
                <h4 className="font-black text-[#26462C] text-lg mb-2">{isRtl ? `اللجنة المفضلة: ${user?.details?.volunteerCommittee || 'غير محدد'}` : `Committee: ${user?.details?.volunteerCommittee || 'Not set'}`}</h4>
                <p className="text-sm text-slate-600 font-semibold mb-3">{isRtl ? `هل لديك خبرة تطوعية سابقة؟: ${user?.details?.hasVolunteerExperience || 'لا'}` : `Has experience? ${user?.details?.hasVolunteerExperience || 'No'}`}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-slate-100">{user?.details?.volunteerReason || (isRtl ? 'لا توجد أسباب تفصيلية.' : 'No reason provided.')}</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
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
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden sticky top-28">
            <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
              {user?.details?.speakerImage ? (
                <img 
                  src={user.details.speakerImage} 
                  alt={user.full_name} 
                  className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-blue-500 shrink-0" 
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
                  <User className="w-8 h-8" />
                </div>
              )}
              <div>
                <h2 className="font-black text-xl text-slate-900 mb-1">{user?.full_name || 'أحمد محمد'}</h2>
                <p className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-black mb-1 w-fit">{getRoleLabel(activeRole)}</p>
                <p className="text-xs font-semibold text-slate-400 truncate max-w-[150px]" dir="ltr">{user?.email}</p>
              </div>
            </div>
            
            <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                {isRtl ? 'نظرة عامة' : 'Overview'}
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Settings className="w-5 h-5" />
                {isRtl ? 'الإعدادات' : 'Settings'}
              </button>
              
              <div className="pt-4 mt-4 border-t border-slate-100 px-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  {isRtl ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">


          {/* Header */}
          <div className="mb-8 px-2">
            <h1 className="text-3xl font-black text-slate-900">{activeTab === 'overview' ? (isRtl ? 'لوحة التحكم' : 'Dashboard') : (isRtl ? 'الإعدادات' : 'Settings')}</h1>
            <p className="text-slate-500 mt-2 font-medium">
              {isRtl ? 'تابع آخر تحديثات نشاطك على المنصة.' : 'Follow the latest updates of your activity on the platform.'}
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? renderOverviewTab() : (
            <form onSubmit={handleProfileSave} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8">
              
              {/* Form Title & Success Alert */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">{isRtl ? 'تعديل الملف الشخصي' : 'Edit Profile Settings'}</h3>
                  <p className="text-slate-400 text-xs mt-1 font-bold">{isRtl ? 'قم بتحديث صورتك، وسيرتك الذاتية، وبياناتك الشخصية' : 'Update your photo, resume, and info'}</p>
                </div>
                {saveSuccess && (
                  <span className="text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-xs font-black border border-emerald-100 flex items-center gap-1.5 animate-bounce">
                    <CheckCircle className="w-4 h-4" /> {isRtl ? 'تم حفظ التغييرات بنجاح!' : 'Changes saved successfully!'}
                  </span>
                )}
              </div>

              {/* Profile Photo Uploader Section */}
              <div className="flex flex-col items-center justify-center py-4 bg-slate-50/50 rounded-3xl border border-slate-100 p-6">
                <div className="relative group w-28 h-28 mb-4">
                  {formData.speakerImage ? (
                    <img 
                      src={formData.speakerImage} 
                      alt={formData.full_name} 
                      className="w-full h-full rounded-full object-cover shadow-md border-4 border-white group-hover:opacity-80 transition-opacity" 
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-3xl shadow-md border-4 border-white">
                      {formData.full_name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Camera className="w-6 h-6" />
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

              {/* General Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'الاسم الكامل *' : 'Full Name *'}</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-shadow focus:border-blue-500"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-shadow focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'الجهة / المؤسسة *' : 'Organization *'}</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-shadow focus:border-blue-500"
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
                        <option value="أخرى">{isRtl ? 'أخرى' : 'Other'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'رابط LinkedIn (اختياري)' : 'LinkedIn Link (Optional)'}</label>
                      <input
                        type="url"
                        name="speakerLinkedin"
                        value={formData.speakerLinkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'رابط Facebook (اختياري)' : 'Facebook Link (Optional)'}</label>
                      <input
                        type="url"
                        name="speakerFacebook"
                        value={formData.speakerFacebook}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'رابط X (تويتر) (اختياري)' : 'X (Twitter) Link (Optional)'}</label>
                      <input
                        type="url"
                        name="speakerX"
                        value={formData.speakerX}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                        dir="ltr"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'النبذة التعريفية (Bio) *' : 'Speaker Bio *'}</label>
                      <textarea
                        name="speakerBio"
                        value={formData.speakerBio}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeRole === 'startup' && (
                <div className="pt-6 border-t border-slate-100 space-y-6">
                  <h4 className="font-black text-slate-800 text-lg">{isRtl ? 'تفاصيل الشركة الناشئة' : 'Startup Details'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'اسم الشركة الناشئة *' : 'Startup Name *'}</label>
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
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'مجال القطاع *' : 'Industry *'}</label>
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
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'مرحلة المشروع *' : 'Stage *'}</label>
                      <input
                        type="text"
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'الوصف المختصر (Elevator Pitch) *' : 'Elevator Pitch *'}</label>
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
                  <h4 className="font-black text-slate-800 text-lg">{isRtl ? 'بيانات الابتكار والبحث العلمي' : 'Research Details'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'عنوان البحث التطبيقي *' : 'Research Title *'}</label>
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
      </div>
    </div>
  );
};

export default UserDashboard;
