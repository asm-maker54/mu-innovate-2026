import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Award, Users } from 'lucide-react';

const AboutUsPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boardMembers = [
    {
      id: 5,
      name: 'أ.م.د. أسامة محمد سمير رضوان',
      nameEn: 'Osama Mohamed Samir Radwan',
      role: 'نائب مدير مركز الابتكار وريادة الاعمال',
      roleEn: 'Vice Manager of Innovation and Entrepreneurship Center',
      title: 'أستاذ مساعد كلية التربية النوعية',
      titleEn: 'Assistant Professor Faculty of Specific Education',
      image: `/osama.jpeg`,
    },
    {
      id: 1,
      name: 'أ.د. حسام أحمد رمضان',
      nameEn: 'Husam Ahmed Ramadan',
      role: 'مدير وحدة المنح والتعاون الدولي GICO',
      roleEn: 'Director of Grants and international collaboration office(GICO)',
      title: 'استاذ مساعد كليه الهندسة، قسم الهندسة الكهربية',
      titleEn: 'Associated Professor, Faculty of Engineering, ELECTRICAL Engineering Department',
      image: `/hossam.jpeg`,
    },
    {
      id: 2,
      name: 'أ.د. محمد كامل الحديدي',
      nameEn: 'Prof. Mohamed Kamel El-Hadidy',
      role: 'مدير وحدة الاستشارات والدعم الفني والتوجيه الوظيفي',
      roleEn: 'Director of the Consultancy, Technical Support, and Career Guidance Unit',
      title: 'استاذ النحت ووكيل كلية التربية الفنية لشئون خدمة المجتمع وتنمية البيئة',
      titleEn: 'Professor of Sculpture and Vice Dean of the Faculty of Art Education for Environmental Affairs and Community Service',
      image: `/kamal.jpeg`,
    },
    {
      id: 3,
      name: 'أ.د. أسماء ممدوح فتحي',
      nameEn: 'Asmaa Mamdouh Fathy Abdellatief',
      role: 'مدير وحدة حاضنات ومسرعات الاعمال',
      roleEn: 'Director of the Business Incubators and Accelerators Unit',
      title: 'أستاذ بكلية التربية النوعية جامعة المنيا',
      titleEn: 'Professor Faculty of Specific Education - Minia University',
      image: `/asmaa.jpeg`,
    },
    {
      id: 4,
      name: 'د. محمود ضرار محمود حسن',
      nameEn: 'Mahmoud Dirar Mahmoud Hassan',
      role: 'مدير وحدة الابتكار وريادة الأعمال الرقمية',
      roleEn: 'Director of the Digital Innovation and Entrepreneurship Unit',
      title: 'مدرس بكلية الحاسبات والمعلومات - جامعة المنيا',
      titleEn: 'Lecturer (Assistant Professor), Faculty of Computers and Information, Minia University',
      image: `/dirar.jpeg`,
    },
    {
      id: 6,
      name: 'أ.د. أحمد صلاح محمد حسين',
      nameEn: 'Ahmed Salah M. H. Elroby',
      role: 'مدير وحدة التدريب',
      roleEn: 'Director of the Training Unit',
      title: 'استاذ علم الحيوان والمكافحة الحيوية، وكيل كلية الزراعة لشئون التعليم والطلاب',
      titleEn: 'Professor of Zoology and Biological Control, Vice Dean for Education and Student Affairs, Faculty of Agriculture',
      image: `/salah.jpeg`,
    },
    {
      id: 7,
      name: 'أ.م.د. محمود محمد سيد عبد الرحمن',
      nameEn: 'Mahmoud Mohamed Sayed Abdelrhman',
      role: 'مدير وحدة براءة الإختراع وحقوق الملكية الفكرية (TISC)',
      roleEn: 'Director of Patent and Intellectual Property Unit (TISC)',
      title: 'أستاذ مساعد بقسم الإدارة الرياضية كلية علوم الرياضة جامعة المنيا',
      titleEn: 'Assistant Professor, Department of Sports Management, College of Sports Sciences',
      image: `/mahmoud.jpeg`,
    },
    {
      id: 8,
      name: 'أ.د. علاء الدين عبدالصبور',
      nameEn: 'Alaa El din Abdelsabour Abouelgoud Abdelrahim',
      role: 'مدير وحدة نقل وتسويق التكنولوجيا',
      roleEn: 'Director of Technology Transfer and Marketing Unit',
      title: 'استاذ ادارة الاعمال الزراعية والاقتصاد الزراعي - كلية الزراعة',
      titleEn: 'Professor, Agribusiness and Agricultural Economics, Faculty of Agriculture',
      image: `/alaa.jpeg`,
    },
    {
      id: 9,
      name: 'د. أحمد محمد منيسي',
      nameEn: 'Ahmad Mohammad Menesi',
      role: 'مدير وحدة التسويق والعلاقات العامة',
      roleEn: 'Director of Marketing and Public Relations Unit',
      title: 'أستاذ علوم الاراضي والمياه المساعد - كلية الزراعة - جامعة المنيا',
      titleEn: 'Associate professor of soil and water science - faculty of agriculture - Minia University',
      image: `/ahmed.jpeg`,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-[#f8fafc] font-cairo" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#040b16]">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6">
            {isRtl ? 'من نحن' : 'About Us'}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {isRtl ? 'تعرف على فريق عمل المركز الوطني للابتكار وريادة الأعمال بجامعة المنيا، نخبة من الخبراء والمتخصصين يسعون لبناء مستقبل مشرق.' : 'Meet the team of the National Center for Innovation and Entrepreneurship at Minia University, a group of experts and specialists striving to build a bright future.'}
          </p>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-16 bg-slate-50/50 relative">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <Award className="w-10 h-10 text-blue-600 animate-pulse" />
            <h2 className="text-4xl font-black text-slate-800">{isRtl ? 'مدير المركز' : 'Center Director'}</h2>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-14 hover:-translate-y-1 transition-transform duration-300">
            {/* Image Container with premium offset background frame */}
            <div className="relative shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-[2rem] transform translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative bg-blue-100 flex items-center justify-center z-10">
                <User className="w-20 h-20 text-blue-300 absolute" />
                <img src="/dr-eman.jpg.jpeg" alt="د. ايمان زكي الشريف" className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Content Details */}
            <div className="text-center md:text-start flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-4">
                {isRtl ? 'المركز الوطني للابتكار وريادة الأعمال' : 'National Center for Innovation and Entrepreneurship'}
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">{isRtl ? 'أ.د. إيمان زكي الشريف' : 'Prof. Dr. Eman Zaki El-Sherif'}</h3>
              
              {/* Highlighted Job Titles (المسمى الوظيفي) */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-orange-50 text-orange-700 font-bold text-sm border border-orange-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  {isRtl ? 'مستشار رئيس الجامعة لشئون الابتكار' : 'Advisor to the University President for Innovation'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-50/80 text-blue-700 font-bold text-sm border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {isRtl ? 'مدير المركز الوطني للابتكار وريادة الأعمال' : 'Director of the National Center for Innovation'}
                </span>
              </div>

              {/* Description Quote */}
              <p className="text-slate-600 leading-relaxed font-medium text-base sm:text-lg border-r-4 md:border-r-0 md:border-s-4 border-blue-500 pr-4 md:pr-0 md:ps-4 py-1">
                {isRtl ? 'تقود الدكتورة إيمان زكي الشريف مسيرة المركز نحو التميز والإبداع، من خلال وضع استراتيجيات مبتكرة لدعم رواد الأعمال والباحثين، وتوفير بيئة محفزة للابتكار تسهم في تحقيق التنمية المستدامة تماشياً مع رؤية مصر 2030.' : 'Dr. Eman Zaki El-Sherif leads the center\'s journey towards excellence and creativity, by developing innovative strategies to support entrepreneurs and researchers, and providing a stimulating environment for innovation that contributes to achieving sustainable development in line with Egypt\'s Vision 2030.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-12 bg-white relative border-t border-slate-100">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8 justify-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 text-center">{isRtl ? 'فريق العمل' : 'Our Team'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <div key={member.id} className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:bg-white hover:-translate-y-2 group">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg bg-white relative shrink-0">
                  <User className="w-16 h-16 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{isRtl ? member.name : (member.nameEn || member.name)}</h3>
                <p className="text-blue-700 font-bold text-sm bg-blue-100 px-5 py-2 rounded-2xl mb-4 leading-relaxed w-full min-h-[3rem] flex items-center justify-center">
                  {isRtl ? member.role : (member.roleEn || member.role)}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {isRtl ? member.title : (member.titleEn || member.title)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
