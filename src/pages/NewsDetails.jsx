import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialMockNews } from '../data/mockNews';
import { Calendar, Clock, User, ArrowRight, Share2, Award } from 'lucide-react';
import FadeInView from '../components/FadeInView';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [otherNews, setOtherNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNewsItem = async () => {
      let newsList = [];
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error) {
            if (data && data.length > 0) {
              newsList = data;
            } else {
              // Seed default news
              const newsToSeed = initialMockNews.map(n => ({
                title: n.title,
                content: n.content,
                image_url: n.image_url,
                uploader_name: n.uploader_name
              }));
              const { data: seededNews, error: seedNewsErr } = await supabase
                .from('news')
                .insert(newsToSeed)
                .select();
              if (!seedNewsErr && seededNews) {
                newsList = seededNews;
              }
            }
          }
        }
      } catch (err) {
        console.error("Error loading news details from Supabase:", err);
      }

      if (newsList.length === 0) {
        const local = localStorage.getItem('local_news');
        if (local) {
          try {
            newsList = JSON.parse(local);
          } catch (e) {
            console.error(e);
          }
        }
      }

      if (newsList.length === 0) {
        newsList = initialMockNews;
      }

      let foundNews = newsList.find(n => String(n.id) === String(id));
      
      // Fallback for old mock IDs ('1', '2', '3') if not found by string matching
      if (!foundNews && (id === '1' || id === '2' || id === '3')) {
        const index = parseInt(id) - 1;
        if (newsList[index]) {
          foundNews = newsList[index];
        }
      }
      
      setNewsItem(foundNews);
      
      // Filter other news to show in sidebar (up to 4 items)
      const filtered = newsList.filter(n => String(n.id) !== String(id) && (!foundNews || String(n.id) !== String(foundNews.id)));
      setOtherNews(filtered.slice(0, 4));
    };

    fetchNewsItem();
  }, [id]);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900" dir="rtl">
        <h2 className="text-2xl font-black text-slate-800 mb-4">الخبر غير موجود</h2>
        <Link to="/news" className="text-orange-600 font-bold hover:underline flex items-center gap-2">
          <ArrowRight className="w-5 h-5" /> العودة للأخبار
        </Link>
      </div>
    );
  }

  const newsDate = new Date(newsItem.created_at);
  const formattedDate = newsDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = newsDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  // Dynamically color category tag
  const getCategoryTag = (itemId) => {
    switch (itemId) {
      case '1': return { label: 'فعاليات القمة', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
      case '2': return { label: 'إعلانات هامة', color: 'bg-amber-50 text-amber-700 border-amber-100' };
      case '3': return { label: 'إنجازات وابتكارات', color: 'bg-blue-50 text-blue-700 border-blue-100' };
      default: return { label: 'فعاليات القمة', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 pt-24 pb-20 font-cairo relative overflow-hidden" dir="rtl">
      {/* Background blur decorative blobs - faint */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[350px] h-[350px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/news" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            العودة لجميع الأخبار
          </Link>
        </div>

        {/* Article Page Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Content (8 cols) */}
          <article className="lg:col-span-8 bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
            {/* Header Image */}
            {newsItem.image_url && (
              <div className="w-full h-[350px] sm:h-[450px] relative overflow-hidden">
                <img 
                  src={newsItem.image_url} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating category */}
                <div className={`absolute top-6 right-6 border px-4 py-1.5 rounded-full text-xs font-black shadow-lg ${getCategoryTag(newsItem.id).color} bg-white/95 backdrop-blur-sm`}>
                  {getCategoryTag(newsItem.id).label}
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="p-6 sm:p-10 lg:p-12">
              {/* Meta information tags */}
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-bold text-slate-500 mb-8 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {formattedDate}
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {formattedTime}
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <User className="w-4 h-4 text-blue-600" />
                  {newsItem.uploader_name}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight">
                {newsItem.title}
              </h1>

              {/* Description Content */}
              <div className="prose max-w-none text-slate-700">
                {newsItem.content.split('\n').map((paragraph, idx) => {
                  // Make the first paragraph distinct (lead paragraph)
                  if (idx === 0) {
                    return (
                      <p key={idx} className="text-lg sm:text-xl text-slate-900 leading-relaxed font-black mb-8 border-r-4 border-orange-500 pr-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return (
                    <p key={idx} className="text-base sm:text-lg leading-relaxed mb-6 text-slate-600 font-medium">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Callout section */}
              <div className="my-10 p-6 sm:p-8 bg-blue-50/50 border border-blue-100 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-blue-100/30 rounded-full -mt-8 -ml-8"></div>
                <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500 animate-pulse" />
                  تنويه هام من القمة
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  تأتي هذه التغطية في إطار رؤية جامعة المنيا لتعزيز بيئة الإبداع وريادة الأعمال، وتحفيز الابتكار لدى طلاب وخريجي الجامعات المصرية.
                </p>
              </div>

              {/* Footer Meta Details / Share */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-6 justify-between items-center">
                <span className="font-bold text-slate-500 text-sm">تم النشر بواسطة: {newsItem.uploader_name}</span>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: newsItem.title,
                        url: window.location.href
                      }).catch(err => console.log(err));
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('تم نسخ رابط الخبر بنجاح!');
                    }
                  }}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-orange-600/20 transition-all"
                >
                  <Share2 className="w-4 h-4" /> مشاركة الخبر
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar Section (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Other Latest News Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-lg">
              <h2 className="text-xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                أحدث الأخبار والتغطيات
              </h2>
              
              <div className="space-y-6">
                {otherNews.map((item) => (
                  <Link 
                    to={`/news/${item.id}`} 
                    key={item.id}
                    className="flex gap-4 group block hover:bg-slate-50 p-2 rounded-2xl transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 relative bg-slate-100">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">خبر</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">
                        {new Date(item.created_at).toLocaleDateString('ar-EG')}
                      </span>
                      <h4 className="font-bold text-sm text-slate-800 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions / Invitation Card - Gradient card on light background is great for highlighting */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -mt-8 -ml-8"></div>
              <h3 className="text-lg font-black mb-3">انضم إلينا في القمة</h3>
              <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6">
                كن جزءاً من الفعاليات وورش العمل والهاكاثون، وسجل اهتمامك الآن لحضور قمة جامعة المنيا للابتكار وريادة الأعمال.
              </p>
              <Link 
                to="/auth" 
                className="block text-center bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-600/20 transition-all"
              >
                تسجيل الدخول / إنشاء حساب
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
