// Placeholder for a real auth service. The UI uses AuthContext, which
// currently stores users in localStorage. Swap these functions to call
// your real API (Express/Firebase/Supabase) without changing pages.
export async function apiLogin(email, password) {
  return { email, password };
}
export async function apiSignup(payload) {
  return payload;
}
export async function apiForgotPassword(email) {
  return { ok: true, email };
}
