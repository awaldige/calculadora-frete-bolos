import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://dxsqjqipukqxzufmotle.supabase.co";

const supabaseKey =
"sb_publishable_Hu2NKqfGiI572JzXszXfRg_2UgcGTxe";

export const supabase = createClient(supabaseUrl, supabaseKey);
