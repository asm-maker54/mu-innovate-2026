import React, { useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

const SuccessStoriesPage = () => {
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
    // Mock additional stories for the dedicated page
    {
      name: 'ياسمين طارق',
      role: 'مؤسسة منصة تعليمية',
      avatar: '/avatar1.png',
      quote: 'من خلال القمة، استطعت التواصل مع شركاء استراتيجيين ساعدوني في توسيع نطاق منصتي لتشمل جميع جامعات الصعيد. الآن لدينا أكثر من 20 ألف طالب نشط.',
      rating: 5,
      company: 'EduraTech',
      highlight: 'شراكات استراتيجية كبرى',
    },
    {
      name: 'كريم حسن',
      role: 'خبير ذكاء اصطناعي',
      avatar: '/avatar2.png',
      quote: 'عرضت نموذج الذكاء الاصطناعي الخاص بي في جناح الابتكارات، وحصلت على عرض احتضان فوري. الدعم القانوني والفني كان استثنائياً.',
      rating: 5,
      company: 'AI Visionaries',
      highlight: 'احتضان سريع وتسجيل IP',
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-24 relative overflow-hidden" dir="rtl">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-blue-600 mb-6 text-sm font-bold">
            <Star className="w-4 h-4 fill-blue-600" />
            نماذج مشرفة
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            قصص <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-800">نجاح ملهمة</span>
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            تعرف على النماذج المتميزة والمشروعات الرائدة التي خرجت من رحم القمة لتصنع أثراً حقيقياً في المجتمع وسوق العمل.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
              
              {/* Highlight Badge */}
              <div className="absolute -top-4 right-8 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-4 py-1.5 rounded-full font-bold text-xs shadow-lg">
                {story.highlight}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                <img src={story.avatar} alt={story.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">{story.name}</h4>
                  <p className="text-sm text-slate-500">{story.role}</p>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">{story.company}</p>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Quote className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </div>

              {/* Quote Text */}
              <p className="text-slate-700 leading-relaxed font-medium line-clamp-4 min-h-[110px]">
                "{story.quote}"
              </p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SuccessStoriesPage;
