import React, { useEffect } from 'react';
import { Leaf, Sprout, Recycle, Sun, Droplet, Award, Users, Tractor, Factory } from 'lucide-react';

const GreenInnovationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-cairo" dir="rtl">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a4d3c] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1920" 
            alt="Green Nature" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 backdrop-blur-md mb-8 border border-emerald-500/50">
            <Leaf className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            تحالف الريادة الخضراء
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-emerald-200">
              مبادرة الابتكار الأخضر والاستدامة
            </span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-4xl mx-auto leading-relaxed">
            ضمن المبادرة الرئاسية "تحالف وتنمية" لتعزيز التنمية القائمة على المعرفة ودعم الاقتصاد القائم على الابتكار.
          </p>
        </div>
      </section>

      {/* Main Content - Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                إنجاز نوعي لجامعة المنيا
                <div className="absolute -bottom-2 right-0 w-24 h-1.5 bg-emerald-600 rounded-full"></div>
              </h2>
              
              <div className="prose prose-lg prose-emerald max-w-none text-gray-700 leading-loose">
                <p className="mb-4">
                  في إنجاز نوعي يضاف إلى سجل إنجازات جامعة المنيا، قام <strong>الدكتور عصام فرحات، رئيس الجامعة</strong>، بتوقيع البروتوكول التنفيذي لـ <strong>"تحالف الريادة الخضراء"</strong> الذي تقوده الجامعة ضمن المبادرة الرئاسية "تحالف وتنمية"، تحت رعاية فخامة السيد الرئيس عبد الفتاح السيسي، وبحضور الدكتور مصطفى مدبولي، رئيس مجلس الوزراء، والدكتور أيمن عاشور، وزير التعليم العالي والبحث العلمي، وذلك خلال فعاليات المؤتمر الثلاثي الذي نظّمته الوزارة بالعاصمة الإدارية الجديدة.
                </p>
                <p className="mb-4">
                  وقد فاز تحالف جامعة المنيا ضمن تسعة تحالفات فقط من بين 104 تحالفات متقدمة، مما يعكس مكانة الجامعة كمركز للابتكار وريادة الأعمال، ويجسد الثقة في كوادرها البشرية المتميزة. هذا المشروع الرائد يسعى لتعزيز الإنتاجية الزراعية والتنمية المستدامة، كخطوة هامة في تطبيق رؤية الدولة لدعم الاقتصاد القائم على المعرفة.
                </p>
                <p className="mb-4">
                  تعد المبادرة تطبيقًا عمليًا للسياسة الوطنية للابتكار المستدام 2030، من خلال تحالفات إقليمية تجمع الجامعات والمراكز البحثية والقطاع الصناعي والجهات الحكومية لتعزيز التنمية وتحويلها إلى محركات اقتصادية قادرة على إنتاج حلول تكنولوجية وتوفير فرص عمل.
                </p>
              </div>
            </div>

            <div className="lg:w-1/3 space-y-6">
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
                <Award className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">نجاح استثنائي</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  فوز التحالف ضمن 9 تحالفات من أصل 104، بتمويل يتراوح بين 90 و150 مليون جنيه على مدار ثلاث سنوات.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
                <Users className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">شراكات قوية</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  يضم المشروع تحالفات مع مصنع القناة للسكر، مسرعة الأعمال "أثر"، شركة برمودة، ومنصة Plug & Play العالمية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Elements */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 inline-block relative">
              عناصر مشروع الريادة الخضراء
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-emerald-600 rounded-full"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
              يقوم تحالف إقليم الصعيد بقيادة جامعة المنيا على إطلاق منصات وشراكات متقدمة لمواجهة تحديات ندرة المياه، تغير المناخ، وتراجع خصوبة التربة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="h-56 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800" alt="Smart Farming" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Tractor className="absolute bottom-4 right-4 w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">المجمّع الذكي للإنتاجية الزراعية</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  أول منصة متخصصة في شمال الصعيد، تعتمد على بنية بحثية متقدمة تشمل أكثر من 1000 فدان بمركز البحوث الزراعية، و23 فدانًا للصوب الزراعية والتجارب الذكية داخل الحرم الجامعي.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="h-56 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800" alt="Bio Fertilizers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Recycle className="absolute bottom-4 right-4 w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">المخصبات الحيوية وتدوير المخلفات</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  تطبيقات وحلول جاهزة لرفع خصوبة التربة وزيادة الإنتاج وخفض التكلفة، من أبرزها المخصبات الحيوية المنتجة من إعادة تدوير المخلفات الزراعية بأحدث التقنيات.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="h-56 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" alt="Startups & Industry" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Factory className="absolute bottom-4 right-4 w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">الابتكار الصناعي وتمويل الشركات</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  تعاون واسع النطاق يشمل مصنع القناة للسكر على مساحة تتجاوز 180 ألف فدان، ودعم محافظة المنيا وجهاز تنمية المشروعات لتمكين الابتكار وتمويل الشركات الناشئة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-[#0a4d3c] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sprout className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">رؤية نحو المستقبل</h2>
          <p className="text-xl leading-loose text-emerald-50 mb-8 font-light">
            "تأهل الجامعة ضمن أفضل التحالفات الوطنية للمبادرة الرئاسية هو إنجاز يبرهن على قوة منظومة البحث العلمي داخل الجامعة وقدرتها على تحويل المعرفة إلى مشروعات تطبيقية تخدم المجتمع والدولة، ومشروع (الريادة الخضراء) يضع جامعة المنيا في مقدمة الجامعات القادرة على قيادة التنمية الإقليمية."
          </p>
          <div className="inline-block border-t border-emerald-400/30 pt-4">
            <span className="block font-bold text-lg">أ.د. عصام فرحات</span>
            <span className="block text-emerald-300 text-sm mt-1">رئيس جامعة المنيا</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GreenInnovationPage;
