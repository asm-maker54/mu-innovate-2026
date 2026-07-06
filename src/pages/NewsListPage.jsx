import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Newspaper, ArrowRight, User } from 'lucide-react';
import { initialMockNews } from '../data/mockNews';
import FadeInView from '../components/FadeInView';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const NewsListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data && data.length > 0) {
            setNews(data);
            return;
          }
        }
      } catch (err) {
        console.error("Error loading news from Supabase:", err);
      }

      const local = localStorage.getItem('local_news');
      if (local) {
        try {
          setNews(JSON.parse(local));
          return;
        } catch (e) {
          console.error(e);
        }
      }

      localStorage.setItem('local_news', JSON.stringify(initialMockNews));
      setNews(initialMockNews);
    };

    fetchNews();
  }, []);

  const categories = [
    { id: 'all', label: 'جميع الأخبار' },
    { id: 'announcement', label: 'إعلانات هامة' },
    { id: 'events', label: 'فعاليات القمة' },
    { id: 'achievements', label: 'إنجازات وابتكارات' },
  ];

  const getCategoryTag = (id) => {
    switch (id) {
      case '1': return { label: 'فعاليات القمة', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
      case '2': return { label: 'إعلانات هامة', color: 'bg-amber-50 text-amber-700 border-amber-100' };
      case '3': return { label: 'إنجازات وابتكارات', color: 'bg-blue-50 text-blue-700 border-blue-100' };
      default: return { label: 'فعاليات القمة', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    }
  };

  const featuredNews = news[0];
  const remainingNews = news.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 pt-28 pb-20 font-cairo relative overflow-hidden" dir="rtl">
      {/* Decorative blurred backgrounds - faint on light theme */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold mb-6 transition-colors group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            العودة للرئيسية
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-bold text-sm mb-4">
                <Newspaper className="w-4 h-4" />
                المركز الإعلامي
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">أحدث الأخبار والتغطيات</h1>
              <p className="text-slate-600 font-medium text-lg max-w-2xl">تابع آخر التطورات والقصص الملهمة والفعاليات الجارية بقمة جامعة المنيا للابتكار وريادة الأعمال.</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur-md self-start md:self-end">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article Section */}
        {featuredNews && selectedCategory === 'all' && (
          <FadeInView delay={100}>
            <div className="mb-16">
              <h2 className="text-xl font-black text-orange-600 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
                الخبر الأبرز اليوم
              </h2>
              
              <Link 
                to={`/news/${featuredNews.id}`}
                className="group block bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/80 hover:border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                  {/* Image Container */}
                  <div className="relative h-72 lg:h-auto min-h-[350px] overflow-hidden">
                    <img 
                      src={featuredNews.image_url} 
                      alt={featuredNews.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <div className={`absolute top-6 right-6 border px-4 py-1.5 rounded-full text-xs font-black shadow-lg ${getCategoryTag(featuredNews.id).color} bg-white/95 backdrop-blur-sm`}>
                      {getCategoryTag(featuredNews.id).label}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-slate-500 text-sm font-bold mb-6">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-600" /> {new Date(featuredNews.created_at).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-blue-600" /> {featuredNews.uploader_name}</span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-black leading-tight text-slate-900 mb-6 group-hover:text-orange-600 transition-colors">
                        {featuredNews.title}
                      </h3>

                      <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-8 font-medium">
                        {featuredNews.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-4 transition-all">
                      <span>عرض تفاصيل الخبر واستكمال القراءة</span>
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </FadeInView>
        )}

        {/* Regular News Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-500 mb-6">باقي التغطيات والأخبار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingNews.map((item, idx) => (
              <FadeInView key={item.id} delay={150 * idx}>
                <Link 
                  to={`/news/${item.id}`}
                  className="bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 hover:border-slate-350 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 right-4 border px-3.5 py-1 rounded-full text-xs font-black shadow-lg ${getCategoryTag(item.id).color} bg-white/95 backdrop-blur-sm`}>
                      {getCategoryTag(item.id).label}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-slate-500 text-xs font-bold mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {new Date(item.created_at).toLocaleDateString('ar-EG')}</span>
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-600" /> {item.uploader_name}</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                        {item.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-orange-600 font-bold text-sm group-hover:gap-3 transition-all">
                      <span>عرض الخبر</span>
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsListPage;
