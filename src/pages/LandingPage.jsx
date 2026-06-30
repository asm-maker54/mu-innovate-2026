import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, Pause, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VisionMission from '../components/VisionMission';
import ComingSoonBanner from '../components/ComingSoonBanner';
import NewsSection from '../components/NewsSection';
import SponsorsSection from '../components/SponsorsSection';
import Speakers from '../components/Speakers';
import JoinUs from '../components/JoinUs';
import LeadershipSpeeches from '../components/LeadershipSpeeches';
import ExhibitionTracks from '../components/ExhibitionTracks';
import RegistrationForm from '../components/RegistrationForm';

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

  // Countdown State
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, heroImages.length]);

  useEffect(() => {
    const target = new Date('2026-11-01T09:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) { clearInterval(timer); return; }
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Slideshow + Info Card */}
      <section className="relative py-8 overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a1040]">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-[95rem] mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse gap-4 items-stretch">
            
            {/* Left: Main Showcase Slideshow */}
            <div className="flex-1 lg:flex-[3] relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 aspect-[16/9] bg-gray-900">
                {heroImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Summit slide ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      currentSlide === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Bottom controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                </div>

                {/* Slide dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlide === idx ? 'bg-white w-8' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Branding overlay */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                    <span className="text-white font-bold text-sm">MU Innovate 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info Card */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col h-full">
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/summit_community.png"
                    alt="Summit Community"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between" dir="rtl">
                  <div>
                    <h1 className="text-white text-2xl md:text-3xl font-bold leading-snug mb-3">
                      أول قمة للابتكار وريادة الأعمال في صعيد مصر
                    </h1>
                    <p className="text-blue-200/80 text-sm leading-relaxed mb-6">
                      قمة جامعة المنيا للابتكار وريادة الأعمال 2026. انضم إلينا في نوفمبر 2026.
                    </p>
                  </div>

                  {/* Countdown Timer */}
                  <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3">
                    <span className="text-amber-400 font-black text-sm">العد التنازلي للقمة:</span>
                    <div className="flex items-center gap-3" dir="ltr">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-950/80 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/5 tabular-nums">
                          {String(days).padStart(2, '0')}
                        </div>
                        <span className="text-blue-200/60 text-xs mt-1.5 font-bold">يوم</span>
                      </div>
                      <span className="text-white/30 text-lg font-bold mb-5">:</span>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-950/80 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/5 tabular-nums">
                          {String(hours).padStart(2, '0')}
                        </div>
                        <span className="text-blue-200/60 text-xs mt-1.5 font-bold">ساعة</span>
                      </div>
                      <span className="text-white/30 text-lg font-bold mb-5">:</span>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-950/80 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/5 tabular-nums">
                          {String(minutes).padStart(2, '0')}
                        </div>
                        <span className="text-blue-200/60 text-xs mt-1.5 font-bold">دقيقة</span>
                      </div>
                      <span className="text-white/30 text-lg font-bold mb-5">:</span>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-950/80 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/5 tabular-nums">
                          {String(seconds).padStart(2, '0')}
                        </div>
                        <span className="text-blue-200/60 text-xs mt-1.5 font-bold">ثانية</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* Join Us Section (Overlapping Hero) */}
      <div id="join-us" className="relative z-20">
        <JoinUs />
      </div>

      {/* Vision & Mission Section */}
      <div id="vision-mission">
        <VisionMission />
      </div>

      {/* Coming Soon Banner */}
      <div id="coming-soon">
        <ComingSoonBanner />
      </div>

      {/* News & Announcements Section */}
      <div id="news-section">
        <NewsSection />
      </div>

      {/* Sponsors Section */}
      <div id="sponsors-section">
        <SponsorsSection />
      </div>

      {/* Leadership Speeches Section */}
      <div id="leadership-speeches">
        <LeadershipSpeeches />
      </div>

      {/* Speakers Section */}
      <div id="speakers">
        <Speakers />
      </div>

      {/* Exhibition Tracks Section */}
      <div id="tracks">
        <ExhibitionTracks />
      </div>

      {/* Registration & Contact Form */}
      <div id="registration">
        <RegistrationForm />
      </div>

    </div>
  );
};

export default LandingPage;
