import { createClient } from '@supabase/supabase-js';

// Supabase client for data fetching (public, read-only via anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Missing Supabase config in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
