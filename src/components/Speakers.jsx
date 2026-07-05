import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, Cpu, MessageSquare, Award, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const Speakers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const defaultSpeakers = [
    {
      id: 'd0', name: 'أحمد محمود', nameEn: 'AHMED MAHMOUD',
      role: 'مؤسس ومدير تنفيذي', company: 'TechVision',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      color: 'from-blue-600 to-indigo-900', accent: 'bg-blue-500',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'مستقبل الذكاء الاصطناعي في تمكين الشركات الناشئة',
      speakerBio: 'القمة فرصة فريدة للربط بين البحث الأكاديمي والفرص الاستثمارية الحقيقية في صعيد مصر.',
      skills: ['الذكاء الاصطناعي', 'ريادة الأعمال', 'إدارة المنتجات']
    },
    {
      id: 'd1', name: 'د. إسماعيل فاروق', nameEn: 'ISMAEL FARO',
      role: 'نائب رئيس الذكاء الاصطناعي', company: 'IBM',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
      color: 'from-yellow-500 to-orange-700', accent: 'bg-yellow-400',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'الحوسبة السحابية وهندسة الأنظمة الذكية للجيل القادم',
      speakerBio: 'جامعة المنيا تخطو خطوة تاريخية نحو دعم الاقتصاد المعرفي وتوطين التقنيات الحديثة.',
      skills: ['الحوسبة السحابية', 'هندسة البرمجيات', 'تحليل البيانات']
    },
    {
      id: 'd2', name: 'جيرجن وايتشينبيرجر', nameEn: 'JUERGEN WEICHENBERGER',
      role: 'شريك البيانات', company: 'Ernst & Young',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      color: 'from-purple-600 to-purple-900', accent: 'bg-purple-500',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'تحليل البيانات الضخمة وبناء النماذج الاستباقية في الصناعة',
      speakerBio: 'توجيه الاستثمارات للشركات التقنية الناشئة هو المحرك الفعلي للنمو الاقتصادي الحديث.',
      skills: ['تحليل البيانات', 'استشارات الأعمال', 'الذكاء الاستراتيجي']
    },
    {
      id: 'd3', name: 'سارة عبد الله', nameEn: 'SARAH ABDALLAH',
      role: 'رئيسة قسم الابتكار', company: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      color: 'from-emerald-500 to-teal-900', accent: 'bg-emerald-500',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'التفكير التصميمي والابتكار الرقمي في قيادة المؤسسات',
      speakerBio: 'يسعدني المساهمة في هذا الحدث الضخم لنقل خبرتي للشباب والمبتكرين المبدعين.',
      skills: ['التفكير التصميمي', 'التحول الرقمي', 'القيادة التنفيذية']
    },
    {
      id: 'd4', name: 'عمر ياسين', nameEn: 'OMAR YASSIN',
      role: 'مستثمر ومبادر', company: 'Venture Capital',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=800',
      color: 'from-red-500 to-rose-900', accent: 'bg-red-500',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'آليات جذب التمويل الاستثماري وجاهزية الشركات للنمو',
      speakerBio: 'المشاريع الناشئة والبحث العلمي التطبيقي هما حجر الأساس للتنمية المستدامة.',
      skills: ['رأس المال الجريء', 'التمويل والاستثمار', 'تقييم المشاريع']
    },
    {
      id: 'd5', name: 'ليلى منصور', nameEn: 'LAYLA MANSOUR',
      role: 'مديرة تطوير المنتجات', company: 'Amazon',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      color: 'from-cyan-500 to-blue-900', accent: 'bg-cyan-500',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'بناء وتوسيع النظم التقنية وتطوير المنتجات الموجهة للمستخدم',
      speakerBio: 'قمة الابتكار هي الجسر الحقيقي الذي يربط بين طموحات الشباب والفرص العالمية.',
      skills: ['تطوير المنتجات', 'تجربة المستخدم', 'نمو الشركات']
    },
    {
      id: 'd6', name: 'طارق حلمي', nameEn: 'TAREK HELMY',
      role: 'مستشار الابتكار', company: 'Google',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      color: 'from-pink-500 to-fuchsia-900', accent: 'bg-pink-500',
      linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', x: 'https://x.com',
      speechTopic: 'تقنيات الابتكار الرقمي وبناء الحلول البرمجية المستدامة',
      speakerBio: 'الابتكار ليس خياراً بل ضرورة، وهذا الحشد يضع جامعة المنيا في طليعة مسار التنمية.',
      skills: ['الابتكار الرقمي', 'التفكير الاستراتيجي', 'استشارات التقنية']
    }
  ];

  const [speakers, setSpeakers] = useState(defaultSpeakers);

  useEffect(() => {
    const fetchApprovedSpeakers = async () => {
      try {
        let approvedList = [];
        
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .eq('role', 'speaker')
            .eq('status', 'مقبول للعرض في القمة');
          
          if (!error && data) {
            approvedList = data;
          }
        } else {
          const localRegs = JSON.parse(localStorage.getItem('local_registrations') || '[]');
          approvedList = localRegs.filter(r => r.role === 'speaker' && r.status === 'مقبول للعرض في القمة');
        }

        const gradients = [
          'from-blue-600 to-indigo-900',
          'from-yellow-500 to-orange-700',
          'from-purple-600 to-purple-900',
          'from-emerald-500 to-teal-900',
          'from-red-500 to-rose-900',
          'from-cyan-500 to-blue-900',
          'from-pink-500 to-fuchsia-900'
        ];
        
        const formatted = approvedList.map((s, index) => ({
          id: s.id,
          name: s.full_name,
          nameEn: s.details?.speechTopic?.toUpperCase() || 'SPEAKER',
          role: s.details?.speakerExpertise || 'متحدث القمة',
          company: s.organization || 'جامعة المنيا',
          image: s.details?.speakerImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800',
          color: gradients[index % gradients.length],
          accent: 'bg-emerald-500',
          linkedin: s.details?.speakerLinkedin || '#',
          facebook: s.details?.speakerFacebook || '#',
          x: s.details?.speakerX || '#',
          speechTopic: s.details?.speechTopic || 'موضوع المشاركة في القمة',
          speakerBio: s.details?.speakerBio || 'القمة فرصة رائعة للابتكار والتواصل مع العقول الريادية.',
          skills: s.details?.speakerExpertise ? [s.details.speakerExpertise, 'تطوير الأعمال'] : ['الابتكار', 'الريادة']
        }));

        setSpeakers([...defaultSpeakers, ...formatted]);
      } catch (err) {
        console.error("Error fetching approved speakers:", err);
      }
    };

    fetchApprovedSpeakers();
  }, []);

  return (
    <section className="py-10 md:py-12 bg-[#0a0f1c] relative overflow-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">عقول تصنع المستقبل</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              متحدثون بارزون
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              نخبة من الخبراء ورواد الأعمال وصناع القرار يشاركونكم رؤاهم حول مستقبل الابتكار والتكنولوجيا في قمة جامعة المنيا.
            </p>
          </div>
          
          <Link 
            to="/speakers" 
            className="hidden md:flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors group"
          >
            عرض كل المتحدثين
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Interactive Expanding Cards (Accordion) */}
        <div className="flex flex-col lg:flex-row gap-4 h-[700px] lg:h-[500px] w-full">
          {speakers.map((speaker, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={speaker.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out flex-shrink-0 lg:flex-shrink ${
                  isActive 
                    ? 'h-[300px] lg:h-full lg:flex-[3] xl:flex-[4] shadow-2xl shadow-blue-900/20' 
                    : 'h-[100px] lg:h-full lg:flex-1 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                      isActive ? 'scale-100' : 'scale-100 grayscale-[30%]'
                    }`}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${
                  isActive ? 'from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent opacity-90' : 'from-black/80 to-black/20'
                }`} />
                
                {/* Colored Tint for inactive cards */}
                <div className={`absolute inset-0 bg-gradient-to-br ${speaker.color} mix-blend-overlay transition-opacity duration-700 ${
                  isActive ? 'opacity-40' : 'opacity-80'
                }`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 lg:translate-y-0 lg:opacity-100'}`}>
                    
                    {/* Active State Details */}
                    <div className={`flex flex-col gap-2 ${isActive ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center lg:h-full'}`}>
                      
                      {/* Name - Shows vertically when inactive on desktop */}
                      <h3 
                        onClick={(e) => { if (isActive) { e.stopPropagation(); setSelectedSpeaker(speaker); } }}
                        className={`text-white font-black uppercase transition-all duration-700 ${
                          isActive 
                            ? 'text-3xl lg:text-4xl mb-1 cursor-pointer hover:text-blue-300' 
                            : 'lg:-rotate-90 lg:text-2xl lg:whitespace-nowrap lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 tracking-wider'
                        }`}
                      >
                        {isActive ? speaker.name : speaker.nameEn}
                      </h3>
                      
                      {/* Sub-details (Role & Company) - Only visible when active */}
                      <div className={`flex flex-col gap-1 transition-all duration-500 delay-200 overflow-hidden ${
                        isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 lg:hidden'
                      }`}>
                        <div className={`text-lg font-bold ${isActive ? 'text-blue-300' : ''}`}>
                          {speaker.role}
                        </div>
                        <div className="text-gray-300 font-semibold" dir="ltr">
                          @ {speaker.company}
                        </div>
                        
                        {/* Social Icons */}
                        <div className="flex gap-3 mt-4">
                          {speaker.linkedin && speaker.linkedin !== '#' && (
                            <a 
                              href={speaker.linkedin} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-600 transition-all hover:scale-110"
                            >
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                          {speaker.facebook && speaker.facebook !== '#' && (
                            <a 
                              href={speaker.facebook} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-110"
                            >
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                              </svg>
                            </a>
                          )}
                          {speaker.x && speaker.x !== '#' && (
                            <a 
                              href={speaker.x} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-slate-800 transition-all hover:scale-110"
                            >
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Decorative border line on active */}
                <div className={`absolute bottom-0 left-0 h-1 transition-all duration-700 ${speaker.accent} ${
                  isActive ? 'w-full' : 'w-0'
                }`} />
              </div>
            );
          })}
        </div>
        
        {/* Mobile "View All" Button */}
        <Link 
          to="/speakers" 
          className="mt-8 flex md:hidden items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
        >
          عرض كل المتحدثين
          <ArrowLeft className="w-5 h-5" />
        </Link>

      </div>

      {/* Speaker Detail Modal */}
      {selectedSpeaker && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div 
            className="bg-[#0d1326] border border-white/10 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Image */}
            <div className="relative h-52 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1326] via-[#0d1326]/50 to-transparent z-10" />
              <img src={selectedSpeaker.image} alt={selectedSpeaker.name} className="w-full h-full object-cover object-center" />
              <button 
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-6 z-20">
                <h3 className="text-2xl font-black text-white">{selectedSpeaker.name}</h3>
                <p className="text-blue-300 text-sm font-bold mt-0.5">{selectedSpeaker.role} @ <span className="text-blue-400">{selectedSpeaker.company}</span></p>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 space-y-5" dir="rtl">
              {/* Speech Topic */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-1.5 text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-wider">موضوع الكلمة</span>
                </div>
                <p className="text-slate-200 text-sm font-bold leading-relaxed">{selectedSpeaker.speechTopic}</p>
              </div>

              {/* Quote about Summit */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-wider">كلمة عن القمة</span>
                </div>
                <blockquote className="text-slate-400 text-sm italic leading-relaxed border-r-2 border-purple-500/50 pr-3">
                  "{selectedSpeaker.speakerBio}"
                </blockquote>
              </div>

              {/* Skills */}
              {selectedSpeaker.skills && selectedSpeaker.skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2.5 text-slate-500">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-wider">أهم المهارات</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpeaker.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-[10px] font-black bg-white/5 border border-white/10 rounded-full text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-3 pt-4 border-t border-white/5">
                {selectedSpeaker.linkedin && selectedSpeaker.linkedin !== '#' && (
                  <a href={selectedSpeaker.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                )}
                {selectedSpeaker.facebook && selectedSpeaker.facebook !== '#' && (
                  <a href={selectedSpeaker.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                )}
                {selectedSpeaker.x && selectedSpeaker.x !== '#' && (
                  <a href={selectedSpeaker.x} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Speakers;
