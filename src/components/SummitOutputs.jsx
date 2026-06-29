import React, { useState } from 'react';
import { Building2, Users, Lightbulb, Box, Briefcase, GraduationCap, Presentation, Handshake, Camera, ClipboardCheck } from 'lucide-react';

const outputs = [
  {
    id: 1,
    number: '01',
    title: 'تأسيس منصة إطلاق مستدامة',
    description: 'إطلاق قمة سنوية رسمية متكاملة للابتكار وريادة الأعمال بجامعة المنيا كمنظومة تشغيلية ممتدة الأثر وليس مجرد حدث احتفالي عابر.',
    icon: Building2,
    color: 'from-green-600 to-emerald-900',
    iconColor: 'text-green-400'
  },
  {
    id: 2,
    number: '02',
    title: 'كثافة المشاركة الطلابية',
    description: 'تسجيل ودعم ما لا يقل عن 1000 طالب وطالبة في "برنامج رواد جامعة المنيا" (Minia Leads) في دورته الأولى.',
    icon: Users,
    color: 'from-blue-600 to-indigo-900',
    iconColor: 'text-blue-400'
  },
  {
    id: 3,
    number: '03',
    title: 'حجم المشروعات والأفكار',
    description: 'استقبال وفرز ما لا يقل عن 200 إلى 300 فكرة ومشروع ابتكاري من كافة كليات الجامعة العشرين.',
    icon: Lightbulb,
    color: 'from-purple-600 to-violet-900',
    iconColor: 'text-purple-400'
  },
  {
    id: 4,
    number: '04',
    title: 'تمكين النماذج الأولية',
    description: 'تقديم دعم فني ومنح صغيرة لـ 20 إلى 30 نموذجاً أولياً (Prototype) قابلاً للاختبار والتجريب.',
    icon: Box,
    color: 'from-emerald-500 to-teal-900',
    iconColor: 'text-emerald-400'
  },
  {
    id: 5,
    number: '05',
    title: 'توفير الفرص المهنية والتدريبية',
    description: 'توفير 500 فرصة تدريب ومقابلة عمل مبدئية بالتعاون مع ما يزيد عن 30 إلى 50 شركة وجهة توظيف.',
    icon: Briefcase,
    color: 'from-orange-500 to-red-900',
    iconColor: 'text-orange-400'
  },
  {
    id: 6,
    number: '06',
    title: 'بناء قاعدة مواهب مستدامة',
    description: 'إنشاء منصة Minia Talent Pool وقاعدة بيانات مواهب وخريجين تضم قرابة 3000 طالب وخريج مسجل لربطهم بالشركات مستقبلاً.',
    icon: GraduationCap,
    color: 'from-cyan-600 to-blue-900',
    iconColor: 'text-cyan-400'
  },
  {
    id: 7,
    number: '07',
    title: 'توطين المعرفة والتدريب الرقمي',
    description: 'اعتماد وتأهيل 30 إلى 50 مدرباً داخلياً من أبناء الجامعة ضمن "شبكة مدربي جامعة المنيا للمهارات الرقمية" لتقديم حقائب تدريبية موجهة لسوق العمل.',
    icon: Presentation,
    color: 'from-amber-500 to-orange-900',
    iconColor: 'text-amber-400'
  },
  {
    id: 8,
    number: '08',
    title: 'الشراكات والاتفاقيات الاستراتيجية',
    description: 'توقيع 10 إلى 15 بروتوكول تعاون وخطاب نوايا مع جهات تمويلية وصناعية بارزة (جهاز تنمية المشروعات، البنوك، الحاضنات، وشركات القطاع الخاص).',
    icon: Handshake,
    color: 'from-teal-600 to-green-900',
    iconColor: 'text-teal-400'
  },
  {
    id: 9,
    number: '09',
    title: 'التوثيق وصناعة المحتوى الإعلامي',
    description: 'إنتاج ما لا يقل عن 30 إلى 50 مادة مرئية ومكتوبة وفيديو ترويجي لقصص نجاح الابتكارات من خلال "الاستوديو الحي للمشروعات".',
    icon: Camera,
    color: 'from-fuchsia-600 to-purple-900',
    iconColor: 'text-fuchsia-400'
  },
  {
    id: 10,
    number: '10',
    title: 'مأسسة الاستدامة والأثر التنفيذي',
    description: 'إقرار خطة متابعة تنفيذية إلزامية تمتد لـ 90 يوماً بعد القمة (90/60/30 يوماً)، وإصدار تقرير أثر رسمي ومعتمد للنتائج.',
    icon: ClipboardCheck,
    color: 'from-blue-500 to-cyan-900',
    iconColor: 'text-blue-400'
  }
];

const SummitOutputs = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-24 bg-[#050b14] relative overflow-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050b14] to-[#050b14] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 text-sm font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            أولاً: المستهدفات والمخرجات العامة
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">مخرجات القمة</h2>
          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            نتطلع في قمة جامعة المنيا للابتكار إلى تحقيق مجموعة من المخرجات الملموسة التي تعزز بيئة ريادة الأعمال وتدعم الابتكار المستدام.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {outputs.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredId === item.id;
            
            return (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative group bg-[#0a1224] rounded-3xl p-6 border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${isHovered ? 'border-white/20' : ''}`}
              >
                {/* Background Gradient Hover Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${item.color}`} />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 bg-[#111c36] text-gray-400 font-black text-sm px-3 py-1 rounded-xl group-hover:text-white transition-colors border border-white/5">
                  {item.number}
                </div>

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 relative z-10 ${isHovered ? 'bg-white/10 scale-110' : 'bg-[#111c36]'}`}>
                  <Icon className={`w-8 h-8 ${item.iconColor} transition-transform duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Bottom Line */}
                <div className={`absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r ${item.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SummitOutputs;
