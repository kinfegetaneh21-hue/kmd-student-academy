import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="animate-fade-in">
      <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
        <ArrowLeft className="h-3 w-3" /> Back to login
      </Link>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-slate-900 dark:text-white">Reset your password</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Enter the email tied to your account and we\u2019ll send a reset link.
      </p>
      {sent ? (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          If that email exists in our records, you\u2019ll receive a reset link shortly.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-8 space-y-4"
        >
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input required type="email" className="input pl-9" placeholder="you@university.edu" />
            </div>
          </label>
          <button className="btn-primary w-full">
            <KeyRound className="h-4 w-4" /> Send reset link
          </button>
        </form>
      )}
    </div>
  );
}
