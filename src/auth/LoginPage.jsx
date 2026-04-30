import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const u = await login(email, password);
      const dest = loc.state?.from || (u.role === 'admin' ? '/admin' : '/dashboard');
      nav(dest);
    } catch (ex) {
      setErr(ex.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fill = (e, p) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Welcome back 👋</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Log in to continue learning. New here?{' '}
        <Link className="font-semibold text-brand-600 hover:underline" to="/signup">
          Create a free account
        </Link>
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {err && (
          <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
            {err}
          </div>
        )}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              className="input pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
            />
          </div>
        </label>
        <label className="block">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
            <Link to="/forgot-password" className="text-xs font-semibold text-brand-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              required
              className="input pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </label>
        <button disabled={loading} className="btn-primary w-full">
          <LogIn className="h-4 w-4" /> {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        <div className="mb-2 flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" /> Demo accounts
        </div>
        <div className="grid gap-2">
          <button onClick={() => fill('admin@kmd.academy', 'admin123')} className="chip-brand w-full justify-start !py-1.5">
            <Sparkles className="h-3 w-3" /> Admin · admin@kmd.academy / admin123
          </button>
          <button onClick={() => fill('premium@kmd.academy', 'premium123')} className="chip-accent w-full justify-start !py-1.5">
            <Sparkles className="h-3 w-3" /> Premium · premium@kmd.academy / premium123
          </button>
          <button onClick={() => fill('freshman@kmd.academy', 'freshman123')} className="chip-success w-full justify-start !py-1.5">
            <Sparkles className="h-3 w-3" /> Freshman · freshman@kmd.academy / freshman123
          </button>
        </div>
      </div>
    </div>
  );
}
