import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, ArrowLeft } from 'lucide-react';

const ExhibitionTracks = () => {
  const exhibitions = [
    {
      id: 1,
      title: 'معرض الابتكارات الرقمية',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      description: 'إبراز التطبيقات، المنصات الرقمية، مشروعات الذكاء الاصطناعي، الأمن السيبراني، ولوحات البيانات المصممة بأيدي الطلاب.',
      color: 'bg-[#3b125b]',
      lightColor: 'bg-[#3b125b]/5'
    },
    {
      id: 2,
      title: 'معرض الوحدات الإنتاجية',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      description: 'حصر وعرض ما بين 100 إلى 150 منتجاً وخدمة جامعية، وربطها ببطاقات تسويقية موحدة (توضح السعر، التكلفة، وجاهزية قنوات البيع).',
      color: 'bg-[#0d47a1]',
      lightColor: 'bg-[#0d47a1]/5'
    },
    {
      id: 3,
      title: 'كتالوج المنتجات والخدمات',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
      description: 'استعرض كتالوج شامل يضم كافة المنتجات والخدمات المبتكرة التي تقدمها وحدات الجامعة المختلفة وتفاصيلها.',
      color: 'bg-[#0f766e]',
      lightColor: 'bg-[#0f766e]/5'
    },
    {
      id: 4,
      title: 'الحجز والمشاركة',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800',
      description: 'بادر بحجز مساحتك الخاصة للمشاركة في المعارض القادمة وعرض منتجاتك وابتكاراتك أمام آلاف الزوار والمهتمين.',
      color: 'bg-[#b91c1c]',
      lightColor: 'bg-[#b91c1c]/5'
    },
    {
      id: 5,
      title: 'عرض الصور والفيديوهات',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800',
      description: 'مكتبة وسائط مرئية غنية توثق فعاليات المعارض والابتكارات من خلال الصور والفيديوهات الحصرية للقمة.',
      color: 'bg-[#a21caf]',
      lightColor: 'bg-[#a21caf]/5'
    }
  ];

  return (
    <section id="tracks" className="py-24 bg-gray-50 relative" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title matched from Slide */}
        <div className="mb-14 text-center sm:text-right">
          <div className="inline-flex items-center gap-3 bg-[#0a4d3c] text-white px-6 py-4 rounded-2xl shadow-lg w-full sm:w-auto justify-center sm:justify-start">
            <h2 className="text-2xl sm:text-3xl font-bold">
              المعارض والمنتجات
            </h2>
            <Lightbulb className="w-8 h-8 text-yellow-300" />
          </div>
        </div>

        {/* Exhibition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {exhibitions.map((exhibition) => (
            <div 
              key={exhibition.id} 
              className="bg-white rounded-3xl rounded-tl-[4rem] overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col group hover:-translate-y-2 transition-all duration-300 pb-2"
            >
              {/* Image Container with Floating Category */}
              <div className="relative h-64 overflow-hidden rounded-tl-[4rem]">
                <img 
                  src={exhibition.image} 
                  alt={exhibition.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                
                {/* Floating Tag */}
                <div className="absolute bottom-4 right-4 bg-[#0a192f] text-white text-sm font-bold py-1.5 px-4 rounded-lg shadow-md">
                  {exhibition.title}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 xl:p-8 flex-1 flex flex-col">
                <h3 className="font-black text-xl lg:text-2xl text-[#0a192f] mb-3 leading-snug group-hover:text-[#ea580c] transition-colors">
                  {exhibition.title}
                </h3>
                
                <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-1 text-[15px]">
                  {exhibition.description}
                </p>
                
                {/* Read More Link */}
                <div className="mt-auto">
                  <Link 
                    to={exhibition.id === 3 ? "/applied-research" : `/exhibition/${exhibition.id}`}
                    className="inline-flex items-center gap-2 text-[#ea580c] font-bold text-[15px] hover:text-[#c2410c] transition-colors group/link"
                  >
                    <span>التفاصيل</span>
                    <ArrowLeft className="w-4 h-4 transform group-hover/link:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              {/* Bottom Orange Border Accent */}
              <div className="h-1 w-0 bg-[#ea580c] group-hover:w-full transition-all duration-500 mx-auto rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExhibitionTracks;
