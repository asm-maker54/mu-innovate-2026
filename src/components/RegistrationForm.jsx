import React from 'react';
import { MapPin, Phone, Mail, Globe, Share2, MessageCircle, Video, Camera } from 'lucide-react';

const RegistrationForm = () => {
  return (
    <section id="registration" className="py-10 md:py-12 bg-gray-50 relative font-cairo" dir="rtl">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center relative">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 mb-4 pb-2 inline-block leading-normal">
            تواصل معنا
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-orange-300 mx-auto rounded-full mb-6" />
          <p className="text-xl font-bold text-gray-600 max-w-3xl leading-relaxed">
            لديك استفسار أو ترغب بالتسجيل؟
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
          
          {/* Left Form Side */}
          <div className="flex-1 bg-white p-8 lg:p-12 rounded-[2rem] shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">الاسم الأول *</label>
                  <input type="text" placeholder="مثال: أحمد" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">الاسم الأخير *</label>
                  <input type="text" placeholder="مثال: محمد" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] transition-all text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">البريد الإلكتروني *</label>
                  <input type="email" placeholder="example@gmail.com" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] transition-all text-sm text-left" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رقم الهاتف *</label>
                  <input type="tel" placeholder="أدخل رقم الهاتف" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">الموضوع *</label>
                <input type="text" placeholder="أدخل موضوع رسالتك هنا..." className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] transition-all text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">رسالتك *</label>
                <textarea rows="4" placeholder="اكتب رسالتك هنا..." className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] transition-all text-sm resize-none"></textarea>
              </div>

              <button type="button" className="bg-[#ea580c] text-white px-10 py-3.5 rounded-full font-bold hover:bg-[#c2410c] transition-colors shadow-md shadow-[#ea580c]/20 mt-4">
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Right Contact Info Side */}
          <div className="w-full lg:w-[400px] bg-[#0a192f] rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden flex flex-col shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }}></div>
            
            <div className="relative z-10 flex-1 flex flex-col gap-10">
              
              <div>
                <h3 className="text-2xl font-black mb-4">العنوان</h3>
                <p className="text-gray-300 leading-relaxed text-sm font-medium">
                  جامعة المنيا، محافظة المنيا،<br />
                  جمهورية مصر العربية 61519
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">التواصل</h3>
                <div className="space-y-3 text-sm font-medium text-gray-300">
                  <p className="flex items-center gap-3">
                    <span dir="ltr">+20 (000) 000-0000</span>
                  </p>
                  <p className="flex items-center gap-3">
                    info@mu-innovate.com
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">ساعات العمل</h3>
                <div className="space-y-2 text-sm font-medium text-gray-300">
                  <p className="flex justify-between items-center">
                    <span>الأحد - الخميس</span>
                    <span dir="ltr">09:00 - 15:00</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span>الجمعة - السبت</span>
                    <span>مغلق</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-10">
                <h3 className="text-xl font-bold mb-4">ابق على تواصل</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#ea580c] flex items-center justify-center hover:-translate-y-1 transition-transform">
                    <Globe className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#ea580c] flex items-center justify-center hover:-translate-y-1 transition-transform">
                    <Share2 className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#ea580c] flex items-center justify-center hover:-translate-y-1 transition-transform">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#ea580c] flex items-center justify-center hover:-translate-y-1 transition-transform">
                    <Camera className="w-4 h-4 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#ea580c] flex items-center justify-center hover:-translate-y-1 transition-transform">
                    <Video className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
