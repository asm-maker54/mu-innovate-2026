import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Award, BookOpen, Scale, Globe, ArrowRight, 
  CheckCircle, ArrowLeft, Users, Lightbulb, TrendingUp 
} from 'lucide-react';
import FadeInView from '../components/FadeInView';

const CenterActivitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activities = [
    {
      id: 1,
      title: 'حاضنات ومسرعات الأعمال',
      titleEn: 'Business Incubators & Accelerators',
      icon: Rocket,
      gradient: 'from-blue-600 to-cyan-500',
      shadow: 'shadow-blue-500/20',
      description: 'نقدم بيئة احتضان متكاملة لرواد الأعمال تبدأ من بلورة الفكرة وتخطيط نموذج العمل، وصولاً إلى بناء الشركات الناشئة وربطها بالمستثمرين.',
      link: '/submit-graduation-project',
      btnText: 'سجل فكرتك أو مشروعك الريادي',
      features: ['توفير مساحات عمل مشتركة', 'جلسات إرشاد وتوجيه مع خبراء السوق', 'تسهيل الحصول على تمويلات أولية']
    },
    {
      id: 2,
      title: 'الهاكاثونات والمسابقات الابتكارية',
      titleEn: 'Hackathons & Competitions',
      icon: Award,
      gradient: 'from-orange-500 to-amber-500',
      shadow: 'shadow-orange-500/20',
      description: 'تنظيم مسابقات برمجية وهاكاثونات تقنية دورية لتحدي المبتكرين ودفعهم لتطوير حلول عملية للمشكلات الحقيقية التي تواجه المجتمع.',
      link: '/competitions',
      btnText: 'استكشف فعاليات القمة الحالية',
      features: ['جوائز مالية وعينية قيمة للمراكز الأولى', 'فرص للاحتضان الفوري للأفكار الفائزة', 'التشبيك مع مطورين ومهندسين محترفين']
    },
    {
      id: 3,
      title: 'ورش العمل والبرامج التدريبية',
      titleEn: 'Training & Workshops',
      icon: BookOpen,
      gradient: 'from-emerald-600 to-teal-500',
      shadow: 'shadow-emerald-500/20',
      description: 'برامج تدريبية وورش عمل مكثفة لبناء مهارات الطلاب والخريجين في مجالات التكنولوجيا الصاعدة، ريادة الأعمال، وإدارة المشاريع.',
      link: '/digital-mentors',
      btnText: 'تصفح الموجهين والبرامج',
      features: ['شهادات معتمدة من الجامعة والشركاء', 'محتوى تدريبي يقدمه خبراء ممارسون', 'تطبيقات عملية وهاكاثونات مصغرة']
    },
    {
      id: 4,
      title: 'براءات الاختراع والملكية الفكرية (TISC)',
      titleEn: 'Patent & Intellectual Property (TISC)',
      icon: Scale,
      gradient: 'from-purple-600 to-pink-500',
      shadow: 'shadow-purple-500/20',
      description: 'دعم الباحثين والمبتكرين في تسجيل براءات الاختراع وحماية حقوق الملكية الفكرية، وتسهيل البحث في قواعد البيانات العالمية للبراءات.',
      link: '/submit-research',
      btnText: 'قدم طلب تسجيل براءة اختراع',
      features: ['استشارات قانونية وفنية للمخترعين', 'إجراء الفحص المبدئي لبراءات الاختراع', 'ورش عمل حول قوانين الملكية الفكرية']
    },
    {
      id: 5,
      title: 'المنح والتعاون الدولي (GICO)',
      titleEn: 'Grants & International Collaboration (GICO)',
      icon: Globe,
      gradient: 'from-indigo-600 to-blue-500',
      shadow: 'shadow-indigo-500/20',
      description: 'فتح قنوات اتصال دولية وجلب فرص تمويلية ومنح بحثية من جهات مانحة عالمية لدعم مشاريع البحث والتطوير بالجامعة.',
      link: '/applied-research',
      btnText: 'استكشف الأبحاث التطبيقية المشتركة',
      features: ['تحديد فرص التمويل الخارجي وتسهيل التقديم', 'بناء تحالفات دولية مع جامعات عالمية', 'إدارة المشاريع البحثية المشتركة وتوجيهها']
    }
  ];

  const stats = [
    { label: 'شركات ناشئة محتضنة', value: '45+', icon: Rocket, color: 'text-blue-600' },
    { label: 'طلاب وخريجين تم تدريبهم', value: '1,500+', icon: Users, color: 'text-orange-600' },
    { label: 'براءات اختراع مسجلة وقيد الفحص', value: '30+', icon: Lightbulb, color: 'text-purple-600' },
    { label: 'إجمالي تمويل المنح الدولية المجلوبة', value: '2M$+', icon: Globe, color: 'text-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 font-cairo relative overflow-hidden" dir="rtl">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden mb-12">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold mb-6 transition-colors group">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              العودة للرئيسية
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-6 border border-blue-100 shadow-sm">
              <TrendingUp className="w-4 h-4" />
              <span>أنشطة وفعاليات المركز</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              بناء جيل من <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-600">
                المبتكرين ورواد الأعمال
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              يقدم مركز الابتكار وريادة الأعمال بجامعة المنيا برامج ريادية وبحثية وتدريبية متكاملة تهدف لدعم الطلاب والباحثين وتحويل مشاريعهم لشركات ناشئة ناجحة تساهم في نمو الاقتصاد.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-8 mb-12">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 border-b sm:border-b-0 sm:border-l last:border-0 border-slate-100">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 ${stat.color} border border-slate-100`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-900 mb-2">{stat.value}</span>
                  <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Activities Programs Grid */}
      <section className="py-8">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {activities.map((activity, idx) => (
              <FadeInView key={activity.id} delay={150 * (idx % 2)}>
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-150 flex flex-col justify-between h-full group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${activity.gradient} opacity-[0.02] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                  
                  <div>
                    {/* Header: Icon + Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activity.gradient} text-white shadow-lg ${activity.shadow} shrink-0`}>
                        <activity.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">
                          {activity.titleEn}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-650 leading-relaxed font-medium text-base mb-8">
                      {activity.description}
                    </p>

                    {/* Key features list */}
                    <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 mb-8">
                      <h4 className="font-bold text-sm text-slate-800 mb-3">ركائز البرنامج الأساسية:</h4>
                      <ul className="space-y-2.5">
                        {activity.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                            <span className="text-slate-600 font-bold text-sm leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <Link 
                    to={activity.link}
                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-slate-900 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm transition-all duration-300 shadow-md shadow-slate-900/10 hover:shadow-orange-600/20"
                  >
                    <span>{activity.btnText}</span>
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperation CTA */}
      <section className="py-20 mt-16 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            هل أنت باحث أو طالب وترغب بالدعم؟
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            سواء كنت تملك فكرة لمشروع تخرج، أو بحثًا تطبيقيًا ترغب في تسجيل براءة اختراع له، أو تريد الالتحاق بحاضنة أعمالنا؛ أبوابنا مفتوحة لمساعدتك في كل خطوة.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/auth"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              تسجيل حساب ريادي / باحث
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all"
            >
              استشير خبيراً مجاناً
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CenterActivitiesPage;
