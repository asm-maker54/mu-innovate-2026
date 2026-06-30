import React from 'react';
import { ArrowLeft, Calendar, ChevronRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialMockNews } from '../data/mockNews';

const NewsSection = () => {
  const news = initialMockNews;

  return (
    <section className="py-10 md:py-12 bg-slate-50 relative overflow-hidden font-cairo" dir="rtl">
      {/* Decorative BG elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 transform origin-top-right pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm mb-4">
              <Newspaper className="w-4 h-4" />
              المركز الإعلامي
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800">
              الأخبار والإعلانات
            </h2>
          </div>
          <Link to="/news" className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors group bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md border border-slate-100">
            تصفح كل الأخبار
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link 
              to={`/news/${item.id}`}
              key={item.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Newspaper className="w-10 h-10 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-blue-700">
                  إعلانات هامة
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex justify-between items-center text-slate-500 text-sm font-medium mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.created_at).toLocaleDateString('ar-EG')}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {item.content}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors mt-auto w-fit">
                  اقرأ المزيد
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsSection;
