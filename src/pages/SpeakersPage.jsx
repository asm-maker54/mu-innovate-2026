import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Search, Globe, Mail, Sparkles, MessageSquare, Cpu, Award, BookOpen } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const SpeakersPage = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');

  const defaultSpeakers = [
    {
      id: 'd0',
      name: 'أحمد محمود',
      nameEn: 'AHMED MAHMOUD',
      role: 'مؤسس ومدير تنفيذي',
      company: 'TechVision',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      color: 'from-blue-600 to-indigo-900',
      accent: 'bg-blue-500',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'مستقبل الذكاء الاصطناعي في تمكين الشركات الناشئة',
      speakerBio: 'القمة فرصة فريدة للربط بين البحث الأكاديمي والفرص الاستثمارية الحقيقية في صعيد مصر.',
      speakerExpertise: 'التكنولوجيا والذكاء الاصطناعي',
      skills: ['الذكاء الاصطناعي', 'ريادة الأعمال', 'إدارة المنتجات']
    },
    {
      id: 'd1',
      name: 'د. إسماعيل فاروق',
      nameEn: 'ISMAEL FARO',
      role: 'نائب رئيس الذكاء الاصطناعي',
      company: 'IBM',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
      color: 'from-yellow-500 to-orange-700',
      accent: 'bg-yellow-400',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'الحوسبة السحابية وهندسة الأنظمة الذكية للجيل القادم',
      speakerBio: 'جامعة المنيا تخطو خطوة تاريخية نحو دعم الاقتصاد المعرفي وتوطين التقنيات الحديثة.',
      speakerExpertise: 'التكنولوجيا والذكاء الاصطناعي',
      skills: ['الحوسبة السحابية', 'هندسة البرمجيات', 'تحليل البيانات']
    },
    {
      id: 'd2',
      name: 'جيرجن وايتشينبيرجر',
      nameEn: 'JUERGEN WEICHENBERGER',
      role: 'شريك البيانات',
      company: 'Ernst & Young',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      color: 'from-purple-600 to-purple-900',
      accent: 'bg-purple-500',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'تحليل البيانات الضخمة وبناء النماذج الاستباقية في الصناعة',
      speakerBio: 'توجيه الاستثمارات للشركات التقنية الناشئة هو المحرك الفعلي للنمو الاقتصادي الحديث.',
      speakerExpertise: 'الاستثمار والتمويل',
      skills: ['تحليل البيانات', 'استشارات الأعمال', 'الذكاء الاستراتيجي']
    },
    {
      id: 'd3',
      name: 'سارة عبد الله',
      nameEn: 'SARAH ABDALLAH',
      role: 'رئيسة قسم الابتكار',
      company: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      color: 'from-emerald-500 to-teal-900',
      accent: 'bg-emerald-500',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'التفكير التصميمي والابتكار الرقمي في قيادة المؤسسات',
      speakerBio: 'يسعدني جداً المساهمة في هذا الحدث الضخم لنقل خبرتي للشباب والمبتكرين المبدعين.',
      speakerExpertise: 'ريادة الأعمال',
      skills: ['التفكير التصميمي', 'التحول الرقمي', 'القيادة التنفيذية']
    },
    {
      id: 'd4',
      name: 'عمر ياسين',
      nameEn: 'OMAR YASSIN',
      role: 'مستثمر ومبادر',
      company: 'Venture Capital',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=800',
      color: 'from-red-500 to-rose-900',
      accent: 'bg-red-500',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'آليات جذب التمويل الاستثماري وجاهزية الشركات للنمو',
      speakerBio: 'المشاريع الناشئة والبحث العلمي التطبيقي هما حجر الأساس للنهوض بالتنمية الوطنية المستدامة.',
      speakerExpertise: 'الاستثمار والتمويل',
      skills: ['رأس المال الجريء', 'التمويل والاستثمار', 'تقييم المشاريع']
    },
    {
      id: 'd5',
      name: 'ليلى منصور',
      nameEn: 'LAYLA MANSOUR',
      role: 'مديرة تطوير المنتجات',
      company: 'Amazon',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      color: 'from-cyan-500 to-blue-900',
      accent: 'bg-cyan-500',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'بناء وتوسيع النظم التقنية وتطوير المنتجات الموجهة للمستخدم',
      speakerBio: 'قمة الابتكار بجامعة المنيا هي الجسر الحقيقي الذي يربط بين طموحات الشباب والفرص العالمية.',
      speakerExpertise: 'التسويق والمبيعات',
      skills: ['تطوير المنتجات', 'تجربة المستخدم', 'نمو الشركات']
    },
    {
      id: 'd6',
      name: 'طارق حلمي',
      nameEn: 'TAREK HELMY',
      role: 'مستشار الابتكار',
      company: 'Google',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      color: 'from-pink-500 to-fuchsia-900',
      accent: 'bg-pink-500',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      x: 'https://x.com',
      speechTopic: 'تقنيات الابتكار الرقمي وبناء الحلول البرمجية المستدامة',
      speakerBio: 'الابتكار ليس خياراً بل ضرورة، وتواجد هذا الحشد من النخب يضع جامعة المنيا في طليعة مسار التنمية.',
      speakerExpertise: 'التكنولوجيا والذكاء الاصطناعي',
      skills: ['الابتكار الرقمي', 'التفكير الاستراتيجي', 'استشارات التقنية']
    }
  ];

  const [speakers, setSpeakers] = useState(defaultSpeakers);

  useEffect(() => {
    window.scrollTo(0, 0);
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

        const formatted = approvedList.map((s) => ({
          id: s.id,
          name: s.full_name,
          nameEn: s.details?.speechTopic?.toUpperCase() || 'SPEAKER',
          role: s.details?.speakerExpertise || 'متحدث القمة',
          company: s.organization || 'جامعة المنيا',
          image: s.details?.speakerImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800',
          linkedin: s.details?.speakerLinkedin || '#',
          facebook: s.details?.speakerFacebook || '#',
          x: s.details?.speakerX || '#',
          speechTopic: s.details?.speechTopic || 'موضوع المشاركة في القمة',
          speakerBio: s.details?.speakerBio || 'القمة فرصة رائعة ومتميزة للابتكار والتواصل مع العقول الريادية.',
          speakerExpertise: s.details?.speakerExpertise || 'التكنولوجيا والذكاء الاصطناعي',
          skills: s.details?.speakerExpertise ? [s.details.speakerExpertise, 'تطوير الأعمال'] : ['الابتكار', 'الريادة']
        }));

        setSpeakers([...defaultSpeakers, ...formatted]);
      } catch (err) {
        console.error("Error fetching approved speakers:", err);
      }
    };

    fetchApprovedSpeakers();
  }, []);

  // Filter speakers based on search and expertise filter tag
  const filteredSpeakers = speakers.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.speechTopic && s.speechTopic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.speakerBio && s.speakerBio.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === 'All' || s.speakerExpertise === selectedExpertise;

    return matchesSearch && matchesExpertise;
  });

  const expertiseTags = [
    { id: 'All', labelAr: 'الكل', labelEn: 'All' },
    { id: 'التكنولوجيا والذكاء الاصطناعي', labelAr: 'التكنولوجيا والذكاء الاصطناعي', labelEn: 'Tech & AI' },
    { id: 'ريادة الأعمال', labelAr: 'ريادة الأعمال', labelEn: 'Entrepreneurship' },
    { id: 'الاستثمار والتمويل', labelAr: 'الاستثمار والتمويل', labelEn: 'Investment' },
    { id: 'التسويق والمبيعات', labelAr: 'التسويق والمبيعات', labelEn: 'Marketing' }
  ];

  return (
    <div className="min-h-screen bg-[#070b15] text-white relative">
      {/* Background Neon Orbs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />



      {/* Hero Banner Section */}
      <div className="relative pt-32 pb-16 bg-[#0a0f1c]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm mb-6 group">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            <span>{isRtl ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? 'عقول تصنع المستقبل' : 'Minds Shaping the Future'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent">
              {isRtl ? 'متحدثو قمة الابتكار' : 'Summit Speakers'}
            </h1>
            <p className="text-slate-400 text-base md:text-lg mt-4 leading-relaxed font-medium">
              {isRtl 
                ? 'استكشف قائمة النخبة من رواد الأعمال، العلماء، المستثمرين، والمؤثرين المشاركين في قمة جامعة المنيا للابتكار وريادة الأعمال لعام 2026.'
                : 'Explore our list of elite entrepreneurs, scientists, investors, and influencers participating in the Minia University Innovation & Entrepreneurship Summit 2026.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2.5">
            {expertiseTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedExpertise(tag.id)}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${
                  selectedExpertise === tag.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105 border border-blue-500/30'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isRtl ? tag.labelAr : tag.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 pointer-events-none">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder={isRtl ? 'البحث عن متحدث، موضوع...' : 'Search speaker, topic...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pr-12 pl-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white font-bold placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Speakers Cards Grid */}
        {filteredSpeakers.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-300">{isRtl ? 'لا يوجد نتائج مطابقة' : 'No results found'}</h3>
            <p className="text-slate-500 text-sm mt-1">{isRtl ? 'جرب البحث بكلمات أخرى أو تغيير الفلتر.' : 'Try searching different keywords or tags.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {filteredSpeakers.map((speaker) => (
              <div 
                key={speaker.id} 
                className="group relative bg-[#0d1326] border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-blue-900/10 hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image and Header Card */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1326] via-transparent to-transparent z-10" />
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 origin-center"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full bg-blue-600/90 text-white border border-blue-400/20 shadow-md">
                      {speaker.speakerExpertise}
                    </span>
                  </div>
                </div>

                {/* Speaker Main Info */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{speaker.name}</h3>
                    <p className="text-slate-400 text-xs font-bold mt-1.5">{speaker.role} @ <span className="text-blue-400">{speaker.company}</span></p>
                  </div>

                  {/* Speech Topic Section */}
                  <div className="mt-5 p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-1.5 text-blue-400">
                      <Cpu className="w-4 h-4" />
                      <span className="text-[11px] font-black uppercase tracking-wider">{isRtl ? 'موضوع الكلمة' : 'Speech Topic'}</span>
                    </div>
                    <p className="text-slate-300 text-xs font-bold leading-relaxed">{speaker.speechTopic}</p>
                  </div>

                  {/* Quote / Bio Section (كلمة عن القمة) */}
                  <div className="mt-5 flex-1">
                    <div className="flex items-center gap-2 mb-2 text-purple-400">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[11px] font-black uppercase tracking-wider">{isRtl ? 'كلمة عن القمة' : 'Quote on Summit'}</span>
                    </div>
                    <blockquote className="text-slate-400 text-xs italic leading-relaxed border-r-2 border-purple-500/50 pr-3">
                      "{speaker.speakerBio}"
                    </blockquote>
                  </div>

                  {/* Skills Section */}
                  {speaker.skills && speaker.skills.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-2.5 text-slate-500">
                        <Award className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{isRtl ? 'أهم المهارات' : 'Top Skills'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {speaker.skills.map((skill, idx) => (
                          <span key={idx} className="px-2.5 py-1 text-[9px] font-black bg-white/5 border border-white/10 rounded-full text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Buttons */}
                  <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
                    {speaker.linkedin && speaker.linkedin !== '#' && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all hover:scale-105"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {speaker.facebook && speaker.facebook !== '#' && (
                      <a
                        href={speaker.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-700 hover:border-blue-600 transition-all hover:scale-105"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      </a>
                    )}
                    {speaker.x && speaker.x !== '#' && (
                      <a
                        href={speaker.x}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all hover:scale-105"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default SpeakersPage;
