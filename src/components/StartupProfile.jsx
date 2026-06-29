import { useTranslation } from 'react-i18next';
import { Target, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, Cpu, Users, DollarSign, FileCheck, Leaf, Globe } from 'lucide-react';

const StartupProfile = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const overallScore = 78;

  const criteria = [
    { name: isRtl ? 'الابتكار' : 'Innovation', score: 85, icon: Lightbulb, color: 'bg-yellow-500' },
    { name: isRtl ? 'فرص السوق' : 'Market Potential', score: 90, icon: Target, color: 'bg-blue-500' },
    { name: isRtl ? 'نموذج العمل' : 'Business Model', score: 70, icon: TrendingUp, color: 'bg-green-500' },
    { name: isRtl ? 'مستوى النضج التكنولوجي (TRL)' : 'Technology Readiness (TRL)', score: 60, icon: Cpu, color: 'bg-purple-500' },
    { name: isRtl ? 'قوة الفريق' : 'Team Strength', score: 95, icon: Users, color: 'bg-indigo-500' },
    { name: isRtl ? 'الجاهزية المالية' : 'Financial Readiness', score: 50, icon: DollarSign, color: 'bg-red-500' },
    { name: isRtl ? 'الملكية الفكرية' : 'IP Readiness', score: 40, icon: FileCheck, color: 'bg-orange-500' },
    { name: isRtl ? 'الاستدامة' : 'Sustainability', score: 80, icon: Leaf, color: 'bg-emerald-500' },
    { name: isRtl ? 'أهداف التنمية المستدامة' : 'SDGs Impact', score: 85, icon: Globe, color: 'bg-cyan-500' },
    { name: isRtl ? 'جاهزية الاستثمار' : 'Investment Readiness', score: 65, icon: CheckCircle2, color: 'bg-pink-500' },
  ];

  const recommendations = [
    {
      title: isRtl ? 'تسجيل براءة الاختراع' : 'File Provisional Patent',
      desc: isRtl ? 'درجة الملكية الفكرية منخفضة. احجز موعداً مع عيادة الملكية الفكرية.' : 'Your IP readiness is low. Book a session with the IP Clinic.',
      type: 'critical'
    },
    {
      title: isRtl ? 'تطوير الخطة المالية' : 'Enhance Financial Projections',
      desc: isRtl ? 'تحتاج التوقعات المالية لمزيد من التفصيل قبل عرضها على المستثمرين.' : 'Financial projections need more granularity before investor pitches.',
      type: 'warning'
    },
    {
      title: isRtl ? 'تحديث نموذج العمل' : 'Update Business Model Canvas',
      desc: isRtl ? 'نموذج العمل جيد، لكن يمكنك تحسين قسم قنوات التوزيع.' : 'Solid business model, but distribution channels can be optimized.',
      type: 'suggestion'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Overview Card */}
      <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <div className="relative flex-shrink-0 w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
              className="text-primary transition-all duration-1000 ease-out"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * overallScore) / 100}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-text-primary">{overallScore}</span>
            <span className="text-sm text-text-secondary">/ 100</span>
          </div>
        </div>
        <div className="flex-1 text-center md:text-start">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {isRtl ? 'جاهزية شركتك الناشئة' : 'Startup Readiness Score'}
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            {isRtl 
              ? 'أنت على الطريق الصحيح! الشركة تمتلك فريقاً ممتازاً وفكرة مبتكرة. ركز على تحسين الجوانب المالية والملكية الفكرية لرفع فرص حصولك على استثمار.' 
              : "You're on the right track! Your team is strong and the idea is highly innovative. Focus on improving your financial and IP readiness to secure investment."}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-lg text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            {isRtl ? 'أعلى من 70% من الشركات الأخرى' : 'Top 30% among peers'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Criteria List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            {isRtl ? 'معايير التقييم' : 'Evaluation Criteria'}
          </h3>
          <div className="space-y-5">
            {criteria.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-text-primary text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-text-secondary">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-2.5 rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              {isRtl ? 'توصيات الذكاء الاصطناعي' : 'AI Recommendations'}
            </h3>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className={`p-4 rounded-xl border ${
                rec.type === 'critical' ? 'bg-red-50 border-red-100' :
                rec.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'
              }`}>
                <div className="flex items-start gap-3">
                  {rec.type === 'critical' && <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                  {rec.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />}
                  {rec.type === 'suggestion' && <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />}
                  
                  <div>
                    <h4 className={`font-semibold text-sm ${
                      rec.type === 'critical' ? 'text-red-700' :
                      rec.type === 'warning' ? 'text-amber-700' : 'text-blue-700'
                    }`}>
                      {rec.title}
                    </h4>
                    <p className={`text-xs mt-1 ${
                      rec.type === 'critical' ? 'text-red-600' :
                      rec.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {rec.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StartupProfile;
