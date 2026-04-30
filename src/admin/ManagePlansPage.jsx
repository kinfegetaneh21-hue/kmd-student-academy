import { useState } from 'react';
import { Crown, Pencil } from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/ui/Modal';

export default function ManagePlansPage() {
  const { plans, updatePlan } = useData();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const start = (p) => {
    setEditing({ ...p });
    setOpen(true);
  };

  const save = () => {
    updatePlan(editing);
    setOpen(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Premium plans</h1>
        <p className="text-sm text-slate-500">Pricing, labels and included features.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <div key={p.id} className="card-padded">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {p.id !== 'freshman' && <Crown className="h-4 w-4 text-accent-500" />}
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">{p.name}</h3>
              </div>
              <button onClick={() => start(p)} className="btn-ghost !px-2 !py-1 text-xs">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
              {p.priceETB === 0 ? 'Free' : `${p.priceETB} ETB`}
              <span className="ml-1 text-xs font-semibold text-slate-500">/ {p.period.replace('per ', '')}</span>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {p.features.slice(0, 4).map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={`Edit: ${editing?.name || ''}`}>
        {editing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Plan name</span>
              <input className="input mt-1" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">ETB price</span>
              <input type="number" className="input mt-1" value={editing.priceETB} onChange={(e) => setEditing({ ...editing, priceETB: Number(e.target.value) })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">USD price</span>
              <input type="number" className="input mt-1" value={editing.priceUSD} onChange={(e) => setEditing({ ...editing, priceUSD: Number(e.target.value) })} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Features (one per line)</span>
              <textarea
                rows={6}
                className="input mt-1"
                value={editing.features.join('\n')}
                onChange={(e) => setEditing({ ...editing, features: e.target.value.split('\n').filter(Boolean) })}
              />
            </label>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
              <button onClick={save} className="btn-primary">Save plan</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
