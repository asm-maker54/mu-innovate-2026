import { Eye, Target, Rocket, Calendar, Users, Briefcase, MonitorPlay, Search, ShoppingCart, Shield, Leaf, Handshake, FileText } from 'lucide-react';

const VisionMission = () => {
  const goals = [
    { id: '01', title: 'إطلاق أول منصة سنوية كبرى للابتكار وريادة الأعمال بجامعة المنيا.', icon: Rocket, color: 'bg-green-600' },
    { id: '02', title: 'إطلاق حزمة برامج تنفيذية مستدامة تمتد آثارها بعد انتهاء القمة.', icon: Calendar, color: 'bg-teal-500' },
    { id: '03', title: 'تعزيز مشاركة الطلاب والطالبات في الابتكار وريادة الأعمال عبر برنامج رواد جامعة المنيا.', icon: Users, color: 'bg-orange-400' },
    { id: '04', title: 'ربط خريجي وطلاب الجامعة بفرص التدريب والتوظيف والعمل الحر من خلال ملتقى توظيف شامل ومنصة مهنية مستمرة.', icon: Briefcase, color: 'bg-purple-700' },
    { id: '05', title: 'بناء شبكة مدربين رقمية من أبناء الجامعة لتقديم تدريبات سوق العمل المستقبلية.', icon: MonitorPlay, color: 'bg-cyan-500' },
    { id: '06', title: 'إطلاق مسارات لتسويق البحوث ومشروعات التخرج وفق مستويات الجاهزية.', icon: Search, color: 'bg-lime-500' },
    { id: '07', title: 'تسويق منتجات وخدمات الوحدات الإنتاجية ومخرجات الكليات من خلال شركة نماء.', icon: ShoppingCart, color: 'bg-amber-500' },
    { id: '08', title: 'توفير مسارات للحماية الفكرية والتأسيس والاحتضان والتمويل والوصول إلى السوق.', icon: Shield, color: 'bg-blue-800' },
    { id: '09', title: 'تعزيز الابتكار الأخضر والاستدامة عبر مشاركة جميع الكليات.', icon: Leaf, color: 'bg-green-600' },
    { id: '10', title: 'توقيع شراكات مع الصناعة والزراعة والبنوك وجهات التمويل والحاضنات والمسرعات.', icon: Handshake, color: 'bg-fuchsia-700' },
    { id: '11', title: 'إصدار تقرير أثر وخطة متابعة لمدة 90 يومًا بعد القمة.', icon: FileText, color: 'bg-blue-600' },
  ];

  const GoalCard = ({ item, align }) => {
    const isRight = align === 'right';

    return (
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-stretch min-h-[110px] hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group">
        {isRight && (
          <div className="flex-1 flex items-center p-4 pl-6 text-right font-bold text-gray-800 leading-relaxed text-sm md:text-base">
            {item.title}
          </div>
        )}
        
        {!isRight && (
          <div className={`w-14 flex items-center justify-center text-white text-xl font-bold ${item.color}`}>
            {item.id}
          </div>
        )}

        <div className={`flex items-center justify-center px-4 md:px-6`}>
          <div className={`w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform ${item.color}`}>
            <item.icon size={32} />
          </div>
        </div>

        {!isRight && (
          <div className="flex-1 flex items-center p-4 pr-6 text-right font-bold text-gray-800 leading-relaxed text-sm md:text-base">
            {item.title}
          </div>
        )}

        {isRight && (
          <div className={`w-14 flex items-center justify-center text-white text-xl font-bold ${item.color}`}>
            {item.id}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50/30 border-b border-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 border-2 border-green-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-6">
            <div className="w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
              <Eye size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-4">الرؤية</h3>
              <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                أن تصبح جامعة المنيا مركزاً إقليمياً رائداً للابتكار وريادة الأعمال في صعيد مصر، من خلال قمة سنوية قادرة على تحويل الأفكار إلى شركات، والبحوث إلى منتجات، والطلاب إلى رواد أعمال، والكليات إلى منصات للتنمية والتوظيف والاستدامة.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-700/30">
              <Target size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-800 mb-4">الرسالة</h3>
              <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                إطلاق قمة سنوية متكاملة تجمع بين الابتكار، وريادة الأعمال، والتوظيف، والتدريب، والابتكار الأخضر، والتحول الرقمي، وتسويق البحث العلمي، وحماية الملكية الفكرية، وربط الجامعة بالصناعة والزراعة والخدمات والمجتمع، من خلال شراكات فاعلة ومؤشرات متابعة واضحة.
              </p>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1e3a8a] text-white px-8 py-3 rounded-full text-2xl font-bold flex items-center gap-4 shadow-lg shadow-blue-900/20">
            الأهداف الاستراتيجية النهائية
            <Target className="text-orange-400" size={32} />
          </div>
        </div>

        {/* Goals Grid */}
        <div className="flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-6">
            <GoalCard item={goals[0]} align="right" />
            <GoalCard item={goals[1]} align="left" />
          </div>
          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <GoalCard item={goals[2]} align="right" />
            <GoalCard item={goals[3]} align="left" />
          </div>
          {/* Row 3 */}
          <div className="flex flex-col md:flex-row gap-6">
            <GoalCard item={goals[4]} align="right" />
            <GoalCard item={goals[5]} align="left" />
          </div>
          {/* Row 4 */}
          <div className="flex flex-col md:flex-row gap-6">
            <GoalCard item={goals[6]} align="right" />
            <GoalCard item={goals[7]} align="left" />
          </div>
          {/* Row 5 */}
          <div className="flex flex-col md:flex-row gap-6">
            <GoalCard item={goals[8]} align="right" />
            <GoalCard item={goals[9]} align="left" />
          </div>
          {/* Row 6 (Goal 11 Centered) */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <GoalCard item={goals[10]} align="right" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionMission;
