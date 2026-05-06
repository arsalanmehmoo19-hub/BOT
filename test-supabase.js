const { createClient } = require('@supabase/supabase-js');
const url = 'https://tddmlejmhnsvtmebkfte.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZG1sZWptaG5zdnRtZWJrZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjk3MzgsImV4cCI6MjA5MzYwNTczOH0.j8t7MBfqlWqdmiJ8_pohvAdlBryIa-veF5WzGeCa-38';
const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.from('products').select('*, product_images(*), categories(*)').limit(1);
  console.log('Error:', error);
  console.log('Data:', data);
}

test();
