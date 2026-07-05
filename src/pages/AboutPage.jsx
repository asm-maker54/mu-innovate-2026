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
      
      {/* Cinematic Banner Header */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/summit_networking.png')" }}
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/80" />
        
        {/* Centered Content */}
        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs mb-4 border border-blue-500/30 backdrop-blur-md">
            {isRtl ? 'قمة جامعة المنيا للابتكار وريادة الأعمال 2026' : 'Minia University Innovation Summit 2026'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
            {isRtl ? 'عن القمة والمركز' : 'About the Summit & Center'}
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mt-6 shadow-lg shadow-blue-500/50" />
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
