import React, { useState, useEffect } from 'react';
import { Building2, Landmark, Users, Lightbulb, Rocket, ArrowLeft, Network, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeInView from '../components/FadeInView';

const StakeholdersPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stakeholders = [
    {
      id: 1,
      title: 'المؤسسات الحكومية',
      titleEn: 'Government Entities',
      icon: Landmark,
      color: 'blue',
      gradient: 'from-blue-600 to-indigo-600',
      bgLight: 'bg-blue-50/50 border-blue-100',
      textAccent: 'text-blue-700',
      description: 'تقديم الدعم التشريعي والتوجيه الاستراتيجي لبناء بيئة حاضنة للابتكار وريادة الأعمال على المستويين الوطني والإقليمي، تماشياً مع استراتيجيات التنمية المستدامة.',
      benefits: ['المشاركة الفعالة في صياغة سياسات الابتكار والملكية الفكرية', 'دعم وتمكين رواد الأعمال والاقتصاد المعرفي المحلي في الصعيد', 'تعزيز التحول الرقمي والتنسيق المؤسسي المشترك', 'توفير فرص عمل حقيقية وخلق شراكات تنموية للشباب'],
      image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'الشركاء الصناعيون',
      titleEn: 'Industry Partners',
      icon: Building2,
      color: 'indigo',
      gradient: 'from-indigo-600 to-purple-600',
      bgLight: 'bg-indigo-50/50 border-indigo-100',
      textAccent: 'text-indigo-700',
      description: 'المساهمة في توفير الخبرات التقنية والتطبيقية لربط مخرجات البحث العلمي والتطوير الجامعي باحتياجات السوق الفعلية وتنمية قطاعات الإنتاج.',
      benefits: ['الوصول الحصري لأحدث الابتكارات والمشاريع التطبيقية الناشئة', 'المشاركة في تطوير حلول هندسية وتقنية للمشكلات الصناعية', 'المساهمة في صقل وتدريب الخريجين والكوادر البشرية المطلوبة', 'بناء علامة تجارية قوية تدعم المسؤولية المجتمعية والابتكار'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'المستثمرون والصناديق',
      titleEn: 'Investors & VCs',
      icon: Lightbulb,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50/50 border-amber-100',
      textAccent: 'text-amber-700',
      description: 'توفير الدعم المالي والتمويل الاستثماري اللازم لرعاية الأفكار الريادية والشركات الناشئة لضمان توسعها ونجاحها التجاري في الأسواق المحلية والعالمية.',
      benefits: ['اكتشاف مبكر لفرص استثمارية واعدة في مرحلة الأفكار والنمو الأولية', 'تنويع المحفظة الاستثمارية بأفكار خارج الصندوق مدعومة أكاديمياً', 'توجيه وإرشاد الشركات الناشئة والمشاركة في نموها وتوسعها', 'المساهمة في بناء بيئة اقتصادية مستدامة ذات عائد استثماري مجزٍ'],
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'المؤسسات الأكاديمية',
      titleEn: 'Academic Institutions',
      icon: Users,
      color: 'emerald',
      gradient: 'from-emerald-600 to-teal-600',
      bgLight: 'bg-emerald-50/50 border-emerald-100',
      textAccent: 'text-emerald-700',
      description: 'تبادل المعارف والخبرات البحثية، وتعزيز الروابط العلمية بين الجامعات ومراكز الأبحاث لنقل وتوطين التكنولوجيا وبراءات الاختراع.',
      benefits: ['تبادل الأبحاث التطبيقية ومشاركتها مع مجتمع ريادة الأعمال', 'إتاحة فرص التبادل الأكاديمي والطلابي والزيارات المعملية المشتركة', 'التعاون الدولي لتقديم أبحاث ممولة ومنح ابتكارية مشتركة', 'ترخيص وتوثيق براءات الاختراع والملكية الفكرية للمخترعين'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: 'الشركات الناشئة',
      titleEn: 'Startups',
      icon: Rocket,
      color: 'purple',
      gradient: 'from-purple-600 to-pink-600',
      bgLight: 'bg-purple-50/50 border-purple-100',
      textAccent: 'text-purple-700',
      description: 'المحرك الأساسي للابتكار والتغيير الاقتصادي، حيث تقدم الشركات الناشئة حلولاً ذكية ومبتكرة تخدم التطور التكنولوجي والتحول الرقمي السريع.',
      benefits: ['الحصول على احتضان متكامل وتوجيه إرشادي من أفضل الخبراء', 'بناء علاقات استراتيجية وشبكة تواصل قوية مع المستثمرين والشركاء', 'الحصول على تمويل أولي وتسهيلات حكومية وتشريعية لأعمالها', 'تسويق المنتجات والخدمات على المستوى المحلي والإقليمي في معارض القمة'],
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 font-cairo relative overflow-hidden" dir="rtl">
      {/* Background Decorative Blur Blobs */}
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
              <Network className="w-4 h-4" />
              <span>أطراف منظومة الابتكار</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              شركاء النجاح في <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-600">
                منظومة الابتكار
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              نعمل معاً لبناء بيئة ريادية متكاملة، تجمع بين العقول المبتكرة والخبرات الصناعية والتمويل الاستراتيجي لتمكين التنمية المستدامة في مصر.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-8">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-80 shrink-0 space-y-4">
              {stakeholders.map((item, idx) => {
                const isActive = activeTab === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-right flex items-center gap-4 p-5 rounded-3xl transition-all duration-300 border ${
                      isActive 
                        ? 'bg-white shadow-xl shadow-slate-200/50 border-transparent translate-x-2' 
                        : 'bg-transparent border-slate-200 hover:bg-white hover:shadow-md hover:border-transparent hover:translate-x-1'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-blue-500/20` : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-black text-lg transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs font-bold mt-0.5 transition-colors duration-300 ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                        {item.titleEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full">
              <FadeInView delay={100}>
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                  
                  {/* Background Decor Accent */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${stakeholders[activeTab].gradient} opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
                      
                      {/* Left Block: Info */}
                      <div className="w-full md:w-1/2">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-6 bg-gradient-to-br ${stakeholders[activeTab].gradient} text-white shadow-lg`}>
                          {React.createElement(stakeholders[activeTab].icon, { className: "w-8 h-8" })}
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                          {stakeholders[activeTab].title}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                          {stakeholders[activeTab].description}
                        </p>
                      </div>

                      {/* Right Block: Image with Offset Border Frame */}
                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative group w-full max-w-sm">
                          <div className={`absolute inset-0 bg-gradient-to-tr ${stakeholders[activeTab].gradient} rounded-[2rem] transform translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300`}></div>
                          <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white aspect-video md:aspect-square z-10 relative bg-slate-50">
                            <img 
                              src={stakeholders[activeTab].image} 
                              alt={stakeholders[activeTab].title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Cooperation Benefits Section */}
                    <div className={`${stakeholders[activeTab].bgLight} border rounded-[2rem] p-8`}>
                      <h4 className={`font-black text-lg mb-5 flex items-center gap-2 ${stakeholders[activeTab].textAccent}`}>
                        <ShieldCheck className="w-5.5 h-5.5" />
                        أوجه التعاون والمزايا المكتسبة
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stakeholders[activeTab].benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${stakeholders[activeTab].gradient} shrink-0`} />
                            <span className="text-slate-700 font-bold text-sm leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mt-12 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            كن جزءاً من منظومة الابتكار والريادة
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            سواء كنت مستثمرًا، شريكًا صناعيًا، أو مؤسسة تسعى للتعاون؛ تواجدك وشراكتك معنا يسهم مباشرة في تسريع الابتكار وتحويل الأفكار الرائدة لواقع ملموس.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              انضم كشريك نجاح
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:bg-slate-50 transition-all"
            >
              تواصل معنا للتفاصيل
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default StakeholdersPage;
