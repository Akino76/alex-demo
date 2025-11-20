import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

/**
 * Lazily create and return a Supabase client.
 * This avoids creating the client during server-side prerender/build when
 * NEXT_PUBLIC env vars may not be available. Call this from client code.
 */
export function getSupabaseClient(): SupabaseClient | null {
	if (supabase) return supabase

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	// If env is not available or we're on the server, return null to avoid errors
	if (!supabaseUrl || !supabaseAnonKey) {
		if (typeof window === 'undefined') return null
		throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
	}

	supabase = createClient(supabaseUrl, supabaseAnonKey)
	return supabase
}

export default getSupabaseClient
