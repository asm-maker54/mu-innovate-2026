/* إنشاء جدول شبكة المدربين الرقمية */
CREATE TABLE IF NOT EXISTS public.mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    specialty TEXT NOT NULL,
    category TEXT NOT NULL,
    rating NUMERIC(2,1) DEFAULT 5.0,
    sessions INTEGER DEFAULT 0,
    email TEXT,
    image TEXT
);

ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on mentors" ON public.mentors FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert on mentors" ON public.mentors FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update on mentors" ON public.mentors FOR UPDATE TO public USING (true);
CREATE POLICY "Allow public delete on mentors" ON public.mentors FOR DELETE TO public USING (true);

/* بيانات افتراضية للمدربين */
INSERT INTO public.mentors (name, title, specialty, category, rating, sessions, email, image)
VALUES 
('د. أحمد محمود', 'أستاذ مساعد - كلية الحاسبات والمعلومات', 'الذكاء الاصطناعي وتعلم الآلة', 'ai', 4.9, 120, 'a.mahmoud@minia.edu.eg', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'),
('م. سارة إبراهيم', 'خبيرة تسويق رقمي ومستشارة شركات', 'التسويق الإلكتروني ونمو الشركات', 'marketing', 4.8, 85, 'sara.marketing@minia-hub.com', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400')
ON CONFLICT DO NOTHING;
