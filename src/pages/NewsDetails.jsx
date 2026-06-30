import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialMockNews } from '../data/mockNews';
import { Calendar, Clock, User, ArrowRight, Share2 } from 'lucide-react';

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    // In a real app, this would be a Supabase fetch:
    // supabase.from('news').select('*').eq('id', id).single()
    const foundNews = initialMockNews.find(n => n.id === id);
    setNewsItem(foundNews);
  }, [id]);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center" dir="rtl">
        <h2 className="text-2xl font-black text-slate-800 mb-4">الخبر غير موجود</h2>
        <Link to="/" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
          <ArrowRight className="w-5 h-5" /> العودة للرئيسية
        </Link>
      </div>
    );
  }

  const newsDate = new Date(newsItem.created_at);
  const formattedDate = newsDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = newsDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
          <ArrowRight className="w-5 h-5" />
          العودة للرئيسية
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Cover Image */}
          {newsItem.image_url && (
            <div className="w-full h-[400px] relative">
              <img 
                src={newsItem.image_url} 
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12 relative">
            {/* Meta tags floating over image if image exists */}
            <div className={`flex flex-wrap gap-4 text-sm font-bold mb-6 ${newsItem.image_url ? '-mt-16 relative z-10 text-white drop-shadow-md' : 'text-slate-500'}`}>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Clock className="w-4 h-4" />
                {formattedTime}
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <User className="w-4 h-4" />
                {newsItem.uploader_name}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-[#183059] mb-8 leading-tight">
              {newsItem.title}
            </h1>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:text-[#183059] prose-a:text-blue-600">
              {newsItem.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-700 leading-relaxed mb-6 font-medium text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-500">تم النشر بواسطة: {newsItem.uploader_name}</span>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: newsItem.title,
                      url: window.location.href
                    });
                  }
                }}
                className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Share2 className="w-4 h-4" /> مشاركة الخبر
              </button>
            </div>
          </div>
        </article>

      </div>
    </div>
  );
};

export default NewsDetails;
