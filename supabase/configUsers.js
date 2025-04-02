import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUsersUrl =
  process.env.SUPABASE_USERS_URL ||
  Constants.expoConfig?.extra?.supabaseUsersUrl ||
  Constants.manifest?.extra?.supabaseUsersUrl;
const supabaseUsersKey =
  process.env.SUPABASE_USERS_KEY ||
  Constants.expoConfig?.extra?.supabaseUsersKey ||
  Constants.manifest?.extra?.supabaseUsersKey;

if (!supabaseUsersUrl || !supabaseUsersKey) {
  console.warn("Missing Supabase environment variables!");
  console.warn(
    "Available env vars:",
    Object.keys(process.env).filter((key) => key.includes("SUPABASE"))
  );
}

export const supabase = createClient(supabaseUsersUrl, supabaseUsersKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
