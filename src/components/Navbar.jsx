import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, ChevronDown, User, ArrowLeft } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(isRtl ? 'en' : 'ar');
  };

  const navLinks = [
    {
      title: 'الرئيسية',
      titleEn: 'Home',
      href: '/'
    },
    {
      title: 'من نحن',
      titleEn: 'About Us',
      href: '/about-us'
    },
    {
      title: 'قمة الابتكار',
      titleEn: 'Innovation Summit',
      href: '/about',
      dropdown: [
        { label: 'الرؤية والرسالة', labelEn: 'Vision & Mission', href: '/about' },
        { label: 'فريق العمل', labelEn: 'Team', href: '/team' },
        { label: 'أثر القمة', labelEn: 'Summit Impact', href: '/about#impact' },
        { label: 'مخرجات القمة', labelEn: 'Summit Outputs', href: '/about#outputs' },
        { label: 'قصص النجاح', labelEn: 'Success Stories', href: '/success-stories' },
        { label: 'شركاء النجاح', labelEn: 'Stakeholders', href: '/stakeholders' },
        { label: 'الأجندة', labelEn: 'Agenda', href: '/agenda' },
        { label: 'مجتمعنا', labelEn: 'Our Community', href: '/join' }
      ]
    },
    {
      title: 'شركة نماء',
      titleEn: 'Namaa Company',
      href: '/namaa'
    },
    {
      title: 'تسويق البحوث',
      titleEn: 'Applied Research',
      href: '/applied-research'
    },
    {
      title: 'البرامج',
      titleEn: 'Programs',
      href: '/programs'
    },
    {
      title: 'المبادرات',
      titleEn: 'Initiatives',
      dropdown: [
        { label: 'شبكة المدربين الرقمية', labelEn: 'Digital Mentors', href: '/digital-mentors' },
        { label: 'مبادرة الابتكار الأخضر والاستدامة', labelEn: 'Green Innovation & Sustainability', href: '/green-innovation' }
      ]
    },
    {
      title: 'الملتقيات',
      titleEn: 'Fairs & Forums',
      dropdown: [
        { label: 'ملتقى التوظيف', labelEn: 'Employment Fair', href: '/employment-fair' },
        { label: 'ملتقى الخريجين', labelEn: 'Alumni Fair', href: '/alumni-fair' },
        { label: 'ملتقى مشروعات التخرج', labelEn: 'Graduation Projects', href: '/graduation-projects' }
      ]
    },
    {
      title: 'المعارض',
      titleEn: 'Exhibitions',
      dropdown: [
        { label: 'معرض الابتكارات الرقمية', labelEn: 'Digital Innovations Expo', href: '/exhibition/1' },
        { label: 'معرض منتجات الوحدات الإنتاجية', labelEn: 'Productive Units Expo', href: '/exhibition/4' }
      ]
    }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-md ${
      isScrolled ? 'h-20' : 'h-24'
    } border-b border-gray-200`} dir={isRtl ? 'rtl' : 'ltr'}>
      


      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center relative z-10">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 h-full pt-1 pb-1">
          <img src="/mina.png" alt="Minia University Logo" className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 object-contain drop-shadow-md" />
          <div className="flex flex-col justify-center text-[#111827]">
            <span className={`font-black text-sm md:text-base xl:text-lg leading-tight whitespace-nowrap`}>
              {isRtl ? 'منصة جامعة المنيا' : 'Minia University Platform'}
            </span>
            <span className={`font-bold text-sm md:text-base xl:text-lg leading-tight text-gray-600 whitespace-nowrap`}>
              {isRtl ? 'للابتكار وريادة الأعمال' : 'Innovation & Entrepreneurship'}
            </span>
          </div>
        </Link>

        {/* Desktop Menu - Buttons */}
        <div className="hidden lg:flex items-center h-full gap-2 xl:gap-3 flex-1 justify-start lg:ms-12 xl:ms-24 px-4">
          {navLinks.map((link, idx) => (
            <div key={idx} className="relative group h-full flex items-center">
              {/* Button Header */}
              {link.dropdown ? (
                <div className="px-3 xl:px-4 py-2.5 bg-white border border-gray-200 rounded-xl flex items-center gap-1 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:border-transparent hover:shadow-md hover:-translate-y-0.5 shadow-sm group/btn">
                  <span className="font-bold text-xs xl:text-[15px] text-[#111827] group-hover/btn:text-white transition-colors whitespace-nowrap">
                    {isRtl ? link.title : link.titleEn}
                  </span>
                  <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 text-gray-500 group-hover/btn:text-white group-hover/btn:rotate-180 transition-all duration-300" />
                </div>
              ) : (
                <a href={link.href} className="px-3 xl:px-4 py-2.5 bg-white border border-gray-200 rounded-xl flex items-center gap-1 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:border-transparent hover:shadow-md hover:-translate-y-0.5 shadow-sm group/btn">
                  <span className="font-bold text-xs xl:text-[15px] text-[#111827] group-hover/btn:text-white transition-colors whitespace-nowrap">
                    {isRtl ? link.title : link.titleEn}
                  </span>
                </a>
              )}
              
              {/* Dropdown Menu */}
              {link.dropdown && (
                <div className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-56 z-50 pt-2`}>
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col p-2">
                    {link.dropdown.map((item, i) => (
                      <a key={i} href={item.href} className="px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#111827] rounded-lg transition-colors flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="w-4 h-4 text-gray-400 group-hover/item:text-[#111827]" />}
                          <span>{isRtl ? item.label : item.labelEn}</span>
                        </div>
                        <ArrowLeft className={`w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all ${!isRtl && 'rotate-180 translate-x-2 group-hover/item:translate-x-0'}`} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Left Actions */}
        <div className="hidden lg:flex items-center gap-5 pl-2 h-full">
          <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 font-bold text-sm transition-colors text-gray-500 hover:text-[#111827]`}
          >
            <span>{isRtl ? 'EN' : 'عربي'}</span>
            <Globe className="w-4 h-4" />
          </button>

          <Link 
            to="/auth" 
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all bg-[#111827] text-white hover:bg-slate-800 shadow-md whitespace-nowrap`}
          >
            <span>{isRtl ? 'تسجيل الدخول' : 'Login'}</span>
            <User className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-50 p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={`w-7 h-7 ${mobileMenuOpen ? 'text-gray-900' : 'text-white'}`} />
          ) : (
            <Menu className={`w-7 h-7 text-white`} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 lg:hidden flex flex-col pt-24 px-6 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-6 overflow-y-auto pb-20">
          {navLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col border-b border-gray-100 pb-4">
              <span className="font-black text-2xl text-gray-900 mb-4">{isRtl ? link.title : link.titleEn}</span>
              {link.dropdown && (
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-blue-100 ml-2">
                  {link.dropdown.map((item, i) => (
                    <a key={i} href={item.href} className="flex items-center gap-3 text-gray-600 font-bold text-lg hover:text-blue-600">
                      {item.icon && <item.icon className="w-5 h-5 text-blue-500" />}
                      <span>{isRtl ? item.label : item.labelEn}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex flex-col gap-4 mt-4">
            <button onClick={toggleLanguage} className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 rounded-xl font-bold text-gray-900">
              <Globe className="w-5 h-5" />
              {isRtl ? 'English' : 'عربي'}
            </button>
            <Link 
              to="/auth" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#111827] text-white rounded-xl font-bold text-lg"
            >
              <User className="w-5 h-5" />
              {isRtl ? 'تسجيل الدخول' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
