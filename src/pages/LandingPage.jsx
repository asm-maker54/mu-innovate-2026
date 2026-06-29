import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, Pause, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExhibitionTracks from '../components/ExhibitionTracks';
import Speakers from '../components/Speakers';
import JoinUs from '../components/JoinUs';
import LeadershipSpeeches from '../components/LeadershipSpeeches';
import DigitalPlatform from '../components/DigitalPlatform';
import InnovationCenters from '../components/InnovationCenters';
import Statistics from '../components/Statistics';
import FeaturesBanner from '../components/FeaturesBanner';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Slideshow for the main hero image
  const heroImages = [
    '/summit_hero.png',
    '/summit_expo.png',
    '/summit_pitch.png',
    '/summit_workshop.png',
    '/summit_networking.png',
    '/summit_awards.png',
    '/summit_community.png',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, heroImages.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Chic Poster Style */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#0f172a] min-h-[90vh] flex items-center justify-center font-cairo">
        {/* Dynamic Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Background ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out transform ${
                currentSlide === idx ? 'opacity-40 scale-100' : 'opacity-0 scale-110'
              }`}
            />
          ))}
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/60 to-[#0f172a]" />
        </div>

        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-pulse z-0" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse z-0" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse z-0" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center text-center">
          
          {/* Animated Badge */}
          <div className="mb-6 animate-[bounce_3s_infinite]">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 px-6 py-2 rounded-full font-bold tracking-wider uppercase text-sm shadow-xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
              {isRtl ? 'بوابة المستقبل' : 'The Gateway to the Future'}
            </span>
          </div>

          {/* Main Title with Gradient & Animations */}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black mb-6 leading-[1.2] drop-shadow-2xl cursor-default group">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400 transition-transform duration-700 group-hover:scale-105 inline-block">
              {isRtl ? 'منصة جامعة المنيا' : 'Minia University Platform'}
            </div>
            <br/>
            <div className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 mt-2 transition-transform duration-700 delay-75 group-hover:scale-105 inline-block">
              {isRtl ? 'للابتكار وريادة الأعمال' : 'For Innovation & Entrepreneurship'}
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-blue-100/90 font-bold max-w-4xl mb-12 leading-relaxed drop-shadow-md">
            {isRtl 
              ? 'الوجهة الأولى لاحتضان أفكارك، تطوير مشاريعك، وربطك مع عالم الأعمال والصناعة لتحويل الحلم إلى واقع ملموس.'
              : 'The premier destination to incubate your ideas, develop your projects, and connect you with the business world to turn dreams into reality.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link
              to="/join"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-black text-lg hover:from-blue-500 hover:to-blue-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all duration-300 flex items-center justify-center gap-3 border border-blue-400/30"
            >
              {isRtl ? 'انضم إلى المنصة الآن' : 'Join the Platform Now'}
              <ArrowRight className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 text-yellow-300" />
              {isRtl ? 'استكشف الفرص' : 'Explore Opportunities'}
            </Link>
          </div>

          {/* Slideshow Controls (Subtle) */}
          <div className="mt-16 flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-xl">
            <button onClick={() => setIsPaused(!isPaused)} className="text-white/70 hover:text-white transition-colors">
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentSlide === idx ? 'bg-blue-400 w-8 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>




      {/* Leadership Speeches Section */}
      <div id="leadership-speeches">
        <LeadershipSpeeches />
      </div>

      {/* Digital Platform Section */}
      <div id="digital-platform">
        <DigitalPlatform />
      </div>

      {/* Speakers Section */}
      <div id="speakers">
        <Speakers />
      </div>

      {/* Join Us Section */}
      <div id="join-us">
        <JoinUs />
      </div>

      {/* Statistics Section */}
      <div id="statistics">
        <Statistics />
      </div>

      {/* Exhibition Tracks Section */}
      <div id="tracks">
        <ExhibitionTracks />
      </div>

      {/* Features Banner Section */}
      <div id="features">
        <FeaturesBanner />
      </div>

      {/* Innovation Centers Section */}
      <div id="innovation-centers">
        <InnovationCenters />
      </div>

    </div>
  );
};

export default LandingPage;
