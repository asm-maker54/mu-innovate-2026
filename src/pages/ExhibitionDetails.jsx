import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calendar, Users, MapPin, Sparkles, Target, Star, Video, Image as ImageIcon, PlayCircle } from 'lucide-react';

// Shared data source for exhibitions
export const exhibitionsData = [
  {
    id: 1,
    title: 'معرض الابتكارات الرقمية',
    titleEn: 'Digital Innovations Exhibition',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
    description: 'إبراز التطبيقات، المنصات الرقمية، مشروعات الذكاء الاصطناعي، الأمن السيبراني، ولوحات البيانات المصممة بأيدي الطلاب.',
    color: 'bg-[#3b125b]',
    gradient: 'from-[#3b125b] to-[#1f0930]',
    textColor: 'text-purple-900',
    stats: { projects: 120, participants: 350, awards: 15 }
  },

  {
    id: 3,
    title: 'تسويق البحوث التطبيقية',
    titleEn: 'Applied Research',
    subtitle: '(Applied Research)',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1920',
    description: 'تصنيف وحصر البحوث التطبيقية وفقاً لمستويات الجاهزية التكنولوجية، مع إتاحة منصة لرفع البحث وفكرته لتسويقه للجهات الصناعية.',
    color: 'bg-[#d86200]',
    gradient: 'from-[#d86200] to-[#7a3700]',
    textColor: 'text-orange-900',
    stats: { projects: 50, participants: 120, awards: 5 }
  },
  {
    id: 4,
    title: 'معرض منتجات الوحدات الإنتاجية',
    titleEn: 'Production Units Products Exhibition',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1611078505537-83eb260fb1cd?auto=format&fit=crop&q=80&w=1920',
    description: 'حصر وعرض ما بين 100 إلى 150 منتجاً وخدمة جامعية، وربطها ببطاقات تسويقية موحدة (توضح السعر، التكلفة، وجاهزية قنوات البيع).',
    color: 'bg-[#0d47a1]',
    gradient: 'from-[#0d47a1] to-[#05214d]',
    textColor: 'text-blue-900',
    stats: { projects: 150, participants: 80, awards: 0 }
  }
];

const ExhibitionDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const exhibition = exhibitionsData.find(e => e.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المعرض غير موجود</h1>
          <Link to="/" className="text-blue-600 hover:underline">العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    );
  }

  // Mock projects data
  const mockProjects = [
    { name: 'مشروع ذكي متكامل', category: 'تكنولوجيا', team: 'فريق ألفا', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500' },
    { name: 'حل مستدام للطاقة', category: 'بيئة', team: 'فريق بيتا', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500' },
    { name: 'نظام إدارة سحابي', category: 'برمجيات', team: 'فريق جاما', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500' },
  ];

  const mockVideos = [
    { title: 'جولة افتراضية في المعرض', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', duration: '03:45' },
    { title: 'لقاء مع الفائزين بالنسخة السابقة', thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800', duration: '12:20' }
  ];

  const mockGallery = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500',
    'https://images.unsplash.com/photo-1558403194-611308249627?w=500'
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br ${exhibition.gradient} overflow-hidden`}>
        <div className="absolute inset-0">
          <img 
            src={exhibition.image} 
            alt={exhibition.title} 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <Link to="/#tracks" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowRight className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} />
            <span className="font-bold">العودة للمعارض</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-end">
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm mb-6">
                {exhibition.subtitle || 'معرض متخصص'}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {isRtl ? exhibition.title : exhibition.titleEn}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl font-medium">
                {exhibition.description}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center flex-1 lg:min-w-[140px]">
                <div className="text-3xl font-black mb-1">{exhibition.stats.projects}+</div>
                <div className="text-white/80 text-sm font-bold">مشروع/منتج</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center flex-1 lg:min-w-[140px]">
                <div className="text-3xl font-black mb-1">{exhibition.stats.participants}+</div>
                <div className="text-white/80 text-sm font-bold">مشارك</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className={`text-2xl font-black mb-6 flex items-center gap-2 ${exhibition.textColor}`}>
                <Target className="w-6 h-6" /> أهداف المعرض
              </h2>
              <ul className="space-y-4 text-gray-700 font-medium text-lg leading-relaxed list-disc list-inside marker:text-gray-400">
                <li>تسليط الضوء على الابتكارات الرائدة والمشاريع التطبيقية.</li>
                <li>توفير منصة للتواصل بين المبتكرين والمستثمرين.</li>
                <li>تقييم الجاهزية التكنولوجية والتجارية للمشروعات.</li>
                <li>تحفيز روح الإبداع والريادة بين المشاركين.</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-black mb-8 flex items-center gap-2 ${exhibition.textColor}`}>
                <Sparkles className="w-6 h-6" /> أبرز المشروعات (بيانات افتراضية)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mockProjects.map((project, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                    <div className="h-48 overflow-hidden relative">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                      <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" /> {project.team}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-black mb-8 flex items-center gap-2 ${exhibition.textColor}`}>
                <Video className="w-6 h-6" /> التغطية المرئية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVideos.map((video, idx) => (
                  <div key={idx} className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="aspect-video relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <PlayCircle className="w-10 h-10" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-bold">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-black mb-8 flex items-center gap-2 ${exhibition.textColor}`}>
                <ImageIcon className="w-6 h-6" /> معرض الصور
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mockGallery.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-black mb-6 ${exhibition.textColor}`}>معلومات المعرض</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${exhibition.color}`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">تاريخ إقامة المعرض</div>
                    <div className="text-gray-600">نوفمبر 2026</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${exhibition.color}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">المكان</div>
                    <div className="text-gray-600">جامعة المنيا، صالة المعارض الكبرى</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${exhibition.color}`}>
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">التقييم والجوائز</div>
                    <div className="text-gray-600">سيتم تكريم أفضل {exhibition.stats.awards} مشاريع مختارة بتمويل مبدئي.</div>
                  </div>
                </div>
              </div>
              
              <Link to={exhibition.id === 3 ? "/register?role=researcher" : "/register"} className={`flex items-center justify-center w-full mt-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-lg transition-all ${exhibition.color}`}>
                {exhibition.id === 3 ? 'رفع البحث التطبيقي' : 'تسجيل المشاركة بالمعرض'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetails;
