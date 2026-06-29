import React from 'react';
import { BookOpen, Clock, Award, Users } from 'lucide-react';

const FeaturesBanner = () => {
  const features = [
    { 
      id: 1, 
      title: 'خبراء متخصصون', 
      desc: 'تعلم من خبراء الصناعة والمحترفين بمهارة.',
      icon: BookOpen 
    },
    { 
      id: 2, 
      title: 'تعلم بمرونة', 
      desc: 'ادرس في أي وقت وأي مكان وبالسرعة التي تناسبك.',
      icon: Clock 
    },
    { 
      id: 3, 
      title: 'شهادات معتمدة', 
      desc: 'احصل على شهادات لتعزيز فرصك المهنية بقوة.',
      icon: Award 
    },
    { 
      id: 4, 
      title: 'دعم مجتمعي', 
      desc: 'انضم لمجتمع المتعلمين وتطوروا معاً كفريق.',
      icon: Users 
    }
  ];

  return (
    <div className="bg-[#030712] py-8 relative overflow-hidden" dir="rtl">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[200px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-4">
        <div className="bg-gradient-to-r from-[#0b192c] via-[#0f2847] to-[#0b192c] rounded-[2rem] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between border border-blue-500/20 relative overflow-hidden group/banner hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-shadow duration-500">
          
          {/* Animated Shine Effect */}
          <div className="absolute top-0 -left-[100%] h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover/banner:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 w-full divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-white/10 text-right relative z-10">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.id} 
                  className="flex items-center gap-4 px-2 lg:px-6 py-4 lg:py-0 group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-[#162740] flex-shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(251,133,0,0.4)] border border-white/5 group-hover:border-[#fb8500]/50 group-hover:bg-[#1a365d]">
                    <Icon className="w-7 h-7 text-[#fb8500] group-hover:text-[#ffb703] transition-colors duration-300" strokeWidth={2} />
                  </div>
                  {/* Text Content */}
                  <div className="flex flex-col items-start justify-center text-right">
                    <h4 className="font-bold text-white text-[15px] lg:text-base mb-1 text-right w-full group-hover:text-blue-100 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-xs lg:text-sm leading-relaxed max-w-[200px] text-right w-full group-hover:text-gray-300 transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeaturesBanner;
