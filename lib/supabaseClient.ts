import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || 'https://tddmlejmhnsvtmebkfte.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZG1sZWptaG5zdnRtZWJrZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjk3MzgsImV4cCI6MjA5MzYwNTczOH0.j8t7MBfqlWqdmiJ8_pohvAdlBryIa-veF5WzGeCa-38';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('test_table').select('*').limit(1);
    
    if (error && error.code !== 'PGRST116') { // Ignore error if table doesn't exist, as long as we can reach API
        console.error('Supabase connection test failed:', error.message);
    } else {
        console.log('Supabase connection successful!');
    }
  } catch (err) {
    console.error('Supabase connection check failed (is the URL/key correct?):', err);
  }
}

// NOTE: To trigger this, call it in a client component or top-level layout
// testConnection();
