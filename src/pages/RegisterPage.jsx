import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, UploadCloud, FileText, X, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">شروط وأحكام القمة</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-slate-600 space-y-4">
          <p>أهلاً بك في قمة جامعة المنيا للابتكار وريادة الأعمال. بتسجيلك، أنت توافق على البنود التالية:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>الالتزام بتقديم معلومات صحيحة ودقيقة عن مشروعك أو شخصيتك.</li>
            <li>الجامعة لها الحق في استخدام البيانات المقدمة لأغراض التقييم والتواصل والتنظيم الداخلي للقمة.</li>
            <li>الأفكار والمشاريع المقدمة تظل ملكاً لأصحابها، ولكن قد يتم عرضها إعلامياً كجزء من فعاليات القمة (إلا إذا طلب المؤسس غير ذلك).</li>
            <li>يحق للجنة التنظيم قبول أو رفض طلبات المشاركة بناءً على معايير التقييم الخاصة بها.</li>
            <li>في حالة رفع مرفقات، يرجى التأكد من خلوها من أي برمجيات ضارة ومن أي حقوق ملكية فكرية منتهكة.</li>
          </ul>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            فهمت وموافق
          </button>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'speaker';
  const roleTypes = ['speaker', 'startup', 'investor', 'mentor', 'partner'];
  const urlRole = roleTypes.includes(role) ? role : 'speaker';

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState(urlRole);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: All
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    
    // Step 2: Startup
    startupName: '',
    industry: '',
    stage: '',
    elevatorPitch: '',

    // Step 2: Speaker
    speechTopic: '',
    speakerExpertise: '',
    speakerBio: '',
    speakerLinkedin: '',

    // Step 2: Partner
    companyName: '',
    partnerType: '',
    companyWebsite: '',
    partnerMessage: '',

    // Step 2: Investor
    investorEntity: '',
    investmentType: '',
    ticketSize: '',
    investorLinkedin: '',

    // Step 2: Mentor
    mentorExpertise: '',
    yearsExperience: '',
    mentorLinkedin: '',

    // Step 2: Volunteer
    volunteerCommittee: '',
    hasVolunteerExperience: '',
    volunteerReason: '',
    
    // Step 2: Researcher
    researchTitle: '',
    researchIdea: '',
    trlLevel: '',
    
    // Step 3
    attachment: null,
    acceptTerms: false
  });

  const roleDetails = {
    speaker: { title: 'تسجيل المتحدثين', description: 'شارك بخبراتك وكن جزءاً من منصة المتحدثين.', attachmentLabel: 'السيرة الذاتية (CV)', requiresAttachment: true },
    startup: { title: 'تسجيل الشركات الناشئة', description: 'سجل شركتك الناشئة واعرض ابتكارك للعالم.', attachmentLabel: 'العرض التقديمي (Pitch Deck)', requiresAttachment: true },
    investor: { title: 'تسجيل المستثمرين', description: 'انضم لشبكة مستثمري قمة الابتكار.', attachmentLabel: 'ملف تعريفي (اختياري)', requiresAttachment: false },
    mentor: { title: 'تسجيل المدربين', description: 'كن مدرباً لرواد الأعمال وساعدهم في رحلتهم.', attachmentLabel: 'السيرة الذاتية (CV)', requiresAttachment: true },
    partner: { title: 'تسجيل الشركاء', description: 'نرحب بشراكتكم لبناء مستقبل ريادة الأعمال.', attachmentLabel: 'ملف الشركة (Company Profile)', requiresAttachment: true }
  };
  const currentRole = roleDetails[selectedRole];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, attachment: 'يجب أن يكون الملف بصيغة PDF فقط' }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, attachment: 'حجم الملف يجب ألا يتجاوز 10 ميجابايت' }));
        return;
      }
      setFormData(prev => ({ ...prev, attachment: file }));
      setErrors(prev => ({ ...prev, attachment: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^01[0125][0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ 01';
    }
    if (!formData.organization) newErrors.organization = 'يرجى اختيار جهة العمل/الجامعة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (selectedRole === 'startup') {
      if (!formData.startupName.trim()) newErrors.startupName = 'اسم المشروع مطلوب';
      if (!formData.industry) newErrors.industry = 'يرجى اختيار قطاع المشروع';
      if (!formData.stage) newErrors.stage = 'يرجى اختيار مرحلة المشروع';
      if (!formData.elevatorPitch.trim()) {
        newErrors.elevatorPitch = 'الوصف المختصر مطلوب';
      } else if (formData.elevatorPitch.trim().split(/\s+/).length > 100) {
        newErrors.elevatorPitch = 'الوصف يجب ألا يتجاوز 100 كلمة';
      }
    } 
    else if (selectedRole === 'speaker') {
      if (!formData.speechTopic.trim()) newErrors.speechTopic = 'موضوع التحدث مطلوب';
      if (!formData.speakerExpertise) newErrors.speakerExpertise = 'مجال الخبرة مطلوب';
      if (!formData.speakerBio.trim()) newErrors.speakerBio = 'النبذة المختصرة مطلوبة';
      else if (formData.speakerBio.trim().split(/\s+/).length > 100) newErrors.speakerBio = 'النبذة يجب ألا تتجاوز 100 كلمة';
    }
    else if (selectedRole === 'partner') {
      if (!formData.companyName.trim()) newErrors.companyName = 'اسم المؤسسة مطلوب';
      if (!formData.partnerType) newErrors.partnerType = 'نوع الشراكة مطلوب';
    }
    else if (selectedRole === 'investor') {
      if (!formData.investmentType) newErrors.investmentType = 'نوع الاستثمار المفضل مطلوب';
      if (!formData.ticketSize) newErrors.ticketSize = 'حجم الاستثمار المستهدف مطلوب';
    }
    else if (selectedRole === 'mentor') {
      if (!formData.mentorExpertise) newErrors.mentorExpertise = 'مجال التدريب مطلوب';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'سنوات الخبرة مطلوبة';
    }
    else if (selectedRole === 'volunteer') {
      if (!formData.volunteerCommittee) newErrors.volunteerCommittee = 'لجنة التطوع المفضلة مطلوبة';
      if (!formData.hasVolunteerExperience) newErrors.hasVolunteerExperience = 'يرجى تحديد ما إذا كان لديك خبرة';
    }
    else if (selectedRole === 'researcher') {
      if (!formData.researchTitle.trim()) newErrors.researchTitle = 'عنوان البحث مطلوب';
      if (!formData.researchIdea.trim()) newErrors.researchIdea = 'فكرة البحث مطلوبة';
      else if (formData.researchIdea.trim().split(/\s+/).length > 150) newErrors.researchIdea = 'فكرة البحث يجب ألا تتجاوز 150 كلمة';
      if (!formData.trlLevel) newErrors.trlLevel = 'يرجى تحديد مستوى الجاهزية التكنولوجية (TRL)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (currentRole.requiresAttachment && !formData.attachment) {
      newErrors.attachment = `يرجى إرفاق ${currentRole.attachmentLabel}`;
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'يجب الموافقة على شروط وأحكام القمة';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep3()) {
      setIsSubmitting(true);
      setSubmitError('');

      try {
        let cvUrl = '';

        if (formData.attachment && isSupabaseConfigured) {
          const file = formData.attachment;
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}_cv.${fileExt}`;
          const filePath = `cvs/${fileName}`;

          const { data, error } = await supabase.storage
            .from('project-attachments')
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

          if (error) throw error;

          const { data: publicUrlData } = supabase.storage
            .from('project-attachments')
            .getPublicUrl(filePath);

          cvUrl = publicUrlData.publicUrl;
        }

        if (isSupabaseConfigured) {
          const { fullName, email, phone, organization, attachment, acceptTerms, ...otherDetails } = formData;
          
          const { data, error } = await supabase
            .from('registrations')
            .insert([
              {
                full_name: fullName,
                email,
                phone,
                organization,
                role: selectedRole,
                cv_url: cvUrl,
                details: otherDetails
              }
            ]);

          if (error) throw error;
        } else {
          console.warn("Supabase is not configured. Mocking registration submission...");
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        setIsSubmitted(true);
      } catch (err) {
        console.error(err);
        setSubmitError(err.message || 'حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 px-4" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">تم تسجيل طلبك بنجاح!</h2>
          <p className="text-slate-600 mb-10 leading-relaxed">
            شكراً لانضمامك إلينا. سنتواصل معك قريباً لاستكمال باقي الإجراءات الخاصة بـ <span className="font-bold text-blue-600">({currentRole.title})</span>.
          </p>
          <Link to="/" className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
            العودة للرئيسية
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  // Helpers for UI
  const renderInputError = (fieldName) => {
    return errors[fieldName] ? <p className="text-red-500 text-sm mt-1.5 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors[fieldName]}</p> : null;
  };

  const getInputClass = (fieldName) => {
    return `w-full px-5 py-3.5 rounded-xl border ${errors[fieldName] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none`;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
          
          <div className="bg-slate-900 px-8 py-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
            <div className="relative z-10">
              <h1 className="text-3xl font-black mb-3">{currentRole.title}</h1>
              <p className="text-blue-100/80 text-lg">{currentRole.description}</p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            {/* Steps Indicator */}
            <div className="flex items-center justify-center mb-10">
              <div className="flex items-center w-full max-w-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>1</div>
                <div className={`flex-1 h-1 mx-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>2</div>
                <div className={`flex-1 h-1 mx-2 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-100'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 3 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>3</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">البيانات الشخصية</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">نوع التسجيل *</label>
                    <div className="relative">
                      <select 
                        name="registrationRole" 
                        value={selectedRole} 
                        onChange={(e) => setSelectedRole(e.target.value)} 
                        className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none appearance-none font-bold text-slate-700"
                      >
                        <option value="speaker">متحدث (Speaker)</option>
                        <option value="startup">شركة ناشئة (Startup)</option>
                        <option value="investor">مستثمر (Investor)</option>
                        <option value="mentor">مدرب / موجه (Mentor)</option>
                        <option value="partner">شريك (Partner)</option>
                      </select>
                      <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={getInputClass('fullName')} placeholder="أدخل اسمك ثلاثي" />
                    {renderInputError('fullName')}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass('email')} placeholder="example@email.com" dir="ltr" />
                    {renderInputError('email')}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={getInputClass('phone')} placeholder="01xxxxxxxxx" dir="ltr" />
                    {renderInputError('phone')}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">جهة العمل / الجامعة *</label>
                    <div className="relative">
                      <select name="organization" value={formData.organization} onChange={handleChange} className={`${getInputClass('organization')} appearance-none`}>
                        <option value="">اختر جهة العمل/الجامعة...</option>
                        <option value="طالب بجامعة المنيا">طالب بجامعة المنيا</option>
                        <option value="خريج جامعة المنيا">خريج جامعة المنيا</option>
                        <option value="جامعة أخرى">جامعة أخرى</option>
                        <option value="شركة/مؤسسة">شركة/مؤسسة (قطاع خاص/حكومي)</option>
                        <option value="عمل حر/مستقل">عمل حر / مستقل</option>
                      </select>
                      <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                    {renderInputError('organization')}
                  </div>
                </div>
              )}

              {/* STEP 2: Dynamic Role Details */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    {selectedRole === 'startup' ? 'بيانات الشركة الناشئة' : 
                     selectedRole === 'speaker' ? 'تفاصيل المشاركة (متحدث)' :
                     selectedRole === 'partner' ? 'تفاصيل الشراكة المقترحة' :
                     selectedRole === 'investor' ? 'البيانات الاستثمارية' :
                     selectedRole === 'mentor' ? 'مجالات الإرشاد' : 'بيانات التطوع'}
                  </h3>

                  {/* STARTUP */}
                  {selectedRole === 'startup' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">اسم الشركة / المشروع *</label>
                        <input type="text" name="startupName" value={formData.startupName} onChange={handleChange} className={getInputClass('startupName')} placeholder="اسم مشروعك المبتكر" />
                        {renderInputError('startupName')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">القطاع (Industry) *</label>
                        <div className="relative">
                          <select name="industry" value={formData.industry} onChange={handleChange} className={`${getInputClass('industry')} appearance-none`}>
                            <option value="">اختر القطاع...</option>
                            <option value="تكنولوجيا التعليم">تكنولوجيا التعليم (EdTech)</option>
                            <option value="التكنولوجيا المالية">التكنولوجيا المالية (FinTech)</option>
                            <option value="الزراعة والغذاء">الزراعة والغذاء (AgriTech)</option>
                            <option value="الصحة والتكنولوجيا الطبية">الصحة والتكنولوجيا الطبية (HealthTech)</option>
                            <option value="الذكاء الاصطناعي">الذكاء الاصطناعي والبيانات (AI & Data)</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('industry')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">مرحلة المشروع *</label>
                        <div className="relative">
                          <select name="stage" value={formData.stage} onChange={handleChange} className={`${getInputClass('stage')} appearance-none`}>
                            <option value="">أين يقع مشروعك الآن؟</option>
                            <option value="مجرد فكرة">مجرد فكرة (Idea Stage)</option>
                            <option value="نموذج أولي">نموذج أولي (MVP)</option>
                            <option value="قيد التشغيل">قيد التشغيل (Operating)</option>
                            <option value="يحقق إيرادات">يحقق إيرادات (Revenue Generating)</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('stage')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">وصف مختصر (Elevator Pitch) * <span className="text-slate-400 font-normal text-xs mr-2">(بحد أقصى 100 كلمة)</span></label>
                        <textarea name="elevatorPitch" value={formData.elevatorPitch} onChange={handleChange} rows={4} className={`${getInputClass('elevatorPitch')} resize-none`} placeholder="اشرح المشكلة التي يحلها مشروعك والحل المبتكر..." />
                        {renderInputError('elevatorPitch')}
                      </div>
                    </>
                  )}

                  {/* SPEAKER */}
                  {selectedRole === 'speaker' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">موضوع التحدث المقترح *</label>
                        <input type="text" name="speechTopic" value={formData.speechTopic} onChange={handleChange} className={getInputClass('speechTopic')} placeholder="عن ماذا تود أن تتحدث؟" />
                        {renderInputError('speechTopic')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">مجال الخبرة *</label>
                        <div className="relative">
                          <select name="speakerExpertise" value={formData.speakerExpertise} onChange={handleChange} className={`${getInputClass('speakerExpertise')} appearance-none`}>
                            <option value="">اختر مجال خبرتك...</option>
                            <option value="ريادة الأعمال">ريادة الأعمال</option>
                            <option value="التكنولوجيا والذكاء الاصطناعي">التكنولوجيا والذكاء الاصطناعي</option>
                            <option value="الاستثمار والتمويل">الاستثمار والتمويل</option>
                            <option value="التسويق والمبيعات">التسويق والمبيعات</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('speakerExpertise')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">نبذة مختصرة (Bio) * <span className="text-slate-400 font-normal text-xs mr-2">(بحد أقصى 100 كلمة)</span></label>
                        <textarea name="speakerBio" value={formData.speakerBio} onChange={handleChange} rows={4} className={`${getInputClass('speakerBio')} resize-none`} placeholder="قدم نفسك للجمهور..." />
                        {renderInputError('speakerBio')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">رابط حساب LinkedIn (اختياري)</label>
                        <input type="url" name="speakerLinkedin" value={formData.speakerLinkedin} onChange={handleChange} className={getInputClass('speakerLinkedin')} placeholder="https://linkedin.com/in/..." dir="ltr" />
                      </div>
                    </>
                  )}

                  {/* PARTNER */}
                  {selectedRole === 'partner' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">اسم الشركة / المؤسسة *</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={getInputClass('companyName')} placeholder="اسم مؤسستك" />
                        {renderInputError('companyName')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">نوع الشراكة المقترحة *</label>
                        <div className="relative">
                          <select name="partnerType" value={formData.partnerType} onChange={handleChange} className={`${getInputClass('partnerType')} appearance-none`}>
                            <option value="">اختر نوع الشراكة...</option>
                            <option value="راعي رسمي">راعي رسمي (Sponsor)</option>
                            <option value="شريك إعلامي">شريك إعلامي (Media Partner)</option>
                            <option value="شريك تقني">شريك تقني (Tech Partner)</option>
                            <option value="شريك مجتمعي">شريك مجتمعي (Community Partner)</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('partnerType')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">الموقع الإلكتروني للشركة (اختياري)</label>
                        <input type="url" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className={getInputClass('companyWebsite')} placeholder="https://example.com" dir="ltr" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">رسالة الشراكة (اختياري)</label>
                        <textarea name="partnerMessage" value={formData.partnerMessage} onChange={handleChange} rows={3} className={`${getInputClass('partnerMessage')} resize-none`} placeholder="ما الذي تتطلع لتحقيقه من خلال هذه الشراكة؟" />
                      </div>
                    </>
                  )}

                  {/* INVESTOR */}
                  {selectedRole === 'investor' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">اسم الجهة الاستثمارية (إن وجدت)</label>
                        <input type="text" name="investorEntity" value={formData.investorEntity} onChange={handleChange} className={getInputClass('investorEntity')} placeholder="اسم صندوق الاستثمار أو المؤسسة" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">نوع الاستثمار المفضل *</label>
                        <div className="relative">
                          <select name="investmentType" value={formData.investmentType} onChange={handleChange} className={`${getInputClass('investmentType')} appearance-none`}>
                            <option value="">اختر النوع...</option>
                            <option value="Angel Investor">مستثمر ملائكي (Angel Investor)</option>
                            <option value="Venture Capital">رأس مال جريء (Venture Capital)</option>
                            <option value="جهة مانحة">جهة مانحة (Grants)</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('investmentType')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">حجم الاستثمار المستهدف (Ticket Size) *</label>
                        <div className="relative">
                          <select name="ticketSize" value={formData.ticketSize} onChange={handleChange} className={`${getInputClass('ticketSize')} appearance-none`}>
                            <option value="">اختر حجم الاستثمار...</option>
                            <option value="أقل من 100 ألف">أقل من 100 ألف جنيه</option>
                            <option value="100 ألف - 500 ألف">100 ألف - 500 ألف جنيه</option>
                            <option value="أكثر من 500 ألف">أكثر من 500 ألف جنيه</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('ticketSize')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">رابط حساب LinkedIn (اختياري)</label>
                        <input type="url" name="investorLinkedin" value={formData.investorLinkedin} onChange={handleChange} className={getInputClass('investorLinkedin')} placeholder="https://linkedin.com/in/..." dir="ltr" />
                      </div>
                    </>
                  )}

                  {/* MENTOR */}
                  {selectedRole === 'mentor' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">مجال التدريب (Expertise) *</label>
                        <div className="relative">
                          <select name="mentorExpertise" value={formData.mentorExpertise} onChange={handleChange} className={`${getInputClass('mentorExpertise')} appearance-none`}>
                            <option value="">اختر مجالك...</option>
                            <option value="تطوير الأعمال">تطوير الأعمال</option>
                            <option value="التسويق والمبيعات">التسويق والمبيعات</option>
                            <option value="البرمجة والتطوير">البرمجة والتطوير التقني</option>
                            <option value="الشؤون القانونية">الشؤون القانونية والتأسيس</option>
                            <option value="المالية والاستثمار">المالية والاستثمار</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('mentorExpertise')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">سنوات الخبرة *</label>
                        <input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} className={getInputClass('yearsExperience')} placeholder="مثال: 5" min="0" />
                        {renderInputError('yearsExperience')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">رابط حساب LinkedIn (اختياري)</label>
                        <input type="url" name="mentorLinkedin" value={formData.mentorLinkedin} onChange={handleChange} className={getInputClass('mentorLinkedin')} placeholder="https://linkedin.com/in/..." dir="ltr" />
                      </div>
                    </>
                  )}

                  {/* VOLUNTEER */}
                  {selectedRole === 'volunteer' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">لجنة التطوع المفضلة *</label>
                        <div className="relative">
                          <select name="volunteerCommittee" value={formData.volunteerCommittee} onChange={handleChange} className={`${getInputClass('volunteerCommittee')} appearance-none`}>
                            <option value="">اختر اللجنة المفضلة...</option>
                            <option value="التنظيم والاستقبال">التنظيم والاستقبال</option>
                            <option value="العلاقات العامة والإعلام">العلاقات العامة والإعلام</option>
                            <option value="الدعم التقني">الدعم التقني</option>
                            <option value="التصوير والمونتاج">التصوير والمونتاج</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('volunteerCommittee')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">هل لديك خبرة سابقة في التطوع؟ *</label>
                        <div className="relative">
                          <select name="hasVolunteerExperience" value={formData.hasVolunteerExperience} onChange={handleChange} className={`${getInputClass('hasVolunteerExperience')} appearance-none`}>
                            <option value="">اختر...</option>
                            <option value="نعم">نعم، لدي خبرة سابقة</option>
                            <option value="لا">لا، هذه أول مرة</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('hasVolunteerExperience')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">لماذا تود التطوع؟ (اختياري)</label>
                        <textarea name="volunteerReason" value={formData.volunteerReason} onChange={handleChange} rows={3} className={`${getInputClass('volunteerReason')} resize-none`} placeholder="حدثنا عن دافعك للتطوع معنا..." />
                      </div>
                    </>
                  )}

                  {/* RESEARCHER */}
                  {selectedRole === 'researcher' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">عنوان البحث التطبيقي *</label>
                        <input type="text" name="researchTitle" value={formData.researchTitle} onChange={handleChange} className={getInputClass('researchTitle')} placeholder="أدخل عنوان البحث أو المشروع" />
                        {renderInputError('researchTitle')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">فكرة البحث التطبيقي والمشكلة التي يعالجها * <span className="text-slate-400 font-normal text-xs mr-2">(بحد أقصى 150 كلمة)</span></label>
                        <textarea name="researchIdea" value={formData.researchIdea} onChange={handleChange} rows={5} className={`${getInputClass('researchIdea')} resize-none`} placeholder="اشرح فكرة البحث بشكل مبسط وما هي المشكلة الصناعية أو المجتمعية التي يحلها وكيف يمكن تسويقه..." />
                        {renderInputError('researchIdea')}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">مستوى الجاهزية التكنولوجية (TRL) *</label>
                        <div className="relative">
                          <select name="trlLevel" value={formData.trlLevel} onChange={handleChange} className={`${getInputClass('trlLevel')} appearance-none`}>
                            <option value="">اختر مستوى الجاهزية...</option>
                            <option value="TRL 1-3">TRL 1-3 (فكرة بحثية وتجارب معملية مبدئية)</option>
                            <option value="TRL 4-6">TRL 4-6 (نموذج أولي تم اختباره معملياً أو في بيئة مشابهة)</option>
                            <option value="TRL 7-9">TRL 7-9 (نظام مكتمل قابل للتسويق أو تم تسويقه)</option>
                          </select>
                          <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                        </div>
                        {renderInputError('trlLevel')}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 3: Attachments & Confirmation */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">المرفقات والتأكيد</h3>
                  
                  {currentRole.attachmentLabel && (
                    <div className="mb-8">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {currentRole.attachmentLabel} {currentRole.requiresAttachment ? '*' : '(اختياري)'}
                        <span className="text-slate-400 font-normal text-xs mr-2">(PDF فقط، أقصى حجم 10MB)</span>
                      </label>
                      <div className={`relative border-2 border-dashed ${errors.attachment ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50'} rounded-2xl p-8 text-center hover:bg-slate-100 transition-colors group cursor-pointer`}>
                        <input type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        
                        {formData.attachment ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-slate-900 font-bold truncate max-w-[200px]">{formData.attachment.name}</p>
                              <p className="text-sm text-slate-500">{(formData.attachment.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-slate-200 text-slate-500 group-hover:text-blue-500 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <p className="text-slate-600 font-medium">اضغط هنا لرفع الملف أو اسحبه وأفلته</p>
                          </div>
                        )}
                      </div>
                      {renderInputError('attachment')}
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <input 
                      type="checkbox" 
                      name="acceptTerms" 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-600 cursor-pointer"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-slate-700 leading-relaxed cursor-pointer select-none">
                      بضغطك هنا، أنت توافق على <button type="button" onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }} className="text-blue-600 font-bold underline hover:text-blue-800">شروط وأحكام القمة</button>.
                    </label>
                  </div>
                  {renderInputError('acceptTerms')}
                </div>
              )}

              {/* Submit Error Message */}
              {submitError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl font-bold text-center">
                  {submitError}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
                {step > 1 && (
                  <button type="button" onClick={handleBack} disabled={isSubmitting} className="px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors w-1/3 disabled:opacity-50">
                    السابق
                  </button>
                )}
                
                {step < 3 ? (
                  <button type="button" onClick={handleNext} className={`py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors hover:shadow-lg hover:shadow-blue-600/30 ${step === 1 ? 'w-full' : 'w-2/3 flex-1'}`}>
                    التالي
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className={`py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors hover:shadow-lg hover:shadow-blue-600/30 flex-1 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}>
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        جاري إرسال الطلب...
                      </>
                    ) : (
                      <>تأكيد التسجيل النهائي</>
                    )}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
