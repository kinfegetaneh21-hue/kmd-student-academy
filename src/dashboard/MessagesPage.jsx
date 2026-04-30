import { Bell, Megaphone, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function MessagesPage() {
  const { announcements } = useData();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Messages & Notifications</h1>
          <p className="text-sm text-slate-500">Updates from KMD and your instructors.</p>
        </div>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="card-padded">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Megaphone className="h-3.5 w-3.5 text-accent-500" /> KMD Team · {a.date}
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{a.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-padded">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-brand-500" />
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Need help?</h3>
        </div>
        <p className="mt-1 text-sm text-slate-500">Send us a note and we\u2019ll reply within 24 hours.</p>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Message sent!');
          }}
        >
          <input className="input" placeholder="Subject" required />
          <textarea className="input" rows={4} placeholder="Message" required />
          <button className="btn-primary w-full">
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
