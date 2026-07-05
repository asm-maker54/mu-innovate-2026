import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import VisionMission from '../components/VisionMission';
import ImpactNumbers from '../components/ImpactNumbers';
import SummitOutputs from '../components/SummitOutputs';

const AboutPage = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-[#f8fafc] font-cairo">
      
      {/* Premium About Hero Header */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0b1329] via-[#0f1d3a] to-[#1e1136] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 font-bold text-xs mb-6 border border-blue-500/20 backdrop-blur-md">
            <span>{isRtl ? 'عن قمة الابتكار' : 'About the Summit'}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
            {isRtl ? 'الرؤية والرسالة وأهداف القمة' : 'Vision, Mission & Objectives'}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-loose font-bold mb-12">
            {isRtl 
              ? 'الخطة الاستراتيجية لجامعة المنيا لبناء بيئة ريادية رائدة في صعيد مصر، لتمكين العقول المبتكرة وتوطين التكنولوجيا وحماية الأصول المعرفية.'
              : 'The strategic roadmap of Minia University to build a leading startup ecosystem in Upper Egypt, empowering innovators and securing knowledge assets.'}
          </p>

          {/* Key pillars summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-right" dir={isRtl ? 'rtl' : 'ltr'}>
            {[
              { num: '01', title: isRtl ? 'توطين المعرفة' : 'Knowledge Transfer', desc: isRtl ? 'ربط الأبحاث والمشاريع الأكاديمية باحتياجات السوق الحقيقية.' : 'Connecting academic research with industrial market needs.' },
              { num: '02', title: isRtl ? 'حماية الابتكار' : 'IP Protection', desc: isRtl ? 'تسهيل تسجيل براءات الاختراع والملكية الفكرية للمبتكرين.' : 'Filing patents and trademarks for scientific innovations.' },
              { num: '03', title: isRtl ? 'التمويل والشراكة' : 'Funding & VCs', desc: isRtl ? 'فتح قنوات تواصل مباشرة بين رواد الأعمال وجهات الاستثمار.' : 'Matching startups with investors and venture capital.' }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                <span className="text-3xl font-black text-blue-400 block mb-2">{pillar.num}</span>
                <h4 className="text-lg font-black text-white mb-2">{pillar.title}</h4>
                <p className="text-slate-300 text-sm font-bold leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission underneath */}
      <VisionMission />

      {/* Summit Outputs */}
      <div id="outputs">
        <SummitOutputs />
      </div>

      {/* Impact Numbers */}
      <div id="impact">
        <ImpactNumbers />
      </div>
    </div>
  );
};

export default AboutPage;
