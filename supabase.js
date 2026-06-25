import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://dxsqjqipukqxzufmotle.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4c3FqcWlwdWtxeHp1Zm1vdGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDAzODYsImV4cCI6MjA5Nzk3NjM4Nn0.c7KEAfqvKrsc_Y752fYsC3xNAoexrOiakDc0yKs1rtA";

export const supabase = createClient(supabaseUrl, supabaseKey);
