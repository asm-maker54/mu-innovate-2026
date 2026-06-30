const fs = require('fs');
const file = 'src/pages/RegisterPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update roleTypes and fallback role
content = content.replace(
  /const roleTypes = \[.*\];/,
  "const roleTypes = ['speaker', 'startup', 'investor', 'mentor'];"
);
content = content.replace(
  /const safeRole = roleTypes\.includes\(role\) \? role : 'volunteer';/,
  "const safeRole = roleTypes.includes(role) ? role : 'speaker';"
);

// 2. Add selectedRole state right below errors state
content = content.replace(
  /const \[errors, setErrors\] = useState\(\{\}\);/,
  "const [errors, setErrors] = useState({});\n  const [selectedRole, setSelectedRole] = useState(safeRole);"
);

// 3. Replace safeRole with selectedRole throughout the file
content = content.replace(/safeRole/g, 'selectedRole');

// 4. Clean up roleDetails to only show the four desired ones
const oldRoleDetails = `  const roleDetails = {
    speaker: { title: 'تسجيل المتحدثين', description: 'شارك بخبراتك وكن جزءاً من منصة المتحدثين.', attachmentLabel: 'السيرة الذاتية (CV)', requiresAttachment: true },
    partner: { title: 'تسجيل الشركاء', description: 'نرحب بشراكتكم لبناء مستقبل ريادة الأعمال.', attachmentLabel: 'ملف الشركة (Company Profile)', requiresAttachment: true },
    startup: { title: 'تسجيل الشركات الناشئة', description: 'سجل شركتك الناشئة واعرض ابتكارك للعالم.', attachmentLabel: 'العرض التقديمي (Pitch Deck)', requiresAttachment: true },
    investor: { title: 'تسجيل المستثمرين', description: 'انضم لشبكة مستثمري قمة الابتكار.', attachmentLabel: 'ملف تعريفي (اختياري)', requiresAttachment: false },
    mentor: { title: 'تسجيل المدربين', description: 'كن مدرباً لرواد الأعمال وساعدهم في رحلتهم.', attachmentLabel: 'السيرة الذاتية (CV)', requiresAttachment: true },
    volunteer: { title: 'تسجيل المتطوعين', description: 'انضم لفريق المتطوعين الرائع وصنع الفارق.', attachmentLabel: '', requiresAttachment: false },
    researcher: { title: 'تسجيل البحوث التطبيقية', description: 'ارفع فكرة بحثك التطبيقي وشاركه للتسويق التجاري.', attachmentLabel: 'ملف البحث (PDF)', requiresAttachment: true },
  };`;

const newRoleDetails = `  const roleDetails = {
    speaker: { title: 'تسجيل المتحدثين', description: 'شارك بخبراتك وكن جزءاً من منصة المتحدثين.', attachmentLabel: 'السيرة الذاتية (CV)', requiresAttachment: true },
    startup: { title: 'تسجيل الشركات الناشئة', description: 'سجل شركتك الناشئة واعرض ابتكارك للعالم.', attachmentLabel: 'العرض التقديمي (Pitch Deck)', requiresAttachment: true },
    investor: { title: 'تسجيل المستثمرين', description: 'انضم لشبكة مستثمري قمة الابتكار.', attachmentLabel: 'ملف تعريفي (اختياري)', requiresAttachment: false },
    mentor: { title: 'تسجيل المدربين', description: 'كن مدرباً لرواد الأعمال وساعدهم في رحلتهم.', attachmentLabel: 'السيرة الذاتية (CV)', requiresAttachment: true }
  };`;

content = content.replace(oldRoleDetails, newRoleDetails);

// 5. Add the dropdown select for role selection at the top of Step 1
const oldStep1Header = `{step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">البيانات الشخصية</h3>`;

const newStep1Header = `{step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">البيانات الشخصية</h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">نوع التسجيل *</label>
                    <div className="relative">
                      <select 
                        name="registrationRole" 
                        value={selectedRole} 
                        onChange={(e) => setSelectedRole(e.target.value)} 
                        className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none appearance-none font-bold text-slate-700"
                      >
                        <option value="speaker">متحدث (Speaker)</option>
                        <option value="startup">شركة ناشئة (Startup)</option>
                        <option value="investor">مستثمر (Investor)</option>
                        <option value="mentor">مدرب / موجه (Mentor)</option>
                      </select>
                      <ArrowRight className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>`;

content = content.replace(oldStep1Header, newStep1Header);

fs.writeFileSync(file, content, 'utf8');
console.log('Update completed successfully!');
