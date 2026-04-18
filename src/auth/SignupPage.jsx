import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { academicYears } from '../data/siteConfig';

export default function SignupPage() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', year: 'freshman' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const u = await signup(form);
      nav(u.role === 'freshman' ? '/dashboard' : '/pricing');
    } catch (ex) {
      setErr(ex.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Create your account</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Already have one?{' '}
        <Link className="font-semibold text-brand-600 hover:underline" to="/login">
          Log in
        </Link>
      </p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        {err && (
          <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{err}</div>
        )}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</span>
          <div className="relative mt-1.5">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              required
              className="input pl-9"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Abebe Bekele"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="email"
              className="input pl-9"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@university.edu"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="password"
              minLength={6}
              className="input pl-9"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Academic year</span>
          <div className="relative mt-1.5">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              className="input pl-9"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              {academicYears.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.label} {y.access === 'premium' ? '(Premium required)' : '(Free)'}
                </option>
              ))}
            </select>
          </div>
        </label>
        <button disabled={loading} className="btn-primary w-full">
          <Sparkles className="h-4 w-4" /> {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-500">
        By signing up you agree to our{' '}
        <Link to="/terms" className="underline hover:text-slate-700">Terms</Link> and{' '}
        <Link to="/privacy" className="underline hover:text-slate-700">Privacy</Link>.
      </p>
    </div>
  );
}
