import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050b14] min-h-screen pt-24 pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">تواصل معنا</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتكم ومناقشة سبل التعاون. لا تترددوا في التواصل معنا.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#0a1224] p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-8">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">العنوان</h3>
                    <p className="text-gray-400">جامعة المنيا، المنيا، جمهورية مصر العربية</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-400" dir="ltr">info@minia.edu.eg</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">الهاتف</h3>
                    <p className="text-gray-400" dir="ltr">0100000000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Map Placeholder */}
            <div className="h-64 bg-[#0a1224] rounded-3xl border border-white/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111003.55938936681!2d30.686958434850787!3d28.086395641777596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145b2520cb2a4667%3A0xc6c7bf5412803b9f!2sMinia%20University!5e0!3m2!1sen!2seg!4v1718000000000!5m2!1sen!2seg" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0a1224] p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8">إرسال رسالة</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-bold">الاسم بالكامل</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#111c36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-bold">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#111c36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-bold">موضوع الرسالة</label>
                <input 
                  type="text" 
                  className="w-full bg-[#111c36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="عنوان الاستفسار"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-bold">نص الرسالة</label>
                <textarea 
                  rows="5"
                  className="w-full bg-[#111c36] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span>إرسال الرسالة</span>
                <Send className="w-5 h-5 rotate-180" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
