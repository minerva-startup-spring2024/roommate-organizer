insert into
storage.buckets (id, name, public, owner, avif_autodetection)
values
('avatars', 'avatars', true, null, false);

CREATE POLICY "insert_objects 1oj01fe_0" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');