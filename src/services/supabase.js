import { createClient } from '@supabase/supabase-js';

export const supabaseKey = 'https://xrxvdajzldwtggjjuvjo.supabase.co';

export const supabaseUrl =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyeHZkYWp6bGR3dGdnamp1dmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3NzE5MjQsImV4cCI6MjAxNzM0NzkyNH0.-RN77eQczRBUrkcW2laEyIIa0oglfQ2rjKpj5cIDqUw';

export const supabase = createClient(supabaseKey, supabaseUrl);

export default supabase;
