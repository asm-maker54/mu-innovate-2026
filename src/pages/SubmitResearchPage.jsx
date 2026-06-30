import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Check, UploadCloud, Plus, Trash2, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SubmitResearchPage = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 15;

  const [formData, setFormData] = useState({
    // Step 1
    piName: '', piFaculty: '', piDept: '', piRank: '', piEmail: '', piPhone: '', piOrcid: '',
    // Step 2
    hasTeam: 'لا', teamMembers: [], hasExternalPartners: 'لا', externalPartnerName: '',
    // Step 3
    titleAr: '', titleEn: '', outputType: [], targetSector: [], keywords: '',
    // Step 4
    execSummary: '', commSummary: '',
    // Step 5
    problem: '', targetAudience: [], solution: '', innovation: '', applications: '',
    // Step 6
    stage: '', trl: '', achieved: '', challenges: '',
    // Step 7
    ipStatus: '', published: 'لا', presented: 'لا', confidential: 'لا', thirdParty: 'لا', thirdPartyDetails: '', agreeSummary: '',
    // Step 8
    beneficiary: '', scope: [], valueProp: [], valueExplanation: '', hasCompetitors: 'لا', competitors: [],
    // Step 9
    supportType: [], supportNeeds: '',
    // Step 10
    objectives: [], activities: '', timeline: [], resources: [],
    // Step 11
    expertise: '', commitment: '', timeCommitment: '', facultySupport: '', facultySupportDetails: '',
    // Step 12 (Files as dummy state)
    files: {},
    // Step 13
    declAccuracy: false, declIP: false, declCommitment: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const current = prev[name] || [];
      if (current.includes(value)) return { ...prev, [name]: current.filter(i => i !== value) };
      return { ...prev, [name]: [...current, value] };
    });
  };

  const nextStep = () => setCurrentStep(p => Math.min(p + 1, totalSteps));
  const prevStep = () => setCurrentStep(p => Math.max(p - 1, 1));

  // Helper Components
  const Input = ({ label, name, type = 'text', placeholder = '' }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm" />
    </div>
  );

  const Textarea = ({ label, name, placeholder = '' }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <textarea name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-none" />
    </div>
  );

  const Select = ({ label, name, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <select name={name} value={formData[name]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all text-sm">
        <option value="">اختر...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const RadioGroup = ({ label, name, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="flex flex-col gap-2">
        {options.map(o => (
          <label key={o} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={name} value={o} checked={formData[name] === o} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-semibold text-gray-700">{o}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const MultiSelectGroup = ({ label, name, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map(o => (
          <label key={o} className="flex items-start gap-2 cursor-pointer p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <input type="checkbox" checked={(formData[name] || []).includes(o)} onChange={() => handleMultiSelect(name, o)} className="mt-1 text-blue-600 focus:ring-blue-500 rounded" />
            <span className="text-sm font-semibold text-gray-700">{o}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 1: بيانات الباحث الرئيسي</h2>
            <Input label="الاسم بالكامل" name="piName" />
            <Select label="الكلية" name="piFaculty" options={['الطب', 'الهندسة', 'العلوم', 'الحاسبات', 'الزراعة', 'أخرى']} />
            <Input label="القسم العلمي" name="piDept" />
            <Select label="الدرجة العلمية / الوظيفة" name="piRank" options={['مدرس مساعد', 'مدرس', 'أستاذ مساعد', 'أستاذ', 'باحث', 'طالب دراسات عليا', 'أخرى']} />
            <Input label="البريد الإلكتروني الجامعي" name="piEmail" type="email" />
            <Input label="رقم الهاتف" name="piPhone" type="tel" />
            <Input label="رابط Google Scholar / ORCID إن وجد" name="piOrcid" type="url" />
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 2: بيانات فريق البحث</h2>
            <RadioGroup label="هل يوجد فريق بحثي مشارك؟" name="hasTeam" options={['نعم', 'لا']} />
            {formData.hasTeam === 'نعم' && (
              <div className="p-4 bg-gray-50 rounded-lg mb-4 border border-gray-200">
                <p className="text-sm font-bold text-gray-600 mb-2">يرجى إضافة بيانات الفريق (يمكن تطوير هذه الواجهة لاحقاً لإضافة صفوف متعددة ديناميكياً)</p>
                <Textarea label="تفاصيل الفريق (الاسم، الكلية، الدور، طبيعة المساهمة)" name="teamMembers" placeholder="مثال: أحمد محمد - كلية الهندسة - باحث - تحليل البيانات..." />
              </div>
            )}
            <RadioGroup label="هل يوجد شركاء خارجيون؟" name="hasExternalPartners" options={['نعم', 'لا']} />
            {formData.hasExternalPartners === 'نعم' && <Input label="اسم الجهة الشريكة إن وجدت" name="externalPartnerName" />}
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 3: بيانات البحث أو الابتكار</h2>
            <Input label="عنوان البحث بالعربية" name="titleAr" />
            <Input label="عنوان البحث بالإنجليزية" name="titleEn" />
            <MultiSelectGroup label="نوع المخرج البحثي" name="outputType" options={['بحث منشور', 'رسالة ماجستير', 'رسالة دكتوراه', 'مشروع بحثي ممول', 'مشروع تخرج تطبيقي', 'نموذج أولي Prototype', 'منتج قابل للتطوير', 'تطبيق / منصة رقمية', 'خدمة استشارية أو تدريبية', 'براءة اختراع / طلب براءة', 'أخرى']} />
            <MultiSelectGroup label="القطاع المستهدف" name="targetSector" options={['الصحة والطب', 'الصيدلة والدواء', 'الزراعة الذكية', 'الطب البيطري والصحة الواحدة', 'التصنيع الغذائي', 'الطاقة والمياه والبيئة', 'الذكاء الاصطناعي والتحول الرقمي', 'التعليم وتكنولوجيا التعليم', 'السياحة والآثار', 'الصناعات الإبداعية والإعلام', 'الاقتصاد المنزلي والمنتجات الغذائية', 'الهندسة والصناعة', 'الخدمات المجتمعية', 'أخرى']} />
            <Input label="الكلمات المفتاحية" name="keywords" />
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 4: الملخص التنفيذي</h2>
            <Textarea label="ملخص تنفيذي مبسط للبحث (200-300 كلمة: فكرة، مشكلة، حل، تطبيقات، قيمة)" name="execSummary" />
            <Textarea label="ملخص تسويقي مختصر للعرض العام (غير سري)" name="commSummary" />
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 5: المشكلة والحل والابتكار</h2>
            <Textarea label="ما المشكلة التي يعالجها البحث؟" name="problem" />
            <MultiSelectGroup label="من الفئة أو الجهة التي تعاني من هذه المشكلة؟" name="targetAudience" options={['طلاب', 'باحثون', 'مدارس', 'مستشفيات', 'شركات', 'مصانع', 'مزارعون', 'جهات حكومية', 'مجتمع محلي', 'جامعة المنيا', 'محافظة المنيا', 'أخرى']} />
            <Textarea label="ما الحل الذي يقدمه البحث؟" name="solution" />
            <Textarea label="ما وجه الابتكار أو التميز؟" name="innovation" />
            <Textarea label="ما التطبيقات العملية المتوقعة؟" name="applications" />
          </div>
        );
      case 6:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 6: مستوى الجاهزية</h2>
            <Select label="ما المرحلة الحالية للبحث؟" name="stage" options={['فكرة بحثية تحتاج إلى تطوير', 'نتائج معملية أولية', 'إثبات مبدئي للفكرة Proof of Concept', 'نموذج أولي Prototype', 'تم اختباره داخل الجامعة / المعمل', 'تم اختباره في بيئة قريبة من الواقع', 'تم اختباره مع جهة خارجية', 'جاهز للتطبيق التجريبي', 'جاهز للتسويق أو التعاقد', 'يحتاج حماية ملكية فكرية قبل العرض']} />
            <Select label="مستوى الجاهزية التكنولوجية TRL" name="trl" options={['TRL 1: مبدأ علمي أو فكرة أولية', 'TRL 2: صياغة مفهوم التكنولوجيا', 'TRL 3: إثبات تجريبي أولي للفكرة', 'TRL 4: تحقق معملي من التكنولوجيا', 'TRL 5: تحقق في بيئة ذات صلة', 'TRL 6: نموذج أولي مجرّب في بيئة ذات صلة', 'TRL 7: نموذج أولي في بيئة تشغيلية', 'TRL 8: نظام مكتمل ومؤهل للتطبيق', 'TRL 9: نظام مثبت في بيئة تشغيلية فعلية']} />
            <Textarea label="ما الذي تم إنجازه فعليًا؟" name="achieved" />
            <Textarea label="ما التحديات أو المخاطر الفنية المتبقية؟" name="challenges" />
          </div>
        );
      case 7:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 7: الملكية الفكرية والإفصاح</h2>
            <Select label="حالة الملكية الفكرية" name="ipStatus" options={['لم يتم اتخاذ إجراء حماية بعد', 'البحث منشور أكاديميًا فقط', 'تم تقديم طلب براءة اختراع', 'حاصل على براءة اختراع', 'برنامج / تطبيق يحتاج حماية حقوق ملكية', 'تصميم أو نموذج صناعي قابل للحماية', 'يحتاج مراجعة عيادة الملكية الفكرية قبل العرض', 'غير متأكد وأحتاج استشارة']} />
            <RadioGroup label="هل تم نشر البحث؟" name="published" options={['نعم', 'لا']} />
            <RadioGroup label="هل تم عرضه سابقًا في مؤتمر أو معرض أو منصة عامة؟" name="presented" options={['نعم', 'لا']} />
            <RadioGroup label="هل يحتوي البحث على أسرار فنية أو تفاصيل لا يجب عرضها علنًا؟" name="confidential" options={['نعم', 'لا']} />
            <RadioGroup label="هل توجد حقوق أو التزامات لطرف ثالث أو جهة ممولة أو شريك خارجي؟" name="thirdParty" options={['نعم', 'لا']} />
            {formData.thirdParty === 'نعم' && <Textarea label="يرجى التوضيح إن وجد" name="thirdPartyDetails" />}
            <RadioGroup label="هل توافق على عرض ملخص غير سري للبحث داخل منصة القمة؟" name="agreeSummary" options={['نعم', 'لا', 'بعد مراجعة الملكية الفكرية']} />
          </div>
        );
      case 8:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 8: السوق والفرصة التجارية أو المجتمعية</h2>
            <Textarea label="من المستفيد من البحث؟" name="beneficiary" />
            <MultiSelectGroup label="نطاق التطبيق أو السوق المستهدف" name="scope" options={['جامعة المنيا', 'محافظة المنيا', 'صعيد مصر', 'مصر', 'الشرق الأوسط وشمال أفريقيا', 'أفريقيا', 'عالمي']} />
            <MultiSelectGroup label="القيمة المقترحة للمستفيد" name="valueProp" options={['خفض تكلفة', 'تحسين أداء', 'زيادة جودة', 'توفير وقت', 'سهولة استخدام', 'استدامة بيئية', 'تعزيز السلامة', 'تحسين خدمة', 'أثر اجتماعي أو تنموي', 'أخرى']} />
            <Textarea label="يرجى شرح القيمة المقترحة" name="valueExplanation" />
            <RadioGroup label="هل توجد حلول مشابهة أو منافسون؟" name="hasCompetitors" options={['نعم', 'لا', 'غير متأكد']} />
            {formData.hasCompetitors === 'نعم' && (
              <div className="p-4 bg-gray-50 rounded-lg mb-4 border border-gray-200">
                <Textarea label="أدخل بيانات المنافسين (البديل، نقاط القوة، الضعف، ميزتك)" name="competitors" placeholder="اكتب تفاصيل المنافسين هنا..." />
              </div>
            )}
          </div>
        );
      case 9:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 9: نوع الدعم أو التعاون المطلوب</h2>
            <MultiSelectGroup label="ما نوع الدعم المطلوب؟" name="supportType" options={['مراجعة ملكية فكرية', 'حماية براءة اختراع', 'تطوير نموذج أولي', 'اختبار ميداني', 'شريك صناعي', 'شريك زراعي', 'شريك تكنولوجي', 'تمويل', 'احتضان', 'ترخيص التكنولوجيا', 'تصنيع', 'تسويق', 'تعاقد بحثي', 'تأسيس شركة ناشئة', 'إدراج ضمن شركة نماء', 'عرض أمام مستثمرين', 'إدراج في Technology Offer Book', 'عرض في معرض تسويق البحوث', 'أخرى']} />
            <Textarea label="صف بدقة ما تحتاجه في المرحلة القادمة" name="supportNeeds" />
          </div>
        );
      case 10:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 10: خطة التطوير المقترحة</h2>
            <Textarea label="أهداف المرحلة القادمة (أدخل من 3 إلى 5 أهداف قابلة للقياس)" name="objectives" />
            <Textarea label="الأنشطة المقترحة" name="activities" />
            <Textarea label="الجدول الزمني المقترح (المرحلة، الوصف، المدة)" name="timeline" />
            <Textarea label="الموارد المطلوبة (أجهزة، خدمات، تطوير تقني، تصميم، تسويق)" name="resources" />
          </div>
        );
      case 11:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 11: قدرات الفريق والالتزام</h2>
            <Textarea label="ما خبرات الفريق المرتبطة بالبحث أو الابتكار؟" name="expertise" />
            <RadioGroup label="هل يلتزم الفريق بالمشاركة في أنشطة القمة وما بعدها إذا تم اختيار البحث؟" name="commitment" options={['نعم', 'لا', 'يحتاج تنسيق']} />
            <Input label="الوقت المتوقع للتفرغ للمتابعة" name="timeCommitment" />
            <RadioGroup label="هل توجد موافقة أو دعم مبدئي من القسم أو الكلية؟" name="facultySupport" options={['نعم', 'لا', 'لم تتم المناقشة بعد']} />
            {formData.facultySupport !== 'لم تتم المناقشة بعد' && <Textarea label="يرجى التوضيح" name="facultySupportDetails" />}
          </div>
        );
      case 12:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 12: المرفقات</h2>
            <div className="space-y-6">
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-blue-50 transition-colors cursor-pointer group">
                <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-bold text-gray-600">ملف البحث أو ملخص البحث PDF (إلزامي)</p>
                <input type="file" className="hidden" />
              </div>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-blue-50 transition-colors cursor-pointer group">
                <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-bold text-gray-600">ملخص تسويقي من صفحة واحدة (إلزامي)</p>
                <input type="file" className="hidden" />
              </div>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-blue-50 transition-colors cursor-pointer group">
                <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-bold text-gray-600">مرفقات اختيارية (Pitch Deck، صور، فيديو، الخ)</p>
                <input type="file" className="hidden" multiple />
              </div>
            </div>
          </div>
        );
      case 13:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-[#183059] mb-6 border-b pb-4">الخطوة 13: الإقرارات</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" name="declAccuracy" checked={formData.declAccuracy} onChange={handleChange} className="mt-1 text-blue-600 w-5 h-5 rounded" />
                <div>
                  <span className="block font-bold text-gray-900 mb-1">إقرار صحة البيانات</span>
                  <p className="text-sm text-gray-600 font-semibold">أقر بأن جميع البيانات المقدمة صحيحة وكاملة على حد علمي، وأتحمل مسؤولية أي بيانات غير دقيقة أو مضللة.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" name="declIP" checked={formData.declIP} onChange={handleChange} className="mt-1 text-blue-600 w-5 h-5 rounded" />
                <div>
                  <span className="block font-bold text-gray-900 mb-1">إقرار الملكية الفكرية وتعارض المصالح</span>
                  <p className="text-sm text-gray-600 font-semibold">أقر بأنني أفصحت عن جميع حقوق الملكية الفكرية، وأي التزامات لطرف ثالث، وأي تعارض مصالح محتمل مرتبط بهذا البحث أو الابتكار.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
                <input type="checkbox" name="declCommitment" checked={formData.declCommitment} onChange={handleChange} className="mt-1 text-blue-600 w-5 h-5 rounded" />
                <div>
                  <span className="block font-bold text-gray-900 mb-1">إقرار الالتزام بالتسويق والمتابعة</span>
                  <p className="text-sm text-gray-600 font-semibold">أتعهد بالتعاون مع إدارة القمة ومركز الابتكار وريادة الأعمال واللجان المختصة في أنشطة التقييم، والحماية الفكرية، والعرض أمام الشركاء، والتسويق أو التطوير إذا تم اختيار البحث.</p>
                </div>
              </label>
            </div>
          </div>
        );
      case 14:
        return (
          <div className="animate-fade-in text-center py-10">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-[#183059] mb-4">مراجعة قبل الإرسال</h2>
            <p className="text-gray-600 font-bold mb-8">يرجى التأكد من استكمال جميع البيانات والمرفقات والموافقة على الإقرارات قبل الإرسال النهائي.</p>
            <div className="bg-gray-50 p-6 rounded-2xl text-right max-w-lg mx-auto border border-gray-200 mb-8 shadow-sm">
              <ul className="space-y-3 text-sm font-bold text-gray-700">
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> استكمال البيانات الأساسية</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> إرفاق ملف البحث أو ملخصه</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> إرفاق الملخص التسويقي</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> تحديد مستوى الجاهزية TRL</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> توضيح حالة الملكية الفكرية</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> تحديد نوع الدعم المطلوب</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> إرفاق الملفات الداعمة إن وجدت</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> الموافقة على الإقرارات</li>
              </ul>
            </div>
          </div>
        );
      case 15:
        return (
          <div className="animate-fade-in text-center py-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-[#183059] mb-4">تم إرسال الطلب بنجاح!</h2>
            <p className="text-gray-600 font-bold mb-8">يمكنك متابعة حالة طلبك عبر المراحل التالية:</p>
            <div className="bg-white p-6 rounded-2xl text-right max-w-lg mx-auto border border-gray-200 shadow-sm relative">
              <div className="absolute right-9 top-10 bottom-10 w-0.5 bg-gray-200"></div>
              <ul className="space-y-6 relative z-10">
                {[
                  'تم استلام الطلب',
                  'تحت الفحص الإداري',
                  'يحتاج استكمال بيانات',
                  'تحت التقييم الفني',
                  'تحت مراجعة الملكية الفكرية',
                  'مقبول للعرض في القمة',
                  'مدرج في Technology Offer Book',
                  'محال إلى شركة نماء',
                  'محال إلى مستثمر / شريك صناعي',
                  'تحت المتابعة بعد القمة'
                ].map((status, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${idx === 0 ? 'bg-green-500 text-white ring-4 ring-green-100' : 'bg-gray-200 text-gray-500'}`}>
                      {idx + 1}
                    </div>
                    <span className={`font-bold ${idx === 0 ? 'text-green-600' : 'text-gray-500'}`}>{status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8fafc] font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#183059] mb-4">نموذج تقديم بحث تطبيقي قابل للتسويق</h1>
          <p className="text-gray-600 font-bold">من البحث إلى فرصة سوقية قابلة للتطبيق عبر المنصة الرقمية للقمة 2026</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
            <span>الخطوة {currentStep} من {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% مكتمل</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-100">
          
          {renderStep()}

          {/* Navigation Buttons */}
          {currentStep < 15 && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isRtl ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                السابق
              </button>
              
              {currentStep < 14 ? (
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#ea580c] text-white hover:bg-[#c2410c] shadow-md shadow-[#ea580c]/30 transition-all hover:-translate-y-1"
                >
                  التالي
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 px-10 py-3 rounded-xl font-black bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/30 transition-all hover:-translate-y-1"
                >
                  إرسال الطلب للمراجعة
                </button>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default SubmitResearchPage;
