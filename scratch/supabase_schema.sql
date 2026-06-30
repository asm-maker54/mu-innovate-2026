-- 1. إنشاء جدول التسجيلات العامة (متحدث، شركة ناشئة، مستثمر، موجه، حضور)
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    organization TEXT NOT NULL,
    role TEXT NOT NULL, -- speaker, startup, investor, mentor, attendee, partner
    details JSONB DEFAULT '{}'::jsonb,
    cv_url TEXT
);

-- تمكين الوصول للعامة للقراءة والكتابة (لأغراض العرض التقديمي)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.registrations FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON public.registrations FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.registrations FOR UPDATE TO public USING (true);


-- 2. إنشاء جدول البحوث التطبيقية
CREATE TABLE IF NOT EXISTS public.applied_research (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    pi_name TEXT NOT NULL,
    pi_faculty TEXT NOT NULL,
    pi_dept TEXT,
    pi_rank TEXT,
    pi_email TEXT NOT NULL,
    pi_phone TEXT NOT NULL,
    pi_orcid TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    files JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'تم استلام الطلب'
);

ALTER TABLE public.applied_research ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.applied_research FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON public.applied_research FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.applied_research FOR UPDATE TO public USING (true);


-- 3. إنشاء جدول مشروعات التخرج (14 خطوة)
CREATE TABLE IF NOT EXISTS public.graduation_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    project_name_ar TEXT NOT NULL,
    project_name_en TEXT NOT NULL,
    college TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL,
    course_name TEXT,
    project_type TEXT NOT NULL, -- فردي / جماعي
    team_members JSONB DEFAULT '[]'::jsonb,
    details JSONB DEFAULT '{}'::jsonb,
    files JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'تم استلام الطلب'
);

ALTER TABLE public.graduation_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON public.graduation_projects FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON public.graduation_projects FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.graduation_projects FOR UPDATE TO public USING (true);


-- 4. إعداد مساحة تخزين الملفات (Supabase Storage Bucket)
-- قم بتشغيل هذا الجزء لإضافة دلو التخزين
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-attachments', 'project-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- سياسات تخزين الملفات للعامة
CREATE POLICY "Allow public read" ON storage.objects FOR SELECT TO public USING (bucket_id = 'project-attachments');
CREATE POLICY "Allow public upload" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'project-attachments');
CREATE POLICY "Allow public delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'project-attachments');
