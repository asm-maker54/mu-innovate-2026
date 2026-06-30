import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Newspaper, ArrowRight } from 'lucide-react';
import { initialMockNews } from '../data/mockNews';

const NewsListPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-cairo" dir="rtl">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 transition-colors">
            <ArrowRight className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm mb-4">
            <Newspaper className="w-4 h-4" />
            المركز الإعلامي
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800">كل الأخبار والإعلانات</h1>
          <p className="text-slate-600 font-bold mt-4 text-lg">تصفح آخر الأخبار والمستجدات الخاصة بالجامعة والقمة.</p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialMockNews.map((item) => (
            <Link 
              to={`/news/${item.id}`}
              key={item.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
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
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(item.created_at).toLocaleDateString('ar-EG')}
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {item.content}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-auto w-fit">
                  اقرأ المزيد
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NewsListPage;
