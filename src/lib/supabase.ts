import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = "https://ebnxozqdlqamyekjonty.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibnhvenFkbHFhbXlla2pvbnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDQ5NDcsImV4cCI6MjA1MDEyMDk0N30.Q6HuQsxlOCeJsUcgsyK-zKC1wW_ewzHRCC-pftti8gU";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
