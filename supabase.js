import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://qgycpbmliycrkgdqncot.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWNwYm1saXljcmtnZHFuY290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODY5NDMsImV4cCI6MjA2MTg2Mjk0M30.rBP7LJju3HxYk1xq4N6rvQcR23YF7vrZIqUZWdoB-9k')

export default supabase