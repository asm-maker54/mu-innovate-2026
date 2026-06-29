import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      name: 'نورين الهواري',
      role: 'مؤسسة شركة ناشئة',
      avatar: '/avatar1.png',
      quote: 'القمة كانت نقطة تحول حقيقية في مسيرتي. من خلال برنامج الاحتضان تحولت فكرتي البحثية إلى شركة ناشئة حصلت على تمويل أولي وبدأت في تقديم خدماتها للسوق المحلي.',
      rating: 5,
      company: 'NeoTech Solutions',
      highlight: 'حصلت على تمويل 500 ألف جنيه',
    },
    {
      name: 'أحمد محمود',
      role: 'مبتكر ورائد أعمال',
      avatar: '/avatar2.png',
      quote: 'المنصة وفرت لي كل ما احتاجه: من التدريب على بناء نموذج العمل، إلى التواصل مع مستثمرين حقيقيين. اليوم شركتي توظف 12 شخصاً وتخدم عملاء في 3 محافظات.',
      rating: 5,
      company: 'AgriSmart',
      highlight: 'من فكرة إلى 12 موظف',
    },
    {
      name: 'سارة عبد الرحمن',
      role: 'باحثة ومخترعة',
      avatar: '/avatar3.png',
      quote: 'بفضل مسار تسويق البحوث في القمة، تم تسجيل براءة اختراع لبحثي في معالجة المياه وبدأت مفاوضات مع شركة صناعية كبرى لتطبيق التقنية على نطاق واسع.',
      rating: 5,
      company: 'براءة اختراع مسجلة',
      highlight: 'من بحث إلى براءة اختراع',
    },
    {
      name: 'محمد علي',
      role: 'طالب هندسة — رائد أعمال',
      avatar: '/avatar2.png',
      quote: 'كنت طالب في السنة الرابعة ومش عارف أبدأ منين. القمة عرفتني على مرشدين ساعدوني أحول مشروع تخرجي لتطبيق يخدم أكثر من 5000 مستخدم حالياً.',
      rating: 5,
      company: 'EduLink App',
      highlight: '5000+ مستخدم نشط',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIdx(idx);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const next = useCallback(() => goTo((activeIdx + 1) % stories.length), [activeIdx, stories.length, goTo]);
  const prev = useCallback(() => goTo((activeIdx - 1 + stories.length) % stories.length), [activeIdx, stories.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const active = stories[activeIdx];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f0f4ff] to-white relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 text-[200px] font-black text-blue-100/40 leading-none select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
          "
        </div>
        <div className="absolute bottom-10 left-10 text-[180px] font-black text-blue-100/30 leading-none select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
          "
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            قصص <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-800">نجاح</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            حيث يلتقي المؤسسون والمبتكرون والصناعة والأكاديميا لبناء المشاريع والابتكارات
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Person Image */}
          <div className="relative flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 relative">
              {/* Yellow border decoration */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Avatar */}
              <div className="absolute inset-3 rounded-full overflow-hidden shadow-2xl shadow-blue-900/20">
                {stories.map((story, idx) => (
                  <img
                    key={idx}
                    src={story.avatar}
                    alt={story.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      activeIdx === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  />
                ))}
              </div>

              {/* Highlight badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-5 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                {active.highlight}
              </div>
            </div>
          </div>

          {/* Right: Testimonial Card */}
          <div className="flex-1 max-w-2xl">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-900/5 border border-gray-100 relative">
              {/* Quote icon */}
              <div className="absolute -top-5 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5 mt-2">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 font-medium">
                {active.quote}
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{active.name}</h4>
                  <p className="text-sm text-gray-500">{active.role}</p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">{active.company}</p>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? 'w-10 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Read More Button */}
        <div className="mt-16 text-center">
          <Link to="/success-stories" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-blue-600 font-bold rounded-full hover:bg-gray-50 hover:shadow-lg transition-all duration-300">
            عرض المزيد
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;
