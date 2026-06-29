import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, Lightbulb, Rocket, Award, 
  Briefcase, GraduationCap, Users, Calendar, 
  Settings, BookOpen, ChevronRight, Bell
} from 'lucide-react';
import StartupProfile from '../components/StartupProfile';

const StudentDashboard = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarLinks = [
    { id: 'dashboard', icon: LayoutDashboard, label: isRtl ? 'الرئيسية' : 'Dashboard' },
    { id: 'ideas', icon: Lightbulb, label: isRtl ? 'أفكاري' : 'My Ideas' },
    { id: 'startup', icon: Rocket, label: isRtl ? 'شركتي الناشئة' : 'My Startup' },
    { id: 'passport', icon: Award, label: isRtl ? 'جواز الابتكار' : 'Innovation Passport' },
    { id: 'projects', icon: Briefcase, label: isRtl ? 'المشاريع' : 'Projects' },
    { id: 'research', icon: BookOpen, label: isRtl ? 'البحث العلمي' : 'Research' },
    { id: 'career', icon: GraduationCap, label: isRtl ? 'المسار المهني' : 'Career' },
    { id: 'mentors', icon: Users, label: isRtl ? 'المرشدين' : 'Mentors' },
    { id: 'events', icon: Calendar, label: isRtl ? 'الفعاليات' : 'Events' },
    { id: 'settings', icon: Settings, label: isRtl ? 'الإعدادات' : 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Notion inspired) */}
      <aside className={`w-64 bg-white border-${isRtl ? 'l' : 'r'} border-gray-200 flex-shrink-0 hidden md:block pt-6 fixed h-[calc(100vh-5rem)] overflow-y-auto`}>
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              AM
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">Ahmed Mahmoud</div>
              <div className="text-xs text-text-secondary">Computer Science</div>
            </div>
          </div>
        </div>
        
        <nav className="px-2 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === link.id 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              }`}
            >
              <link.icon className={`w-5 h-5 ${activeTab === link.id ? 'text-primary' : 'text-gray-400'}`} />
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 ${isRtl ? 'md:mr-64' : 'md:ml-64'}`}>
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {activeTab === 'dashboard' ? t('dashboard.welcome') : 
                 activeTab === 'startup' ? (isRtl ? 'شركتي الناشئة' : 'My Startup') : 
                 sidebarLinks.find(l => l.id === activeTab)?.label}
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                {activeTab === 'dashboard' ? (isRtl ? 'إليك نظرة عامة على نشاطك اليوم' : "Here's what's happening with your projects today.") :
                 activeTab === 'startup' ? (isRtl ? 'تقييم الجاهزية والتوصيات لتحسين فرص نجاحك' : 'Readiness evaluation and recommendations to improve your success rate') :
                 ''}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards (Microsoft Fluent style) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: isRtl ? 'النقاط' : 'Innovation Points', value: '1,250', color: 'bg-primary' },
                  { label: isRtl ? 'مشاريع نشطة' : 'Active Projects', value: '3', color: 'bg-secondary' },
                  { label: isRtl ? 'اجتماعات قادمة' : 'Upcoming Meetings', value: '2', color: 'bg-accent' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-1 h-full ${stat.color} rounded-full`} />
                    <div className="text-text-secondary text-sm font-medium mb-2">{stat.label}</div>
                    <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity & Next Steps */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                  <h3 className="text-lg font-bold text-text-primary mb-4">
                    {isRtl ? 'الخطوات القادمة' : 'Next Steps'}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: isRtl ? 'استكمال نموذج العمل' : 'Complete Business Model Canvas', time: isRtl ? 'اليوم' : 'Today', type: 'Project' },
                      { title: isRtl ? 'اجتماع مع المرشد' : 'Meeting with Mentor', time: 'Tomorrow, 10:00 AM', type: 'Mentorship' },
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-text-primary text-sm">{task.title}</div>
                          <div className="text-xs text-text-secondary">{task.type} • {task.time}</div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 ${isRtl ? 'rotate-180' : ''}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                  <h3 className="text-lg font-bold text-text-primary mb-4">
                    {isRtl ? 'فرص موصى بها' : 'Recommended Opportunities'}
                  </h3>
                  {/* Add opportunities list */}
                  <div className="p-4 border border-dashed border-gray-300 rounded-xl text-center text-text-secondary">
                    {isRtl ? 'تطابق الفرص جاري...' : 'Matching opportunities...'}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'startup' && <StartupProfile />}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
