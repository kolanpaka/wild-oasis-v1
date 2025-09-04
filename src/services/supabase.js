import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://amoeidozdmndtgzcmxdc.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtb2VpZG96ZG1uZHRnemNteGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzQ0MTAsImV4cCI6MjA2ODM1MDQxMH0.SjdjpPmn0Rpa86qWnpM7bI5GLFkchUb2PMDV2vc-mZw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;





