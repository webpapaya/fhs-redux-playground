-- ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF exists events_policy on public.events;

-- CREATE POLICY events_policy
-- ON public.events
-- FOR select
-- USING (id in (
--   select events_speakers.event_id from speakers
--   join events_speakers on speakers.id = events_speakers.speaker_id
--   where speakers.role_id = current_user))
