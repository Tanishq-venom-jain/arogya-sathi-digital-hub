
import { createClient } from '@supabase/supabase-js';

// Supabase project credentials
const supabaseUrl = 'https://lnvzvtxszopacwnaqdzz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxudnp2dHhzem9wYWN3bmFxZHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODU2MTAsImV4cCI6MjA2MDM2MTYxMH0.x5dEB3jNF22tpOYoM8W-dxR2JykaZlfTX2I7kgZGsz0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
