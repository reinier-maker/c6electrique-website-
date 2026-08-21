import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wqsbxkeoprqfokohgebp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lqsVlX8DtqUiSwkJBP7iiQ_4ZfpUXRB";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type SiteText = {
  key: string;
  section: string | null;
  label: string | null;
  value_nl: string;
  value_en: string;
  updated_at: string;
};
