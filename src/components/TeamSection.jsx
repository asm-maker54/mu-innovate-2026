import React from 'react';
import { Quote } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'أ.د. عصام فرحات',
    role: 'رئيس جامعة المنيا ورئيس القمة',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    quote: 'نسعى في جامعة المنيا لبناء منظومة ابتكارية متكاملة تعزز من دور الجامعة كقاطرة للتنمية في صعيد مصر، وتدعم الشباب المبتكر لتحويل أفكارهم إلى واقع ملموس.',
    color: 'from-blue-600 to-indigo-900',
    glow: 'group-hover:shadow-blue-500/30'
  },
  {
    id: 2,
    name: 'أ.د. أيمن حسنين',
    role: 'نائب رئيس الجامعة لشئون خدمة المجتمع',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    quote: 'الشراكة المجتمعية ودعم ريادة الأعمال هما الركيزتان الأساسيتان لخلق فرص عمل حقيقية ودفع عجلة الاقتصاد الوطني نحو مستقبل مستدام.',
    color: 'from-emerald-500 to-teal-900',
    glow: 'group-hover:shadow-emerald-500/30'
  },
  {
    id: 3,
    name: 'د. أبو هشيمة مصطفى',
    role: 'المنسق العام للقمة',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    quote: 'القمة ليست مجرد حدث، بل هي منصة انطلاق حقيقية تجمع العقول الشابة المبدعة بالخبراء والمستثمرين لترجمة الأفكار إلى مشاريع ناجحة.',
    color: 'from-purple-600 to-violet-900',
    glow: 'group-hover:shadow-purple-500/30'
  },
  {
    id: 4,
    name: 'د. رانيا سعيد',
    role: 'رئيس لجنة الابتكار الأخضر',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    quote: 'نؤمن بأن الابتكار الحقيقي يجب أن يكون صديقاً للبيئة. نعمل على دعم الحلول الخضراء التي تواجه التحديات المناخية بذكاء وكفاءة.',
    color: 'from-green-500 to-emerald-800',
    glow: 'group-hover:shadow-green-500/30'
  },
  {
    id: 5,
    name: 'م. أحمد علي',
    role: 'رئيس لجنة التحول الرقمي',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    quote: 'التقنيات الرقمية والذكاء الاصطناعي هي لغة العصر، وهدفنا هو تمكين الشباب من أدوات التكنولوجيا لتطوير حلول برمجية غير مسبوقة.',
    color: 'from-orange-500 to-red-900',
    glow: 'group-hover:shadow-orange-500/30'
  }
];

const TeamSection = () => {
  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden" dir="rtl">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">فريق عمل القمة</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            نخبة من القيادات الأكاديمية والخبراء الذين يقودون رؤية قمة جامعة المنيا للابتكار، ويؤمنون بطاقات الشباب وإمكانياتهم.
          </p>
        </div>

        {/* First Row (2 members) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">
          {team.slice(0, 2).map((member) => (
            <div key={member.id} className={`group relative bg-[#0a1224] rounded-3xl p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 ${member.glow} flex flex-col h-full`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${member.color}`} />
              
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative p-1 bg-gradient-to-br from-white/10 to-transparent">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <div className="text-center sm:text-right pt-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium">{member.role}</p>
                </div>
              </div>

              <div className="relative mt-auto pt-6 border-t border-white/5">
                <Quote className="absolute -top-3 right-0 w-8 h-8 text-white/5 rotate-180" />
                <p className="text-gray-400 text-sm leading-relaxed italic pr-6 relative z-10 font-medium">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row (3 members) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.slice(2, 5).map((member) => (
            <div key={member.id} className={`group relative bg-[#0a1224] rounded-3xl p-6 border border-white/5 transition-all duration-500 hover:-translate-y-2 ${member.glow} flex flex-col h-full`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${member.color}`} />
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative p-1 bg-gradient-to-br from-white/10 to-transparent mb-4">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                </div>
              </div>

              <div className="relative mt-auto pt-4 border-t border-white/5">
                <Quote className="absolute -top-2 right-0 w-6 h-6 text-white/5 rotate-180" />
                <p className="text-gray-400 text-sm leading-relaxed italic pr-4 relative z-10">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
