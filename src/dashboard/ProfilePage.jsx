import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { academicYears } from '../data/siteConfig';
import { Save, User, Mail, GraduationCap } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    year: user?.year || 'freshman',
  });
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card-padded text-center lg:col-span-1">
        <img src={user?.avatar} alt={user?.name} className="mx-auto h-24 w-24 rounded-2xl object-cover shadow-soft" />
        <div className="mt-4 font-display text-lg font-extrabold text-slate-900 dark:text-white">{user?.name}</div>
        <div className="text-sm text-slate-500">{user?.email}</div>
        <div className="mt-3 flex justify-center gap-2">
          <span className="chip-brand uppercase">{user?.role}</span>
          <span className="chip-accent uppercase">{user?.plan}</span>
        </div>
      </div>
      <form onSubmit={submit} className="card-padded space-y-4 lg:col-span-2">
        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Profile</h2>
        {saved && <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">Profile saved!</div>}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</span>
          <div className="relative mt-1.5">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="email" className="input pl-9" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Academic year</span>
          <div className="relative mt-1.5">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select className="input pl-9" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
              {academicYears.map((y) => (
                <option key={y.id} value={y.id}>{y.label}</option>
              ))}
            </select>
          </div>
        </label>
        <button className="btn-primary">
          <Save className="h-4 w-4" /> Save changes
        </button>
      </form>
    </div>
  );
}
