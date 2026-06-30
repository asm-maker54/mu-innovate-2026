import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Handshake, Rocket, TrendingUp, GraduationCap, Heart, ArrowLeft } from 'lucide-react';

const JoinUs = () => {
  const roles = [
    {
      id: '01',
      roleKey: 'speaker',
      title: 'متحدث',
      icon: Mic2,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      btnBg: 'bg-blue-600',
      borderColor: '#3b82f6',
      glowColor: 'rgba(59,130,246,0.15)',
    },
    {
      id: '02',
      roleKey: 'startup',
      title: 'شركات ناشئة',
      icon: Rocket,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      btnBg: 'bg-purple-600',
      borderColor: '#9333ea',
      glowColor: 'rgba(147,51,234,0.15)',
    },
    {
      id: '03',
      roleKey: 'investor',
      title: 'مستثمر',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      btnBg: 'bg-emerald-600',
      borderColor: '#059669',
      glowColor: 'rgba(5,150,105,0.15)',
    },
    {
      id: '04',
      roleKey: 'mentor',
      title: 'مدرب',
      icon: GraduationCap,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      btnBg: 'bg-amber-500',
      borderColor: '#f59e0b',
      glowColor: 'rgba(245,158,11,0.15)',
    },
  ];

  return (
    <section className="relative -mt-12 sm:-mt-16 lg:-mt-20 pb-16 font-cairo z-20" dir="rtl">
      <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8 relative -translate-x-4 lg:-translate-x-32 xl:-translate-x-48">
        
        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div 
                key={role.id} 
                className="bg-white rounded-2xl p-5 lg:p-6 border border-gray-100 transition-all duration-500 flex flex-col items-center text-center group cursor-pointer h-full relative overflow-hidden"
                style={{
                  borderTop: `4px solid ${role.borderColor}`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 40px ${role.glowColor}, 0 4px 12px rgba(0,0,0,0.08)`;
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Subtle bg glow */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl pointer-events-none"
                  style={{ backgroundColor: role.borderColor }}
                />

                {/* Icon */}
                <div className="mb-4 relative z-10">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${role.iconBg} ${role.iconColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 mx-auto shadow-sm`}>
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 mb-5 w-full flex items-center justify-center relative z-10">
                  <h3 className="font-black text-[16px] lg:text-[17px] text-[#111827] group-hover:text-gray-900 transition-colors">
                    {role.title}
                  </h3>
                </div>

                {/* Button */}
                <Link 
                  to={`/register?role=${role.roleKey}`}
                  className={`relative z-10 mt-auto w-full flex items-center justify-center gap-1.5 text-[12px] lg:text-[13px] font-bold text-white py-2.5 lg:py-3 rounded-xl ${role.btnBg} transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-110`}
                >
                  <span>سجل اهتمامك</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                </Link>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default JoinUs;
