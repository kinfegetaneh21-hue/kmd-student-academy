import { useState } from 'react';
import { Megaphone, Trash2, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ManageAnnouncementsPage() {
  const { announcements, addAnnouncement, removeAnnouncement } = useData();
  const [form, setForm] = useState({ title: '', body: '', type: 'update' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    addAnnouncement({
      id: `a-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      ...form,
    });
    setForm({ title: '', body: '', type: 'update' });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Announcements</h1>
        <p className="text-sm text-slate-500">Send updates to students across the entire academy.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={submit} className="card-padded space-y-3 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-accent-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">New announcement</h3>
          </div>
          <input required className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea rows={4} className="input" placeholder="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="update">Product update</option>
            <option value="event">Event</option>
            <option value="course">Course release</option>
          </select>
          <button className="btn-primary w-full">
            <Plus className="h-4 w-4" /> Publish
          </button>
        </form>
        <div className="lg:col-span-2 space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="card-padded">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent-600">{a.type}</div>
                  <h3 className="mt-1 font-display text-base font-bold text-slate-900 dark:text-white">{a.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{a.body}</p>
                </div>
                <button onClick={() => removeAnnouncement(a.id)} className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 text-xs text-slate-500">{a.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
