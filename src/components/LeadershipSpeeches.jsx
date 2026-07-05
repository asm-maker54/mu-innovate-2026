import React, { useState } from 'react';
import { Quote, User, Award, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LeadershipSpeeches = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [selectedSpeech, setSelectedSpeech] = useState(null);

  const speeches = {
    president: {
      name: isRtl ? 'الأستاذ الدكتور / عصام الدين صادق فرحات' : 'Prof. Dr. Essam El-Din Sadek Farahat',
      title: isRtl ? 'رئيس الجامعة' : 'President of Minia University',
      role: isRtl ? 'راعي الابتكار والإبداع' : 'Patron of Innovation & Creativity',
      image: '/dr-essam.jpg.jpeg',
      speech: isRtl ? (
        <>
          <p className="mb-4">بسم الله الرحمن الرحيم،</p>
          <p className="mb-4">أبنائي وبناتي الطلاب، زملائي الأعضاء بأسرة جامعة المنيا، وشركاء النجاح من مجتمع الأعمال والصناعة،</p>
          <p className="mb-4">إن جامعة المنيا، وهي تخطو بثبات نحو آفاق المستقبل، تضع نصب عينيها تمكين بيئة الابتكار وريادة الأعمال كركيزة أساسية لبناء مجتمع المعرفة تماشياً مع رؤية مصر 2030. إن عقول شبابنا وباحثينا هي القوة المحركة والوقود الحقيقي لعملية التنمية المستدامة، وواجبنا الأكاديمي والوطني يحتم علينا رعاية هذه الأفكار وتحويلها إلى قيمة اقتصادية ومجتمعية ملموسة.</p>
          <p className="mb-4">لقد جاء إطلاق منصة الابتكار الرقمية لجامعة المنيا لتكون همزة الوصل ونقطة التقاء العقول الشابة والمبتكرين بالجهات المستثمرة والصناعية، لتذليل كافة الصعاب وتوفير البيئة الحاضنة التي تنقل المشاريع والأبحاث من المختبرات والقاعات الدراسية إلى حيز الإنتاج والمنافسة في الأسواق. إننا نعدكم بدعم مستمر وتسهيل كافة الإجراءات لتبني الابتكار كشعار للمرحلة الحالية والقادمة.</p>
          <p className="mb-4">أتمنى لجميع المشاركين في قمة جامعة المنيا للابتكار وريادة الأعمال التوفيق والنجاح، وأحثكم على مواصلة العمل الدؤوب والمشاركة الفعالة لبناء غدٍ أفضل لوطننا العزيز.</p>
          <p>والسلام عليكم ورحمة الله وبركاته.</p>
        </>
      ) : (
        <>
          <p className="mb-4">In the name of Allah, the Most Gracious, the Most Merciful,</p>
          <p className="mb-4">My dear students, colleagues of Minia University family, and partners in success from the business and industry community,</p>
          <p className="mb-4">Minia University, stepping steadily towards the future, places the empowerment of innovation and entrepreneurship at the forefront of its strategic priorities, in line with Egypt Vision 2030. The minds of our youth and researchers are the driving force and the true fuel for sustainable development. Our academic and national duty compels us to nurture these ideas and transform them into tangible economic and societal value.</p>
          <p className="mb-4">The launch of the Minia University Digital Innovation Platform serves as a link and meeting point between young minds, innovators, and investing/industrial entities. It aims to overcome all obstacles and provide an incubator environment that moves projects and research from laboratories and classrooms into production and market competition. We promise you continuous support and the facilitation of all procedures to adopt innovation as the slogan of the current and future phase.</p>
          <p className="mb-4">I wish all participants in the Minia University Summit for Innovation and Entrepreneurship success and progress, and I urge you to continue hard work and active participation to build a better tomorrow for our beloved nation.</p>
          <p>Peace and blessings be upon you.</p>
        </>
      )
    },
    advisor: {
      name: isRtl ? 'الأستاذ الدكتور / إيمان زكي الشريف' : 'Prof. Dr. Eman Zaki El-Sherif',
      title: isRtl ? 'مستشار رئيس الجامعة لشئون الابتكار' : 'Advisor to the President for Innovation',
      role: isRtl ? 'رؤية مستقبلية وخطوات ثابتة' : 'Future Vision & Steady Steps',
      image: '/dr-eman.jpg.jpeg',
      speech: isRtl ? (
        <>
          <p className="mb-4">أهلاً بكم في فضاء الابتكار والإبداع بجامعة المنيا،</p>
          <p className="mb-4">إن التحول نحو الاقتصاد القائم على المعرفة يتطلب بناء شراكات حقيقية وتدريب مكثف وتطوير متواصل، وهو ما نسعى لتحقيقه بكل شغف وإخلاص في مكتب مستشار رئيس الجامعة لشئون الابتكار والريادة.</p>
          <p className="mb-4">إن هذه المنصة الرقمية لا تمثل مجرد موقع إلكتروني، بل هي منظومة حية متكاملة تهدف إلى تمكين المبتكرين ورواد الأعمال من الطلاب والخريجين والباحثين. نحن نعمل على ربطكم بشبكة من الخبراء والمدربين، وتسهيل سبل التواصل مع المستثمرين والصناديق التمويلية، بالإضافة إلى توجيهكم لحماية حقوق ملكيتكم الفكرية عبر عيادة الملكية الفكرية المخصصة.</p>
          <p className="mb-4">رسالتي إلى كل مبتكر في جامعتنا: لا تتردد في طرح فكرتك وتطويرها، فنحن هنا لنرافقك خطوة بخطوة، بدايةً من المعسكرات التدريبية وجلسات التوجيه، ووصولاً إلى تأسيس شركتك الناشئة وعرضها في منصات الاستثمار المحلية والدولية. إن نجاحكم هو الغاية الكبرى التي نعمل من أجلها.</p>
          <p>مع خالص تمنياتي لكم بمسيرة ريادية حافلة بالإنجازات.</p>
        </>
      ) : (
        <>
          <p className="mb-4">Welcome to the space of innovation and creativity at Minia University,</p>
          <p className="mb-4">The transition towards a knowledge-based economy requires building real partnerships, intensive training, and continuous development, which we strive to achieve with passion and sincerity in the Office of the President's Advisor for Innovation and Entrepreneurship.</p>
          <p className="mb-4">This digital platform is not just a website; it is an integrated, living ecosystem aimed at empowering innovators and entrepreneurs among students, alumni, and researchers. We work to connect you with a network of experts and mentors, facilitate communication with investors and funding funds, and guide you to protect your intellectual property rights through the dedicated IP Clinic.</p>
          <p className="mb-4">My message to every innovator in our university: do not hesitate to present and develop your idea. We are here to accompany you step by step, starting from training bootcamps and mentoring sessions, all the way to establishing your startup and showcasing it on local and international investment platforms. Your success is the ultimate goal we work for.</p>
          <p>With my best wishes for an entrepreneurial journey full of achievements.</p>
        </>
      )
    }
  };

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-[#f8fafc] to-white relative overflow-hidden font-cairo">
      {/* Custom Animations */}
      <style>{`
        @keyframes float-img {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-15px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Section Header */}
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 mb-2 pb-3 inline-block leading-normal">
            {isRtl ? 'كلمة القيادة الأكاديمية' : 'Leadership Speeches'}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto rounded-full" />
        </div>

        {/* President's Speech */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24 group">
          <div className="w-full lg:w-1/3 relative z-10" style={{ animation: 'float-img 4s ease-in-out infinite alternate' }}>
            <div className="aspect-[3/4] relative">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #2563eb',
                  boxShadow: '0 0 15px rgba(37,99,235,0.4), inset 0 0 15px rgba(37,99,235,0.2)',
                  animation: 'glow-pulse 3s ease-in-out infinite' 
                }} 
              />
              {/* Image Container */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <img src="/dr-essam.jpg.jpeg" alt="رئيس الجامعة" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Elegant dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl border border-blue-50 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 z-20">
              <Award className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 relative z-10" style={{ animation: 'float-img 5s ease-in-out infinite alternate-reverse' }}>
            <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg transition-all duration-500 group-hover:-translate-x-2 h-full flex flex-col justify-center">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #2563eb',
                  boxShadow: '0 0 15px rgba(37,99,235,0.4), inset 0 0 15px rgba(37,99,235,0.1)',
                  animation: 'glow-pulse 3s ease-in-out infinite' 
                }} 
              />
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 mb-4 leading-tight text-center">
                الأستاذ الدكتور / عصام الدين صادق فرحات
                <span className="text-blue-600 block mt-3 text-xl lg:text-2xl text-center">رئيس الجامعة</span>
              </h3>
              <h4 className="text-xl font-bold text-yellow-600 mb-8 flex items-center justify-center gap-2 text-center">
                <div className="w-8 h-1 bg-yellow-400 rounded-full" />
                راعي الابتكار والإبداع
                <div className="w-8 h-1 bg-yellow-400 rounded-full" />
              </h4>
              <p className="text-lg md:text-xl leading-loose text-slate-700 mb-8 relative z-10 text-center">
                "إن جامعة المنيا تضع الابتكار وريادة الأعمال في مقدمة أولوياتها الاستراتيجية، إيماناً منا بأن شبابنا هم الثروة الحقيقية القادرة على صناعة المستقبل. هذه المنصة هي جسر للتواصل بين العقول المبدعة وعالم الصناعة والأعمال، لننتقل معاً من مرحلة الأفكار إلى منتجات حقيقية تخدم مجتمعنا ووطننا."
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setSelectedSpeech('president')}
                  className="flex items-center justify-center gap-2 text-white bg-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all group/btn"
                >
                  <span>{isRtl ? 'اقرأ الكلمة كاملة' : 'Read Full Speech'}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5 transform transition-transform group-hover/btn:-translate-x-1.5" /> : <ArrowRight className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advisor's Speech */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 group">
          <div className="w-full lg:w-1/3 relative z-10" style={{ animation: 'float-img 4.5s ease-in-out infinite alternate-reverse' }}>
            <div className="aspect-[3/4] relative">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #eab308',
                  boxShadow: '0 0 15px rgba(234,179,8,0.4), inset 0 0 15px rgba(234,179,8,0.2)',
                  animation: 'glow-pulse 3.5s ease-in-out infinite' 
                }} 
              />
              {/* Image Container */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <img src="/dr-eman.jpg.jpeg" alt="مستشار رئيس الجامعة" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-6 -left-6 bg-white p-5 rounded-3xl shadow-xl border border-yellow-50 transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 z-20">
              <Quote className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 relative z-10" style={{ animation: 'float-img 5.5s ease-in-out infinite alternate' }}>
            <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-lg transition-all duration-500 group-hover:translate-x-2 h-full flex flex-col justify-center">
              {/* Glowing Border Overlay */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] z-20 pointer-events-none" 
                style={{ 
                  border: '2px solid #eab308',
                  boxShadow: '0 0 15px rgba(234,179,8,0.4), inset 0 0 15px rgba(234,179,8,0.1)',
                  animation: 'glow-pulse 3.5s ease-in-out infinite' 
                }} 
              />
              <Quote className="absolute top-8 right-8 w-20 h-20 text-yellow-50 -z-10" />
              <h3 className="text-2xl lg:text-3xl xl:text-[34px] font-black text-slate-900 mb-4 leading-tight text-center">
                الأستاذ الدكتور / إيمان زكي الشريف
                <span className="text-yellow-500 block mt-3 text-xl lg:text-2xl text-center">مستشار رئيس الجامعة لشئون الابتكار</span>
              </h3>

              <p className="text-lg md:text-xl leading-loose text-slate-700 mb-8 relative z-10 text-center">
                "نعمل جاهدين لتوفير بيئة داعمة تحتضن الأفكار المبتكرة وتحولها إلى واقع ملموس. منصة الابتكار هي خطوتنا الأهم لربط البحث العلمي والمشروعات التطبيقية بفرص حقيقية للتمويل والاحتضان. معاً نبني جيلاً من رواد الأعمال القادرين على قيادة قاطرة التنمية."
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setSelectedSpeech('advisor')}
                  className="flex items-center justify-center gap-2 text-white bg-yellow-500 px-6 py-3 rounded-full font-bold hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transition-all group/btn"
                >
                  <span>{isRtl ? 'اقرأ الكلمة كاملة' : 'Read Full Speech'}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5 transform transition-transform group-hover/btn:-translate-x-1.5" /> : <ArrowRight className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-1.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Popup Overlay */}
      {selectedSpeech && (() => {
        const data = speeches[selectedSpeech];
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-[modal-fade-in_0.3s_ease-out]">
            {/* Modal Card Container */}
            <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-8 md:p-10 border border-slate-100 shadow-2xl relative animate-[modal-scale-up_0.3s_ease-out] overflow-hidden max-h-[90vh] flex flex-col">
              
              {/* Background decorative blobs inside modal */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-50/50 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedSpeech(null)}
                className="absolute top-6 left-6 p-2.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Info */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 relative z-10 shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-slate-100 shadow-inner">
                  <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1 leading-tight">
                  {data.name}
                </h3>
                <span className="text-blue-600 font-bold text-sm md:text-base mb-1 block">
                  {data.title}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
                  {data.role}
                </span>
              </div>

              {/* Scrollable Speech Text */}
              <div className="flex-1 overflow-y-auto py-6 relative z-10 text-slate-700 text-base md:text-lg leading-relaxed text-right md:px-2">
                <Quote className="w-12 h-12 text-slate-200 mb-2 transform -scale-x-100" />
                <div className="font-bold space-y-4">
                  {data.speech}
                </div>
              </div>

              {/* Footer Close Action */}
              <div className="pt-6 border-t border-slate-100 text-center shrink-0">
                <button 
                  onClick={() => setSelectedSpeech(null)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-md"
                >
                  {isRtl ? 'إغلاق الكلمة' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default LeadershipSpeeches;
