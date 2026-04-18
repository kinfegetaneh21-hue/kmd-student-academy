import { Link, Outlet } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="relative grid min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 sm:px-10 lg:px-16">
        <Logo />
        <div className="mx-auto my-auto w-full max-w-md">
          <Outlet />
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} KMD Student Academy</p>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 text-white lg:block">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex h-full flex-col justify-end p-12"
        >
          <h2 className="font-display text-4xl font-extrabold leading-tight">
            Learn smarter.<br />Graduate faster.
          </h2>
          <p className="mt-3 max-w-md text-brand-100">
            Join 24,800+ Ethiopian university students turning knowledge into real outcomes.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: '3,200+', v: 'Video lessons' },
              { k: '40+', v: 'Universities' },
              { k: '4.9 / 5', v: 'Avg. rating' },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
                <div className="text-xl font-bold">{s.k}</div>
                <div className="text-xs text-brand-100">{s.v}</div>
              </div>
            ))}
          </div>
          <Link to="/" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold ring-1 ring-white/20 hover:bg-white/20">
            ← Back to website
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
