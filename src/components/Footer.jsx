import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#030712] relative overflow-hidden border-t border-white/5" dir="rtl">
      
      {/* Main Footer Content */}
      <div className="bg-[#040b16] pt-16 pb-16 relative z-20 text-right">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-right">
            
            {/* About Us */}
            <div className="space-y-5 text-right">
              <h3 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 inline-block">من نحن</h3>
              <p className="text-gray-400 leading-relaxed font-medium text-right text-base">
                منصة جامعة المنيا للابتكار وريادة الأعمال هي بيئة متكاملة تهدف إلى دعم المبتكرين ورواد الأعمال، 
                من مرحلة الفكرة وحتى تحويلها إلى مشاريع ناجحة على أرض الواقع، لتعزيز الاقتصاد المعرفي وتطوير المجتمع.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-5 text-right">
               <h3 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 inline-block">روابط هامة</h3>
               <ul className="space-y-3 font-medium text-right text-base">
                 <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 justify-start"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> الرئيسية</Link></li>
                 <li><Link to="/agenda" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 justify-start"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> المعرض والفعاليات</Link></li>
                 <li><Link to="/success-stories" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 justify-start"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> المركز الإعلامي</Link></li>
                 <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 justify-start"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> تواصل معنا</Link></li>
               </ul>
            </div>

            {/* Contact */}
            <div className="space-y-5 text-right">
               <h3 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 inline-block">تواصل معنا</h3>
               <ul className="space-y-4 font-medium text-gray-400 text-right text-base">
                 <li className="flex items-center gap-3 justify-start">
                   <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0 border border-blue-800/30"><MapPin className="w-5 h-5"/></div>
                   <span className="text-right">جامعة المنيا، المنيا، مصر</span>
                 </li>
                 <li className="flex items-center gap-3 justify-start">
                   <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0 border border-blue-800/30"><Phone className="w-5 h-5"/></div>
                   <span dir="ltr" className="text-right">0100000000</span>
                 </li>
                 <li className="flex items-center gap-3 justify-start">
                   <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0 border border-blue-800/30"><Mail className="w-5 h-5"/></div>
                   <span className="text-right">info@mu.edu.eg</span>
                 </li>
               </ul>
            </div>
            
            {/* Map */}
            <div className="space-y-5 text-right">
               <h3 className="text-2xl font-bold text-white border-b-2 border-blue-500 pb-2 inline-block">خريطة الوصول</h3>
               <div className="h-48 bg-[#0b192c] rounded-xl w-full overflow-hidden border border-white/5 shadow-lg">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110903.07682221617!2d30.71077755!3d28.113061299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145b259166da2f8f%3A0xe5eb65fb409fcb47!2sMinia%20University!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg" 
                   className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity" 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="Minia University Map"
                 ></iframe>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#010409] py-5 text-center text-sm font-bold text-gray-500" dir="ltr">
        جميع الحقوق محفوظة لمركز الابتكار وريادة الاعمال بالجامعة @prof Eman Elshrief
      </div>
    </footer>
  );
};

export default Footer;
