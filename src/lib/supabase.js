import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ofwircklikygwohcpsua.supabase.co"; // Ganti dengan URL proyek Supabase kamu
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md2lyY2tsaWt5Z3dvaGNwc3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4Mjg2MzgsImV4cCI6MjA1NDQwNDYzOH0.8HzZfvo92snTLsIAn8VaXGhSTuxxMPJZw6hLY7I40m0"; // Ganti dengan kunci anon proyek Supabase kamu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
