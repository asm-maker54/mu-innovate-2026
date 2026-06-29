import React, { useState, useEffect } from 'react';
import { Building2, Landmark, Users, Lightbulb, Rocket, ArrowLeft, Network, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      gradient: 'from-blue-600 to-blue-400',
      bgLight: 'bg-blue-50',
      description: 'دعم وتشريع وتوجيه استراتيجي لدعم بيئة الابتكار وريادة الأعمال على المستوى القومي والإقليمي.',
      benefits: ['المساهمة في صياغة السياسات', 'دعم الاقتصاد المحلي', 'تعزيز التحول الرقمي', 'توفير فرص عمل للشباب'],
      image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'الشركاء الصناعيون',
      titleEn: 'Industry Partners',
      icon: Building2,
      color: 'indigo',
      gradient: 'from-indigo-600 to-indigo-400',
      bgLight: 'bg-indigo-50',
      description: 'تقديم الخبرات التقنية والتطبيقية، وتوفير الدعم الفني لربط مخرجات البحث العلمي باحتياجات السوق.',
      benefits: ['الوصول للابتكارات الجديدة', 'تطوير حلول صناعية', 'تنمية مهارات الخريجين', 'بناء علامة تجارية قوية'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'المستثمرون والصناديق',
      titleEn: 'Investors & VCs',
      icon: Lightbulb,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-400',
      bgLight: 'bg-amber-50',
      description: 'تمويل المشاريع الواعدة والشركات الناشئة لضمان استدامة النمو وتحويل الأفكار إلى واقع.',
      benefits: ['اكتشاف فرص استثمارية', 'تنويع المحفظة الاستثمارية', 'دعم الشركات الناشئة', 'عائد استثماري مستدام'],
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'المؤسسات الأكاديمية',
      titleEn: 'Academic Institutions',
      icon: Users,
      color: 'emerald',
      gradient: 'from-emerald-600 to-emerald-400',
      bgLight: 'bg-emerald-50',
      description: 'تبادل المعرفة والخبرات البحثية، وتعزيز الشراكات بين الجامعات ومراكز البحث العلمي.',
      benefits: ['مشاركة الأبحاث التطبيقية', 'تبادل الطلاب والباحثين', 'التعاون في مشاريع مشتركة', 'نقل التكنولوجيا'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: 'الشركات الناشئة',
      titleEn: 'Startups',
      icon: Rocket,
      color: 'purple',
      gradient: 'from-purple-600 to-purple-400',
      bgLight: 'bg-purple-50',
      description: 'نواة الابتكار السريع، تقدم حلولاً غير تقليدية وتساهم في تشكيل مستقبل الاقتصاد المعرفي.',
      benefits: ['الحصول على التمويل', 'بناء شبكة علاقات قوية', 'توجيه وإرشاد من الخبراء', 'تسويق المنتجات'],
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#0a1628]">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-600/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 font-medium text-sm mb-6 border border-blue-500/20">
              <Network className="w-4 h-4" />
              <span>أطراف المنظومة</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              شركاء النجاح في <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-indigo-300">
                منظومة الابتكار
              </span>
            </h1>
            <p className="text-lg text-blue-100/80 leading-relaxed mb-10">
              نعمل معاً لبناء بيئة ريادية متكاملة، تجمع بين العقول المبتكرة، الخبرات الصناعية، التمويل الاستراتيجي، والدعم الحكومي لتحقيق تنمية مستدامة في صعيد مصر.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-1/3 space-y-4">
              {stakeholders.map((item, idx) => {
                const isActive = activeTab === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-right flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border ${
                      isActive 
                        ? 'bg-white shadow-xl shadow-gray-200/50 border-transparent translate-x-2 scale-105' 
                        : 'bg-transparent border-gray-200 hover:bg-white hover:shadow-md hover:border-transparent hover:translate-x-1'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isActive ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg` : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mt-0.5 transition-colors duration-300 ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                        {item.titleEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${stakeholders[activeTab].gradient} opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                    <div className="w-full md:w-1/2">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${stakeholders[activeTab].gradient} text-white shadow-lg`}>
                        {React.createElement(stakeholders[activeTab].icon, { className: "w-8 h-8" })}
                      </div>
                      <h2 className="text-3xl font-black text-gray-900 mb-4">
                        {stakeholders[activeTab].title}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {stakeholders[activeTab].description}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video md:aspect-square">
                        <img 
                          src={stakeholders[activeTab].image} 
                          alt={stakeholders[activeTab].title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <ShieldCheck className={`w-5 h-5 text-${stakeholders[activeTab].color}-600`} />
                      أوجه التعاون والمزايا
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stakeholders[activeTab].benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stakeholders[activeTab].gradient}`} />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
            كن جزءاً من قصة نجاحنا
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            سواء كنت مستثمراً، شركة كبرى، أو مؤسسة حكومية، تواجدك معنا سيشكل فارقاً حقيقياً في مستقبل ريادة الأعمال بمصر.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              انضم كشريك نجاح
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
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
