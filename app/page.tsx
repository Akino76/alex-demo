"use client";

import { useEffect, useState } from "react";
import getSupabaseClient from "../lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // get current session user on mount
    let mounted = true;
    const client = getSupabaseClient();
    if (!client) return;
    client.auth.getUser().then(({ data, error }) => {
      if (!mounted) return;
      if (data?.user) setUser(data.user);
      if (error) console.debug("supabase getUser error:", error);
    });

    // listen to auth changes
    const { data: listener } = client.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) setUser(session.user);
        if (event === "SIGNED_OUT") setUser(null);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const client = getSupabaseClient();
      if (!client) throw new Error("Supabase client not available");
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else if (data?.user) {
        setUser(data.user);
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    const client = getSupabaseClient();
    if (client) await client.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  if (user) {
    return (
      <div className="login-root">
        <div className="login-menu">
          <h2 className="login-title">Welcome</h2>
          <p style={{ marginBottom: 12 }}>
            Signed in as <strong>{user.email ?? user.id}</strong>
          </p>
          <button className="login-btn" onClick={signOut} disabled={loading}>
            {loading ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-root">
      <form className="login-menu" onSubmit={signIn}>
        <h2 className="login-title">Login</h2>
        <div className="login-fields">
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div style={{ color: "#dc2626", marginBottom: 12 }}>{error}</div>
        )}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
