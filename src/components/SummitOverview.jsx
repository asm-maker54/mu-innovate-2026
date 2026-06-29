import React from 'react';
import { Eye, Target, Rocket, Users, BookOpen, Briefcase, Leaf, Shield, Link as LinkIcon, LineChart, Cpu, Lightbulb, Handshake, Sprout, Building2 } from 'lucide-react';

const SummitOverview = () => {
  const goals = [
    { id: '01', title: 'إطلاق أول منصة سنوية كبرى للابتكار وريادة الأعمال بجامعة المنيا.', icon: Rocket },
    { id: '02', title: 'إطلاق حزمة برامج تنفيذية مستدامة تمتد آثارها بعد انتهاء القمة.', icon: LineChart },
    { id: '03', title: 'تعزيز مشاركة الطلاب والطالبات في الابتكار وريادة الأعمال عبر برنامج رواد جامعة المنيا.', icon: Users },
    { id: '04', title: 'ربط خريجي وطلاب الجامعة بفرص التدريب والتوظيف والعمل الحر.', icon: Briefcase },
    { id: '05', title: 'بناء شبكة مدربين رقمية من أبناء الجامعة لتقديم تدريبات سوق العمل المستقبلية.', icon: Cpu },
    { id: '06', title: 'إطلاق مسارات لتسويق البحوث ومشروعات التخرج وفق مستويات الجاهزية.', icon: BookOpen },
    { id: '07', title: 'تسويق منتجات وخدمات الوحدات الإنتاجية ومخرجات الكليات من خلال شركة نماء.', icon: Lightbulb },
    { id: '08', title: 'توفير مسارات للحماية الفكرية والتأسيس والاحتضان والتمويل والوصول إلى السوق.', icon: Shield },
    { id: '09', title: 'تعزيز الابتكار الأخضر والاستدامة عبر مشاركة جميع الكليات.', icon: Leaf },
    { id: '10', title: 'توقيع شراكات مع الصناعة والزراعة والبنوك وجهات التمويل والحاضنات والمسرعات.', icon: Handshake },
    { id: '11', title: 'إصدار تقرير أثر وخطة متابعة لمدة 90 يومًا بعد القمة.', icon: Target },
  ];

  const pillars = [
    { title: 'تحويل الأفكار إلى شركات', icon: Lightbulb },
    { title: 'تحويل البحوث إلى منتجات', icon: BookOpen },
    { title: 'تمكين الطلاب', icon: Users },
    { title: 'التنمية المستدامة', icon: Sprout },
    { title: 'ربط الجامعة بالصناعة', icon: Building2 },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] font-['Cairo'] text-[#1e3a8a]">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white py-12 px-4 shadow-md text-center rounded-b-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          قمة جامعة المنيا للابتكار وريادة الأعمال 2026
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
          من الفكرة إلى الشركة ... ومن البحث إلى السوق... ومن الجامعة إلى التنمية
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* Hero Section (Vision & Mission) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-green-50 text-[#10b981] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-[#10b981] mb-4">الرؤية</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              أن تصبح جامعة المنيا مركزاً إقليمياً رائداً للابتكار وريادة الأعمال في صعيد مصر، من خلال قمة سنوية قادرة على تحويل الأفكار إلى شركات، والبحوث إلى منتجات، والطلاب إلى رواد أعمال، والكليات إلى منصات للتنمية والتوظيف والاستدامة.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-50 text-[#1e3a8a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">الرسالة</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              إطلاق قمة سنوية متكاملة تجمع بين الابتكار، وريادة الأعمال، والتوظيف، والتدريب، والابتكار الأخضر، والتحول الرقمي، وتسويق البحث العلمي، وحماية الملكية الفكرية، وربط الجامعة بالصناعة والزراعة والخدمات والمجتمع، من خلال شراكات فاعلة ومؤشرات متابعة واضحة.
            </p>
          </div>
        </section>

        {/* Interactive Goals Grid */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-[#1e3a8a]">الأهداف الاستراتيجية النهائية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden group"
              >
                <div className="absolute -left-4 -top-4 w-24 h-24 bg-orange-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#f8fafc] text-[#f97316] rounded-xl flex items-center justify-center group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                    <goal.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-gray-200 group-hover:text-orange-200 transition-colors">
                    {goal.id}
                  </span>
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {goal.title}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer / Pillars */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-[#1e3a8a] mb-8">المحاور الأساسية</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3 w-40">
                <div className="w-16 h-16 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center shadow-md">
                  <pillar.icon className="w-7 h-7" />
                </div>
                <span className="font-semibold text-gray-700">{pillar.title}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SummitOverview;
