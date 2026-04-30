import { useState } from 'react';
import { Save } from 'lucide-react';
import { site } from '../data/siteConfig';

export default function SiteSettingsPage() {
  const [form, setForm] = useState({
    name: site.name,
    tagline: site.tagline,
    email: site.email,
    phone: site.phone,
    address: site.address,
    youtube: site.social.youtube,
    telegram: site.social.telegram,
    facebook: site.social.facebook,
    twitter: site.social.twitter,
  });
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Site settings</h1>
        <p className="text-sm text-slate-500">Branding, contact and social links.</p>
      </div>
      {saved && (
        <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          Settings saved (demo).
        </div>
      )}
      <div className="card-padded grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Site name</span>
          <input className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Tagline</span>
          <input className="input mt-1" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Support email</span>
          <input type="email" className="input mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Phone</span>
          <input className="input mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Address</span>
          <input className="input mt-1" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </label>
      </div>
      <div className="card-padded grid gap-4 sm:grid-cols-2">
        <h3 className="sm:col-span-2 font-display text-base font-bold text-slate-900 dark:text-white">Social</h3>
        {['youtube', 'telegram', 'facebook', 'twitter'].map((k) => (
          <label key={k} className="block">
            <span className="text-xs font-semibold capitalize text-slate-600 dark:text-slate-300">{k}</span>
            <input className="input mt-1" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
          </label>
        ))}
      </div>
      <button className="btn-primary">
        <Save className="h-4 w-4" /> Save settings
      </button>
    </form>
  );
}
