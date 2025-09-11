import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv"

dotenv.config()
const supabase_url=process.env.SUPABASE_URL
const anon_key=process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabase_url!, anon_key!);

export default supabase;