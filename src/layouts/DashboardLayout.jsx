import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  FileText,
  Download,
  FileCheck2,
  MessageSquare,
  User,
  ClipboardList,
  LogOut,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Logo from '../components/ui/Logo';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import cn from '../utils/cn';

const items = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/courses', label: 'My Courses', icon: BookOpen },
  { to: '/dashboard/continue', label: 'Continue Learning', icon: PlayCircle },
  { to: '/dashboard/notes', label: 'Notes', icon: FileText },
  { to: '/dashboard/videos', label: 'Video Lessons', icon: PlayCircle },
  { to: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { to: '/dashboard/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/dashboard/quizzes', label: 'Quizzes', icon: FileCheck2 },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

function Sidebar({ onLogout }) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold',
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-soft'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              )
            }
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const onLogout = () => {
    logout();
    nav('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:block">
        <Sidebar onLogout={onLogout} />
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60" onClick={() => setOpen(false)} />
          <div className="relative h-full w-64">
            <Sidebar onLogout={onLogout} />
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 sm:px-6">
          <button className="btn-secondary !px-3 !py-2 lg:hidden" onClick={() => setOpen((s) => !s)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <div className="relative hidden flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search courses, lessons, notes…" />
          </div>
          <button onClick={toggle} className="btn-secondary !px-3 !py-2" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="btn-secondary !px-3 !py-2" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-xl object-cover" />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                {user?.role} · {user?.plan}
              </div>
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
