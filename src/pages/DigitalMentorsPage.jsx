import React, { useEffect } from 'react';
import { BookOpen, Users, Video, Calendar, Star, GraduationCap, ChevronLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const DigitalMentorsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mentors = [
    {
      id: 1,
      name: 'د. أحمد محمود',
      title: 'أستاذ مساعد - كلية الحاسبات والمعلومات',
      specialty: 'الذكاء الاصطناعي وتعلم الآلة',
      rating: 4.9,
      sessions: 120,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: 'م. سارة إبراهيم',
      title: 'خبيرة تسويق رقمي',
      specialty: 'التسويق الإلكتروني ونمو الشركات',
      rating: 4.8,
      sessions: 85,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      name: 'د. كريم حسن',
      title: 'مستشار ريادة أعمال',
      specialty: 'تطوير نماذج الأعمال للمشاريع الناشئة',
      rating: 5.0,
      sessions: 200,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'أساسيات ريادة الأعمال التكنولوجية',
      instructor: 'د. كريم حسن',
      duration: '4 أسابيع',
      level: 'مبتدئ',
      category: 'ريادة أعمال',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'تطبيقات الذكاء الاصطناعي في الأعمال',
      instructor: 'د. أحمد محمود',
      duration: '6 أسابيع',
      level: 'متقدم',
      category: 'تكنولوجيا',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'استراتيجيات التسويق الرقمي',
      instructor: 'م. سارة إبراهيم',
      duration: '3 أسابيع',
      level: 'متوسط',
      category: 'تسويق',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-slate-50 font-sans" dir="rtl">
      
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Video className="w-10 h-10 text-indigo-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">شبكة المدربين الرقمية</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            منصة جامعة المنيا للتدريب والتوجيه عن بُعد. تواصل مع نخبة من الأكاديميين والخبراء لتطوير مهاراتك وبناء مستقبلك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors">
              تصفح الدورات المتاحة
            </button>
            <Link to="/register?role=mentor" className="px-8 py-4 bg-indigo-700 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 transition-colors border border-indigo-500">
              انضم كمدرب
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        
        {/* Mentors Section */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">المدربون والخبراء المعتمدون</h2>
              <p className="text-slate-500 text-lg">نخبة من أفضل العقول لتقديم الإرشاد والتوجيه</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700">
              عرض الجميع
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="flex items-center gap-5 mb-6">
                  <img src={mentor.image} alt={mentor.name} className="w-20 h-20 rounded-2xl object-cover" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{mentor.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{mentor.title}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <span className="text-sm text-slate-500 block mb-1">مجال التخصص:</span>
                  <span className="font-bold text-slate-700">{mentor.specialty}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold">{mentor.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">{mentor.sessions} جلسة إرشادية</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors">
                  حجز جلسة استشارية
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">الدورات التدريبية الفعالة</h2>
              <p className="text-slate-500 text-lg">تعلم مهارات جديدة واصقل خبراتك</p>
            </div>
            <div className="hidden sm:flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
              <input type="text" placeholder="ابحث عن دورة..." className="bg-transparent border-none focus:ring-0 px-4 text-sm w-64" />
              <button className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:-translate-y-2 transition-transform">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-900 z-10">
                    {course.category}
                  </div>
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">{course.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-600">
                      <GraduationCap className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">المدة: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <BookOpen className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">المستوى: {course.level}</span>
                    </div>
                  </div>
                  <button className="w-full py-3 border-2 border-indigo-100 text-indigo-700 rounded-xl font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                    عرض تفاصيل الدورة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DigitalMentorsPage;
