import { createClient } from "@supabase/supabase-js";


supabaseQuotesUrl= "https://ragmcktdmretjkcvmjif.supabase.co",
supabaseQuotesKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZ21ja3RkbXJldGprY3ZtamlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMzczMDksImV4cCI6MjA1NTcxMzMwOX0.z8IQ-U59wfqBTLKk5fHLeni4XAOkb85q5Y97I6MZeQk";

export const supabase = createClient(supabaseQuotesUrl, supabaseQuotesKey);
