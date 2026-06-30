import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Upload, Plus, Trash2, Send, Save } from 'lucide-react';

// Form Data Initial State
const initialFormData = {
  // Step 1
  projectNameAr: '', projectNameEn: '', college: '', department: '', year: '', courseName: '', projectType: 'جماعي',
  // Step 2
  teamMembersCount: 1, teamLeader: '', isMultiCollege: 'لا', multiCollegeDetails: '',
  teamMembers: [{ name: '', id: '', college: '', email: '', phone: '', role: '' }],
  // Step 3
  supervisorName: '', supervisorCollege: '', supervisorDegree: '', supervisorEmail: '', supervisorPhone: '', hasCoSupervisors: 'لا',
  // Step 4 (Checkboxes)
  projectCategory: [],
  // Step 5 (Checkboxes)
  targetSector: [],
  // Step 6
  projectSummary: '', problemAddressed: '', targetAudience: '', solutionProvided: '', innovationAspect: '', providedValue: [],
  // Step 7
  readinessLevel: [], hasPrototype: 'قيد التطوير', hasBeenTested: 'لا', completedWorkDescription: '', currentChallenges: '',
  // Step 8
  canBeProduct: 'ربما بعد تطوير إضافي', canBeStartup: 'غير متأكد', suitableMarket: [], interestedParties: [],
  // Step 9
  implementedBy: 'بالكامل', hasProtectableCode: 'غير متأكد', isPublishedOnline: 'لا', isExhibitedBefore: 'لا', clearAgreements: 'تحتاج إلى توضيح', needsIpReview: 'غير متأكد', agreeToNonConfidentialSummary: 'بعد مراجعة الملكية الفكرية',
  // Step 10
  requiredSupport: [], supportDescription: '',
  // Step 11
  expectedOutcomes: [], desiredResult: '',
  // Step 12
  files: {},
  // Step 13
  declarations: { dataAccuracy: false, ipRights: false, teamApproval: false, followUp: false }
};

const STEPS = [
  "بيانات المشروع", "بيانات الفريق", "بيانات المشرف", "نوع المشروع", 
  "القطاع المستهدف", "وصف المشروع", "مستوى الجاهزية", "التسويق أو الاحتضان",
  "الملكية الفكرية", "الدعم المطلوب", "المخرجات المتوقعة", "الملفات والمرفقات",
  "الإقرارات", "مراجعة وإرسال"
];

const SubmitGraduationProjectPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // For boolean declarations
      if (name.startsWith('dec_')) {
        const decName = name.replace('dec_', '');
        setFormData(prev => ({ ...prev, declarations: { ...prev.declarations, [decName]: checked } }));
      } else {
        // Array checkboxes
        setFormData(prev => {
          const arr = prev[name] || [];
          if (checked) return { ...prev, [name]: [...arr, value] };
          return { ...prev, [name]: arr.filter(item => item !== value) };
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index][field] = value;
    setFormData(prev => ({ ...prev, teamMembers: newMembers }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembersCount: prev.teamMembersCount + 1,
      teamMembers: [...prev.teamMembers, { name: '', id: '', college: '', email: '', phone: '', role: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length <= 1) return;
    const newMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      teamMembersCount: prev.teamMembersCount - 1,
      teamMembers: newMembers
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 14));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const submitForm = (e) => { e.preventDefault(); alert("تم استلام المشروع بنجاح! شكراً لتقديمك."); };

  // Helper for Checkbox Groups
  const CheckboxGroup = ({ name, options }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer">
          <input type="checkbox" name={name} value={opt} checked={formData[name]?.includes(opt)} onChange={handleInputChange} className="w-5 h-5 text-[#26462C] focus:ring-[#26462C] rounded" />
          <span className="text-slate-700 font-bold text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );

  // Helper for Radio Groups
  const RadioGroup = ({ name, options, label }) => (
    <div className="mb-6">
      {label && <label className="block text-sm font-bold text-[#26462C] mb-3">{label}</label>}
      <div className="flex flex-wrap gap-4">
        {options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={name} value={opt} checked={formData[name] === opt} onChange={handleInputChange} className="w-4 h-4 text-[#F4A217] focus:ring-[#F4A217]" />
            <span className="text-slate-700 font-semibold">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20 font-sans" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#26462C] mb-4">نموذج تقديم مشروع تخرج</h1>
          <p className="text-lg text-slate-600 font-bold bg-[#F4A217]/10 inline-block px-6 py-2 rounded-full border border-[#F4A217]/20">
            Graduation Projects Market Access Track | من مشروع تخرج إلى منتج أو شركة أو فرصة عمل
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 bg-[#26462C] transition-all duration-500" style={{ width: `${(currentStep / 14) * 100}%` }}></div>
          <div className="flex justify-between items-center px-2 pt-2">
            <div className="font-black text-[#26462C]">الخطوة {currentStep} من 14</div>
            <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{STEPS[currentStep - 1]}</div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-10">
          <form onSubmit={submitForm}>
            
            {/* --- STEP 1 --- */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 1: بيانات المشروع</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">اسم المشروع باللغة العربية *</label>
                    <input type="text" name="projectNameAr" value={formData.projectNameAr} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 focus:ring-[#26462C] focus:border-[#26462C]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">اسم المشروع باللغة الإنجليزية *</label>
                    <input type="text" name="projectNameEn" value={formData.projectNameEn} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 focus:ring-[#26462C] focus:border-[#26462C]" required dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الكلية *</label>
                    <select name="college" value={formData.college} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 focus:ring-[#26462C] focus:border-[#26462C]">
                      <option value="">اختر الكلية...</option>
                      <optgroup label="جامعة المنيا (حكومية) - القطاع الطبي والصحي">
                        <option value="الطب البشري (حكومية)">كلية الطب البشري</option>
                        <option value="طب الأسنان (حكومية)">كلية طب الأسنان</option>
                        <option value="الصيدلة (حكومية)">كلية الصيدلة</option>
                        <option value="التمريض (حكومية)">كلية التمريض</option>
                      </optgroup>
                      <optgroup label="جامعة المنيا (حكومية) - القطاع العلمي والهندسي">
                        <option value="الهندسة (حكومية)">كلية الهندسة</option>
                        <option value="الحاسبات والمعلومات (حكومية)">كلية الحاسبات والمعلومات</option>
                        <option value="العلوم (حكومية)">كلية العلوم</option>
                        <option value="الزراعة (حكومية)">كلية الزراعة</option>
                        <option value="الطب البيطري (حكومية)">كلية الطب البيطري</option>
                      </optgroup>
                      <optgroup label="جامعة المنيا (حكومية) - العلوم الإنسانية والاجتماعية">
                        <option value="الآداب (حكومية)">كلية الآداب</option>
                        <option value="الحقوق (حكومية)">كلية الحقوق</option>
                        <option value="الألسن (حكومية)">كلية الألسن</option>
                        <option value="دار العلوم (حكومية)">كلية دار العلوم</option>
                        <option value="السياحة والفنادق (حكومية)">كلية السياحة والفنادق</option>
                      </optgroup>
                      <optgroup label="جامعة المنيا (حكومية) - القطاع التربوي والفني">
                        <option value="التربية (حكومية)">كلية التربية</option>
                        <option value="التربية النوعية (حكومية)">كلية التربية النوعية</option>
                        <option value="التربية للطفولة المبكرة (حكومية)">كلية التربية للطفولة المبكرة</option>
                        <option value="التربية الرياضية (حكومية)">كلية التربية الرياضية</option>
                        <option value="التربية الفنية (حكومية)">كلية التربية الفنية</option>
                        <option value="الفنون الجميلة (حكومية)">كلية الفنون الجميلة</option>
                      </optgroup>
                      <optgroup label="ثانياً: جامعة المنيا الأهلية (7 كليات)">
                        <option value="الطب البشري (أهلية)">كلية الطب البشري</option>
                        <option value="طب الأسنان (أهلية)">كلية طب الأسنان</option>
                        <option value="الصيدلة - إكلينيكية (أهلية)">كلية الصيدلة (برنامج الصيدلة الإكلينيكية)</option>
                        <option value="العلاج الطبيعي (أهلية)">كلية العلاج الطبيعي</option>
                        <option value="الهندسة - ميكاترونيات (أهلية)">كلية الهندسة (برنامج هندسة الميكاترونيات والروبوتات الصناعية)</option>
                        <option value="الحاسبات والذكاء الاصطناعي (أهلية)">كلية الحاسبات والذكاء الاصطناعي</option>
                        <option value="العلاقات العامة وإدارة الأعمال (أهلية)">كلية العلاقات العامة وإدارة الأعمال</option>
                      </optgroup>
                      <optgroup label="ثالثاً: جامعة دراية الخاصة (4 كليات)">
                        <option value="الصيدلة (دراية)">كلية الصيدلة</option>
                        <option value="طب الفم والأسنان (دراية)">كلية طب الفم والأسنان</option>
                        <option value="العلاج الطبيعي (دراية)">كلية العلاج الطبيعي</option>
                        <option value="إدارة الأعمال (دراية)">كلية إدارة الأعمال</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">القسم / البرنامج الأكاديمي *</label>
                    <input type="text" name="department" value={formData.department} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 focus:ring-[#26462C] focus:border-[#26462C]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">العام الجامعي وسنة التخرج *</label>
                    <input type="text" name="year" value={formData.year} onChange={handleInputChange} placeholder="مثال: 2025/2026" className="w-full border-slate-200 rounded-xl p-3 focus:ring-[#26462C]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">اسم المقرر أو مسار المشروع (إن وجد)</label>
                    <input type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 focus:ring-[#26462C]" />
                  </div>
                </div>
                <RadioGroup name="projectType" label="هل المشروع فردي أم جماعي؟" options={['فردي', 'جماعي']} />
              </div>
            )}

            {/* --- STEP 2 --- */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 2: بيانات فريق المشروع</h2>
                
                <div className="mb-6 flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-[#26462C]">عدد أعضاء الفريق: {formData.teamMembersCount}</div>
                  <button type="button" onClick={addTeamMember} className="flex items-center gap-2 bg-[#26462C] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#1e3622]">
                    <Plus className="w-4 h-4" /> إضافة طالب
                  </button>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 relative shadow-sm">
                    <div className="absolute top-4 left-4">
                      {index > 0 && (
                        <button type="button" onClick={() => removeTeamMember(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <h3 className="font-black text-[#F4A217] mb-4">الطالب {index + 1} {index === 0 && '(قائد الفريق)'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الاسم</label>
                        <input type="text" value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} className="w-full text-sm border-slate-200 rounded-lg p-2" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الرقم الجامعي</label>
                        <input type="text" value={member.id} onChange={(e) => handleTeamMemberChange(index, 'id', e.target.value)} className="w-full text-sm border-slate-200 rounded-lg p-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الكلية / القسم</label>
                        <input type="text" value={member.college} onChange={(e) => handleTeamMemberChange(index, 'college', e.target.value)} className="w-full text-sm border-slate-200 rounded-lg p-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                        <input type="email" value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} className="w-full text-sm border-slate-200 rounded-lg p-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف</label>
                        <input type="tel" value={member.phone} onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)} className="w-full text-sm border-slate-200 rounded-lg p-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الدور داخل المشروع</label>
                        <input type="text" value={member.role} onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)} className="w-full text-sm border-slate-200 rounded-lg p-2" />
                      </div>
                    </div>
                  </div>
                ))}

                <RadioGroup name="isMultiCollege" label="هل يوجد طلاب من أكثر من كلية أو تخصص؟" options={['نعم', 'لا']} />
                {formData.isMultiCollege === 'نعم' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">يرجى توضيح التخصصات المشاركة</label>
                    <textarea name="multiCollegeDetails" value={formData.multiCollegeDetails} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-20"></textarea>
                  </div>
                )}
              </div>
            )}

            {/* --- STEP 3 --- */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 3: بيانات المشرف الأكاديمي</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">اسم المشرف الرئيسي</label>
                    <input type="text" name="supervisorName" value={formData.supervisorName} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الكلية / القسم</label>
                    <input type="text" name="supervisorCollege" value={formData.supervisorCollege} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الدرجة العلمية / الوظيفة</label>
                    <input type="text" name="supervisorDegree" value={formData.supervisorDegree} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                    <input type="email" name="supervisorEmail" value={formData.supervisorEmail} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label>
                    <input type="tel" name="supervisorPhone" value={formData.supervisorPhone} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3" />
                  </div>
                </div>
                <RadioGroup name="hasCoSupervisors" label="هل يوجد مشرفون مشاركون؟" options={['نعم', 'لا']} />
              </div>
            )}

            {/* --- STEP 4 --- */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 4: نوع مشروع التخرج</h2>
                <p className="text-sm font-bold text-slate-500 mb-4">يمكنك اختيار أكثر من نوع</p>
                <CheckboxGroup name="projectCategory" options={[
                  'تطبيق موبايل', 'منصة إلكترونية', 'موقع إلكتروني', 'نظام ذكاء اصطناعي',
                  'نظام تحليل بيانات', 'برنامج / Software', 'جهاز أو نموذج هندسي', 'نموذج معملي',
                  'منتج غذائي', 'منتج بيئي أو أخضر', 'منتج اقتصاد منزلي', 'تصميم أو منتج إبداعي',
                  'حملة إعلامية أو منتج رقمي', 'مشروع تعليمي أو تكنولوجيا تعليم', 'مشروع سياحي أو خدمي', 
                  'مشروع زراعي أو غذائي', 'مشروع صحي أو توعوي', 'مشروع يخدم ذوي الهمم', 
                  'مشروع اجتماعي أو مجتمعي', 'أخرى'
                ]} />
              </div>
            )}

            {/* --- STEP 5 --- */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 5: القطاع المستهدف</h2>
                <CheckboxGroup name="targetSector" options={[
                  'التعليم وتكنولوجيا التعليم', 'الذكاء الاصطناعي والتحول الرقمي',
                  'الصحة والرعاية', 'الزراعة الذكية',
                  'التصنيع الغذائي', 'البيئة والاستدامة',
                  'الطاقة والمياه', 'السياحة والفنادق',
                  'الإعلام والصناعات الإبداعية', 'الاقتصاد المنزلي والمنتجات',
                  'الهندسة والصناعة', 'ريادة الأعمال الاجتماعية',
                  'الخدمات المجتمعية', 'ذوو الهمم والإتاحة', 'أخرى'
                ]} />
              </div>
            )}

            {/* --- STEP 6 --- */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 6: وصف المشروع</h2>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ملخص المشروع (150 إلى 250 كلمة يوضح الفكرة والمشكلة والحل)</label>
                  <textarea name="projectSummary" value={formData.projectSummary} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-32"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ما المشكلة التي يعالجها المشروع؟</label>
                  <textarea name="problemAddressed" value={formData.problemAddressed} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-20"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">من الفئة المستفيدة من المشروع؟ (طلاب، خريجون، أطفال، إلخ)</label>
                  <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ما الحل الذي يقدمه المشروع؟</label>
                  <textarea name="solutionProvided" value={formData.solutionProvided} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-20"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ما وجه الابتكار أو التميز في المشروع؟</label>
                  <textarea name="innovationAspect" value={formData.innovationAspect} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-20"></textarea>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-bold text-[#26462C] mb-3">القيمة التي يقدمها المشروع:</label>
                  <CheckboxGroup name="providedValue" options={[
                    'حل مشكلة واقعية', 'تقليل تكلفة', 'توفير وقت', 'تحسين جودة خدمة',
                    'دعم الاستدامة', 'دعم التحول الرقمي', 'خلق فرصة عمل', 'قابلية التحول لشركة ناشئة',
                    'قابلية الدخول إلى السوق', 'أثر مجتمعي أو تنموي', 'أخرى'
                  ]} />
                </div>
              </div>
            )}

            {/* --- STEP 7 --- */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 7: مستوى جاهزية المشروع</h2>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-[#26462C] mb-3">ما المرحلة الحالية للمشروع؟</label>
                  <CheckboxGroup name="readinessLevel" options={[
                    'مجرد فكرة', 'تصميم مبدئي', 'نموذج أولي Prototype', 'تطبيق يعمل جزئيًا',
                    'تطبيق يعمل بكفاءة', 'تم اختباره داخل الكلية', 'تم اختباره مع مستخدمين',
                    'تم عرضه في معرض', 'يوجد مستخدمون أو عملاء', 'جاهز للتطوير التجاري',
                    'جاهز للاحتضان', 'جاهز للعرض أمام شركة'
                  ]} />
                </div>
                <RadioGroup name="hasPrototype" label="هل يوجد نموذج أولي أو نسخة تجريبية؟" options={['نعم', 'لا', 'قيد التطوير']} />
                <RadioGroup name="hasBeenTested" label="هل تم اختبار المشروع؟" options={['داخل الكلية', 'مع مستخدمين فعليين', 'مع جهة خارجية', 'لا', 'قيد الاختبار']} />
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">يرجى وصف ما تم إنجازه فعليًا</label>
                  <textarea name="completedWorkDescription" value={formData.completedWorkDescription} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-24"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ما أهم التحديات التي تواجه المشروع حاليًا؟</label>
                  <textarea name="currentChallenges" value={formData.currentChallenges} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-24"></textarea>
                </div>
              </div>
            )}

            {/* --- STEP 8 --- */}
            {currentStep === 8 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 8: قابلية التسويق أو الاحتضان</h2>
                <RadioGroup name="canBeProduct" label="هل ترى أن المشروع قابل للتحول إلى منتج أو خدمة؟" options={['نعم', 'لا', 'ربما بعد تطوير إضافي']} />
                <RadioGroup name="canBeStartup" label="هل ترى أن المشروع قابل للتحول إلى شركة ناشئة؟" options={['نعم', 'لا', 'غير متأكد']} />
                
                <div className="mt-8">
                  <label className="block text-sm font-bold text-[#26462C] mb-3">السوق أو البيئة المناسبة لتطبيق المشروع:</label>
                  <CheckboxGroup name="suitableMarket" options={[
                    'داخل جامعة المنيا', 'محافظة المنيا', 'صعيد مصر', 'مصر',
                    'سوق رقمي', 'سوق تعليمي', 'سوق صحي', 'سوق زراعي',
                    'سوق صناعي', 'سوق إبداعي', 'أخرى'
                  ]} />
                </div>
                <div className="mt-8">
                  <label className="block text-sm font-bold text-[#26462C] mb-3">من يمكن أن يهتم بالمشروع؟</label>
                  <CheckboxGroup name="interestedParties" options={[
                    'شركة', 'مستثمر', 'حاضنة أعمال', 'مسرعة أعمال',
                    'جهة حكومية', 'مؤسسة تعليمية', 'جهة صحية', 'مصنع',
                    'مزرعة / شركة زراعية', 'شركة نماء', 'جهة توظيف', 'أخرى'
                  ]} />
                </div>
              </div>
            )}

            {/* --- STEP 9 --- */}
            {currentStep === 9 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 9: الملكية الفكرية وحقوق الفريق</h2>
                <RadioGroup name="implementedBy" label="هل المشروع من تنفيذ الفريق الطلابي؟" options={['بالكامل', 'مع توجيه المشرف', 'ضمن مشروع بحثي أكبر', 'بالتعاون مع جهة خارجية']} />
                <RadioGroup name="hasProtectableCode" label="هل يحتوي المشروع على كود برمجي أو تصميم أو منتج قابل للحماية؟" options={['نعم', 'لا', 'غير متأكد']} />
                <RadioGroup name="isPublishedOnline" label="هل تم نشر المشروع أو الكود أو التصميم على الإنترنت؟" options={['نعم', 'لا']} />
                <RadioGroup name="isExhibitedBefore" label="هل تم عرض المشروع سابقًا في معرض أو مسابقة؟" options={['نعم', 'لا']} />
                <RadioGroup name="clearAgreements" label="هل توجد اتفاقات واضحة بين أعضاء الفريق حول الملكية؟" options={['نعم', 'لا', 'تحتاج إلى توضيح']} />
                <RadioGroup name="needsIpReview" label="هل يحتاج المشروع إلى مراجعة عيادة الملكية الفكرية قبل العرض؟" options={['نعم', 'لا', 'غير متأكد']} />
                <RadioGroup name="agreeToNonConfidentialSummary" label="هل توافقون على عرض ملخص غير سري للمشروع على منصة القمة؟" options={['نعم', 'لا', 'بعد مراجعة الملكية الفكرية']} />
              </div>
            )}

            {/* --- STEP 10 --- */}
            {currentStep === 10 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 10: نوع الدعم المطلوب</h2>
                <CheckboxGroup name="requiredSupport" options={[
                  'تدريب على التطوير', 'احتضان داخل الجامعة', 'تمويل أولي', 'مرشد أو خبير',
                  'تطوير تقني', 'تطوير نموذج أولي', 'اختبار مع مستخدمين', 'دراسة جدوى أولية',
                  'تصميم علامة تجارية', 'تسويق وبيع', 'تصوير احترافي', 'شريك صناعي',
                  'شريك تكنولوجي', 'شركة لتبني المشروع', 'عرض أمام مستثمرين', 'إدراج ضمن شركة نماء',
                  'تحويله لشركة ناشئة', 'فرصة تدريب للفريق', 'فرصة توظيف للفريق', 'حماية ملكية فكرية', 'أخرى'
                ]} />
                <div className="mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">صف بدقة ما يحتاجه المشروع في المرحلة القادمة</label>
                  <textarea name="supportDescription" value={formData.supportDescription} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-32"></textarea>
                </div>
              </div>
            )}

            {/* --- STEP 11 --- */}
            {currentStep === 11 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 11: المخرجات المتوقعة بعد القمة</h2>
                <CheckboxGroup name="expectedOutcomes" options={[
                  'مسار الاحتضان', 'مسار شركة نماء', 'مسار التوظيف', 'مسار الملكية الفكرية',
                  'مسار التطوير التقني', 'مسار التسويق', 'مسار الشراكات', 'مسار التدريب',
                  'غير متأكد ويحتاج تقييم'
                ]} />
                <div className="mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">ما النتيجة التي يتمنى الفريق الوصول إليها؟</label>
                  <textarea name="desiredResult" value={formData.desiredResult} onChange={handleInputChange} className="w-full border-slate-200 rounded-xl p-3 h-32"></textarea>
                </div>
              </div>
            )}

            {/* --- STEP 12 --- */}
            {currentStep === 12 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 12: الملفات والمرفقات</h2>
                
                <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 mb-6">
                  <h3 className="font-black text-[#F4A217] mb-4">مرفقات إلزامية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['ملخص المشروع PDF', 'عرض تقديمي Pitch Deck', 'صورة لقطة شاشة للمشروع', 'بيانات الفريق والمشرف'].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <div className="text-sm font-bold text-slate-700">{item}</div>
                          <input type="file" className="text-xs w-full mt-1 file:bg-[#26462C] file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:cursor-pointer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="font-black text-slate-600 mb-4">مرفقات اختيارية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'التقرير الكامل', 'رابط التطبيق', 'رابط GitHub', 'صور النموذج',
                      'فيديو Demo', 'دراسة جدوى', 'نموذج عمل', 'خطة تسويق',
                      'خطاب المشرف', 'شهادة مشاركة', 'إثبات اختبار', 'موافقة ملكية'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <div className="text-sm font-bold text-slate-700">{item}</div>
                          <input type="file" className="text-xs w-full mt-1 file:bg-slate-200 file:text-slate-700 file:border-0 file:rounded-md file:px-2 file:py-1 file:cursor-pointer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 13 --- */}
            {currentStep === 13 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 13: الإقرارات</h2>
                <div className="space-y-4">
                  {[
                    { key: 'dataAccuracy', title: 'إقرار صحة البيانات', text: 'نقر بأن جميع البيانات المقدمة صحيحة وكاملة على حد علمنا، ونتحمل مسؤولية أي بيانات غير دقيقة.' },
                    { key: 'ipRights', title: 'إقرار الملكية الفكرية', text: 'نقر بأن عرض المشروع على المنصة لا يتضمن أسرارًا فنية أو أكوادًا قد تضر بحقوق الملكية الفكرية.' },
                    { key: 'teamApproval', title: 'إقرار موافقة الفريق', text: 'نقر بأن جميع أعضاء الفريق على علم بتقديم المشروع وبالمشاركة في فعاليات القمة في حالة قبوله.' },
                    { key: 'followUp', title: 'إقرار المتابعة', text: 'نتعهد بالتعاون مع إدارة القمة في أنشطة التقييم، الاحتضان، التوظيف، أو المتابعة بعد القمة.' },
                  ].map((dec, i) => (
                    <label key={i} className="flex items-start gap-4 p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-[#26462C] cursor-pointer transition-colors">
                      <input type="checkbox" name={`dec_${dec.key}`} checked={formData.declarations[dec.key]} onChange={handleInputChange} className="w-6 h-6 mt-1 text-[#26462C] focus:ring-[#26462C] rounded" />
                      <div>
                        <div className="font-black text-lg text-[#26462C]">{dec.title}</div>
                        <div className="text-slate-600 font-semibold">{dec.text}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* --- STEP 14 --- */}
            {currentStep === 14 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-black text-[#26462C] mb-6 pb-2 border-b-2 border-[#F4A217] inline-block">الخطوة 14: المراجعة والإرسال</h2>
                
                <div className="bg-[#26462C] text-white p-8 rounded-3xl text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-[#F4A217] mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2">أنت جاهز تقريباً!</h3>
                  <p className="text-white/80 font-semibold">يرجى التأكد من استكمال كافة البيانات الأساسية والموافقات.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    'إدخال بيانات المشروع كاملة', 'إدخال بيانات الفريق والمشرف',
                    'تحديد نوع المشروع والقطاع', 'تحديد مستوى الجاهزية',
                    'تحديد نوع الدعم المطلوب', 'توضيح حالة الملكية الفكرية',
                    'رفع ملخص المشروع', 'رفع العرض التقديمي', 'الموافقة على الإقرارات'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-bold text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-black text-[#26462C] mb-3">حالة الطلب بعد الإرسال ستكون:</h4>
                  <ul className="list-disc list-inside text-sm font-semibold text-slate-600 space-y-1">
                    <li>تم استلام المشروع</li>
                    <li>تحت الفحص الإداري والتقييم الفني</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-colors ${currentStep === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                <ArrowRight className="w-5 h-5" /> السابق
              </button>

              {currentStep < 14 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-[#26462C] text-[#F4A217] px-8 py-3 rounded-xl font-black hover:bg-[#1e3622] transition-colors shadow-md"
                >
                  التالي <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#F4A217] text-[#26462C] px-10 py-4 rounded-xl font-black text-lg hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(244,162,23,0.3)] animate-pulse"
                >
                  <Send className="w-5 h-5" /> إرسال المشروع للمراجعة
                </button>
              )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitGraduationProjectPage;
