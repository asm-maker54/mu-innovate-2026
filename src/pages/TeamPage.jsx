import React, { useEffect } from 'react';
import { Quote, Sparkles } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'أ.د. عصام فرحات',
    role: 'رئيس جامعة المنيا ورئيس القمة',
    image: '/dr-essam.jpg.jpeg',
    quote: 'نسعى في جامعة المنيا لبناء منظومة ابتكارية متكاملة تعزز من دور الجامعة كقاطرة للتنمية في صعيد مصر، وتدعم الشباب المبتكر لتحويل أفكارهم إلى واقع ملموس.',
    color: 'bg-blue-50',
    accent: 'text-blue-600',
    border: 'border-blue-100'
  },
  {
    id: 3,
    name: 'أ.د. إيمان زكي الشريف',
    role: 'مستشار رئيس الجامعة للابتكار وريادة الأعمال والمدير التنفيذي للقمة',
    image: '/dr-eman.jpg.jpeg',
    quote: 'القمة ليست مجرد حدث، بل هي منصة انطلاق حقيقية تجمع العقول الشابة المبدعة بالخبراء والمستثمرين لترجمة الأفكار إلى مشاريع ناجحة.',
    color: 'bg-purple-50',
    accent: 'text-purple-600',
    border: 'border-purple-100'
  },
  {
    id: 4,
    name: 'د. رانيا سعيد',
    role: 'رئيس لجنة الابتكار الأخضر',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    quote: 'نؤمن بأن الابتكار الحقيقي يجب أن يكون صديقاً للبيئة. نعمل على دعم الحلول الخضراء التي تواجه التحديات المناخية بذكاء وكفاءة.',
    color: 'bg-green-50',
    accent: 'text-green-600',
    border: 'border-green-100'
  },
  {
    id: 5,
    name: 'م. أحمد علي',
    role: 'رئيس لجنة التحول الرقمي',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    quote: 'التقنيات الرقمية والذكاء الاصطناعي هي لغة العصر، وهدفنا هو تمكين الشباب من أدوات التكنولوجيا لتطوير حلول برمجية غير مسبوقة.',
    color: 'bg-orange-50',
    accent: 'text-orange-600',
    border: 'border-orange-100'
  }
];

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-24 relative overflow-hidden" dir="rtl">
      {/* Light Theme Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-blue-600 mb-6 text-sm font-bold">
            <Sparkles className="w-4 h-4 text-blue-500" />
            عقول مبتكرة لقيادة المستقبل
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            فريق عمل القمة
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            نخبة من القيادات الأكاديمية والخبراء الذين يقودون رؤية قمة جامعة المنيا للابتكار، ويؤمنون بطاقات الشباب وإمكانياتهم اللامحدودة.
          </p>
        </div>

        {/* Zig-Zag Layout */}
        <div className="space-y-24 md:space-y-32">
          {team.map((member, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={member.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20 group`}
              >
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative">
                  {/* Decorative Background Blob */}
                  <div className={`absolute inset-0 ${member.color} rounded-[3rem] transform ${isEven ? '-rotate-3 translate-x-4' : 'rotate-3 -translate-x-4'} transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0`} />
                  
                  {/* Image Container */}
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-2">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Floating Info Badge on the Image */}
                    <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/20 hidden md:block">
                      <div className={`w-3 h-3 rounded-full ${member.accent} bg-current mb-1 animate-pulse`} />
                      <p className="text-slate-900 font-bold text-sm">شخصية قيادية</p>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                      {member.name}
                    </h2>
                    <div className="inline-flex items-center gap-2">
                      <span className={`w-8 h-1 rounded-full ${member.accent} bg-current`} />
                      <h3 className={`text-lg md:text-xl font-bold ${member.accent}`}>
                        {member.role}
                      </h3>
                    </div>
                  </div>

                  <div className={`relative p-8 rounded-3xl ${member.color} border ${member.border} transition-all duration-300 hover:shadow-lg`}>
                    <Quote className={`absolute top-6 right-6 w-10 h-10 ${member.accent} opacity-20 rotate-180`} />
                    <p className="text-slate-700 text-lg md:text-xl leading-loose font-medium relative z-10 italic pr-8">
                      "{member.quote}"
                    </p>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default TeamPage;
