import React, { useState, useEffect } from 'react';
import { 
  Trophy, Award, FileText, CheckCircle, Calendar, DollarSign, 
  AlertCircle, ArrowLeft, Send, HelpCircle, Users, Rocket,
  Clock, ShieldCheck, ChevronLeft, UploadCloud
} from 'lucide-react';

const CompetitionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedComp, setSelectedComp] = useState('pitching');
  const [submissionSubmitted, setSubmissionSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    projectTitle: '',
    competition: 'pitching',
    teamLeaderEmail: '',
    phone: '',
    pitchDeckUrl: '',
    summary: '',
    acceptTerms: false
  });

  const competitions = [
    {
      id: 'pitching',
      title: 'يوم العروض المبتكرة (Pitching Day)',
      subtitle: 'مسابقة عرض الأفكار الريادية أمام لجان الاستثمار والتحكيم',
      description: 'أكبر محفل سنوي بالجامعة لعرض المشاريع المبتكرة على مستثمرين وممثلي حاضنات الأعمال للحصول على تمويل مبدئي واحتضان فوري.',
      prize: '50,000 ج.م للمركز الأول + احتضان مباشر بالحاضنة',
      deadline: '15 أغسطس 2026',
      icon: Rocket,
      badgeColor: 'bg-orange-50 text-orange-600 border-orange-100',
      badge: 'مفتوح للتقديم',
      criteria: [
        'وجود نموذج أولي (Prototype) أو تصور تقني قابل للتحقيق.',
        'أن يتكون الفريق من شخصين على الأقل إلى 5 أشخاص كحد أقصى.',
        'التعهد بحضور معسكر العرض الاستثماري التدريبي (3 أيام قبل الفعالية).',
        'تقديم عرض توضيحي (Pitch Deck) لا يتجاوز 10 شرائح.'
      ]
    },
    {
      id: 'entrepreneur',
      title: 'مسابقة أفضل رائد أعمال صاعد',
      subtitle: 'تكريم ودعم مؤسسي الشركات الناشئة من الطلاب والخريجين',
      description: 'جائزة سنوية مخصصة لرواد الأعمال الذين تمكنوا من إطلاق منتجاتهم في السوق وحققوا مبيعات أولية أو نموذج عمل مستدام.',
      prize: 'درع الريادة + رعاية للمشاركة ببرامج تسريع أعمال إقليمية',
      deadline: '20 أغسطس 2026',
      icon: Trophy,
      badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'مفتوح للتقديم',
      criteria: [
        'أن يكون المشروع مسجلاً كشركة ناشئة أو يمتلك نموذج عمل تجاري تم إطلاقه فعلياً.',
        'أن يكون مؤسس المشروع أو الشريك الرئيسي طالباً أو خريجاً بجامعة المنيا.',
        'توضيح قيمة الإيرادات أو أرقام التشغيل وقدرة المشروع على التوسع وسد احتياج السوق.',
        'تقديم عرض مصور قصير (فيديو 3 دقائق) للمشروع ومنتجاته.'
      ]
    },
    {
      id: 'student-project',
      title: 'مسابقة أفضل مشروع تخرج ابتكاري',
      subtitle: 'دعم مشروعات التخرج المتميزة التي تحل مشكلات صناعية حقيقية',
      description: 'تحدٍ مخصص لطلاب السنوات النهائية بالجامعة لتطوير حلول ابتكارية تطبيقية للمشكلات التكنولوجية والصناعية بالتعاون مع المصانع والشركاء.',
      prize: 'تمويل تطوير النموذج الأولي بقيمة 30,000 ج.م + تشبيك مهني',
      deadline: '1 سبتمبر 2026',
      icon: Award,
      badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: 'قريباً',
      criteria: [
        'أن يكون المشروع مسجلاً كمشروع تخرج رسمي للعام الحالي.',
        'تقديم خطاب تزكية من المشرف الأكاديمي على المشروع بالجامعة.',
        'أن يعالج المشروع إحدى مشكلات الاستدامة، الزراعة الذكية، أو التحول الرقمي.',
        'تقديم تقرير فني يوضح المشكلة والحل المقترح بالتفصيل.'
      ]
    }
  ];

  const currentCompDetails = competitions.find(c => c.id === selectedComp) || competitions[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('يجب قبول الشروط والأحكام لتقديم طلبك.');
      return;
    }
    setSubmissionSubmitted(true);
    setTimeout(() => {
      setSubmissionSubmitted(false);
      setFormData({
        teamName: '',
        projectTitle: '',
        competition: 'pitching',
        teamLeaderEmail: '',
        phone: '',
        pitchDeckUrl: '',
        summary: '',
        acceptTerms: false
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50 font-cairo text-slate-800" dir="rtl">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
            <Trophy className="w-8 h-8 text-orange-400" />
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black leading-tight">
            المسابقات والهاكاثونات الابتكارية
          </h1>
          
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-bold">
            نافس بأفكارك ومشروعاتك المبتكرة، واحصل على الدعم المالي، التوجيه المهني، والاحتضان المباشر لتحويل أفكارك الإبداعية إلى مشاريع ريادية ناجحة بالأسواق.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => document.getElementById('explore-competitions')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black text-xs sm:text-sm cursor-pointer shadow-lg shadow-orange-500/20"
            >
              استكشف المسابقات المفتوحة
            </button>
            <button 
              onClick={() => document.getElementById('submit-proposal')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-xl font-black text-xs sm:text-sm cursor-pointer"
            >
              تقديم عرض / فكرة
            </button>
          </div>
        </div>
      </section>

      <div id="explore-competitions" className="max-w-7xl mx-auto px-4 py-20 space-y-16">
        
        {/* 2. Interactive Competitions Picker Block */}
        <section className="space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">اختر المسابقة وتعرف على شروطها</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">تضم منصة جامعة المنيا مسابقات متخصصة تناسب تطلعات الطلاب والخريجين والشركات الصاعدة.</p>
          </div>

          {/* Selector Tabs (Matches styling of screenshot picker) */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {competitions.map((comp) => {
              const CompIcon = comp.icon;
              const isSelected = selectedComp === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComp(comp.id)}
                  className={`flex-1 p-6 rounded-3xl border text-right transition-all flex items-start gap-4 cursor-pointer hover:shadow-lg ${
                    isSelected 
                      ? 'bg-white border-orange-500 shadow-xl shadow-orange-500/5 ring-2 ring-orange-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <CompIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900">{comp.title}</h3>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1 line-clamp-1">{comp.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Competition Display Card */}
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: General Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-black shrink-0 border-slate-200 bg-slate-50 text-slate-600">
                <Clock className="w-3.5 h-3.5" />
                <span>الموعد النهائي: {currentCompDetails.deadline}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{currentCompDetails.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">{currentCompDetails.description}</p>
              </div>

              {/* Prize Details Card */}
              <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-orange-500 block">قيمة الجائزة والدعم</span>
                  <span className="text-xs sm:text-sm font-black text-slate-800">{currentCompDetails.prize}</span>
                </div>
              </div>
            </div>

            {/* Right: Terms & Conditions Checklist */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
              <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                <span>شروط وأحكام التقديم</span>
              </h4>
              <ul className="space-y-3.5 text-xs font-bold text-slate-600">
                {currentCompDetails.criteria.map((cri, index) => (
                  <li key={index} className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{cri}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </section>

        {/* 3. Steps and Judges Timeline (التحكيم وإعلان النتائج) */}
        <section className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">مراحل التقييم والتحكيم</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">نسير بخطوات علمية وعادلة لتقييم واختيار أفضل العروض والمشاريع بالملتقى.</p>
          </div>

          {/* Timeline Steps Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {[
              { step: '1', title: 'رفع العروض والملفات', desc: 'تقديم البيانات المطلوبة والـ Pitch Deck الخاص بمشروعك عبر نموذج التقديم بالأسفل.' },
              { step: '2', title: 'التصفية والمراجعة', desc: 'مراجعة المنسقين للتأكد من استيفاء الشروط التقنية ومطابقة معايير المسابقة.' },
              { step: '3', title: 'المعسكر التدريبي المسرع', desc: 'حضور معسكر مخصص للتدرب على الإلقاء وعرض نماذج الأعمال باحترافية.' },
              { step: '4', title: 'يوم العروض (Pitching Day)', desc: 'عرض فكرتك أمام لجان تحكيم وطنية ومستثمرين في جلسات عرض مخصصة.' },
              { step: '5', title: 'التحكيم والنتائج', desc: 'إعلان النتائج وتكريم الفائزين بالدعم المالي المباشر وبدء برامج الاحتضان.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 text-right space-y-4 relative flex flex-col justify-between hover:border-orange-500 transition-colors">
                <div>
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 mt-4">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mt-2">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>

        </section>

        {/* 4. Proposal Submission Form (رفع العروض والملفات) */}
        <section id="submit-proposal" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-slate-200 text-right space-y-8">
            
            <div className="text-center max-w-2xl mx-auto">
              <UploadCloud className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">رفع العروض والمشاركة بالمسابقة</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-bold">
                أدخل تفاصيل فريقك وارفع عرضك التقديمي للمنافسة والحصول على الدعم الفني المالي والاستثماري.
              </p>
            </div>

            {submissionSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-2 animate-pulse">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-1" />
                <h4 className="text-lg font-black text-emerald-800">تم تقديم فكرتك ومشروعك بنجاح!</h4>
                <p className="text-xs text-emerald-600 font-bold">سيتواصل معك منسق لجان التحكيم فور فحص الملفات المرفوعة.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">اسم الفريق / الشركة الناشئة</label>
                    <input 
                      type="text" 
                      required
                      value={formData.teamName}
                      onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                      placeholder="اكتب اسم فريقك..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">عنوان الفكرة أو المشروع</label>
                    <input 
                      type="text" 
                      required
                      value={formData.projectTitle}
                      onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                      placeholder="عنوان فكرة المشروع الابتكاري..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">اختر المسابقة التي تود المنافسة بها</label>
                    <select
                      value={formData.competition}
                      onChange={(e) => setFormData({...formData, competition: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    >
                      <option value="pitching">يوم العروض المبتكرة (Pitching Day)</option>
                      <option value="entrepreneur">أفضل رائد أعمال صاعد</option>
                      <option value="student-project">أفضل مشروع تخرج ابتكاري</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">البريد الإلكتروني لممثل الفريق</label>
                    <input 
                      type="email" 
                      required
                      value={formData.teamLeaderEmail}
                      onChange={(e) => setFormData({...formData, teamLeaderEmail: e.target.value})}
                      placeholder="example@minia.edu.eg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">رقم الهاتف (الواتس آب)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="01xxxxxxxxx"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-500 block">رابط عرض المشروع (Pitch Deck / Drive / PDF)</label>
                    <input 
                      type="url" 
                      required
                      value={formData.pitchDeckUrl}
                      onChange={(e) => setFormData({...formData, pitchDeckUrl: e.target.value})}
                      placeholder="أدخل رابط عرض الفكرة أو الملف التوضيحي..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 block">ملخص موجز للمشروع أو الابتكار والحل المقترح</label>
                  <textarea 
                    rows="4"
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    placeholder="اكتب بإيجاز المشكلة التي يعالجها المشروع وكيف يسهم ابتكاركم في حلها فنيّاً واقتصاديّاً..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms-check"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 border-slate-300"
                  />
                  <label htmlFor="terms-check" className="text-xs font-bold text-slate-500 cursor-pointer">
                    أتعهد بأن جميع البيانات المذكورة صحيحة وبأن المشروع يلتزم بشروط وأحكام المشاركة بالمسابقة.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-slate-900/20"
                >
                  <Send className="w-4 h-4" />
                  رفع العرض والملف التوضيحي للتحكيم
                </button>
              </form>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};

export default CompetitionsPage;
