import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-gray-200 flex items-center py-12 px-4 sm:px-6 lg:px-8 font-cairo">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side - Text & Info */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-gray-500 font-bold mb-4">
              <span className="w-6 h-[2px] bg-[#fb8500]"></span>
              <span>{isLogin ? (isRtl ? 'مرحباً بعودتك' : 'Welcome Back') : (isRtl ? 'انضم إلينا' : 'Join Us')}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {isLogin 
                ? (isRtl ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account') 
                : (isRtl ? 'إنشاء حساب مستخدم جديد' : 'Create a new user account')}
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed">
              {isRtl 
                ? 'استفد من كافة خدمات المنصة، وتواصل مع المستثمرين والشركات، وقدم مشاريعك وابتكاراتك للقمة بكل سهولة.' 
                : 'Access all platform services, connect with investors and companies, and submit your projects and innovations to the summit easily.'}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-gray-600 font-bold">
              {isLogin ? (isRtl ? 'ليس لديك حساب؟' : "Don't have an account?") : (isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?')}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#fb8500] hover:text-[#e07600] transition-colors underline underline-offset-4"
              >
                {isLogin 
                  ? (isRtl ? 'قم بإنشاء حساب جديد' : 'Create a new account') 
                  : (isRtl ? 'قم بتسجيل الدخول' : 'Sign in here')}
              </button>
            </p>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="bg-transparent lg:pl-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className={`grid ${!isLogin ? 'grid-cols-1 sm:grid-cols-2 gap-6' : 'grid-cols-1 gap-6'}`}>
              
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">
                      {isRtl ? 'الاسم الأول *' : 'First Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#d1d5db]/40 border-none rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all font-medium"
                      placeholder={isRtl ? 'الاسم الأول' : 'First Name'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">
                      {isRtl ? 'اسم العائلة *' : 'Last Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#d1d5db]/40 border-none rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all font-medium"
                      placeholder={isRtl ? 'اسم العائلة' : 'Last Name'}
                    />
                  </div>
                </>
              )}

              <div className={`space-y-2 ${!isLogin ? 'sm:col-span-2' : ''}`}>
                <label className="block text-sm font-bold text-gray-700">
                  {isRtl ? 'البريد الإلكتروني *' : 'Email *'}
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-[#d1d5db]/40 border-none rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all font-medium"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className={`space-y-2 ${!isLogin ? 'sm:col-span-2' : ''}`}>
                <label className="block text-sm font-bold text-gray-700">
                  {isRtl ? 'كلمة المرور *' : 'Password *'}
                </label>
                <input
                  type="password"
                  required
                  className="w-full bg-[#d1d5db]/40 border-none rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:bg-white transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>

            </div>

            {isLogin && (
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#1b4332] focus:ring-[#1b4332] border-gray-400 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ms-2 block text-sm font-bold text-gray-600 cursor-pointer">
                    {isRtl ? 'تذكرني' : 'Remember me'}
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-bold text-[#1b4332] hover:text-[#fb8500] transition-colors">
                    {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
                  </a>
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="group inline-flex items-center bg-[#1a3a2f] text-white rounded-[2rem] p-1.5 pl-8 pr-1.5 hover:bg-[#11271f] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={isRtl ? { paddingRight: '2rem', paddingLeft: '0.375rem' } : {}}
              >
                <span className="font-bold mr-4 ml-4">
                  {isLogin ? (isRtl ? 'تسجيل الدخول' : 'Sign In') : (isRtl ? 'إنشاء حساب' : 'Register')}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#fca311] flex items-center justify-center text-[#1a3a2f] group-hover:bg-[#ffb703] transition-colors">
                  <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} strokeWidth={3} />
                </div>
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
