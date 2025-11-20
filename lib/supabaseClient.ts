import type { SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

/**
 * Asynchronously import the Supabase SDK and create a client at runtime.
 * Returns `null` on the server or when env vars are missing.
 */
export async function getSupabaseClient(): Promise<SupabaseClient | null> {
	if (supabase) return supabase

	// Avoid creating the client on the server during build/prerender
	if (typeof window === 'undefined') return null

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	if (!supabaseUrl || !supabaseAnonKey) return null

	// dynamically import to avoid running SDK code at module eval time
	const mod = await import('@supabase/supabase-js')
	const { createClient } = mod

	supabase = createClient(supabaseUrl, supabaseAnonKey)
	return supabase
}

export default getSupabaseClient
