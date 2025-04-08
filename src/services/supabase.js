import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lxdscohmsqtfjcdckfyp.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZHNjb2htc3F0ZmpjZGNrZnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NzE2NzYsImV4cCI6MjA1ODQ0NzY3Nn0.3MbsVCcRFE90iTLlA9ODAK3KFsc-qB-0sQ36PBexGLE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
