import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vdvfnkocwiafzsbzsrzy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdmZua29jd2lhZnpzYnpzcnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNzEzNDUsImV4cCI6MjA1Njc0NzM0NX0.DmUorixmjBHdKZ_jpgM24Q5DuCU18a5EMWRMGcQFZgE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
