import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Handshake, ShieldCheck, FileCheck, CheckCircle2, 
  HelpCircle, Scale, Building, TrendingUp, Users, 
  Calendar, Clock, UserCheck, Send, CheckCircle
} from 'lucide-react';

const InvestmentIPPage = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. Startup Readiness Desk States
  const [readinessItems, setReadinessItems] = useState([
    { id: 1, label: isRtl ? 'وجود نموذج أولي جاهز للعمل (MVP)' : 'Working Prototype (MVP) available', score: 20, checked: false },
    { id: 2, label: isRtl ? 'تحديد حجم السوق المستهدف بدقة (TAM/SAM)' : 'Target Market Size (TAM/SAM) defined', score: 15, checked: false },
    { id: 3, label: isRtl ? 'دراسة منافسين وتحليل نقاط القوة والضعف' : 'Competitor analysis completed', score: 10, checked: false },
    { id: 4, label: isRtl ? 'وجود فريق مؤسس متكامل (تقني وإداري)' : 'Co-founding team assembled (tech & business)', score: 15, checked: false },
    { id: 5, label: isRtl ? 'تسجيل الشركة قانونياً أو وجود خطة واضحة للتأسيس' : 'Legal entity registered or planned', score: 10, checked: false },
    { id: 6, label: isRtl ? 'دراسة مالية وتوقعات نمو لـ 3 سنوات القادمة' : '3-year financial forecast prepared', score: 15, checked: false },
    { id: 7, label: isRtl ? 'حماية الملكية الفكرية أو إيداع براءة اختراع' : 'IP protected or patent filed', score: 15, checked: false },
  ]);

  const toggleReadinessItem = (id) => {
    setReadinessItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const calculateReadinessScore = () => {
    return readinessItems.reduce((acc, item) => acc + (item.checked ? item.score : 0), 0);
  };

  const getReadinessFeedback = (score) => {
    if (score >= 80) {
      return {
        title: isRtl ? 'جاهز للاستثمار بالكامل 🚀' : 'Fully Investment Ready 🚀',
        desc: isRtl 
          ? 'مشروعك يمتلك مقومات قوية جداً. يمكنك البدء في التواصل مع الصناديق والمستثمرين وعرض مشروعك في منصة التوفيق الخاصة بنا.'
          : 'Your project has strong fundamentals. You can start connecting with VCs/Angels and display your pitch deck.',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
      };
    } else if (score >= 50) {
      return {
        title: isRtl ? 'جاهزية متوسطة - تحتاج لبعض التطوير 📈' : 'Moderate Readiness 📈',
        desc: isRtl
          ? 'أنت في الطريق الصحيح ولكن بحاجة لاستكمال بعض الجوانب مثل الدراسة المالية أو توثيق الملكية الفكرية. ننصح بحجز جلسة استشارة بعيادة المؤسسين.'
          : 'You are on the right track but need to complete some aspects like financials or IP protection. We advise booking a clinic session.',
        color: 'text-amber-600 bg-amber-50 border-amber-200'
      };
    } else {
      return {
        title: isRtl ? 'مرحلة الأفكار الأولية 💡' : 'Early Stage Idea 💡',
        desc: isRtl
          ? 'يركز مشروعك حالياً على الفكرة الأساسية. ننصح بالانضمام أولاً لمعسكرات التدريب وتطوير النموذج الأولي قبل البدء في البحث عن تمويل.'
          : 'Your project is in the ideation phase. Join training bootcamps and develop your MVP before seeking investment.',
        color: 'text-blue-600 bg-blue-50 border-blue-200'
      };
    }
  };

  const score = calculateReadinessScore();
  const feedback = getReadinessFeedback(score);

  // 2. Forms states and success handlers
  const [matchmakingForm, setMatchmakingForm] = useState({
    startupName: '',
    industry: '',
    stage: 'pre-seed',
    fundingTarget: '',
    pitchDeckUrl: '',
    agree: false
  });
  const [matchmakingSubmitted, setMatchmakingSubmitted] = useState(false);

  const [ipForm, setIpForm] = useState({
    inventorName: '',
    innovationTitle: '',
    ipType: 'patent',
    description: '',
    hasPriorArt: 'no',
    agree: false
  });
  const [ipSubmitted, setIpSubmitted] = useState(false);

  const handleMatchmakingSubmit = (e) => {
    e.preventDefault();
    setMatchmakingSubmitted(true);
    setTimeout(() => {
      setMatchmakingSubmitted(false);
      setMatchmakingForm({ startupName: '', industry: '', stage: 'pre-seed', fundingTarget: '', pitchDeckUrl: '', agree: false });
    }, 5000);
  };

  const handleIpSubmit = (e) => {
    e.preventDefault();
    setIpSubmitted(true);
    setTimeout(() => {
      setIpSubmitted(false);
      setIpForm({ inventorName: '', innovationTitle: '', ipType: 'patent', description: '', hasPriorArt: 'no', agree: false });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-cairo text-slate-900 pb-16 pt-24 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative Blur Blobs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#ea580c]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden mb-12">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-6 border border-blue-100 shadow-sm">
              <Handshake className="w-4 h-4" />
              <span>{isRtl ? 'بوابة الدعم الاستثماري وحماية الملكية الفكرية' : 'Investment & IP Gateway'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 mb-6 leading-normal">
              {isRtl ? 'الاستثمار والملكية الفكرية' : 'Investment & Intellectual Property'}
            </h1>
            <p className="text-lg md:text-xl font-bold text-slate-600 leading-relaxed">
              {isRtl 
                ? 'منظومة تفاعلية متكاملة لربط رواد الأعمال والمبتكرين بالمستثمرين، وتقديم خدمات تقييم الجاهزية وحماية الأصول الفكرية وبراءات الاختراع بالجامعة.'
                : 'Integrated system to connect startups with investors, assess funding readiness, and protect intellectual property/patents.'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Startup Readiness Desk */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>{isRtl ? 'مكتب تقييم جاهزية الشركات للاستثمار' : 'Startup Readiness Desk'}</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                {isRtl ? 'احسب مدى جاهزية مشروعك للاستثمار 📊' : 'Calculate Your Investment Readiness 📊'}
              </h2>
              <p className="text-slate-600 font-bold leading-loose mb-8">
                {isRtl 
                  ? 'اختر المقومات الحالية المتوفرة في مشروعك وسيقوم النظام الذكي بتقييم مدى جاهزيتك لمقابلة المستثمرين وصناديق التمويل، مع إعطائك نصائح توجيهية فورية للتطوير.'
                  : 'Toggle the elements currently available in your startup to calculate your mock readiness score and get tailored business advice.'}
              </p>

              {/* Calculator Checklist */}
              <div className="space-y-4">
                {readinessItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleReadinessItem(item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-right font-bold transition-all duration-300 ${
                      item.checked 
                        ? 'border-blue-500 bg-blue-50/30 text-slate-900 shadow-sm' 
                        : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${item.checked ? 'text-blue-600' : 'text-slate-200'}`} />
                      <span className="text-sm sm:text-base leading-relaxed">{item.label}</span>
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${item.checked ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      +{item.score}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Score Card & Feedback */}
            <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-slate-200"><HelpCircle className="w-20 h-20 opacity-20" /></div>
              
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">
                {isRtl ? 'مؤشر جاهزية الاستثمار الحالي' : 'Current Readiness Score'}
              </span>

              {/* Circular Gauge Representation */}
              <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="88" cy="88" r="74" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                  <circle 
                    cx="88" 
                    cy="88" 
                    r="74" 
                    stroke={score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#3b82f6'} 
                    strokeWidth="12" 
                    fill="transparent" 
                    strokeDasharray={464} 
                    strokeDashoffset={464 - (464 * score) / 100}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl font-black text-slate-800">{score}%</span>
                  <span className="text-xs text-slate-400 font-bold mt-1">{isRtl ? 'مكتمل' : 'Completed'}</span>
                </div>
              </div>

              {/* Dynamic Feedback Card */}
              <div className={`w-full p-6 rounded-2xl border text-right transition-all duration-500 ${feedback.color}`}>
                <h4 className="font-black text-lg mb-2 text-center">{feedback.title}</h4>
                <p className="text-sm font-bold leading-loose text-center md:text-right">{feedback.desc}</p>
              </div>

              {score >= 80 && (
                <a 
                  href="#matchmaking-portal" 
                  className="mt-8 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-sm shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 block w-full text-center"
                >
                  {isRtl ? 'تقديم ملف مشروعك للمستثمرين الآن' : 'Apply for Matchmaking Now'}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 2. Founder Services Pavilion */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{isRtl ? 'جناح خدمات المؤسسين 🏢' : 'Founder Services Pavilion 🏢'}</h2>
            <p className="text-slate-600 font-bold max-w-2xl mx-auto">{isRtl ? 'مجموعة متكاملة من الخدمات الفنية لتهيئة وتنمية الشركات الناشئة وجعلها قادرة على المنافسة والنمو.' : 'A full suite of support services to design, build, and prepare your startup for commercial success.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: isRtl ? 'الاحتضان والتدريب المكثف' : 'Incubation & Bootcamps',
                desc: isRtl ? 'برامج متخصصة لتطوير الفكرة وبناء نموذج العمل وإعداد خطة النمو.' : 'Structured programs to develop ideas, build business models, and plan expansion.',
                icon: Building,
                color: 'blue'
              },
              {
                title: isRtl ? 'إعداد ملفات العروض الفنية' : 'Pitch Deck Review',
                desc: isRtl ? 'مراجعة وتصميم عروض الشركات لتقديمها أمام لجان الاستثمار وصناديق التمويل.' : 'Guidance on designing and editing professional pitches for angel and VC rounds.',
                icon: FileCheck,
                color: 'amber'
              },
              {
                title: isRtl ? 'تأسيس الشركات قانونياً' : 'Legal Formulation',
                desc: isRtl ? 'تسهيل كافة إجراءات تسجيل وتأسيس الشركات والمستندات القانونية للمؤسسين.' : 'Assisting co-founders in company registration, articles, and legal documents.',
                icon: Scale,
                color: 'indigo'
              },
              {
                title: isRtl ? 'جلسات التشبيك والمقابلة' : 'Investor Connection',
                desc: isRtl ? 'تنظيم لقاءات دورية مباشرة مع المستثمرين والممولين لبحث شراكات تجارية.' : 'Organizing regular networking events to match startups with potential investors.',
                icon: Users,
                color: 'emerald'
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-slate-50 text-slate-800`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Investor Matchmaking Portal */}
        <section id="matchmaking-portal" className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-4">
                <Handshake className="w-4 h-4" />
                <span>{isRtl ? 'توفيق الشركات والمستثمرين' : 'Investor Matchmaking'}</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                {isRtl ? 'سجل بيانات شركتك لمقابلة المستثمرين 💼' : 'Register Your Startup for Funding 💼'}
              </h2>
              <p className="text-slate-600 font-bold leading-loose mb-8">
                {isRtl 
                  ? 'إذا كان مشروعك ابتكارياً ولديك نموذج أولي وتتطلع للحصول على تمويل لتوسيع أعمالك، أرسل بيانات مشروعك ورابط ملفك التعريفي ليتم مراجعته وتنسيق اجتماعات ثنائية لك مع مستثمري القمة.'
                  : 'If you have an innovative prototype and look forward to raising funds, submit your startup profile to schedule meeting slots with summit investors.'}
              </p>

              {/* Mock Investor Logos Banner */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 text-center">
                  {isRtl ? 'صناديق الاستثمار والمستثمرون المشاركون' : 'Participating VCs & Angel Networks'}
                </h4>
                <div className="grid grid-cols-3 gap-4 items-center justify-items-center opacity-60">
                  <span className="font-black text-sm text-slate-700">Minia VCs</span>
                  <span className="font-black text-sm text-slate-700">Namaa Invest</span>
                  <span className="font-black text-sm text-slate-700">UpperEgypt Angel</span>
                </div>
              </div>
            </div>

            {/* Matchmaking Submission Form */}
            <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 border border-slate-100">
              {matchmakingSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-6" />
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{isRtl ? 'تم إرسال الطلب بنجاح!' : 'Application Submitted!'}</h3>
                  <p className="text-slate-600 font-bold leading-relaxed max-w-md">
                    {isRtl 
                      ? 'لقد تم تسجيل ملف مشروعك بنجاح في منصة التوفيق الاستثماري. سيقوم فريق المراجعة بالتواصل معك قريباً لطلب ملف العروض المفصل.'
                      : 'Your application has been received. Our team will contact you shortly to review your detailed pitch deck.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMatchmakingSubmit} className="space-y-5">
                  <h3 className="text-xl font-black text-slate-950 mb-4 pb-2 border-b border-slate-200">
                    {isRtl ? 'نموذج طلب التوفيق الاستثماري' : 'Matchmaking Form'}
                  </h3>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'اسم الشركة / المشروع *' : 'Startup Name *'}</label>
                    <input 
                      type="text" 
                      required 
                      value={matchmakingForm.startupName} 
                      onChange={e => setMatchmakingForm({...matchmakingForm, startupName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold" 
                      placeholder={isRtl ? 'مثال: شركة نما للحلول البيئية' : 'e.g. Namaa Eco Solutions'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'مجال العمل *' : 'Industry *'}</label>
                      <input 
                        type="text" 
                        required 
                        value={matchmakingForm.industry} 
                        onChange={e => setMatchmakingForm({...matchmakingForm, industry: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold" 
                        placeholder={isRtl ? 'مثال: الذكاء الاصطناعي، الزراعة' : 'e.g. AI, Agriculture'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'المرحلة الحالية *' : 'Current Stage *'}</label>
                      <select 
                        value={matchmakingForm.stage} 
                        onChange={e => setMatchmakingForm({...matchmakingForm, stage: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                      >
                        <option value="pre-seed">{isRtl ? 'فكرة / نموذج أولي (Pre-Seed)' : 'Idea / Prototype (Pre-Seed)'}</option>
                        <option value="seed">{isRtl ? 'إطلاق تجريبي (Seed)' : 'Early Launch (Seed)'}</option>
                        <option value="growth">{isRtl ? 'نمو وتوسع (Growth)' : 'Expansion (Growth)'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'التمويل المطلوب (بالجنيه المصري) *' : 'Funding Target (EGP) *'}</label>
                    <input 
                      type="number" 
                      required 
                      value={matchmakingForm.fundingTarget} 
                      onChange={e => setMatchmakingForm({...matchmakingForm, fundingTarget: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold" 
                      placeholder={isRtl ? 'مثال: 500,000' : 'e.g. 500,000'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{isRtl ? 'رابط ملف العروض التقديمي (Pitch Deck Link)' : 'Pitch Deck Google Drive/PDF Link'}</label>
                    <input 
                      type="url" 
                      value={matchmakingForm.pitchDeckUrl} 
                      onChange={e => setMatchmakingForm({...matchmakingForm, pitchDeckUrl: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold" 
                      placeholder="https://drive.google.com/..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      required 
                      id="matchmake-agree"
                      checked={matchmakingForm.agree} 
                      onChange={e => setMatchmakingForm({...matchmakingForm, agree: e.target.checked})}
                      className="mt-1"
                    />
                    <label htmlFor="matchmake-agree" className="text-xs font-bold text-slate-500 leading-relaxed cursor-pointer">
                      {isRtl 
                        ? 'أتعهد بجدية المشروع ودقة البيانات المالية المرفقة مع الالتزام التام بسرية التفاصيل.'
                        : 'I confirm the accuracy of all financials and agree to terms of business matchmaking.'}
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-base shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isRtl ? 'إرسال طلب التوفيق الاستثماري' : 'Submit Pitch Profile'}</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 4. Intellectual Property Clinic */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* IP Info Block */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 font-bold text-xs mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>{isRtl ? 'عيادة الملكية الفكرية (IP Clinic)' : 'Intellectual Property Clinic'}</span>
              </div>
              <h2 className="text-3xl font-black mb-6">
                {isRtl ? 'احمِ براءات اختراعك وابتكاراتك 🔒' : 'Protect Your Patents & Trademarks 🔒'}
              </h2>
              <p className="text-slate-300 font-bold leading-loose mb-8">
                {isRtl 
                  ? 'يقدم مكتب براءات الاختراع ونقل التكنولوجيا بالجامعة دعماً قانونياً وفنياً متكاملاً لأعضاء هيئة التدريس والطلاب لتوثيق ابتكاراتهم وحماية حقوق الملكية الفكرية في شتى المجالات العلمية.'
                  : 'Minia University Patent Office provides full legal & technical drafting assistance to register and secure inventions and trademarks globally.'}
              </p>

              {/* IP Pillars */}
              <div className="space-y-6">
                {[
                  { title: isRtl ? 'براءات الاختراع (Patents)' : 'Patent Protection', desc: isRtl ? 'حماية الاختراعات والابتكارات التكنولوجية وصياغة طلبات الإيداع بمكتب براءات الاختراع المصري.' : 'Securing technological inventions and drafting filings for Egypt patent office.' },
                  { title: isRtl ? 'العلامات التجارية وحقوق التأليف' : 'Trademarks & Copyrights', desc: isRtl ? 'تسجيل أسماء المشاريع واللوجو الفني، وحماية المصنفات البرمجية والأدبية.' : 'Registering brand names, logos, and protecting software source codes legally.' },
                ].map((ipPillar, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/15 text-yellow-500 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-yellow-500 mb-1">{ipPillar.title}</h4>
                      <p className="text-slate-400 text-sm font-bold leading-relaxed">{ipPillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IP Consultation Request Form */}
            <div className="bg-slate-800/80 rounded-[2rem] p-6 md:p-8 border border-slate-700 backdrop-blur-md">
              {ipSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <CheckCircle className="w-16 h-16 text-yellow-500 mb-6" />
                  <h3 className="text-2xl font-black text-white mb-2">{isRtl ? 'تم إرسال طلب براءة الاختراع!' : 'IP Case Registered!'}</h3>
                  <p className="text-slate-300 font-bold leading-relaxed max-w-md">
                    {isRtl 
                      ? 'تم تسجيل طلب حماية الملكية الفكرية. سيقوم خبير مكتب التكنولوجيا بالجامعة بالتواصل معك لتحديد موعد لمراجعة المستندات والأوراق الفنية.'
                      : 'Your IP case file has been saved. Our expert advisors will reach out to schedule an advisory consultation.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleIpSubmit} className="space-y-5 text-slate-200">
                  <h3 className="text-xl font-black text-white mb-4 pb-2 border-b border-slate-700">
                    {isRtl ? 'نموذج طلب عيادة الملكية الفكرية' : 'IP Consulting Request'}
                  </h3>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">{isRtl ? 'اسم المبتكر / الباحث الرئيسي *' : 'Lead Inventor Name *'}</label>
                    <input 
                      type="text" 
                      required 
                      value={ipForm.inventorName} 
                      onChange={e => setIpForm({...ipForm, inventorName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-slate-900 text-white font-bold" 
                      placeholder={isRtl ? 'مثال: أ.د. أحمد عبد الرحمن' : 'e.g. Dr. Ahmed Abdelrahman'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">{isRtl ? 'عنوان الابتكار / الاختراع *' : 'Innovation Title *'}</label>
                      <input 
                        type="text" 
                        required 
                        value={ipForm.innovationTitle} 
                        onChange={e => setIpForm({...ipForm, innovationTitle: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-slate-900 text-white font-bold" 
                        placeholder={isRtl ? 'مثال: فلتر ذكي لتنقية المياه' : 'e.g. Smart Water Filter'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">{isRtl ? 'نوع الحماية المطلوبة *' : 'IP Protection Type *'}</label>
                      <select 
                        value={ipForm.ipType} 
                        onChange={e => setIpForm({...ipForm, ipType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-slate-900 text-white font-bold"
                      >
                        <option value="patent">{isRtl ? 'براءة اختراع (Patent)' : 'Patent'}</option>
                        <option value="trademark">{isRtl ? 'علامة تجارية (Trademark)' : 'Trademark'}</option>
                        <option value="copyright">{isRtl ? 'حقوق مؤلف / برمجيات (Copyright)' : 'Copyright / Software'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">{isRtl ? 'ملخص فكرة الابتكار وآلية عملها *' : 'Brief Description *'}</label>
                    <textarea 
                      required 
                      rows="3"
                      value={ipForm.description} 
                      onChange={e => setIpForm({...ipForm, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-slate-900 text-white font-bold" 
                      placeholder={isRtl ? 'اشرح بالتفصيل المشكلة التي يحلها اختراعك ومبدأ عمله الفني...' : 'Describe the problem solved by your invention and how it functions...'}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      required 
                      id="ip-agree"
                      checked={ipForm.agree} 
                      onChange={e => setIpForm({...ipForm, agree: e.target.checked})}
                      className="mt-1 text-yellow-500"
                    />
                    <label htmlFor="ip-agree" className="text-xs font-bold text-slate-400 leading-relaxed cursor-pointer">
                      {isRtl 
                        ? 'أقر بأن فكرة الاختراع سرية ولم يتم نشرها أو عرضها علانية من قبل في أية أوراق بحثية أو فعاليات.'
                        : 'I declare that this invention is confidential and has not been publicly presented before.'}
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-950 rounded-xl font-black text-base shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isRtl ? 'تقديم طلب مراجعة براءة الاختراع' : 'File IP Consultation'}</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InvestmentIPPage;
