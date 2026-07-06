/* إنشاء جدول حسابات الإدارة (Admins) */
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    display_name TEXT NOT NULL,
    title TEXT,
    role TEXT NOT NULL DEFAULT 'custom_admin',
    permissions JSONB DEFAULT '[]'::jsonb
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on admins" ON public.admins FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert on admins" ON public.admins FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update on admins" ON public.admins FOR UPDATE TO public USING (true);
CREATE POLICY "Allow public delete on admins" ON public.admins FOR DELETE TO public USING (true);

/* إضافة الحسابات الافتراضية */
INSERT INTO public.admins (username, password, display_name, title, role, permissions)
VALUES 
('admin', 'admin123', 'أدمن القمة الرئيسي', 'رئيس لجنة الإشراف العام', 'superAdmin', '[]'::jsonb),
('academic', 'acad123', 'أدمن المشروعات والبحوث', 'مسؤول الأكاديمية العلمية', 'academic', '[]'::jsonb)
ON CONFLICT (username) DO NOTHING;
