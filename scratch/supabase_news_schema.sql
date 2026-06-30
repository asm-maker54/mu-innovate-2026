-- جدول الأخبار (News)
CREATE TABLE IF NOT EXISTS public.news (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    image_url text,
    uploader_name text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- إعطاء صلاحيات القراءة للجميع
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on news" ON public.news FOR SELECT USING (true);

-- إعطاء صلاحيات الإضافة والتعديل والحذف للأدمن فقط (يمكنك تخصيصها لاحقاً، حالياً سنسمح بها للتبسيط)
CREATE POLICY "Allow authenticated insert on news" ON public.news FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on news" ON public.news FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on news" ON public.news FOR DELETE USING (auth.role() = 'authenticated');
