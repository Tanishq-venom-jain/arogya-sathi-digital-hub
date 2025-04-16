
import { createClient } from '@supabase/supabase-js';

// Instead of using environment variables, we'll directly use the Supabase URL and anonymous key
// You should replace these values with your actual Supabase project credentials
const supabaseUrl = 'https://replace-with-your-actual-supabase-url.supabase.co';
const supabaseAnonKey = 'replace-with-your-actual-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
