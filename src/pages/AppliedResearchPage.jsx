import React, { useEffect } from 'react';
import { 
  FileText, ShieldCheck, CheckCircle2, ArrowLeft, Check, 
  Settings, Users, Briefcase, Banknote, Search, HeartPulse, Cpu,
  Factory, Shield, Lock, Eye, MonitorSmartphone, GraduationCap,
  BarChart
} from 'lucide-react';

const InfoBox = ({ number, title, colorHex, children, className = '' }) => (
  <div className={`border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col h-full ${className}`} style={{ borderColor: colorHex }}>
    <div className={`text-white px-4 py-2 flex items-center justify-between shrink-0`} style={{ backgroundColor: colorHex }}>
      <span className="font-bold text-lg">{title}</span>
      <span className="bg-white px-2 py-0.5 rounded text-base font-black shadow-sm" style={{ color: colorHex }}>{number}</span>
    </div>
    <div className="p-4 flex-1 flex flex-col bg-slate-50/30">
      {children}
    </div>
  </div>
);

const AppliedResearchPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8fafc]" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Import Cairo Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
          .font-cairo { font-family: 'Cairo', sans-serif; }
          .font-black { font-weight: 900; }
          .font-bold { font-weight: 700; }
        `}
      </style>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        
        {/* Header section (Spans full width) */}
        <div className="text-center mb-10 w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#183059] mb-4">منصة تسويق البحوث التطبيقية</h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#2b6cb0] mb-8">من البحث إلى فرصة سوقية قابلة للتطبيق</h2>
          
          <a href="/submit-research" className="inline-flex items-center gap-3 bg-[#ea580c] text-white px-8 py-4 rounded-2xl font-black text-lg md:text-xl shadow-lg hover:bg-[#c2410c] hover:-translate-y-1 transition-all mb-12">
            <FileText className="w-6 h-6" />
            تقديم البحث التطبيقي
          </a>

          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-sm md:text-base font-bold text-[#183059] bg-white py-3 px-6 rounded-2xl shadow-sm border border-slate-200 inline-flex mx-auto">
            <span>بحث تطبيقي</span> <ArrowLeft className="w-4 h-4 text-[#2b6cb0]" />
            <span>تقييم الجاهزية</span> <ArrowLeft className="w-4 h-4 text-[#2b6cb0]" />
            <span>حماية فكرية</span> <ArrowLeft className="w-4 h-4 text-[#2b6cb0]" />
            <span>عرض تسويقي</span> <ArrowLeft className="w-4 h-4 text-[#2b6cb0]" />
            <span className="text-[#dd6b20]">شريك أو تمويل أو تعاقد</span>
          </div>
        </div>

        {/* 5 Top Boxes */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 w-full">
          {[
            { t: 'باحثون\nومبتكرون', i: Users },
            { t: 'بحوث\nتطبيقية', i: FileText },
            { t: 'شركاء\nوصناعة', i: Factory },
            { t: 'استثمار\nوتمويل', i: Banknote },
            { t: 'أثر اقتصادي\nومجتمعي', i: HeartPulse }
          ].map((b, idx) => (
            <div key={idx} className="bg-[#183059] text-white w-32 h-28 rounded-2xl flex flex-col items-center justify-center text-center text-sm font-bold shadow-md border border-blue-800">
              <b.i className="w-8 h-8 mb-2 text-blue-200" />
              <span className="whitespace-pre-line leading-tight">{b.t}</span>
            </div>
          ))}
        </div>

        {/* 3 Column Layout */}
        <div className="flex flex-col xl:flex-row gap-6 relative items-start">
          
          {/* Right Column (RTL) - Boxes 1, 2, 3 */}
          <div className="w-full xl:w-1/4 flex flex-col gap-6">
            <InfoBox number="01" title="قدم بحثك" colorHex="#183059">
              <div className="text-center text-sm font-bold text-[#183059] mb-3 border-b border-[#183059]/20 pb-2">ما المطلوب من الباحث؟</div>
              <ul className="space-y-3 text-sm font-bold text-slate-700">
                {['بيانات الباحث الرئيسي', 'بيانات فريق البحث', 'عنوان البحث (عربي / إنجليزي)', 'ملخص علمي مختصر', 'ملخص تسويقي مبسط', 'القطاع المستهدف', 'نوع المخرج البحثي', 'الملفات والمرفقات'].map(t => (
                  <li key={t} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#183059] shrink-0" /> 
                    <span className="leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
            </InfoBox>

            <InfoBox number="02" title="صنّف البحث" colorHex="#2b6cb0">
              <div className="text-center text-sm font-bold text-[#2b6cb0] mb-3 border-b border-[#2b6cb0]/20 pb-2">اختيارات التصنيف داخل المنصة</div>
              <div className="flex flex-col gap-4 text-xs font-bold text-slate-700">
                <div>
                  <div className="bg-[#e2e8f0] text-[#2b6cb0] text-center py-1.5 mb-2 rounded">القطاع المستهدف</div>
                  <ul className="space-y-2">
                    {['صحة وطب', 'زراعة ذكية', 'تصنيع غذائي', 'طاقة ومياه وبيئة', 'ذكاء اصطناعي، وتحول رقمي', 'تعليم وتكنولوجيا تعليم', 'سياحة وآثار', 'صناعات إبداعية', 'خدمات مجتمعية', 'هندسة وصناعة'].map(t => (
                      <li key={t} className="flex items-start gap-2 leading-tight">
                        <div className="w-1.5 h-1.5 mt-1 rounded-full bg-[#2b6cb0] shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="bg-[#e2e8f0] text-[#2b6cb0] text-center py-1.5 mb-2 rounded">نوع المخرج البحثي</div>
                  <ul className="space-y-2">
                    {['بحث منشور', 'رسالة علمية', 'مشروع تخرج', 'نموذج أولي', 'منتج قابل للتطوير', 'تطبيق أو منصة', 'خدمة استشارية', 'براءة اختراع'].map(t => (
                      <li key={t} className="flex items-start gap-2 leading-tight">
                        <div className="w-1.5 h-1.5 mt-1 rounded-full bg-[#2b6cb0] shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </InfoBox>

            <InfoBox number="03" title="حدد مستوى الجاهزية" colorHex="#2f855a">
              <div className="text-center text-sm font-bold text-[#2f855a] mb-3 border-b border-[#2f855a]/20 pb-2">ما مدى قرب البحث من التطبيق؟</div>
              <ul className="space-y-3 text-xs font-bold text-slate-700 flex-1">
                {['فكرة تحتاج تطوير', 'نتائج معملية أولية', 'نموذج أولي Prototype', 'تم اختباره داخل الجامعة', 'تم اختباره مع جهة خارجية', 'جاهز للتطبيق التجريبي', 'جاهز للتسويق أو التعاقد', 'يحتاج حماية ملكية فكرية أولاً'].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2f855a] shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </InfoBox>
          </div>

          {/* Center Column - Outputs & Boxes 4, 5 */}
          <div className="w-full xl:w-2/4 flex flex-col gap-6">
            
            {/* Outputs Box (Moved up since circle is deleted) */}
            <div className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-slate-200">
              <div className="bg-[#183059] text-white text-center py-3 text-lg font-black tracking-wide">
                المخرجات النهائية
              </div>
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm font-bold text-slate-800 text-center">
                {[
                  { t: 'Technology Offer Book', i: FileText, c: 'text-[#e7811d]' },
                  { t: 'معرض البحوث القابلة للتسويق', i: MonitorSmartphone, c: 'text-[#dd6b20]' },
                  { t: 'بحوث جاهزة للشركاء', i: CheckCircle2, c: 'text-[#dd6b20]' },
                  { t: 'بحوث مرشحة لشركة نماء', i: Briefcase, c: 'text-[#dd6b20]' },
                  { t: 'بحوث مرشحة للتمويل', i: Banknote, c: 'text-[#dd6b20]' },
                  { t: 'اجتماعات مع الشركاء', i: Users, c: 'text-[#dd6b20]' },
                  { t: 'تقرير أثر بعد القمة', i: BarChart, c: 'text-[#dd6b20]' }
                ].map((out, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-14 h-14 mb-3 bg-white rounded-2xl shadow border border-slate-100 flex items-center justify-center">
                      <out.i className={`w-7 h-7 ${out.c}`} />
                    </div>
                    <span className="leading-tight">{out.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <InfoBox number="04" title="راجع الملكية الفكرية" colorHex="#d69e2e">
                  <div className="text-center text-sm font-bold text-[#d69e2e] mb-3 border-b border-[#d69e2e]/20 pb-2">قبل العرض أو النشر</div>
                  <div className="flex flex-col items-center gap-4">
                    <ShieldCheck className="w-12 h-12 text-[#d69e2e]" />
                    <ul className="space-y-3 text-xs font-bold text-slate-700 w-full">
                      {['هل البحث منشور؟', 'هل توجد براءة اختراع؟', 'هل تم تقديم طلب براءة؟', 'هل يحتوي على أسرار فنية؟', 'هل يحتاج حماية قبل العرض؟', 'هل يمكن عرض ملخص غير سري؟'].map(t => (
                        <li key={t} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#d69e2e] shrink-0" /> 
                          <span className="leading-tight">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </InfoBox>
              </div>
              
              <div className="w-full md:w-2/3">
                <InfoBox number="05" title="ارفع الملفات المطلوبة" colorHex="#2b6cb0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    <div className="bg-[#e6f0fa] p-4 rounded-lg border border-[#2b6cb0]/20 flex flex-col">
                      <div className="text-center font-bold text-[#2b6cb0] text-sm mb-3 border-b border-[#2b6cb0]/20 pb-2">مرفقات إلزامية</div>
                      <ul className="space-y-3 text-xs font-bold text-slate-800 flex-1">
                        {['ملف البحث أو ملخصه PDF', 'ملخص تسويقي من صفحة واحدة', 'بيانات فريق البحث', 'صورة أو رسم توضيحي إن وجد'].map(t => (
                          <li key={t} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-[#2b6cb0] shrink-0" /> 
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col">
                      <div className="text-center font-bold text-slate-500 text-sm mb-3 border-b border-slate-100 pb-2">مرفقات اختيارية</div>
                      <ul className="space-y-3 text-xs font-bold text-slate-600 flex-1">
                        {['عرض تقديمي Pitch Deck', 'صور النموذج الأولي', 'فيديو قصير', 'رابط تطبيق أو منصة', 'نتائج اختبار أو تقرير تجربة', 'خطاب اهتمام من شركة', 'دراسة جدوى أولية'].map(t => (
                          <li key={t} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-slate-300 shrink-0" /> 
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </InfoBox>
              </div>
            </div>

            {/* Bottom Banners inside the center column */}
            <div className="flex flex-col gap-6 mt-2">
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm">
                 <div className="text-[#183059] font-black text-base border-b border-[#183059] px-4 pb-2 mb-4 inline-block mx-auto text-center">مخرجات هذا المسار</div>
                 <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-700 text-center">
                   <div className="flex flex-col items-center gap-2"><Lock className="w-5 h-5 text-slate-400"/> منع العرض</div>
                   <div className="flex flex-col items-center gap-2"><Settings className="w-5 h-5 text-[#d69e2e]"/> IP Fast Track</div>
                   <div className="flex flex-col items-center gap-2"><Shield className="w-5 h-5 text-[#2b6cb0]"/> عيادة الملكية</div>
                   <div className="flex flex-col items-center gap-2"><Eye className="w-5 h-5 text-slate-500"/> عرض جزئي</div>
                   <div className="flex flex-col items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#2f855a]"/> عرض مسموح</div>
                 </div>
              </div>
              
              <div className="bg-[#105a6b] rounded-xl overflow-hidden flex flex-col shadow-md">
                 <div className="bg-[#0c4755] text-white text-center py-2 font-black text-lg flex items-center justify-center gap-2">
                   <Eye className="w-5 h-5" /> ما الذي يظهر للشركاء؟
                 </div>
                 <div className="bg-white p-5 flex-1 text-center">
                   <div className="text-[#0c4755] font-black text-sm md:text-base mb-4 border-b pb-2 inline-block mx-auto">النسخة العامة غير السرية فقط</div>
                   <div className="flex flex-wrap justify-center gap-3 mb-5 text-xs font-bold text-slate-700">
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">نوع الشراكة</span>
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">حالة الملكية</span>
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">مستوى الجاهزية</span>
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">الحل المقترح</span>
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">المشكلة</span>
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">القطاع</span>
                     <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">عنوان البحث</span>
                   </div>
                   
                   <div className="bg-blue-50 text-[#183059] py-2 px-6 rounded-lg font-black border border-blue-200 inline-block mx-auto mb-3">
                     طلب اجتماع مع فريق البحث
                   </div>
                   <div className="text-xs font-bold text-red-600 bg-red-50 p-2 rounded flex items-center justify-center gap-2 max-w-xl mx-auto leading-relaxed">
                     <Lock className="w-4 h-4 shrink-0" />
                     لا يظهر البحث الكامل ولا التفاصيل الفنية السرية للعامة أو للشركات إلا بعد موافقة اللجنة المختصة.
                   </div>
                 </div>
              </div>
            </div>

          </div>

          {/* Left Column (RTL) - Boxes 8, 7, 6 */}
          <div className="w-full xl:w-1/4 flex flex-col gap-6">
            <InfoBox number="08" title="حالة الطلب داخل المنصة" colorHex="#2c7a7b">
              <div className="text-center text-sm font-bold text-[#2c7a7b] mb-3 border-b border-[#2c7a7b]/20 pb-2">يتابع الباحث بحثه عبر مراحل واضحة</div>
              <ul className="space-y-3.5 text-xs font-bold text-slate-700 relative before:absolute before:right-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#2c7a7b]/20 pr-1">
                {[
                  'تم استلام البحث', 'تحت الفحص الإداري', 'تحت التقييم الفني', 
                  'تحت مراجعة الملكية الفكرية', 'مقبول للعرض', 'Technology Offer Book', 
                  'مجدول للعرض أمام الشركاء', 'محال إلى جهة صناعية', 'تحت المتابعة'
                ].map((t, i) => (
                  <li key={t} className="flex items-center gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-[#2c7a7b] text-white flex items-center justify-center shrink-0 shadow-sm">{i+1}</div>
                    <span className="leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
            </InfoBox>

            <InfoBox number="07" title="تقييم اللجنة" colorHex="#dd6b20">
              <div className="text-center text-sm font-bold text-[#dd6b20] mb-3 border-b border-[#dd6b20]/20 pb-2">كيف يتم تقييم البحث؟</div>
              <ul className="space-y-3 text-xs font-bold text-slate-700">
                {[
                  {l:'وضوح المشكلة', s:15}, {l:'أصالة الحل', s:15}, {l:'قابلية التطبيق', s:15}, 
                  {l:'مستوى الجاهزية', s:15}, {l:'الأثر الاقتصادي أو المجتمعي', s:10}, 
                  {l:'إمكانية الحماية الفكرية', s:10}, {l:'وجود سوق أو شريك محتمل', s:10}, {l:'جودة الملف والعرض', s:10}
                ].map((t, i) => (
                  <li key={i} className="flex items-center justify-between bg-white px-2 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                    <span className="leading-tight">{t.l}</span>
                    <span className="w-6 h-6 rounded-full bg-[#dd6b20] text-white flex items-center justify-center font-black shadow-sm shrink-0">{t.s}</span>
                  </li>
                ))}
              </ul>
            </InfoBox>

            <InfoBox number="06" title="اختر نوع التعاون المطلوب" colorHex="#6b46c1">
              <div className="text-center text-sm font-bold text-[#6b46c1] mb-3 border-b border-[#6b46c1]/20 pb-2">ماذا يريد الباحث من القمة؟</div>
              <ul className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                {['ترخيص التكنولوجيا', 'تصنيع', 'تسويق', 'تعاقد بحثي', 'تأسيس شركة ناشئة', 'إدراج ضمن شركة نماء', 'عرض أمام مستثمرين', 'احتضان', 'Technology Offer Book'].map(t => (
                  <li key={t} className="flex items-start gap-2 leading-tight">
                    <CheckCircle2 className="w-4 h-4 text-[#6b46c1] shrink-0" /> 
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </InfoBox>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AppliedResearchPage;
