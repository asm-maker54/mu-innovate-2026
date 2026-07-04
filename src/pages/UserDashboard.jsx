import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, BookOpen, GraduationCap, Mic, Settings, LayoutDashboard, 
  Calendar, Clock, FileText, CheckCircle, AlertCircle, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  // Roles: 'user', 'speaker', 'project', 'researcher'
  const [activeRole, setActiveRole] = useState('user');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    navigate('/auth');
  };

  const roles = [
    { id: 'user', label: isRtl ? 'مستخدم عادي' : 'Regular User', icon: User },
    { id: 'speaker', label: isRtl ? 'متحدث' : 'Speaker', icon: Mic },
    { id: 'project', label: isRtl ? 'مشروع تخرج' : 'Graduation Project', icon: GraduationCap },
    { id: 'researcher', label: isRtl ? 'صاحب بحث' : 'Researcher', icon: BookOpen },
  ];

  const getRoleLabel = (roleId) => roles.find(r => r.id === roleId)?.label;

  const renderOverviewTab = () => {
    switch (activeRole) {
      case 'speaker':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'جلستي القادمة' : 'My Upcoming Session'}</h3>
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Mic className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{isRtl ? 'مستقبل الذكاء الاصطناعي في التعليم' : 'Future of AI in Education'}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 15 Oct, 2026</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="font-black text-slate-800 mb-4">{isRtl ? 'المواد المرفوعة' : 'Uploaded Materials'}</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <span className="font-bold text-slate-700">Presentation.pptx</span>
                  </div>
                  <span className="text-sm font-bold text-green-600 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4" /> {isRtl ? 'معتمد' : 'Approved'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'project':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'حالة المشروع' : 'Project Status'}</h3>
              <div className="p-6 border-s-4 border-blue-500 bg-blue-50 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-blue-900 text-lg mb-1">{isRtl ? 'نظام الري الذكي' : 'Smart Irrigation System'}</h4>
                    <p className="text-blue-700 font-medium">{isRtl ? 'تم قبول المشروع للمرحلة النهائية' : 'Project accepted for final stage'}</p>
                  </div>
                  <div className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-md shadow-blue-500/30 text-center">
                    {isRtl ? 'مرحلة النهائيات' : 'Finals Stage'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="font-black text-slate-800 mb-4">{isRtl ? 'أعضاء الفريق' : 'Team Members'}</h3>
                <ul className="space-y-4">
                  {['أحمد محمد', 'سارة حسن', 'خالد مصطفى'].map((name, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="font-bold">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 'researcher':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'متابعة البحث' : 'Research Tracking'}</h3>
              <div className="flex items-start justify-between p-5 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{isRtl ? 'تأثير النانو تكنولوجي في الزراعة' : 'Impact of Nanotechnology in Agriculture'}</h4>
                    <p className="text-yellow-700 font-medium text-sm">{isRtl ? 'تحت مراجعة اللجنة العلمية' : 'Under Scientific Committee Review'}</p>
                  </div>
                </div>
                <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0" />
              </div>
            </div>
          </div>
        );
      default:
        // Regular User
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-900/10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4">{isRtl ? 'مرحباً بك في منصة الابتكار' : 'Welcome to the Innovation Platform'}</h2>
                <p className="text-blue-100 mb-8 max-w-xl text-lg font-medium leading-relaxed">{isRtl ? 'استكشف الفعاليات، تابع الأخبار، وتواصل مع المبتكرين.' : 'Explore events, follow news, and connect with innovators.'}</p>
                <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-blue-50 transition-colors">
                  {isRtl ? 'تصفح الأجندة' : 'Browse Agenda'}
                </button>
              </div>
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 22h20L12 2zm0 3.83L18.17 19H5.83L12 5.83z" />
                </svg>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden sticky top-28">
            <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-black text-xl text-slate-900 mb-1">أحمد محمد</h2>
                <p className="text-sm font-bold text-slate-500">{getRoleLabel(activeRole)}</p>
              </div>
            </div>
            
            <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                {isRtl ? 'نظرة عامة' : 'Overview'}
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <Settings className="w-5 h-5" />
                {isRtl ? 'الإعدادات' : 'Settings'}
              </button>
              
              <div className="pt-4 mt-4 border-t border-slate-100 px-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  {isRtl ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mock Role Selector - For Demo Purposes */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-bold text-slate-700 text-sm whitespace-nowrap">{isRtl ? 'تغيير نوع المستخدم (للتجربة):' : 'Change User Role (For Demo):'}</span>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                    activeRole === role.id 
                      ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/20' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <role.icon className="w-3.5 h-3.5" />
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 px-2">
            <h1 className="text-3xl font-black text-slate-900">{activeTab === 'overview' ? (isRtl ? 'لوحة التحكم' : 'Dashboard') : (isRtl ? 'الإعدادات' : 'Settings')}</h1>
            <p className="text-slate-500 mt-2 font-medium">
              {isRtl ? 'تابع آخر تحديثات نشاطك على المنصة.' : 'Follow the latest updates of your activity on the platform.'}
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? renderOverviewTab() : (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-4">{isRtl ? 'إعدادات الحساب' : 'Account Settings'}</h3>
              <p className="text-slate-500 font-medium">{isRtl ? 'قريباً...' : 'Coming soon...'}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
