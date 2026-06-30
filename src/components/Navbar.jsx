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
        { label: 'الأجندة', labelEn: 'Agenda', href: '/agenda' }
      ]
    },
    {
      title: 'شركة نماء',
      titleEn: 'Namaa Company',
      href: '/namaa'
    },
    {
      title: 'تسويق البحوث ومشروعات التخرج',
      titleEn: 'Research & Graduation Projects',
      dropdown: [
        { label: 'تسويق البحوث', labelEn: 'Applied Research', href: '/applied-research' },
        { label: 'مشروعات التخرج', labelEn: 'Graduation Projects', href: '/graduation-projects' }
      ]
    },
    {
      title: 'المبادرات والبرامج',
      titleEn: 'Programs & Initiatives',
      dropdown: [
        { label: 'البرامج', labelEn: 'Programs', href: '/programs' },
        { label: 'شبكة المدربين الرقمية', labelEn: 'Digital Mentors', href: '/digital-mentors' },
        { label: 'الابتكار الأخضر', labelEn: 'Green Innovation', href: '/green-innovation' }
      ]
    },
    {
      title: 'الفعاليات والمعارض',
      titleEn: 'Events & Exhibitions',
      dropdown: [
        { label: 'ملتقى التوظيف', labelEn: 'Employment Fair', href: '/employment-fair' },
        { label: 'ملتقى الخريجين', labelEn: 'Alumni Fair', href: '/alumni-fair' },
        { label: 'معرض الابتكارات', labelEn: 'Digital Expo', href: '/exhibition/1' },
        { label: 'معرض الوحدات', labelEn: 'Productive Units', href: '/exhibition/4' }
      ]
    }
  ];

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white shadow-md ${
      isScrolled ? 'h-20' : 'h-24'
    } border-b border-gray-200`} dir={isRtl ? 'rtl' : 'ltr'}>
      


      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center relative z-10">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 h-full pt-1 pb-1">
          <img src="/mina.png" alt="Minia University Logo" className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 object-contain drop-shadow-md" />
          <div className="flex flex-col justify-center text-[#111827]">
            <span className={`font-black text-xs md:text-sm xl:text-base leading-tight whitespace-nowrap`}>
              {isRtl ? 'منصة جامعة المنيا' : 'Minia University Platform'}
            </span>
            <span className={`font-bold text-xs md:text-sm xl:text-base leading-tight text-gray-600 whitespace-nowrap`}>
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
                <div className="px-1 xl:px-2 py-2 flex items-center gap-1 cursor-pointer transition-colors duration-300 group/btn">
                  <span className="font-bold text-[11px] xl:text-[13px] text-gray-700 group-hover/btn:text-blue-600 whitespace-nowrap">
                    {isRtl ? link.title : link.titleEn}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-400 group-hover/btn:text-blue-600 group-hover/btn:rotate-180 transition-all duration-300" />
                </div>
              ) : (
                <a href={link.href} className="px-1 xl:px-2 py-2 flex items-center gap-1 cursor-pointer transition-colors duration-300 group/btn">
                  <span className="font-bold text-[11px] xl:text-[13px] text-gray-700 group-hover/btn:text-blue-600 whitespace-nowrap">
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
          <Link 
            to="/contact"
            className="flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs transition-all bg-[#ea580c] text-white hover:bg-[#c2410c] shadow-md whitespace-nowrap hidden sm:flex"
          >
            <span>{isRtl ? 'تواصل معنا' : 'Contact Us'}</span>
          </Link>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all bg-[#26462C]/10 text-[#26462C] hover:bg-[#26462C] hover:text-[#F4A217] border border-[#26462C]/20 shadow-sm whitespace-nowrap"
          >
            <span>{isRtl ? 'English' : 'عربي'}</span>
            <Globe className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-50 p-2 text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7 text-gray-900" />
          ) : (
            <Menu className="w-7 h-7 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 lg:hidden flex flex-col pt-24 px-6 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Dedicated Close Button inside Overlay */}
        <button 
          className="absolute top-6 left-6 p-2 bg-gray-100 rounded-full text-gray-900 hover:bg-gray-200 transition-colors z-[70] shadow-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col gap-6 overflow-y-auto pb-20">
          {navLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col border-b border-gray-100 pb-4">
              {link.href && !link.dropdown ? (
                <a href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-black text-2xl text-gray-900 mb-4 block">
                  {isRtl ? link.title : link.titleEn}
                </a>
              ) : (
                <span className="font-black text-2xl text-gray-900 mb-4 block">
                  {isRtl ? link.title : link.titleEn}
                </span>
              )}
              {link.dropdown && (
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-blue-100 ml-2">
                  {link.dropdown.map((item, i) => (
                    <a key={i} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-600 font-bold text-lg hover:text-blue-600">
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
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#ea580c] text-white rounded-xl font-bold text-lg hover:bg-[#c2410c] transition-colors"
            >
              {isRtl ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
